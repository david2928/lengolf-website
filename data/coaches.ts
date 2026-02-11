import { storageUrl } from '@/lib/constants'

export interface Coach {
  name: string
  fullName: string
  nickname: string
  photo: string
  expertise: string[]
  achievements: string[]
  education: string[]
  gallery: string[]
}

export const coaches: Coach[] = [
  {
    name: 'PRO Boss',
    fullName: 'Parin Phokan',
    nickname: 'Boss',
    photo: storageUrl('lessons/coach-boss.png'),
    expertise: [
      'Drive Training',
      'Course Management',
      'Advanced shot shaping',
      'Junior Golf Development',
    ],
    achievements: [
      'Lone Star Men\'s Championship 2022, USA: Finished T44',
      'DBU Men\'s Classic 2022, USA: Finished T22',
      'Singha-SAT TDT Nakhon Nayok 2022: Finished T59',
    ],
    education: [
      'New Mexico Military Institute, Roswell, NW',
      'Texas A&M International University, Laredo, TX',
      'Became a Golf Instructor licensed by Thailand PGA in Sep 2022 / GI 1416',
    ],
    gallery: [
      storageUrl('lessons/coach-boss-gallery-01.png'),
      storageUrl('lessons/coach-boss-gallery-02.png'),
      storageUrl('lessons/coach-boss-gallery-03.jpg'),
      storageUrl('lessons/coach-boss-gallery-04.jpg'),
    ],
  },
  {
    name: 'PRO Ratchavin',
    fullName: 'Ratchavin Tanakasempipat',
    nickname: 'Ratchavin',
    photo: storageUrl('lessons/coach-ratchavin.png'),
    expertise: [
      'Beginner Golf Programs',
      'Short Game',
      'Junior Golf Development',
    ],
    achievements: [
      'Turn pro as Thailand PGA Tournament player, 2020',
      'All Thailand Golf Tour Thailand PGA, 2021',
      'Golf Instructor - 9Vision Golf Performance, 2022',
    ],
    education: [
      'TrackMan Certifies Professional Level 2',
      'Scott Cowx Certifies 8.0 Level 2',
      'Smart2Move BioSwing Dynamics Level 1',
      'Swing Catalyst Certifies Instructor',
      'U.S Kids Golf Certifies Coach 1',
    ],
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
    photo: storageUrl('lessons/coach-min.png'),
    expertise: [
      'Beginner Golf Programs',
      'Course Management',
      'Advanced shot shaping',
      'Putting Program',
    ],
    achievements: [
      'Champion of VPG Vietnam Heron Lake Match Play 2019 (T-1)',
      'VPG Tour Trang An Championship 2019 (T-2)',
      'VGA Tour Nam A Bank Vietnam Masters 2023 (T-6)',
    ],
    education: [
      'Bachelor of Sport Science',
      'Became Professional Golfer Licensed by PGA Thailand since 2019 (TP0944)',
    ],
    gallery: [
      storageUrl('lessons/coach-min-gallery-01.jpg'),
      storageUrl('lessons/coach-min-gallery-02.jpg'),
      storageUrl('lessons/coach-min-gallery-03.jpg'),
      storageUrl('lessons/coach-min-gallery-04.jpg'),
    ],
  },
]
