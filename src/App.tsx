import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import "./styles/globals.css";
import Scene from "./three/Scene";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      smoothWheel: true,
    });

    // Keep GSAP and Lenis scrolling in sync
    lenis.on("scroll", ScrollTrigger.update);

    const updateScroll = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateScroll);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline();

      intro
        .from(".navbar", {
          y: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".hero-label",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.3",
        )
        .from(
          ".hero-title",
          {
            y: 80,
            opacity: 0,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.2",
        )
        .from(
          ".hero-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".hero-actions, .social-links",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.2,
          },
          "-=0.4",
        );

      gsap.from(".hero-footer", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animationContext = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });

    return () => animationContext.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={heroRef} id="home">
      {/* Navigation */}
      <nav className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          ARATHY<span>.</span>
        </a>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#skills" onClick={closeMenu}>
            Skills
          </a>
          <a href="#experience" onClick={closeMenu}>
            Experience
          </a>
          <a href="#projects" onClick={closeMenu}>
            Projects
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </div>

        <a href="#contact" className="availability">
          <span className="status-dot"></span>
          Available for opportunities
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">
            <Sparkles size={15} />
            SOFTWARE ENGINEER / FULL-STACK DEVELOPER
          </p>

          <h1 className="hero-title">
            Building
            <br />
            digital <span>experiences.</span>
          </h1>

          <p className="hero-description">
            Hello, I'm Arathy. I create modern, functional and engaging digital
            experiences through thoughtful design and development.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="primary-btn">
              Explore my work
              <ArrowUpRight size={18} />
            </a>

            <a href="#contact" className="secondary-btn">
              Let's connect
            </a>
          </div>

          <div className="social-links">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub size={21} />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={21} />
            </a>
          </div>
        </div>

        {/* Animated Visual */}
        <div className="hero-visual">
          <Scene />

          <p className="visual-caption">CREATIVITY MEETS TECHNOLOGY</p>
        </div>

        {/* Footer */}
        <div className="hero-footer">
          <span>PORTFOLIO — 2026</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      {/* About Section Placeholder */}
      <section className="content-section section-reveal" id="about">
        <p className="section-label">01 / ABOUT ME</p>
        <h2>
          Turning ideas into
          <span> digital reality.</span>
        </h2>
        <p>
          I'm a software engineer with experience in frontend and backend
          development, building practical and user-friendly web applications.
        </p>
      </section>

      {/* Skills Section Placeholder */}
      <section className="content-section section-reveal" id="skills">
        <p className="section-label">02 / SKILLS</p>
        <h2>
          Technologies I <span>work with.</span>
        </h2>
        <p>
          React, TypeScript, JavaScript, PHP, Java, SQL, PostgreSQL and modern
          web technologies.
        </p>
      </section>

      {/* Experience Section Placeholder */}
      <section className="content-section section-reveal" id="experience">
        <p className="section-label">03 / EXPERIENCE</p>
        <h2>
          My professional <span>journey.</span>
        </h2>
        <p>
          Software engineering experience across application development,
          frontend engineering and database integration.
        </p>
      </section>

      {/* Projects Section Placeholder */}
      <section className="content-section section-reveal" id="projects">
        <p className="section-label">04 / PROJECTS</p>
        <h2>
          Selected <span>works.</span>
        </h2>
        <p>
          Explore my web development projects, applications and technical
          experiments.
        </p>
      </section>

      {/* Contact Section Placeholder */}
      <section className="content-section section-reveal" id="contact">
        <p className="section-label">05 / CONTACT</p>
        <h2>
          Let's build something
          <span> amazing.</span>
        </h2>

        <a
          href="mailto:arathym3013@gmail.com"
          className="primary-btn contact-btn"
        >
          Get in touch
          <ArrowUpRight size={18} />
        </a>
      </section>

      <footer className="site-footer">
        <p>© 2026 Arathy. All rights reserved.</p>
        <p>Designed & developed with creativity.</p>
      </footer>
    </main>
  );
}

export default App;
