import { storageUrl } from '@/lib/constants'

/**
 * Structural coach data — photo, identity, gallery. Bilingual bullet lists
 * (expertise / achievements / education) live in `messages/*.json` under
 * `Lessons.coaches.<i18nKey>.<field>` and are rendered with `t.raw()` in
 * `app/[locale]/lessons/page.tsx` so they translate per locale.
 */
export interface Coach {
  name: string
  fullName: string
  nickname: string
  /** Lowercase identifier used to look up the translation sub-namespace. */
  i18nKey: 'boss' | 'ratchavin' | 'min'
  photo: string
  gallery: string[]
}

export const coaches: Coach[] = [
  {
    name: 'PRO Boss',
    fullName: 'Parin Phokan',
    nickname: 'Boss',
    i18nKey: 'boss',
    photo: storageUrl('lessons/coach-boss.png'),
    gallery: [
      storageUrl('lessons/coach-boss-gallery-01.jpg'),
      storageUrl('lessons/coach-boss-gallery-02.jpg'),
      storageUrl('lessons/coach-boss-gallery-03.jpg'),
      storageUrl('lessons/coach-boss-gallery-04.jpg'),
    ],
  },
  {
    name: 'PRO Ratchavin',
    fullName: 'Ratchavin Tanakasempipat',
    nickname: 'Ratchavin',
    i18nKey: 'ratchavin',
    photo: storageUrl('lessons/coach-ratchavin.png'),
    gallery: [
      storageUrl('lessons/coach-ratchavin-gallery-01.jpg'),
      storageUrl('lessons/coach-ratchavin-gallery-02.jpg'),
      storageUrl('lessons/coach-ratchavin-gallery-03.jpg'),
      storageUrl('lessons/coach-ratchavin-gallery-04.jpg'),
    ],
  },
  {
    name: 'PRO Min',
    fullName: 'Varuth Kjonkittiskul',
    nickname: 'Min',
    i18nKey: 'min',
    photo: storageUrl('lessons/coach-min.png'),
    gallery: [
      storageUrl('lessons/coach-min-gallery-01.jpg'),
      storageUrl('lessons/coach-min-gallery-02.jpg'),
      storageUrl('lessons/coach-min-gallery-03.jpg'),
      storageUrl('lessons/coach-min-gallery-04.jpg'),
    ],
  },
]
