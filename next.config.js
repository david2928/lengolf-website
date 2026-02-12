/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.len.golf',
      },
      {
        protocol: 'https',
        hostname: 'len.golf',
      },
      {
        protocol: 'https',
        hostname: 'bisimqmtxjsptehhqpeg.supabase.co',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/:path*.(ico|svg|png|jpg|jpeg|gif|webp)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.(woff|woff2|ttf|otf|eot)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    // WordPress blog posts lived at root level (/{slug}/).
    // Next.js serves them under /blog/{slug}/.
    // These 301 redirects preserve SEO equity from the old WordPress URLs.
    const blogSlugs = [
      'bangkok-golf-centre-vs-lengolf',
      'bangkok-rainy-season-indoor-golf',
      'corporate-team-building-bangkok-golf-simulator',
      'couple-activities-in-bangkok',
      'exploring-bangkok-with-kids',
      'exploring-golf-in-bangkok',
      'fairway-golf-city-club-vs-lengolf',
      'finding-your-perfect-bangkok-retreat',
      'first-time-golf-simulator-beginners-guide',
      'fix-your-golf-swing-bangkok',
      'fun-activities-in-bangkok',
      'fun-activities-in-bangkok-2',
      'golf-lessons-in-bangkok',
      'golf-point-center-vs-lengolf',
      'golf-simulator-in-bangkok',
      'guide-to-the-best-driving-ranges-in-bangkok',
      'learn-to-golf-here-in-bangkok',
      'lengolf-and-front9-bangkoks-premier-indoor-golf-venues',
      'mastering-the-golf-driving-range',
      'planning-the-perfect-thailand-retreat',
      'plan-your-family-trip-to-bangkok',
      'romantic-things-to-do-in-bangkok-for-couples',
      'setting-up-and-maintaining-an-indoor-golf-course',
      'skygolf-club-vs-lengolf',
      'topgolf-bangkok-vs-lengolf',
      'ultimate-guide-to-golf-courses-in-bangkok',
      'what-to-do-in-bangkok',
    ]

    // Generate both /{slug} and /{slug}/ sources to avoid redirect chains
    // with trailingSlash: true
    const blogRedirects = blogSlugs.flatMap((slug) => [
      { source: `/${slug}`, destination: `/blog/${slug}`, permanent: true },
      { source: `/${slug}/`, destination: `/blog/${slug}/`, permanent: true },
    ])

    // WordPress page-type taxonomy -> relevant Next.js service pages
    const pageTypeRedirects = [
      { source: '/page-type/corporate-events', destination: '/events', permanent: true },
      { source: '/page-type/golf-club-rental', destination: '/golf', permanent: true },
      { source: '/page-type/golf-lessons', destination: '/lessons', permanent: true },
      { source: '/page-type/golf-near', destination: '/golf', permanent: true },
      { source: '/page-type/indoor-golf', destination: '/golf', permanent: true },
      { source: '/page-type/things-to-do', destination: '/events', permanent: true },
    ]

    // WordPress location-area taxonomy -> most relevant location page per area
    const locationAreas = [
      'ari', 'asok', 'chidlom', 'ekkamai', 'nana', 'phaya-thai',
      'phrom-phong', 'ploenchit', 'ratchadamri', 'sathorn', 'siam',
      'silom', 'sukhumvit', 'thong-lo',
    ]
    const locationAreaRedirects = locationAreas.map((area) => ({
      source: `/location-area/${area}`,
      destination: `/location/indoor-golf-${area}`,
      permanent: true,
    }))

    return [
      ...blogRedirects,
      ...pageTypeRedirects,
      ...locationAreaRedirects,

      // WordPress tag, category, and author archives -> blog listing
      { source: '/tag/:slug', destination: '/blog', permanent: true },
      { source: '/tag/:slug/:path*', destination: '/blog', permanent: true },
      { source: '/category/:slug', destination: '/blog', permanent: true },
      { source: '/category/:slug/:path*', destination: '/blog', permanent: true },
      { source: '/author/:slug', destination: '/blog', permanent: true },
      { source: '/author/:slug/:path*', destination: '/blog', permanent: true },

      // WordPress pagination archives -> blog listing
      { source: '/page/:path*', destination: '/blog', permanent: true },

      // WordPress feed URLs -> blog listing
      { source: '/feed', destination: '/blog', permanent: true },
      { source: '/feed/:path*', destination: '/blog', permanent: true },
      { source: '/comments/feed', destination: '/blog', permanent: true },

      // WordPress internal paths -> homepage.
      // These paths have no SEO value; 301 prevents infinite 404 crawl loops.
      { source: '/wp-admin', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },
      { source: '/wp-json/:path*', destination: '/', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },
      { source: '/xmlrpc.php', destination: '/', permanent: true },

      // WordPress search -> homepage (no search in Next.js app)
      { source: '/search/:path*', destination: '/', permanent: false },
    ]
  },
};

module.exports = nextConfig;
