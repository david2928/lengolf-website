import { Page, expect, test } from '@playwright/test'

export const MOBILE_VIEWPORTS = [
  { name: '320x568',  width: 320,  height: 568  }, // small edge case
  { name: '360x800',  width: 360,  height: 800  }, // global Android baseline
  { name: '375x812',  width: 375,  height: 812  }, // iPhone baseline
  { name: '390x844',  width: 390,  height: 844  }, // modern iPhone
  { name: '412x915',  width: 412,  height: 915  }, // large Android
] as const

export type Viewport = (typeof MOBILE_VIEWPORTS)[number]

/**
 * Runs a suite of mobile layout checks for a given page URL across all
 * defined viewport sizes. Each check is registered as its own named test.
 *
 * Usage:
 *   mobileViewportSweep('/rent-golf-clubs-bangkok', { ctaSelector: 'text=Reserve Golf Clubs' })
 */
export function mobileViewportSweep(
  path: string,
  options: {
    ctaSelector: string
    /** Additional key selectors to check for overlap. Defaults to empty. */
    keySelectors?: string[]
    /** Skip form checks when the page has no form inputs. Default false. */
    skipFormChecks?: boolean
  }
) {
  for (const vp of MOBILE_VIEWPORTS) {
    const label = `${path} - ${vp.name}`

    test.describe(label, () => {
      let page: Page

      test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          isMobile: true,
          hasTouch: true,
        })
        page = await context.newPage()
        await page.goto(path)
        await page.waitForLoadState('domcontentloaded')
      })

      test.afterEach(async () => {
        await page.close()
      })

      test(`${label} - no horizontal scroll`, async () => {
        const hasOverflow = await page.evaluate(() =>
          document.body.scrollWidth > window.innerWidth
        )
        expect(hasOverflow, 'Page should not have horizontal overflow').toBe(false)
      })

      test(`${label} - CTA visible above fold`, async () => {
        const cta = page.locator(options.ctaSelector).first()
        await expect(cta).toBeVisible()
        const box = await cta.boundingBox()
        expect(box, 'CTA bounding box should exist').not.toBeNull()
        // CTA top edge must be within the first viewport height
        expect(box!.y).toBeLessThan(vp.height)
      })

      test(`${label} - no text smaller than 12px`, async () => {
        const tooSmall = await page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('p, span, li, a, button, h1, h2, h3, h4, label'))
          return elements
            .filter((el) => {
              const style = window.getComputedStyle(el)
              const size = parseFloat(style.fontSize)
              const text = el.textContent?.trim() ?? ''
              // Only flag elements that actually have visible text
              return text.length > 0 && size < 12
            })
            .map((el) => ({
              tag: el.tagName,
              text: el.textContent?.trim().slice(0, 40),
              fontSize: window.getComputedStyle(el).fontSize,
            }))
        })
        expect(tooSmall, `Elements with font < 12px: ${JSON.stringify(tooSmall)}`).toHaveLength(0)
      })

      test(`${label} - no overlapping key elements`, async () => {
        const selectors = [options.ctaSelector, ...(options.keySelectors ?? [])]
        const boxes: Array<{ selector: string; box: { x: number; y: number; width: number; height: number } }> = []

        for (const sel of selectors) {
          const el = page.locator(sel).first()
          if (await el.isVisible()) {
            const box = await el.boundingBox()
            if (box) boxes.push({ selector: sel, box })
          }
        }

        // Check each pair for overlap
        for (let i = 0; i < boxes.length; i++) {
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i].box
            const b = boxes[j].box
            const overlaps =
              a.x < b.x + b.width &&
              a.x + a.width > b.x &&
              a.y < b.y + b.height &&
              a.y + a.height > b.y
            expect(
              overlaps,
              `"${boxes[i].selector}" overlaps with "${boxes[j].selector}"`
            ).toBe(false)
          }
        }
      })

      if (!options.skipFormChecks) {
        test(`${label} - form inputs visible and not zoom-triggering`, async () => {
          const inputs = page.locator('input:not([type=hidden]), textarea, select')
          const count = await inputs.count()

          for (let i = 0; i < count; i++) {
            const input = inputs.nth(i)
            if (!(await input.isVisible())) continue

            await expect(input).toBeVisible()

            // Check font-size >= 16px to prevent iOS Safari zoom on focus
            const fontSize = await input.evaluate((el) =>
              parseFloat(window.getComputedStyle(el).fontSize)
            )
            expect(
              fontSize,
              `Input font-size should be ≥16px to prevent iOS zoom (got ${fontSize}px)`
            ).toBeGreaterThanOrEqual(16)
          }
        })

        test(`${label} - submit button visible and clickable`, async () => {
          const submit = page.locator('button[type=submit], input[type=submit]').first()
          const count = await page.locator('button[type=submit], input[type=submit]').count()
          if (count === 0) return // no form on this page

          await expect(submit).toBeVisible()
          await expect(submit).toBeEnabled()
          const box = await submit.boundingBox()
          expect(box!.height).toBeGreaterThanOrEqual(44) // minimum tap target
        })
      }

      test(`${label} - screenshot`, async () => {
        await page.screenshot({
          path: `playwright-report/screenshots/${path.replace(/\//g, '_')}-${vp.name}.png`,
          fullPage: false, // viewport only — shows above-fold
        })
      })
    })
  }
}
