import Arrow from './Arrow';

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
              <img className="odda-view-laptop" src="/images/case-studies/odda-laptop.webp" alt="Odda View dashboard on a laptop" width={697} height={462} loading="lazy" />
              <img className="odda-view-phone" src="/images/case-studies/odda-phone.webp" alt="Odda View mobile dashboard on a phone" width={299} height={551} loading="lazy" />
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
