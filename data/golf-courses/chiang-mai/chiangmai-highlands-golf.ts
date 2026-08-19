import type { GolfCourse } from '@/types/golf-courses'

export const course: GolfCourse = {
  slug: 'chiangmai-highlands-golf',
  region: 'chiang-mai',
  name: `Chiangmai Highlands Golf & Spa Resort`,
  province: `Chiang Mai`,
  designer: `Lee Schmidt & Brian Curley (Schmidt-Curley Design)`,
  holes: 18,
  par: 72,
  year_opened: 2005,
  green_fee_weekday_thb: 3400,
  green_fee_weekend_thb: null,
  // EN prose calls 400 THB a caddie TIP, and never states a caddie fee. Typing
  // it as a fee made the generated FAQ assert a charge no source supports, on
  // top of the customary tip. Unknown is the honest value.
  caddie_fee_thb: null,
  cart_fee_thb: 750,
  caddie_required: true,
  cart_required: true,
  driving_range: true,
  website: 'https://www.chiangmaihighlands.com/',
  phone: '+66 53 261 354',
  latitude: 18.8062,
  longitude: 99.2604,
  distance_from_bangkok_km: 720,
  drive_time_from_bangkok_min: null,
  google_maps_url: null,
  club_rental_available: true,
  club_rental_fee_thb: null,
  club_rental_brands: null,
  schema_markup: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"GolfCourse\",\n  \"name\": \"Chiangmai Highlands Golf & Spa Resort\",\n  \"url\": \"https://len.golf/golf-courses/chiang-mai/chiangmai-highlands-golf\",\n  \"description\": null,\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"addressLocality\": \"Chiang Mai\",\n    \"addressCountry\": \"TH\"\n  },\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 18.8062,\n    \"longitude\": 99.2604\n  },\n  \"telephone\": \"+66 53 261 354\",\n  \"priceRange\": \"฿฿฿\",\n  \"sameAs\": [\n    \"https://www.chiangmaihighlands.com/\"\n  ],\n  \"amenityFeature\": [\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Driving Range\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Caddie Required\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Golf Cart\",\n      \"value\": true\n    }\n  ]\n}",
  prose: {
    overview: `Chiangmai Highlands Golf & Spa Resort is an 18-hole championship course set in the mountains of Mae On district, 40 kilometres east of Chiang Mai city. The course was designed by the American practice Schmidt-Curley Design — the firm behind several of Thailand's most acclaimed courses — and opened in 2005. Built across undulating highland terrain, Chiangmai Highlands features Paspalum fairways and Tifeagle putting greens that provide consistent playing surfaces year-round, with more than 100 bunkers distributed across the layout. The course stretches to 7,227 yards from the championship tees and is regularly featured among the top golf experiences in Northern Thailand, particularly valued by golfers seeking a genuine highland setting rather than a flat resort parkland. On-site facilities include a full spa, accommodation, and a clubhouse restaurant, making it suitable for a multi-day golf stay combining rounds with the natural scenery of the Mae On mountains.`,
    layout_and_experience: `Chiangmai Highlands plays across mountainous terrain where elevation change and valley views define the experience from the first tee. The Schmidt-Curley design makes full use of the natural landscape — fairways rise and fall with the contours of the hills, and several holes require precise club selection to account for significant changes in elevation. The Paspalum fairways hold the ball well and provide reliable lies even during the rainy season, while the Tifeagle greens are consistently fast and true.

With more than 100 bunkers distributed across the 18 holes, Chiangmai Highlands demands accurate approach play throughout. The par-3s are particularly unforgiving, with sand traps positioned to catch anything short or wide of the target. The 18th hole provides a memorable closing challenge with a demanding approach that rewards committed shot-making. From the championship tees (7,227 yards, par 72), the course presents a genuine test for low-handicap players; the white tees at 6,287 yards and yellow tees at 5,739 yards bring the layout within reach of mid-handicappers.

Caddies at Chiangmai Highlands are experienced and well-versed in the elevation-adjusted distance calculations that mountain golf requires — following caddie advice on approach shots, especially when playing uphill or downhill, will save strokes over the course of a round. One caddie and one cart are assigned per golfer (the caddie drives), which contributes to a well-paced round. The course has no rain-check policy, meaning rounds interrupted by weather are not refunded — a consideration worth noting when booking.`,
    tips: `November through February is the best time to play Chiangmai Highlands: temperatures drop to 15–22°C in the mornings and the fairways are in prime condition after the rainy season. Book an early tee time during the November–March peak period to secure the best conditions. The rainy season (June–October) brings lush fairways but afternoon thunderstorms are common; morning rounds typically finish in good conditions. Caddie and cart fees are compulsory and must be paid in cash (THB); caddie tips of 400 THB or more at the end of the round are standard. The course operates no rain-check policy, so travel insurance that covers weather-related golf cancellations is worth considering for peak-season visits. Collared shirts are required; round-neck T-shirts and denim are not permitted. Accommodation is available on-site for those combining the course with a highland retreat. From Chiang Mai, arrange transport by Grab or hotel car — the Mae On road is winding and not well-served by public transport.`,
    location_and_access: `Chiangmai Highlands Golf & Spa Resort is located in Mae On district, approximately 40 minutes east of Chiang Mai city centre. From Bangkok, virtually all visitors fly — the journey takes around 1 hour 10 minutes from Suvarnabhumi (BKK) or Don Mueang (DMK) to Chiang Mai (CNX). The road distance from Bangkok is approximately 720 kilometres, making driving impractical for a golf trip. Once in Chiang Mai, the resort is reachable by Grab taxi or private car; the route follows Superhighway 11 east from the city centre. The resort can arrange shuttle transfers on request.`,
    rental_cta_context: `Heading to Chiangmai Highlands for a round in the mountains? Rent premium clubs in Bangkok — delivered to your hotel before you fly — so you can travel light without the airline baggage fees.`,
  },
  locales: {
    en: {
      title: `Chiangmai Highlands Golf & Spa Resort — Green Fees, Course Guide & Golf Club Rentals`,
      meta_description: `Chiangmai Highlands Golf & Spa Resort green fees, course overview, tips, and how to arrange golf club rentals delivered to your Bangkok hotel.`,
    },
    th: {
      title: `Chiangmai Highlands Golf & Spa Resort — ค่ากรีนฟี รีวิวสนามภูเขาแม่ออน และเช่าไม้กอล์ฟ`,
      meta_description: `ค่ากรีนฟี Chiangmai Highlands Golf & Spa Resort 3,400 บาท สนามแชมเปียนชิพ 18 หลุมบนภูเขาในอำเภอแม่ออน ระยะ 7,227 หลา ออกแบบโดย Schmidt-Curley Design พร้อมบริการเช่าไม้กอล์ฟส่งถึงโรงแรมในกรุงเทพฯ`,
      prose: {
        overview: `Chiangmai Highlands Golf & Spa Resort เป็นสนามแชมเปียนชิพ 18 หลุมที่ตั้งอยู่ในเขตภูเขาของอำเภอแม่ออน ห่างจากตัวเมืองเชียงใหม่ไปทางตะวันออก 40 กิโลเมตร สนามออกแบบโดย Schmidt-Curley Design สำนักงานสถาปนิกสัญชาติอเมริกันที่อยู่เบื้องหลังสนามซึ่งได้รับการยกย่องที่สุดหลายแห่งของประเทศไทย และเปิดให้บริการในปี 2005 ด้วยการวางสนามบนภูมิประเทศบนที่สูงแบบลูกคลื่น Chiangmai Highlands จึงมีแฟร์เวย์หญ้าพาสพาลัมและกรีนหญ้า Tifeagle ที่ให้พื้นผิวการเล่นสม่ำเสมอตลอดทั้งปี พร้อมบังเกอร์มากกว่า 100 จุดกระจายอยู่ทั่วเลย์เอาต์ สนามมีระยะยาวถึง 7,227 หลาจากแท่นทีแชมเปียนชิพ และได้รับการกล่าวถึงอย่างสม่ำเสมอในฐานะหนึ่งในประสบการณ์กอล์ฟที่ดีที่สุดของภาคเหนือ โดยเฉพาะในหมู่นักกอล์ฟที่มองหาบรรยากาศบนที่สูงอย่างแท้จริงมากกว่าสนามพาร์กแลนด์แบบรีสอร์ตพื้นราบ สิ่งอำนวยความสะดวกภายในพื้นที่ประกอบด้วยสปาครบวงจร ที่พัก และร้านอาหารในคลับเฮาส์ จึงเหมาะกับการพักออกรอบหลายวันควบคู่ไปกับการชมทัศนียภาพธรรมชาติของขุนเขาแม่ออน`,
        layout_and_experience: `Chiangmai Highlands เล่นอยู่บนภูมิประเทศแบบภูเขา ซึ่งการเปลี่ยนระดับความสูงและวิวหุบเขาเป็นตัวกำหนดประสบการณ์ตั้งแต่แท่นทีแรก งานออกแบบของ Schmidt-Curley ใช้ประโยชน์จากภูมิทัศน์ธรรมชาติอย่างเต็มที่ แฟร์เวย์ทอดขึ้นลงไปตามแนวเส้นของเนินเขา และมีหลายหลุมที่ต้องเลือกไม้อย่างแม่นยำเพื่อชดเชยการเปลี่ยนระดับความสูงที่มีนัยสำคัญ แฟร์เวย์หญ้าพาสพาลัมรองรับลูกได้ดีและให้ไลที่เชื่อถือได้แม้ในฤดูฝน ส่วนกรีนหญ้า Tifeagle ก็เร็วและสม่ำเสมอ

ด้วยบังเกอร์มากกว่า 100 จุดกระจายอยู่ทั่วทั้ง 18 หลุม Chiangmai Highlands จึงเรียกร้องช็อตเข้ากรีนที่แม่นยำตลอดการเล่น หลุมพาร์ 3 นั้นไม่ปรานีเป็นพิเศษ เพราะบังเกอร์ทรายถูกวางไว้เพื่อดักลูกที่สั้นหรือออกนอกเป้า ส่วนหลุมที่ 18 เป็นบททดสอบปิดท้ายที่น่าจดจำ ด้วยช็อตเข้ากรีนที่ยากและให้รางวัลแก่ผู้ที่กล้าตัดสินใจ จากแท่นทีแชมเปียนชิพ (7,227 หลา พาร์ 72) สนามเป็นบททดสอบจริงจังสำหรับผู้เล่นแฮนดิแคปต่ำ ขณะที่แท่นทีขาวที่ระยะ 6,287 หลา และแท่นทีเหลืองที่ระยะ 5,739 หลา ทำให้เลย์เอาต์อยู่ในวิสัยที่นักกอล์ฟแฮนดิแคปกลางรับมือได้

แคดดี้ที่ Chiangmai Highlands มีประสบการณ์และเชี่ยวชาญการคำนวณระยะที่ปรับตามความสูงต่ำซึ่งกอล์ฟบนภูเขาต้องการ การฟังคำแนะนำของแคดดี้ในช็อตเข้ากรีน โดยเฉพาะเมื่อเล่นขึ้นเนินหรือลงเนิน จะช่วยประหยัดสกอร์ได้ตลอดทั้งรอบ ผู้เล่นแต่ละคนจะได้แคดดี้หนึ่งคนและรถกอล์ฟหนึ่งคัน โดยแคดดี้เป็นผู้ขับ ซึ่งช่วยให้จังหวะการเล่นลื่นไหล ทั้งนี้สนามไม่มีนโยบายคืนเงินหรือเลื่อนรอบเมื่อฝนตก หมายความว่ารอบที่ถูกสภาพอากาศขัดจังหวะจะไม่ได้รับเงินคืน ซึ่งเป็นข้อที่ควรพิจารณาตอนจอง`,
        tips: `เดือนพฤศจิกายนถึงกุมภาพันธ์เป็นช่วงที่ดีที่สุดสำหรับการเล่นที่ Chiangmai Highlands อุณหภูมิช่วงเช้าลดลงมาอยู่ที่ 15-22°C และแฟร์เวย์อยู่ในสภาพดีที่สุดหลังจบฤดูฝน ควรจองทีไทม์เช้าตรู่ในช่วงพีคเดือนพฤศจิกายนถึงมีนาคมเพื่อให้ได้สภาพสนามที่ดีที่สุด ส่วนฤดูฝน (มิถุนายนถึงตุลาคม) แฟร์เวย์จะเขียวชอุ่ม แต่พายุฝนฟ้าคะนองช่วงบ่ายเกิดขึ้นบ่อย การออกรอบช่วงเช้าจึงมักจบลงในสภาพอากาศที่ดี ค่าแคดดี้และค่ารถกอล์ฟเป็นข้อบังคับและต้องชำระเป็นเงินสดสกุลบาท ส่วนทิปแคดดี้ที่ 400 บาทขึ้นไปเมื่อจบรอบถือเป็นมาตรฐาน สนามไม่มีนโยบายคืนเงินหรือเลื่อนรอบเมื่อฝนตก การทำประกันการเดินทางที่ครอบคลุมการยกเลิกรอบกอล์ฟจากสภาพอากาศจึงน่าพิจารณาสำหรับการมาเยือนช่วงพีคซีซัน สนามกำหนดให้สวมเสื้อมีปก ไม่อนุญาตเสื้อยืดคอกลมและกางเกงยีนส์ มีที่พักภายในพื้นที่สำหรับผู้ที่ต้องการรวมการออกรอบเข้ากับการพักผ่อนบนที่สูง จากตัวเมืองเชียงใหม่ควรใช้ Grab หรือรถของโรงแรม เพราะถนนสายแม่ออนคดเคี้ยวและไม่มีขนส่งสาธารณะรองรับมากนัก`,
        location_and_access: `Chiangmai Highlands Golf & Spa Resort ตั้งอยู่ในอำเภอแม่ออน ห่างจากใจกลางเมืองเชียงใหม่ไปทางตะวันออกประมาณ 40 นาที ผู้ที่เดินทางจากกรุงเทพฯ แทบทั้งหมดเลือกบิน โดยใช้เวลาราว 1 ชั่วโมง 10 นาทีจากสนามบินสุวรรณภูมิ (BKK) หรือสนามบินดอนเมือง (DMK) ไปยังเชียงใหม่ (CNX) ระยะทางบนถนนจากกรุงเทพฯ อยู่ที่ประมาณ 720 กิโลเมตร การขับรถจึงไม่สะดวกในทางปฏิบัติสำหรับทริปกอล์ฟ เมื่อถึงเชียงใหม่แล้ว สามารถเดินทางไปยังรีสอร์ตได้ด้วย Grab หรือรถส่วนตัว โดยเส้นทางใช้ทางหลวงซูเปอร์ไฮเวย์หมายเลข 11 มุ่งไปทางตะวันออกจากใจกลางเมือง และทางรีสอร์ตยังจัดรถรับส่งให้ได้เมื่อแจ้งล่วงหน้า`,
        rental_cta_context: `กำลังจะไปออกรอบบนภูเขาที่ Chiangmai Highlands ใช่ไหม เช่าชุดไม้กอล์ฟคุณภาพพรีเมียมจาก LENGOLF ที่กรุงเทพฯ พร้อมบริการส่งถึงโรงแรมก่อนคุณขึ้นเครื่อง เพื่อให้เดินทางแบบตัวเบาโดยไม่ต้องเสียค่าธรรมเนียมสัมภาระกับสายการบิน`,
      },
    },
    ja: {
      title: `Chiangmai Highlands Golf & Spa Resort — グリーンフィー・メーオンの山岳18ホール紹介・クラブレンタル`,
      meta_description: `グリーンフィーは3,400THB。Chiangmai Highlands Golf & Spa Resortはチェンマイ市街から東へ40kmのメーオン郡にある18ホールのチャンピオンシップコースで、Schmidt-Curley Designの設計、チャンピオンシップティーから7,227ヤードです。バンコクのホテルへ届くLENGOLFのクラブレンタルもご案内します。`,
      prose: {
        overview: `Chiangmai Highlands Golf & Spa Resortは、チェンマイ市街から東へ40kmのメーオン郡の山中に広がる18ホールのチャンピオンシップコースです。設計を担当したのは、タイでも高い評価を受けるコースをいくつも手がけてきたアメリカの設計事務所Schmidt-Curley Designで、2005年に開場しました。起伏に富む高地の地形に築かれたChiangmai Highlandsは、パスパラムのフェアウェイとティフイーグルのパッティンググリーンによって一年を通じて安定したプレー面を保ち、レイアウト全体には100を超えるバンカーが配されています。チャンピオンシップティーからの全長は7,227ヤード。タイ北部を代表するゴルフ体験として定期的に取り上げられており、平坦なリゾート型パークランドではなく本物の高地の舞台を求めるゴルファーからとくに支持されています。敷地内にはフルサービスのスパ、宿泊施設、クラブハウスのレストランがそろい、ラウンドとメーオンの山の景色を組み合わせた数日間の滞在にも向いています。`,
        layout_and_experience: `Chiangmai Highlandsは山岳地形の上でプレーするコースで、高低差と谷の眺めが最初のティーから体験を決定づけます。Schmidt-Curleyの設計は自然の地形を余すところなく生かしており、フェアウェイは丘の稜線に沿って上下し、いくつかのホールでは大きな高低差を計算に入れた精密なクラブ選択が求められます。パスパラムのフェアウェイはボールをよく受け止め、雨季でも信頼できるライを提供。ティフイーグルのグリーンは速く、転がりも一定しています。

18ホール全体に100を超えるバンカーが散らばるChiangmai Highlandsでは、ラウンドを通じて正確なアプローチが要求されます。とりわけパー3は容赦がなく、狙いより短い球も横に外れた球もサンドトラップが待ち構えます。18番ホールは記憶に残る締めくくりの難関で、思い切りのよいショットメイキングに応える手強いアプローチが待っています。チャンピオンシップティー（7,227ヤード、パー72）からはローハンディキャップのプレーヤーにとっても本格的な試練となる一方、6,287ヤードのホワイトティーと5,739ヤードのイエローティーを選べば、中級ハンディキャップの方にも十分手の届くレイアウトになります。

Chiangmai Highlandsのキャディーは経験豊富で、山岳ゴルフに欠かせない高低差を加味した距離計算にも通じています。とくに打ち上げや打ち下ろしのアプローチでキャディーの助言に従えば、ラウンド全体でスコアを節約できるはずです。プレーヤー1人につきキャディー1人とカート1台が付き（運転はキャディーが担当）、これがテンポのよいラウンドにつながっています。なお、このコースには雨天時のレインチェック制度がなく、天候で中断したラウンドの返金はありません。予約の際に頭に入れておきたい点です。`,
        tips: `Chiangmai Highlandsをプレーするなら11月から2月がベストで、朝の気温は15〜22°Cまで下がり、フェアウェイも雨季明けの最良の状態にあります。11月から3月のピーク時期は、条件のよい早朝のティータイムを押さえておきましょう。雨季（6月から10月）はフェアウェイが青々としますが午後の雷雨も多く、午前のラウンドならおおむね良好な天候のうちに終えられます。キャディーフィーとカート代は必須で、支払いはタイバーツの現金のみ。ラウンド後のキャディーへのチップは400THB以上が標準です。レインチェック制度がないため、ピークシーズンの訪問では天候によるゴルフのキャンセルを補償する旅行保険の検討をおすすめします。服装は襟付きシャツが必須で、丸首のTシャツとデニムは認められていません。高地での滞在とラウンドを組み合わせたい方のために、敷地内には宿泊施設も用意されています。チェンマイ市街からの移動はGrabかホテルの車を手配してください。メーオンへの道は曲がりくねっており、公共交通機関はあまり充実していません。`,
        location_and_access: `Chiangmai Highlands Golf & Spa Resortはメーオン郡にあり、チェンマイ市街中心部から東へおよそ40分の距離です。バンコクからはほぼ全員が飛行機を利用し、スワンナプーム（BKK）またはドンムアン（DMK）からチェンマイ（CNX）まで約1時間10分。バンコクからの陸路の距離は約720kmあり、ゴルフ旅行で車を使うのは現実的ではありません。チェンマイに着いてからは、Grabか自家用車でリゾートへ向かえます。ルートは市街中心部からスーパーハイウェイ11号線を東へ進む形です。リゾートに事前に依頼すれば送迎の手配もしてもらえます。`,
        rental_cta_context: `山あいのChiangmai Highlandsでのラウンドをお考えの方へ。LENGOLFなら質の高いクラブセットをバンコクでレンタルでき、フライト前にホテルまでお届けします。身軽に移動でき、航空会社の預け荷物料金もかかりません。`,
      },
    },
    ko: {
      title: `Chiangmai Highlands Golf & Spa Resort 그린피 — 매온 산악 18홀 코스 가이드`,
      meta_description: `Chiangmai Highlands Golf & Spa Resort 그린피는 3,400바트예요. 치앙마이에서 동쪽으로 40km 떨어진 매온군의 18홀 챔피언십 코스로, Schmidt-Curley Design 설계에 챔피언십 티 전장은 7,227야드입니다. 방콕 호텔로 배달되는 LENGOLF 클럽 대여도 안내해요.`,
      prose: {
        overview: `Chiangmai Highlands Golf & Spa Resort 코스는 치앙마이 시내에서 동쪽으로 40km 떨어진 매온군 산속에 자리한 18홀 챔피언십 코스예요. 설계는 태국에서 가장 높은 평가를 받는 코스들을 여럿 맡아 온 미국 설계 사무소 Schmidt-Curley Design에서 담당했고, 2005년에 문을 열었습니다. 굽이치는 고지대 지형 위에 조성된 Chiangmai Highlands 코스는 패스팔럼 페어웨이와 Tifeagle 퍼팅 그린으로 일 년 내내 고른 플레이 표면을 유지하며, 레이아웃 전체에 100개가 넘는 벙커가 흩어져 있어요. 챔피언십 티에서의 전장은 7,227야드입니다. 평평한 리조트형 파크랜드가 아니라 진짜 고지대의 무대를 찾는 골퍼들에게 특히 사랑받으며, 태국 북부를 대표하는 골프 경험으로 꾸준히 소개돼요. 부지 안에는 스파와 숙소, 클럽하우스 레스토랑이 갖춰져 있어 라운딩과 매온 산자락의 풍경을 함께 즐기는 며칠간의 체류에도 잘 맞습니다.`,
        layout_and_experience: `Chiangmai Highlands 코스는 산악 지형 위에서 플레이하며, 첫 홀 티부터 고저 차와 계곡 조망이 라운딩의 성격을 결정지어요. Schmidt-Curley의 설계는 자연 지형을 남김없이 살려, 페어웨이가 언덕의 능선을 따라 오르내리고 몇몇 홀에서는 큰 고저 차를 계산에 넣은 정교한 클럽 선택이 필요합니다. 패스팔럼 페어웨이는 볼을 잘 받아 주어 우기에도 믿을 만한 라이를 만들어 주고, Tifeagle 그린은 빠르면서도 구름이 한결같아요.

18홀 전체에 100개가 넘는 벙커가 흩어져 있는 만큼, Chiangmai Highlands 코스에서는 라운딩 내내 정확한 어프로치가 요구돼요. 특히 파 3 홀들은 인정사정이 없어서, 목표보다 짧거나 옆으로 벗어난 볼을 샌드 트랩이 기다립니다. 18번 홀은 과감한 샷 메이킹에 보답하는 까다로운 어프로치로 기억에 남는 마무리를 만들어 줘요. 챔피언십 티(7,227야드, 파 72)에서는 로우 핸디캡 플레이어에게도 본격적인 시험이 되지만, 6,287야드의 화이트 티와 5,739야드의 옐로 티를 고르면 중급 핸디캡 골퍼도 충분히 감당할 수 있는 레이아웃이 됩니다.

Chiangmai Highlands 코스의 캐디들은 경험이 많고, 산악 골프에 꼭 필요한 고저 차를 반영한 거리 계산에도 밝아요. 특히 오르막이나 내리막 어프로치에서 캐디의 조언을 따르면 라운딩 전체에서 타수를 아낄 수 있습니다. 플레이어 한 명당 캐디 한 명과 카트 한 대가 배정되고 운전은 캐디가 맡아, 진행 속도도 경쾌한 편이에요. 다만 이 코스에는 우천 시 레인 체크 제도가 없어서 날씨로 중단된 라운딩은 환불되지 않으니, 예약할 때 염두에 두면 좋아요.`,
        tips: `Chiangmai Highlands 코스를 플레이하기 가장 좋은 때는 11월부터 2월이에요. 아침 기온이 15~22°C까지 내려가고 페어웨이도 우기가 끝난 뒤 최상의 상태를 보입니다. 11월부터 3월까지의 성수기에는 가장 좋은 조건을 확보하도록 이른 티타임을 예약해 두세요. 우기(6월부터 10월)에는 페어웨이가 푸르게 우거지지만 오후 뇌우가 잦아, 오전 라운딩이라면 대체로 좋은 날씨 안에서 끝낼 수 있어요. 캐디피와 카트 요금은 필수이고 바트 현금으로만 결제하며, 라운드가 끝난 뒤 캐디에게 건네는 팁은 400바트 이상이 표준이에요. 레인 체크 제도가 없으니 성수기 방문이라면 날씨로 인한 골프 취소를 보장하는 여행자 보험도 고려해 볼 만해요. 복장은 카라가 있는 셔츠가 필수이고 라운드넥 티셔츠와 데님은 허용되지 않습니다. 고지대에서의 체류와 라운딩을 함께하고 싶다면 부지 안 숙소를 이용할 수 있어요. 치앙마이 시내에서는 Grab이나 호텔 차량을 준비하세요. 매온으로 가는 길은 굽이가 많고 대중교통도 넉넉하지 않아요.`,
        location_and_access: `Chiangmai Highlands Golf & Spa Resort 코스는 매온군에 있고, 치앙마이 시내 중심부에서 동쪽으로 약 40분 거리예요. 방콕에서는 사실상 모두 비행기를 이용하며, 수완나품(BKK)이나 돈므앙(DMK)에서 치앙마이(CNX)까지 약 1시간 10분이 걸립니다. 방콕에서의 육로 거리는 약 720km라서 골프 여행에 차를 쓰기에는 현실적이지 않아요. 치앙마이에 도착한 뒤에는 Grab이나 자가용으로 리조트까지 갈 수 있고, 경로는 시내 중심부에서 11번 슈퍼하이웨이를 따라 동쪽으로 이어집니다. 미리 요청하면 리조트에서 셔틀 이동을 준비해 줘요.`,
        rental_cta_context: `산자락의 Chiangmai Highlands 코스에서 라운딩할 계획인가요? LENGOLF는 방콕에서 품질 좋은 클럽 세트를 대여해 출발 전 호텔로 보내 드려요. 짐을 가볍게 꾸리고 항공사 수하물 요금도 아낄 수 있습니다.`,
      },
    },
    zh: null,
  },
  status: 'published',
  published_at: '2026-04-20',
}
