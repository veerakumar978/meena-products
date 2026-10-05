/* ==========================================================================
   MEENA FOODS — SECTION 02: THE MEENA TABLE COMPONENT
   "Everyday Moments"
   Three Large Editorial Moments: Morning, Tea Time, Evening
   ========================================================================== */

export class MeenaTable {
  constructor(mountSelector = '#moments') {
    this.mount = typeof mountSelector === 'string'
      ? document.querySelector(mountSelector)
      : mountSelector;

    if (!this.mount) {
      console.warn(`[MeenaTable] Mount element not found: ${mountSelector}`);
      return;
    }

    this.render();
    this.cacheElements();
    this.initObserver();
  }

  render() {
    this.mount.innerHTML = `
      <div class="table-container">
        <!-- Section Header -->
        <header class="table-section-intro">
          <div class="table-label-row">
            <span class="table-label-number">02 / EVERYDAY MOMENTS</span>
            <span class="table-label-rule" aria-hidden="true"></span>
            <span class="table-label-tag">THE MEENA TABLE</span>
          </div>
          <h2 class="table-main-title">THE MEENA TABLE</h2>
          <p class="table-subtitle">“Some foods become part of the rhythm of a day.”</p>
        </header>

        <!-- Three Large Editorial Moments (Left → Right → Left Rhythm) -->
        <div class="table-moments-track">
          <!-- MOMENT 01: MORNING (Text Left, Image Right) -->
          <article class="editorial-moment" id="moment-01" aria-label="Moment 01: Morning Family Bread">
            <div class="moment-text-block">
              <span class="moment-number-watermark" aria-hidden="true">01</span>
              <div class="moment-eyebrow">
                <span>01 / MORNING</span>
              </div>
              <h3 class="moment-heading">
                START<br>
                WITH<br>
                SOMETHING<br>
                FAMILIAR.
              </h3>
              <div class="moment-descriptor">
                <span class="descriptor-name">Family Bread</span>
                <p class="descriptor-text">
                  Golden crust, tender crumb, ready for the first toast of dawn.
                </p>
              </div>
            </div>

            <div class="moment-visual-block">
              <figure class="moment-image-stage">
                <img 
                  src="products/famali bread.webp" 
                  alt="Meena Foods Family Bread — Freshly Baked Morning Loaf" 
                  class="moment-image"
                  width="300"
                  height="320"
                  loading="lazy"
                />
              </figure>
              <div class="moment-image-meta">
                <span>EVERYDAY ESSENTIALS</span>
                <span class="meta-accent-dot" aria-hidden="true"></span>
                <span>FRESH DAILY</span>
              </div>
            </div>
          </article>

          <!-- MOMENT 02: TEA TIME (Reversed: Image Left, Text Right) -->
          <article class="editorial-moment moment-reversed" id="moment-02" aria-label="Moment 02: Tea Time Milk Rusk">
            <div class="moment-visual-block">
              <figure class="moment-image-stage">
                <img 
                  src="products/milk rusk.webp" 
                  alt="Meena Foods Milk Rusk — Twice-Baked Traditional Rusk" 
                  class="moment-image"
                  width="300"
                  height="320"
                  loading="lazy"
                />
              </figure>
              <div class="moment-image-meta">
                <span>TRADITIONAL RUSK</span>
                <span class="meta-accent-dot" aria-hidden="true"></span>
                <span>CRISPED TWICE</span>
              </div>
            </div>

            <div class="moment-text-block">
              <span class="moment-number-watermark" aria-hidden="true">02</span>
              <div class="moment-eyebrow">
                <span>02 / TEA TIME</span>
              </div>
              <h3 class="moment-heading">
                A SMALL PAUSE.<br>
                A FAMILIAR BITE.
              </h3>
              <div class="moment-descriptor">
                <span class="descriptor-name">Milk Rusk</span>
                <p class="descriptor-text">
                  Crisped twice for that unmistakable crunch dipped into warm evening chai.
                </p>
              </div>
            </div>
          </article>

          <!-- MOMENT 03: EVENING (Return: Text Left, Image Right) -->
          <article class="editorial-moment" id="moment-03" aria-label="Moment 03: Evening Tea Bun">
            <div class="moment-text-block">
              <span class="moment-number-watermark" aria-hidden="true">03</span>
              <div class="moment-eyebrow">
                <span>03 / EVENING</span>
              </div>
              <h3 class="moment-heading">
                WHEN THE DAY<br>
                SLOWS DOWN.
              </h3>
              <div class="moment-descriptor">
                <span class="descriptor-name">Tea Bun</span>
                <p class="descriptor-text">
                  Softly baked sweetness to gather around as daylight softens into night.
                </p>
              </div>
            </div>

            <div class="moment-visual-block">
              <figure class="moment-image-stage">
                <img 
                  src="products/tea bun.webp" 
                  alt="Meena Foods Tea Bun — Softly Baked Everyday Sweetness" 
                  class="moment-image"
                  width="300"
                  height="320"
                  loading="lazy"
                />
              </figure>
              <div class="moment-image-meta">
                <span>SWEET BUNS</span>
                <span class="meta-accent-dot" aria-hidden="true"></span>
                <span>SOFT BAKE</span>
              </div>
            </div>
          </article>
        </div>

        <!-- Closing Editorial Bridge toward Section 03 -->
        <footer class="table-closing-bridge">
          <p class="closing-quote-text">
            “From the first slice to the last cup of tea,<br>
            some moments simply belong at the table.”
          </p>
          <a href="#collection" class="collection-bridge-link" id="bridge-to-collection">
            <span>THE COLLECTION</span>
            <span class="bridge-arrow" aria-hidden="true">→</span>
          </a>
        </footer>
      </div>
    `;
  }

  cacheElements() {
    this.moments = this.mount.querySelectorAll('.editorial-moment');
  }

  initObserver() {
    if (!this.moments || this.moments.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    this.moments.forEach(m => observer.observe(m));
  }
}
