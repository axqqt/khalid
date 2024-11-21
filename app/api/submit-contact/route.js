import { NextResponse } from "next/server";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { Resend } from "resend";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr5CXk4zlqqdwjbjVaa5G7UMmH7TVokz0",
  authDomain: "khalid-ffc85.firebaseapp.com",
  projectId: "khalid-ffc85",
  storageBucket: "khalid-ffc85.firebasestorage.app",
  messagingSenderId: "260271633885",
  appId: "1:260271633885:web:2efd76bd47f49655337234",
  measurementId: "G-YKYYYC8FT6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Resend
const resend = new Resend("re_gbXr7hK5_FR7tKgaJ4n4Zdy31n9TzgZAB");
const OWNER_EMAIL = "khalidqari1230@gmail.com";
const NOTIFICATION_FROM_EMAIL = "onboarding@resend.dev";

// Function to save data to Firestore
async function saveToFirestore(data) {
  try {
    const submissionsRef = collection(db, "property-inquiries");
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

// Function to send email notification
async function sendEmailNotification(data) {
  try {
    await resend.emails.send({
      from: NOTIFICATION_FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `New Property Inquiry: ${data.name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a; margin-bottom: 24px;">🏠 New Property Inquiry!</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h3 style="color: #0f172a; margin-top: 0;">Contact Details</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${data.phone}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${data.email}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h3 style="color: #0f172a; margin-top: 0;">Inquiry Details</h3>
            <p style="margin: 8px 0;"><strong>Inquiry Type:</strong> ${data.inquiryType}</p>
            <p style="margin: 8px 0;"><strong>Property Type:</strong> ${data.propertyType}</p>
            <p style="margin: 8px 0;"><strong>Budget:</strong> ${data.budget}</p>
            <p style="margin: 8px 0;"><strong>Bedrooms:</strong> ${data.bedrooms}</p>
            <p style="margin: 8px 0;"><strong>Location:</strong> ${data.location}</p>
            <p style="margin: 8px 0;"><strong>Timeline:</strong> ${data.timeline}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h3 style="color: #0f172a; margin-top: 0;">Additional Description</h3>
            <p style="margin: 8px 0;">${data.description}</p>
          </div>

          <div style="color: #64748b; font-size: 14px;">
            <p style="margin: 4px 0;">Date: ${data.submissionDate}</p>
            <p style="margin: 4px 0;">Reference ID: ${data.submissionId}</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    // Don't throw error to prevent blocking the submission process
  }
}

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const {
      name,
      phone,
      email,
      inquiryType,
      propertyType,
      budget,
      bedrooms,
      location,
      timeline,
      description,
    } = body;
    const submissionDate = new Date().toISOString().split("T")[0];

    // Validate the request body
    const requiredFields = [
      "name",
      "phone",
      "email",
      "inquiryType",
      "propertyType",
      "budget",
      "bedrooms",
      "location",
      "timeline",
      "description",
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    // Save data to Firestore
    const submissionId = await saveToFirestore({
      name,
      phone,
      email,
      inquiryType,
      propertyType,
      budget,
      bedrooms,
      location,
      timeline,
      description,
      submissionDate,
    });

    // Prepare notification data
    const notificationData = {
      name,
      phone,
      email,
      inquiryType,
      propertyType,
      budget,
      bedrooms,
      location,
      timeline,
      description,
      submissionDate,
      submissionId,
    };

    // Send email notification
    await sendEmailNotification(notificationData);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Inquiry successfully submitted",
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
