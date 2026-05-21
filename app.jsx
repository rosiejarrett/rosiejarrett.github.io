/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSelect, TweakColor, HeroScene, IntellicareMock, ConverseMock, OneDataConnectMock, OpenLMISMock */
const { useEffect, useRef, useState, useMemo } = React;

/* ────────────────────────────────────────────────────────────
   APP SHELL
   ──────────────────────────────────────────────────────────── */

function Logo({ light = false }) {
  return (
    <a href="#hero" className={`nav-logo ${light ? '' : ''}`} aria-label="Dure Technologies">
      <img src={window.__resources?.dureIcon || "dure-icon.png"} alt="Dure" className="nav-logo-img" />
      <span className="nav-logo-text">Dure Technologies</span>
    </a>);

}

function Nav({ activeSection, light, onCTA }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // Close the mobile menu when the viewport grows past the breakpoint
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 880) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  // Lock body scroll while the menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${light ? 'light' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <Logo />
      <div className="nav-links">
        <a href="#hero" className={activeSection === 'hero' ? 'active' : ''} onClick={close}>Overview</a>
        <a href="#response" className={activeSection === 'response' ? 'active' : ''} onClick={close}>Response</a>
        <a href="#platforms" className={activeSection === 'platforms' ? 'active' : ''} onClick={close}>Platforms</a>
        <a href="#partners" onClick={close}>Partners</a>
        <button className="nav-cta nav-cta-mobile" onClick={() => { close(); onCTA(); }}>Request a briefing</button>
      </div>
      <button className="nav-cta nav-cta-desktop" onClick={onCTA}>Request a briefing</button>
      <button
        className="nav-burger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>);

}

/* ────────────────────────────────────────────────────────────
   HERO
   ──────────────────────────────────────────────────────────── */

function Hero({ variant, onCTA }) {
  return (
    <section id="hero" className="hero" data-screen-label="01 Hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <h1>
            Stopping <span className="accent">Ebola</span> begins with <span className="underline-accent">connected data</span>.
          </h1>
          <p className="hero-sub">Dure Technologies is launching a comprehensive package to help countries respond to disease outbreaks and public health crises. Our solution brings together real-time signal reporting, actionable outbreak data, community support tools, and strengthened access to medicines. As part of our CSR initiative, Dure is proud to support any country ready to respond.

          </p>
          <div className="hero-cta-row">
            <button className="btn-primary" onClick={onCTA}>Explore the platforms</button>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-label">Countries deployed</div>
              <div className="hero-stat-value"><span className="accent">50+</span></div>
            </div>
            <div>
              <div className="hero-stat-label">Years of public-health partnership</div>
              <div className="hero-stat-value">18</div>
            </div>
          </div>
        </div>
        <div className="hero-scene">
          <HeroScene variant={variant} />
        </div>
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────
   INTRO — SOCIAL RESPONSIBILITY
   ──────────────────────────────────────────────────────────── */

function Intro() {
  return (
    <section id="response" className="intro" data-screen-label="02 Response">
      <div className="intro-inner">
        <div className="intro-head">
          <div className="intro-label">Our responsibility</div>
          <h2>
            A coordinated response is a <span className="em">prepared</span> response.
          </h2>
          <IntroMapGraphic />
        </div>
        <div className="intro-lede-wrap">
          <div className="intro-lead">
            <p>For nearly two decades, Dure Technologies has built the digital backbone that public-health authorities use to find disease earlier and act faster. Dure had supported multiple countries through pandemic responses including COVID, MPOX and Rift Virus.

            </p>
            <p>In response, we have brought three of our platforms together into a single Ebola response stack; purpose-configured for outbreak settings, deployable in country, and interoperable with DHIS2, national EHRs, and the WHO Emergency Operations workflow.

            </p>
          </div>
          <div className="platform-trio">
            <PlatformMini name={<><span className="product-name">Intellicare</span> for Ebola</>} desc="AI plugin for EHRs — surfaces Ebola risk from the consult itself." />
            <PlatformMini name={<><span className="product-name">Converse</span> for Ebola</>} desc="WhatsApp-native risk communication, rumour management, triage." />
            <PlatformMini name={<span className="product-name">OneDataConnect</span>} desc="Outbreak situation room — fragmented data, unified view." />
            <PlatformMini name="OpenLMIS" desc="Real-time stockout monitoring across response facilities." />
          </div>
        </div>
      </div>
    </section>);

}

/* Decorative world map for the Intro section — uploaded asset. */
function IntroMapGraphic() {
  return (
    <div className="intro-bg-map" aria-hidden="true">
      <img
        src={window.__resources?.worldMap || "world-map-dots.png"}
        alt=""
        className="intro-bg-map-img" />

      <div className="intro-bg-map-marker">
        <span className="imap-marker-dot"></span>
        <span className="imap-marker-pulse"></span>
        <span className="imap-marker-label">DRC</span>
      </div>
    </div>);

}

function PlatformMini({ name, desc }) {
  return (
    <div className="platform-mini">
      <div className="pm-row">
        <span className="pm-dot"></span>
        <span className="pm-name">{name}</span>
      </div>
      <p className="pm-desc">{desc}</p>
    </div>);

}

/* ────────────────────────────────────────────────────────────
   SCROLLYTELLING OFFERINGS
   ──────────────────────────────────────────────────────────── */

/* Auto-play a 0→1 progress loop while the element is in viewport.
   Pauses (preserves position) when off-screen so multiple demos can co-exist. */
function useAutoPlay(ref, durationMs = 9000) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf;
    let startedAt = null;
    let accumulated = 0;
    let lastInView = false;

    const isInView = () => {
      if (!ref.current) return false;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // visible if any vertical overlap with viewport (use a forgiving threshold)
      return r.bottom > 60 && r.top < vh - 60;
    };

    const tick = (t) => {
      const inView = isInView();
      if (inView) {
        if (!lastInView) {
          // started playing
          startedAt = t;
          lastInView = true;
        }
        const elapsed = accumulated + (t - startedAt);
        const p = elapsed % durationMs / durationMs;
        setProgress(p);
      } else if (lastInView) {
        // paused; keep accumulated time
        accumulated += t - startedAt;
        lastInView = false;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs]);
  return progress;
}

const PLATFORMS = [
{
  id: 'intellicare',
  num: '01',
  tag: 'Clinical · EHR plug-in',
  title: 'Intellicare for Ebola',
  productName: 'Intellicare',
  titleHl: 'Ebola',
  lede: 'A patient walks into OPD for something else. The consultation transcript names a fever, a trip to a market in Wangata, contact with a sick relative. Sensei flags it before the doctor finishes typing.',
  tags: ['EHR plugin', 'AI Sensei', 'DHIS2 linked'],
  bullets: [
  { strong: 'Picks up signals', text: 'from natural conversation — symptoms, exposure, geography — even when Ebola is not the presenting complaint.' },
  { strong: 'Refer for testing', text: 'with a single click; the alert lands in the rapid-response team\'s queue and the patient receives an isolation pathway.' },
  { strong: 'Forwards to OneDataConnect', text: 'as a possible case. When several clinics flag the same village, the cluster becomes an outbreak signal.' }]

},
{
  id: 'converse',
  num: '02',
  tag: 'Citizen channel · WhatsApp',
  title: 'Converse for Ebola',
  productName: 'Converse',
  titleHl: 'Converse',
  lede: 'Most citizens reach for WhatsApp before they reach for a clinic. Converse meets them there — answering rumours, triaging symptoms, and routing people to the nearest screening point in their own language.',
  tags: ['WhatsApp native', 'Multilingual', '24/7'],
  bullets: [
  { strong: 'Risk communication', text: '— accurate, branded, dialect-aware messaging from the Ministry of Health, at the scale of a national rollout.' },
  { strong: 'Rumour management', text: '— misinformation claims are flagged, debunked, and looped back to communications teams in near real time.' },
  { strong: 'Patient assistance', text: '— symptom triage, nearest facility lookup, vaccination eligibility, and warm hand-off to a human call-centre agent when needed.' }]

},
{
  id: 'odc',
  num: '03',
  tag: 'Situation room · Operations',
  title: 'OneDataConnect Ebola',
  productName: 'OneDataConnect',
  titleHl: 'OneDataConnect',
  lede: 'Every outbreak generates more data than any single system can hold. OneDataConnect stitches case reports, lab results, logistics, and clinical signals into a single situation-room view for emergency operations teams.',
  tags: ['DHIS2 interop', 'Intellicare-linked', 'Geo-tagged'],
  bullets: [
  { strong: 'Unifies fragmented data', text: '— EHRs, lab LIMS, contact-tracing forms, and surveillance reports flow into one coherent picture.' },
  { strong: 'Outbreak monitoring', text: '— case curves, transmission chains, and hotspot maps update on the same heartbeat as the field.' },
  { strong: 'Logistics overlay', text: '— co-locate cases with cold-chain coverage, PPE stockouts, and team deployments to direct the next decision.' }]

},
{
  id: 'lmis',
  num: '04',
  tag: 'Supply chain · OpenLMIS',
  title: 'OpenLMIS for outbreak response',
  titleHl: 'OpenLMIS',
  lede: 'A vaccine that doesn\'t reach the right cold-chain on time is a vaccine that doesn\'t work. OpenLMIS keeps the response stocked, with real-time stockout signals and automated re-routing.',
  tags: ['Real-time', 'Cold-chain aware', '400+ facilities'],
  bullets: [
  { strong: 'Live stockout map', text: '— red dots cluster where rVSV-ZEBOV, PPE, or RDTs are running low; supplies redirect before clinics run dry.' },
  { strong: 'Distribution planning', text: '— requisitions, dispatch, and last-mile delivery feed back to OneDataConnect for a single supply picture.' },
  { strong: 'Country-owned data', text: '— hosted on national servers, available offline and on mobile for field staff.' }]

}];


function PlatformSection({ platform, index, denseData }) {
  const stageRef = useRef(null);
  const progress = useAutoPlay(stageRef, platform.id === 'converse' ? 12000 : platform.id === 'odc' ? 10000 : 9000);
  const isDesktop = platform.id !== 'converse'; // converse uses a phone, the others use desktop

  // Render the title with the product name gradient when we have one
  const titleNode = platform.productName ?
    <>
      <span className="product-name">{platform.productName}</span>
      {platform.title.slice(platform.productName.length)}
    </> :
    platform.title;

  return (
    <section
      className="platform-section"
      data-screen-label={`${index + 3}0 ${platform.title}`}
      id={platform.id}>
      
      <div className="platform-grid">
        <div className="platform-narrative">
          <div className="scrolly-step">
            <span className="step-num">{platform.num}</span>
            <span>{platform.tag}</span>
          </div>
          <h3 className="scrolly-title">{titleNode}</h3>
          <p className="scrolly-lede">{platform.lede}</p>
          <div className="scrolly-tag-row">
            {platform.tags.map((t, i) => <span key={i} className="scrolly-tag">{t}</span>)}
          </div>
          <ul className="scrolly-bullets">
            {platform.bullets.map((b, i) =>
            <li key={i}>
                <span className="b-num">0{i + 1}</span>
                <div><strong>{b.strong}</strong> {b.text}</div>
              </li>
            )}
          </ul>
        </div>
        <div className="platform-stage" ref={stageRef}>
          {isDesktop ?
          <Monitor fixed>
              {platform.id === 'intellicare' && <IntellicareMock progress={progress} />}
              {platform.id === 'odc' && <OneDataConnectMock progress={progress} denseData={denseData} />}
              {platform.id === 'lmis' && <OpenLMISMock progress={progress} />}
            </Monitor> :

          <ConverseMock progress={progress} />
          }
        </div>
      </div>
    </section>);

}

function Monitor({ children, fixed }) {
  return (
    <div className={`monitor ${fixed ? 'monitor-fixed' : ''}`}>
      <div className="monitor-screen">{children}</div>
      <div className="monitor-stand">
        <div className="monitor-stand-neck"></div>
        <div className="monitor-stand-base"></div>
      </div>
    </div>);

}

function Offerings({ denseData }) {
  return (
    <div id="platforms" className="offerings">
      <div className="offerings-header">
        <div className="intro-label">The Ebola response stack</div>
        <h2>From the consult room to the situation room, in one heartbeat.</h2>
        <p>Four platforms, one response. Each is production-grade and country-deployable today; together they form the digital backbone of a modern outbreak response.</p>
      </div>
      <div className="platform-track">
        {PLATFORMS.map((p, i) =>
        <PlatformSection
          key={p.id}
          platform={p}
          index={i}
          denseData={denseData} />

        )}
      </div>
    </div>);

}

/* ────────────────────────────────────────────────────────────
   CLOSING
   ──────────────────────────────────────────────────────────── */

function Closing({ onCTA }) {
  return (
    <section id="partners" className="closing" data-screen-label="07 Partners">
      <div className="closing-inner">
        <div>
          <div className="intro-label">Partners & deployments</div>
          <h2>Built with the institutions on the <span className="em">front line</span>.</h2>
          <p>
            The Ebola response stack is grounded in eighteen years of field deployment across Africa, South Asia, and Latin America — engineered alongside Ministries of Health, multilateral agencies, and the WHO Emergency Operations community.
          </p>
          <div className="hero-cta-row">
            <button className="btn-primary" style={{ background: 'var(--purple-700)' }} onClick={onCTA}>Request a country briefing</button>
          </div>
        </div>
        <div className="partner-strip">
          <div className="partner-strip-label">Selected partners</div>
          <div className="partner-strip-grid">
            <div className="partner-pill">WHO</div>
            <div className="partner-pill">UNICEF</div>
            <div className="partner-pill">Gavi</div>
            <div className="partner-pill">The Global Fund</div>
            <div className="partner-pill">UNDP</div>
            <div className="partner-pill">World Bank</div>
            <div className="partner-pill">Africa CDC</div>
            <div className="partner-pill">Min. Santé · DRC</div>
            <div className="partner-pill">Min. Health · Uganda</div>
          </div>
        </div>
      </div>
    </section>);

}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <img src={window.__resources?.dureIcon || "dure-icon.png"} alt="Dure" className="footer-logo-img" />
        </div>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Products</a>
          <a href="#">Resources</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="footer-meta">
        <span>© 2026 Dure Technologies · Ebola Response Programme</span>
        <span>contact@duretechnologies.com · +1 212 555 0188</span>
      </div>
    </footer>);

}

/* ────────────────────────────────────────────────────────────
   APP ROOT
   ──────────────────────────────────────────────────────────── */

function ContactModal({ open, onClose }) {
  const [copied, setCopied] = useState(false);
  const email = 'viplove.dutta@duretechnologies.com';
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {if (e.key === 'Escape') onClose();};
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);
  if (!open) return null;
  const copy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="contact-modal-backdrop" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="contact-modal-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <div className="contact-modal-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
            <path d="M3 7 L12 13 L21 7" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="contact-modal-label">Get in touch</div>
        <h3 className="contact-modal-title">Please contact us</h3>
        <p className="contact-modal-sub">A member of the Dure team will get back to you shortly to schedule a briefing on the Ebola response stack.</p>
        <a href={`mailto:${email}`} className="contact-modal-email-row">
          <span className="contact-modal-email">{email}</span>
          <span className="contact-modal-arrow">→</span>
        </a>
        <button className="contact-modal-copy" onClick={copy}>
          {copied ? '✓ Copied to clipboard' : 'Copy email address'}
        </button>
      </div>
    </div>);

}

function App() {
  const defaults = JSON.parse(document.getElementById('tweak-defaults').textContent.replace(/\/\*[^*]*\*\//g, ''));
  const [t, setTweak] = useTweaks(defaults);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-palette', t.palette);
    document.body.classList.toggle('hc-text', !!t.highContrastText);
  }, [t.palette, t.highContrastText]);

  return (
    <>
      <Nav onCTA={() => setContactOpen(true)} />
      <Hero variant={t.heroVariant} onCTA={() => setContactOpen(true)} />
      <Intro />
      <Offerings denseData={t.denseData} />
      <Closing onCTA={() => setContactOpen(true)} />
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Aesthetic">
          <TweakRadio
            label="Palette"
            value={t.palette}
            options={[
            { value: 'dure', label: 'Dure' },
            { value: 'midnight', label: 'Midnight' },
            { value: 'violet', label: 'Violet' }]
            }
            onChange={(v) => setTweak('palette', v)} />
          
          <TweakRadio
            label="Hero treatment"
            value={t.heroVariant}
            options={[
            { value: 'world-nodes', label: 'World map' },
            { value: 'network', label: 'Network' },
            { value: 'cells', label: 'Cells' }]
            }
            onChange={(v) => setTweak('heroVariant', v)} />
          
        </TweakSection>
        <TweakSection title="Dashboard">
          <TweakToggle
            label="Dense data on OneDataConnect"
            value={t.denseData}
            onChange={(v) => setTweak('denseData', v)} />
          
          <TweakToggle
            label="High-contrast text"
            value={t.highContrastText}
            onChange={(v) => setTweak('highContrastText', v)} />
          
        </TweakSection>
      </TweaksPanel>
    </>);

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);