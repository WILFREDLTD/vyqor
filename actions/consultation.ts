"use server";

import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { format } from "date-fns";

const prisma = new PrismaClient();

export async function scheduleConsultation(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  selectedDate: Date;
  selectedTime: string;
  additionalNotes?: string;
  googleMeetLink?: string;
}) {
  try {
    // Use provided googleMeetLink if present, otherwise fall back to env var
    const meetLink = data.googleMeetLink && data.googleMeetLink.trim().length > 0
      ? data.googleMeetLink
      : process.env.GOOGLE_MEET_URL || process.env.GOOGLE_MEET_LINK || "";
    // Save to DB
    const consultation = await prisma.consultation.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        service: data.service,
        selectedDate: data.selectedDate,
        selectedTime: data.selectedTime,
        additionalNotes: data.additionalNotes || null,
        googleMeetLink: meetLink,
      },
    });

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const formattedDate = format(data.selectedDate, "MMMM dd, yyyy");
    const dayName = format(data.selectedDate, "EEEE");
    const meetingDateTime = `${formattedDate} at ${data.selectedTime}`;
    const meetUrlToUse = data.googleMeetLink && data.googleMeetLink.trim().length > 0
      ? data.googleMeetLink
      : process.env.GOOGLE_MEET_URL || process.env.GOOGLE_MEET_LINK || "";

    // Email to applicant
    const applicantMailOptions = {
      from: process.env.SMTP_USER,
      to: data.email,
      subject: `✅ Your Consultation is Confirmed - ${data.service}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #34156e 0%, #340cac 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">✅ Consultation Confirmed</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Your meeting is scheduled!</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <p style="color: #333; font-size: 16px; margin: 0 0 20px 0; line-height: 1.6;">
                Hi <strong>${data.firstName}</strong>,
              </p>
              <p style="color: #666; font-size: 16px; margin: 0 0 30px 0; line-height: 1.6;">
                Great news! Your consultation has been successfully scheduled with our team. We're looking forward to meeting with you!
              </p>

              <!-- Meeting Details Card -->
              <div style="background: linear-gradient(135deg, #34156e/5 0%, #340cac/5 100%); border-left: 4px solid #340cac; padding: 25px; border-radius: 8px; margin: 30px 0;">
                <h3 style="color: #34156e; margin: 0 0 20px 0; font-size: 18px; font-weight: bold;">📅 Meeting Details</h3>
                
                <div style="margin-bottom: 15px;">
                  <p style="color: #999; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase;">Date</p>
                  <p style="color: #340cac; font-size: 16px; font-weight: bold; margin: 0;">${dayName}, ${formattedDate}</p>
                </div>

                <div style="margin-bottom: 15px;">
                  <p style="color: #999; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase;">Time</p>
                  <p style="color: #340cac; font-size: 16px; font-weight: bold; margin: 0;">${data.selectedTime}</p>
                </div>

                <div style="margin-bottom: 15px;">
                  <p style="color: #999; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase;">Service</p>
                  <p style="color: #34156e; font-size: 16px; font-weight: bold; margin: 0; text-transform: capitalize;">${data.service.replace(/-/g, ' ')}</p>
                </div>
              </div>

              <!-- Join Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${meetUrlToUse}" style="display: inline-block; background: linear-gradient(135deg, #1B9AAA 0%, #15757a 100%); color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; transition: transform 0.2s;">
                  🎥 Join Google Meet
                </a>
              </div>

              ${data.additionalNotes ? `
              <!-- Notes Section -->
              <div style="background-color: #fff8f0; border-left: 4px solid #ff9800; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="color: #ff9800; font-size: 12px; margin: 0 0 10px 0; text-transform: uppercase; font-weight: bold;">📝 Your Notes</p>
                <p style="color: #333; font-size: 14px; margin: 0; line-height: 1.6;">${data.additionalNotes}</p>
              </div>
              ` : ''}

              <!-- Important Info -->
              <div style="background-color: #f0f8ff; border-left: 4px solid #34156e; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="color: #34156e; font-size: 14px; margin: 0; line-height: 1.8;">
                  <strong>💡 Important:</strong> Please ensure you have a stable internet connection and a working microphone/camera before the meeting. Join a few minutes early to test your setup.
                </p>
              </div>

              <!-- Contact Info -->
              <p style="color: #666; font-size: 14px; margin: 30px 0 0 0; line-height: 1.6;">
                If you need to reschedule or have any questions, please reply to this email or contact us directly. We're here to help!
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #999; font-size: 12px; margin: 0 0 10px 0;">
                vico softwares
              </p>
              <p style="color: #bbb; font-size: 11px; margin: 0;">
                This email contains your consultation confirmation. Please keep it for your records.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email to company
    const companyMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_TO,
      subject: `📅 New Consultation Booked - ${data.firstName} ${data.lastName} (${data.service})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1B9AAA 0%, #15757a 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">📅 New Consultation Booking</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">A new client has scheduled a consultation</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <p style="color: #333; font-size: 16px; margin: 0 0 20px 0; line-height: 1.6;">
                You have a new consultation booking!
              </p>

              <!-- Client Information -->
              <div style="background: linear-gradient(135deg, #1B9AAA/5 0%, #15757a/5 100%); border-left: 4px solid #1B9AAA; padding: 25px; border-radius: 8px; margin: 30px 0;">
                <h3 style="color: #1B9AAA; margin: 0 0 20px 0; font-size: 18px; font-weight: bold;">👤 Client Information</h3>
                
                <div style="margin-bottom: 12px;">
                  <p style="color: #999; font-size: 11px; margin: 0 0 3px 0; text-transform: uppercase; font-weight: bold;">Name</p>
                  <p style="color: #333; font-size: 15px; margin: 0;">${data.firstName} ${data.lastName}</p>
                </div>

                <div style="margin-bottom: 12px;">
                  <p style="color: #999; font-size: 11px; margin: 0 0 3px 0; text-transform: uppercase; font-weight: bold;">Email</p>
                  <p style="color: #333; font-size: 15px; margin: 0;"><a href="mailto:${data.email}" style="color: #1B9AAA; text-decoration: none;">${data.email}</a></p>
                </div>

                <div style="margin-bottom: 12px;">
                  <p style="color: #999; font-size: 11px; margin: 0 0 3px 0; text-transform: uppercase; font-weight: bold;">Phone</p>
                  <p style="color: #333; font-size: 15px; margin: 0;"><a href="tel:${data.phone}" style="color: #1B9AAA; text-decoration: none;">${data.phone}</a></p>
                </div>

                <div>
                  <p style="color: #999; font-size: 11px; margin: 0 0 3px 0; text-transform: uppercase; font-weight: bold;">Service</p>
                  <p style="color: #333; font-size: 15px; margin: 0; text-transform: capitalize;">${data.service.replace(/-/g, ' ')}</p>
                </div>
              </div>

              <!-- Meeting Details -->
              <div style="background: linear-gradient(135deg, #34156e/5 0%, #340cac/5 100%); border-left: 4px solid #340cac; padding: 25px; border-radius: 8px; margin: 30px 0;">
                <h3 style="color: #34156e; margin: 0 0 20px 0; font-size: 18px; font-weight: bold;">📅 Meeting Details</h3>
                
                <div style="margin-bottom: 15px;">
                  <p style="color: #999; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; font-weight: bold;">Date & Time</p>
                  <p style="color: #340cac; font-size: 16px; font-weight: bold; margin: 0;">${dayName}, ${formattedDate} at ${data.selectedTime}</p>
                </div>

                <div>
                  <p style="color: #999; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; font-weight: bold;">Google Meet Link</p>
                  <p style="margin: 0;"><a href="${meetUrlToUse}" style="color: #1B9AAA; text-decoration: none; font-weight: bold;">${meetUrlToUse}</a></p>
                </div>
              </div>

              ${data.additionalNotes ? `
              <!-- Client Notes -->
              <div style="background-color: #fff8f0; border-left: 4px solid #ff9800; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="color: #ff9800; font-size: 12px; margin: 0 0 10px 0; text-transform: uppercase; font-weight: bold;">📝 Client Notes</p>
                <p style="color: #333; font-size: 14px; margin: 0; line-height: 1.6;">${data.additionalNotes}</p>
              </div>
              ` : ''}

              <!-- Action Items -->
              <div style="background-color: #f0fff4; border-left: 4px solid #2ecc71; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="color: #27ae60; font-size: 14px; margin: 0; line-height: 1.8;">
                  <strong>✓ Action Items:</strong><br>
                  • Prepare consultation materials<br>
                  • Review client details<br>
                  • Test Google Meet setup<br>
                  • Join 5 minutes before scheduled time
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #999; font-size: 12px; margin: 0 0 10px 0;">
                vico softwares - Consultation Management
              </p>
              <p style="color: #bbb; font-size: 11px; margin: 0;">
                This is an automated notification. Please do not reply to this email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(applicantMailOptions),
      transporter.sendMail(companyMailOptions),
    ]);

    return { success: true, consultationId: consultation.id };
  } catch (error: any) {
    console.error("Error scheduling consultation:", error);
    return { success: false, error: error.message || "Failed to schedule consultation" };
  }
}
