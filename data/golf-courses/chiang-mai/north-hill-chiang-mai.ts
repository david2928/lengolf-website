import type { GolfCourse } from '@/types/golf-courses'

export const course: GolfCourse = {
  slug: 'north-hill-chiang-mai',
  region: 'chiang-mai',
  name: `North Hill Golf Club Chiang Mai`,
  province: `Chiang Mai`,
  designer: null,
  holes: 18,
  par: 72,
  year_opened: 2015,
  green_fee_weekday_thb: 3400,
  green_fee_weekend_thb: 3400,
  // All-in package per this file's own EN prose (see `tips`): one rate covers
  // green fee, caddie and cart. Without this the generated copy calls the number
  // a bare "green fee", telling a reader the caddie and cart are extra.
  fee_is_package: true,
  // Zero, not the component price: EN states the rate INCLUDES caddie and cart,
  // so each costs this golfer nothing on top. SpecTable renders 0 as "Included".
  caddie_fee_thb: 0,
  cart_fee_thb: 0,
  caddie_required: true,
  cart_required: true,
  driving_range: true,
  website: 'https://www.northhillchiangmai.com/',
  phone: null,
  latitude: 18.6956,
  longitude: 98.9582,
  coordinates_verified_at: '2026-07-31',
  distance_from_bangkok_km: 700,
  drive_time_from_bangkok_min: null,
  google_maps_url: null,
  club_rental_available: true,
  club_rental_fee_thb: null,
  club_rental_brands: null,
  schema_markup: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"GolfCourse\",\n  \"name\": \"North Hill Golf Club Chiang Mai\",\n  \"url\": \"https://len.golf/golf-courses/chiang-mai/north-hill-chiang-mai\",\n  \"description\": null,\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"addressLocality\": \"Chiang Mai\",\n    \"addressCountry\": \"TH\"\n  },\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 18.7142,\n    \"longitude\": 98.96\n  },\n  \"priceRange\": \"฿฿฿\",\n  \"sameAs\": [\n    \"https://www.northhillchiangmai.com/\"\n  ],\n  \"amenityFeature\": [\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Driving Range\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Caddie Required\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Golf Cart\",\n      \"value\": true\n    }\n  ]\n}",
  prose: {
    overview: `North Hill Golf Club Chiang Mai is the most recently developed 18-hole course in the Chiang Mai area, having expanded from 9 holes to a full 18-hole layout in November 2015. Located in Ban Waen, Hang Dong district — approximately 15 minutes south of Chiang Mai International Airport — it is one of the most conveniently positioned courses for travellers arriving at CNX. The course operates as part of the North Hill City Resort complex, which also encompasses a spa, fitness centre, deluxe driving range, bar and restaurant. At 6,789 yards and par 72, it is a mid-length layout suited to a range of handicaps.`,
    layout_and_experience: `The course was originally a 9-hole private club and the expansion to 18 holes created a parkland-style layout with water hazards and bunkering throughout. The 6,789-yard total is comfortable for most standards of player from the back tees. The Hang Dong location places the course on flat-to-gentle terrain. The driving range at North Hill stands out for its quality and range of facilities.`,
    tips: `The all-in green fee package (approximately 3,400 THB including caddie and cart) simplifies budgeting. Book through the official website (northhillchiangmai.com) for current rates. At 15 minutes from CNX airport, this is an ideal first or last round on a Chiang Mai golf trip. The deluxe driving range is a good warm-up option before the round.`,
    location_and_access: `North Hill Golf Club is located in Ban Waen, Hang Dong district, approximately 15 minutes south of Chiang Mai International Airport (CNX). Visitors from Bangkok fly to CNX (approximately 1 hour 10 minutes from Suvarnabhumi or Don Mueang) — driving the 700 kilometres from Bangkok is not practical. A Grab taxi from CNX takes approximately 15 minutes.`,
    rental_cta_context: `Stopping off at North Hill Golf Club on your Chiang Mai golf trip? Rent premium clubs in Bangkok — delivered to your hotel before you fly — so you can jump straight from the airport to the first tee without the hassle of checked baggage.`,
  },
  locales: {
    en: {
      title: `North Hill Golf Club Chiang Mai — Green Fees, Course Guide & Golf Club Rentals`,
      meta_description: `North Hill Golf Club Chiang Mai green fees, course overview, tips, and how to arrange golf club rentals delivered to your Bangkok hotel.`,
    },
    th: {
      title: `North Hill Golf Club Chiang Mai — แพ็กเกจรวมทุกอย่าง รีวิวสนามใกล้สนามบิน และเช่าไม้กอล์ฟ`,
      meta_description: `ค่ากรีนฟีแบบเหมารวมประมาณ 3,400 บาท รวมแคดดี้และรถกอล์ฟ ที่ North Hill Golf Club Chiang Mai สนาม 18 หลุม พาร์ 72 ระยะ 6,789 หลา ห่างจากสนามบินเชียงใหม่ 15 นาที พร้อมบริการเช่าไม้กอล์ฟส่งถึงโรงแรมในกรุงเทพฯ`,
      prose: {
        overview: `North Hill Golf Club Chiang Mai เป็นสนาม 18 หลุมที่พัฒนาขึ้นใหม่ล่าสุดในย่านเชียงใหม่ โดยขยายจาก 9 หลุมเป็นเลย์เอาต์ 18 หลุมเต็มรูปแบบในเดือนพฤศจิกายน 2015 สนามตั้งอยู่ในตำบลบ้านแหวน อำเภอหางดง ห่างจากท่าอากาศยานนานาชาติเชียงใหม่ลงมาทางใต้ประมาณ 15 นาที จึงเป็นหนึ่งในสนามที่มีทำเลสะดวกที่สุดสำหรับนักเดินทางที่ลงเครื่องที่ CNX สนามดำเนินการเป็นส่วนหนึ่งของโครงการ North Hill City Resort ซึ่งประกอบด้วยสปา ฟิตเนสเซ็นเตอร์ สนามไดรฟ์ระดับดีลักซ์ บาร์ และร้านอาหาร ด้วยระยะ 6,789 หลาและพาร์ 72 ที่นี่จึงเป็นเลย์เอาต์ระยะกลางที่เหมาะกับนักกอล์ฟหลากหลายแฮนดิแคป`,
        layout_and_experience: `เดิมสนามแห่งนี้เป็นสโมสรส่วนตัวขนาด 9 หลุม และการขยายเป็น 18 หลุมได้สร้างเลย์เอาต์สไตล์พาร์กแลนด์ที่มีอุปสรรคน้ำและบังเกอร์กระจายอยู่ตลอดสนาม ระยะรวม 6,789 หลาถือว่ารับมือได้สบายสำหรับผู้เล่นเกือบทุกระดับเมื่อเล่นจากแท่นทีหลังสุด ทำเลในอำเภอหางดงทำให้สนามอยู่บนภูมิประเทศราบเรียบถึงลาดเอียงเล็กน้อย ส่วนสนามไดรฟ์ของ North Hill โดดเด่นทั้งในแง่คุณภาพและความหลากหลายของสิ่งอำนวยความสะดวก`,
        tips: `แพ็กเกจค่ากรีนฟีแบบเหมารวม (ประมาณ 3,400 บาท รวมแคดดี้และรถกอล์ฟ) ช่วยให้วางแผนงบประมาณได้ง่าย ควรจองผ่านเว็บไซต์อย่างเป็นทางการ (northhillchiangmai.com) เพื่อดูอัตราปัจจุบัน ด้วยระยะทางเพียง 15 นาทีจากสนามบิน CNX ที่นี่จึงเหมาะอย่างยิ่งกับการจัดเป็นรอบแรกหรือรอบสุดท้ายของทริปกอล์ฟเชียงใหม่ และสนามไดรฟ์ระดับดีลักซ์ก็เป็นตัวเลือกที่ดีสำหรับการวอร์มอัพก่อนออกรอบ`,
        location_and_access: `North Hill Golf Club ตั้งอยู่ในตำบลบ้านแหวน อำเภอหางดง ห่างจากท่าอากาศยานนานาชาติเชียงใหม่ (CNX) ลงมาทางใต้ประมาณ 15 นาที ผู้ที่เดินทางจากกรุงเทพฯ ใช้วิธีบินไป CNX (ประมาณ 1 ชั่วโมง 10 นาทีจากสนามบินสุวรรณภูมิหรือสนามบินดอนเมือง) เพราะการขับรถระยะทาง 700 กิโลเมตรจากกรุงเทพฯ ไม่สะดวกในทางปฏิบัติ การเรียก Grab จาก CNX ใช้เวลาประมาณ 15 นาที`,
        rental_cta_context: `วางแผนแวะออกรอบที่ North Hill Golf Club ในทริปกอล์ฟเชียงใหม่ของคุณอยู่ใช่ไหม เช่าชุดไม้กอล์ฟคุณภาพพรีเมียมจาก LENGOLF ที่กรุงเทพฯ พร้อมบริการส่งถึงโรงแรมก่อนคุณขึ้นเครื่อง ให้คุณเดินทางจากสนามบินไปยังแท่นทีแรกได้ทันทีโดยไม่ต้องยุ่งยากกับสัมภาระโหลด`,
      },
    },
    ja: {
      title: `North Hill Golf Club Chiang Mai — パッケージ料金・空港から15分の18ホール紹介・クラブレンタル`,
      meta_description: `オールインクルーシブのグリーンフィーはキャディーとカート込みで約3,400THB。North Hill Golf Club Chiang Maiはチェンマイ空港から15分の18ホール・パー72、6,789ヤードのコースです。バンコクのホテルへ届くLENGOLFのクラブレンタルもご案内します。`,
      prose: {
        overview: `North Hill Golf Club Chiang Maiはチェンマイ一帯で最も新しく整備された18ホールのコースで、2015年11月に9ホールから18ホールのフルレイアウトへと拡張されました。所在地はハーンドン郡バーンウェーンで、チェンマイ国際空港から南へおよそ15分。CNXに降り立つ旅行者にとって、最も立地の便利なコースのひとつです。コースはNorth Hill City Resortという複合施設の一部として運営されており、施設内にはスパ、フィットネスセンター、デラックスなドライビングレンジ、バー、レストランがそろいます。6,789ヤード・パー72という中程度の長さのレイアウトで、幅広いハンディキャップの方に向いています。`,
        layout_and_experience: `もともとは9ホールのプライベートクラブでしたが、18ホールへの拡張によって、ウォーターハザードとバンカーがコース全体に配されたパークランドスタイルのレイアウトが生まれました。6,789ヤードという総距離は、バックティーからでも大半のレベルのプレーヤーが無理なく回れる長さです。ハーンドンという立地から、地形は平坦から緩やかな傾斜にとどまります。North Hillのドライビングレンジは、その質と設備の充実ぶりでとくに目を引きます。`,
        tips: `オールインクルーシブのグリーンフィーパッケージ（キャディーとカートを含めておよそ3,400THB）なら、予算も立てやすくなります。現在の料金は公式サイト（northhillchiangmai.com）で確認して予約しましょう。CNX空港から15分という近さは、チェンマイのゴルフ旅行で最初または最後のラウンドとして理想的です。デラックスなドライビングレンジは、ラウンド前のウォーミングアップにも良い選択肢になります。`,
        location_and_access: `North Hill Golf Clubはハーンドン郡バーンウェーンにあり、チェンマイ国際空港（CNX）から南へおよそ15分の距離です。バンコクからの来訪者はCNXへ空路で向かい（スワンナプームまたはドンムアンから約1時間10分）、バンコクから700kmを車で走るのは現実的ではありません。CNXからGrabを使えば所要はおよそ15分です。`,
        rental_cta_context: `チェンマイのゴルフ旅行でNorth Hill Golf Clubに立ち寄る予定の方へ。LENGOLFなら質の高いクラブセットをバンコクでレンタルでき、フライト前にホテルまでお届けします。預け荷物の手間なく、空港からそのまま最初のティーへ向かえます。`,
      },
    },
    ko: {
      title: `North Hill Golf Club Chiang Mai 올인클루시브 패키지 — 치앙마이 공항 15분 18홀 가이드`,
      meta_description: `North Hill Golf Club Chiang Mai 올인클루시브 그린피는 캐디와 카트를 포함해 약 3,400바트예요. 치앙마이 공항에서 15분 거리의 18홀 파 72, 6,789야드 코스와 방콕 호텔로 배달되는 LENGOLF 클럽 대여를 안내해요.`,
      prose: {
        overview: `North Hill Golf Club Chiang Mai 코스는 치앙마이 일대에서 가장 최근에 정비된 18홀 코스로, 2015년 11월에 9홀에서 18홀 전체 레이아웃으로 확장됐어요. 위치는 항동군 반왠이며 치앙마이 국제공항에서 남쪽으로 약 15분 거리라, CNX에 내리는 여행자에게는 가장 편리한 코스 가운데 하나입니다. 코스는 스파와 피트니스 센터, 고급 드라이빙 레인지, 바, 레스토랑을 갖춘 North Hill City Resort 복합 시설의 일부로 운영돼요. 6,789야드 파 72라는 중간 길이의 레이아웃이라 다양한 핸디캡의 골퍼에게 두루 어울립니다.`,
        layout_and_experience: `원래는 9홀 프라이빗 클럽이었지만, 18홀로 확장하면서 워터 해저드와 벙커가 코스 전체에 배치된 파크랜드 스타일의 레이아웃이 만들어졌어요. 6,789야드라는 전장은 뒤쪽 티에서도 대부분의 수준에서 무리 없이 돌 수 있는 길이입니다. 항동이라는 입지 덕분에 지형은 평탄하거나 완만한 경사에 머물러요. North Hill의 드라이빙 레인지는 품질과 시설의 충실함으로 특히 눈길을 끕니다.`,
        tips: `올인클루시브 그린피 패키지(캐디와 카트를 포함해 약 3,400바트)라면 예산도 세우기 쉬워요. 현재 요금은 공식 웹사이트(northhillchiangmai.com)에서 확인하고 예약하세요. CNX 공항에서 15분이라는 가까움은 치앙마이 골프 여행의 첫 라운딩이나 마지막 라운딩으로 삼기에 이상적입니다. 고급 드라이빙 레인지는 라운딩 전 몸을 푸는 데도 좋은 선택지예요.`,
        location_and_access: `North Hill Golf Club 코스는 항동군 반왠에 있고, 치앙마이 국제공항(CNX)에서 남쪽으로 약 15분 거리예요. 방콕에서 오는 방문객은 CNX까지 비행기로 이동하며(수완나품이나 돈므앙에서 약 1시간 10분), 방콕에서 700km를 운전하는 것은 현실적이지 않아요. CNX에서 Grab을 이용하면 약 15분이 걸립니다.`,
        rental_cta_context: `치앙마이 골프 여행에서 North Hill Golf Club 코스에 들를 계획인가요? LENGOLF는 방콕에서 품질 좋은 클럽 세트를 대여해 출발 전 호텔로 보내 드려요. 위탁 수하물의 번거로움 없이 공항에서 곧바로 첫 티로 향할 수 있습니다.`,
      },
    },
    zh: {
      title: `North Hill Golf Club Chiang Mai全包套餐 — 距清迈机场15分钟的18洞与球杆租借`,
      meta_description: `North Hill Golf Club Chiang Mai全包果岭费约3,400泰铢，已含球童与球车。这座18洞标准杆72、全长6,789码的球场距清迈机场仅15分钟，另附送到曼谷酒店的LENGOLF球杆租借。`,
      prose: {
        overview: `North Hill Golf Club Chiang Mai是清迈一带最新建成的18洞球场，2015年11月从9洞扩建为完整的18洞布局。球场位于Hang Dong县Ban Waen，距清迈国际机场以南约15分钟，对落地CNX的旅客而言，是位置最便利的球场之一。它作为North Hill City Resort综合体的一部分运营，园区内还有水疗、健身中心、高规格练习场、酒吧与餐厅。以6,789码、标准杆72的规格，这是一套中等长度的布局，适合差点跨度较大的球手。`,
        layout_and_experience: `球场原本是一座9洞的私人俱乐部，扩建为18洞之后形成了一套园林式布局，水障碍与沙坑贯穿全场。6,789码的总长，从后发球台打对大多数水平的球手都算舒适。Hang Dong的位置让球场落在平坦到略有坡度的地形上。North Hill的练习场在品质与设施丰富度上尤其突出。`,
        tips: `全包果岭费套餐约3,400泰铢，含球童与球车，让预算好算得多。请透过官方网站（northhillchiangmai.com）查看当前价格并预订。距CNX机场只有15分钟，这里很适合安排成清迈高尔夫行程的第一场或最后一场球。高规格的练习场，也是下场前热身的好选择。`,
        location_and_access: `North Hill Golf Club位于Hang Dong县Ban Waen，距清迈国际机场（CNX）以南约15分钟。从曼谷前来的访客飞往CNX，自素万那普机场或廊曼机场出发约1小时10分钟——从曼谷开车700公里并不实际。从CNX叫一辆Grab约15分钟即可抵达。`,
        rental_cta_context: `清迈高尔夫行程里打算顺道去North Hill Golf Club吗？LENGOLF在曼谷提供品质可靠的租借球杆套组，登机前送到你的酒店，让你省去托运行李的麻烦，从机场直接奔向第一个发球台。`,
      },
    },
  },
  status: 'published',
  published_at: '2026-04-21',
}
