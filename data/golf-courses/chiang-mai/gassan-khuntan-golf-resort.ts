import type { GolfCourse } from '@/types/golf-courses'

export const course: GolfCourse = {
  slug: 'gassan-khuntan-golf-resort',
  region: 'chiang-mai',
  name: `Gassan Khuntan Golf & Resort`,
  province: `Lamphun`,
  designer: null,
  holes: 27,
  par: 72,
  year_opened: null,
  green_fee_weekday_thb: 4200,
  green_fee_weekend_thb: 4200,
  // All-in package per this file's own EN prose (see `tips`). Setting this stops
  // generated copy calling the number a bare "green fee", which would tell a
  // reader the caddie and cart are extra when the prose says they are included.
  fee_is_package: true,
  caddie_fee_thb: 300,
  cart_fee_thb: 750,
  caddie_required: true,
  cart_required: true,
  driving_range: true,
  website: 'https://www.gassangolf.com/gassan-khuntan/en',
  phone: '+66 53 507 006',
  latitude: 18.4521,
  longitude: 98.9876,
  distance_from_bangkok_km: 700,
  drive_time_from_bangkok_min: null,
  google_maps_url: null,
  club_rental_available: true,
  club_rental_fee_thb: null,
  club_rental_brands: null,
  schema_markup: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"GolfCourse\",\n  \"name\": \"Gassan Khuntan Golf & Resort\",\n  \"url\": \"https://len.golf/golf-courses/chiang-mai/gassan-khuntan-golf-resort\",\n  \"description\": null,\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"addressLocality\": \"Lamphun\",\n    \"addressCountry\": \"TH\"\n  },\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 18.4521,\n    \"longitude\": 98.9876\n  },\n  \"telephone\": \"+66 53 507 006\",\n  \"priceRange\": \"฿฿฿\",\n  \"sameAs\": [\n    \"https://www.gassangolf.com/gassan-khuntan/en\"\n  ],\n  \"amenityFeature\": [\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Driving Range\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Caddie Required\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Golf Cart\",\n      \"value\": true\n    }\n  ]\n}",
  prose: {
    overview: `Gassan Khuntan Golf & Resort is a 27-hole mountain forest course set within Lamphun province, approximately 45 minutes by road south of Chiang Mai International Airport. Operated by the Gassan Golf Group — the dominant golf brand in Northern Thailand — the course is built across three distinct nine-hole loops named White Bridge (Course A), River (Course B), and Mountain (Course C). The main 18-hole combination plays to par 72 over approximately 7,062 yards. The setting is one of the most dramatically natural in Northern Thailand: the course is ringed by the forested ridges of Doi Khuntan National Park, and several holes play with the mountain silhouette as a constant backdrop. This remote, mountainous atmosphere distinguishes Gassan Khuntan from the more accessible resort courses nearer Chiang Mai city and gives it a reputation as the wildest and most adventurous of the Gassan Group properties. Golfers seeking a change of pace from valley parkland layouts will find the rugged terrain and elevated setting a compelling alternative.`,
    layout_and_experience: `The three nine-hole loops each have a different character. The White Bridge nine features the course's most striking water feature — an island green accessed by a distinctive white footbridge — along with sharp doglegs and elevated tee boxes that expose multiple layers of mountain scenery. The River nine follows the contours of a natural waterway, with several fairways squeezed between treelines and the stream corridor; accuracy is at a premium, as wayward shots find either the water or thick rough. The Mountain nine is the most demanding of the three, playing through steeper terrain with blind tee shots and dramatic elevation changes that force players to adjust their club selection on almost every hole.

Throughout, the course uses the natural topography rather than heavy earthmoving, so fairways roll and bend with the land. Grass bunkers and steep-edged hazards are the primary defense — traditional sand bunkers are less prominent than at the lower-elevation resort courses. The greens are firm and true, with subtle breaks that reward local caddie advice. The caddie corps at Gassan Khuntan is well-regarded for their knowledge of a layout that demands experience to score well on.

Pace of play can be slower in peak season (November–March) when the course is busiest. Morning tee times from 7:00–8:00am are strongly recommended to secure comfortable pacing and the coolest temperatures before midday heat builds through the mountain clearings.`,
    tips: `Book an early morning tee time (7:00–8:00am) to enjoy the mountain mist views and avoid the hottest part of the day. The green fee of 4,200 THB covers the high season (November–March) all-inclusive rate; confirm low-season pricing (April–October) directly with the resort as rates may be lower. Caddie tips of 300–500 THB per round are customary and much appreciated — caddies at this course are essential guides given the terrain. The Mountain nine is best left for the final loop if energy permits, as it is the most physically demanding. Bring sunscreen and a rain jacket: afternoon cloud cover over the Khuntan ridge can bring brief showers even in the dry season. The resort has a restaurant at the clubhouse — the terrace view is one of the best at any Chiang Mai-area course.`,
    location_and_access: `Gassan Khuntan Golf & Resort is located in Mae Tha, Lamphun province, approximately 45 minutes south of Chiang Mai International Airport (CNX) and roughly one hour from central Chiang Mai. Visitors from Bangkok fly to CNX (approximately 1 hour 10 minutes from Suvarnabhumi or Don Mueang) — driving the 700 kilometres from Bangkok is not practical for a golf trip. The resort is accessible by private car or Grab taxi from Chiang Mai city; the drive follows Route 11 (the old Chiang Mai–Lamphun road) south through Lamphun town before turning toward the mountains.`,
    rental_cta_context: `Heading to Gassan Khuntan Golf & Resort for a round in the mountains of Northern Thailand? Rent premium clubs in Bangkok — delivered to your hotel before you fly — so you can travel light and skip the airline baggage fees.`,
  },
  locales: {
    en: {
      title: `Gassan Khuntan Golf & Resort — Green Fees, Course Guide & Golf Club Rentals`,
      meta_description: `Gassan Khuntan Golf & Resort green fees, course overview, tips, and how to arrange golf club rentals delivered to your Bangkok hotel.`,
    },
    th: {
      title: `Gassan Khuntan Golf & Resort ลำพูน — แพ็กเกจรวมทุกอย่าง รีวิวสนาม 27 หลุมกลางภูเขา และเช่าไม้กอล์ฟ`,
      meta_description: `ค่ากรีนฟี Gassan Khuntan Golf & Resort 4,200 บาทแบบเหมารวมในช่วงไฮซีซัน สนามภูเขา 27 หลุมในจังหวัดลำพูน โอบล้อมด้วยแนวสันเขาป่าของอุทยานแห่งชาติดอยขุนตาล พร้อมบริการเช่าไม้กอล์ฟส่งถึงโรงแรมในกรุงเทพฯ`,
      prose: {
        overview: `Gassan Khuntan Golf & Resort เป็นสนามป่าเขา 27 หลุมในจังหวัดลำพูน ห่างจากท่าอากาศยานนานาชาติเชียงใหม่ลงมาทางใต้ประมาณ 45 นาทีโดยรถยนต์ สนามบริหารงานโดย Gassan Golf Group ซึ่งเป็นแบรนด์กอล์ฟที่มีบทบาทมากที่สุดในภาคเหนือของไทย และวางผังไว้เป็นลูป 9 หลุมสามลูปที่แตกต่างกันชัดเจน ได้แก่ White Bridge (คอร์ส A), River (คอร์ส B) และ Mountain (คอร์ส C) ส่วนการรวมเป็น 18 หลุมหลักเล่นที่พาร์ 72 ด้วยระยะประมาณ 7,062 หลา บรรยากาศของที่นี่เป็นธรรมชาติชัดเจนที่สุดแห่งหนึ่งของภาคเหนือ ตัวสนามถูกโอบล้อมด้วยแนวสันเขาที่ปกคลุมด้วยป่าของอุทยานแห่งชาติดอยขุนตาล และมีหลายหลุมที่เล่นโดยมีเงาทาบของภูเขาเป็นฉากหลังตลอดเวลา บรรยากาศแบบห่างไกลและเป็นภูเขาเช่นนี้ทำให้ Gassan Khuntan ต่างจากสนามรีสอร์ตที่เดินทางสะดวกกว่าซึ่งอยู่ใกล้ตัวเมืองเชียงใหม่ และทำให้สนามได้ชื่อว่าดิบและผจญภัยที่สุดในบรรดาสนามของ Gassan Group นักกอล์ฟที่อยากเปลี่ยนบรรยากาศจากเลย์เอาต์พาร์กแลนด์ในหุบเขาจะพบว่าภูมิประเทศขรุขระและทำเลบนที่สูงของสนามแห่งนี้เป็นทางเลือกที่น่าสนใจ`,
        layout_and_experience: `ลูป 9 หลุมทั้งสามลูปมีบุคลิกต่างกัน ลูป White Bridge มีอุปสรรคน้ำที่สะดุดตาที่สุดของสนาม นั่นคือกรีนลักษณะเกาะกลางน้ำที่เข้าถึงด้วยสะพานคนเดินสีขาวอันเป็นเอกลักษณ์ พร้อมด้วยหลุมด็อกเลกหักมุมคมและแท่นทียกสูงที่เปิดให้เห็นทิวเขาซ้อนกันหลายชั้น ลูป River ทอดตัวไปตามแนวลำน้ำธรรมชาติ โดยมีหลายแฟร์เวย์ที่ถูกบีบอยู่ระหว่างแนวต้นไม้กับแนวลำธาร ความแม่นยำจึงมีค่าสูงมาก เพราะช็อตที่ออกนอกทิศไม่ลงน้ำก็ไปอยู่ในรัฟหนา ส่วนลูป Mountain เป็นลูปที่หนักหน่วงที่สุดในสามลูป เล่นผ่านภูมิประเทศที่ชันกว่า มีช็อตจากแท่นทีที่มองไม่เห็นจุดตก และการเปลี่ยนระดับความสูงที่ชัดเจนจนผู้เล่นต้องปรับการเลือกไม้แทบทุกหลุม

ตลอดทั้งสนาม การออกแบบใช้ภูมิประเทศตามธรรมชาติแทนการปรับหน้าดินขนานใหญ่ แฟร์เวย์จึงลาดเอียงและคดโค้งไปตามผืนดินจริง อุปสรรคหลักคือบังเกอร์หญ้าและขอบชันของอุปสรรคต่าง ๆ ส่วนบังเกอร์ทรายแบบดั้งเดิมมีบทบาทน้อยกว่าสนามรีสอร์ตที่อยู่ในระดับความสูงต่ำกว่า กรีนแน่นและวิ่งสม่ำเสมอ พร้อมไลน์ที่ลาดเอียงละเอียดอ่อนซึ่งให้รางวัลแก่ผู้ที่รับฟังคำแนะนำของแคดดี้ท้องถิ่น ทีมแคดดี้ของ Gassan Khuntan ได้รับการยอมรับอย่างดีในเรื่องความรู้ความเข้าใจสนามที่ต้องอาศัยประสบการณ์จึงจะทำสกอร์ได้ดี

จังหวะการเล่นอาจช้าลงในช่วงพีคซีซัน (พฤศจิกายนถึงมีนาคม) ซึ่งเป็นเวลาที่สนามคึกคักที่สุด จึงแนะนำอย่างยิ่งให้จองทีไทม์ช่วงเช้าระหว่าง 7:00 ถึง 8:00 น. เพื่อให้ได้จังหวะการเล่นที่สบายและอากาศที่เย็นที่สุดก่อนความร้อนช่วงกลางวันจะสะสมขึ้นตามที่โล่งบนภูเขา`,
        tips: `ควรจองทีไทม์ช่วงเช้าตรู่ (7:00 ถึง 8:00 น.) เพื่อชมวิวหมอกบนภูเขาและเลี่ยงช่วงที่ร้อนที่สุดของวัน ค่ากรีนฟี 4,200 บาทเป็นอัตราเหมารวมของช่วงไฮซีซัน (พฤศจิกายนถึงมีนาคม) ควรสอบถามราคาช่วงโลว์ซีซัน (เมษายนถึงตุลาคม) กับทางรีสอร์ตโดยตรง เพราะอัตราอาจต่ำกว่านี้ ทิปแคดดี้ที่ 300-500 บาทต่อรอบเป็นธรรมเนียมปฏิบัติและได้รับการชื่นชมอย่างมาก เพราะแคดดี้ของสนามนี้เป็นผู้นำทางที่ขาดไม่ได้เมื่อพิจารณาจากลักษณะภูมิประเทศ ควรเก็บลูป Mountain ไว้เป็นลูปสุดท้ายหากแรงยังพอ เพราะเป็นลูปที่ใช้แรงกายมากที่สุด อย่าลืมพกครีมกันแดดและเสื้อกันฝน เพราะเมฆที่ก่อตัวเหนือสันเขาขุนตาลช่วงบ่ายอาจนำฝนช่วงสั้น ๆ มาได้แม้ในฤดูแล้ง ทางรีสอร์ตมีร้านอาหารอยู่ที่คลับเฮาส์ และวิวจากระเบียงถือว่าดีที่สุดแห่งหนึ่งในบรรดาสนามย่านเชียงใหม่`,
        location_and_access: `Gassan Khuntan Golf & Resort ตั้งอยู่ในอำเภอแม่ทา จังหวัดลำพูน ห่างจากท่าอากาศยานนานาชาติเชียงใหม่ (CNX) ลงมาทางใต้ประมาณ 45 นาที และห่างจากใจกลางเมืองเชียงใหม่ราวหนึ่งชั่วโมง ผู้ที่เดินทางจากกรุงเทพฯ ใช้วิธีบินไป CNX (ประมาณ 1 ชั่วโมง 10 นาทีจากสนามบินสุวรรณภูมิหรือสนามบินดอนเมือง) เพราะการขับรถระยะทาง 700 กิโลเมตรจากกรุงเทพฯ ไม่สะดวกในทางปฏิบัติสำหรับทริปกอล์ฟ จากตัวเมืองเชียงใหม่สามารถเดินทางไปสนามได้ด้วยรถส่วนตัวหรือ Grab โดยเส้นทางใช้ทางหลวงหมายเลข 11 (ถนนสายเชียงใหม่-ลำพูนเดิม) มุ่งลงใต้ผ่านตัวเมืองลำพูน ก่อนเลี้ยวเข้าสู่เขตภูเขา`,
        rental_cta_context: `กำลังจะไปออกรอบท่ามกลางขุนเขาภาคเหนือที่ Gassan Khuntan Golf & Resort ใช่ไหม เช่าชุดไม้กอล์ฟคุณภาพพรีเมียมจาก LENGOLF ที่กรุงเทพฯ พร้อมบริการส่งถึงโรงแรมก่อนคุณขึ้นเครื่อง เพื่อให้เดินทางแบบตัวเบาและไม่ต้องเสียค่าธรรมเนียมสัมภาระกับสายการบิน`,
      },
    },
    ja: {
      title: `Gassan Khuntan Golf & Resort（ランプーン県）— パッケージ料金・27ホールの山岳コース紹介・クラブレンタル`,
      meta_description: `グリーンフィーはハイシーズンのオールインクルーシブ料金で4,200THB。Gassan Khuntan Golf & Resortはランプーン県にある27ホールの山岳フォレストコースで、ドイクンターン国立公園の森の稜線に囲まれています。バンコクのホテルへ届くLENGOLFのクラブレンタルもご案内します。`,
      prose: {
        overview: `Gassan Khuntan Golf & Resortは、ランプーン県に広がる27ホールの山岳フォレストコースで、チェンマイ国際空港から南へ車でおよそ45分の場所にあります。運営はタイ北部で圧倒的な存在感を持つゴルフブランド、Gassan Golf Group。コースはWhite Bridge（コースA）、River（コースB）、Mountain（コースC）という性格の異なる3つの9ホールループで構成されています。メインとなる18ホールの組み合わせはパー72、全長は約7,062ヤードです。舞台の自然さはタイ北部でも屈指で、コースはドイクンターン国立公園の森に覆われた稜線にぐるりと囲まれ、いくつものホールで山のシルエットが絶えず背景に広がります。この人里離れた山岳の雰囲気が、チェンマイ市街に近く行きやすいリゾートコースとGassan Khuntanを分ける点であり、Gassan Group傘下でも最も野趣に富み冒険的という評判につながっています。谷のパークランドレイアウトから気分を変えたいゴルファーにとって、荒々しい地形と高台の舞台は魅力的な選択肢になるはずです。`,
        layout_and_experience: `3つの9ホールループはそれぞれ性格が異なります。White Bridgeの9ホールには、このコースで最も目を引く水景である、特徴的な白い歩道橋で渡るアイランドグリーンがあり、鋭いドッグレッグと、山の景色が幾重にも重なって見える打ち上げのティーイングエリアも備わります。Riverの9ホールは自然の水路の輪郭をたどり、いくつかのフェアウェイは樹林帯と流れの間に挟まれています。曲がった球は水か深いラフのどちらかに行き着くため、正確さの価値がきわめて高くなります。3つのなかで最も要求が厳しいのがMountainの9ホールで、より急な地形を進み、ブラインドのティーショットと大きな高低差がほぼ全ホールでクラブ選択の調整を迫ります。

全体を通して、コースは大規模な土の移動ではなく自然の地形をそのまま用いているため、フェアウェイは土地の起伏に沿ってうねり、曲がっていきます。主な防御はグラスバンカーと切り立った縁のハザードで、伝統的なサンドバンカーの存在感は標高の低いリゾートコースほど大きくありません。グリーンは硬く転がりも素直ですが、微妙な傾斜があり、地元キャディーの助言が効いてきます。Gassan Khuntanのキャディー陣は、経験がなければスコアをまとめにくいこのレイアウトへの理解の深さで高く評価されています。

ピークシーズン（11月から3月）はコースが最も混み合い、プレー進行が遅くなることもあります。快適なペースと、山あいの開けた場所に昼の暑さが溜まる前の涼しい時間帯を確保するため、7:00から8:00の朝のティータイムを強くおすすめします。`,
        tips: `山の朝もやの景色を楽しみ、一日で最も暑い時間帯を避けるには、早朝（7:00から8:00）のティータイムを押さえておきましょう。グリーンフィー4,200THBはハイシーズン（11月から3月）のオールインクルーシブ料金です。ローシーズン（4月から10月）の料金はこれより低い場合があるため、リゾートに直接ご確認ください。キャディーへのチップは1ラウンドあたり300〜500THBが慣習で、たいへん喜ばれます。この地形を考えると、ここのキャディーは欠かせない案内役です。Mountainの9ホールは体力的に最も負担が大きいので、余力があれば最後のループに回すとよいでしょう。日焼け止めとレインジャケットもお忘れなく。乾季でも午後にクンターンの稜線を雲が覆い、短いにわか雨が降ることがあります。リゾートのクラブハウスにはレストランがあり、テラスからの眺めはチェンマイ周辺のコースのなかでも屈指です。`,
        location_and_access: `Gassan Khuntan Golf & Resortはランプーン県メーターにあり、チェンマイ国際空港（CNX）から南へおよそ45分、チェンマイ中心部からは車で約1時間の距離です。バンコクからの来訪者はCNXへ空路で向かい（スワンナプームまたはドンムアンから約1時間10分）、バンコクから700kmを車で走るのはゴルフ旅行として現実的ではありません。チェンマイ市街からは自家用車かGrabでアクセスでき、11号線（旧チェンマイ・ランプーン道路）を南下してランプーンの街を抜けたのち、山側へ折れていきます。`,
        rental_cta_context: `タイ北部の山あいにあるGassan Khuntan Golf & Resortでのラウンドをお考えの方へ。LENGOLFなら質の高いクラブセットをバンコクでレンタルでき、フライト前にホテルまでお届けします。身軽に移動でき、航空会社の預け荷物料金もかかりません。`,
      },
    },
    ko: {
      title: `Gassan Khuntan Golf & Resort 올인클루시브 패키지 — 람푼주 산악 27홀 가이드`,
      meta_description: `Gassan Khuntan Golf & Resort 올인클루시브 요금은 성수기 4,200바트예요. 람푼주에 자리한 27홀 산악 포레스트 코스로 도이쿤딴 국립공원의 숲 능선이 사방을 둘러싸고 있어요. 방콕 호텔로 배달되는 LENGOLF 클럽 대여도 안내해요.`,
      prose: {
        overview: `Gassan Khuntan Golf & Resort 코스는 람푼주에 펼쳐진 27홀 산악 포레스트 코스로, 치앙마이 국제공항에서 남쪽으로 차로 약 45분 거리에 있어요. 운영은 태국 북부에서 가장 큰 존재감을 지닌 골프 브랜드 Gassan Golf Group에서 맡고 있습니다. 코스는 White Bridge(코스 A), River(코스 B), Mountain(코스 C) 세 개의 9홀 루프로 이루어져 있고, 루프마다 성격이 뚜렷이 달라요. 메인이 되는 18홀 조합은 파 72에 전장 약 7,062야드입니다. 이곳의 무대는 태국 북부에서도 손꼽히게 자연 그대로인데, 코스가 도이쿤딴 국립공원의 숲 능선에 둘러싸여 있고 여러 홀에서 산의 실루엣이 늘 배경으로 펼쳐져요. 이렇게 외진 산악 분위기가 치앙마이 시내에 가까워 오가기 편한 리조트 코스들과 Gassan Khuntan 코스를 갈라놓으며, Gassan Group 소속 코스 가운데 가장 거칠고 모험적이라는 평판으로 이어졌습니다. 계곡 파크랜드 레이아웃에서 분위기를 바꾸고 싶은 골퍼라면 이 험한 지형과 높은 자리의 무대가 매력적인 선택지가 될 거예요.`,
        layout_and_experience: `세 개의 9홀 루프는 저마다 성격이 달라요. White Bridge 나인에는 이 코스에서 가장 눈에 띄는 워터 해저드가 있는데, 독특한 흰색 인도교를 건너 들어가는 아일랜드 그린이에요. 여기에 날카롭게 꺾이는 도그레그와, 산 풍경이 여러 겹으로 겹쳐 보이는 높은 티잉 구역도 함께합니다. River 나인은 자연 수로의 윤곽을 따라가며, 몇몇 페어웨이는 나무 숲과 물길 사이에 끼어 있어요. 휘어진 볼은 물이나 깊은 러프 가운데 하나로 향하니 정확성의 가치가 매우 큽니다. 셋 가운데 요구가 가장 까다로운 곳은 Mountain 나인으로, 더 가파른 지형을 지나며 블라인드 티샷과 큰 고저 차가 거의 모든 홀에서 클럽 선택을 다시 하게 만들어요.

코스 전체에서 대규모로 흙을 옮기는 대신 자연 지형을 그대로 썼기 때문에, 페어웨이는 땅의 굴곡을 따라 물결치고 휘어집니다. 주된 방어 장치는 그래스 벙커와 가파른 턱을 가진 해저드이고, 전통적인 샌드 벙커의 존재감은 고도가 낮은 리조트 코스만큼 크지 않아요. 그린은 단단하고 구름이 솔직하지만 미묘한 경사가 있어 현지 캐디의 조언이 효과를 발휘합니다. Gassan Khuntan 코스의 캐디들은 경험 없이는 스코어를 만들기 어려운 이 레이아웃을 깊이 이해하고 있다는 점에서 높은 평가를 받아요.

성수기(11월부터 3월)에는 코스가 가장 붐벼 진행 속도가 느려지기도 해요. 편안한 페이스와, 한낮의 열기가 산자락 공터에 쌓이기 전의 시원한 시간대를 확보하려면 오전 7:00~8:00 티타임을 강력히 권합니다.`,
        tips: `산의 아침 안개 풍경을 즐기고 하루 중 가장 더운 시간대를 피하려면 이른 아침(7:00~8:00) 티타임을 잡아 두세요. 4,200바트라는 요금은 성수기(11월부터 3월)의 올인클루시브 가격이에요. 비수기(4월부터 10월) 요금은 이보다 낮을 수 있으니 리조트에 직접 확인해 보세요. 캐디 팁은 라운드당 300~500바트가 관례이고 무척 반가워합니다. 이 지형을 생각하면 이곳의 캐디는 없어서는 안 될 안내자예요. Mountain 나인은 체력 부담이 가장 크니 여력이 있다면 마지막 루프로 돌리는 편이 좋아요. 선크림과 레인재킷도 잊지 마세요. 건기에도 오후에 쿤딴 능선을 구름이 덮으며 짧은 소나기가 내릴 수 있습니다. 리조트 클럽하우스에는 레스토랑이 있고, 테라스에서 보는 풍경은 치앙마이 일대 코스 가운데서도 손꼽혀요.`,
        location_and_access: `Gassan Khuntan Golf & Resort 코스는 람푼주 매타에 있고, 치앙마이 국제공항(CNX)에서 남쪽으로 약 45분, 치앙마이 중심부에서는 차로 약 1시간 거리예요. 방콕에서 오는 방문객은 CNX까지 비행기로 이동하며(수완나품이나 돈므앙에서 약 1시간 10분), 방콕에서 700km를 운전하는 것은 골프 여행으로 현실적이지 않아요. 치앙마이 시내에서는 자가용이나 Grab으로 갈 수 있고, 11번 국도(옛 치앙마이-람푼 도로)를 따라 남쪽으로 람푼 시내를 지난 뒤 산 쪽으로 꺾어 들어갑니다.`,
        rental_cta_context: `태국 북부 산자락의 Gassan Khuntan Golf & Resort 코스에서 라운딩할 계획인가요? LENGOLF는 방콕에서 품질 좋은 클럽 세트를 대여해 출발 전 호텔로 보내 드려요. 짐을 가볍게 꾸린 채 치앙마이로 날아가, 항공사 수하물 요금도 아낄 수 있습니다.`,
      },
    },
    zh: {
      title: `Gassan Khuntan Golf & Resort（南奔府）— 全包套餐、27洞山林球场与球杆租借`,
      meta_description: `Gassan Khuntan Golf & Resort旺季全包价4,200泰铢。这座27洞山林球场位于南奔府，四周环绕Doi Khuntan国家公园覆满森林的山脊，另附送到曼谷酒店的LENGOLF球杆租借。`,
      prose: {
        overview: `Gassan Khuntan Golf & Resort是一座位于南奔府的27洞山林球场，从清迈国际机场往南约45分钟车程。球场由泰国北部最具分量的高尔夫品牌Gassan Golf Group运营，布局分成三组性格分明的9洞环线，分别名为White Bridge（A场）、River（B场）与Mountain（C场）。主要的18洞组合打标准杆72，全长约7,062码。这里的场景在泰国北部堪称最富自然野趣：球场被Doi Khuntan国家公园覆满森林的山脊环抱，好几个洞打起来始终以山影为背景。这种僻静的山地氛围，把Gassan Khuntan和更靠近清迈市区、往来方便的度假村球场区分开来，也让它落下了Gassan集团旗下最野、最具冒险感的名声。想从山谷园林式布局换换口味的球手，会觉得这里粗犷的地形与居高的舞台是个很有说服力的选择。`,
        layout_and_experience: `三组9洞环线各有各的性格。White Bridge那组有全场最抢眼的水景——一座由别致的白色人行桥通达的岛型果岭——再加上急转的狗腿洞和抬高的发球台，把层层叠叠的山景一并推到眼前。River那组顺着一条天然水道的轮廓展开，好几条球道被夹在树林与溪流廊道之间；准头在这里价值极高，因为偏出线的球不是下水就是钻进深草。Mountain那组是三者中要求最高的一组，穿行于更陡的地形，盲打的发球与剧烈的高低落差，几乎每一洞都逼着球手重新斟酌用杆。

整座球场用的是自然地貌，而不是大动土方，因此球道顺着地形起伏、弯折。主要的防守手段是草坑与陡峭边坡的障碍，传统沙坑的分量不如海拔较低的度假村球场那么重。果岭紧实、走线诚实，但坡度细微，听从当地球童的建议会有回报。Gassan Khuntan的球童团队因为熟悉这套非有经验不易打出好成绩的布局，一向口碑不错。

旺季（11月至次年3月）球场最热闹，打球节奏可能变慢。为了拿到舒服的节奏，也为了赶在正午暑气在山间空地上累积起来之前下场，强烈建议订7:00至8:00的上午开球时间。`,
        tips: `订一个清晨的开球时间（7:00至8:00），既能看到山间晨雾，也能避开一天里最热的时段。4,200泰铢的费用是旺季（11月至次年3月）的全包价格；淡季（4月至10月）价格可能更低，请直接向度假村确认。每轮给球童300–500泰铢的小费是惯例，也会让人很受用——就这里的地形而言，球童是不可或缺的向导。如果体力还够，把Mountain那组留到最后一圈会比较好，因为它对体能的消耗最大。别忘了带防晒霜和雨衣：即使在旱季，午后覆上Khuntan山脊的云层也可能带来短暂阵雨。度假村的会馆设有餐厅，露台的景观在清迈一带的球场里数一数二。`,
        location_and_access: `Gassan Khuntan Golf & Resort位于南奔府Mae Tha，距清迈国际机场（CNX）以南约45分钟车程，距清迈市中心约一小时。从曼谷前来的访客飞往CNX，自素万那普机场或廊曼机场出发约1小时10分钟——从曼谷开车700公里对高尔夫行程并不实际。从清迈市区可以自驾或叫Grab前往，路线沿11号公路（旧清迈至南奔公路）南下穿过南奔市区，再折向山区。`,
        rental_cta_context: `打算到泰国北部山间的Gassan Khuntan Golf & Resort打一场吗？LENGOLF在曼谷提供品质可靠的租借球杆套组，登机前送到你的酒店，让你轻装出行，也省下航空公司的行李费用。`,
      },
    },
  },
  status: 'published',
  published_at: '2026-04-21',
}
