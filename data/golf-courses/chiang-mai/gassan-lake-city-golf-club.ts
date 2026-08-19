import type { GolfCourse } from '@/types/golf-courses'

export const course: GolfCourse = {
  slug: 'gassan-lake-city-golf-club',
  region: 'chiang-mai',
  name: `Gassan Legacy Golf Club`,
  province: `Lamphun`,
  designer: `Schmidt-Curley Design (renovation 2014)`,
  holes: 18,
  par: 72,
  year_opened: 2005,
  green_fee_weekday_thb: 4000,
  green_fee_weekend_thb: 4000,
  // All-in package per this file's own EN prose (see `tips`). Setting this stops
  // generated copy calling the number a bare "green fee", which would tell a
  // reader the caddie and cart are extra when the prose says they are included.
  fee_is_package: true,
  // Zero, not null: EN tips states the rate is "including caddie and cart".
  caddie_fee_thb: 0,
  cart_fee_thb: 0,
  caddie_required: true,
  cart_required: true,
  driving_range: true,
  website: 'https://www.gassangolf.com/gassan-legacy/en',
  phone: '+66 53 507 006',
  latitude: 18.5083,
  longitude: 99.0167,
  distance_from_bangkok_km: 700,
  drive_time_from_bangkok_min: null,
  google_maps_url: null,
  club_rental_available: true,
  club_rental_fee_thb: null,
  club_rental_brands: null,
  schema_markup: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"GolfCourse\",\n  \"name\": \"Gassan Legacy Golf Club\",\n  \"url\": \"https://len.golf/golf-courses/chiang-mai/gassan-lake-city-golf-club\",\n  \"description\": null,\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"addressLocality\": \"Lamphun\",\n    \"addressCountry\": \"TH\"\n  },\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 18.5083,\n    \"longitude\": 99.0167\n  },\n  \"telephone\": \"+66 53 507 006\",\n  \"priceRange\": \"฿฿฿\",\n  \"sameAs\": [\n    \"https://www.gassangolf.com/gassan-legacy/en\"\n  ],\n  \"amenityFeature\": [\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Driving Range\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Caddie Required\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Golf Cart\",\n      \"value\": true\n    }\n  ]\n}",
  prose: {
    overview: `Gassan Lake City Golf Club — now operating as Gassan Legacy Golf Club — is an 18-hole championship course in Ban Thi, Lamphun province, approximately 30 minutes south of Chiang Mai International Airport. Originally opened in 2005, the course was closed in 2013 for a full-scale renovation by American design firm Schmidt-Curley and relaunched in 2014 under the Legacy name. The renovation transformed a dated layout into one of the most water-intensive courses in Northern Thailand, with water hazards appearing on every hole — a design feature that demands accurate iron play and careful course management throughout the round. The course is part of the Gassan Golf Group, which operates three courses in the Lamphun/Chiang Mai area. At 6,852 yards and par 72, Gassan Legacy plays to a demanding standard and draws both local members and visiting golfers looking for a well-conditioned, challenging layout that contrasts with the more forested mountain settings of the Gassan Khuntan and Panorama properties.`,
    layout_and_experience: `The Schmidt-Curley renovation was designed around a central lake complex that anchors the middle section of the course. The routing uses the water strategically: from the opening holes, which establish a parkland rhythm through tree-lined fairways, the layout progressively introduces water as a central threat, culminating in a mid-round stretch where approach shots must carry or thread past lake edges on virtually every hole.

The par-72 layout includes five par-3s of varying length and five par-5s that offer risk-reward options for players willing to challenge the wet margins. The fairways are generous by Northern Thailand standards, but the combination of water on both sides of approach corridors and firm, fast greens means that accurate ball-striking is rewarded and mis-hits are costly.

Greens were designed with Tiff Dwarf bermuda grass for good speed and resilience through the tropical growing season. The course condition has been consistently praised since the 2014 reopening. Caddie service is compulsory, and local caddie knowledge of the correct landing zones can save several shots for first-time visitors.`,
    tips: `The all-in green fee (approximately 4,000–4,200 THB including caddie and cart) is the standard rate — confirm pricing on booking as season rates vary. A caddie tip of 400 THB is expected and payable in cash to the caddie after the round. Play conservatively on the approach shots — the water margins offer limited recovery options and double-bogey territory is close on many holes. Carry a spare sleeve of balls. The course is approximately 30 minutes from CNX airport, making it a practical first or last round on a Chiang Mai golf trip.`,
    location_and_access: `Gassan Legacy Golf Club is located in Ban Thi, Lamphun province, approximately 30 minutes by car south of Chiang Mai International Airport (CNX). Visitors from Bangkok fly to CNX (approximately 1 hour 10 minutes from Suvarnabhumi or Don Mueang) — driving the 700 kilometres from Bangkok is not practical. The course is accessible by Grab taxi or private car from Chiang Mai city or the airport; the Gassan Group can arrange transfers on request.`,
    rental_cta_context: `Playing Gassan Legacy Golf Club on your Chiang Mai trip? Rent premium clubs in Bangkok — delivered to your hotel before you fly — so you can focus on the course's famous water hazards without worrying about baggage fees.`,
  },
  locales: {
    en: {
      title: `Gassan Legacy Golf Club — Green Fees, Course Guide & Golf Club Rentals`,
      meta_description: `Gassan Legacy Golf Club green fees, course overview, tips, and how to arrange golf club rentals delivered to your Bangkok hotel.`,
    },
    th: {
      title: `Gassan Legacy Golf Club ลำพูน — แพ็กเกจรวมทุกอย่าง รีวิวสนามที่มีน้ำทุกหลุม และเช่าไม้กอล์ฟ`,
      meta_description: `ค่ากรีนฟีแบบเหมารวมประมาณ 4,000-4,200 บาทที่ Gassan Legacy Golf Club (เดิมคือ Gassan Lake City) สนาม 18 หลุม ระยะ 6,852 หลาในอำเภอบ้านธิ จังหวัดลำพูน ปรับปรุงใหม่โดย Schmidt-Curley พร้อมบริการเช่าไม้กอล์ฟส่งถึงโรงแรมในกรุงเทพฯ`,
      prose: {
        overview: `Gassan Lake City Golf Club ซึ่งปัจจุบันดำเนินการในชื่อ Gassan Legacy Golf Club เป็นสนามแชมเปียนชิพ 18 หลุมในอำเภอบ้านธิ จังหวัดลำพูน ห่างจากท่าอากาศยานนานาชาติเชียงใหม่ลงมาทางใต้ประมาณ 30 นาที สนามเปิดให้บริการครั้งแรกในปี 2005 ก่อนจะปิดปรับปรุงใหญ่ในปี 2013 โดยบริษัทออกแบบสัญชาติอเมริกัน Schmidt-Curley และกลับมาเปิดใหม่ในปี 2014 ภายใต้ชื่อ Legacy การปรับปรุงครั้งนั้นเปลี่ยนเลย์เอาต์ที่ล้าสมัยให้กลายเป็นหนึ่งในสนามที่มีน้ำเป็นองค์ประกอบหนักที่สุดของภาคเหนือ โดยมีอุปสรรคน้ำปรากฏในทุกหลุม ซึ่งเป็นลักษณะการออกแบบที่เรียกร้องการเล่นเหล็กอย่างแม่นยำและการวางแผนการเล่นอย่างรอบคอบตลอดทั้งรอบ สนามอยู่ในเครือ Gassan Golf Group ซึ่งดำเนินการสนามสามแห่งในย่านลำพูนและเชียงใหม่ ด้วยระยะ 6,852 หลาและพาร์ 72 Gassan Legacy เล่นในระดับที่ท้าทาย และดึงดูดทั้งสมาชิกท้องถิ่นและนักกอล์ฟที่เดินทางมาเยือน ซึ่งมองหาเลย์เอาต์ที่ดูแลอย่างดีและท้าทาย ต่างจากบรรยากาศป่าเขาของสนาม Gassan Khuntan และ Panorama`,
        layout_and_experience: `การปรับปรุงโดย Schmidt-Curley ออกแบบขึ้นรอบกลุ่มทะเลสาบกลางสนามซึ่งเป็นแกนของช่วงกลางรอบ เส้นทางของสนามใช้น้ำอย่างมีกลยุทธ์ เริ่มจากหลุมแรก ๆ ที่วางจังหวะแบบพาร์กแลนด์ผ่านแฟร์เวย์ที่ขนาบด้วยแนวต้นไม้ จากนั้นเลย์เอาต์ค่อย ๆ นำน้ำเข้ามาเป็นภัยคุกคามหลัก จนถึงช่วงกลางรอบที่ช็อตเข้ากรีนต้องข้ามหรือเลาะขอบทะเลสาบแทบทุกหลุม

เลย์เอาต์พาร์ 72 ประกอบด้วยหลุมพาร์ 3 จำนวนห้าหลุมที่มีระยะหลากหลาย และหลุมพาร์ 5 อีกห้าหลุมที่เปิดทางเลือกแบบเสี่ยงแลกผลตอบแทนสำหรับผู้เล่นที่กล้าท้าทายขอบน้ำ แฟร์เวย์กว้างขวางเมื่อเทียบกับมาตรฐานของภาคเหนือ แต่การมีน้ำขนาบทั้งสองข้างของช่องเข้ากรีน ประกอบกับกรีนที่แน่นและเร็ว ทำให้การตีลูกอย่างแม่นยำได้รับรางวัล ส่วนช็อตที่พลาดต้องจ่ายราคาสูง

กรีนสร้างด้วยหญ้าเบอร์มิวดาพันธุ์ Tiff Dwarf เพื่อความเร็วและความทนทานตลอดฤดูการเติบโตในเขตร้อน สภาพสนามได้รับคำชมอย่างสม่ำเสมอนับตั้งแต่กลับมาเปิดในปี 2014 การใช้บริการแคดดี้เป็นข้อบังคับ และความรู้ของแคดดี้ท้องถิ่นเรื่องจุดตกลูกที่ถูกต้องช่วยประหยัดสกอร์ได้หลายช็อตสำหรับผู้ที่มาเยือนครั้งแรก`,
        tips: `ค่ากรีนฟีแบบเหมารวม (ประมาณ 4,000-4,200 บาท รวมแคดดี้และรถกอล์ฟ) เป็นอัตรามาตรฐาน ควรยืนยันราคาตอนจองเพราะอัตราแปรผันตามฤดูกาล ทิปแคดดี้ที่ 400 บาทเป็นสิ่งที่คาดหวังกัน และชำระเป็นเงินสดให้แคดดี้หลังจบรอบ ควรเล่นช็อตเข้ากรีนอย่างระมัดระวัง เพราะขอบน้ำเปิดทางให้แก้เกมได้จำกัดและโอกาสเสียดับเบิลโบกี้อยู่ใกล้แค่เอื้อมในหลายหลุม จึงควรพกลูกกอล์ฟสำรองติดตัวไว้อีกหนึ่งชุด สนามอยู่ห่างจากสนามบิน CNX ประมาณ 30 นาที จึงเหมาะกับการจัดเป็นรอบแรกหรือรอบสุดท้ายของทริปกอล์ฟเชียงใหม่`,
        location_and_access: `Gassan Legacy Golf Club ตั้งอยู่ในอำเภอบ้านธิ จังหวัดลำพูน ห่างจากท่าอากาศยานนานาชาติเชียงใหม่ (CNX) ลงมาทางใต้ประมาณ 30 นาทีโดยรถยนต์ ผู้ที่เดินทางจากกรุงเทพฯ ใช้วิธีบินไป CNX (ประมาณ 1 ชั่วโมง 10 นาทีจากสนามบินสุวรรณภูมิหรือสนามบินดอนเมือง) เพราะการขับรถระยะทาง 700 กิโลเมตรจากกรุงเทพฯ ไม่สะดวกในทางปฏิบัติ สามารถเดินทางไปยังสนามได้ด้วย Grab หรือรถส่วนตัวจากตัวเมืองเชียงใหม่หรือจากสนามบิน และทาง Gassan Group ยังจัดรถรับส่งให้ได้เมื่อแจ้งล่วงหน้า`,
        rental_cta_context: `วางแผนออกรอบที่ Gassan Legacy Golf Club ในทริปเชียงใหม่ของคุณอยู่ใช่ไหม เช่าชุดไม้กอล์ฟคุณภาพพรีเมียมจาก LENGOLF ที่กรุงเทพฯ พร้อมบริการส่งถึงโรงแรมก่อนคุณขึ้นเครื่อง เพื่อให้คุณโฟกัสกับอุปสรรคน้ำอันเลื่องชื่อของสนามได้เต็มที่ โดยไม่ต้องกังวลเรื่องค่าธรรมเนียมสัมภาระ`,
      },
    },
    ja: {
      title: `Gassan Legacy Golf Club（ランプーン県）— パッケージ料金・全ホールに水があるコース紹介・クラブレンタル`,
      meta_description: `オールインクルーシブのグリーンフィーは約4,000〜4,200THB。Gassan Legacy Golf Club（旧Gassan Lake City）はランプーン県バンティにある18ホール・6,852ヤードのコースで、Schmidt-Curleyの改修により全ホールに水が絡みます。バンコクのホテルへ届くLENGOLFのクラブレンタルもご案内します。`,
      prose: {
        overview: `Gassan Lake City Golf Club、現在の名称でGassan Legacy Golf Clubは、ランプーン県バンティにある18ホールのチャンピオンシップコースで、チェンマイ国際空港から南へおよそ30分の距離です。開場は2005年ですが、2013年にいったん閉鎖してアメリカの設計事務所Schmidt-Curleyによる全面改修を行い、2014年にLegacyの名で再オープンしました。この改修によって、古びていたレイアウトはタイ北部で最も水の比重が大きいコースのひとつへと生まれ変わり、ウォーターハザードが全ホールに顔を出します。この設計上の特徴が、ラウンドを通じて正確なアイアンショットと慎重なコースマネジメントを要求します。コースはランプーンとチェンマイ一帯で3コースを運営するGassan Golf Groupの一員です。6,852ヤード・パー72のGassan Legacyは要求水準の高いプレーを求め、Gassan KhuntanやPanoramaの森深い山の舞台とは対照的な、手入れの行き届いた歯ごたえのあるレイアウトを求める地元メンバーと来訪ゴルファーの双方を集めています。`,
        layout_and_experience: `Schmidt-Curleyによる改修は、コース中盤の軸となる中央の湖群を中心に設計されました。ルーティングは水を戦略的に用います。序盤のホールは樹木に縁取られたフェアウェイでパークランドらしいリズムをつくり、そこからレイアウトは徐々に水を中心的な脅威として持ち込み、アプローチがほぼすべてのホールで湖の縁を越えるか縫うかしなければならない中盤の連続へと高まっていきます。

パー72のレイアウトには、長さの異なる5つのパー3と、水際に挑む気のあるプレーヤーにリスクとリターンの選択肢を与える5つのパー5が含まれます。フェアウェイはタイ北部の基準では広めですが、アプローチの通路の両側に水があり、しかもグリーンが硬く速いため、正確なショットには報いがあり、ミスヒットの代償は大きくなります。

グリーンには熱帯の生育期を通じた速さと丈夫さを狙ってティフドワーフ・バミューダ芝が採用されました。2014年の再オープン以降、コースコンディションは一貫して高く評価されています。キャディーの利用は必須で、正しい落としどころに関する地元キャディーの知識は、初めて訪れる方なら何打も節約してくれるはずです。`,
        tips: `オールインクルーシブのグリーンフィー（キャディーとカートを含めておよそ4,000〜4,200THB）が標準料金です。季節によって料金が変わるため、予約時に金額をご確認ください。キャディーへのチップは400THBが想定されており、ラウンド後にキャディーへ現金で手渡します。アプローチは無理をせず組み立てましょう。水際はリカバリーの選択肢が限られ、多くのホールでダブルボギーがすぐそこにあります。予備のボールを1スリーブ余分に持っておくと安心です。コースはCNX空港からおよそ30分の距離にあり、チェンマイのゴルフ旅行では初日または最終日のラウンドとして組みやすい立地と言えるでしょう。`,
        location_and_access: `Gassan Legacy Golf Clubはランプーン県バンティにあり、チェンマイ国際空港（CNX）から南へ車でおよそ30分です。バンコクからの来訪者はCNXへ空路で向かい（スワンナプームまたはドンムアンから約1時間10分）、バンコクから700kmを車で走るのは現実的ではありません。チェンマイ市街からも空港からも、Grabか自家用車でアクセスできます。事前に依頼すればGassan Groupに送迎を手配してもらうことも可能です。`,
        rental_cta_context: `チェンマイ旅行でGassan Legacy Golf Clubをプレーする予定の方へ。LENGOLFなら質の高いクラブセットをバンコクでレンタルでき、フライト前にホテルまでお届けします。手荷物料金を気にせず、名物のウォーターハザード攻略に集中できます。`,
      },
    },
    ko: null,
    zh: null,
  },
  status: 'published',
  published_at: '2026-04-21',
}
