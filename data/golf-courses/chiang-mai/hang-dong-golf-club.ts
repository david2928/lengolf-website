import type { GolfCourse } from '@/types/golf-courses'

export const course: GolfCourse = {
  slug: 'hang-dong-golf-club',
  region: 'chiang-mai',
  name: `Hang Dong Golf Club Chiangmai`,
  province: `Chiang Mai`,
  designer: null,
  holes: 9,
  par: 36,
  year_opened: null,
  green_fee_weekday_thb: 250,
  green_fee_weekend_thb: 250,
  fees_verified_at: '2026-07-30',
  // All-in package per this file's own EN prose (see `tips`). Setting this stops
  // generated copy calling the number a bare "green fee", which would tell a
  // reader the caddie and cart are extra when the prose says they are included.
  fee_is_package: true,
  // Zero, not 200: EN states "250 THB for 9 holes WITH caddie", so the caddie is
  // inside the rate (SpecTable renders 0 as "Included"). The 200 in the EN prose is
  // the customary TIP — "(plus 200 THB caddie tip)" — which the generated FAQ already
  // covers generically. Typing the tip as a fee asserted a charge no source supports.
  caddie_fee_thb: 0,
  cart_fee_thb: 300,
  caddie_required: true,
  cart_required: false,
  driving_range: null,
  website: null,
  phone: null,
  latitude: 18.7002,
  longitude: 98.9061,
  coordinates_verified_at: '2026-07-31',
  distance_from_bangkok_km: 700,
  drive_time_from_bangkok_min: null,
  google_maps_url: null,
  club_rental_available: true,
  club_rental_fee_thb: null,
  club_rental_brands: null,
  schema_markup: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"GolfCourse\",\n  \"name\": \"Hang Dong Golf Club Chiangmai\",\n  \"url\": \"https://len.golf/golf-courses/chiang-mai/hang-dong-golf-club\",\n  \"description\": null,\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"addressLocality\": \"Chiang Mai\",\n    \"addressCountry\": \"TH\"\n  },\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 18.67,\n    \"longitude\": 98.91\n  },\n  \"priceRange\": \"฿฿฿\",\n  \"amenityFeature\": [\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Caddie Required\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Golf Cart\",\n      \"value\": false\n    }\n  ]\n}",
  prose: {
    overview: `Hang Dong Golf Club Chiangmai is a 9-hole course (par 36, 2,751 yards) in the Hang Dong district south of Chiang Mai. It is a budget-friendly public facility with very affordable green fees (approximately 250 THB for 9 holes with caddie). Located approximately 15 minutes from CNX airport, it primarily serves local Chiang Mai residents and golfers seeking a quick affordable round. The course features water hazards on several holes including an island green on hole 8.`,
    layout_and_experience: `The 9-hole layout plays 2,751 yards to par 36 across flat Hang Dong valley terrain. Water hazards are the primary challenge, appearing on several holes. The island green on hole 8 is the signature feature. The layout is designed for recreational play rather than championship competition. Walking is permitted on this flat course.`,
    tips: `Green fees of approximately 250 THB for 9 holes with caddie (plus 200 THB caddie tip) represent the best value golf in the Chiang Mai area. Club rental available at approximately 350–450 THB all-in. Best for a quick round before a late-afternoon flight from CNX. Contact the course before visiting to confirm current fees — no official website available.`,
    location_and_access: `Hang Dong Golf Club Chiangmai is located in Tambon Namprae, Hang Dong district, approximately 15 minutes south of Chiang Mai International Airport (CNX). Visitors from Bangkok fly to CNX (approximately 1 hour 10 minutes) — driving 700 km from Bangkok is not practical. A Grab taxi from CNX takes approximately 15 minutes.`,
    rental_cta_context: `Fitting in a quick 9 holes at Hang Dong Golf Club before your flight? Rent premium clubs in Bangkok — delivered to your hotel before you fly — so you can play everywhere on your Chiang Mai trip without carrying a bag through the airport.`,
  },
  locales: {
    en: {
      title: `Hang Dong Golf Club Chiangmai — Green Fees, Course Guide & Golf Club Rentals`,
      meta_description: `Hang Dong Golf Club Chiangmai green fees, course overview, tips, and how to arrange golf club rentals delivered to your Bangkok hotel.`,
    },
    th: {
      title: `Hang Dong Golf Club Chiangmai — แพ็กเกจรวมทุกอย่าง 9 หลุมราคาประหยัด และเช่าไม้กอล์ฟ`,
      meta_description: `ค่ากรีนฟี Hang Dong Golf Club Chiangmai ประมาณ 250 บาทสำหรับ 9 หลุมพร้อมแคดดี้ (ข้อมูล ณ กรกฎาคม 2026) สนามพาร์ 36 ระยะ 2,751 หลาใกล้สนามบินเชียงใหม่ พร้อมบริการเช่าไม้กอล์ฟส่งถึงโรงแรมในกรุงเทพฯ`,
      prose: {
        overview: `Hang Dong Golf Club Chiangmai เป็นสนาม 9 หลุม (พาร์ 36 ระยะ 2,751 หลา) ในอำเภอหางดง ทางใต้ของเชียงใหม่ เป็นสนามสาธารณะที่เน้นความคุ้มค่า ด้วยค่ากรีนฟีที่ย่อมเยามาก อยู่ที่ประมาณ 250 บาทสำหรับ 9 หลุมพร้อมแคดดี้ (ข้อมูล ณ กรกฎาคม 2026) ด้วยทำเลที่ห่างจากสนามบิน CNX ประมาณ 15 นาที สนามจึงให้บริการชาวเชียงใหม่ในพื้นที่เป็นหลัก รวมถึงนักกอล์ฟที่มองหาการออกรอบสั้น ๆ ในราคาประหยัด สนามมีอุปสรรคน้ำในหลายหลุม รวมถึงกรีนลักษณะเกาะกลางน้ำที่หลุม 8`,
        layout_and_experience: `เลย์เอาต์ 9 หลุมเล่นที่ระยะ 2,751 หลา พาร์ 36 บนภูมิประเทศราบเรียบของหุบเขาหางดง อุปสรรคน้ำเป็นความท้าทายหลักและปรากฏอยู่ในหลายหลุม โดยกรีนลักษณะเกาะกลางน้ำที่หลุม 8 เป็นจุดเด่นประจำสนาม เลย์เอาต์ออกแบบมาเพื่อการเล่นเพื่อพักผ่อนมากกว่าการแข่งขันระดับแชมเปียนชิพ และเนื่องจากพื้นที่ราบเรียบ จึงอนุญาตให้เดินออกรอบได้`,
        tips: `ค่ากรีนฟีประมาณ 250 บาทสำหรับ 9 หลุมพร้อมแคดดี้ (บวกทิปแคดดี้อีก 200 บาท) นับเป็นกอล์ฟที่คุ้มค่าที่สุดในย่านเชียงใหม่ (ข้อมูล ณ กรกฎาคม 2026) มีบริการเช่าไม้กอล์ฟในราคาเหมารวมประมาณ 350-450 บาท สนามนี้เหมาะที่สุดกับการออกรอบสั้น ๆ ก่อนขึ้นเครื่องเที่ยวบินช่วงบ่ายแก่ ๆ จาก CNX ควรติดต่อสนามก่อนเดินทางไปเพื่อยืนยันค่าธรรมเนียมปัจจุบัน เนื่องจากสนามไม่มีเว็บไซต์อย่างเป็นทางการ`,
        location_and_access: `Hang Dong Golf Club Chiangmai ตั้งอยู่ในตำบลน้ำแพร่ อำเภอหางดง ห่างจากท่าอากาศยานนานาชาติเชียงใหม่ (CNX) ลงมาทางใต้ประมาณ 15 นาที ผู้ที่เดินทางจากกรุงเทพฯ ใช้วิธีบินไป CNX (ประมาณ 1 ชั่วโมง 10 นาที) เพราะการขับรถระยะทาง 700 กิโลเมตรจากกรุงเทพฯ ไม่สะดวกในทางปฏิบัติ การเรียก Grab จาก CNX ใช้เวลาประมาณ 15 นาที`,
        rental_cta_context: `อยากแทรกการออกรอบ 9 หลุมสั้น ๆ ที่ Hang Dong Golf Club ก่อนขึ้นเครื่องใช่ไหม เช่าชุดไม้กอล์ฟคุณภาพพรีเมียมจาก LENGOLF ที่กรุงเทพฯ พร้อมบริการส่งถึงโรงแรมก่อนคุณขึ้นเครื่อง ให้คุณออกรอบได้ทุกที่ในทริปเชียงใหม่โดยไม่ต้องแบกถุงกอล์ฟผ่านสนามบิน`,
      },
    },
    ja: {
      title: `Hang Dong Golf Club Chiangmai — パッケージ料金・手軽に回れる9ホール紹介・クラブレンタル`,
      meta_description: `グリーンフィーはキャディー付き9ホールで約250THB（2026年7月現在）。Hang Dong Golf Club Chiangmaiはチェンマイ空港近くにあるパー36・2,751ヤードのコースです。バンコクのホテルへ届くLENGOLFのクラブレンタルもご案内します。`,
      prose: {
        overview: `Hang Dong Golf Club Chiangmaiは、チェンマイ南側のハーンドン郡にある9ホール（パー36、2,751ヤード）のコースです。予算重視のパブリックコースで、グリーンフィーはキャディー付き9ホールで約250THBときわめて手ごろです（2026年7月現在）。CNX空港からおよそ15分という立地から、利用者の中心はチェンマイ在住の地元ゴルファーと、短時間で安く回りたい方々。コースには複数のホールにウォーターハザードがあり、8番にはアイランドグリーンも設けられています。`,
        layout_and_experience: `9ホールのレイアウトはハーンドンの谷の平坦な地形に広がり、2,751ヤード・パー36でプレーします。主な難所はウォーターハザードで、複数のホールに顔を出します。なかでも8番のアイランドグリーンがこのコースの名物です。レイアウトはチャンピオンシップの競技よりも気軽なラウンドを想定した造り。平坦なコースなので歩いてのプレーも認められています。`,
        tips: `キャディー付き9ホールで約250THB（別途キャディーへのチップ200THB）というグリーンフィーは、チェンマイ一帯で最もお値打ちなゴルフと言えます（2026年7月現在）。クラブレンタルはオールインクルーシブでおよそ350〜450THBで利用できます。CNXから夕方遅めの便に乗る前に、さっと1ラウンド挟むのにうってつけ。公式サイトがないため、出かける前にコースへ連絡して現在の料金をご確認ください。`,
        location_and_access: `Hang Dong Golf Club Chiangmaiはハーンドン郡ナムプレー地区にあり、チェンマイ国際空港（CNX）から南へおよそ15分の距離です。バンコクからの来訪者はCNXへ空路で向かい（約1時間10分）、バンコクから700kmを車で走るのは現実的ではありません。CNXからGrabを使えば所要はおよそ15分です。`,
        rental_cta_context: `フライト前にHang Dong Golf Clubで9ホールをさっと回りたい方へ。LENGOLFなら質の高いクラブセットをバンコクでレンタルでき、フライト前にホテルまでお届けします。空港でキャディーバッグを担ぐことなく、チェンマイ旅行中どこでもプレーできます。`,
      },
    },
    ko: {
      title: `Hang Dong Golf Club Chiangmai 올인클루시브 패키지 — 치앙마이 9홀 가성비 가이드`,
      meta_description: `Hang Dong Golf Club Chiangmai 요금은 캐디를 포함한 9홀 약 250바트예요 (2026년 7월 기준). 치앙마이 공항 가까이에 있는 파 36, 2,751야드 코스와 방콕 호텔로 배달되는 LENGOLF 클럽 대여를 안내해요.`,
      prose: {
        overview: `Hang Dong Golf Club Chiangmai 코스는 치앙마이 남쪽 항동군에 자리한 9홀(파 36, 2,751야드) 코스예요. 예산을 아끼려는 골퍼를 위한 퍼블릭 시설로, 캐디를 포함한 9홀 요금이 약 250바트로 매우 저렴합니다 (2026년 7월 기준). CNX 공항에서 약 15분 거리라, 주로 치앙마이 현지 주민과 짧고 저렴하게 한 라운드 돌고 싶은 골퍼가 찾아요. 코스에는 여러 홀에 워터 해저드가 있고, 8번 홀에는 아일랜드 그린도 마련돼 있습니다.`,
        layout_and_experience: `9홀 레이아웃은 항동 계곡의 평탄한 지형 위에서 2,751야드 파 36으로 플레이해요. 주된 난관은 워터 해저드로 여러 홀에 얼굴을 내밀며, 그 가운데 8번 홀의 아일랜드 그린이 이 코스의 명물입니다. 레이아웃은 챔피언십 경기보다 가볍게 즐기는 라운딩을 염두에 두고 만들어졌고, 평탄한 코스라 걸어서 도는 플레이도 허용돼요.`,
        tips: `캐디를 포함한 9홀 약 250바트(별도로 캐디 팁 200바트)라는 요금은 치앙마이 일대에서 가장 가성비 좋은 골프라고 할 수 있어요 (2026년 7월 기준). 클럽 대여는 올인클루시브로 약 350~450바트에 이용할 수 있습니다. CNX에서 늦은 오후 비행기를 타기 전에 짧게 한 라운드 끼워 넣기에 안성맞춤이에요. 공식 웹사이트가 없으니, 방문하기 전에 코스에 연락해 현재 요금을 확인해 두세요.`,
        location_and_access: `Hang Dong Golf Club Chiangmai 코스는 항동군 남프래 지역에 있고, 치앙마이 국제공항(CNX)에서 남쪽으로 약 15분 거리예요. 방콕에서 오는 방문객은 CNX까지 비행기로 이동하며(약 1시간 10분), 방콕에서 700km를 운전하는 것은 현실적이지 않아요. CNX에서 Grab을 이용하면 약 15분이 걸립니다.`,
        rental_cta_context: `비행기를 타기 전에 Hang Dong Golf Club 코스에서 9홀을 짧게 돌아볼 생각인가요? LENGOLF는 방콕에서 품질 좋은 클럽 세트를 대여해 출발 전 호텔로 보내 드려요. 공항에서 골프백을 메고 다닐 필요 없이 치앙마이 여행 내내 어디서든 플레이할 수 있습니다.`,
      },
    },
    zh: null,
  },
  status: 'published',
  published_at: '2026-04-21',
}
