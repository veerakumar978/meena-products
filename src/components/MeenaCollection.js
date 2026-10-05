/* ==========================================================================
   MEENA FOODS — SECTION 03: THE COLLECTION COMPONENT
   Refined 2x4 Equal Grid with Robust Category Filter Logic & Detail Modal
   ========================================================================== */

const PRODUCTS = [
  {
    file: "milk rusk.webp",
    category: "rusk",
    name: "MILK RUSK",
    label: "RUSK",
    desc: "Twice-baked traditional milk rusk with signature crunch and subtle sweetness, crafted for daily dipping."
  },
  {
    file: "famali bread.webp",
    category: "bread",
    name: "FAMILY BREAD",
    label: "BREAD",
    desc: "Traditional everyday sliced bread, lightly crusted with a soft, uniform crumb made for family breakfasts."
  },
  {
    file: "milk bread.webp",
    category: "bread",
    name: "MILK BREAD",
    label: "BREAD",
    desc: "Enriched soft table loaf with a tender golden crust, baked daily for morning toast and sandwiches."
  },
  {
    file: "crunchy rusk.webp",
    category: "rusk",
    name: "CRUNCHY RUSK",
    label: "RUSK",
    desc: "Golden-toasted crunchy rusk baked to a deep amber hue for a hearty, robust snap with evening chai."
  },
  {
    file: "tea bun.webp",
    category: "bun",
    name: "TEA BUN",
    label: "BUN",
    desc: "Pillowy soft baked sweet buns with a delicate golden glaze, an everyday teatime favourite across generations."
  },
  {
    file: "venilla rusk.webp",
    category: "rusk",
    name: "VENILLA RUSK",
    label: "RUSK",
    desc: "Fragrant twice-baked rusk infused with aromatic vanilla notes for a mellow, delicate crunch."
  },
  {
    file: "tea rusk.webp",
    category: "rusk",
    name: "TEA RUSK",
    label: "RUSK",
    desc: "Crisp, slender golden tea rusk baked for effortless dunking in hot cups of spiced Indian tea."
  },
  {
    file: "round bread.webp",
    category: "bread",
    name: "ROUND BREAD",
    label: "BREAD",
    desc: "Artisanal round bakery loaf with a hearty crust and wholesome texture, perfect for slicing and sharing."
  }
];

export class MeenaCollection {
  constructor(mountSelector = '#collection') {
    this.mount = typeof mountSelector === 'string'
      ? document.querySelector(mountSelector)
      : mountSelector;

    if (!this.mount) {
      console.warn(`[MeenaCollection] Mount element not found: ${mountSelector}`);
      return;
    }

    this.activeFilter = 'all';
    this.activeModalIndex = null;
    this.filteredProducts = [...PRODUCTS];

    this.render();
    this.cacheElements();
    this.initFilterEvents();
    this.initModalEvents();
  }

  render() {
    this.mount.innerHTML = `
      <div class="collection-inner-container">
        <!-- Section Header: Elegant & Compact -->
        <header class="collection-header-compact">
          <div class="collection-eyebrow-row">
            <span class="eyebrow-accent-line" aria-hidden="true"></span>
            <span class="eyebrow-accent-tag">03 / THE COLLECTION</span>
          </div>

          <h2 class="collection-headline-main">
            THE EVERYDAY<br>COLLECTION
          </h2>

          <p class="collection-supporting-text">
            Bread, rusk and bun — familiar favourites from Meena Foods.
          </p>
        </header>

        <!-- Category Filter: Editorial Text Navigation -->
        <nav class="collection-filter-bar" aria-label="Filter products by category">
          <div class="filter-links-wrapper">
            <button class="filter-item-btn active" data-filter="all" type="button" aria-pressed="true">
              <span>ALL</span>
            </button>
            <span class="filter-sep" aria-hidden="true">/</span>

            <button class="filter-item-btn" data-filter="bread" type="button" aria-pressed="false">
              <span>BREAD</span>
            </button>
            <span class="filter-sep" aria-hidden="true">/</span>

            <button class="filter-item-btn" data-filter="rusk" type="button" aria-pressed="false">
              <span>RUSK</span>
            </button>
            <span class="filter-sep" aria-hidden="true">/</span>

            <button class="filter-item-btn" data-filter="bun" type="button" aria-pressed="false">
              <span>BUN</span>
            </button>
          </div>
        </nav>

        <!-- Product Grid: Clean 2 Rows x 4 Columns (or Centered for Single Category) -->
        <div class="collection-grid-stage" id="collection-grid" role="region" aria-label="Product Catalogue">
          ${this.renderProductGridHtml(this.filteredProducts)}
        </div>

        <!-- Section 03 Compact End Leading Directly to Section 04 -->
        <footer class="collection-compact-footer">
          <p class="compact-footer-motto">MADE FOR EVERYDAY MOMENTS.</p>
          <div class="compact-footer-brand">
            <span>MEENA</span>
            <span class="dot-sep" aria-hidden="true">·</span>
            <span>SINCE 1942</span>
          </div>
        </footer>
      </div>

      <!-- Focused Product Lightbox / Editorial Overlay -->
      <div class="collection-modal-backdrop" id="collection-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Product Details">
        <div class="collection-modal-card">
          <button class="modal-dismiss-btn" id="modal-dismiss" type="button" aria-label="Close product view">
            <span>CLOSE</span>
            <span class="dismiss-cross" aria-hidden="true">×</span>
          </button>

          <div class="modal-dynamic-body" id="modal-content">
            <!-- Populated on click -->
          </div>
        </div>
      </div>
    `;
  }

  renderProductGridHtml(items) {
    const isSingle = items.length === 1;
    const gridClass = isSingle ? 'grid-layout single-item-view' : 'grid-layout standard-2x4';

    return `
      <div class="${gridClass}">
        ${items.map((prod) => {
          // Find original index in PRODUCTS for modal linking
          const originalIndex = PRODUCTS.findIndex(p => p.file === prod.file);
          return `
            <article 
              class="product-card-item ${isSingle ? 'is-centered-single' : ''}" 
              data-file="${prod.file}"
              data-index="${originalIndex}"
              tabindex="0"
              role="button"
              aria-label="View details of ${prod.name}"
            >
              <div class="product-card-media">
                <img 
                  src="products/${prod.file}" 
                  alt="Meena Foods ${prod.name}" 
                  class="product-card-img"
                  loading="lazy"
                  width="260"
                  height="260"
                />
                <span class="product-hover-arrow" aria-hidden="true">→</span>
              </div>

              <div class="product-card-caption">
                <span class="card-category-label">${prod.label}</span>
                <h3 class="card-product-name">
                  <span>${prod.name}</span>
                  <span class="name-arrow" aria-hidden="true">→</span>
                </h3>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    `;
  }

  cacheElements() {
    this.gridStage = this.mount.querySelector('#collection-grid');
    this.filterButtons = this.mount.querySelectorAll('.filter-item-btn');
    this.modalBackdrop = this.mount.querySelector('#collection-modal');
    this.modalDismiss = this.mount.querySelector('#modal-dismiss');
    this.modalContent = this.mount.querySelector('#modal-content');
  }

  initFilterEvents() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedFilter = btn.dataset.filter.trim().toLowerCase();
        if (selectedFilter === this.activeFilter) return;

        this.activeFilter = selectedFilter;

        this.filterButtons.forEach(b => {
          const isActive = b === btn;
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        this.applyFilter(selectedFilter);
      });
    });
  }

  applyFilter(filterKey) {
    const key = filterKey.trim().toLowerCase();

    if (key === 'all') {
      this.filteredProducts = [...PRODUCTS];
    } else {
      // Normalized category match
      this.filteredProducts = PRODUCTS.filter(p => p.category.trim().toLowerCase() === key);
    }

    if (this.gridStage) {
      this.gridStage.style.opacity = '0';
      this.gridStage.style.transform = 'translateY(8px)';

      setTimeout(() => {
        this.gridStage.innerHTML = this.renderProductGridHtml(this.filteredProducts);
        this.bindCardClicks();
        this.gridStage.style.opacity = '1';
        this.gridStage.style.transform = 'translateY(0)';
      }, 240);
    }
  }

  bindCardClicks() {
    const cards = this.mount.querySelectorAll('.product-card-item');
    cards.forEach(card => {
      const clickHandler = () => {
        const file = card.dataset.file;
        const idx = PRODUCTS.findIndex(p => p.file === file);
        if (idx !== -1) {
          this.openModal(idx);
        }
      };

      card.addEventListener('click', clickHandler);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          clickHandler();
        }
      });
    });
  }

  initModalEvents() {
    this.bindCardClicks();

    if (this.modalDismiss) {
      this.modalDismiss.addEventListener('click', () => this.closeModal());
    }

    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.modalBackdrop) {
          this.closeModal();
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (this.modalBackdrop && this.modalBackdrop.classList.contains('open')) {
        if (e.key === 'Escape') {
          this.closeModal();
        } else if (e.key === 'ArrowRight') {
          this.stepModal(1);
        } else if (e.key === 'ArrowLeft') {
          this.stepModal(-1);
        }
      }
    });
  }

  openModal(index) {
    this.activeModalIndex = index;
    const prod = PRODUCTS[index];
    if (!prod || !this.modalContent) return;

    this.modalContent.innerHTML = `
      <div class="modal-product-layout">
        <!-- LEFT: Uncropped Complete Packaging Image -->
        <div class="modal-left-media">
          <div class="modal-image-box">
            <img 
              src="products/${prod.file}" 
              alt="Meena Foods ${prod.name}" 
              class="modal-hero-pack-img"
              width="380"
              height="380"
            />
          </div>
          <span class="modal-seal-text">MEENA FOODS · ESTD 1942</span>
        </div>

        <!-- RIGHT: Clean Editorial Context -->
        <div class="modal-right-meta">
          <div class="modal-top-tag-row">
            <span class="modal-cat-badge">${prod.label}</span>
            <span class="modal-step-counter">${String(index + 1).padStart(2, '0')} / 08</span>
          </div>

          <h3 class="modal-title-heading">${prod.name}</h3>
          
          <p class="modal-description-copy">
            ${prod.desc}
          </p>

          <div class="modal-details-grid">
            <div class="detail-cell">
              <span class="detail-cell-lbl">TYPE</span>
              <span class="detail-cell-val">${prod.label}</span>
            </div>
            <div class="detail-cell">
              <span class="detail-cell-lbl">ORIGIN</span>
              <span class="detail-cell-val">KUMUDAVALLI</span>
            </div>
            <div class="detail-cell">
              <span class="detail-cell-lbl">HERITAGE</span>
              <span class="detail-cell-val">SINCE 1942</span>
            </div>
          </div>

          <div class="modal-nav-actions">
            <button class="modal-prev-step-btn" id="modal-prev-action" type="button" aria-label="Previous product">
              <span class="action-arrow">←</span>
              <span>PREV</span>
            </button>
            <button class="modal-next-step-btn" id="modal-next-action" type="button" aria-label="Next product">
              <span>NEXT</span>
              <span class="action-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const prevBtn = this.modalContent.querySelector('#modal-prev-action');
    const nextBtn = this.modalContent.querySelector('#modal-next-action');

    if (prevBtn) prevBtn.addEventListener('click', () => this.stepModal(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => this.stepModal(1));

    this.modalBackdrop.classList.add('open');
    this.modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modalBackdrop) return;
    this.modalBackdrop.classList.remove('open');
    this.modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  stepModal(direction) {
    if (this.activeModalIndex === null) return;
    const nextIndex = (this.activeModalIndex + direction + PRODUCTS.length) % PRODUCTS.length;
    this.openModal(nextIndex);
  }
}
