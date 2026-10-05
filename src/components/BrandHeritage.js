/* ==========================================================================
   MEENA FOODS — SECTION 01: BRAND HERITAGE COMPONENT
   "A Taste That Began in 1942"
   Continuity Timeline, Staggered Reveal, Museum Captioning
   ========================================================================== */

export class BrandHeritage {
  constructor(mountSelector = '#brand') {
    this.mount = typeof mountSelector === 'string'
      ? document.querySelector(mountSelector)
      : mountSelector;

    if (!this.mount) {
      console.warn(`[BrandHeritage] Mount element not found: ${mountSelector}`);
      return;
    }

    this.render();
    this.cacheElements();
    this.initObserver();
    this.initScrollTimeline();
  }

  render() {
    this.mount.innerHTML = `
      <div class="brand-container">
        <!-- Top Editorial Section Label -->
        <div class="brand-section-header">
          <span class="brand-label-number">01 / THE BRAND</span>
          <span class="brand-label-rule" aria-hidden="true"></span>
          <span class="brand-label-since">SINCE 1942</span>
        </div>

        <!-- Main Asymmetric Grid -->
        <div class="brand-editorial-grid" id="brand-grid">
          <!-- LEFT SIDE: Editorial Typography & Verified Narrative -->
          <div class="brand-story-column">
            <!-- Giant Subtle 1942 Watermark -->
            <div class="brand-watermark-1942" id="brand-watermark" aria-hidden="true">1942</div>

            <!-- Main Heritage Headline -->
            <h2 class="brand-headline">
              <span class="brand-headline-line">
                <span class="brand-headline-inner">A TASTE</span>
              </span>
              <span class="brand-headline-line">
                <span class="brand-headline-inner">THAT BEGAN</span>
              </span>
              <span class="brand-headline-line">
                <span class="brand-headline-inner">IN 1942</span>
              </span>
            </h2>

            <!-- Verified Brand Narrative (Concise, authentic, no fake history) -->
            <div class="brand-story-body">
              <p class="brand-story-lead">
                Since 1942, Meena has been part of the everyday food story of Andhra Pradesh.
              </p>
              <p class="brand-story-text">
                Rooted in Kumudavalli, near Bhimavaram, our bakery craft is dedicated to everyday essentials — golden rusks baked to a crisp, wholesome loaves of fresh bread, and soft tea buns prepared with care and timeless consistency.
              </p>
            </div>

            <!-- Emotional Brand Statement -->
            <blockquote class="brand-statement-quote">
              <p class="statement-quote-text">
                “Made for the everyday moments that stay with us.”
              </p>
            </blockquote>
          </div>

          <!-- CENTER: Vertical Continuity Timeline (1942 ──→ TODAY) -->
          <div class="brand-timeline-track" aria-hidden="true">
            <span class="timeline-year-top">1942</span>
            <div class="timeline-line-rail">
              <div class="timeline-marker-dot" id="timeline-dot"></div>
            </div>
            <span class="timeline-year-bottom">TODAY</span>
          </div>

          <!-- RIGHT SIDE: Real about.webp Visual Object (100% Uncropped) -->
          <div class="brand-visual-column">
            <figure class="brand-image-stage">
              <img 
                src="about/about.webp" 
                alt="Meena Foods — Artisanal Bakery Craftsmanship and Heritage" 
                class="brand-image-element"
                width="500"
                height="500"
                loading="lazy"
              />
            </figure>

            <figcaption class="brand-image-caption">
              <span class="caption-brand">MEENA FOODS</span>
              <span class="caption-dot">·</span>
              <span class="caption-loc">KUMUDAVALLI, ANDHRA PRADESH</span>
            </figcaption>
          </div>
        </div>
      </div>
    `;
  }

  cacheElements() {
    this.grid = this.mount.querySelector('#brand-grid');
    this.timelineDot = this.mount.querySelector('#timeline-dot');
    this.watermark = this.mount.querySelector('#brand-watermark');
  }

  initObserver() {
    if (!this.grid) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.grid.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(this.grid);
  }

  initScrollTimeline() {
    if (!this.timelineDot) return;

    window.addEventListener('scroll', () => {
      const rect = this.mount.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate progress of section through the viewport
      if (rect.top <= viewportHeight && rect.bottom >= 0) {
        const totalDistance = rect.height + viewportHeight;
        const currentDistance = viewportHeight - rect.top;
        const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));

        // Move marker along the rail from 5% to 95%
        const topPercent = (progress * 90) + 5;
        this.timelineDot.style.top = `${topPercent}%`;

        // Subtle parallax movement on the giant 1942 watermark
        if (this.watermark) {
          const parallaxOffset = (progress - 0.5) * 30;
          this.watermark.style.transform = `translateY(${parallaxOffset}px)`;
        }
      }
    }, { passive: true });
  }
}
