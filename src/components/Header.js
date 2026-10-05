/* ==========================================================================
   MEENA FOODS — HEADER COMPONENT
   Prominent heritage brand logo & adaptive navigation
   ========================================================================== */

export class Header {
  constructor(mountSelector = '#header-mount') {
    this.mount = typeof mountSelector === 'string'
      ? document.querySelector(mountSelector)
      : mountSelector;

    if (!this.mount) {
      console.warn(`[Header] Mount element not found: ${mountSelector}`);
      return;
    }

    this.isMenuOpen = false;
    this.render();
    this.initEvents();
  }

  render() {
    this.mount.innerHTML = `
      <header class="site-header" id="site-header" role="banner">
        <div class="header-container">
          <!-- Prominent Brand Logo (Left) -->
          <a href="#home" class="header-brand" aria-label="Meena Foods — Since 1942">
            <img 
              src="brand/logo.webp" 
              alt="Meena Foods" 
              class="header-logo-img"
              width="347"
              height="106"
              loading="eager"
            />
          </a>

          <!-- Desktop Navigation (Right) -->
          <nav class="header-nav" role="navigation" aria-label="Main Navigation">
            <ul class="nav-links">
              <li><a href="#brand" class="nav-link">Brand</a></li>
              <li><a href="#moments" class="nav-link">Moments</a></li>
              <li><a href="#collection" class="nav-link">Collection</a></li>
              <li><a href="#making" class="nav-link">Making</a></li>
              <li><a href="#visit" class="nav-link">Visit</a></li>
            </ul>

            <!-- 1942 Heritage Mark -->
            <div class="header-heritage" aria-label="Established 1942">
              <span class="heritage-year">1942</span>
              <span class="heritage-dot" aria-hidden="true"></span>
            </div>
          </nav>

          <!-- Mobile Hamburger Toggle -->
          <button 
            class="mobile-nav-toggle" 
            id="mobile-nav-toggle" 
            type="button" 
            aria-label="Toggle navigation menu"
            aria-expanded="false"
            aria-controls="mobile-nav-overlay"
          >
            <span class="toggle-line" aria-hidden="true"></span>
            <span class="toggle-line" aria-hidden="true"></span>
          </button>
        </div>

        <!-- Mobile Navigation Overlay -->
        <div class="mobile-nav-overlay" id="mobile-nav-overlay" aria-hidden="true">
          <ul class="mobile-nav-links">
            <li><a href="#home" class="mobile-nav-link">Home</a></li>
            <li><a href="#brand" class="mobile-nav-link">Brand</a></li>
            <li><a href="#moments" class="mobile-nav-link">Moments</a></li>
            <li><a href="#collection" class="mobile-nav-link">Collection</a></li>
            <li><a href="#making" class="mobile-nav-link">Making</a></li>
            <li><a href="#visit" class="mobile-nav-link">Visit</a></li>
          </ul>

          <div class="mobile-heritage-footer">
            <span>SINCE 1942</span>
            <span>KUMUDAVALLI · BHIMAVARAM</span>
          </div>
        </div>
      </header>
    `;

    this.headerEl = this.mount.querySelector('.site-header');
    this.toggleBtn = this.mount.querySelector('#mobile-nav-toggle');
    this.overlayEl = this.mount.querySelector('#mobile-nav-overlay');
  }

  initEvents() {
    // Scroll listener for sticky header background blur
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        this.headerEl.classList.add('scrolled');
      } else {
        this.headerEl.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile menu toggle
    if (this.toggleBtn && this.overlayEl) {
      this.toggleBtn.addEventListener('click', () => this.toggleMobileMenu());

      this.overlayEl.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => this.closeMobileMenu());
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isMenuOpen) {
          this.closeMobileMenu();
        }
      });
    }
  }

  toggleMobileMenu() {
    this.isMenuOpen ? this.closeMobileMenu() : this.openMobileMenu();
  }

  openMobileMenu() {
    this.isMenuOpen = true;
    this.toggleBtn.classList.add('open');
    this.toggleBtn.setAttribute('aria-expanded', 'true');
    this.overlayEl.classList.add('open');
    this.overlayEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.toggleBtn.classList.remove('open');
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    this.overlayEl.classList.remove('open');
    this.overlayEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}
