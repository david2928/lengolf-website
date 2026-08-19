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
  caddie_fee_thb: 400,
  cart_fee_thb: 800,
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
      title: `Alpine Golf Resort Chiang Mai — ค่ากรีนฟี รีวิวสนาม 27 หลุมกรีนกลางนาข้าว และเช่าไม้กอล์ฟ`,
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
      title: `Alpine Golf Resort Chiang Mai — グリーンフィー・水田グリーンの27ホール紹介・クラブレンタル`,
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
    ko: null,
    zh: null,
  },
  status: 'published',
  published_at: '2026-04-20',
}
