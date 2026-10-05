/* ==========================================================================
   MEENA FOODS — SECTION 07: FINAL MEMORY COMPONENT
   Cinematic Emotional Ending & Subtle Minimal Functional Footer
   ========================================================================== */

export class MeenaMemory {
  constructor(mountSelector = '#memory') {
    this.mount = typeof mountSelector === 'string'
      ? document.querySelector(mountSelector)
      : mountSelector;

    if (!this.mount) {
      console.warn(`[MeenaMemory] Mount element not found: ${mountSelector}`);
      return;
    }

    this.render();
    this.initObserver();
  }

  render() {
    this.mount.innerHTML = `
      <div class="memory-cinematic-stage" id="memory-stage">
        <!-- Background Ambient Warmth Glow -->
        <div class="memory-ambient-glow" aria-hidden="true"></div>

        <!-- ================================================================
             PART 1: THE CINEMATIC ENDING
             ================================================================ -->
        <div class="memory-emotional-scene">
          
          <!-- Opening Visual: Subtle Line-Art Bakery Table Moment -->
          <div class="memory-lineart-wrapper" aria-hidden="true">
            <svg 
              class="memory-table-svg" 
              viewBox="0 0 540 220" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Everyday bakery table with bread, cup and rusk"
            >
              <defs>
                <!-- Subtle steam blur & gradients -->
                <linearGradient id="steamGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stop-color="#FAF5EE" stop-opacity="0" />
                  <stop offset="40%" stop-color="#FAF5EE" stop-opacity="0.6" />
                  <stop offset="100%" stop-color="#FAF5EE" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="warmLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#FFE4C4" stop-opacity="0.12" />
                  <stop offset="100%" stop-color="#FFE4C4" stop-opacity="0" />
                </linearGradient>
              </defs>

              <!-- Warm Ambient Light Cone above table -->
              <polygon points="270,10 140,175 400,175" fill="url(#warmLightGrad)" />

              <!-- Left Chair Outline (Subtle fine linework) -->
              <path d="M 80 100 L 80 185 M 95 100 L 95 185 M 75 100 C 75 92 100 92 100 100 M 75 140 L 100 140" 
                    stroke="#D9CBB8" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.45" />

              <!-- Right Chair Outline (Subtle fine linework) -->
              <path d="M 445 100 L 445 185 M 460 100 L 460 185 M 440 100 C 440 92 465 92 465 100 M 440 140 L 465 140" 
                    stroke="#D9CBB8" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.45" />

              <!-- Main Table Surface Line & Subtle Bevel -->
              <line x1="90" y1="175" x2="450" y2="175" stroke="#E8DEC8" stroke-width="1.8" stroke-linecap="round" />
              <line x1="110" y1="180" x2="430" y2="180" stroke="#8C6F56" stroke-width="1" stroke-linecap="round" opacity="0.5" />
              
              <!-- Table Legs -->
              <line x1="120" y1="180" x2="120" y2="215" stroke="#E8DEC8" stroke-width="1.4" stroke-linecap="round" opacity="0.6" />
              <line x1="420" y1="180" x2="420" y2="215" stroke="#E8DEC8" stroke-width="1.4" stroke-linecap="round" opacity="0.6" />

              <!-- Tabletop Elements: Center-Left Fresh Bread Loaf & Board -->
              <g class="svg-bread-group">
                <!-- Wooden Board -->
                <rect x="170" y="171" width="110" height="4" rx="2" stroke="#E8DEC8" stroke-width="1.2" fill="none" />
                <!-- Bread Loaf Body -->
                <path d="M 180 171 C 180 135 240 132 265 171 Z" stroke="#E8DEC8" stroke-width="1.3" fill="none" />
                <!-- Loaf Score Marks -->
                <path d="M 198 162 C 202 150 208 145 212 143" stroke="#E8DEC8" stroke-width="1" stroke-linecap="round" opacity="0.75" />
                <path d="M 218 163 C 223 148 229 144 234 142" stroke="#E8DEC8" stroke-width="1" stroke-linecap="round" opacity="0.75" />
                <path d="M 238 165 C 243 152 248 147 252 146" stroke="#E8DEC8" stroke-width="1" stroke-linecap="round" opacity="0.75" />
                <!-- Sliced Piece resting on board -->
                <path d="M 166 171 C 166 148 177 148 178 171 Z" stroke="#E8DEC8" stroke-width="1.1" stroke-dasharray="2 1.5" fill="none" opacity="0.6" />
              </g>

              <!-- Tabletop Elements: Center-Right Hot Tea Cup & Saucer with Steam -->
              <g class="svg-cup-group">
                <!-- Saucer -->
                <ellipse cx="320" cy="173" rx="28" ry="3.5" stroke="#E8DEC8" stroke-width="1.2" fill="none" />
                <!-- Cup Body -->
                <path d="M 304 172 C 304 152 336 152 336 172 Z" stroke="#E8DEC8" stroke-width="1.3" fill="none" />
                <!-- Cup Rim -->
                <ellipse cx="320" cy="153" rx="16" ry="3" stroke="#E8DEC8" stroke-width="1.2" fill="none" />
                <!-- Cup Handle -->
                <path d="M 335 158 C 344 158 344 168 333 169" stroke="#E8DEC8" stroke-width="1.1" fill="none" stroke-linecap="round" />

                <!-- Gentle Animated Steam Rising (3 graceful curving wisps) -->
                <path class="steam-wisp steam-wisp-1" d="M 314 148 C 310 134 322 122 316 108 C 312 96 318 84 314 72" 
                      stroke="url(#steamGradient)" stroke-width="1.6" stroke-linecap="round" fill="none" />
                <path class="steam-wisp steam-wisp-2" d="M 321 148 C 326 132 318 118 324 104 C 328 92 322 78 325 66" 
                      stroke="url(#steamGradient)" stroke-width="1.8" stroke-linecap="round" fill="none" />
                <path class="steam-wisp steam-wisp-3" d="M 327 148 C 332 135 324 124 330 112 C 334 102 328 90 331 80" 
                      stroke="url(#steamGradient)" stroke-width="1.5" stroke-linecap="round" fill="none" />
              </g>

              <!-- Tabletop Elements: Far Right Plate with Crisp Rusk -->
              <g class="svg-plate-group">
                <!-- Plate -->
                <ellipse cx="385" cy="174" rx="20" ry="3" stroke="#E8DEC8" stroke-width="1.1" fill="none" opacity="0.8" />
                <!-- Crisp Rusk / Small Bun -->
                <rect x="375" y="164" width="18" height="9" rx="2" stroke="#E8DEC8" stroke-width="1.2" fill="none" transform="rotate(-6 384 168)" />
                <line x1="378" y1="167" x2="390" y2="166" stroke="#E8DEC8" stroke-width="0.8" stroke-dasharray="1.5 1.5" opacity="0.6" />
              </g>
            </svg>
          </div>

          <!-- Editorial Sequence (Fades in systematically) -->
          <div class="memory-text-sequence">
            
            <!-- Brand Badge -->
            <div class="memory-brand-badge reveal-item" data-delay="400">
              <span class="memory-badge-name">MEENA</span>
              <span class="memory-badge-sep" aria-hidden="true">·</span>
              <span class="memory-badge-since">SINCE 1942</span>
            </div>

            <!-- Main Statement: Large Serif -->
            <h2 class="memory-headline-statement reveal-item" data-delay="900">
              SOME TASTES<br>
              BECOME PART<br>
              OF EVERYDAY LIFE.
            </h2>

            <!-- Final Quote -->
            <p class="memory-final-quote reveal-item" data-delay="1500">
              “MADE FOR EVERYDAY MOMENTS.”
            </p>

            <!-- Real Meena Brand Mark Anchor -->
            <div class="memory-logo-anchor reveal-item" data-delay="2000">
              <div class="logo-breathing-frame">
                <img 
                  src="brand/logo.webp" 
                  alt="Meena Foods — Since 1942" 
                  class="memory-official-logo"
                  width="347"
                  height="106"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>

        <!-- ================================================================
             PART 2: MINIMAL FUNCTIONAL FOOTER
             (Appears with ~2s hold after the emotional ending settles)
             ================================================================ -->
        <footer class="memory-functional-footer" id="functional-footer" aria-label="Meena Foods Site Information">
          <div class="footer-inner-bounds">
            
            <!-- Left: Brand & Origin -->
            <div class="footer-col footer-col-identity">
              <span class="footer-brand-title">MEENA FOODS</span>
              <span class="footer-location-sub">KUMUDAVALLI, ANDHRA PRADESH</span>
            </div>

            <!-- Middle: Direct Verified Contact -->
            <div class="footer-col footer-col-contact">
              <a href="tel:+919505077477" class="footer-link footer-phone">+91 95050 77477</a>
              <span class="footer-dot-sep" aria-hidden="true">·</span>
              <a href="mailto:meenafoods@yahoo.com" class="footer-link footer-email">meenafoods@yahoo.com</a>
            </div>

            <!-- Right: Quick Navigation & Copyright -->
            <div class="footer-col footer-col-links">
              <nav class="footer-nav" aria-label="Footer Quick Links">
                <a href="#video-hero-mount" class="footer-nav-anchor">HOME</a>
                <a href="#collection" class="footer-nav-anchor">COLLECTION</a>
                <a href="#visit" class="footer-nav-anchor">VISIT</a>
              </nav>
              <span class="footer-copyright">© 2026 MEENA FOODS</span>
            </div>

          </div>
        </footer>

      </div>
    `;
  }

  initObserver() {
    const stage = this.mount.querySelector('#memory-stage');
    const footer = this.mount.querySelector('#functional-footer');
    const revealItems = this.mount.querySelectorAll('.reveal-item');
    if (!stage) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      stage.classList.add('in-view');
      revealItems.forEach(item => item.classList.add('visible'));
      if (footer) footer.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stage.classList.add('in-view');

          // Trigger sequence
          revealItems.forEach(item => {
            const delay = parseInt(item.dataset.delay, 10) || 0;
            setTimeout(() => {
              item.classList.add('visible');
            }, delay);
          });

          // After main statement settles, hold ~2s then reveal functional footer
          setTimeout(() => {
            if (footer) {
              footer.classList.add('visible');
            }
          }, 3600);

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18
    });

    observer.observe(stage);
  }
}
