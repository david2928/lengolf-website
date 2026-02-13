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

export function getEventsPricingJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'LENGOLF Event Packages',
    description: 'Event and party packages at LENGOLF Bangkok — indoor golf venue with full bar and catering',
    provider: {
      '@type': 'EntertainmentBusiness',
      name: BUSINESS_INFO.name,
      url: SITE_URL,
    },
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Small Event Package',
        description: '10–15 guests, 2 golf bays, 3 hours. Includes 10 beers, 5 cocktails, unlimited soft drinks, and catered food spread from Smith & Co.',
        price: '9999',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Medium Event Package',
        description: '15–25 guests, 4 golf bays, 3 hours, exclusive full-location rental. Includes 20 beers, 10 cocktails, unlimited soft drinks, and catered food from Smith & Co. & Pizza Mania.',
        price: '21999',
        priceCurrency: 'THB',
      },
    ],
  }
}

export function getLessonsPricingJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'LENGOLF Golf Lesson Packages',
    description: 'Golf coaching packages with Thailand PGA-certified professionals at LENGOLF Bangkok. Simulator usage included.',
    provider: {
      '@type': 'EntertainmentBusiness',
      name: BUSINESS_INFO.name,
      url: SITE_URL,
    },
    itemListElement: [
      {
        '@type': 'Offer',
        name: '1 Hour Golf Lesson',
        description: 'One-on-one coaching with a PGA-certified professional, golf simulator usage included',
        price: '1800',
        priceCurrency: 'THB',
        unitCode: 'HUR',
        eligibleDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'HUR' },
      },
      {
        '@type': 'Offer',
        name: '5 Hour Golf Lesson Package',
        description: '5 hours of coaching, valid for 6 months, golf simulator usage included',
        price: '8500',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: '10 Hour Golf Lesson Package',
        description: '10 hours of coaching, valid for 12 months, golf simulator usage included',
        price: '16000',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: '20 Hour Golf Lesson Package',
        description: '20 hours of coaching, valid for 24 months, golf simulator usage included',
        price: '31000',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: '30 Hour Golf Lesson Package',
        description: '30 hours of coaching, valid for 24 months, golf simulator usage included',
        price: '45000',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: '50 Hour Golf Lesson Package',
        description: '50 hours of coaching, valid for 24 months, golf simulator usage included',
        price: '72000',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Starter Package',
        description: '5 hours coaching + 5 hours practice, valid for 6 months, free golf glove included',
        price: '11000',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Sim to Fairway Package',
        description: '5 hours coaching + 1 on-course lesson, on-course fees covered by customer',
        price: '13499',
        priceCurrency: 'THB',
      },
    ],
  }
}

export function getClubRentalPricingJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'LENGOLF Golf Club Rental',
    description: 'Golf club rental service at LENGOLF Bangkok — free standard sets, premium Callaway & Majesty rentals, gear add-ons, and delivery in Bangkok',
    provider: {
      '@type': 'EntertainmentBusiness',
      name: BUSINESS_INFO.name,
      url: SITE_URL,
    },
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Standard Club Set – Free',
        description: 'House set included free with every bay booking. Men\'s and ladies\' sets available. Driver, irons (5–PW), putter.',
        price: '0',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Premium Men\'s Clubs – Callaway Warbird',
        description: 'Full set: driver, fairway woods, irons (5–PW), putter. Use at LENGOLF or any Bangkok golf course.',
        price: '150',
        priceCurrency: 'THB',
        unitCode: 'HUR',
        eligibleDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'HUR' },
      },
      {
        '@type': 'Offer',
        name: 'Premium Women\'s Clubs – Majesty Shuttle',
        description: 'Full set: driver, fairway woods, irons (5–PW), putter. Use at LENGOLF or any Bangkok golf course.',
        price: '150',
        priceCurrency: 'THB',
        unitCode: 'HUR',
        eligibleDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'HUR' },
      },
      {
        '@type': 'Offer',
        name: 'Premium Club Rental – 2 Hours',
        description: 'Callaway Warbird or Majesty Shuttle full set for 2 hours',
        price: '250',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Premium Club Rental – 4 Hours',
        description: 'Callaway Warbird or Majesty Shuttle full set for 4 hours',
        price: '400',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Premium Club Rental – Full Day',
        description: 'Callaway Warbird or Majesty Shuttle full set for a full day',
        price: '1200',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Golf Gloves',
        description: 'Premium synthetic leather gloves in all sizes',
        price: '600',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Golf Balls – 6 Pack',
        description: 'Practice-grade balls for range or course play, 6 balls per pack',
        price: '400',
        priceCurrency: 'THB',
      },
      {
        '@type': 'Offer',
        name: 'Club Delivery in Bangkok',
        description: 'Same-day delivery of premium club sets anywhere in Bangkok',
        price: '500',
        priceCurrency: 'THB',
      },
    ],
  }
}

export function getAggregateRatingJsonLd(rating: number, reviewCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EntertainmentBusiness',
    name: BUSINESS_INFO.name,
    url: SITE_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
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
