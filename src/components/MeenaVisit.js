/* ==========================================================================
   MEENA FOODS — SECTION 06: VISIT MEENA COMPONENT
   Physical Destination Experience with Verified Contact & Direction Actions
   ========================================================================== */

export class MeenaVisit {
  constructor(mountSelector = '#visit') {
    this.mount = typeof mountSelector === 'string'
      ? document.querySelector(mountSelector)
      : mountSelector;

    if (!this.mount) {
      console.warn(`[MeenaVisit] Mount element not found: ${mountSelector}`);
      return;
    }

    this.render();
  }

  render() {
    this.mount.innerHTML = `
      <div class="visit-inner-container">
        <!-- Section Header -->
        <header class="visit-intro-header">
          <div class="visit-eyebrow-row">
            <span class="visit-accent-dash" aria-hidden="true"></span>
            <span class="visit-eyebrow-tag">06 / VISIT MEENA</span>
          </div>

          <h2 class="visit-headline-main">
            COME TO<br>MEENA.
          </h2>

          <p class="visit-supporting-copy">
            Discover Meena Foods in Kumudavalli.
          </p>
        </header>

        <!-- Master Composition: 55% Left Visual / 45% Right Editorial Info -->
        <div class="visit-composition-stage">
          <!-- LEFT: Real Meena Packaging & Bakery Heritage Visual Asset -->
          <div class="visit-visual-pane">
            <div class="visit-image-frame">
              <img 
                src="about/about.webp" 
                alt="Meena Foods Kumudavalli Heritage Bakery Products" 
                class="visit-hero-img"
                width="640"
                height="640"
                loading="lazy"
              />
              <div class="visit-badge-overlay" aria-hidden="true">
                <span class="badge-dot">●</span>
                <span class="badge-text">KUMUDAVALLI · SINCE 1942</span>
              </div>
            </div>
          </div>

          <!-- RIGHT: Editorial Destination Information Panel -->
          <div class="visit-info-pane">
            <div class="visit-location-block">
              <span class="location-pre-tag">DESTINATION</span>
              <h3 class="location-title-city">KUMUDAVALLI</h3>
              
              <address class="location-full-address">
                Palakoderu Rd,<br>
                Kumudavalli,<br>
                Andhra Pradesh 534210
              </address>
            </div>

            <!-- Direct Contact Points -->
            <div class="visit-contact-meta">
              <div class="meta-entry">
                <span class="meta-label">PHONE</span>
                <a href="tel:+919505077477" class="meta-value-link">+91 95050 77477</a>
              </div>
              <div class="meta-entry">
                <span class="meta-label">EMAIL</span>
                <a href="mailto:meenafoods@yahoo.com" class="meta-value-link">meenafoods@yahoo.com</a>
              </div>
            </div>

            <!-- Four Verified Interactive Actions with Real SVG Icons -->
            <div class="visit-actions-list" role="list">
              <!-- Action 1: Call -->
              <a href="tel:+919505077477" class="visit-action-link" role="listitem">
                <span class="action-left-group">
                  <img src="icons/phone.svg" alt="" class="action-icon-svg" aria-hidden="true" width="20" height="20" />
                  <span class="action-title">CALL</span>
                </span>
                <span class="action-arrow-wrap" aria-hidden="true">
                  <img src="icons/arrow.svg" alt="" class="action-arrow-svg" width="16" height="16" />
                </span>
              </a>

              <!-- Action 2: WhatsApp -->
              <a href="https://wa.me/919505077477" target="_blank" rel="noopener noreferrer" class="visit-action-link" role="listitem">
                <span class="action-left-group">
                  <img src="icons/whatsapp.svg" alt="" class="action-icon-svg" aria-hidden="true" width="20" height="20" />
                  <span class="action-title">WHATSAPP</span>
                </span>
                <span class="action-arrow-wrap" aria-hidden="true">
                  <img src="icons/arrow.svg" alt="" class="action-arrow-svg" width="16" height="16" />
                </span>
              </a>

              <!-- Action 3: Email -->
              <a href="mailto:meenafoods@yahoo.com" class="visit-action-link" role="listitem">
                <span class="action-left-group">
                  <img src="icons/email.svg" alt="" class="action-icon-svg" aria-hidden="true" width="20" height="20" />
                  <span class="action-title">EMAIL</span>
                </span>
                <span class="action-arrow-wrap" aria-hidden="true">
                  <img src="icons/arrow.svg" alt="" class="action-arrow-svg" width="16" height="16" />
                </span>
              </a>

              <!-- Action 4: Get Directions -->
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Meena+Foods+Palakoderu+Rd+Kumudavalli+Andhra+Pradesh+534210" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="visit-action-link highlight-action" 
                role="listitem"
              >
                <span class="action-left-group">
                  <img src="icons/location.svg" alt="" class="action-icon-svg" aria-hidden="true" width="20" height="20" />
                  <span class="action-title">GET DIRECTIONS</span>
                </span>
                <span class="action-arrow-wrap" aria-hidden="true">
                  <img src="icons/arrow.svg" alt="" class="action-arrow-svg" width="16" height="16" />
                </span>
              </a>
            </div>
          </div>
        </div>

        <!-- Section 06 Closing Statement -->
        <footer class="visit-closing-signoff">
          <p class="closing-signoff-motto">SEE YOU AT MEENA.</p>
          <div class="closing-signoff-place">
            <span>KUMUDAVALLI</span>
            <span class="signoff-sep" aria-hidden="true">·</span>
            <span>ANDHRA PRADESH</span>
          </div>
        </footer>
      </div>
    `;
  }
}
