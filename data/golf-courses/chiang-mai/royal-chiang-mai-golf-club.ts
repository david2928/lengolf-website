import type { GolfCourse } from '@/types/golf-courses'

export const course: GolfCourse = {
  slug: 'royal-chiang-mai-golf-club',
  region: 'chiang-mai',
  name: `Royal Chiang Mai Golf Club & Resort`,
  province: `Chiang Mai`,
  designer: `Peter Thomson`,
  holes: 18,
  par: 72,
  year_opened: 1996,
  green_fee_weekday_thb: 4800,
  green_fee_weekend_thb: 4800,
  // All-in package per this file's own EN prose (see `tips`). Setting this stops
  // generated copy calling the number a bare "green fee", which would tell a
  // reader the caddie and cart are extra when the prose says they are included.
  fee_is_package: true,
  // Zero, not null: EN tips states the ~4,800 rate "includes caddie and cart".
  caddie_fee_thb: 0,
  cart_fee_thb: 0,
  caddie_required: true,
  cart_required: true,
  driving_range: true,
  website: 'https://www.royalchiangmai.com/',
  phone: '+66 52 081 995',
  latitude: 19.0268,
  longitude: 98.9892,
  // Was 18.8417,99 — 20.6km off; the broken component was the LATITUDE, not the 0dp longitude. Official site DMS + Overture POI + polygon agree within 600m.
  coordinates_verified_at: '2026-07-31',
  distance_from_bangkok_km: 700,
  drive_time_from_bangkok_min: null,
  google_maps_url: null,
  club_rental_available: true,
  club_rental_fee_thb: null,
  club_rental_brands: null,
  schema_markup: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"GolfCourse\",\n  \"name\": \"Royal Chiang Mai Golf Club & Resort\",\n  \"url\": \"https://len.golf/golf-courses/chiang-mai/royal-chiang-mai-golf-club\",\n  \"description\": null,\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"addressLocality\": \"Chiang Mai\",\n    \"addressCountry\": \"TH\"\n  },\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 19.0268,\n    \"longitude\": 98.9892\n  },\n  \"telephone\": \"+66 52 081 995\",\n  \"priceRange\": \"฿฿฿\",\n  \"sameAs\": [\n    \"https://www.royalchiangmai.com/\"\n  ],\n  \"amenityFeature\": [\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Driving Range\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Caddie Required\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Golf Cart\",\n      \"value\": true\n    }\n  ]\n}",
  prose: {
    overview: `Royal Chiang Mai Golf Club & Resort is one of the most storied courses in Northern Thailand: an 18-hole, par-72 design by five-time British Open champion Peter Thomson that opened in February 1996. Set within a valley approximately 40 kilometres north of Chiang Mai city in the Mae Faek area of San Sai district, the course was conceived as a British parkland layout with links-style elements, including pot bunkers, bump-and-run approaches, and undulating fairways that reward ground game strategy rather than purely aerial attacks on the pin. The site was formerly a fruit orchard, and the mature trees that remain give the layout a sense of scale and shade unusual for a course of its age. The surrounding mountain ridges frame the property and provide a scenic backdrop throughout the round.`,
    layout_and_experience: `Thomson's design at 6,969 yards is modest by modern yardage standards — there are no black tees — but the challenge comes from strategic placement rather than length. The course is heavily tree-lined, with corridors that punish anything other than a shaped tee shot. The fairways are undulating rather than flat, and Thomson incorporated the natural slope of the valley floor to create subtle ground-level hazards that affect the lie of approach shots.

Pot bunkers — deep, steep-faced, and strategically positioned to catch half-missed approaches — are the signature defense mechanism. Water hazards also appear on most holes, adding a second layer of strategic complexity. The greens are fast, well-maintained Tiff Dwarf bermuda surfaces. Peak condition is maintained in the cool dry season (November–March).`,
    tips: `Book at royalchiangmai.com or via a booking platform to confirm current rates — the high-season all-in rate of approximately 4,800 THB includes caddie and cart. Ask the caddie for yardage book guidance on the pot bunker positions before selecting a target line. The course rewards accuracy over distance — a conservative strategy off the tee will reduce double-bogey risk. Morning rounds are cooler and the valley mist in November–January adds distinctive atmosphere.`,
    location_and_access: `Royal Chiang Mai Golf Club & Resort is located in Mae Faek, San Sai District, approximately 40 kilometres north of Chiang Mai city and 40 minutes by road from Chiang Mai International Airport (CNX). Visitors from Bangkok fly to CNX (approximately 1 hour 10 minutes from Suvarnabhumi or Don Mueang) — driving the 700 kilometres from Bangkok is not practical. The course is reached by private car, Grab taxi, or the resort's transfer service via Route 1001 northward from Chiang Mai.`,
    rental_cta_context: `Playing Royal Chiang Mai Golf Club — Peter Thomson's classic Northern Thailand design? Rent premium clubs in Bangkok — delivered to your hotel before you fly — so you arrive ready to tackle those pot bunkers without the hassle of airline baggage fees.`,
  },
  locales: {
    en: {
      title: `Royal Chiang Mai Golf Club & Resort — Green Fees, Course Guide & Golf Club Rentals`,
      meta_description: `Royal Chiang Mai Golf Club & Resort green fees, course overview, tips, and how to arrange golf club rentals delivered to your Bangkok hotel.`,
    },
    th: {
      title: `Royal Chiang Mai Golf Club & Resort — แพ็กเกจรวมทุกอย่าง รีวิวสนามฝีมือ Peter Thomson และเช่าไม้กอล์ฟ`,
      meta_description: `ค่ากรีนฟีแบบเหมารวมช่วงไฮซีซันประมาณ 4,800 บาทที่ Royal Chiang Mai Golf Club & Resort สนาม 18 หลุม พาร์ 72 ออกแบบโดย Peter Thomson เปิดเมื่อปี 1996 ในอำเภอสันทราย พร้อมบริการเช่าไม้กอล์ฟส่งถึงโรงแรมในกรุงเทพฯ`,
      prose: {
        overview: `Royal Chiang Mai Golf Club & Resort เป็นหนึ่งในสนามที่มีเรื่องราวมากที่สุดของภาคเหนือ เป็นสนาม 18 หลุม พาร์ 72 ที่ออกแบบโดย Peter Thomson เจ้าของแชมป์ British Open ห้าสมัย และเปิดให้บริการในเดือนกุมภาพันธ์ 1996 สนามวางตัวอยู่ในหุบเขาห่างจากตัวเมืองเชียงใหม่ขึ้นไปทางเหนือประมาณ 40 กิโลเมตร ในพื้นที่แม่แฝก อำเภอสันทราย โดยถูกวางแนวคิดให้เป็นเลย์เอาต์แบบพาร์กแลนด์อังกฤษที่ผสมองค์ประกอบแบบลิงก์ส ทั้งพอตบังเกอร์ ช็อตเข้ากรีนแบบกลิ้งลูก และแฟร์เวย์ลูกคลื่นที่ให้รางวัลแก่กลยุทธ์การเล่นลูกติดพื้น มากกว่าการโจมตีธงผ่านอากาศเพียงอย่างเดียว พื้นที่เดิมของสนามเคยเป็นสวนผลไม้ และต้นไม้ใหญ่ที่ยังหลงเหลืออยู่ก็ให้ทั้งมิติและร่มเงาในระดับที่ไม่ค่อยพบในสนามอายุเท่านี้ ส่วนแนวสันเขาโดยรอบก็โอบกรอบพื้นที่และเป็นฉากหลังตลอดการออกรอบ`,
        layout_and_experience: `งานออกแบบของ Thomson ที่ระยะ 6,969 หลาถือว่าไม่ยาวนักเมื่อวัดด้วยมาตรฐานยุคใหม่ และไม่มีแท่นทีดำ แต่ความท้าทายมาจากการวางตำแหน่งเชิงกลยุทธ์มากกว่าระยะทาง สนามขนาบด้วยแนวต้นไม้หนาแน่น ช่องแฟร์เวย์จึงลงโทษทุกช็อตที่ไม่ได้ควบคุมรูปลูก แฟร์เวย์เป็นลูกคลื่นมากกว่าราบเรียบ และ Thomson ได้ผนวกความลาดเอียงตามธรรมชาติของพื้นหุบเขาเข้ามา จนเกิดอุปสรรคระดับพื้นดินที่ละเอียดอ่อนซึ่งส่งผลต่อไลของช็อตเข้ากรีน

พอตบังเกอร์ ซึ่งลึก ขอบชัน และวางไว้อย่างมีกลยุทธ์เพื่อดักช็อตเข้ากรีนที่พลาดครึ่ง ๆ กลาง ๆ คือกลไกป้องกันประจำสนาม นอกจากนี้ยังมีอุปสรรคน้ำปรากฏในเกือบทุกหลุม ซึ่งเพิ่มความซับซ้อนเชิงกลยุทธ์อีกชั้นหนึ่ง กรีนเป็นพื้นผิวหญ้าเบอร์มิวดาพันธุ์ Tiff Dwarf ที่เร็วและได้รับการดูแลอย่างดี โดยสภาพสนามอยู่ในจุดสูงสุดในฤดูหนาวที่อากาศเย็นและแห้ง (พฤศจิกายนถึงมีนาคม)`,
        tips: `ควรจองผ่าน royalchiangmai.com หรือแพลตฟอร์มจองออนไลน์เพื่อยืนยันอัตราปัจจุบัน โดยอัตราเหมารวมช่วงไฮซีซันประมาณ 4,800 บาทได้รวมค่าแคดดี้และรถกอล์ฟไว้แล้ว ควรขอคำแนะนำจากแคดดี้เรื่องตำแหน่งของพอตบังเกอร์จากสมุดระยะก่อนเลือกแนวเป้าหมาย สนามให้รางวัลแก่ความแม่นยำมากกว่าระยะ การเล่นแบบระมัดระวังจากแท่นทีจึงช่วยลดความเสี่ยงเสียดับเบิลโบกี้ การออกรอบช่วงเช้าอากาศเย็นกว่า และหมอกในหุบเขาช่วงเดือนพฤศจิกายนถึงมกราคมก็เพิ่มบรรยากาศที่เป็นเอกลักษณ์`,
        location_and_access: `Royal Chiang Mai Golf Club & Resort ตั้งอยู่ในพื้นที่แม่แฝก อำเภอสันทราย ห่างจากตัวเมืองเชียงใหม่ขึ้นไปทางเหนือประมาณ 40 กิโลเมตร และห่างจากท่าอากาศยานนานาชาติเชียงใหม่ (CNX) ราว 40 นาทีโดยรถยนต์ ผู้ที่เดินทางจากกรุงเทพฯ ใช้วิธีบินไป CNX (ประมาณ 1 ชั่วโมง 10 นาทีจากสนามบินสุวรรณภูมิหรือสนามบินดอนเมือง) เพราะการขับรถระยะทาง 700 กิโลเมตรจากกรุงเทพฯ ไม่สะดวกในทางปฏิบัติ สามารถเดินทางไปยังสนามได้ด้วยรถส่วนตัว Grab หรือบริการรถรับส่งของรีสอร์ต ตามเส้นทางหมายเลข 1001 มุ่งขึ้นเหนือจากเชียงใหม่`,
        rental_cta_context: `วางแผนออกรอบที่ Royal Chiang Mai Golf Club สนามคลาสสิกของภาคเหนือที่ออกแบบโดย Peter Thomson อยู่ใช่ไหม เช่าชุดไม้กอล์ฟคุณภาพพรีเมียมจาก LENGOLF ที่กรุงเทพฯ พร้อมบริการส่งถึงโรงแรมก่อนคุณขึ้นเครื่อง ให้คุณไปถึงสนามพร้อมรับมือกับพอตบังเกอร์เหล่านั้นโดยไม่ต้องยุ่งยากกับค่าธรรมเนียมสัมภาระ`,
      },
    },
    ja: {
      title: `Royal Chiang Mai Golf Club & Resort — パッケージ料金・Peter Thomson設計コース紹介・クラブレンタル`,
      meta_description: `ハイシーズンのオールインクルーシブ料金はおよそ4,800THB。Royal Chiang Mai Golf Club & Resortは1996年開場の18ホール・パー72で、設計はPeter Thomson。サンサーイ郡の谷に広がります。バンコクのホテルへ届くLENGOLFのクラブレンタルもご案内します。`,
      prose: {
        overview: `Royal Chiang Mai Golf Club & Resortは、タイ北部で最も物語のあるコースのひとつです。全英オープンを5度制したPeter Thomsonが設計した18ホール・パー72で、1996年2月に開場しました。チェンマイ市街から北へ約40km、サンサーイ郡のメーフェーク一帯の谷に広がるこのコースは、リンクスの要素を織り込んだイギリス風パークランドとして構想されています。ポットバンカー、転がして寄せるアプローチ、そして空中戦だけに頼るのではなく地面を使う組み立てに報いるうねったフェアウェイが、その要素にあたります。敷地はかつて果樹園であり、今も残る大木がこの年代のコースには珍しい奥行きと日陰をもたらしています。周囲の山の稜線が敷地を縁取り、ラウンドの間ずっと美しい背景となってくれます。`,
        layout_and_experience: `6,969ヤードというThomsonの設計は現代の距離感で見れば控えめで、ブラックティーも設けられていません。難しさは長さではなく戦略的な配置から生まれます。コースは樹木に厚く囲まれ、球筋を作ったティーショット以外は打ち出しの通路に罰せられます。フェアウェイは平坦ではなくうねっており、Thomsonは谷底の自然な傾斜を取り込むことで、アプローチのライに影響する微妙な地表のハザードを作り出しました。

深く、面が切り立ち、中途半端に外したアプローチをとらえる位置に配されたポットバンカーが、このコースの象徴的な防御装置です。加えてウォーターハザードもほとんどのホールに現れ、戦略上の複雑さをもう一段階加えています。グリーンは手入れの行き届いたティフドワーフ・バミューダ芝の速い面。コンディションが最も良いのは、涼しく乾いた11月から3月の時期です。`,
        tips: `現在の料金はroyalchiangmai.comか予約サイトで確認したうえでご予約ください。ハイシーズンのオールインクルーシブ料金はおよそ4,800THBで、キャディーフィーとカート代を含みます。狙うラインを決める前に、ヤーデージブックを見ながらポットバンカーの位置についてキャディーに助言をもらいましょう。このコースは距離より正確さに報いるので、ティーショットを堅実に組み立てればダブルボギーのリスクを減らせます。午前のラウンドは気温が低く、11月から1月の谷にかかる霧が独特の雰囲気を添えてくれます。`,
        location_and_access: `Royal Chiang Mai Golf Club & Resortはサンサーイ郡メーフェークにあり、チェンマイ市街から北へ約40km、チェンマイ国際空港（CNX）からは車でおよそ40分の距離です。バンコクからの来訪者はCNXへ空路で向かい（スワンナプームまたはドンムアンから約1時間10分）、バンコクから700kmを車で走るのは現実的ではありません。コースへは自家用車、Grab、またはリゾートの送迎サービスを使い、チェンマイから1001号線を北上して向かいます。`,
        rental_cta_context: `Peter Thomsonが手がけたタイ北部の名作、Royal Chiang Mai Golf Clubをプレーする方へ。LENGOLFなら質の高いクラブセットをバンコクでレンタルでき、フライト前にホテルまでお届けします。航空会社の預け荷物料金に煩わされることなく、あのポットバンカーに挑む準備を整えて到着できます。`,
      },
    },
    ko: null,
    zh: null,
  },
  status: 'published',
  published_at: '2026-04-21',
}
