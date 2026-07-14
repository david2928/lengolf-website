import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { SITE_URL } from '@/lib/constants'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'LENGOLF Terms of Service - Read the terms and conditions for using our service.',
  alternates: { canonical: `${SITE_URL}/terms-of-service/` },
}

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Terms of Service', url: `${SITE_URL}/terms-of-service/` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <SectionWrapper>
      <div className="mx-auto max-w-3xl prose prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
        <h1>Terms of Service</h1>
        <p>Last updated: October 10, 2024</p>
        <p>
          Welcome to LENGOLF Booking System (&quot;the Service&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of our website and services. By using our Service, you agree to these Terms. If you do not agree, please do not use our Service.
        </p>

        <hr />

        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using our Service, you agree to comply with and be bound by these Terms. If you are using the Service on behalf of an organization, you represent that you have the authority to bind the organization to these Terms.
        </p>

        <h3>2. Changes to the Terms</h3>
        <p>
          We may update these Terms from time to time. Any changes will be posted on this page, and your continued use of the Service constitutes your acceptance of the updated Terms.
        </p>

        <h3>3. Use of the Service</h3>
        <ul>
          <li>You must be at least 13 years old to use our Service.</li>
          <li>You agree not to use the Service for any illegal or unauthorized purpose.</li>
          <li>You must not attempt to gain unauthorized access to our systems or interfere with the security of our Service.</li>
        </ul>

        <h3>4. User Accounts</h3>
        <ul>
          <li>You may be required to create an account to use certain features of the Service.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>We are not liable for any unauthorized access to your account resulting from your failure to secure your credentials.</li>
        </ul>

        <h3>5. Privacy Policy</h3>
        <p>
          Our Privacy Policy explains how we collect, use, and share your information. By using the Service, you consent to our data practices as described in our Privacy Policy.
        </p>

        <h3>6. Intellectual Property</h3>
        <ul>
          <li>All content, trademarks, logos, and other intellectual property in the Service belong to LENGOLF or our licensors.</li>
          <li>You may not copy, modify, distribute, or use any content from the Service without our express permission.</li>
        </ul>

        <h3>7. Termination</h3>
        <p>
          We may suspend or terminate your access to the Service at any time for any reason, including violation of these Terms. Upon termination, your rights to use the Service will cease immediately.
        </p>

        <h3>8. Disclaimer of Warranties</h3>
        <ul>
          <li>The Service is provided &quot;as is&quot; and &quot;as available.&quot;</li>
          <li>We do not guarantee that the Service will be uninterrupted or error-free.</li>
          <li>We are not responsible for any loss or damage resulting from your use of the Service.</li>
        </ul>

        <h3>9. Limitation of Liability</h3>
        <p>
          To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.
        </p>

        <h3>10. Governing Law</h3>
        <p>
          These Terms are governed by the laws of Thailand. Any disputes arising under these Terms shall be resolved in the courts of Thailand.
        </p>

        <h3>11. Contact Information</h3>
        <p>If you have any questions about these Terms, please contact us at: info@len.golf</p>

        <hr />

        <p>
          By using our Service, you acknowledge that you have read, understood, and agreed to these Terms of Service.
        </p>
      </div>
    </SectionWrapper>
    </>
  )
}
