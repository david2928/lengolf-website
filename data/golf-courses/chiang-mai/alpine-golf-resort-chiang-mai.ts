import type { GolfCourse } from '@/types/golf-courses'

export const course: GolfCourse = {
  slug: 'alpine-golf-resort-chiang-mai',
  region: 'chiang-mai',
  name: `Alpine Golf Resort Chiang Mai`,
  province: `Chiang Mai`,
  designer: `Ronald M. Garl (Course A+B); Pirapon Namatra (Course C)`,
  holes: 27,
  par: 72,
  year_opened: 2008,
  green_fee_weekday_thb: 3700,
  green_fee_weekend_thb: null,
  // Prices by SEASON, not day of week: 3,700 is explicitly "the low-season rate, valid April through October"; no weekend figure.
  fee_is_seasonal: true,
  // All-in package per this file's own EN prose (see `tips`). Setting this stops
  // generated copy calling the number a bare "green fee", which would tell a
  // reader the caddie and cart are extra when the prose says they are included.
  fee_is_package: true,
  // Zero, not null: EN states the 3,700 all-in rate INCLUDES caddie and cart,
  // so each costs this golfer nothing on top. SpecTable renders 0 as "Included".
  caddie_fee_thb: 0,
  cart_fee_thb: 0,
  caddie_required: true,
  cart_required: true,
  driving_range: true,
  website: 'https://www.alpinegolfresort.com/',
  phone: '+66 53 880 888',
  latitude: 18.6915,
  longitude: 99.1739,
  distance_from_bangkok_km: 700,
  drive_time_from_bangkok_min: null,
  google_maps_url: null,
  club_rental_available: true,
  club_rental_fee_thb: 1500,
  club_rental_brands: null,
  schema_markup: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"GolfCourse\",\n  \"name\": \"Alpine Golf Resort Chiang Mai\",\n  \"url\": \"https://len.golf/golf-courses/chiang-mai/alpine-golf-resort-chiang-mai\",\n  \"description\": null,\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"addressLocality\": \"Chiang Mai\",\n    \"addressCountry\": \"TH\"\n  },\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 18.6915,\n    \"longitude\": 99.1739\n  },\n  \"telephone\": \"+66 53 880 888\",\n  \"priceRange\": \"฿฿฿\",\n  \"sameAs\": [\n    \"https://www.alpinegolfresort.com/\"\n  ],\n  \"amenityFeature\": [\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Driving Range\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Caddie Required\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Golf Cart\",\n      \"value\": true\n    }\n  ]\n}",
  prose: {
    overview: `Alpine Golf Resort Chiang Mai is a 27-hole championship venue set across 450 rai of forested valley in San Kamphaeng, approximately 25 kilometres east of Chiang Mai city. The course was designed by American architect Ronald M. Garl, who shaped the original 18-hole layout (Courses A and B) that opened in 2008; a further nine holes designed by Thai architect Pirapon Namatra were added in 2017. The resort is best known for Thailand's first paddy field greens — holes played across rice paddies that flood and change appearance with the seasons, offering an experience unlike any standard parkland course in the country. Alpine has hosted regional professional tournaments and is consistently cited among the top golf experiences in Northern Thailand. On-site facilities include a 78-room resort, spa, international restaurant, swimming pool, and conference centre, making it a destination for golfers combining a round with a longer Chiang Mai stay.`,
    layout_and_experience: `The 27-hole layout is divided into three nine-hole sections, each with a distinct character. Courses A and B form the main championship 18-hole track, stretching to approximately 7,500 yards from the back tees through forested valley terrain. The routing combines parkland fairways flanked by mature trees with wetland transitions and the course's most distinctive feature: the paddy field section, where fairways and greens are built across working rice paddies. The paddy zone changes dramatically through the year — dry and golden in the hot season, lush and flooded during the monsoon months when water borders almost every shot.

The terrain is predominantly flat to gently undulating by Chiang Mai standards, making Alpine more accessible than the highland mountain courses further from the city. Elevation changes are moderate, but the tree-lined corridors require accuracy off the tee, and the paddy sections add visual and strategic complexity. Course C — the third nine, opened 2017 — adds variety with a pine tree zone and wetland passages, and can be combined with Course A or B for a full 18-hole alternative routing.

Greens are generally medium-paced and firm enough to reward precise approach play, with bunkers placed to challenge wayward approaches on the tighter par-4s. The course plays to par 72 over the 18-hole A+B combination. Afternoon rounds in the rainy season (June–October) can be interrupted by brief tropical showers; morning tee times are strongly recommended during this period. The cool dry months of November through February offer ideal conditions — temperatures in the low 20s Celsius and virtually no rain risk.`,
    tips: `The green fee shown here (3,700 THB all-in including caddie and cart) is the low-season rate, valid April through October. High-season rates (November–March) are higher — confirm current pricing directly with the resort at +66 53 880 888 or via alpinegolfresort.com before booking. Book a morning tee time to take advantage of cooler temperatures and lower humidity, particularly in the March–May hot season when afternoon temperatures can exceed 35°C. November through February is the most comfortable period to play Alpine: cool and dry, with fairways in excellent condition. The resort offers a lunch buffet at the clubhouse that is included in some green fee packages — confirm at booking whether it is part of your rate. Caddie service is mandatory and the same caddie accompanies you for the full round; tipping 400 THB upward at the end of the round is customary. Carts are compulsory with one golfer per cart. Golf clubs and shoes are available for hire at the pro shop. Grab taxis from Chiang Mai city are reliable; the resort can also arrange shuttle transfers.`,
    location_and_access: `Alpine Golf Resort Chiang Mai is located 25 kilometres east of Chiang Mai city centre in San Kamphaeng district, approximately 30–40 minutes by road from Chiang Mai International Airport. From Bangkok, virtually all visitors fly — the journey takes around 1 hour 10 minutes from Suvarnabhumi (BKK) or Don Mueang (DMK) to Chiang Mai (CNX). Driving the full 700 kilometres from Bangkok takes approximately 9 hours and is not practical for a golf trip. Once in Chiang Mai, the course is reachable by private car, Grab taxi, or the resort's shuttle; the route follows Highway 1147 eastward through San Kamphaeng district.`,
    rental_cta_context: `Heading to Alpine Golf Resort Chiang Mai for a round in Northern Thailand? Rent premium clubs in Bangkok — delivered to your hotel before you fly — so you can travel light and skip the airline baggage fees.`,
  },
  locales: {
    en: {
      title: `Alpine Golf Resort Chiang Mai — Green Fees, Course Guide & Golf Club Rentals`,
      meta_description: `Alpine Golf Resort Chiang Mai green fees, course overview, tips, and how to arrange golf club rentals delivered to your Bangkok hotel.`,
    },
    th: {
      title: `Alpine Golf Resort Chiang Mai — แพ็กเกจรวมทุกอย่าง รีวิวสนาม 27 หลุมกรีนกลางนาข้าว และเช่าไม้กอล์ฟ`,
      meta_description: `ค่ากรีนฟี Alpine Golf Resort Chiang Mai 3,700 บาทแบบเหมารวมแคดดี้และรถกอล์ฟ ซึ่งเป็นอัตราโลว์ซีซันเดือนเมษายนถึงตุลาคม สนามแชมเปียนชิพ 27 หลุมในอำเภอสันกำแพง พร้อมกรีนกลางนาข้าวแห่งแรกของไทย และบริการเช่าไม้กอล์ฟส่งถึงโรงแรมในกรุงเทพฯ`,
      prose: {
        overview: `Alpine Golf Resort Chiang Mai เป็นสนามแชมเปียนชิพ 27 หลุมบนพื้นที่ 450 ไร่ในหุบเขาที่ปกคลุมด้วยป่าของอำเภอสันกำแพง ห่างจากตัวเมืองเชียงใหม่ไปทางตะวันออกประมาณ 25 กิโลเมตร สนามออกแบบโดย Ronald M. Garl สถาปนิกชาวอเมริกัน ผู้วางเลย์เอาต์ 18 หลุมดั้งเดิม (คอร์ส A และ B) ซึ่งเปิดให้บริการในปี 2008 ต่อมาในปี 2017 ได้เพิ่มอีก 9 หลุมที่ออกแบบโดย Pirapon Namatra สถาปนิกชาวไทย จุดที่ทำให้รีสอร์ตแห่งนี้เป็นที่รู้จักมากที่สุดคือกรีนกลางนาข้าวแห่งแรกของประเทศไทย ซึ่งเป็นหลุมที่เล่นข้ามผืนนาที่มีน้ำท่วมขังและเปลี่ยนโฉมไปตามฤดูกาล มอบประสบการณ์ที่ต่างจากสนามพาร์กแลนด์มาตรฐานทั่วไปในประเทศ Alpine เคยเป็นเจ้าภาพจัดการแข่งขันระดับภูมิภาคสำหรับนักกอล์ฟอาชีพ และได้รับการกล่าวถึงอย่างสม่ำเสมอในฐานะหนึ่งในประสบการณ์กอล์ฟที่ดีที่สุดของภาคเหนือ สิ่งอำนวยความสะดวกภายในพื้นที่ประกอบด้วยรีสอร์ตขนาด 78 ห้อง สปา ร้านอาหารนานาชาติ สระว่ายน้ำ และศูนย์ประชุม จึงเป็นจุดหมายที่เหมาะกับนักกอล์ฟที่ต้องการรวมการออกรอบเข้ากับการพักผ่อนในเชียงใหม่ที่ยาวนานขึ้น`,
        layout_and_experience: `เลย์เอาต์ 27 หลุมแบ่งออกเป็น 3 ส่วน ส่วนละ 9 หลุม โดยแต่ละส่วนมีบุคลิกเฉพาะตัว คอร์ส A และ B ประกอบกันเป็นสนามแชมเปียนชิพ 18 หลุมหลัก มีระยะประมาณ 7,500 หลาจากแท่นทีหลังสุด ทอดผ่านภูมิประเทศแบบหุบเขาป่าไม้ เส้นทางของสนามผสมผสานแฟร์เวย์แบบพาร์กแลนด์ที่ขนาบด้วยต้นไม้ใหญ่ เข้ากับช่วงเปลี่ยนผ่านของพื้นที่ชุ่มน้ำ และจุดเด่นที่สุดของสนาม นั่นคือช่วงกรีนกลางนาข้าว ซึ่งแฟร์เวย์และกรีนถูกสร้างขึ้นบนผืนนาที่ยังทำการเกษตรอยู่จริง โซนนาข้าวเปลี่ยนโฉมอย่างชัดเจนตลอดทั้งปี แห้งและเป็นสีทองในฤดูร้อน เขียวชอุ่มและมีน้ำท่วมขังในช่วงมรสุม ซึ่งเป็นเวลาที่มีน้ำขนาบอยู่แทบทุกช็อต

ภูมิประเทศส่วนใหญ่ราบเรียบถึงเป็นลูกคลื่นเล็กน้อยเมื่อเทียบกับมาตรฐานของเชียงใหม่ ทำให้ Alpine เข้าถึงได้ง่ายกว่าสนามบนที่สูงในเขตภูเขาที่อยู่ไกลออกไปจากตัวเมือง การเปลี่ยนระดับความสูงอยู่ในระดับปานกลาง แต่ช่องแฟร์เวย์ที่ขนาบด้วยแนวต้นไม้ก็เรียกร้องความแม่นยำจากแท่นที และช่วงนาข้าวยังเพิ่มความซับซ้อนทั้งในเชิงสายตาและเชิงกลยุทธ์ ส่วนคอร์ส C ซึ่งเป็น 9 หลุมที่สามและเปิดในปี 2017 เพิ่มความหลากหลายด้วยโซนป่าสนและช่วงพื้นที่ชุ่มน้ำ ทั้งยังนำไปจับคู่กับคอร์ส A หรือ B เพื่อออกรอบ 18 หลุมในรูปแบบอื่นได้

โดยทั่วไปกรีนมีความเร็วปานกลางและแน่นพอที่จะให้รางวัลแก่ช็อตเข้ากรีนที่แม่นยำ ส่วนบังเกอร์ถูกวางไว้เพื่อท้าทายช็อตเข้าหาธงที่พลาดทิศในหลุมพาร์ 4 ที่แคบกว่า สนามเล่นที่พาร์ 72 เมื่อรวมคอร์ส A และ B เป็น 18 หลุม การออกรอบช่วงบ่ายในฤดูฝน (มิถุนายนถึงตุลาคม) อาจถูกขัดจังหวะด้วยฝนเขตร้อนที่ตกเป็นช่วงสั้น ๆ จึงแนะนำอย่างยิ่งให้จองทีไทม์ช่วงเช้าในระยะเวลานี้ ส่วนเดือนพฤศจิกายนถึงกุมภาพันธ์ซึ่งอากาศเย็นและแห้งให้สภาพการเล่นที่เหมาะสมที่สุด อุณหภูมิอยู่ในช่วง 20 องศาเซลเซียสต้น ๆ และแทบไม่มีความเสี่ยงเรื่องฝน`,
        tips: `ค่ากรีนฟีที่แสดงไว้ที่นี่ 3,700 บาทแบบเหมารวมทั้งค่าแคดดี้และรถกอล์ฟ เป็นอัตราโลว์ซีซันที่ใช้ได้ตั้งแต่เดือนเมษายนถึงตุลาคม ส่วนอัตราไฮซีซัน (พฤศจิกายนถึงมีนาคม) จะสูงกว่านี้ ควรตรวจสอบราคาปัจจุบันกับทางรีสอร์ตโดยตรงที่ +66 53 880 888 หรือทาง alpinegolfresort.com ก่อนจอง ควรจองทีไทม์ช่วงเช้าเพื่อรับอากาศที่เย็นกว่าและความชื้นที่ต่ำกว่า โดยเฉพาะในฤดูร้อนเดือนมีนาคมถึงพฤษภาคมที่อุณหภูมิช่วงบ่ายอาจสูงเกิน 35°C เดือนพฤศจิกายนถึงกุมภาพันธ์เป็นช่วงที่สบายที่สุดสำหรับการเล่นที่ Alpine ทั้งเย็นและแห้ง อีกทั้งแฟร์เวย์ยังอยู่ในสภาพยอดเยี่ยม ทางรีสอร์ตมีบุฟเฟต์มื้อกลางวันที่คลับเฮาส์ซึ่งรวมอยู่ในแพ็กเกจค่ากรีนฟีบางแบบ ควรสอบถามตอนจองว่าอัตราของคุณรวมมื้อกลางวันไว้แล้วหรือไม่ บริการแคดดี้เป็นข้อบังคับ และแคดดี้คนเดิมจะอยู่กับคุณตลอดการออกรอบ โดยนิยมให้ทิป 400 บาทขึ้นไปเมื่อจบรอบ รถกอล์ฟเป็นข้อบังคับเช่นกัน โดยใช้หนึ่งคันต่อผู้เล่นหนึ่งคน ไม้กอล์ฟและรองเท้ามีให้เช่าที่โปรช็อป การเรียก Grab จากตัวเมืองเชียงใหม่ทำได้อย่างน่าเชื่อถือ และทางรีสอร์ตยังจัดรถรับส่งให้ได้เช่นกัน`,
        location_and_access: `Alpine Golf Resort Chiang Mai ตั้งอยู่ห่างจากใจกลางเมืองเชียงใหม่ไปทางตะวันออก 25 กิโลเมตร ในอำเภอสันกำแพง ใช้เวลาเดินทางโดยรถยนต์จากท่าอากาศยานนานาชาติเชียงใหม่ประมาณ 30-40 นาที ผู้ที่เดินทางจากกรุงเทพฯ แทบทั้งหมดเลือกบิน โดยใช้เวลาราว 1 ชั่วโมง 10 นาทีจากสนามบินสุวรรณภูมิ (BKK) หรือสนามบินดอนเมือง (DMK) ไปยังเชียงใหม่ (CNX) การขับรถเต็มระยะทาง 700 กิโลเมตรจากกรุงเทพฯ ใช้เวลาประมาณ 9 ชั่วโมง จึงไม่สะดวกในทางปฏิบัติสำหรับทริปกอล์ฟ เมื่อถึงเชียงใหม่แล้ว สามารถเดินทางไปยังสนามได้ด้วยรถส่วนตัว Grab หรือรถรับส่งของรีสอร์ต โดยเส้นทางใช้ทางหลวงหมายเลข 1147 มุ่งไปทางตะวันออกผ่านอำเภอสันกำแพง`,
        rental_cta_context: `กำลังจะไปออกรอบที่ Alpine Golf Resort Chiang Mai ในภาคเหนือของไทยใช่ไหม เช่าชุดไม้กอล์ฟคุณภาพพรีเมียมจาก LENGOLF ที่กรุงเทพฯ พร้อมบริการส่งถึงโรงแรมก่อนคุณขึ้นเครื่อง เพื่อให้เดินทางแบบตัวเบาและไม่ต้องเสียค่าธรรมเนียมสัมภาระกับสายการบิน`,
      },
    },
    ja: {
      title: `Alpine Golf Resort Chiang Mai — パッケージ料金・水田グリーンの27ホール紹介・クラブレンタル`,
      meta_description: `グリーンフィーは3,700THB（キャディーとカート込み、4月から10月のローシーズン料金）。Alpine Golf Resort Chiang Maiはサンカンペーンの森の谷に広がる27ホールで、タイ初の水田グリーンが名物です。バンコクのホテルへ届くLENGOLFのクラブレンタルもご案内します。`,
      prose: {
        overview: `Alpine Golf Resort Chiang Maiは、チェンマイ市街から東へ約25kmのサンカンペーンにあり、450ライの森に覆われた谷あいに広がる27ホールのチャンピオンシップコースです。オリジナルの18ホール（コースAとB）を手がけたのはアメリカ人設計家のRonald M. Garlで、2008年に開場しました。さらに2017年には、タイ人設計家Pirapon Namatraが設計した9ホールが加わっています。このリゾートを最もよく知られた存在にしているのは、タイ初の水田グリーンです。季節ごとに水を張り、表情を変えていく田んぼを越えて打つホールは、国内の一般的なパークランドコースとはまったく異なる体験をもたらします。Alpineはプロの地域トーナメントを開催した実績があり、タイ北部を代表するゴルフ体験のひとつとして常に名前が挙がります。敷地内には78室のリゾート、スパ、インターナショナルレストラン、プール、カンファレンスセンターがそろい、ラウンドとチェンマイでの長めの滞在を組み合わせたいゴルファーの目的地となっています。`,
        layout_and_experience: `27ホールのレイアウトは9ホールずつ3つのセクションに分かれ、それぞれに異なる個性があります。コースAとBがメインのチャンピオンシップ18ホールを構成し、森に覆われた谷の地形を縫ってバックティーから約7,500ヤードまで伸びています。ルーティングが組み合わせるのは、成熟した樹木に縁取られたパークランドのフェアウェイ、湿地帯へと移り変わる区間、そしてこのコース最大の特徴である水田セクション。水田セクションでは、実際に稲作が行われている田んぼの上にフェアウェイとグリーンが築かれています。この水田ゾーンは一年を通じて大きく姿を変え、暑季には乾いて黄金色に染まり、モンスーンの時期には青々と水を張って、ほとんどすべてのショットに水が寄り添います。

地形はチェンマイの基準で見ればおおむね平坦から緩やかな起伏どまりで、市街から離れた高地の山岳コースよりもAlpineは取り組みやすいと言えます。高低差は中程度ですが、樹木に挟まれた打ち出しの通路はティーショットの正確さを求め、水田区間は視覚的にも戦略的にも複雑さを加えます。2017年開場の3つ目の9ホールであるコースCは、松林のゾーンと湿地の区間で変化を添え、コースAまたはBと組み合わせれば18ホールの別ルーティングとしても楽しめます。

グリーンは全体に中速で、正確なアプローチに応えるだけの硬さを備えています。バンカーは、狭めのパー4で狙いを外したアプローチをとらえる位置に配されました。18ホールのA+B組み合わせではパー72でのプレーとなります。雨季（6月から10月）の午後のラウンドは熱帯特有の短いにわか雨で中断されることがあるため、この時期は朝のティータイムを強くおすすめします。涼しく乾いた11月から2月は理想的なコンディションで、気温は摂氏20度台前半、雨のリスクもほとんどありません。`,
        tips: `ここに掲載しているグリーンフィー3,700THB（キャディーとカートを含むオールインクルーシブ）は、4月から10月まで有効なローシーズン料金です。ハイシーズン（11月から3月）の料金はこれより高くなるため、予約前に+66 53 880 888またはalpinegolfresort.comでリゾートに直接ご確認ください。気温と湿度が低い朝のティータイムを選ぶのがおすすめで、午後に35°Cを超えることもある3月から5月の暑季はとくにそう言えます。Alpineを最も快適にプレーできるのは11月から2月。涼しく乾いていて、フェアウェイのコンディションも申し分ありません。クラブハウスのランチビュッフェは一部のグリーンフィーパッケージに含まれているので、自分の料金に入っているかどうかを予約時に確認しておきましょう。キャディーの利用は必須で、同じキャディーがラウンド中ずっと付きます。ラウンド後に400THB以上のチップを渡すのが一般的です。カートも必須で、プレーヤー1人につき1台となります。クラブとシューズはプロショップでレンタルできます。チェンマイ市街からのGrabは安定して利用でき、リゾートに送迎を手配してもらうこともできます。`,
        location_and_access: `Alpine Golf Resort Chiang Maiは、チェンマイ市街中心部から東へ25kmのサンカンペーン郡にあり、チェンマイ国際空港からは車でおよそ30〜40分の距離です。バンコクからはほぼ全員が飛行機を利用します。スワンナプーム（BKK）またはドンムアン（DMK）からチェンマイ（CNX）までは約1時間10分。バンコクから700kmを車で走ると約9時間かかり、ゴルフ旅行の移動手段としては現実的ではありません。チェンマイに着いてからは、自家用車、Grab、リゾートの送迎でコースへ向かえます。ルートは国道1147号線を東へ、サンカンペーン郡を抜けていきます。`,
        rental_cta_context: `タイ北部のAlpine Golf Resort Chiang Maiでのラウンドをお考えの方へ。LENGOLFなら質の高いクラブセットをバンコクでレンタルでき、フライト前にホテルまでお届けします。身軽に移動でき、航空会社の預け荷物料金もかかりません。`,
      },
    },
    ko: {
      title: `Alpine Golf Resort Chiang Mai 올인클루시브 패키지 — 산깜팽 논 위 그린 27홀 가이드`,
      meta_description: `Alpine Golf Resort Chiang Mai 올인클루시브 요금은 캐디와 카트를 포함해 3,700바트이며, 4월부터 10월까지 적용되는 비수기 요금이에요. 치앙마이 동쪽 산깜팽의 27홀 챔피언십 코스와 태국 최초의 논 위 그린, 방콕 호텔로 배달되는 LENGOLF 클럽 대여를 안내해요.`,
      prose: {
        overview: `Alpine Golf Resort Chiang Mai 코스는 치앙마이 시내에서 동쪽으로 약 25km 떨어진 산깜팽의 숲 계곡 450라이 부지에 자리한 27홀 챔피언십 코스예요. 원래의 18홀 레이아웃(코스 A와 B)은 미국인 건축가 Ronald M. Garl의 설계로 2008년에 문을 열었고, 2017년에는 태국인 건축가 Pirapon Namatra의 설계로 9홀이 더해졌습니다. 이 리조트를 가장 널리 알린 것은 태국 최초의 논 위 그린이에요. 계절에 따라 물이 차오르고 표정이 바뀌는 논을 가로질러 플레이하는 홀들은, 태국의 여느 파크랜드 코스와는 전혀 다른 경험을 안겨 줘요. Alpine에서는 프로 지역 대회가 열린 적이 있고, 태국 북부를 대표하는 골프 경험으로 꾸준히 꼽힙니다. 부지 안에는 78실 규모의 리조트와 스파, 인터내셔널 레스토랑, 수영장, 컨퍼런스 센터가 있어 라운딩과 긴 치앙마이 체류를 함께 즐기려는 골퍼에게 어울리는 목적지예요.`,
        layout_and_experience: `27홀 레이아웃은 9홀씩 세 개의 섹션으로 나뉘며 각각 성격이 달라요. 코스 A와 B가 메인 챔피언십 18홀을 이루고, 숲이 우거진 계곡 지형을 따라 뒤쪽 티에서 약 7,500야드까지 뻗어 있습니다. 루팅은 오래 자란 나무들이 늘어선 파크랜드 페어웨이와 습지로 이어지는 구간, 그리고 이 코스의 가장 뚜렷한 특징인 논 구간을 엮어 냈어요. 논 구간에서는 실제로 벼농사를 짓는 논 위에 페어웨이와 그린이 조성돼 있습니다. 이 논 지대는 한 해 동안 극적으로 모습을 바꿔, 더운 계절에는 마르고 황금빛으로 물들며 몬순 기간에는 푸르게 우거지고 물이 차올라 거의 모든 샷 옆에 물이 함께해요.

지형은 치앙마이의 다른 코스들과 견주면 대체로 평탄하거나 완만하게 굽이치는 편이라, 시내에서 더 멀리 떨어진 고지대 산악 코스보다 Alpine 코스가 다가서기 쉬워요. 고저 차는 중간 정도지만 나무가 늘어선 통로 때문에 티샷의 정확성이 필요하고, 논 구간은 시각적으로도 전략적으로도 복잡함을 더합니다. 2017년에 문을 연 세 번째 나인인 코스 C는 소나무 지대와 습지 구간으로 변화를 더해 주며, 코스 A나 B와 묶어 또 다른 18홀 라운딩으로 즐길 수도 있어요.

그린은 대체로 중간 정도의 빠르기이면서 정확한 어프로치에 보답할 만큼 단단해요. 벙커는 좁은 편인 파 4 홀에서 빗나간 어프로치를 잡아내는 자리에 놓였습니다. 코스 A와 B를 묶은 18홀은 파 72로 플레이해요. 우기(6월부터 10월)의 오후 라운딩은 짧은 열대성 소나기로 중단되기도 하니, 이 시기에는 오전 티타임을 강력히 권해요. 시원하고 건조한 11월부터 2월은 기온이 섭씨 20도 초반에 머물고 비 걱정도 거의 없어 가장 이상적인 조건을 보여 줍니다.`,
        tips: `여기에 안내한 3,700바트(캐디와 카트를 포함한 올인클루시브)는 4월부터 10월까지 적용되는 비수기 요금이에요. 성수기(11월부터 3월)에는 요금이 더 높으니, 예약 전에 +66 53 880 888 또는 alpinegolfresort.com에서 리조트에 직접 현재 가격을 확인하세요. 오전 티타임을 잡으면 기온과 습도가 낮은 시간대를 누릴 수 있는데, 오후 기온이 35°C를 넘기도 하는 3월부터 5월의 더운 계절에는 특히 그래요. Alpine 코스를 가장 쾌적하게 즐길 수 있는 때는 11월부터 2월이에요. 시원하고 건조하며 페어웨이 상태도 훌륭합니다. 클럽하우스의 런치 뷔페가 일부 그린피 패키지에 포함되어 있으니, 예약할 때 내 요금에 포함되는지 확인해 두세요. 캐디 서비스는 필수이고 같은 캐디가 라운딩 내내 함께하며, 라운드가 끝나면 400바트 이상 팁을 건네는 것이 관례예요. 카트도 필수이며 플레이어 한 명당 한 대를 사용합니다. 클럽과 골프화는 프로샵에서 대여할 수 있어요. 치앙마이 시내에서 부르는 Grab은 안정적으로 이용할 수 있고, 리조트에 셔틀 이동을 요청할 수도 있습니다.`,
        location_and_access: `Alpine Golf Resort Chiang Mai 코스는 치앙마이 시내 중심부에서 동쪽으로 25km 떨어진 산깜팽군에 있고, 치앙마이 국제공항에서 차로 약 30~40분 거리예요. 방콕에서는 사실상 모두 비행기를 이용하는데, 수완나품(BKK)이나 돈므앙(DMK)에서 치앙마이(CNX)까지 약 1시간 10분이 걸립니다. 방콕에서 700km를 직접 운전하면 약 9시간이 걸려 골프 여행으로는 현실적이지 않아요. 치앙마이에 도착한 뒤에는 자가용이나 Grab, 리조트 셔틀로 코스까지 갈 수 있고, 경로는 1147번 국도를 따라 동쪽으로 산깜팽군을 지나갑니다.`,
        rental_cta_context: `태국 북부의 Alpine Golf Resort Chiang Mai 코스에서 라운딩할 계획인가요? LENGOLF는 방콕에서 품질 좋은 클럽 세트를 대여해 출발 전 호텔로 보내 드려요. 짐을 가볍게 꾸려 비행기에 오르고, 항공사 수하물 요금도 아낄 수 있습니다.`,
      },
    },
    zh: {
      title: `Alpine Golf Resort Chiang Mai（清迈府）— 全包套餐、水田果岭27洞与球杆租借`,
      meta_description: `Alpine Golf Resort Chiang Mai全包价3,700泰铢，已含球童与球车，为4月至10月的淡季价格。这座27洞锦标赛球场位于清迈以东的San Kamphaeng，拥有泰国首座水田果岭，另附送到曼谷酒店的LENGOLF球杆租借。`,
      prose: {
        overview: `Alpine Golf Resort Chiang Mai是一座27洞锦标赛球场，坐落在清迈市区以东约25公里San Kamphaeng一片450莱的森林山谷之中。球场由美国设计师Ronald M. Garl操刀，他塑造了2008年开放的原始18洞布局（A场与B场）；2017年又增建了由泰国设计师Pirapon Namatra设计的9个洞。这座度假村最为人所知的，是泰国首座水田果岭——球洞跨越真正的稻田而设，稻田随季节泛水、改换面貌，带来国内任何一座标准园林式球场都给不了的体验。Alpine承办过地区职业赛事，也一直被视为泰国北部最出色的高尔夫体验之一。场内设施包括一座78间客房的度假酒店、水疗、国际餐厅、游泳池与会议中心，很适合想把一轮球和更长的清迈行程结合起来的球手。`,
        layout_and_experience: `27洞布局分成三组各9洞的区段，每一组性格都不一样。A场与B场组成主要的18洞锦标赛球道，从后发球台量起约7,500码，穿行于森林山谷地形之间。路线把两侧成材树木夹道的园林式球道、湿地过渡带，以及球场最鲜明的特色——水田区段结合在一起：在水田区段，球道与果岭直接筑在仍在耕作的稻田之上。这片水田区一年之中变化剧烈，热季干燥而金黄，季风月份则青翠而积水，几乎每一杆旁边都有水。

以清迈的标准衡量，这里的地势以平坦到缓缓起伏为主，因此Alpine比离市区更远的高地山岳球场更容易上手。高低落差属于中等，但两侧林木夹道的通道要求发球台上的准确度，水田区段又在视觉与战术上都添了一层复杂。2017年开放的第三组9洞C场，用一片松树林区与湿地路段增添变化，也可以与A场或B场搭配，凑成另一种18洞打法。

果岭整体速度中等，硬度足以回报精准的攻果岭球；沙坑的位置则专门用来考验较窄的4杆洞上偏离目标的攻击。A+B组合的18洞打标准杆72。雨季（6月至10月）的下午球局可能被短促的热带阵雨打断，这段时间强烈建议订清晨的开球时间。凉爽干燥的11月至次年2月条件最理想，气温在摄氏20度出头，几乎没有下雨的风险。`,
        tips: `这里列出的果岭费3,700泰铢（全包，含球童与球车）是4月至10月有效的淡季价格。旺季（11月至次年3月）价格更高，预订前请拨打+66 53 880 888或通过alpinegolfresort.com向度假村直接确认当前报价。建议订上午的开球时间，气温和湿度都更宜人，3月至5月热季午后气温可能超过35°C时尤其如此。打Alpine最舒服的时段是11月至次年2月：凉爽干燥，球道状态极佳。度假村在会馆提供午餐自助，部分果岭费套餐里已经含了这一项，预订时不妨问清楚你的价格是否包含。球童为强制配置，同一位球童会陪你打完整轮，结束后给400泰铢以上的小费是惯例。球车同样强制，每位球员一辆。球杆与球鞋可在Pro Shop租借。从清迈市区叫Grab很可靠，度假村也能安排接驳车。`,
        location_and_access: `Alpine Golf Resort Chiang Mai位于清迈市中心以东25公里的San Kamphaeng县，距清迈国际机场约30–40分钟车程。从曼谷前来的人几乎都选择飞行——从素万那普机场（BKK）或廊曼机场（DMK）飞到清迈（CNX）约1小时10分钟。从曼谷开完700公里全程约需9小时，对高尔夫行程来说并不实际。到了清迈之后，可以自驾、叫Grab或搭度假村的接驳车前往球场，路线沿1147号公路向东穿过San Kamphaeng县。`,
        rental_cta_context: `打算到泰国北部的Alpine Golf Resort Chiang Mai打一场吗？LENGOLF在曼谷提供品质可靠的租借球杆套组，登机前送到你的酒店，让你轻装出行，也省下航空公司的行李费用。`,
      },
    },
  },
  status: 'published',
  published_at: '2026-04-20',
}
