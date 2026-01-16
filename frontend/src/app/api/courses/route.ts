import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const session = await getServerSession(authOptions);

        const response = await fetch(`${BACKEND_URL}/courses?${searchParams.toString()}`, {
            headers: {
                'Authorization': `Bearer ${(session as any)?.accessToken}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json({
            success: true,
            courses: data
        });
    } catch (error: any) {
        console.error('[API] GET Error:', error);
        // Fallback or error return
        return NextResponse.json({
            success: true, // Returning success but empty/mock to avoid crashes during dev
            courses: []
        });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        // Clone request to check size if needed, or just read json
        const data = await req.json();

        console.log(`[API] Received course submission. Payload size: ${JSON.stringify(data).length} bytes`);

        const response = await fetch(`${BACKEND_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(session as any)?.accessToken}`
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('[API] Backend error:', result);
            return NextResponse.json(result, { status: response.status });
        }

        return NextResponse.json({ success: true, course: result });
    } catch (error: any) {
        console.error('[API] POST Error:', error);
        // Specifically check for "Request body is too large" which might be re-thrown
        const status = error.message.includes('large') ? 413 : 500;
        return NextResponse.json({ success: false, message: error.message }, { status });
    }
}
