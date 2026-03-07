'use client'

import { useState, useEffect, useRef } from 'react'

function parseVal(text: string) {
  const t = text.trim()
  const num = parseFloat(t.replace(/[^0-9.]/g, ''))
  const prefix = t.match(/^[^0-9.]*/)?.[0] ?? ''
  const suffix = t.replace(/^[^0-9.]*[0-9.]+/, '')
  const decimals = t.includes('.')
    ? (t.split('.')[1].match(/[0-9]+/) ?? [''])[0].length
    : 0
  return { num, prefix, suffix, decimals }
}

function countUp(
  el: Element,
  { num, prefix, suffix, decimals }: ReturnType<typeof parseVal>,
  duration = 1600
) {
  const start = performance.now()
  const ease = (t: number) => 1 - Math.pow(1 - t, 4)
  function tick(now: number) {
    const t = Math.min((now - start) / duration, 1)
    el.textContent = prefix + (ease(t) * num).toFixed(decimals) + suffix
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const heroCtaRef = useRef<HTMLAnchorElement>(null)

  // Nav scroll + CTA visibility
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      if (heroCtaRef.current) {
        setCtaVisible(heroCtaRef.current.getBoundingClientRect().bottom < 0)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body scroll lock while drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  // Scroll-driven animations
  useEffect(() => {
    // Spec strip count-up
    const specStrip = document.querySelector('.hero__spec-strip')
    if (specStrip) {
      const values = specStrip.querySelectorAll('.spec-item__value')
      let animated = false
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !animated) {
          animated = true
          values.forEach(el => {
            const parsed = parseVal(el.textContent ?? '')
            if (!isNaN(parsed.num)) {
              el.textContent = parsed.prefix + (0).toFixed(parsed.decimals) + parsed.suffix
              countUp(el, parsed)
            }
          })
        }
      }, { threshold: 0.5 })
      obs.observe(specStrip)
    }

    // Product image unmask
    const productWrapper = document.querySelector('.product__image') as HTMLElement | null
    if (productWrapper) {
      productWrapper.style.position = 'relative'
      productWrapper.style.overflow = 'hidden'
      const mask = document.createElement('div')
      mask.style.cssText = `
        position: absolute; inset: 0; z-index: 2;
        background: var(--bg);
        transform: translateY(0);
        transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      `
      productWrapper.appendChild(mask)
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          mask.style.transform = 'translateY(-100%)'
          obs.unobserve(productWrapper)
        }
      }, { threshold: 0.1 })
      obs.observe(productWrapper)
    }

    // Proof count-up
    const proofSection = document.querySelector('.proof')
    if (proofSection) {
      const values = proofSection.querySelectorAll('.proof__value')
      let animated = false
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !animated) {
          animated = true
          values.forEach(el => {
            const parsed = parseVal(el.textContent ?? '')
            if (!isNaN(parsed.num)) {
              el.textContent = parsed.prefix + (0).toFixed(parsed.decimals) + parsed.suffix
              countUp(el, parsed)
            }
          })
        }
      }, { threshold: 0.3 })
      obs.observe(proofSection)
    }

    // Proof image unmask
    const proofRight = document.querySelector('.proof__right') as HTMLElement | null
    if (proofRight) {
      proofRight.style.position = 'relative'
      const mask = document.createElement('div')
      mask.style.cssText = `
        position: absolute; inset: 0; z-index: 2;
        background: #ffffff;
        transform: translateX(0);
        transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      `
      proofRight.appendChild(mask)
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          mask.style.transform = 'translateX(100%)'
          obs.unobserve(proofRight)
        }
      }, { threshold: 0.1 })
      obs.observe(proofRight)
    }

    // How It Works stagger (desktop only)
    let removeStagger: (() => void) | undefined
    if (window.innerWidth > 860) {
      const section = document.querySelector('.process')
      const cards = document.querySelectorAll('.process__card') as NodeListOf<HTMLElement>
      cards.forEach(card => { card.style.transform = 'translateY(120px)' })
      const onScroll = () => {
        if (!section) return
        const rect = section.getBoundingClientRect()
        const sectionMiddle = rect.top + rect.height / 2
        const progress = 1 - sectionMiddle / window.innerHeight
        cards.forEach((card, i) => {
          const threshold = 0.05 + i * 0.1
          const p = Math.min(Math.max((progress - threshold) / 0.35, 0), 1)
          card.style.transform = `translateY(${120 * (1 - p)}px)`
        })
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      removeStagger = () => window.removeEventListener('scroll', onScroll)
    }

    return () => removeStagger?.()
  }, [])

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      {/* NAV */}
      <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="/" className="nav__logo">
            <img src="/Images/white-logo.png" alt="Stratum Energy" />
          </a>
          <nav className="nav__links">
            <a href="#product">Product</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About</a>
            <a href="#contact" className={`nav__cta${ctaVisible ? ' nav__cta--visible' : ''}`}>
              Talk to an Expert
            </a>
          </nav>
          <button
            className="nav__hamburger"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <i className="ph ph-list"></i>
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`nav__overlay${drawerOpen ? ' nav__overlay--visible' : ''}`}
        aria-hidden="true"
        onClick={closeDrawer}
      />
      <div
        className={`nav__drawer${drawerOpen ? ' nav__drawer--open' : ''}`}
        aria-hidden={drawerOpen ? 'false' : 'true'}
      >
        <button className="nav__drawer-close" aria-label="Close menu" onClick={closeDrawer}>
          <i className="ph ph-x"></i>
        </button>
        <nav className="nav__drawer-links">
          <a href="#product" onClick={closeDrawer}>Product</a>
          <a href="#how-it-works" onClick={closeDrawer}>How It Works</a>
          <a href="#about" onClick={closeDrawer}>About</a>
          <a href="#contact" className="nav__drawer-cta" onClick={closeDrawer}>
            Talk to an Expert <i className="ph ph-arrow-right"></i>
          </a>
        </nav>
      </div>

      {/* HERO */}
      <section className="hero">
        <img className="hero__bg" src="/Images/hero-bg.png" alt="" />
        <div className="hero__overlay"></div>
        <div className="hero__copy-panel">
          <div className="hero__content">
            <p className="title-tag hero-anim" style={{ '--i': 0 } as React.CSSProperties}>
              <span className="title-tag__dot"></span>
              Modular Battery Storage
            </p>
            <h1 className="hero__headline">
              <span className="hero-anim" style={{ '--i': 1 } as React.CSSProperties}>Reliable power for facilities</span>
              <span className="hero-anim" style={{ '--i': 2 } as React.CSSProperties}>that can&apos;t afford downtime</span>
            </h1>
            <p className="hero__sub hero-anim" style={{ '--i': 3 } as React.CSSProperties}>
              Stratum Energy builds modular battery storage systems for mid-size manufacturers — scalable, simple to install, and built to grow with your operation.
            </p>
            <div className="hero__actions hero-anim" style={{ '--i': 4 } as React.CSSProperties}>
              <a href="#contact" className="btn btn--primary" ref={heroCtaRef}>
                Talk to an Expert
                <i className="ph ph-arrow-right"></i>
              </a>
              <a href="#how-it-works" className="hero__link">
                See how it works
                <i className="ph ph-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="hero__spec-strip">
          <div className="hero__spec-inner">
            <div className="spec-item">
              <span className="spec-item__value">50kWh</span>
              <span className="spec-item__label">Per Module</span>
            </div>
            <div className="spec-divider"></div>
            <div className="spec-item">
              <span className="spec-item__value">2-Day</span>
              <span className="spec-item__label">Installation</span>
            </div>
            <div className="spec-divider"></div>
            <div className="spec-item">
              <span className="spec-item__value">140+</span>
              <span className="spec-item__label">Facilities Deployed</span>
            </div>
            <div className="spec-divider"></div>
            <div className="spec-item">
              <span className="spec-item__value">22%</span>
              <span className="spec-item__label">Avg. Cost Reduction</span>
            </div>
            <div className="spec-divider"></div>
            <div className="spec-item">
              <span className="spec-item__value">3.5 Yrs</span>
              <span className="spec-item__label">Avg. Payback Period</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="problem">
        <div className="problem__grid grid-12">
          <div className="problem__left">
            <p className="title-tag problem__tag">
              <span className="title-tag__dot"></span>
              The Challenge
            </p>
            <h2 className="problem__headline">
              Your facility runs on tight margins. Your power supply shouldn&apos;t add to the risk.
            </h2>
          </div>
          <div className="problem__right">
            <p className="problem__p1">
              Grid instability, rising energy costs, and the threat of unplanned downtime aren&apos;t new problems — but they&apos;re getting harder to ignore. Most storage solutions on the market are built for homes or utilities. If you&apos;re running a mid-size manufacturing facility, neither one fits.
            </p>
            <p className="problem__p2">
              Stratum was built for the middle — facilities large enough to need serious power backup, but lean enough to need it to actually make sense financially.
            </p>
          </div>
          <div className="problem__rule"></div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section className="product" id="product">
        <div className="product__header">
          <p className="title-tag">
            <span className="title-tag__dot"></span>
            The S-Series
          </p>
          <h2 className="product__headline">
            Modular by design,<br />built for the long run.
          </h2>
          <p className="product__body">
            The Stratum S-Series is a stackable battery storage system that installs in two days and scales as your operation grows.
          </p>
        </div>
        <div className="product__image">
          <img src="/Images/product-section.png" alt="Stratum S-Series modular battery system" />
        </div>
        <div className="product__features">
          <div className="product__feature">
            <p><strong className="product__feature-heading">Scale without starting over.</strong> Each S-Series module delivers 50kWh of storage and stacks directly onto your existing system. As your facility grows or energy demands shift, add capacity in hours — not weeks.</p>
          </div>
          <div className="product__feature">
            <p><strong className="product__feature-heading">Installed in two days, not two months.</strong> The S-Series arrives pre-configured and ready to connect. Our deployment team handles permitting, integration, and commissioning. Most facilities are fully operational within 48 hours of delivery.</p>
          </div>
          <div className="product__feature">
            <p><strong className="product__feature-heading">Monitored around the clock with StratumOS.</strong> Every system ships with our cloud-based dashboard — included, not upsold. Your facility manager gets real-time visibility into power consumption, battery health, and projected savings.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="process" id="how-it-works">
        <div className="process__header">
          <div className="process__header-left">
            <p className="title-tag process__tag">
              <span className="title-tag__dot"></span>
              How It Works
            </p>
            <h2 className="process__headline">
              Simple to understand.<br />Simpler to operate.
            </h2>
          </div>
          <a href="#contact" className="btn btn--dark process__cta-btn">
            Talk to an Expert
            <i className="ph ph-arrow-right"></i>
          </a>
        </div>
        <div className="process__steps">
          <div className="process__card">
            <div className="process__image">
              <img src="/Images/card-1.png" alt="Facility assessment" />
            </div>
            <div className="process__copy">
              <h3 className="process__step-title">Assess</h3>
              <p className="process__step-body">We start with a facility walkthrough and energy audit. You&apos;ll know exactly what you need before you commit to anything.</p>
            </div>
          </div>
          <div className="process__card">
            <div className="process__image">
              <img src="/Images/card-2.png" alt="System installation" />
            </div>
            <div className="process__copy">
              <h3 className="process__step-title">Install</h3>
              <p className="process__step-body">Our team handles the full installation in two days with minimal disruption to your production schedule.</p>
            </div>
          </div>
          <div className="process__card">
            <div className="process__image">
              <img src="/Images/card-3.png" alt="System monitoring" />
            </div>
            <div className="process__copy">
              <h3 className="process__step-title">Monitor</h3>
              <p className="process__step-body">StratumOS gives you a live view of your system&apos;s performance from any device. We handle the maintenance. You focus on running your facility.</p>
            </div>
          </div>
        </div>
        <div className="process__footer-cta">
          <a href="#contact" className="btn btn--dark">
            Talk to an Expert
            <i className="ph ph-arrow-right"></i>
          </a>
        </div>
      </section>

      {/* PROOF / NUMBERS */}
      <section className="proof">
        <div className="proof__inner">
          <div className="proof__left">
            <div className="proof__header">
              <p className="title-tag proof__tag">
                <span className="title-tag__dot"></span>
                Proof
              </p>
              <h2 className="proof__headline">The numbers speak<br />for themselves.</h2>
            </div>
            <div className="proof__stats">
              <div className="proof__stat">
                <span className="proof__value">22%</span>
                <p className="proof__label">Avg. energy cost reduction in year one</p>
              </div>
              <div className="proof__stat">
                <span className="proof__value">99.4%</span>
                <p className="proof__label">System uptime across all deployments</p>
              </div>
              <div className="proof__stat">
                <span className="proof__value">3.5 Yrs</span>
                <p className="proof__label">Typical payback period</p>
              </div>
              <div className="proof__stat">
                <span className="proof__value">140+</span>
                <p className="proof__label">Facilities deployed across North America</p>
              </div>
            </div>
          </div>
          <div className="proof__right">
            <div className="proof__img-wrap">
              <img src="/Images/woman-staring.png" alt="Operations leader reviewing facility performance" />
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="audience" id="about">
        <div className="audience__inner">
          <h2 className="audience__headline">Built for operations leaders<br />who think long-term.</h2>
          <p className="audience__body">Stratum works best for operations directors and facility managers at mid-size manufacturers — food processing, electronics assembly, auto parts, cold storage, and distribution. If you&apos;re responsible for keeping a facility running and you&apos;re tired of energy costs eating into your margins, we should talk.</p>
        </div>
        <div className="audience__bg">
          <img src="/Images/stratum-blueprint.png" alt="" />
        </div>
      </section>

      {/* STRATUM OS */}
      <section className="os">
        <div className="os__inner">
          <div className="os__left">
            <img className="os__dashboard" src="/Images/dashboard.png" alt="StratumOS dashboard interface" />
          </div>
          <div className="os__right">
            <p className="title-tag os__tag">
              <span className="title-tag__dot"></span>
              StratumOS
            </p>
            <h2 className="os__headline">Full visibility into your<br />energy performance.</h2>
            <p className="os__body">Every Stratum system ships with StratumOS — a cloud-based monitoring platform that gives your facility manager real-time insight into power consumption, battery health, and projected savings. No extra cost, no upsell. Just a clear picture of what your system is doing and why it matters.</p>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="cta" id="contact">
        <div className="cta__inner">
          <h2 className="cta__headline">Get Started</h2>
          <a href="#" className="btn btn--dark">
            Talk to an Expert
            <i className="ph ph-arrow-right"></i>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__top">
            <div className="footer__brand">
              <img src="/Images/white-logo.png" alt="Stratum Energy" className="footer__logo" />
              <p className="footer__tagline">Reliable power for facilities that can&apos;t afford downtime.</p>
            </div>
            <div className="footer__links">
              <div className="footer__col">
                <h4 className="footer__col-title">Product</h4>
                <a href="#">S-Series</a>
                <a href="#">StratumOS</a>
                <a href="#">Pricing</a>
              </div>
              <div className="footer__col">
                <h4 className="footer__col-title">Company</h4>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
              <div className="footer__col">
                <h4 className="footer__col-title">Resources</h4>
                <a href="#">Case Studies</a>
                <a href="#">Documentation</a>
                <a href="#">Support</a>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copy">&copy; 2026 Stratum Energy. All rights reserved.</p>
            <div className="footer__legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
