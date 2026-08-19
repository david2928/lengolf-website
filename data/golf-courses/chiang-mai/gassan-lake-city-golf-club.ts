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

กรีนสร้างด้วยหญ้าเบอร์มิวดาพันธุ์ Tiff Dwarf เพื่อความเร็วและความทนทานตลอดฤดูการเติบโตในเขตร้อน สภาพสนามได้รับคำชมอย่างสม่ำเสมอนับตั้งแต่กลับมาเปิดในปี 2014 การใช้บริการแคดดี้เป็นข้อบังคับ และความรู้ของแคดดี้ท้องถิ่นเรื่องจุดตกลูกที่ถูกต้องช่วยลดสกอร์ได้หลายช็อตสำหรับผู้ที่มาเยือนครั้งแรก`,
        tips: `ค่ากรีนฟีแบบเหมารวม (ประมาณ 4,000-4,200 บาท รวมแคดดี้และรถกอล์ฟ) เป็นอัตรามาตรฐาน ควรยืนยันราคาตอนจองเพราะอัตราแปรผันตามฤดูกาล ทิปแคดดี้ที่ 400 บาทเป็นสิ่งที่คาดหวังกัน และชำระเป็นเงินสดให้แคดดี้หลังจบรอบ ควรเล่นช็อตเข้ากรีนอย่างระมัดระวัง เพราะขอบน้ำเปิดทางให้แก้เกมได้จำกัดและโอกาสเสียดับเบิลโบกี้อยู่ใกล้แค่เอื้อมในหลายหลุม จึงควรพกลูกกอล์ฟสำรองติดตัวไว้อีกหนึ่งชุด สนามอยู่ห่างจากสนามบิน CNX ประมาณ 30 นาที จึงเหมาะกับการจัดเป็นรอบแรกหรือรอบสุดท้ายของทริปกอล์ฟเชียงใหม่`,
        location_and_access: `Gassan Legacy Golf Club ตั้งอยู่ในอำเภอบ้านธิ จังหวัดลำพูน ห่างจากท่าอากาศยานนานาชาติเชียงใหม่ (CNX) ลงมาทางใต้ประมาณ 30 นาทีโดยรถยนต์ ผู้ที่เดินทางจากกรุงเทพฯ ใช้วิธีบินไป CNX (ประมาณ 1 ชั่วโมง 10 นาทีจากสนามบินสุวรรณภูมิหรือสนามบินดอนเมือง) เพราะการขับรถระยะทาง 700 กิโลเมตรจากกรุงเทพฯ ไม่สะดวกในทางปฏิบัติ สามารถเดินทางไปยังสนามได้ด้วย Grab หรือรถส่วนตัวจากตัวเมืองเชียงใหม่หรือจากสนามบิน และทาง Gassan Group ยังจัดรถรับส่งให้ได้เมื่อแจ้งล่วงหน้า`,
        rental_cta_context: `วางแผนออกรอบที่ Gassan Legacy Golf Club ในทริปเชียงใหม่ของคุณอยู่ใช่ไหม เช่าชุดไม้กอล์ฟคุณภาพพรีเมียมจาก LENGOLF ที่กรุงเทพฯ พร้อมบริการส่งถึงโรงแรมก่อนคุณขึ้นเครื่อง เพื่อให้คุณโฟกัสกับอุปสรรคน้ำอันเลื่องชื่อของสนามได้เต็มที่ โดยไม่ต้องกังวลเรื่องค่าธรรมเนียมสัมภาระ`,
      },
    },
    ja: {
      title: `Gassan Legacy Golf Club（ランプーン県）— パッケージ料金・全ホールに水があるコース紹介・クラブレンタル`,
      meta_description: `オールインクルーシブのグリーンフィーは約4,000〜4,200THB。Gassan Legacy Golf Club（旧Gassan Lake City）はランプーン県バンティにある18ホール・6,852ヤードのコースで、Schmidt-Curleyの改修により全ホールに水が絡みます。バンコクのホテルへ届くLENGOLFのクラブレンタルもご案内します。`,
      prose: {
        overview: `Gassan Lake City Golf Club（現在はGassan Legacy Golf Clubとして運営）は、ランプーン県バンティにある18ホールのチャンピオンシップコースで、チェンマイ国際空港から南へおよそ30分の距離です。開場は2005年ですが、2013年にいったん閉鎖してアメリカの設計事務所Schmidt-Curleyによる全面改修を行い、2014年にLegacyの名で再オープンしました。この改修によって、古びていたレイアウトはタイ北部で最も水の比重が大きいコースのひとつへと生まれ変わり、ウォーターハザードが全ホールに顔を出します。この設計上の特徴が、ラウンドを通じて正確なアイアンショットと慎重なコースマネジメントを要求します。コースはランプーンとチェンマイ一帯で3コースを運営するGassan Golf Groupの一員です。6,852ヤード・パー72のGassan Legacyは要求水準の高いプレーを求め、Gassan KhuntanやPanoramaの森深い山の舞台とは対照的な、手入れの行き届いた歯ごたえのあるレイアウトを求める地元メンバーと来訪ゴルファーの双方を集めています。`,
        layout_and_experience: `Schmidt-Curleyによる改修は、コース中盤の軸となる中央の湖群を中心に設計されました。ルーティングは水を戦略的に用います。序盤のホールは樹木に縁取られたフェアウェイでパークランドらしいリズムをつくり、そこからレイアウトは徐々に水を中心的な脅威として持ち込み、アプローチがほぼすべてのホールで湖の縁を越えるか縫うかしなければならない中盤の連続へと高まっていきます。

パー72のレイアウトには、長さの異なる5つのパー3と、水際に挑む気のあるプレーヤーにリスクとリターンの選択肢を与える5つのパー5が含まれます。フェアウェイはタイ北部の基準では広めですが、アプローチの通路の両側に水があり、しかもグリーンが硬く速いため、正確なショットには報いがあり、ミスヒットの代償は大きくなります。

グリーンには熱帯の生育期を通じた速さと丈夫さを狙ってティフドワーフ・バミューダ芝が採用されました。2014年の再オープン以降、コースコンディションは一貫して高く評価されています。キャディーの利用は必須で、正しい落としどころに関する地元キャディーの知識は、初めて訪れる方なら何打も節約してくれるはずです。`,
        tips: `オールインクルーシブのグリーンフィー（キャディーとカートを含めておよそ4,000〜4,200THB）が標準料金です。季節によって料金が変わるため、予約時に金額をご確認ください。キャディーへのチップは400THBが想定されており、ラウンド後にキャディーへ現金で手渡します。アプローチは無理をせず組み立てましょう。水際はリカバリーの選択肢が限られ、多くのホールでダブルボギーがすぐそこにあります。予備のボールを1スリーブ余分に持っておくと安心です。コースはCNX空港からおよそ30分の距離にあり、チェンマイのゴルフ旅行では最初または最後のラウンドとして組みやすい立地と言えるでしょう。`,
        location_and_access: `Gassan Legacy Golf Clubはランプーン県バンティにあり、チェンマイ国際空港（CNX）から南へ車でおよそ30分です。バンコクからの来訪者はCNXへ空路で向かい（スワンナプームまたはドンムアンから約1時間10分）、バンコクから700kmを車で走るのは現実的ではありません。チェンマイ市街からも空港からも、Grabか自家用車でアクセスできます。事前に依頼すればGassan Groupに送迎を手配してもらうことも可能です。`,
        rental_cta_context: `チェンマイ旅行でGassan Legacy Golf Clubをプレーする予定の方へ。LENGOLFなら質の高いクラブセットをバンコクでレンタルでき、フライト前にホテルまでお届けします。手荷物料金を気にせず、名物のウォーターハザード攻略に集中できます。`,
      },
    },
    ko: {
      title: `Gassan Legacy Golf Club 올인클루시브 패키지 — 람푼주 워터 해저드 18홀 가이드`,
      meta_description: `Gassan Legacy Golf Club 올인클루시브 요금은 캐디와 카트를 포함해 약 4,000~4,200바트예요. Schmidt-Curley가 전면 리노베이션해 모든 홀에 물이 얽히는 람푼주 반티의 18홀 6,852야드 코스와, 방콕 호텔로 배달되는 LENGOLF 클럽 대여를 안내해요.`,
      prose: {
        overview: `Gassan Legacy Golf Club 코스는 람푼주 반티에 자리한 18홀 챔피언십 코스로, 치앙마이 국제공항에서 남쪽으로 약 30분 거리에 있어요. Gassan Lake City Golf Club 시절이던 2005년에 처음 문을 열었고, 2013년에는 미국 설계 회사 Schmidt-Curley의 전면 리노베이션을 위해 문을 닫았다가 2014년에 Legacy 이름을 달고 다시 열었습니다. 이 리노베이션은 낡았던 레이아웃을 태국 북부에서 물의 비중이 가장 큰 코스 가운데 하나로 바꿔 놓았고, 워터 해저드가 모든 홀에 얼굴을 내밀어요. 이런 설계상의 특징 때문에 라운딩 내내 정확한 아이언 샷과 신중한 코스 매니지먼트가 필요합니다. 이 코스는 람푼과 치앙마이 일대에서 세 개의 코스를 운영하는 Gassan Golf Group 소속이에요. 6,852야드 파 72의 Gassan Legacy 코스는 요구 수준이 높은 플레이를 부르며, Gassan Khuntan, Panorama 코스의 숲 깊은 산악 무대와 대비되는 잘 관리된 도전적 레이아웃을 찾는 현지 회원과 방문 골퍼 모두를 끌어들이고 있습니다.`,
        layout_and_experience: `Schmidt-Curley 설계 사무소의 리노베이션은 코스 중반의 축이 되는 중앙 호수 지대를 중심으로 설계됐어요. 루팅은 물을 전략적으로 씁니다. 나무가 늘어선 페어웨이로 파크랜드다운 리듬을 만드는 초반 홀들을 지나면, 레이아웃은 점차 물을 중심적인 위협으로 끌어들이고, 어프로치가 거의 모든 홀에서 호숫가를 넘거나 스치듯 지나가야 하는 중반 구간에서 정점에 이릅니다.

파 72 레이아웃에는 길이가 제각각인 파 3 홀 다섯 개와, 물가에 도전할 마음이 있는 플레이어에게 리스크와 리턴의 선택지를 주는 파 5 홀 다섯 개가 들어 있어요. 페어웨이는 태국 북부의 다른 코스들과 견주면 넉넉한 편이지만, 어프로치 통로 양옆의 물과 단단하고 빠른 그린이 겹치면서 정확한 타구에는 보답이, 미스 샷에는 큰 대가가 따릅니다.

그린은 열대의 생육기 내내 빠르기와 강인함을 유지하도록 Tiff Dwarf 버뮤다그래스로 조성됐어요. 2014년 재개장 이후 코스 컨디션은 한결같이 좋은 평가를 받고 있습니다. 캐디 서비스는 필수이며, 올바른 낙하 지점에 관한 현지 캐디의 지식은 처음 찾는 분이라면 몇 타는 아껴 줄 거예요.`,
        tips: `올인클루시브 요금(캐디와 카트를 포함해 약 4,000~4,200바트)이 표준이에요. 시즌에 따라 요금이 달라지니 예약할 때 금액을 확인하세요. 캐디 팁으로는 400바트를 준비하는 것이 일반적이며, 라운드가 끝난 뒤 캐디에게 현금으로 건넵니다. 어프로치는 무리하지 말고 안전하게 풀어 가세요. 물가에서는 리커버리 선택지가 제한적이고, 많은 홀에서 더블 보기가 바로 곁에 있어요. 여분의 볼도 한 슬리브 더 챙기면 든든합니다. 코스가 CNX 공항에서 약 30분 거리라, 치앙마이 골프 여행의 첫 라운딩이나 마지막 라운딩으로 넣기 좋은 자리예요.`,
        location_and_access: `Gassan Legacy Golf Club 코스는 람푼주 반티에 있고, 치앙마이 국제공항(CNX)에서 남쪽으로 차로 약 30분 거리예요. 방콕에서 오는 방문객은 CNX까지 비행기로 이동하며(수완나품이나 돈므앙에서 약 1시간 10분), 방콕에서 700km를 운전하는 것은 현실적이지 않아요. 치앙마이 시내에서도 공항에서도 Grab이나 자가용으로 갈 수 있고, 미리 요청하면 Gassan Group에서 이동 편을 준비해 줍니다.`,
        rental_cta_context: `치앙마이 여행에서 Gassan Legacy Golf Club 코스를 플레이할 계획인가요? LENGOLF는 방콕에서 품질 좋은 클럽 세트를 대여해 출발 전 호텔로 보내 드려요. 수하물 요금을 신경 쓰지 않고 이 코스의 이름난 워터 해저드 공략에만 집중할 수 있습니다.`,
      },
    },
    zh: {
      title: `Gassan Legacy Golf Club（南奔府）— 全包套餐、洞洞有水的18洞与球杆租借`,
      meta_description: `Gassan Legacy Golf Club全包价约4,000–4,200泰铢，已含球童与球车。这座前身为Gassan Lake City的18洞球场位于南奔府Ban Thi，全长6,852码，经Schmidt-Curley改造后洞洞有水，另附送到曼谷酒店的LENGOLF球杆租借。`,
      prose: {
        overview: `Gassan Lake City Golf Club——如今以Gassan Legacy Golf Club之名运营——是一座位于南奔府Ban Thi的18洞锦标赛球场，距清迈国际机场以南约30分钟。球场最初于2005年开放，2013年为了美国设计公司Schmidt-Curley的全面改造而关闭，2014年以Legacy之名重新开业。这次改造把一套过时的布局，变成泰国北部用水最密集的球场之一：每一个洞都有水障碍。这样的设计特征，要求整轮球都保持精准的铁杆表现和谨慎的战术管理。球场隶属Gassan Golf Group，该集团在南奔与清迈一带经营三座球场。以6,852码、标准杆72的规格，Gassan Legacy打起来要求不低，既吸引本地会员，也吸引那些想找一套维护到位又有难度、与Gassan Khuntan和Panorama森林山地气质形成反差的布局的来访球手。`,
        layout_and_experience: `Schmidt-Curley的改造围绕一片作为球场中段支点的中央湖区展开。路线对水的运用很有战术意识：开局几个洞以两侧林木夹道的球道确立园林式的节奏，随后布局逐步把水推成核心威胁，最终在中段形成一串连续的球洞——那里几乎每一个洞的攻果岭球都必须越过湖岸或贴着湖边穿过。

这套标准杆72的布局包含五个长度各异的3杆洞，以及五个为敢于挑战水边的球手提供风险与回报选择的5杆洞。以泰国北部的标准看球道算宽绰，但攻果岭通道两侧都有水，加上紧实而快速的果岭，精准的击球会得到回报，失误的代价则相当高。

果岭铺设Tiff Dwarf百慕大草，以求在热带生长季里维持速度与韧性。自2014年重新开放以来，球场状况一直广受好评。球童服务为强制项目，而当地球童对正确落点的了解，能为第一次来的球手省下好几杆。`,
        tips: `全包果岭费（含球童与球车，约4,000–4,200泰铢）是标准价格；由于价格随季节浮动，预订时请确认金额。球童小费一般预期为400泰铢，打完后以现金交给球童。攻果岭球打得保守一些：水边可挽救的余地有限，很多洞的双柏忌就在一步之遥。记得多带一筒备用球。球场距CNX机场约30分钟，很适合安排成清迈高尔夫行程的第一场或最后一场球。`,
        location_and_access: `Gassan Legacy Golf Club位于南奔府Ban Thi，距清迈国际机场（CNX）以南约30分钟车程。从曼谷前来的访客飞往CNX，自素万那普机场或廊曼机场出发约1小时10分钟——从曼谷开车700公里并不实际。从清迈市区或机场都可以叫Grab或自驾前往，Gassan Group也可以应要求安排接送。`,
        rental_cta_context: `清迈行程里打算到Gassan Legacy Golf Club打一场吗？LENGOLF在曼谷提供品质可靠的租借球杆套组，登机前送到你的酒店，让你不必操心行李费用，专心对付这座球场著名的水障碍。`,
      },
    },
  },
  status: 'published',
  published_at: '2026-04-21',
}
