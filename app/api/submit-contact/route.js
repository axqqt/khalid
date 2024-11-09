import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Load environment variables
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Handle newline characters in private key
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Sheet1';
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;

// Function to authenticate with Google Sheets API
async function getAuth() {
  if (!CLIENT_EMAIL || !PRIVATE_KEY) {
    throw new Error('Google Sheets credentials are missing in environment variables.');
  }

  const { google } = await import('googleapis');
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return auth.getClient();
}

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, phone, email, description } = body;
    const submissionDate = new Date().toISOString().split('T')[0];

    // Validate the request body
    if (!name || !phone || !email || !description) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: name, phone, email, or description.',
        },
        { status: 400 }
      );
    }

    // Authenticate and connect to Google Sheets API
    const auth = await getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare the data to append
    const values = [[name, phone, email, description, submissionDate]];

    // Append the data to the Google Sheet
     sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:E`,
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    // Send data to Make.com webhook
    const webhookResponse = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        email,
        description,
        submissionDate,
      }),
    });

    if (!webhookResponse.ok) {
      throw new Error('Failed to send data to Make.com webhook');
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Submission successful and data sent to Make.com webhook',
    });
  } catch (error) {
    console.error('Error during submission:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Error during submission',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
