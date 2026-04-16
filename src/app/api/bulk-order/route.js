import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BulkOrder from '@/models/BulkOrder';

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const bulkOrder = await BulkOrder.create(body);

        // Notify Admin
        try {
            const { sendBulkOrderEnquiryEmail } = await import('@/lib/email');
            await sendBulkOrderEnquiryEmail(bulkOrder);
        } catch (emailError) {
            console.error('Failed to send admin notification:', emailError);
        }

        return NextResponse.json({ success: true, data: bulkOrder }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
