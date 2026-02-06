import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/tin-tuc/',
                    '/san-pham/',
                    '/dai-ly/',
                ],
                disallow: [
                    '/profile/',
                    '/login/',
                    '/register/',
                ],
            },
            // Rule riêng cho AI crawlers
            {
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'Google-Extended',
                    'Claude-Web',
                    'OAI-SiteChecker',
                    'anthropic-ai',
                    'FacebookBot'
                ],
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/profile/',
                    '/user/',
                ],
                // Thêm crawl delay cho AI bots
                crawlDelay: 2,
            },
            // Googlebot riêng
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
                ],
                crawlDelay: 1,
            },
            // Chặn hoàn toàn các AI crawlers nếu không muốn
            {
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'Google-Extended',
                    'CCBot',
                    'OAI-SiteChecker',
                ],
                disallow: '/', // Chặn toàn bộ nếu cần
            },
        ],
        sitemap: 'https://potechvietnam.vn/sitemap.xml',
        host: 'https://potechvietnam.vn',
    }
}