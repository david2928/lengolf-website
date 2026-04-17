# Course Data Schema

All fields used in the course guide pipeline. Every course JSON file follows this schema.

---

## Required fields (course will not publish without these)

| Field | Type | Description |
|---|---|---|
| `name` | string | Full official course name |
| `slug` | string | URL-safe slug, e.g. `nikanti-golf-club` |
| `region` | string | Region key — must match a region in `regions.md` |
| `province` | string | Thai province name in English |
| `holes` | number | Number of holes (typically 18, sometimes 9 or 27) |
| `par` | number | Course par |
| `latitude` | number | Decimal degrees |
| `longitude` | number | Decimal degrees |
| `green_fee_weekday_thb` | number | Weekday green fee in Thai Baht |
| `green_fee_weekend_thb` | number | Weekend green fee in Thai Baht |
| `caddie_required` | boolean | Whether a caddie is mandatory |
| `cart_required` | boolean | Whether a cart is mandatory |
| `google_maps_url` | string | Full Google Maps URL for this course (used in sameAs schema) |
| `website` | string | Official course website URL |

---

## Optional fields (enrich if findable, null if not)

| Field | Type | Description |
|---|---|---|
| `designer` | string | Course architect name |
| `year_opened` | number | Year the course opened |
| `caddie_fee_thb` | number | Standard caddie fee in Thai Baht |
| `cart_fee_thb` | number | Cart rental fee in Thai Baht |
| `driving_range` | boolean | Whether a driving range is available |
| `phone` | string | International format, e.g. `+66 2 482 5353` |
| `distance_from_bangkok_km` | number | Driving distance from central Bangkok |
| `drive_time_from_bangkok_min` | number | Typical drive time in minutes (off-peak) |

---

## Prose fields (Stage 2 — written by Claude)

| Field | Word target | Description |
|---|---|---|
| `overview` | 150-200 | Reputation, experience, what makes it distinctive |
| `layout_and_experience` | 250-350 | Terrain, difficulty, notable holes, course style |
| `tips` | 150-200 | Best tee times, pace of play, weather, what to bring |
| `location_and_access` | 100-150 | Distance from Bangkok, transport options |
| `rental_cta_context` | 1-2 sentences | Course-specific intro for the rental CTA block |

---

## Locale fields (Phase 2 — multilingual)

| Field | Type | Description |
|---|---|---|
| `locales.en.title` | string | Page title in English |
| `locales.en.meta_description` | string | Meta description in English (140-160 chars) |
| `locales.ko` | object\|null | Korean locale — null until translated |
| `locales.zh` | object\|null | Simplified Chinese locale — null until translated |
| `locales.ja` | object\|null | Japanese locale — null until translated |

---

## Source tracking (Stage 1)

Every field value in the raw JSON is wrapped with source metadata:

```json
{
  "green_fee_weekday_thb": {
    "value": 2800,
    "source": "web-search",
    "url": "https://..."
  }
}
```

Valid `source` values:
- `official-website` — from the course's own site
- `web-search` — from a third-party source via web search
- `knowledge-override` — from `knowledge/course-overrides.md` (takes priority)
- `model` — from Claude's training knowledge (flagged for verification in Stage 3)

Fields sourced as `model` are always re-verified in Stage 3 via web search.
