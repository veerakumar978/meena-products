/* ==========================================================================
   MEENA FOODS — MASTER APPLICATION ENTRYPOINT
   Continuous Heritage Brand Experience: Section 00, 01 & 02
   ========================================================================== */

import { Header } from './components/Header.js';
import { VideoHero } from './components/VideoHero.js';
import { BrandHero } from './components/BrandHero.js';
import { MeenaTable } from './components/MeenaTable.js';
import { MeenaCollection } from './components/MeenaCollection.js';
import { MeenaMaking } from './components/MeenaMaking.js';
import { MeenaMoments } from './components/MeenaMoments.js';
import { MeenaVisit } from './components/MeenaVisit.js';
import { MeenaMemory } from './components/MeenaMemory.js';

// Prevent unwanted scroll restore on fresh reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

class MeenaApp {
  constructor() {
    this.init();
  }

  init() {
    // Mount Section 00 Header
    this.header = new Header('#header-mount');

    // Mount Section 00: New Full-Background Meena Product Video Experience
    this.videoHero = new VideoHero('#video-hero-mount');

    // Mount Section 01: The Name On Every Pack (Reused Section 00 Composition)
    this.brandHero = new BrandHero('#brand-hero-mount');

    // Mount Section 02: The Meena Table ("Everyday Moments")
    this.meenaTable = new MeenaTable('#moments');

    // Mount Section 03: The Collection ("Everyday Has A Favourite")
    this.collection = new MeenaCollection('#collection');

    // Mount Section 04: The Making ("From Mix to Memory")
    this.making = new MeenaMaking('#making');

    // Mount Section 05: The Moments ("Made For Everyday" Video Gallery)
    this.moments = new MeenaMoments('#moments-gallery');

    // Mount Section 06: Visit Meena (Physical Destination Experience)
    this.visit = new MeenaVisit('#visit');

    // Mount Section 07: Final Memory & Subtle Functional Footer
    this.memory = new MeenaMemory('#memory');

    console.log(
      '%c✦ MEENA FOODS · SINCE 1942 ✦',
      'color: #EB1822; font-weight: bold; font-size: 16px; font-family: serif;'
    );
    console.log(
      '%cSections 00 to 07 — Complete Production Heritage Brand Film Experience Ready',
      'color: #2B211B; font-weight: bold;'
    );
  }
}

// Bootstrap application once DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new MeenaApp());
} else {
  new MeenaApp();
}
