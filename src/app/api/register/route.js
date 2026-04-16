import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Otp from '@/models/Otp';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        await dbConnect();
        const { name, email, phone, password, otp } = await req.json();

        if (!otp) {
            return NextResponse.json({ message: 'OTP is required' }, { status: 400 });
        }

        // Verify OTP
        const validOtp = await Otp.findOne({ email, otp });
        if (!validOtp) {
            return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists with this email' },
                { status: 400 }
            );
        }

        // OTP Valid - delete it to prevent reuse
        await Otp.deleteOne({ _id: validOtp._id });


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            provider: 'credentials',
            role: 'user'
        });

        return NextResponse.json(
            { message: 'User registered successfully', user: { id: user._id, name: user.name, email: user.email } },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
