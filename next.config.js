const createNextIntlPlugin = require('next-intl/plugin')
const { LEGACY_BLOG_SLUGS } = require('./lib/blog-slugs.js')

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

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
    // Blog slugs are now defined in lib/blog-slugs.ts for reuse in middleware.

    // All destinations use trailing slashes to match trailingSlash: true
    // and avoid extra redirect hops from trailing-slash normalization.
    const blogRedirects = LEGACY_BLOG_SLUGS.map((slug) => ({
      source: `/${slug}`,
      destination: `/blog/${slug}/`,
      permanent: true,
    }))

    // WordPress page-type taxonomy -> relevant Next.js service pages
    const pageTypeRedirects = [
      { source: '/page-type/corporate-events', destination: '/events/', permanent: true },
      { source: '/page-type/golf-club-rental', destination: '/golf-club-rental/', permanent: true },
      { source: '/page-type/golf-lessons', destination: '/lessons/', permanent: true },
      { source: '/page-type/golf-near', destination: '/golf/', permanent: true },
      { source: '/page-type/indoor-golf', destination: '/golf/', permanent: true },
      { source: '/page-type/things-to-do', destination: '/events/', permanent: true },
    ]

    // WordPress location-area taxonomy -> most relevant location page per area
    const locationAreas = [
      'ari', 'asok', 'chidlom', 'ekkamai', 'nana', 'phaya-thai',
      'phrom-phong', 'ploenchit', 'ratchadamri', 'sathorn', 'siam',
      'silom', 'sukhumvit', 'thong-lo',
    ]
    const locationAreaRedirects = locationAreas.map((area) => ({
      source: `/location-area/${area}`,
      destination: `/location/indoor-golf-${area}/`,
      permanent: true,
    }))

    // Fix for GSC 404 errors: redirect root-level location pages to /location/ prefix
    const rootLocationRedirects = [
      { source: '/indoor-golf-ploenchit', destination: '/location/indoor-golf-ploenchit/', permanent: true },
      { source: '/golf-near-sathorn', destination: '/location/golf-near-sathorn/', permanent: true },
      { source: '/golf-near-phrom-phong', destination: '/location/golf-near-phrom-phong/', permanent: true },
      { source: '/lesson', destination: '/lessons/', permanent: true },
    ]

    return [
      ...blogRedirects,
      ...pageTypeRedirects,
      ...locationAreaRedirects,
      ...rootLocationRedirects,

      // WordPress tag, category, and author archives -> blog listing
      { source: '/tag/:slug', destination: '/blog/', permanent: true },
      { source: '/tag/:slug/:path*', destination: '/blog/', permanent: true },
      { source: '/category/:slug', destination: '/blog/', permanent: true },
      { source: '/category/:slug/:path*', destination: '/blog/', permanent: true },
      { source: '/author/:slug', destination: '/blog/', permanent: true },
      { source: '/author/:slug/:path*', destination: '/blog/', permanent: true },

      // WordPress pagination archives -> blog listing
      { source: '/page/:path*', destination: '/blog/', permanent: true },

      // WordPress feed URLs -> blog listing
      { source: '/feed', destination: '/blog/', permanent: true },
      { source: '/feed/:path*', destination: '/blog/', permanent: true },
      { source: '/comments/feed', destination: '/blog/', permanent: true },

      // WordPress internal paths now return 404 (removed redirects).
      // Modern crawlers handle 404s properly; returning 404 is more semantically
      // correct than redirecting to homepage (which creates soft-404s).

      // WordPress image uploads -> relevant pages (not homepage).
      // Grouped by content type based on WordPress upload folder audit.
      // Lesson-related images (coach photos, packages, student photos)
      { source: '/wp-content/uploads/:y/:m/Copy-of-Pro-Boss:path*', destination: '/lessons/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/Pro-Rat:path*', destination: '/lessons/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/pro-min:path*', destination: '/lessons/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/GOLF_COACHING:path*', destination: '/lessons/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/Poster-for-Free-Swing:path*', destination: '/lessons/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/LENGOLF-Starter-Package:path*', destination: '/lessons/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/coachkids:path*', destination: '/lessons/', permanent: true },
      // Event-related images (venue photos, event setups)
      { source: '/wp-content/uploads/:y/:m/0B4A:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/DSC0:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/Copy_of_IMG:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/DJI_:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/online-conference:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/flags:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/people:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/handshake:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/confetti:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/film-camera:path*', destination: '/events/', permanent: true },
      // Tournament images
      { source: '/wp-content/uploads/:y/:m/TOURNAMENT:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/Copy-of-20240616:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/20240616:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/Copy-of-IMG_47:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/Copy-of-IMG_48:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/Copy-of-IMG_49:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/IMG_47:path*', destination: '/events/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/S__3792:path*', destination: '/events/', permanent: true },
      // Golf/setup images
      { source: '/wp-content/uploads/:y/:m/WAYS_TO_PLAY:path*', destination: '/golf/', permanent: true },
      { source: '/wp-content/uploads/:y/:m/OUR_SETUP:path*', destination: '/golf/', permanent: true },
      // Branding / logo
      { source: '/wp-content/uploads/:y/:m/Logo:path*', destination: '/', permanent: true },
      // Catch-all for remaining wp-content (promotional banners, misc) -> homepage
      { source: '/wp-content/:path*', destination: '/', permanent: true },

      // Tournaments page removed — redirect to events
      { source: '/tournaments', destination: '/events/', permanent: true },

      // WordPress search -> homepage (no search in Next.js app)
      { source: '/search/:path*', destination: '/', permanent: false },
    ]
  },
};

module.exports = withNextIntl(nextConfig);
