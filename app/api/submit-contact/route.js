"use server";
import { NextResponse } from "next/server";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import {Vonage} from "@vonage/server-sdk";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfj-o4h1Jp49iqREEHSdZZOE4DQRLCNjU",
  authDomain: "problems-33746.firebaseapp.com",
  projectId: "problems-33746",
  storageBucket: "problems-33746.appspot.com",
  messagingSenderId: "4637713392",
  appId: "1:4637713392:web:cb8de88019d96a132bf335",
  measurementId: "G-LCBEGTE3B2",
};

// Environment variables for notifications
const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;
const VONAGE_WHATSAPP_FROM = process.env.VONAGE_WHATSAPP_FROM; // Should be in format: whatsapp:+14155238886
const OWNER_WHATSAPP_NUMBER = process.env.OWNER_WHATSAPP_NUMBER; // Should be in format: whatsapp:+1234567890

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Vonage
const vonage = new Vonage({
  apiKey: VONAGE_API_KEY,
  apiSecret: VONAGE_API_SECRET,
});

// Function to save data to Firestore
async function saveToFirestore(data) {
  try {
    const submissionsRef = collection(db, "clients");
    const docRef = await addDoc(submissionsRef, {
      ...data,
      createdAt: Timestamp.now(),
      status: "new",
    });

    return docRef.id;
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    throw new Error("Failed to save submission to database");
  }
}

// Function to send WhatsApp notification via Vonage
async function sendWhatsAppNotification(data) {
  const message = `
🏠 *New Lead Alert!*

*Contact Details:*
👤 Name: ${data.name}
📱 Phone: ${data.phone}
📧 Email: ${data.email ? data.email : "Email not provided"}

*Message:*
${data.description}

*Date:* ${data.submissionDate}

Reference ID: ${data.submissionId}
`.trim();

  try {
    await vonage.messages.send({
      to: OWNER_WHATSAPP_NUMBER,
      from: VONAGE_WHATSAPP_FROM,
      channel: 'whatsapp',
      message_type: 'text',
      text: message,
    });
    console.log("WhatsApp message sent successfully.");
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    console.error("Error sending WhatsApp message:", error);
  }
}

// Function to send notification via Zapier
async function sendZapierNotification(data) {
  if (!ZAPIER_WEBHOOK_URL) return;

  try {
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        description: data.description,
        submissionDate: data.submissionDate,
        submissionId: data.submissionId,
        type: "new_lead",
      }),
    });
  } catch (error) {
    console.error("Error sending Zapier notification:", error);
    // Don't throw error to prevent blocking the submission process
  }
}

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, phone, email, description } = body;
    const submissionDate = new Date().toISOString().split("T")[0];

    // Validate the request body
    if (!name || !phone || !email || !description) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: name, phone, email, or description.",
        },
        { status: 400 }
      );
    }

    // Save data to Firestore
    const submissionId = await saveToFirestore({
      name,
      phone,
      email,
      description,
      submissionDate,
    });

    // Prepare notification data
    const notificationData = {
      name,
      phone,
      email,
      description,
      submissionDate,
      submissionId,
    };

    // Send notifications (both WhatsApp and Zapier)
    await Promise.all([
      sendWhatsAppNotification(notificationData),
      // sendZapierNotification(notificationData),
    ]);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Submission successfully saved and notifications sent",
      submissionId,
    });
  } catch (error) {
    console.error("Error during submission:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error during submission",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
