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
    ko: {
      title: `Royal Chiang Mai Golf Club & Resort 올인클루시브 패키지 — Peter Thomson 설계 18홀 가이드`,
      meta_description: `Royal Chiang Mai Golf Club & Resort 성수기 올인클루시브 요금은 약 4,800바트예요. 1996년에 문을 연 18홀 파 72 코스이며 설계자는 Peter Thomson입니다. 산사이군 계곡에 펼쳐진 코스 개요와 방콕 호텔로 배달되는 LENGOLF 클럽 대여를 안내해요.`,
      prose: {
        overview: `Royal Chiang Mai Golf Club & Resort 코스는 태국 북부에서 가장 이야깃거리가 많은 코스 가운데 하나예요. British Open 대회를 다섯 번 제패한 Peter Thomson의 설계로 1996년 2월에 문을 연 18홀 파 72 코스입니다. 치앙마이 시내에서 북쪽으로 약 40km 떨어진 산사이군 매팩 일대의 계곡에 자리한 이 코스는, 링크스의 요소를 엮어 넣은 영국식 파크랜드로 구상됐어요. 포트 벙커와 굴려서 붙이는 범프 앤 런 어프로치, 그리고 공중으로만 핀을 공략하기보다 땅을 쓰는 전략에 보답하는 굽이치는 페어웨이가 그 요소에 해당합니다. 부지는 예전에 과수원이었고, 지금도 남아 있는 큰 나무들이 이만한 연식의 코스에서는 보기 드문 규모감과 그늘을 만들어 줘요. 주변을 두른 산 능선은 부지를 감싸며 라운딩 내내 아름다운 배경이 되어 줍니다.`,
        layout_and_experience: `6,969야드라는 Thomson의 설계는 현대의 거리 감각으로 보면 길지 않고 블랙 티도 없지만, 어려움은 길이가 아니라 전략적인 배치에서 나와요. 코스는 나무에 두껍게 둘러싸여 있어 구질을 만들지 않은 티샷은 통로에서 벌을 받습니다. 페어웨이는 평평하지 않고 굽이치는데, 계곡 바닥의 자연스러운 경사를 설계에 끌어들여 어프로치의 라이에 영향을 주는 미묘한 지표면 해저드를 만들어 냈어요.

깊고 면이 가파르며 어중간하게 빗나간 어프로치를 잡아내는 자리에 놓인 포트 벙커가 이 코스의 상징적인 방어 장치예요. 여기에 워터 해저드도 대부분의 홀에 나타나 전략적 복잡함을 한 겹 더합니다. 그린은 잘 관리된 Tiff Dwarf 버뮤다그래스의 빠른 면이에요. 컨디션이 가장 좋은 때는 시원하고 건조한 11월부터 3월입니다.`,
        tips: `현재 요금은 royalchiangmai.com 또는 예약 플랫폼에서 확인한 뒤 예약하세요. 성수기 올인클루시브 요금은 약 4,800바트이며 캐디피와 카트 요금을 포함합니다. 노려야 할 라인을 정하기 전에 야디지 북을 보며 포트 벙커의 위치에 대해 캐디에게 조언을 구하세요. 이 코스는 거리보다 정확성에 보답하므로, 티샷을 안전하게 풀어 가면 더블 보기 위험을 줄일 수 있어요. 오전 라운딩은 기온이 낮고, 11월부터 1월 사이 계곡에 깔리는 안개가 독특한 분위기를 더해 줍니다.`,
        location_and_access: `Royal Chiang Mai Golf Club & Resort 코스는 산사이군 매팩에 있고, 치앙마이 시내에서 북쪽으로 약 40km, 치앙마이 국제공항(CNX)에서는 차로 약 40분 거리예요. 방콕에서 오는 방문객은 CNX까지 비행기로 이동하며(수완나품이나 돈므앙에서 약 1시간 10분), 방콕에서 700km를 운전하는 것은 현실적이지 않아요. 코스까지는 자가용이나 Grab, 리조트의 이동 서비스를 이용해 치앙마이에서 1001번 국도를 따라 북쪽으로 향하면 됩니다.`,
        rental_cta_context: `Peter Thomson의 손에서 태어난 태국 북부의 명작, Royal Chiang Mai Golf Club 코스를 플레이할 계획인가요? LENGOLF는 방콕에서 품질 좋은 클럽 세트를 대여해 출발 전 호텔로 보내 드려요. 항공사 수하물 요금에 시달리지 않고, 그 포트 벙커에 맞설 준비를 갖춘 채 도착할 수 있습니다.`,
      },
    },
    zh: {
      title: `Royal Chiang Mai Golf Club & Resort — 全包套餐、Peter Thomson设计18洞与球杆租借`,
      meta_description: `Royal Chiang Mai Golf Club & Resort旺季全包价约4,800泰铢，已含球童与球车。这座18洞标准杆72球场1996年开放，出自Peter Thomson之手，坐落在清迈San Sai县的山谷里，另附送到曼谷酒店的LENGOLF球杆租借。`,
      prose: {
        overview: `Royal Chiang Mai Golf Club & Resort是泰国北部故事最多的球场之一：一套由五届British Open冠军Peter Thomson设计、1996年2月开放的18洞标准杆72球场。球场坐落在清迈市区以北约40公里、San Sai县Mae Faek一带的山谷之中，构想上是一套糅入林克斯元素的英式园林布局——罐式沙坑、贴地滚进的攻果岭球，以及回报地面打法而非纯粹空中攻旗的起伏球道。场地从前是一片果园，留存下来的成材大树，给这套布局带来了同龄球场少见的尺度感与荫凉。四周的山脊为球场镶边，整轮球都有壮阔的背景。`,
        layout_and_experience: `以现代的码数标准衡量，Thomson这套6,969码的设计并不算长——这里没有黑色发球台——但难度来自战术性的布置而非长度。球场林木夹道密实，通道会惩罚任何没有打出球形的发球。球道起伏而非平坦，Thomson还把谷底自然的坡度纳进设计，造出影响攻果岭球球位的细微地面障碍。

罐式沙坑——又深、面又陡，位置专门用来收下打偏一半的攻果岭球——是这座球场的招牌防守机制。大多数洞上还有水障碍，又叠上一层战术复杂度。果岭是维护良好、速度偏快的Tiff Dwarf百慕大草面。状态最好的时候是凉爽干燥的11月至次年3月。`,
        tips: `请到royalchiangmai.com或透过预订平台确认当前价格：旺季约4,800泰铢的全包价已含球童与球车。选定攻击线之前，先请球童根据码数手册讲解罐式沙坑的位置。这座球场回报准头多过距离，发球台上保守一些，能降低吞下双柏忌的风险。上午的球局更凉快，11月至次年1月山谷里的晨雾还会添上独特的氛围。`,
        location_and_access: `Royal Chiang Mai Golf Club & Resort位于San Sai县Mae Faek，距清迈市区以北约40公里，距清迈国际机场（CNX）约40分钟车程。从曼谷前来的访客飞往CNX，自素万那普机场或廊曼机场出发约1小时10分钟——从曼谷开车700公里并不实际。前往球场可以自驾、叫Grab，或使用度假村的接送服务，自清迈沿1001号公路北上。`,
        rental_cta_context: `打算去打Royal Chiang Mai Golf Club，这座Peter Thomson留在泰国北部的经典之作吗？LENGOLF在曼谷提供品质可靠的租借球杆套组，登机前送到你的酒店，让你不必操心航空公司的行李费用，抵达时就已备好挑战那些罐式沙坑。`,
      },
    },
  },
  status: 'published',
  published_at: '2026-04-21',
}
