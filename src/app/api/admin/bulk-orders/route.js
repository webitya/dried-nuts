import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BulkOrder from '@/models/BulkOrder';
import { isAdmin } from '@/lib/admin-auth';

export async function GET(req) {
    try {
        await dbConnect();
        
        const adminAllowed = await isAdmin();
        if (!adminAllowed) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const enquiries = await BulkOrder.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: enquiries }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
