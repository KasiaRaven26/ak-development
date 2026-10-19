import Arrow from './Arrow';
import OddaDesktopPreview from './OddaDesktopPreview';

export default function Work({ onSelect }: { onSelect: (id: 'odda' | 'indigo') => void }) {
  return (
    <section id="work" className="section work">
      <div className="section-top reveal">
        <h2>Less ordinary.<br />More considered.</h2>
        <span className="small">01 / Selected work</span>
      </div>
      <div className="projects">
        <article className="project reveal">
          <a className="visual odda odda-view-preview" href="/work/odda-care" aria-label="Explore Odda Care case study">
            <div className="odda-view-devices">
              <OddaDesktopPreview className="odda-view-laptop" image="/images/case-studies/odda-laptop-hd.png" alt="Odda View dashboard on a laptop" />
              <div className="odda-view-phone odda-view-phone-crop">
                <svg viewBox="700 110 610 930" role="img" aria-label="Odda View mobile dashboard on a phone">
                  <defs><clipPath id="work-odda-phone-outline"><path d="M715 1030 L753 257 C756 199 783 171 844 160 L1165 125 C1232 115 1268 148 1273 211 L1288 1030 Z" /></clipPath></defs>
                  <image href="/images/case-studies/alert1.png" width="1382" height="1138" clipPath="url(#work-odda-phone-outline)" />
                </svg>
              </div>
            </div>
          </a>
          <div className="project-info">
            <div><h3>Odda Care</h3><p>Care technology · Web development · UK</p></div>
            <span aria-hidden="true"><Arrow /></span>
          </div>
        </article>
        <article className="project reveal">
          <button className="visual indigo" onClick={() => onSelect('indigo')} aria-label="Explore Indigo project">
            <img className="project-screenshot" src="/images/indigo-preview.png" alt="Indigo Consulting — Greek real estate. Expertly navigated." width={3410} height={2030} loading="lazy" />
          </button>
          <div className="project-info">
            <div><h3>Indigo</h3><p>Real estate · Digital presence · Greece</p></div>
            <span aria-hidden="true"><Arrow /></span>
          </div>
        </article>
      </div>
      <p className="work-foot">Select a project to explore.</p>
    </section>
  );
}
