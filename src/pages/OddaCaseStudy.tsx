import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './odda-case-study.css';

gsap.registerPlugin(ScrollTrigger);

const assets = '/images/case-studies/';

export default function OddaCaseStudy() {
  const root = useRef<HTMLElement>(null);

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

      gsap.to('.odda-case-orbit', {
        rotate: 32,
        scrollTrigger: {
          trigger: '.odda-case-hero', start: 'top top', end: 'bottom top', scrub: 1,
        },
      });

      gsap.fromTo('.odda-case-phone',
        { y: 65, rotate: -7 },
        { y: 0, rotate: -3, ease: 'none', scrollTrigger: {
          trigger: '.odda-case-product-grid', start: 'top 85%', end: 'bottom 30%', scrub: 1,
        } },
      );

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
      <header className="odda-case-header">
        <a className="odda-case-logo" href="/" aria-label="AK Development — home">AK<span>✳</span></a>
        <a className="odda-case-back" href="/#work"><span aria-hidden="true">↖</span> Back to work</a>
        <a className="odda-case-header-cta" href="/#contact">Let's talk <span aria-hidden="true">↗</span></a>
      </header>

      <section className="odda-case-hero" aria-labelledby="odda-case-title">
        <div className="odda-case-hero-top">
          <p className="odda-case-kicker">Selected work <span> / 01 — 2026</span></p>
          <p className="odda-case-kicker">Care technology · United Kingdom</p>
        </div>
        <div className="odda-case-headline-wrap">
          <h1 id="odda-case-title">ODDA <span>CARE<span className="odda-case-period">.</span></span></h1>
          <div className="odda-case-orbit" aria-hidden="true"><span>MADE WITH CARE</span>✳</div>
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
          <div><span>Services</span><strong>Web design<br />Frontend development</strong></div>
          <div><span>Stack</span><strong>React Router<br />Responsive CSS</strong></div>
          <div><span>Details</span><strong>Assessment booking<br />Content & SEO</strong></div>
        </div>
      </section>

      <section className="odda-case-technology odda-case-pad" aria-labelledby="odda-technology-title">
        <div className="odda-case-section-head" data-odda-reveal>
          <span className="odda-case-eyebrow">02 / The interface</span>
          <span className="odda-case-mini-symbol" aria-hidden="true">✳</span>
        </div>
        <div className="odda-case-technology-intro" data-odda-reveal>
          <h2 id="odda-technology-title">Technology,<br /><em>without the noise.</em></h2>
          <p>Clear hierarchy, quiet colours and generous breathing room bring a technical product down to earth. The sensor section turns a list of devices into something easy to explore at a glance.</p>
        </div>
        <figure className="odda-case-sensor-frame" data-odda-reveal>
          <img src={`${assets}odda-sensors.webp`} width="1480" height="704" loading="lazy" alt="Odda Care technology interface showing six sensor cards arranged in two columns" />
          <figcaption><span>Selected interface detail</span><span>Home sensing, simply explained ↗</span></figcaption>
        </figure>
      </section>

      <section className="odda-case-experience odda-case-pad" aria-labelledby="odda-view-title">
        <div className="odda-case-section-head" data-odda-reveal>
          <span className="odda-case-eyebrow">03 / The experience</span>
          <span className="odda-case-mini-symbol" aria-hidden="true">↗</span>
        </div>
        <div className="odda-case-experience-intro" data-odda-reveal>
          <h2 id="odda-view-title">Clarity in<br /><em>everyday moments.</em></h2>
          <p>Odda View shows how everyday activity can become easy-to-understand updates. The website introduces that idea through simple, recognisable device mock-ups.</p>
        </div>
        <div className="odda-case-product-grid">
          <figure className="odda-case-device-panel odda-case-device-mobile" data-odda-reveal>
            <div className="odda-case-device-meta"><span>01 / Mobile view</span><span>Reassurance on the go</span></div>
            <img className="odda-case-phone" src={`${assets}odda-phone.webp`} width="299" height="551" loading="lazy" alt="Illustrative Odda View mobile dashboard inside an iPhone mock-up" />
          </figure>
          <figure className="odda-case-device-panel odda-case-device-desktop" data-odda-reveal>
            <div className="odda-case-device-meta"><span>02 / Desktop view</span><span>Patterns at a glance</span></div>
            <img className="odda-case-laptop" src={`${assets}odda-laptop.webp`} width="697" height="462" loading="lazy" alt="Illustrative Odda View desktop dashboard displayed on a laptop" />
          </figure>
        </div>
        <p className="odda-case-disclaimer">Illustrative Odda View mock-ups only. The final product design and features may differ.</p>
      </section>

      <section className="odda-case-build odda-case-pad" aria-labelledby="odda-build-title">
        <div className="odda-case-eyebrow" data-odda-reveal>04 / Behind the build</div>
        <div className="odda-case-build-layout">
          <h2 id="odda-build-title" data-odda-reveal>Design-minded.<br /><em>Detail-obsessed.</em></h2>
          <div data-odda-reveal>
            <p>The experience was built with reusable React components and carefully considered responsive layouts, so the same brand feeling carries across screen sizes.</p>
            <p>Clear navigation, structured content and a streamlined booking journey help visitors get from curiosity to their first conversation.</p>
            <div className="odda-case-tags" aria-label="Project skills">
              {['React', 'React Router', 'Responsive design', 'Calendly integration', 'SEO', 'UI design'].map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="odda-case-next odda-case-pad" aria-labelledby="odda-next-title">
        <div className="odda-case-next-top"><span>End of project / 01</span><span>Have something different in mind?</span></div>
        <h2 id="odda-next-title" data-odda-reveal>Let's make<br /><em>something matter.</em></h2>
        <div className="odda-case-next-links" data-odda-reveal>
          <a href="/#contact" className="odda-case-contact-link">Start a conversation <span aria-hidden="true">↗</span></a>
          <a href="/#work" className="odda-case-all-work">← All selected work</a>
        </div>
        <footer className="odda-case-footer"><span>AK Development © 2026</span><span>Good code. Big feeling.</span></footer>
      </section>
    </main>
  );
}
