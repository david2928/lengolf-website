/**
 * Per-locale translations for golf-course REGION HUB pages
 * (app/[locale]/golf-courses/[region]/page.tsx).
 *
 * This is a PLAIN data module — deliberately NOT `import 'server-only'` — so the
 * smoke test can import it to cross-check the translated-routes registry (see
 * scripts/smoke-test.ts, region-hub consistency check). For the same reason
 * `Region` is imported as a TYPE ONLY: a runtime import of lib/golf-courses
 * would trip that file's `import 'server-only'` guard and break the smoke test.
 *
 * `label` is intentionally translated (not passed through from REGION_META): the
 * localized place name is the SEO crux for these hubs — target queries are
 * 曼谷高尔夫球场 / バンコク ゴルフ場 / 방콕 골프장.
 *
 * Only regions with a published translation appear here. Adding a (region,
 * locale) below REQUIRES adding the matching '/golf-courses/<region>' entry to
 * that locale's staticRoutes in lib/translated-routes.ts — the smoke-test
 * region-hub consistency check fails CI in both directions if they drift.
 */
import type { Region } from '@/lib/golf-courses'

export interface RegionHubTranslation {
  /** Localized place name — translated (SEO crux), NOT the EN REGION_META label. */
  label: string
  /** Localized province / sub-region line (translated from REGION_META.province). */
  province: string
  /** Localized hero intro paragraph (translated from REGION_META.description). */
  description: string
}

type HubLocale = 'ja' | 'ko' | 'zh'

export const REGION_HUB_I18N: Partial<
  Record<Region, Partial<Record<HubLocale, RegionHubTranslation>>>
> = {
  bangkok: {
    ja: {
      label: 'バンコク',
      province: 'バンコクと周辺県',
      description:
        'バンコクとその周辺県には、タイでも有数の名門ゴルフコースが揃っています。パトゥムタニのチャンピオンシップ級のレイアウトから、市内中心部から90分以内で行けるリゾートコースまで、幅広く楽しめます。',
    },
    ko: {
      label: '방콕',
      province: '방콕 및 주변 지역',
      description:
        '방콕과 주변 지역에는 태국 최고 수준의 골프 코스가 자리하고 있습니다. 빠툼타니의 챔피언십급 코스부터 시내 중심에서 90분 이내에 닿는 리조트 코스까지 다양하게 즐길 수 있습니다.',
    },
    zh: {
      label: '曼谷',
      province: '曼谷及周边府',
      description:
        '曼谷及其周边府拥有泰国一些最优质的高尔夫球场——从巴吞他尼的锦标赛级球场，到距离市中心90分钟车程以内的度假村球场，选择丰富。',
    },
  },
  phuket: {
    ja: {
      label: 'プーケット',
      province: 'プーケット',
      description:
        'プーケットのゴルフは、かつての錫鉱山跡地を生かしたドラマチックな地形、名だたるトーナメント開催コース、そして島の名高い海岸線沿いに広がるリゾートコースが特徴です。名門レッドマウンテンから、ジョニーウォーカー・クラシックの舞台となったブルーキャニオンのフェアウェイまで揃っています。',
    },
    ko: {
      label: '푸켓',
      province: '푸켓',
      description:
        '푸켓의 골프는 과거 주석 광산 부지를 활용한 극적인 지형, 상징적인 토너먼트 개최 코스, 그리고 섬의 이름난 해안선을 따라 자리한 리조트 코스로 유명합니다. 명성 높은 레드 마운틴부터 조니워커 클래식이 열린 블루 캐니언의 페어웨이까지 만나볼 수 있습니다.',
    },
    zh: {
      label: '普吉',
      province: '普吉',
      description:
        '普吉的高尔夫以昔日锡矿改造而成的壮观地貌、举世闻名的赛事球场，以及沿着岛上著名海岸线铺展的度假村球场著称——从备受赞誉的红山球场，到举办过尊尼获加精英赛的蓝色峡谷球道，应有尽有。',
    },
  },
  pattaya: {
    ja: {
      label: 'パタヤ',
      province: 'チョンブリー県・東部沿岸地域',
      description:
        'パタヤとタイ東部沿岸エリアには、国内でも指折りの素晴らしいゴルフコースが揃っています。アジアンツアーの大会を開催してきたチャンピオンシップコースをはじめ、海を望むシーサイドコースや、緑豊かな丘陵地に佇む会員制のプライベートクラブまで楽しめます。',
    },
    ko: {
      label: '파타야',
      province: '촌부리 및 동부 해안 지역',
      description:
        '파타야와 태국 동부 해안 지역에는 태국에서도 손꼽히는 멋진 골프 코스가 자리하고 있습니다. 아시안 투어 대회를 개최해 온 챔피언십 코스부터 바다가 보이는 해안 코스, 열대 구릉지에 자리한 회원제 프라이빗 클럽까지 다양하게 즐길 수 있습니다.',
    },
    zh: {
      label: '芭提雅',
      province: '春武里府及东部沿海',
      description:
        '芭提雅与泰国东部沿海地区坐拥全国一些最壮观的高尔夫球场——既有举办过亚巡赛的锦标赛球场，也有可眺望海景的海岸球场，还有隐于热带丘陵间的会员制私人俱乐部。',
    },
  },
  'hua-hin': {
    ja: {
      label: 'ホアヒン',
      province: 'プラチュアップキリカン県・ペッチャブリー県',
      description:
        'ホアヒンとチャアムには、タイでも名高いゴルフコースが集まっています。ゴルフダイジェストのトップ100に選ばれたブラックマウンテンから、世界ランキングにも名を連ねるパイナップルバレーまで、いずれも山並みとタイ湾を望むロケーションに広がっています。',
    },
    ko: {
      label: '후아힌',
      province: '쁘라추압키리칸 및 펫차부리',
      description:
        '후아힌과 차암에는 태국에서도 이름난 골프 코스가 모여 있습니다. 골프 다이제스트 100대 코스에 선정된 블랙 마운틴부터 세계 랭킹에 오른 파인애플 밸리까지, 모두 산맥과 태국만을 배경으로 펼쳐집니다.',
    },
    zh: {
      label: '华欣',
      province: '巴蜀府及佛丕府',
      description:
        '华欣与差安坐拥泰国一些最负盛名的高尔夫球场——从入选《高尔夫文摘》百佳榜的黑山球场，到跻身世界排名的菠萝谷球场，皆坐落于群山与泰国湾的环抱之中。',
    },
  },
  'chiang-mai': {
    ja: {
      label: 'チェンマイ',
      province: 'チェンマイ県',
      description:
        'チェンマイには、タイ北部でも最もバラエティに富んだゴルフコースが揃っています。ガッサングループの個性豊かな3つのチャンピオンシップコースをはじめ、ピーター・トムソン設計のロイヤルチェンマイ、市街地にある27ホールのランナ、そしてドイ・インタノン国立公園に近くコストパフォーマンスに優れたチェンマイ・インタノンまで多彩です。いずれもバンコクから飛行機で短時間でアクセスできます。',
    },
    ko: {
      label: '치앙마이',
      province: '치앙마이',
      description:
        '치앙마이에는 태국 북부에서 가장 다채로운 골프 코스가 자리하고 있습니다. 가산 그룹의 개성 있는 3개 챔피언십 코스를 비롯해 피터 톰슨이 설계한 로열 치앙마이, 도심에 위치한 27홀 란나 코스, 그리고 도이 인타논 국립공원 인근의 가성비 좋은 치앙마이 인타논 리조트까지 만나볼 수 있습니다. 모든 코스가 방콕에서 비행기로 금방 닿는 거리에 있습니다.',
    },
    zh: {
      label: '清迈',
      province: '清迈府',
      description:
        '清迈拥有泰国北部最为丰富多样的高尔夫球场——从卡桑集团旗下三座风格迥异的锦标赛球场，到彼得·汤姆森设计的皇家清迈球场、位于市区的27洞兰纳球场，以及邻近因他侬国家公园、高性价比的清迈因他侬度假村。所有球场距曼谷仅有短途航程。',
    },
  },
}

/**
 * Localized hub strings for a (region, locale), or null when no published
 * translation exists (caller falls back to the EN REGION_META values).
 */
export function getRegionHubTranslation(
  region: string,
  locale: string
): RegionHubTranslation | null {
  const byRegion = REGION_HUB_I18N[region as Region]
  if (!byRegion) return null
  return byRegion[locale as HubLocale] ?? null
}

/**
 * Every (locale, region) pair that has a published translation. Used by the
 * page's generateStaticParams (so only translated combos build) AND by the
 * smoke-test region-hub consistency check.
 */
export function getTranslatedRegionHubParams(): { locale: string; region: string }[] {
  const params: { locale: string; region: string }[] = []
  for (const region of Object.keys(REGION_HUB_I18N) as Region[]) {
    const byLocale = REGION_HUB_I18N[region]
    if (!byLocale) continue
    for (const locale of Object.keys(byLocale) as HubLocale[]) {
      params.push({ locale, region })
    }
  }
  return params
}
