import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const OUR_EMAIL = 'hello@sgyouthai.org'; // Your organization's email

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      schoolName,
      contactPerson,
      email, // This is the sender's email
      message
    } = body;

    if (!schoolName || !contactPerson || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email to your organization
    const emailToUs = await resend.emails.send({
      from: 'SYAI Enquiries <onboarding@resend.dev>', // Must be a verified domain or onboarding@resend.dev for free tier
      to: OUR_EMAIL,
      subject: `New SYAI Inspire Enquiry: ${schoolName}`,
      html: `
        <h1>New SYAI Inspire Enquiry</h1>
        <p><strong>School Name:</strong> ${schoolName}</p>
        <p><strong>Contact Person:</strong> ${contactPerson}</p>
        <p><strong>Contact Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message ? message.replace(/\n/g, '<br>') : 'N/A'}</p>
      `,
    });

    if (emailToUs.error) {
      console.error('Resend error (to us):', emailToUs.error);
      return NextResponse.json({ error: 'Failed to send enquiry email to organization.', details: emailToUs.error.message }, { status: 500 });
    }

    // Confirmation email to the sender
    const confirmationEmailToSender = await resend.emails.send({
      from: 'SYAI Team <onboarding@resend.dev>', // Must be a verified domain or onboarding@resend.dev
      to: email, // Sender's email
      subject: 'Thank You for Your SYAI Inspire Enquiry!',
      html: `
        <h1>Thank You for Your Enquiry!</h1>
        <p>Dear ${contactPerson},</p>
        <p>Thank you for reaching out to Singapore Youth AI (SYAI) regarding our SYAI Inspire program for ${schoolName}.</p>
        <p>We have received your message and our team will get back to you as soon as possible.</p>
        <p><strong>Your Enquiry Summary:</strong></p>
        <ul>
          <li><strong>School Name:</strong> ${schoolName}</li>
          <li><strong>Message:</strong> ${message ? message.substring(0,100) + (message.length > 100 ? '...' : '') : 'N/A'}</li>
        </ul>
        <p>In the meantime, feel free to explore more about us on our website.</p>
        <p>Best regards,</p>
        <p>The SYAI Team</p>
      `,
    });

    if (confirmationEmailToSender.error) {
      console.error('Resend error (to sender):', confirmationEmailToSender.error);
      // Still return success to the client as the main enquiry was sent to us
      // but log this error for monitoring.
      return NextResponse.json({ message: 'Enquiry submitted and sent to organization, but failed to send confirmation email to sender.' });
    }

    return NextResponse.json({ message: 'Enquiry submitted successfully!' });

  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
} 