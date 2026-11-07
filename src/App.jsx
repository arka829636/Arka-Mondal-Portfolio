import React from "react";

import "./App.css";



const projects = [

  {

    id: "01",

    title: "SupplyShield",

    type: "DATA ANALYTICS / SUPPLY CHAIN",

    summary: "Making procurement data easier to understand—and supplier performance easier to act on.",

    description: "A Power BI analytics project exploring purchase orders, supplier performance, and supply chain signals using a Python and MySQL data workflow.",

    stack: ["Python", "MySQL", "Power BI"],

    href: "https://github.com/arka829636/SupplyShield",

    className: "supply-art",

    status: "Analytics project",

  },

  {

    id: "02",

    title: "Finlytic AI",

    type: "FINTECH / PERSONAL FINANCE",

    summary: "A clearer picture of personal spending, one transaction at a time.",

    description: "A personal finance application focused on expense tracking, spending analysis, and useful recommendations through a data-driven interface.",

    stack: ["Python", "SQLite", "Streamlit", "Pandas"],

    href: "https://github.com/arka829636/Finlytic-AI",

    className: "finlytic-art",

    status: "Application project",

  },

  {

    id: "03",

    title: "ConsultIQ",

    type: "AI / DECISION SUPPORT",

    summary: "Exploring how AI could help teams ask better business questions.",

    description: "A consulting assistant concept for investigating causes, exploring risks, comparing decisions, and following outcomes. AI and RAG capabilities are being explored.",

    stack: ["Python", "AI concepts", "RAG · exploring"],

    href: "https://github.com/arka829636/ConsultIQ",

    className: "consult-art",

    status: "Concept / in progress",

  },

];



const skillGroups = [

  ["Build", "Python", "SQL", "Java · fundamentals"],

  ["Analyze", "Pandas", "NumPy", "Power BI", "Data visualization"],

  ["Work with data", "MySQL", "SQLite", "DBMS"],

  ["Tools & foundations", "Git / GitHub", "Streamlit", "FastAPI", "RAG", "Machine Learning", "Statistics", "OOP"],

];



function App() {

  const [menuOpen, setMenuOpen] = React.useState(false);

  const [active, setActive] = React.useState("intro");

  const navRef = React.useRef(null);

  const [navIndicator, setNavIndicator] = React.useState({ left: 0, top: 0, width: 0, height: 0, ready: false });

  const [theme, setTheme] = React.useState(() => {

    try { return localStorage.getItem("arka-portfolio-theme") || "light"; }

    catch { return "light"; }

  });

  const [now, setNow] = React.useState(() => new Date());

  const [loading, setLoading] = React.useState(true);
  const [welcomeVisible, setWelcomeVisible] = React.useState(false);

  const [progress, setProgress] = React.useState(0);



  React.useEffect(() => {
    const started = Date.now();
    const duration = 2200;
    let loaderExitTimer;
    let welcomeExitTimer;

    const timer = window.setInterval(() => {
      const next = Math.min(100, Math.round(((Date.now() - started) / duration) * 100));
      setProgress(next);

      if (next >= 100) {
        window.clearInterval(timer);

        // Begin the Welcome cross-fade before removing the initializing screen.
        setWelcomeVisible(true);
        loaderExitTimer = window.setTimeout(() => {
          setLoading(false);
        }, 700);

        // Keep Welcome visible while the portfolio waits underneath it.
        welcomeExitTimer = window.setTimeout(() => {
          setWelcomeVisible(false);
        }, 2500);
      }
    }, 20);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(loaderExitTimer);
      window.clearTimeout(welcomeExitTimer);
    };
  }, []);



  React.useEffect(() => {

    const timer = window.setInterval(() => setNow(new Date()), 1000);

    return () => window.clearInterval(timer);

  }, []);



  React.useEffect(() => {

    document.documentElement.dataset.theme = theme;

    try { localStorage.setItem("arka-portfolio-theme", theme); } catch {}

  }, [theme]);



  React.useEffect(() => {

    const ids = ["intro", "about", "work", "toolkit", "contact"];

    const updateActiveSection = () => {

      // The last section whose top has crossed the sticky-header reading line
      // is the section currently represented by the navbar.
      const readingLine = 110;

      const pageBottom =

        window.scrollY + window.innerHeight >=

        document.documentElement.scrollHeight - 8;



      // Contact is the final section; short viewport/footer geometry can mean
      // its heading never crosses the reading line before the page ends.
      if (pageBottom) {

        setActive("contact");

        return;

      }



      let currentId = ids[0];

      ids.forEach((id) => {

        const section = document.getElementById(id);

        if (section && section.getBoundingClientRect().top <= readingLine) {

          currentId = id;

        }

      });

      setActive(currentId);

    };



    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });

    window.addEventListener("resize", updateActiveSection);

    return () => {

      window.removeEventListener("scroll", updateActiveSection);

      window.removeEventListener("resize", updateActiveSection);

    };

  }, []);



  const navigateToSection = (event, sectionId) => {

    event.preventDefault();

    setActive(sectionId);

    setMenuOpen(false);

    const target = document.getElementById(sectionId);

    if (!target) return;

    const header = document.querySelector(".site-header");

    const offset = (header?.getBoundingClientRect().height || 76) + 18;

    const targetY = target.getBoundingClientRect().top + window.scrollY - offset;

    window.history.replaceState(null, "", `#${sectionId}`);

    window.scrollTo({ top: Math.max(0, targetY), behavior: "auto" });

  };



  React.useEffect(() => {

    const updateIndicator = () => {

      const nav = navRef.current;

      const link = nav?.querySelector(`a[href="#${active}"]`);

      if (!nav || !link) return;

      setNavIndicator({

        left: link.offsetLeft,

        top: link.offsetTop,

        width: link.offsetWidth,

        height: link.offsetHeight,

        ready: true,

      });

    };

    updateIndicator();

    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);

  }, [active, menuOpen]);



  const close = () => setMenuOpen(false);



  return (

    <>

    {loading && <div className={`portfolio-loader${welcomeVisible ? " is-exiting" : ""}`} role="status" aria-label={`Loading portfolio ${progress}%`}>

      <div className="loader-core">

        <div className="loader-monogram">AM</div>

        <h1>ARKA <span>MONDAL</span></h1>

        <div className="loader-progress-meta"><span>INITIALIZING PORTFOLIO</span><b>{progress}%</b></div>

        <div className="loader-progress-track"><span style={{ width: `${progress}%` }} /></div>

        <p>LOADING {String(progress).padStart(2,"0")} / 100 <i>·</i> DATA <i>·</i> AI <i>·</i> MATHEMATICS</p>

      </div>

    </div>}
    {welcomeVisible && (
      <div className="welcome-screen" role="status" aria-label="Welcome">
        <h1 className="welcome-word">Welcome<span>.</span></h1>
      </div>
    )}
    <div className={`portfolio theme-${theme} page-enter${welcomeVisible ? " portfolio-waiting" : " portfolio-revealing"}${(loading || welcomeVisible) ? " portfolio-intro-hidden" : ""}`} style={(loading || welcomeVisible) ? { visibility: "hidden" } : undefined}>

      <header className="site-header">

        <a className="wordmark" href="#intro" onClick={(event) => navigateToSection(event, "intro")} aria-label="Arka Mondal, home"><span className="wordmark-initials">AM</span><span className="wordmark-name">Arka Mondal</span></a>

        <nav ref={navRef} className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">

          <span className={`nav-active-indicator${navIndicator.ready ? " is-ready" : ""}`} aria-hidden="true" style={{ left: navIndicator.left, top: navIndicator.top, width: navIndicator.width, height: navIndicator.height }} />

          {[ ["intro","Home"], ["about","About"], ["work","Projects"], ["toolkit","Skills"], ["contact","Contact"] ].map(([id,label]) =>

            <a key={id} href={`#${id}`} className={active===id?"current":""} onClick={(event) => navigateToSection(event, id)}>{label}</a>

          )}

        </nav>

        <div className="header-actions">

          <div className="header-live" aria-label={`Local date and time: ${now.toLocaleString()}`}>
            <span className="live-indicator" aria-hidden="true"></span>
            <span className="header-live-copy">
              <b>{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}</b>
              <small>{now.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" }).toUpperCase()}</small>
            </span>
          </div>

          <div className="theme-switch" role="group" aria-label="Color theme">

            <button className={theme === "light" ? "theme-choice active" : "theme-choice"} type="button" onClick={() => setTheme("light")} aria-label="Light theme" title="Light theme"><span aria-hidden="true">☼</span></button>

            <button className={theme === "dark" ? "theme-choice active" : "theme-choice"} type="button" onClick={() => setTheme("dark")} aria-label="Dark theme" title="Dark theme"><span aria-hidden="true">☾</span></button>

          </div>

          <a className="header-contact" href="#contact" onClick={(event) => navigateToSection(event, "contact")}>Get in touch <span>↗</span></a>

        </div>

        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span></span><span></span></button>

      </header>



      <main>

        <section className="intro-section page-grid" id="intro">

          <div className="intro-main">

            <div className="eyebrow"><span className="eyebrow-dot"></span> MCA STUDENT · DATA & TECHNOLOGY</div>

            <h1>Curious mind.<br/><em>Practical maker.</em></h1>

            <p className="intro-lede">I’m Arka Mondal—a mathematics graduate and MCA student building useful things with data, code, and thoughtful design.</p>

            <div className="intro-links">

              <a className="link-underlined" href="#work">Explore selected work <span>↓</span></a>

              <a className="link-underlined muted-link" href="/resume.pdf" download="Arka-Mondal-Resume.pdf">Resume <span>↗</span></a>

            </div>

          </div>

          <div className="intro-art" aria-label="Abstract illustration of data patterns">

            <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>

            <div className="art-sun"></div>

            <div className="art-grid"></div>

            <div className="art-label label-top">THINK / MAKE / LEARN</div>

            <div className="art-label label-bottom">DATA → INSIGHT → ACTION</div>

            <span className="art-stamp">AM<br/><small>2026</small></span>

          </div>

          <div className="intro-foot"><span>SCROLL TO EXPLORE ↓</span></div>

        </section>



        <div className="ticker" aria-hidden="true"><div className="ticker-track">{Array.from({length:4},(_,i)=><span key={i}>DATA WITH PURPOSE <b>✳</b> CODE WITH CURIOSITY <b>✳</b> LEARN BY BUILDING <b>✳</b></span>)}</div></div>



        <section className="about-section page-grid" id="about">

          <div className="section-head about-heading"><div><span className="eyebrow">A LITTLE CONTEXT</span><h2>Numbers first.<br/><em>Questions always.</em></h2></div></div>

          <div className="about-content">

            <div className="about-story">

              <p className="about-large">My journey started with mathematics. Now I’m using that way of thinking to explore data, software, and intelligent applications.</p>

              <p>I’m pursuing an MCA at KIIT University after completing B.Sc. Mathematics Honours at Burdwan Raj College. I like breaking down complex questions, working with structured data, and learning by building projects.</p>

              <p>I’m growing my practical foundation in analytics and software while exploring how AI can support real-world decisions—without losing sight of the fundamentals.</p>

            </div>

            <div className="education">

              <div className="education-title">EDUCATION / THE FOUNDATION</div>

              <div className="education-row"><span>2025 — NOW</span><div><b>Master of Computer Applications</b><small>KIIT University · Bhubaneswar</small></div></div>

              <div className="education-row"><span>2021 — 2024</span><div><b>B.Sc. Mathematics Honours</b><small>Burdwan Raj College</small></div></div>

            </div>

          </div>

        </section>



        <section className="work-section" id="work">

          <div className="section-inner">

            <div className="section-head">

              <div><span className="eyebrow">A FEW THINGS I’VE BEEN WORKING ON</span><h2>Selected <em>work.</em></h2></div>

              <p>Projects are where I connect the dots between what I learn and problems worth solving.</p>

            </div>

            <div className="work-grid">

              {projects.map((project,index)=><article className={`work-card work-${index+1}`} key={project.id}>

                <a className={`work-art ${project.className}`} href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>

                  <div className="art-meta"><span>{project.id} / 03</span><span>↗</span></div>

                  {project.className==="supply-art" && <div className="supply-visual">

                    <div className="supply-topline">SUPPLY / SIGNALS <span>LIVE VIEW</span></div>

                    <div className="supply-numbers"><div><small>ORDERS</small><b>1,284</b></div><div><small>ON TIME</small><b>92.4<span>%</span></b></div></div>

                    <div className="supply-bars">{[35,57,42,78,61,94,72,100,68,84,54,89].map((n,i)=><i key={i} style={{height:`${n}%`}}/>)}</div>

                    <div className="supply-caption">SUPPLIER PERFORMANCE / OVERVIEW</div>

                  </div>}

                  {project.className==="finlytic-art" && <div className="finance-visual">

                    <div className="finance-head"><span>FINLYTIC / MONTHLY</span><span>↗</span></div>

                    <div className="finance-value">₹24,860<small>SPENDING THIS MONTH</small></div>

                    <div className="finance-ring"><div><b>68%</b><small>OF BUDGET</small></div></div>

                    <div className="finance-lines"><i></i><i></i><i></i></div>

                    <div className="finance-caption">MAKE EVERY RUPEE VISIBLE.</div>

                  </div>}

                  {project.className==="consult-art" && <div className="consult-visual">

                    <span className="consult-overline">CONSULTIQ / THINKING SPACE</span>

                    <div className="consult-question">What changed?<br/><em>What should we do next?</em></div>

                    <div className="consult-nodes"><i>Signal</i><b>→</b><i>Insight</i><b>→</b><i>Action</i></div>

                    <span className="consult-foot">A CONCEPT FOR BETTER DECISIONS</span>

                  </div>}

                  <span className="art-open">OPEN PROJECT ↗</span>

                </a>

                <div className="work-copy">

                  <div className="work-type"><span>{project.type}</span><span>{project.status}</span></div>

                  <h3>{project.title}</h3>

                  <p className="work-summary">{project.summary}</p>

                  <p className="work-description">{project.description}</p>

                  <div className="work-tags">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div>

                  <a className="work-more" href={project.href} target="_blank" rel="noreferrer">Explore repository <span>↗</span></a>

                </div>

              </article>)}

            </div>

          </div>

        </section>



        <section className="toolkit-section" id="toolkit">

          <div className="section-inner">

            <div className="section-head"><div><span className="eyebrow">TOOLS I REACH FOR</span><h2>My growing <em>toolkit.</em></h2></div><p>Not a list of buzzwords—a snapshot of the tools and foundations I’m actively using and developing.</p></div>

            <div className="toolkit-grid">{skillGroups.map((group,i)=><div className="toolkit-group" key={group[0]}><span className="toolkit-index">0{i+1}</span><h3>{group[0]}</h3><div>{group.slice(1).map(skill=><span className="toolkit-chip" key={skill}>{skill}</span>)}</div></div>)}</div>

            <div className="learning-note"><span className="learning-symbol">↗</span><div><b>On my learning list</b><p>Advanced SQL · Data engineering · RAG pipelines · LLM evaluation</p></div><span className="learning-label">IN PROGRESS</span></div>

          </div>

        </section>



        <section className="contact-section page-grid" id="contact">

          <div className="contact-heading">

            <div className="contact-copy">

              <span className="eyebrow"><span className="eyebrow-dot" />THE NEXT CHAPTER</span>

              <h2>Let’s make<br/><em>something useful.</em></h2>

            </div>



          </div>

          <div className="contact-links">

            <a className="contact-card" href="mailto:arka829636@gmail.com"><span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" className="contact-svg"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m4 7 8 6 8-6"/></svg></span><span className="contact-card-copy"><small>EMAIL</small><b>arka829636@gmail.com</b></span><span className="contact-arrow">↗</span></a>

            <a className="contact-card" href="https://github.com/arka829636" target="_blank" rel="noreferrer"><span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" className="contact-svg github-svg"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13.2 13.2 0 0 0-6.9 0C5.4 1.1 4.2 1.5 4.2 1.5a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 2.7 8.7c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.7V22"/></svg></span><span className="contact-card-copy"><small>GITHUB</small><b>GitHub Profile</b></span><span className="contact-arrow">↗</span></a>

            <a className="contact-card" href="https://www.linkedin.com/in/arka-mondal-am/" target="_blank" rel="noreferrer"><span className="contact-icon linkedin-mark">in</span><span className="contact-card-copy"><small>LINKEDIN</small><b>LinkedIn Profile</b></span><span className="contact-arrow">↗</span></a>

            <a className="contact-card" href="https://www.instagram.com/arkamondal_/" target="_blank" rel="noreferrer"><span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" className="contact-svg"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" className="instagram-dot"/></svg></span><span className="contact-card-copy"><small>INSTAGRAM</small><b>@arkamondal_</b></span><span className="contact-arrow">↗</span></a>

          </div>

          <div className="contact-bottom"><span>ARKA MONDAL · MCA</span><div><span>BASED IN INDIA</span></div></div>

        </section>

      </main>

      <footer className="site-footer"><a href="#intro" className="wordmark">Arka<span>®</span></a><span>Built with curiosity, by Arka Mondal.</span><a href="#intro">BACK TO TOP ↑</a></footer>

    </div>

    </>

  );

}

export default App;
