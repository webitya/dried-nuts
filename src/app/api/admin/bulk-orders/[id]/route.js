import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BulkOrder from '@/models/BulkOrder';
import { isAdmin } from '@/lib/admin-auth';

export async function PATCH(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        
        const adminAllowed = await isAdmin();
        if (!adminAllowed) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const updatedEnquiry = await BulkOrder.findByIdAndUpdate(id, body, { new: true });
        
        if (!updatedEnquiry) {
            return NextResponse.json({ success: false, message: 'Enquiry not found' }, { status: 404 });
        }

        // Notify Customer if status changed to Accepted or Rejected
        if (body.status === 'Accepted' || body.status === 'Rejected') {
            try {
                const { sendBulkOrderStatusUpdateEmail } = await import('@/lib/email');
                await sendBulkOrderStatusUpdateEmail(updatedEnquiry);
            } catch (emailError) {
                console.error('Failed to send status update email:', emailError);
            }
        }

        return NextResponse.json({ success: true, data: updatedEnquiry }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        
        const adminAllowed = await isAdmin();
        if (!adminAllowed) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const deletedEnquiry = await BulkOrder.findByIdAndDelete(id);
        
        if (!deletedEnquiry) {
            return NextResponse.json({ success: false, message: 'Enquiry not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
