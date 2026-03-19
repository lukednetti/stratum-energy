'use client'

import { useState, useEffect, useRef, Fragment } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type SpecItem = { value: string; label: string }
type ProductFeature = { heading: string; body: string }
type ProcessCard = { title: string; body: string }
type ProofStat = { value: string; label: string }

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// Render a string that uses \n as line breaks into JSX with <br />
function multiLine(text: string) {
  return text.split('\n').map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ))
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULTS = {
  heroTag: 'Modular Battery Storage',
  heroHeadlineLines: ['Reliable power for facilities', "that can't afford downtime"],
  heroSub:
    'Stratum Energy builds modular battery storage systems for mid-size manufacturers — scalable, simple to install, and built to grow with your operation.',
  heroSpecs: [
    { value: '50kWh', label: 'Per Module' },
    { value: '2-Day', label: 'Installation' },
    { value: '140+', label: 'Facilities Deployed' },
    { value: '22%', label: 'Avg. Cost Reduction' },
    { value: '3.5 Yrs', label: 'Avg. Payback Period' },
  ],
  problemTag: 'The Challenge',
  problemHeadline:
    "Your facility runs on tight margins. Your power supply shouldn't add to the risk.",
  problemP1:
    "Grid instability, rising energy costs, and the threat of unplanned downtime aren't new problems — but they're getting harder to ignore. Most storage solutions on the market are built for homes or utilities. If you're running a mid-size manufacturing facility, neither one fits.",
  problemP2:
    'Stratum was built for the middle — facilities large enough to need serious power backup, but lean enough to need it to actually make sense financially.',
  productTag: 'The S-Series',
  productHeadline: 'Modular by design,\nbuilt for the long run.',
  productBody:
    'The Stratum S-Series is a stackable battery storage system that installs in two days and scales as your operation grows.',
  productFeatures: [
    {
      heading: 'Scale without starting over.',
      body: "Each S-Series module delivers 50kWh of storage and stacks directly onto your existing system. As your facility grows or energy demands shift, add capacity in hours — not weeks.",
    },
    {
      heading: 'Installed in two days, not two months.',
      body: "The S-Series arrives pre-configured and ready to connect. Our deployment team handles permitting, integration, and commissioning. Most facilities are fully operational within 48 hours of delivery.",
    },
    {
      heading: 'Monitored around the clock with StratumOS.',
      body: "Every system ships with our cloud-based dashboard — included, not upsold. Your facility manager gets real-time visibility into power consumption, battery health, and projected savings.",
    },
  ],
  processTag: 'How It Works',
  processHeadline: 'Simple to understand.\nSimpler to operate.',
  processCards: [
    {
      title: 'Assess',
      body: "We start with a facility walkthrough and energy audit. You'll know exactly what you need before you commit to anything.",
    },
    {
      title: 'Install',
      body: 'Our team handles the full installation in two days with minimal disruption to your production schedule.',
    },
    {
      title: 'Monitor',
      body: "StratumOS gives you a live view of your system's performance from any device. We handle the maintenance. You focus on running your facility.",
    },
  ],
  proofTag: 'Proof',
  proofHeadline: 'The numbers speak\nfor themselves.',
  proofStats: [
    { value: '22%', label: 'Avg. energy cost reduction in year one' },
    { value: '99.4%', label: 'System uptime across all deployments' },
    { value: '3.5 Yrs', label: 'Typical payback period' },
    { value: '140+', label: 'Facilities deployed across North America' },
  ],
  audienceHeadline: 'Built for operations leaders\nwho think long-term.',
  audienceBody:
    "Stratum works best for operations directors and facility managers at mid-size manufacturers — food processing, electronics assembly, auto parts, cold storage, and distribution. If you're responsible for keeping a facility running and you're tired of energy costs eating into your margins, we should talk.",
  osTag: 'StratumOS',
  osHeadline: 'Full visibility into your\nenergy performance.',
  osBody:
    "Every Stratum system ships with StratumOS — a cloud-based monitoring platform that gives your facility manager real-time insight into power consumption, battery health, and projected savings. No extra cost, no upsell. Just a clear picture of what your system is doing and why it matters.",
  ctaHeadline: 'Get Started',
  footerTagline: "Reliable power for facilities that can't afford downtime.",
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeClient() {
  const {
    heroTag,
    heroHeadlineLines,
    heroSub,
    heroSpecs,
    problemTag,
    problemHeadline,
    problemP1,
    problemP2,
    productTag,
    productHeadline,
    productBody,
    productFeatures,
    processTag,
    processHeadline,
    processCards,
    proofTag,
    proofHeadline,
    proofStats,
    audienceHeadline,
    audienceBody,
    osTag,
    osHeadline,
    osBody,
    ctaHeadline,
    footerTagline,
  } = DEFAULTS

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
              {heroTag}
            </p>
            <h1 className="hero__headline">
              {heroHeadlineLines.map((line, i) => (
                <span
                  key={i}
                  className="hero-anim"
                  style={{ '--i': i + 1 } as React.CSSProperties}
                >
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero__sub hero-anim" style={{ '--i': 3 } as React.CSSProperties}>
              {heroSub}
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
            {heroSpecs.map((spec, i) => (
              <Fragment key={i}>
                {i > 0 && <div className="spec-divider"></div>}
                <div className="spec-item">
                  <span className="spec-item__value">{spec.value}</span>
                  <span className="spec-item__label">{spec.label}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="problem">
        <div className="problem__grid grid-12">
          <div className="problem__left">
            <p className="title-tag problem__tag">
              <span className="title-tag__dot"></span>
              {problemTag}
            </p>
            <h2 className="problem__headline">{problemHeadline}</h2>
          </div>
          <div className="problem__right">
            <p className="problem__p1">{problemP1}</p>
            <p className="problem__p2">{problemP2}</p>
          </div>
          <div className="problem__rule"></div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section className="product" id="product">
        <div className="product__header">
          <p className="title-tag">
            <span className="title-tag__dot"></span>
            {productTag}
          </p>
          <h2 className="product__headline">{multiLine(productHeadline)}</h2>
          <p className="product__body">{productBody}</p>
        </div>
        <div className="product__image">
          <img src="/Images/product-section.png" alt="Stratum S-Series modular battery system" />
        </div>
        <div className="product__features">
          {productFeatures.map((feature, i) => (
            <div key={i} className="product__feature">
              <p>
                <strong className="product__feature-heading">{feature.heading}</strong>{' '}
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="process" id="how-it-works">
        <div className="process__header">
          <div className="process__header-left">
            <p className="title-tag process__tag">
              <span className="title-tag__dot"></span>
              {processTag}
            </p>
            <h2 className="process__headline">{multiLine(processHeadline)}</h2>
          </div>
          <a href="#contact" className="btn btn--dark process__cta-btn">
            Talk to an Expert
            <i className="ph ph-arrow-right"></i>
          </a>
        </div>
        <div className="process__steps">
          {processCards.map((card, i) => (
            <div key={i} className="process__card">
              <div className="process__image">
                <img src={`/Images/card-${i + 1}.png`} alt={card.title} />
              </div>
              <div className="process__copy">
                <h3 className="process__step-title">{card.title}</h3>
                <p className="process__step-body">{card.body}</p>
              </div>
            </div>
          ))}
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
                {proofTag}
              </p>
              <h2 className="proof__headline">{multiLine(proofHeadline)}</h2>
            </div>
            <div className="proof__stats">
              {proofStats.map((stat, i) => (
                <div key={i} className="proof__stat">
                  <span className="proof__value">{stat.value}</span>
                  <p className="proof__label">{stat.label}</p>
                </div>
              ))}
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
          <h2 className="audience__headline">{multiLine(audienceHeadline)}</h2>
          <p className="audience__body">{audienceBody}</p>
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
              {osTag}
            </p>
            <h2 className="os__headline">{multiLine(osHeadline)}</h2>
            <p className="os__body">{osBody}</p>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="cta" id="contact">
        <div className="cta__inner">
          <h2 className="cta__headline">{ctaHeadline}</h2>
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
              <p className="footer__tagline">{footerTagline}</p>
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
