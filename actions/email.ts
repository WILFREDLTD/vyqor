"use server"
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function sendContactEmail(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}) {
    try {
        // Save to DB
        const contact = await prisma.contact.create({ data });

        // Configure transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Build message
        const mailOptions = {
            from: process.env.SMTP_USER, // always your company email
            replyTo: data.email, // allows company to reply directly to client
            to: process.env.SMTP_USER, // company inbox
            subject: `📩 New Contact Form Submission from ${contact.firstName} ${contact.lastName}`,
            text: `
        You have received a new contact form submission:

        Name: ${contact.firstName} ${contact.lastName}
        Email: ${contact.email}
        Phone: ${contact.phone}
        Service: ${contact.service}

        Message:
        ${contact.message}
      `,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Service:</strong> ${contact.service}</p>
        <p><strong>Message:</strong><br/>${contact.message.replace(/\n/g, "<br/>")}</p>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return { success: true };
    } catch (error: any) {
        console.error("Error sending contact email:", error);
        return { success: false, error: error.message || "Email failed to send" };
    }
}