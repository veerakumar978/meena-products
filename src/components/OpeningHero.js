/* ==========================================================================
   MEENA FOODS — OPENING HERO COMPONENT (REFINED)
   Section 00: "The First Impression of 1942"
   Expansive Frame, 2-Second Dynamic Slideshow, Heritage Atmosphere
   ========================================================================== */

const HERO_SLIDES = [
  { id: 1, src: 'hero/hero1.webp', alt: 'Meena Foods — Freshly Baked Buns and Bakery Heritage' },
  { id: 2, src: 'hero/hero2.webp', alt: 'Meena Foods — Artisanal Rusk and Breads Daily' },
  { id: 3, src: 'hero/hero3.webp', alt: 'Meena Foods — Heritage Craftsmanship Since 1942' },
  { id: 4, src: 'hero/hero4.webp', alt: 'Meena Foods — Everyday Bakery Moments' }
];

// 2 Seconds per slide as explicitly requested
const SLIDE_DURATION_MS = 2000;

export class OpeningHero {
  constructor(mountSelector = '#hero-mount') {
    this.mount = typeof mountSelector === 'string'
      ? document.querySelector(mountSelector)
      : mountSelector;

    if (!this.mount) {
      console.warn(`[OpeningHero] Mount element not found: ${mountSelector}`);
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
      <section class="opening-hero" id="opening-experience" aria-label="Meena Foods — The First Impression of 1942">
        <!-- Subtle 1942 Heritage Background Watermark -->
        <div class="hero-watermark" aria-hidden="true">1942</div>

        <div class="hero-wrapper">
          <!-- LEFT SIDE: Story & Editorial Typography (~44%) -->
          <div class="hero-story">
            <!-- Refined Heritage Eyebrow with Meena Red Line -->
            <div class="hero-eyebrow">
              <span class="eyebrow-rule" aria-hidden="true"></span>
              <span class="eyebrow-text">SINCE 1942</span>
            </div>

            <!-- 3-Line Large Editorial Headline -->
            <h1 class="hero-headline">
              <span class="headline-line"><span class="line-inner">A TASTE</span></span>
              <span class="headline-line"><span class="line-inner">THAT BEGAN</span></span>
              <span class="headline-line"><span class="line-inner">IN 1942</span></span>
            </h1>

            <!-- Warm Emotional Supporting Statement -->
            <div class="hero-statement">
              <p class="statement-main">
                Bread. Rusk. Bun.<br>
                Made for everyday moments.
              </p>
              <p class="statement-sub">
                MEENA FOODS · KUMUDAVALLI
              </p>
            </div>

            <!-- Editorial Text CTA Button -->
            <div class="hero-action">
              <a href="#collection" class="editorial-cta" id="hero-explore-cta">
                <span class="cta-label">EXPLORE MEENA</span>
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
            <div class="hero-visual-stage" id="hero-visual-stage" role="region" aria-label="Brand Visual Showcase">
              <div class="hero-slides-wrapper" id="hero-slides-wrapper">
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
              <button class="hero-nav-arrow" id="hero-prev-btn" type="button" aria-label="Previous image">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <span class="progress-index" id="progress-current" aria-live="polite">01</span>
              
              <div class="progress-line-track" aria-hidden="true">
                <div class="progress-line-fill" id="progress-fill"></div>
              </div>

              <span class="progress-total">04</span>

              <button class="hero-nav-arrow" id="hero-next-btn" type="button" aria-label="Next image">
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
    this.currentText = this.mount.querySelector('#progress-current');
    this.fillBar = this.mount.querySelector('#progress-fill');
    this.stage = this.mount.querySelector('#hero-visual-stage');
    this.prevBtn = this.mount.querySelector('#hero-prev-btn');
    this.nextBtn = this.mount.querySelector('#hero-next-btn');
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

    // Pause on hover
    if (this.stage) {
      this.stage.addEventListener('mouseenter', () => {
        this.isPaused = true;
      });
      this.stage.addEventListener('mouseleave', () => {
        this.isPaused = false;
      });
    }

    // Sync visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopCycle();
      } else {
        this.restartCycle();
      }
    });

    // Touch swipe support on mobile
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

  // Smooth 2-second progress animation using requestAnimationFrame
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
