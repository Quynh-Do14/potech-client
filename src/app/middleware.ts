// middleware.ts hoặc next.config.js
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // Thêm X-Robots-Tag header
    response.headers.set(
        'X-Robots-Tag',
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    )

    // Thêm header điều khiển AI training
    response.headers.set(
        'X-Robots-Tag-AI',
        'search=yes, ai-train=no'
    )

    return response
}
