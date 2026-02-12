import type { Metadata } from 'next'
import Image from 'next/image'
import SectionWrapper from '@/components/shared/SectionWrapper'
import ImageGallery from '@/components/shared/ImageGallery'
import { storageUrl, SITE_URL } from '@/lib/constants'
import { coaches } from '@/data/coaches'
import { lessonPricing, lessonNotes } from '@/data/pricing'

export const metadata: Metadata = {
  title: 'Golf Lessons & Coaching',
  description: 'Take golf lessons at LENGOLF Bangkok from Thailand PGA professionals. Personalized instruction for all skill levels. Packages from 1,800 THB.',
  alternates: { canonical: `${SITE_URL}/lessons/` },
}

const promoImages = [
  { src: storageUrl('lessons/promo-starter-package.jpg'), alt: 'Starter Package' },
  { src: storageUrl('lessons/promo-coaching-package.jpg'), alt: 'Coaching Package' },
  { src: storageUrl('lessons/promo-swing-analysis.jpg'), alt: 'Free Swing Analysis' },
  { src: storageUrl('lessons/promo-lesson.jpg'), alt: 'Lesson Promo' },
]

const studentImages = [
  { src: storageUrl('lessons/student-01.jpg'), alt: 'Student practice', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-02.jpg'), alt: 'Golf student', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-03.jpg'), alt: 'Student lesson', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-04.png'), alt: 'Student photo', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-05.png'), alt: 'Student practice', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-06.jpg'), alt: 'Junior golf', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-07.jpg'), alt: 'Junior golfer', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-08.jpg'), alt: 'Student improvement', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-09.jpg'), alt: 'Golf student', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-10.jpg'), alt: 'Student training', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-11.jpg'), alt: 'Golf lesson', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-kids-01.png'), alt: 'Kids golf', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-kids-02.png'), alt: 'Kids lesson', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-kids-03.png'), alt: 'Junior coaching', width: 1200, height: 800 },
]

export default function LessonsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex h-[50vh] min-h-[400px] max-h-[550px] items-center text-white overflow-hidden">
        <Image
          src={storageUrl('lessons/hero-lessons.jpg')}
          alt="Golf coaching at LENGOLF"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,90,50,0.55) 0%, rgba(0,122,69,0.45) 40%, rgba(0,90,50,0.3) 100%)',
          }}
        />
        <div className="relative z-10 w-full text-left" style={{ paddingLeft: '4%', paddingRight: '4%' }}>
          <span
            className="inline-block rounded px-6 py-2 text-lg font-bold uppercase tracking-widest text-white mb-5 md:text-xl"
            style={{ backgroundColor: '#7CB342' }}
          >
            Golf Coaching
          </span>
          <h1 className="mb-4 text-5xl font-black uppercase leading-none md:text-6xl lg:text-7xl">
            Improve Your Game
          </h1>
          <p className="text-base font-semibold italic tracking-wide text-white/90 md:text-lg">
            Take golf lessons at LENGOLF
          </p>
        </div>
      </section>

      {/* ── Intro ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            At <strong className="text-foreground">LENGOLF</strong>, we offer comprehensive golf lessons led by a Thailand PGA professional. Whether you&apos;re looking to improve your driving, mid-range, or short game, our personalized instruction caters to your specific needs and skill level. Choose from flexible hourly sessions or opt for our extensive 10-hour package for a deep dive into refining your technique. Experience unparalleled coaching in a supportive environment dedicated to enhancing your golfing prowess.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Our Coach ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-12 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>OUR</span>{' '}
            <span className="text-foreground">COACH</span>
          </h2>
          <div className="space-y-20">
            {coaches.map((coach, i) => (
              <div key={coach.nickname} className={`flex flex-col items-start gap-8 lg:flex-row ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/3">
                  <Image
                    src={coach.photo}
                    alt={coach.name}
                    width={400}
                    height={600}
                    className="w-full rounded-lg object-cover"
                  />
                </div>
                <div className="w-full lg:w-2/3">
                  <h3
                    className="text-2xl font-bold italic"
                    style={{ color: '#007429' }}
                  >
                    {coach.name}
                  </h3>
                  <p className="text-muted-foreground">({coach.fullName})</p>

                  <div className="mt-6 grid gap-6 sm:grid-cols-3">
                    <div>
                      <h4 className="mb-2 font-semibold" style={{ color: '#007429' }}>Coaching Expertise</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {coach.expertise.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold" style={{ color: '#007429' }}>Career Achievements</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {coach.achievements.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold" style={{ color: '#007429' }}>Education</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {coach.education.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-4 gap-2">
                    {coach.gallery.map((img, j) => (
                      <Image
                        key={j}
                        src={img}
                        alt={`${coach.name} photo ${j + 1}`}
                        width={200}
                        height={150}
                        className="rounded-lg object-cover aspect-[4/3]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Lessons ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>OUR</span>{' '}
            <span className="text-foreground">LESSONS</span>
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            At <strong className="text-foreground">LENGOLF</strong>, <strong className="text-foreground">our Swing Building and Improvement Program</strong> is designed to enhance your golf skills through personalized lessons. Our expert instructors assess all aspects of your game, using advanced video analysis to identify and correct technique mistakes. This tailored approach helps you understand your swing and practice effectively, leading to quicker improvement.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Our lessons take place on our state-of-the-art indoor golf simulators, which feature auto tee systems and realistic surface mats. You&apos;ll work on mastering swing fundamentals, improving physical strength, enhancing lateral rotation, and learning effective warm-up exercises.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Through our focused lessons, you&apos;ll gain the confidence to play on courses, hit precise golf shots consistently, and enjoy the game more. With expert guidance and cutting-edge technology, <strong className="text-foreground">LENGOLF&apos;s</strong> lesson program is the key to achieving your golf goals.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Pricing Table ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>LESSON</span>{' '}
            <span className="text-foreground">PRICING</span>
          </h2>
          <div className="mx-auto max-w-4xl overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ backgroundColor: '#1B5E3B' }} className="text-white">
                  <th className="px-4 py-3 text-center text-sm font-semibold">Courses Packages</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">1 Golfer</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">2 Golfers</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">3-5 Golfers</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Remark</th>
                </tr>
              </thead>
              <tbody>
                {lessonPricing.map((row) => (
                  <tr key={row.name} className="border-b border-gray-200">
                    <td className="px-4 py-3 text-center text-sm font-medium">{row.name}</td>
                    <td className="px-4 py-3 text-center text-sm">{row.oneGolfer}</td>
                    <td className="px-4 py-3 text-center text-sm">{row.twoGolfers}</td>
                    <td className="px-4 py-3 text-center text-sm">{row.threeToFiveGolfers}</td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">{row.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 space-y-2">
              {lessonNotes.map((note) => (
                <p key={note} className="text-sm text-muted-foreground">{note}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Packages & Promotions ── */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>OUR PACKAGES &amp;</span>{' '}
          <span className="text-foreground">PROMOTIONS</span>
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
          {promoImages.map((img) => (
            <div key={img.src} className="overflow-hidden rounded-lg">
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={600}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Our Students ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>OUR</span>{' '}
            <span className="text-foreground">STUDENTS</span>
          </h2>
          <ImageGallery images={studentImages} rows={[3, 2, 2, 2, 2, 3]} />
        </div>
      </section>
    </>
  )
}
