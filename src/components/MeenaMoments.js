/* ==========================================================================
   MEENA FOODS — SECTION 05: THE MOMENTS COMPONENT
   Cinematic Video Gallery (2 Initial Videos + Expandable Second Row)
   ========================================================================== */

const GALLERY_VIDEOS = [
  {
    id: 'moment-01',
    src: 'gallery/gallery1.mp4',
    label: 'MOMENT 01',
    title: 'The Everyday Table'
  },
  {
    id: 'moment-02',
    src: 'gallery/gallery2.mp4',
    label: 'MOMENT 02',
    title: 'Morning Ritual'
  },
  {
    id: 'moment-03',
    src: 'gallery/gallery3.mp4',
    label: 'MOMENT 03',
    title: 'Afternoon Tea'
  },
  {
    id: 'moment-04',
    src: 'gallery/gallery4.mp4',
    label: 'MOMENT 04',
    title: 'Sharing the Loaf'
  }
];

export class MeenaMoments {
  constructor(mountSelector = '#moments-gallery') {
    this.mount = typeof mountSelector === 'string'
      ? document.querySelector(mountSelector)
      : mountSelector;

    if (!this.mount) {
      console.warn(`[MeenaMoments] Mount element not found: ${mountSelector}`);
      return;
    }

    this.isExpanded = false;
    this.render();
    this.cacheElements();
    this.initToggleEvent();
    this.initLightboxEvents();
    this.initVideoAutoplay();
  }

  render() {
    this.mount.innerHTML = `
      <div class="moments-inner-container">
        <!-- Section Header -->
        <header class="moments-intro-header">
          <div class="moments-eyebrow-row">
            <span class="moments-accent-line" aria-hidden="true"></span>
            <span class="moments-eyebrow-tag">05 / THE MOMENTS</span>
          </div>

          <h2 class="moments-headline-main">
            MADE FOR<br>EVERYDAY.
          </h2>

          <p class="moments-supporting-copy">
            Some moments become part of everyday life.
          </p>
        </header>

        <!-- Gallery Area -->
        <div class="moments-gallery-wrapper">
          <!-- Row 1: Always Visible Initially (Video 01 & Video 02) -->
          <div class="moments-video-row initial-row" id="moments-row-primary">
            <!-- Video 01 -->
            <div class="moment-video-card" data-index="0" data-src="${GALLERY_VIDEOS[0].src}">
              <div class="video-media-stage">
                <video 
                  class="moment-video-element" 
                  autoplay 
                  muted 
                  loop 
                  playsinline 
                  preload="metadata"
                >
                  <source src="${GALLERY_VIDEOS[0].src}" type="video/mp4" />
                </video>
                <div class="video-hover-veil" aria-hidden="true">
                  <span class="lightbox-cue">EXPAND VIEW</span>
                  <span class="lightbox-cue-arrow">↗</span>
                </div>
              </div>
              <div class="moment-card-caption">
                <span class="moment-label-text">${GALLERY_VIDEOS[0].label}</span>
              </div>
            </div>

            <!-- Video 02 -->
            <div class="moment-video-card" data-index="1" data-src="${GALLERY_VIDEOS[1].src}">
              <div class="video-media-stage">
                <video 
                  class="moment-video-element" 
                  autoplay 
                  muted 
                  loop 
                  playsinline 
                  preload="metadata"
                >
                  <source src="${GALLERY_VIDEOS[1].src}" type="video/mp4" />
                </video>
                <div class="video-hover-veil" aria-hidden="true">
                  <span class="lightbox-cue">EXPAND VIEW</span>
                  <span class="lightbox-cue-arrow">↗</span>
                </div>
              </div>
              <div class="moment-card-caption">
                <span class="moment-label-text">${GALLERY_VIDEOS[1].label}</span>
              </div>
            </div>
          </div>

          <!-- Explore More Gallery Action Button (Centered) -->
          <div class="moments-toggle-action">
            <button 
              class="moments-expand-btn" 
              id="moments-expand-btn" 
              type="button" 
              aria-expanded="false"
              aria-controls="moments-row-secondary"
            >
              <span class="btn-main-label" id="btn-label-text">EXPLORE MORE GALLERY</span>
              <span class="btn-arrow-symbol" id="btn-arrow-icon" aria-hidden="true">→</span>
            </button>
          </div>

          <!-- Row 2: Expandable (Video 03 & Video 04) -->
          <div 
            class="moments-video-row expandable-row" 
            id="moments-row-secondary" 
            aria-hidden="true"
          >
            <!-- Video 03 -->
            <div class="moment-video-card secondary-card" data-index="2" data-src="${GALLERY_VIDEOS[2].src}">
              <div class="video-media-stage">
                <video 
                  class="moment-video-element" 
                  muted 
                  loop 
                  playsinline 
                  preload="none"
                >
                  <source src="${GALLERY_VIDEOS[2].src}" type="video/mp4" />
                </video>
                <div class="video-hover-veil" aria-hidden="true">
                  <span class="lightbox-cue">EXPAND VIEW</span>
                  <span class="lightbox-cue-arrow">↗</span>
                </div>
              </div>
              <div class="moment-card-caption">
                <span class="moment-label-text">${GALLERY_VIDEOS[2].label}</span>
              </div>
            </div>

            <!-- Video 04 -->
            <div class="moment-video-card secondary-card" data-index="3" data-src="${GALLERY_VIDEOS[3].src}">
              <div class="video-media-stage">
                <video 
                  class="moment-video-element" 
                  muted 
                  loop 
                  playsinline 
                  preload="none"
                >
                  <source src="${GALLERY_VIDEOS[3].src}" type="video/mp4" />
                </video>
                <div class="video-hover-veil" aria-hidden="true">
                  <span class="lightbox-cue">EXPAND VIEW</span>
                  <span class="lightbox-cue-arrow">↗</span>
                </div>
              </div>
              <div class="moment-card-caption">
                <span class="moment-label-text">${GALLERY_VIDEOS[3].label}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Closing Statement -->
        <footer class="moments-closing-banner">
          <p class="moments-closing-quote">
            THE BEST THINGS<br>
            BECOME PART OF<br>
            THE EVERYDAY.
          </p>
          <div class="moments-closing-brand">
            <span>MEENA</span>
            <span class="closing-dot" aria-hidden="true">·</span>
            <span>SINCE 1942</span>
          </div>
        </footer>
      </div>

      <!-- Cinematic Video Lightbox Overlay -->
      <div class="moment-lightbox-modal" id="moment-lightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Cinematic Video View">
        <div class="lightbox-dialog-card">
          <button class="lightbox-exit-btn" id="lightbox-exit" type="button" aria-label="Close video view">
            <span>CLOSE</span>
            <span class="exit-symbol" aria-hidden="true">×</span>
          </button>
          <div class="lightbox-video-container">
            <video 
              class="lightbox-video-element" 
              id="lightbox-active-video" 
              muted 
              loop 
              playsinline
            ></video>
          </div>
          <span class="lightbox-caption" id="lightbox-label">MEENA FOODS · THE MOMENTS</span>
        </div>
      </div>
    `;
  }

  cacheElements() {
    this.toggleBtn = this.mount.querySelector('#moments-expand-btn');
    this.btnLabel = this.mount.querySelector('#btn-label-text');
    this.btnArrow = this.mount.querySelector('#btn-arrow-icon');
    this.secondaryRow = this.mount.querySelector('#moments-row-secondary');
    this.secondaryVideos = this.mount.querySelectorAll('#moments-row-secondary video');
    this.lightbox = this.mount.querySelector('#moment-lightbox');
    this.lightboxVideo = this.mount.querySelector('#lightbox-active-video');
    this.lightboxLabel = this.mount.querySelector('#lightbox-label');
    this.lightboxExit = this.mount.querySelector('#lightbox-exit');
    this.videoCards = this.mount.querySelectorAll('.moment-video-card');
  }

  initToggleEvent() {
    if (!this.toggleBtn || !this.secondaryRow) return;

    this.toggleBtn.addEventListener('click', () => {
      this.isExpanded = !this.isExpanded;

      if (this.isExpanded) {
        // Expand
        this.secondaryRow.classList.add('visible');
        this.secondaryRow.setAttribute('aria-hidden', 'false');
        this.toggleBtn.setAttribute('aria-expanded', 'true');
        this.btnLabel.textContent = 'SHOW LESS';
        this.btnArrow.textContent = '↑';

        // Play secondary videos
        this.secondaryVideos.forEach(v => {
          v.play().catch(() => {});
        });
      } else {
        // Collapse
        this.secondaryRow.classList.remove('visible');
        this.secondaryRow.setAttribute('aria-hidden', 'true');
        this.toggleBtn.setAttribute('aria-expanded', 'false');
        this.btnLabel.textContent = 'EXPLORE MORE GALLERY';
        this.btnArrow.textContent = '→';

        // Pause secondary videos to save CPU
        this.secondaryVideos.forEach(v => {
          v.pause();
        });
      }
    });
  }

  initLightboxEvents() {
    this.videoCards.forEach(card => {
      card.addEventListener('click', () => {
        const src = card.dataset.src;
        const idx = parseInt(card.dataset.index, 10);
        const data = GALLERY_VIDEOS[idx];
        this.openLightbox(src, data ? data.label : 'MOMENT');
      });
    });

    if (this.lightboxExit) {
      this.lightboxExit.addEventListener('click', () => this.closeLightbox());
    }

    if (this.lightbox) {
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.closeLightbox();
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (this.lightbox && this.lightbox.classList.contains('open')) {
        if (e.key === 'Escape') {
          this.closeLightbox();
        }
      }
    });
  }

  openLightbox(src, label) {
    if (!this.lightbox || !this.lightboxVideo) return;
    this.lightboxVideo.src = src;
    if (this.lightboxLabel) {
      this.lightboxLabel.textContent = `MEENA FOODS · ${label}`;
    }
    this.lightbox.classList.add('open');
    this.lightbox.setAttribute('aria-hidden', 'false');
    this.lightboxVideo.play().catch(() => {});
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    if (!this.lightbox || !this.lightboxVideo) return;
    this.lightboxVideo.pause();
    this.lightboxVideo.src = '';
    this.lightbox.classList.remove('open');
    this.lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  initVideoAutoplay() {
    const primaryVideos = this.mount.querySelectorAll('#moments-row-primary video');
    primaryVideos.forEach(v => {
      v.muted = true;
      v.play().catch(() => {
        document.addEventListener('click', () => v.play(), { once: true });
        document.addEventListener('touchstart', () => v.play(), { once: true });
      });
    });
  }
}
