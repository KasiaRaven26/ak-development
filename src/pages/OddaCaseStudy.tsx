import { useEffect, useRef, useState } from 'react';
import CursorFollower from '../components/CursorFollower';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './odda-case-study.css';
import OddaNotifications from '../components/OddaNotifications';
import OddaDesktopPreview from '../components/OddaDesktopPreview';

gsap.registerPlugin(ScrollTrigger);

const assets = '/images/case-studies/';

export default function OddaCaseStudy() {
  const root = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Odda Care — Selected Work | AK Development';
    window.scrollTo(0, 0);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => { document.title = previousTitle; };
    }

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-odda-reveal]').forEach((element) => {
        gsap.fromTo(element,
          { opacity: 0, y: 34 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          },
        );
      });

      gsap.fromTo('.odda-case-hero-window',
        { opacity: 0, y: 46, scale: 0.965 },
        { opacity: 1, y: 0, scale: 1, duration: 1.15, delay: 0.15, ease: 'power3.out' },
      );

      gsap.fromTo('.odda-case-video-frame',
        { opacity: 0, y: 55, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.odda-case-video-frame', start: 'top 88%', once: true },
        },
      );

      // Move the phone and its annotations together to keep connectors aligned.
      [
        { selector: '.odda-notifications', distance: -5, duration: 4.5 },
        { selector: '.odda-desktop-screen', distance: -6, duration: 5.2 },
      ].forEach(({ selector, distance, duration }) => {
        gsap.to(selector, {
          y: distance, duration, ease: 'sine.inOut', repeat: -1, yoyo: true,
          scrollTrigger: {
            trigger: selector, start: 'top bottom', end: 'bottom top',
            toggleActions: 'play pause resume pause',
          },
        });
      });

      gsap.fromTo('.odda-phone-nav-pulse',
        { scale: 0.9, opacity: 0.12, svgOrigin: '787 960' },
        {
          scale: 1.15, opacity: 0.5, duration: 2.6, ease: 'sine.inOut',
          repeat: -1, yoyo: true,
          scrollTrigger: {
            trigger: '.odda-notifications', start: 'top bottom', end: 'bottom top',
            toggleActions: 'play pause resume pause',
          },
        },
      );

      gsap.to('.odda-desktop-status', {
        opacity: 0.65, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true,
        scrollTrigger: {
          trigger: '.odda-case-device-desktop', start: 'top bottom', end: 'bottom top',
          toggleActions: 'play pause resume pause',
        },
      });

      gsap.fromTo('.odda-case-laptop',
        { y: 80, rotate: 5 },
        { y: 0, rotate: 2, ease: 'none', scrollTrigger: {
          trigger: '.odda-case-product-grid', start: 'top 85%', end: 'bottom 30%', scrub: 1,
        } },
      );
    }, root);

    return () => { context.revert(); document.title = previousTitle; };
  }, []);

  return (
    <main className="odda-case" ref={root}>
      <CursorFollower paused={reducedMotion} />
      <header className="odda-case-header">
        <a className="brand" href="/" aria-label="Kasia Kruk home"><span className="brand-letter brand-letter-a" aria-hidden="true">A</span><span className="brand-letter brand-letter-k" aria-hidden="true">K</span></a>
        <a className="odda-case-back" href="/#work"><span aria-hidden="true">↖</span> Back to work</a>
        <a className="odda-case-header-cta" href="/#contact">Let's talk <span aria-hidden="true">↗</span></a>
      </header>

      <section className="odda-case-hero" aria-labelledby="odda-case-title">
        <div className="odda-case-hero-top">
          <p className="odda-case-kicker">Selected work <span> / 01 — 2026</span></p>
          <p className="odda-case-kicker">Care technology · United Kingdom</p>
        </div>
        <div className="odda-case-headline-wrap">
          <h1 id="odda-case-title">Odda <span>Care</span></h1>
        </div>
        <div className="odda-case-hero-copy">
          <p>A calmer way to understand technology.<br />A more human way to talk about care.</p>
          <p className="odda-case-scroll-cue">Scroll to explore <span aria-hidden="true">↓</span></p>
        </div>
        <div className="odda-case-hero-window">
          <div className="odda-case-browser-bar" aria-hidden="true">
            <span className="odda-case-browser-dots"><i /><i /><i /></span>
            <span>Odda Care — home</span>
            <span className="odda-case-browser-symbol">↗</span>
          </div>
          <img src={`${assets}odda-home.webp`} width="1700" height="635" alt="Odda Care homepage with its introduction to discreet home sensors and personal support" fetchPriority="high" />
        </div>
        <div className="odda-case-hero-bottom"><span>01 / A digital experience built around reassurance</span><span>Independent creative development</span></div>
      </section>

      <section className="odda-case-story odda-case-pad" aria-labelledby="odda-story-title">
        <div className="odda-case-eyebrow" data-odda-reveal>01 / The brief</div>
        <div className="odda-case-story-grid">
          <div data-odda-reveal>
            <h2 id="odda-story-title">Making the complex<br /><em>feel familiar.</em></h2>
          </div>
          <div className="odda-case-story-copy" data-odda-reveal>
            <p className="odda-case-lead">Odda Care is a UK startup using discreet home sensors to help families understand the everyday routines of older loved ones.</p>
            <p>The challenge was to translate unfamiliar technology into a website that feels reassuring, approachable and simple to navigate — without losing the details people need to make an informed decision.</p>
            <p>I designed and developed a responsive experience that gives the service room to speak for itself, from its first introduction to the assessment-booking journey.</p>
          </div>
        </div>
        <div className="odda-case-facts" data-odda-reveal>
          <div><span>Services</span><strong>Website design & development<br />Mobile-friendly design</strong></div>
          <div><span>Features</span><strong>Online appointment booking<br />Content structure & SEO</strong></div>
          <div><span>Technology</span><strong>React<br />Responsive CSS</strong></div>
        </div>
      </section>

      <section className="odda-case-technology odda-case-pad" aria-labelledby="odda-technology-title">
        <div className="odda-case-section-head" data-odda-reveal>
          <span className="odda-case-eyebrow">02 / The interface</span>
          <span className="odda-case-mini-symbol" aria-hidden="true">✳</span>
        </div>
        <div className="odda-case-technology-intro" data-odda-reveal>
          <h2 id="odda-technology-title">Technology<br /><em>without the noise.</em></h2>
        </div>
        <div className="odda-case-technology-demo">
        <figure className="odda-case-video-frame">
          <video
            key={reducedMotion ? 'still' : 'animated'}
            autoPlay={!reducedMotion}
            loop
            muted
            playsInline
            preload={reducedMotion ? 'none' : 'metadata'}
            poster={`${assets}odda-video-poster.jpg`}
            width={1920}
            height={968}
            aria-label="Odda Care website walkthrough"
          >
            <source src="/videos/odda-care-walkthrough.mp4" type="video/mp4" />
            Your browser does not support video playback. <a href="/videos/odda-care-walkthrough.mp4">Download the walkthrough</a>.
          </video>
        </figure>
        <p data-odda-reveal>Clear hierarchy, quiet colours and generous breathing room bring a technical product down to earth. The sensor section turns a list of devices into something easy to explore at a glance.</p>
        </div>
      </section>

      <section className="odda-case-experience odda-case-pad" aria-labelledby="odda-view-title">
        <div className="odda-case-section-head" data-odda-reveal>
          <span className="odda-case-eyebrow">03 / The experience</span>
          <span className="odda-case-mini-symbol" aria-hidden="true">↗</span>
        </div>
        <div className="odda-case-experience-intro" data-odda-reveal>
          <h2 id="odda-view-title">Clarity in<br /><em>everyday moments.</em></h2>
          <p>Odda View shows how everyday activity can become easy-to-understand updates. The website brings that idea to life through animated notifications and recognisable device mock-ups.</p>
        </div>
        <div className="odda-case-product-grid">
          <div className="odda-case-notifications"><OddaNotifications /></div>
          <figure className="odda-case-device-panel odda-case-device-desktop" data-odda-reveal>
            <div className="odda-case-device-meta"><span>02 / Desktop view</span><span>Patterns at a glance</span></div>
            <OddaDesktopPreview className="odda-case-laptop" image={`${assets}odda-laptop-hd.png`} alt="Illustrative Odda View desktop dashboard displayed on a laptop" />
          </figure>
        </div>
      </section>

      <section className="odda-case-build odda-case-pad" aria-labelledby="odda-build-title">
        <div className="odda-case-eyebrow" data-odda-reveal>04 / Designed around your visitors</div>
        <div className="odda-case-build-layout">
          <h2 id="odda-build-title" data-odda-reveal>Easy to explore.<br /><em>Easy to get in touch.</em></h2>
          <div data-odda-reveal>
            <p>A website should make it easy for people to understand what you offer, whether they find you on their phone or sit down to explore on a laptop. For Odda Care, I organised the information into clear sections, with answers to common questions close at hand.</p>
            <p>From the first introduction to booking a conversation, every step has a clear purpose. It’s the same attention I’d give to your portfolio, personal website or service — helping visitors find what matters and know how to reach you.</p>
            <div className="odda-case-tags" aria-label="Website features">
              {['Mobile-friendly layout', 'Clear navigation', 'Online booking', 'Helpful FAQs', 'Easy contact'].map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="odda-case-takeaway odda-case-pad" aria-labelledby="odda-takeaway-title">
        <div className="odda-case-build-layout">
          <h2 id="odda-takeaway-title" data-odda-reveal>What this means<br /><em>for your website.</em></h2>
          <div data-odda-reveal>
            <p>Whether you’re sharing your work, offering a service or building a business, your website should help people understand what you do and feel confident taking the next step.</p>
            <p>For Odda Care, that meant making unfamiliar technology feel clear and approachable. I bring the same care to every project — thoughtful design, straightforward navigation and attention to the details that matter.</p>
          </div>
        </div>
      </section>

      <section className="odda-case-next odda-case-pad" aria-labelledby="odda-next-title">
        <div className="odda-case-next-top"><span>End of project / 01</span><span>Have something different in mind?</span></div>
        <h2 id="odda-next-title" data-odda-reveal>Let's make<br /><em>something memorable.</em></h2>
        <div className="odda-case-next-links" data-odda-reveal>
          <a href="/#contact" className="odda-case-contact-link">Start a conversation <span aria-hidden="true">↗</span></a>
          <a href="/#work" className="odda-case-all-work">← All selected work</a>
        </div>
        <footer className="odda-case-footer"><span>AK Development © 2026</span><span>Good code. Big feeling.</span></footer>
      </section>
    </main>
  );
}
