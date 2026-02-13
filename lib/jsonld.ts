import { SITE_URL, SITE_NAME, BUSINESS_INFO, SOCIAL_LINKS, storageUrl } from '@/lib/constants'

export function getLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EntertainmentBusiness',
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    url: SITE_URL,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '540 Ploenchit Road, The Mercury Ville, Floor 4',
      addressLocality: 'Pathum Wan',
      addressRegion: 'Bangkok',
      postalCode: '10330',
      addressCountry: 'TH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.coordinates.lat,
      longitude: BUSINESS_INFO.coordinates.lng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '23:00',
    },
    sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram],
    image: storageUrl('branding/logo.png'),
    priceRange: '$$',
  }
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: storageUrl('branding/logo.png'),
      },
      sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram],
    },
  }
}

export function getGolfPricingJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'LENGOLF Simulator Bay Pricing',
    description: 'Indoor golf simulator bay rates and monthly packages at LENGOLF Bangkok',
    provider: {
      '@type': 'EntertainmentBusiness',
      name: BUSINESS_INFO.name,
      url: SITE_URL,
    },
    itemListElement: [
      // Bay rates
      {
        '@type': 'Offer',
        name: 'Simulator Bay – Weekday Before 14:00',
        description: 'Mon–Thu, up to 5 players per bay, golf club rental included',
        price: '500',
        priceCurrency: 'THB',
        unitCode: 'HUR',
        eligibleDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'HUR' },
      },
      {
        '@type': 'Offer',
        name: 'Simulator Bay – Weekday 14:00–23:00',
        description: 'Mon–Thu, up to 5 players per bay, golf club rental included',
        price: '700',
        priceCurrency: 'THB',
        unitCode: 'HUR',
        eligibleDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'HUR' },
      },
      {
        '@type': 'Offer',
        name: 'Simulator Bay – Weekend Before 14:00',
        description: 'Fri–Sun & public holidays, up to 5 players per bay, golf club rental included',
        price: '700',
        priceCurrency: 'THB',
        unitCode: 'HUR',
        eligibleDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'HUR' },
      },
      {
        '@type': 'Offer',
        name: 'Simulator Bay – Weekend 14:00–23:00',
        description: 'Fri–Sun & public holidays, up to 5 players per bay, golf club rental included',
        price: '900',
        priceCurrency: 'THB',
        unitCode: 'HUR',
        eligibleDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'HUR' },
      },
      // Monthly packages
      {
        '@type': 'Offer',
        name: 'Early Bird Package – 10 Hours',
        description: '10 hours valid for 6 months, usable before 14:00 only',
        price: '4800',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Early Bird+ Package – Unlimited',
        description: 'Unlimited hours for 1 month, usable before 14:00 only, 5% off food & drinks',
        price: '5000',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Bronze Package – 5 Hours',
        description: '5 hours valid for 1 month',
        price: '3000',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Silver Package – 15 Hours',
        description: '15 hours valid for 3 months, 5% off food & drinks',
        price: '8000',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Gold Package – 30 Hours',
        description: '30 hours valid for 6 months, 10% off food & drinks',
        price: '14000',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Diamond Package – Unlimited',
        description: 'Unlimited hours for 1 month, 5% off food & drinks',
        price: '8000',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Diamond+ Package – Unlimited',
        description: 'Unlimited hours for 3 months, 10% off food & drinks',
        price: '18000',
        priceCurrency: 'THB',
      },
    ],
  }
}

export function getFaqPageJsonLd(faqItems: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
