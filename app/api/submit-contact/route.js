import Airtable from 'airtable';
import { NextResponse } from 'next/server';

// Handle POST requests
export async function POST(request) {
  try {
    // Initialize Airtable with personal access token
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_ACCESS_TOKEN, // use the new token here
    }).base(process.env.AIRTABLE_BASE_ID);

    // Parse the request body
    const body = await request.json();
    const { name, phone, email, description } = body;
    const submissionDate = new Date().toISOString().split('T')[0];

    // Create record in Airtable
    const records = await base(process.env.AIRTABLE_TABLE_NAME).create([
      {
        fields: {
          Name: name,
          Phone: phone,
          Email: email,
          Description: description,
          Date: submissionDate,
        },
      },
    ]);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Submission successful',
      record: records[0]
    });

  } catch (error) {
    console.error('Airtable submission error:', error);
    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: 'Error submitting to Airtable',
        error: error.message
      },
      { status: 500 }
    );
  }
}
