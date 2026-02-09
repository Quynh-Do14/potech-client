import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Chặn hoàn toàn các AI crawlers không mong muốn - ĐẶT ĐẦU TIÊN
            {
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'CCBot',
                    'OAI-SiteChecker',
                    'anthropic-ai',
                    'FacebookBot',
                    'Claude-Web'
                ],
                disallow: '/',
            },
            // Rule cho Googlebot
            {
                userAgent: 'Googlebot',
                allow: [
                    '/',
                    '/tin-tuc/',
                    '/san-pham/',
                    '/dai-ly/',
                ],
                disallow: [
                    '/api/',
                    '/admin/',
                    '/profile/',
                    '/login/',
                    '/register/',
                    '/user/',
                ],
                crawlDelay: 1,
            },
            // Rule cho Google-Extended (AI crawler của Google)
            {
                userAgent: 'Google-Extended',
                allow: '/', // Cho phép crawl nếu muốn
                // hoặc disallow: '/' nếu muốn chặn hoàn toàn
                crawlDelay: 2,
            },
            // Rule mặc định cho tất cả user agents khác
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/tin-tuc/',
                    '/san-pham/',
                    '/dai-ly/',
                ],
                disallow: [
                    '/api/',
                    '/admin/',
                    '/profile/',
                    '/login/',
                    '/register/',
                    '/user/',
                ],
            },
        ],
        sitemap: 'https://potechvietnam.vn/sitemap.xml',
        // host: 'https://potechvietnam.vn', // Xóa dòng này vì không phải chuẩn robots.txt
    }
}