/* ==========================================================================
   MEENA FOODS — SECTION 01: THE NAME ON EVERY PACK COMPONENT
   (Reused and Adapted from Previous Section 00 Composition)
   Editorial Brand Hero with 2-Second Visual Showcase
   ========================================================================== */

const HERO_SLIDES = [
  { id: 1, src: 'hero/hero1.webp', alt: 'Meena Foods — Freshly Baked Buns and Bakery Heritage' },
  { id: 2, src: 'hero/hero2.webp', alt: 'Meena Foods — Artisanal Rusk and Breads Daily' },
  { id: 3, src: 'hero/hero3.webp', alt: 'Meena Foods — Heritage Craftsmanship Since 1942' },
  { id: 4, src: 'hero/hero4.webp', alt: 'Meena Foods — Everyday Bakery Moments' }
];

const SLIDE_DURATION_MS = 2000;

export class BrandHero {
  constructor(mountSelector = '#brand') {
    this.mount = typeof mountSelector === 'string'
      ? document.querySelector(mountSelector)
      : mountSelector;

    if (!this.mount) {
      console.warn(`[BrandHero] Mount element not found: ${mountSelector}`);
      return;
    }

    this.currentIndex = 0;
    this.totalSlides = HERO_SLIDES.length;
    this.rafId = null;
    this.startTime = null;
    this.isPaused = false;

    this.render();
    this.cacheElements();
    this.initEvents();
    this.preloadRemainingImages();
    this.startProgressCycle();
  }

  render() {
    this.mount.innerHTML = `
      <section class="section-brand-hero" id="brand" aria-label="Section 01: The Name On Every Pack">
        <!-- Subtle 1942 Background Watermark -->
        <div class="hero-watermark" aria-hidden="true">1942</div>

        <div class="hero-wrapper">
          <!-- LEFT SIDE: Story & Editorial Typography (~44%) -->
          <div class="hero-story">
            <!-- 01 / THE BRAND Eyebrow with Meena Red Line -->
            <div class="hero-eyebrow">
              <span class="eyebrow-rule" aria-hidden="true"></span>
              <span class="eyebrow-text">01 / THE BRAND · SINCE 1942</span>
            </div>

            <!-- 3-Line Large Editorial Headline: "THE NAME ON EVERY PACK" -->
            <h2 class="hero-headline">
              <span class="headline-line"><span class="line-inner">THE NAME</span></span>
              <span class="headline-line"><span class="line-inner">ON EVERY</span></span>
              <span class="headline-line"><span class="line-inner">PACK</span></span>
            </h2>

            <!-- Warm Emotional Supporting Statement -->
            <div class="hero-statement">
              <p class="statement-main">
                Bread. Rusk. Bun.<br>
                Made for everyday moments.
              </p>
              <p class="statement-sub">
                MEENA FOODS · KUMUDAVALLI · BHIMAVARAM
              </p>
            </div>

            <!-- Editorial Text CTA Button pointing to Section 02 (#moments) -->
            <div class="hero-action">
              <a href="#moments" class="editorial-cta" id="brand-moments-cta">
                <span class="cta-label">EXPLORE THE TABLE</span>
                <span class="cta-arrow" aria-hidden="true">→</span>
              </a>
            </div>

            <!-- Subtle Scroll Cue -->
            <div class="hero-scroll-cue" aria-hidden="true">
              <span class="scroll-text">SCROLL TO DISCOVER</span>
              <span class="scroll-arrow">↓</span>
            </div>
          </div>

          <!-- RIGHT SIDE: Expansive Large Frame (~52%) -->
          <div class="hero-visual-column">
            <div class="hero-visual-stage" id="brand-visual-stage" role="region" aria-label="Brand Visual Showcase">
              <div class="hero-slides-wrapper" id="brand-slides-wrapper">
                ${HERO_SLIDES.map((slide, index) => `
                  <div 
                    class="hero-slide ${index === 0 ? 'active' : ''}" 
                    data-index="${index}"
                    aria-hidden="${index === 0 ? 'false' : 'true'}"
                  >
                    <img 
                      src="${slide.src}" 
                      alt="${slide.alt}" 
                      class="hero-image"
                      width="1600"
                      height="640"
                      ${index === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}
                    />
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Integrated Minimalist Progress Bar (2-Second Sync) -->
            <div class="hero-progress-panel" aria-label="Visual slideshow controls">
              <button class="hero-nav-arrow" id="brand-prev-btn" type="button" aria-label="Previous image">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <span class="progress-index" id="brand-progress-current" aria-live="polite">01</span>
              
              <div class="progress-line-track" aria-hidden="true">
                <div class="progress-line-fill" id="brand-progress-fill"></div>
              </div>

              <span class="progress-total">04</span>

              <button class="hero-nav-arrow" id="brand-next-btn" type="button" aria-label="Next image">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  cacheElements() {
    this.slides = this.mount.querySelectorAll('.hero-slide');
    this.currentText = this.mount.querySelector('#brand-progress-current');
    this.fillBar = this.mount.querySelector('#brand-progress-fill');
    this.stage = this.mount.querySelector('#brand-visual-stage');
    this.prevBtn = this.mount.querySelector('#brand-prev-btn');
    this.nextBtn = this.mount.querySelector('#brand-next-btn');
  }

  initEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.restartCycle();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.restartCycle();
      });
    }

    if (this.stage) {
      this.stage.addEventListener('mouseenter', () => {
        this.isPaused = true;
      });
      this.stage.addEventListener('mouseleave', () => {
        this.isPaused = false;
      });
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopCycle();
      } else {
        this.restartCycle();
      }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    if (this.stage) {
      this.stage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.stage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 35) {
          diff > 0 ? this.nextSlide() : this.prevSlide();
          this.restartCycle();
        }
      }, { passive: true });
    }
  }

  preloadRemainingImages() {
    HERO_SLIDES.slice(1).forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }

  goToSlide(index) {
    if (index === this.currentIndex) return;

    this.slides[this.currentIndex].classList.remove('active');
    this.slides[this.currentIndex].setAttribute('aria-hidden', 'true');

    this.currentIndex = (index + this.totalSlides) % this.totalSlides;

    this.slides[this.currentIndex].classList.add('active');
    this.slides[this.currentIndex].setAttribute('aria-hidden', 'false');

    const formatted = String(this.currentIndex + 1).padStart(2, '0');
    if (this.currentText) {
      this.currentText.textContent = formatted;
    }
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  startProgressCycle() {
    this.startTime = performance.now();
    let accumulatedPauseTime = 0;
    let lastPauseStamp = null;

    const animate = (now) => {
      if (this.isPaused) {
        if (!lastPauseStamp) lastPauseStamp = now;
        this.rafId = requestAnimationFrame(animate);
        return;
      }

      if (lastPauseStamp) {
        accumulatedPauseTime += (now - lastPauseStamp);
        lastPauseStamp = null;
      }

      const elapsed = (now - this.startTime) - accumulatedPauseTime;
      const progress = Math.min(elapsed / SLIDE_DURATION_MS, 1);

      if (this.fillBar) {
        this.fillBar.style.width = `${progress * 100}%`;
      }

      if (progress >= 1) {
        this.nextSlide();
        this.startTime = performance.now();
        accumulatedPauseTime = 0;
        lastPauseStamp = null;
      }

      this.rafId = requestAnimationFrame(animate);
    };

    this.rafId = requestAnimationFrame(animate);
  }

  stopCycle() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  restartCycle() {
    this.stopCycle();
    if (this.fillBar) {
      this.fillBar.style.width = '0%';
    }
    this.startProgressCycle();
  }
}
