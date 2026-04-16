import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import Otp from '@/models/Otp';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        await dbConnect();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        // Generate 6 digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Delete any existing OTP for this email
        await Otp.deleteMany({ email });

        // Save new OTP
        await Otp.create({ email, otp: otpCode });

        // Setup Nodemailer (You'll need credentials in .env.local)
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            // Send Email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your Verification OTP',
                text: `Your OTP for account registration is: ${otpCode}. It is valid for 5 minutes.`,
                html: `<div style="font-family: Arial, sans-serif; padding: 20px;"><h2>Welcome!</h2><p>Your OTP for account registration is:</p><h1 style="color: #ea580c; font-size: 32px;">${otpCode}</h1><p>It is valid for 5 minutes.</p><br/><i>If you did not request this, please ignore this email.</i></div>`
            };

            await transporter.sendMail(mailOptions);
        } else {
            console.warn(`EMAIL_USER missing in .env.local. OTP for ${email} is: ${otpCode}`);
            // Still returning success to simulate the flow
        }

        return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Send OTP Error:', error);
        return NextResponse.json({ message: 'Failed to send OTP' }, { status: 500 });
    }
}
