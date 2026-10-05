/* ==========================================================================
   MEENA FOODS — SECTION 00: CINEMATIC PRODUCT FILM COMPONENT
   Full-Bleed Background Video with Centered Floating Editorial Statement
   ========================================================================== */

export class VideoHero {
  constructor(mountSelector = '#video-hero-mount') {
    this.mount = typeof mountSelector === 'string'
      ? document.querySelector(mountSelector)
      : mountSelector;

    if (!this.mount) {
      console.warn(`[VideoHero] Mount element not found: ${mountSelector}`);
      return;
    }

    this.render();
    this.initVideoPlayback();
    this.initEvents();
  }

  render() {
    this.mount.innerHTML = `
      <section class="section-video-hero" id="home" aria-label="Meena Foods — The Taste of Everyday">
        <!-- Layer 1: Full-Bleed Product Video Background -->
        <div class="video-hero-media" aria-hidden="true">
          <video 
            class="video-hero-element"
            id="hero-bg-video"
            autoplay
            muted
            loop
            playsinline
            preload="auto"
          >
            <source src="hero/meera products.mp4" type="video/mp4" />
          </video>
        </div>

        <!-- Layer 2: Subtle Ambient Tonal Film Veil across entire viewport -->
        <div class="video-hero-overlay" aria-hidden="true"></div>

        <!-- Layer 3: Soft Top & Bottom Contrast Vignette for Header and Scroll Cue -->
        <div class="video-hero-vignette" aria-hidden="true"></div>

        <!-- Layer 4: Soft, Large Blurred Radial Warm Ivory Veil Behind Center Content -->
        <div class="video-hero-radial-veil" aria-hidden="true"></div>

        <!-- Layer 5: Centered Editorial Brand Content (No card, floating naturally) -->
        <div class="video-hero-container">
          <div class="video-hero-centered-content">
            <!-- Eyebrow: SINCE 1942 with small subtle red accent lines -->
            <div class="video-hero-eyebrow">
              <span class="eyebrow-accent-line" aria-hidden="true"></span>
              <span class="eyebrow-accent-text">SINCE 1942</span>
              <span class="eyebrow-accent-line" aria-hidden="true"></span>
            </div>

            <!-- Main Heading: THE TASTE OF EVERYDAY (Two lines, deep espresso, serif display) -->
            <h1 class="video-hero-title">
              <span class="title-line">THE TASTE</span>
              <span class="title-line">OF EVERYDAY</span>
            </h1>

            <!-- Supporting Statement -->
            <p class="video-hero-supporting">
              Bread. Rusk. Bun.<br>
              Made for everyday moments.
            </p>

            <!-- Brand Identifier -->
            <div class="video-hero-brand-tag">
              MEENA FOODS · KUMUDAVALLI
            </div>

            <!-- Editorial Text CTA -->
            <div class="video-hero-action">
              <a href="#brand" class="video-editorial-cta" id="hero-explore-cta">
                <span class="cta-label">EXPLORE MEENA</span>
                <span class="cta-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Layer 6: Scroll Down Indicator (Independently positioned bottom-center) -->
        <div class="video-scroll-cue" aria-hidden="true">
          <span class="scroll-cue-text">SCROLL TO DISCOVER</span>
          <span class="scroll-cue-arrow">↓</span>
        </div>
      </section>
    `;
  }

  initVideoPlayback() {
    const video = this.mount.querySelector('#hero-bg-video');
    if (!video) return;

    // Ensure seamless autoplay and looping
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback if browser requires touch interaction
        document.addEventListener('click', () => video.play(), { once: true });
        document.addEventListener('touchstart', () => video.play(), { once: true });
      });
    }

    // Seamless loop restart without white/black flashes
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.play();
    });
  }

  initEvents() {
    const cta = this.mount.querySelector('#hero-explore-cta');
    if (cta) {
      cta.addEventListener('click', (e) => {
        const target = document.querySelector('#brand');
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
}
