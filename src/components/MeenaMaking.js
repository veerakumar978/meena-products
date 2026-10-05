/* ==========================================================================
   MEENA FOODS — SECTION 04: THE MAKING COMPONENT
   Realistic 3D Production Journey — 6 Stations, 2s Interval, Red Progress
   ========================================================================== */

const STATIONS = [
  {
    id: 'mix',
    number: '01',
    name: 'MIX',
    label: '01 / MIX',
    headline: 'Preparation Begins with Precision.',
    desc: 'The journey begins in the mixing bowl where fine flour, pure liquids and essential ingredients combine into the foundation of the dough.',
    image: 'making/stage-01-mix.jpg',
    alt: 'Realistic 3D Bakery Mixing Bowl Stage',
    isHero: false
  },
  {
    id: 'knead',
    number: '02',
    name: 'KNEAD',
    label: '02 / KNEAD',
    headline: 'Developing Elasticity & Strength.',
    desc: 'The dough is methodically worked and stretched across the bakery table, developing natural elasticity, uniform texture and supple gluten structure.',
    image: 'making/stage-02-knead.jpg',
    alt: 'Realistic 3D Dough Kneading Stage',
    isHero: false
  },
  {
    id: 'ferment',
    number: '03',
    name: 'FERMENT',
    label: '03 / FERMENT',
    headline: 'Resting for the First Gentle Rise.',
    desc: 'Resting in a warm, sheltered bakery environment, the dough undergoes a slow, natural fermentation, gently expanding and developing depth of aroma.',
    image: 'making/stage-03-ferment.jpg',
    alt: 'Realistic 3D Dough Fermentation and Rising Stage',
    isHero: false
  },
  {
    id: 'shape',
    number: '04',
    name: 'SHAPE',
    label: '04 / SHAPE',
    headline: 'Raw Dough Becomes Familiar Form.',
    desc: 'Portioned with care, the supple dough is shaped into rounded artisan loafs, tea buns and classic bread forms, ready for the hearth.',
    image: 'making/stage-04-shape.jpg',
    alt: 'Realistic 3D Bread and Bun Dough Shaping Stage',
    isHero: false
  },
  {
    id: 'bake',
    number: '05',
    name: 'BAKE',
    label: '05 / BAKE',
    headline: 'ARTISANAL CRUST DETAIL · GOLDEN BAKE',
    desc: 'Inside the glowing stone deck oven, intense heat transforms the shaped dough into deep golden-brown crusts with blistered amber texture and rising steam.',
    image: 'making/stage-05-bake.jpg',
    alt: 'Cinematic Realistic 3D Stone Deck Oven Baking Stage',
    isHero: true // Largest / most cinematic visual (65-70% visual area)
  },
  {
    id: 'pack',
    number: '06',
    name: 'PACK',
    label: '06 / PACK',
    headline: 'From Oven to Everyday Packaging.',
    desc: 'Freshly cooled finished rusks and breads are carefully placed into signature Meena packaging, sealed and made ready for everyday tables.',
    image: 'making/stage-06-pack.jpg',
    realProduct: 'products/milk rusk.webp',
    alt: 'Realistic 3D Bakery Packaging Stage with Authentic Packaging',
    isHero: false
  }
];

const STAGE_DURATION_MS = 2000;
const TOTAL_CYCLE_MS = STAGE_DURATION_MS * STATIONS.length; // 12000ms

export class MeenaMaking {
  constructor(mountSelector = '#making') {
    this.mount = typeof mountSelector === 'string'
      ? document.querySelector(mountSelector)
      : mountSelector;

    if (!this.mount) {
      console.warn(`[MeenaMaking] Mount element not found: ${mountSelector}`);
      return;
    }

    this.currentIndex = 0;
    this.rafId = null;
    this.startTime = null;
    this.isPaused = false;
    this.isInView = false;
    this.accumulatedPause = 0;
    this.lastPauseStamp = null;

    this.render();
    this.cacheElements();
    this.preloadStageImages();
    this.initStationClickEvents();
    this.initViewportObserver();
  }

  render() {
    this.mount.innerHTML = `
      <div class="making-inner-container">
        <!-- Section Header: Elegant & Short -->
        <header class="making-intro-header">
          <div class="making-eyebrow-line">
            <span class="making-accent-dash" aria-hidden="true"></span>
            <span class="making-eyebrow-title">04 / THE MAKING</span>
          </div>

          <h2 class="making-headline-main">
            FROM MIX<br>TO MEMORY.
          </h2>

          <p class="making-headline-sub">
            Follow the journey behind the everyday favourites.
          </p>
        </header>

        <!-- Main Production Experience: Station Film Display -->
        <div class="making-station-experience" id="station-experience" role="region" aria-label="3D Production Journey">
          <!-- Main Display Stage (Left Text, Right/Center 3D Film Visual) -->
          <div class="station-film-stage" id="station-film-stage">
            ${this.renderStationMarkup(0)}
          </div>

          <!-- Bottom Continuous Horizontal Journey Line & Station Nodes -->
          <div class="station-timeline-nav" role="tablist" aria-label="Production Stations">
            <!-- Muted Base Line with Red Active Progress Segment -->
            <div class="station-line-track" aria-hidden="true">
              <div class="station-line-fill" id="station-line-fill" style="width: 0%;"></div>
            </div>

            <!-- Station Markers (MIX, KNEAD, FERMENT, SHAPE, BAKE, PACK) -->
            <div class="station-nodes-row">
              ${STATIONS.map((s, idx) => `
                <button 
                  class="station-node-btn ${idx === 0 ? 'current' : ''}" 
                  data-index="${idx}"
                  role="tab"
                  aria-selected="${idx === 0 ? 'true' : 'false'}"
                  aria-label="Station ${s.number}: ${s.name}"
                  type="button"
                >
                  <span class="station-marker-circle" aria-hidden="true">
                    <span class="marker-core"></span>
                  </span>
                  <span class="station-num">${s.number}</span>
                  <span class="station-name">${s.name}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Section 04 End Proclamation -->
        <footer class="making-closing-statement">
          <p class="closing-quote-headline">
            FROM THE OVEN<br>
            TO THE EVERYDAY TABLE.
          </p>
          <div class="closing-brand-emblem">
            <span>MEENA</span>
            <span class="emblem-dot" aria-hidden="true">·</span>
            <span>SINCE 1942</span>
          </div>
        </footer>
      </div>
    `;
  }

  renderStationMarkup(index) {
    const s = STATIONS[index];
    const isHero = s.isHero;

    return `
      <div class="station-content-grid ${isHero ? 'is-hero-bake-stage' : ''}" data-station="${s.id}">
        <!-- LEFT: Station Meta & Editorial Description -->
        <div class="station-left-column">
          <div class="station-badge-row">
            <span class="station-step-num">${s.number}</span>
            <span class="station-step-sep">/</span>
            <span class="station-step-total">06</span>
            <span class="station-step-tag">STATION</span>
          </div>

          <h3 class="station-stage-title">${s.label}</h3>
          
          <h4 class="station-stage-headline">${s.headline}</h4>

          <p class="station-stage-desc">
            ${s.desc}
          </p>

          <div class="station-time-cue" aria-hidden="true">
            <span class="time-cue-pulse"></span>
            <span class="time-cue-text">2 SECONDS PER STAGE</span>
          </div>
        </div>

        <!-- RIGHT / CENTER: Large Realistic 3D Food Visual (50-60% desktop area, Bake 65-70%) -->
        <div class="station-visual-column">
          <div class="station-visual-frame ${isHero ? 'hero-bake-frame' : ''}">
            <img 
              src="${s.image}" 
              alt="${s.alt}" 
              class="station-3d-img ${isHero ? 'hero-push-in-anim' : 'film-breathe-anim'}"
              loading="eager"
            />
            
            ${isHero ? `
              <!-- Artisanal Crust Callout for Stage 05 Bake -->
              <div class="hero-crust-callout" aria-hidden="true">
                <span class="callout-pip">●</span>
                <span class="callout-txt">ARTISANAL CRUST DETAIL · GOLDEN BAKE</span>
              </div>
            ` : ''}

            ${s.realProduct ? `
              <!-- Stage 06 Finished Packaging Inset Anchor -->
              <div class="pack-real-anchor" aria-hidden="true">
                <img src="${s.realProduct}" alt="Meena Foods Packaging" class="pack-anchor-img" />
                <span class="pack-anchor-lbl">AUTHENTIC PACKAGING</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  cacheElements() {
    this.filmStage = this.mount.querySelector('#station-film-stage');
    this.lineFill = this.mount.querySelector('#station-line-fill');
    this.stationNodes = this.mount.querySelectorAll('.station-node-btn');
  }

  preloadStageImages() {
    STATIONS.forEach(s => {
      const img = new Image();
      img.src = s.image;
    });
  }

  initStationClickEvents() {
    this.stationNodes.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetIndex = parseInt(btn.dataset.index, 10);
        this.jumpToStage(targetIndex);
      });
    });
  }

  initViewportObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isInView = true;
          this.startAnimationLoop();
        } else {
          this.isInView = false;
          this.stopAnimationLoop();
        }
      });
    }, {
      threshold: 0.2
    });

    observer.observe(this.mount);

    // Visibility change (tab switch)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopAnimationLoop();
      } else if (this.isInView) {
        this.startAnimationLoop();
      }
    });
  }

  startAnimationLoop() {
    if (this.rafId) return;

    if (!this.startTime) {
      this.startTime = performance.now() - (this.currentIndex * STAGE_DURATION_MS);
    } else if (this.lastPauseStamp) {
      this.accumulatedPause += (performance.now() - this.lastPauseStamp);
      this.lastPauseStamp = null;
    }

    const loop = (now) => {
      if (!this.isInView) return;

      const elapsed = (now - this.startTime) - this.accumulatedPause;
      const cycleTime = elapsed % TOTAL_CYCLE_MS;
      const progressRatio = cycleTime / TOTAL_CYCLE_MS;

      // Update horizontal red progress line (continuous travelling progress)
      if (this.lineFill) {
        this.lineFill.style.width = `${progressRatio * 100}%`;
      }

      // Determine which 2-second stage is active
      const calculatedIndex = Math.min(
        Math.floor(cycleTime / STAGE_DURATION_MS),
        STATIONS.length - 1
      );

      if (calculatedIndex !== this.currentIndex) {
        this.switchStage(calculatedIndex);
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  stopAnimationLoop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
      this.lastPauseStamp = performance.now();
    }
  }

  jumpToStage(index) {
    this.currentIndex = index;
    // Align master timer to target stage
    this.startTime = performance.now() - (index * STAGE_DURATION_MS);
    this.accumulatedPause = 0;
    this.lastPauseStamp = null;

    this.switchStage(index);

    if (this.lineFill) {
      const progressRatio = (index * STAGE_DURATION_MS) / TOTAL_CYCLE_MS;
      this.lineFill.style.width = `${progressRatio * 100}%`;
    }
  }

  switchStage(newIndex) {
    this.currentIndex = newIndex;

    // Update station indicators
    this.stationNodes.forEach((node, i) => {
      const isCurrent = i === newIndex;
      const isCompleted = i < newIndex;
      node.classList.toggle('current', isCurrent);
      node.classList.toggle('completed', isCompleted);
      node.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    // Smooth visual and textual transition (350-500ms opacity + scale)
    if (this.filmStage) {
      this.filmStage.style.opacity = '0';
      this.filmStage.style.transform = 'scale(0.985)';

      setTimeout(() => {
        this.filmStage.innerHTML = this.renderStationMarkup(newIndex);
        this.filmStage.style.opacity = '1';
        this.filmStage.style.transform = 'scale(1)';
      }, 200);
    }
  }
}
