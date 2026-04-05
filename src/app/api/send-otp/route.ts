import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a secure 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1e90e17ed23455", 
        pass: "a0f3a5f06694c8",
      },
    });

    const mailOptions = {
      from: '"EventSphere Security" <noreply@eventsphere.com>',
      to: email,
      subject: 'Your Student Verification OTP',
      text: `Your OTP for student verification is: ${otpCode}. It is valid for 10 minutes.`,
      html: `
        <div style="font-family: sans-serif; padding: 30px; background-color: #070707; color: #dcdcdc; border: 1px solid #b49b5c; border-radius: 4px; max-w-md; margin: auto;">
          <h2 style="color: #b49b5c; text-transform: uppercase; letter-spacing: 2px;">EventSphere Verification</h2>
          <p style="color: #8a8a8a;">Your one-time password for student verification is:</p>
          <h1 style="color: #ffffff; letter-spacing: 5px; font-size: 32px; background: rgba(180, 155, 92, 0.1); padding: 10px; display: inline-block; border: 1px solid rgba(180, 155, 92, 0.3);">${otpCode}</h1>
          <p style="color: #8a8a8a; font-size: 14px; margin-top: 20px;">Please enter this code on the website. Do not share this code with anyone.</p>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    // Log preview URL for testing locally
    if (!process.env.SMTP_HOST) {
      console.log("--- TEST EMAIL SENT ---");
      console.log("Preview your email here: %s", nodemailer.getTestMessageUrl(info));
      console.log("OTP Code is: " + otpCode);
    }

    // Return the generated OTP so the frontend can verify it against the user's input.
    // In a production app, you would hash and store this in DB instead of sending it.
    return NextResponse.json({ success: true, otp: otpCode });

  } catch (error: any) {
    console.error('Error sending OTP email:', error);
    return NextResponse.json({ error: error.message || 'Failed to send OTP email.' }, { status: 500 });
  }
}
