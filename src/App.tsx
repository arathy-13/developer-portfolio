import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import "./styles/globals.css";
import Scene from "./three/Scene";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./components/MagneticButton";
import CustomCursor from "./components/CustomCursor";

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
        // Animate the complete section
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

        // Reveal the section label and heading
        const textElements = section.querySelectorAll(".section-label, h2");

        gsap.fromTo(
          textElements,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });

    return () => animationContext.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [contactStatus, setContactStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [contactFeedback, setContactFeedback] = useState("");

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setContactStatus("loading");
    setContactFeedback("");

    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Please check your details and try again.");
        }

        throw new Error("Something went wrong. Please try again later.");
      }

      const data = await response.json();

      setContactStatus("success");
      setContactFeedback(
        data.message || "Your message has been sent successfully!",
      );

      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setContactStatus("error");

      setContactFeedback(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again.",
      );
    }
  };

  const handleContactChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setContactForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <>
      <CustomCursor />
      <main ref={heroRef} id="home">
        {/* Navigation */}
        <nav className="navbar">
          <a href="#home" className="logo" onClick={closeMenu}>
            ARATHY<span>.M</span>
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
            <a href="#education" onClick={closeMenu}>
              Education
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
              Hello, I'm Arathy. I create modern, functional and engaging
              digital experiences through thoughtful design and development.
            </p>

            <div className="hero-actions">
              <MagneticButton href="#projects" className="primary-btn">
                Explore my work
                <ArrowUpRight size={18} />
              </MagneticButton>

              <MagneticButton href="#contact" className="secondary-btn">
                Let's connect
              </MagneticButton>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/arathy-13"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/arathy-m-b76441257/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
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

        {/* About Section */}
        <section className="content-section section-reveal" id="about">
          <p className="section-label">01 / ABOUT ME</p>

          <div className="about-grid">
            <div className="about-heading">
              <h2>
                Engineering ideas into
                <span> digital experiences.</span>
              </h2>
            </div>

            <div className="about-description">
              <p className="about-intro">
                I'm Arathy, a Software Engineer and Full Stack Developer
                passionate about building meaningful web applications,
                intelligent solutions, and engaging digital experiences.
              </p>

              <p>
                My professional journey includes working on education technology
                products, dashboards, analytics, and reporting solutions at
                Bristlecone. I've worked with technologies including PHP,
                JavaScript, Vue.js, SQL, MySQL, and PostgreSQL.
              </p>

              <p>
                Currently, I'm contributing to application development at Achyut
                Inspire Technology and Solutions (AITS), working with React,
                TypeScript, PostgreSQL, and reporting technologies such as
                JasperReports.
              </p>

              <p>
                I've also developed independent projects involving AI-powered
                academic applications and browser-based augmented reality
                navigation.
              </p>

              <p>
                I enjoy exploring new technologies, solving challenging
                problems, and transforming ideas into practical software
                solutions.
              </p>
            </div>
          </div>

          <div className="about-highlights">
            <div className="highlight-item">
              <h3>Full Stack</h3>
              <p>Web application development</p>
            </div>

            <div className="highlight-item">
              <h3>AI + Web</h3>
              <p>Intelligent application development</p>
            </div>

            <div className="highlight-item">
              <h3>Reporting</h3>
              <p>Dashboards and data visualization</p>
            </div>
          </div>
        </section>

        {/* Skills Section Placeholder */}

        {/* Skills Section */}
        <section className="content-section section-reveal" id="skills">
          <p className="section-label">02 / TECHNICAL SKILLS</p>

          <div className="skills-heading">
            <h2>
              Tools I use to
              <span> bring ideas to life.</span>
            </h2>
            <p>
              A versatile technology stack spanning frontend development,
              backend engineering, databases, and reporting solutions.
            </p>
          </div>

          <div className="skills-grid">
            {/* Frontend */}
            <div className="skill-card">
              <div className="skill-card-header">
                <span className="skill-icon">01</span>
                <h3>Frontend Development</h3>
              </div>

              <p>Building responsive and interactive user experiences.</p>

              <div className="skill-tags">
                <span>React.js</span>
                <span>TypeScript</span>
                <span>JavaScript</span>
                <span>Vue.js</span>
                <span>Angular.js</span>
                <span>HTML5</span>
                <span>CSS3</span>
                <span>Tailwind CSS</span>
                <span>jQuery</span>
                <span>AJAX</span>
              </div>
            </div>

            {/* Backend */}
            <div className="skill-card">
              <div className="skill-card-header">
                <span className="skill-icon">02</span>
                <h3>Backend Development</h3>
              </div>

              <p>Developing application logic and integrating services.</p>

              <div className="skill-tags">
                <span>PHP</span>
                <span>CodeIgniter</span>
                <span>Java</span>
                <span>C#</span>
                <span>.NET</span>
                <span>Python</span>
                <span>REST API Integration</span>
                <span>MVC Architecture</span>
                <span>OOP</span>
                <span>AI Integration</span>
              </div>
            </div>

            {/* Databases */}
            <div className="skill-card">
              <div className="skill-card-header">
                <span className="skill-icon">03</span>
                <h3>Databases</h3>
              </div>

              <p>Working with relational databases and data management.</p>

              <div className="skill-tags">
                <span>PostgreSQL</span>
                <span>MySQL</span>
                <span>SQL Server</span>
                <span>Supabase</span>
                <span>NoSQL</span>
                <span>Database Design</span>
                <span>SQL</span>
              </div>
            </div>

            {/* Reporting and Tools */}
            <div className="skill-card">
              <div className="skill-card-header">
                <span className="skill-icon">04</span>
                <h3>Reporting & Tools</h3>
              </div>

              <p>
                Creating reports, processing documents, and managing development
                workflows.
              </p>

              <div className="skill-tags">
                <span>JasperReports</span>
                <span>JRXML</span>
                <span>Jaspersoft Studio</span>
                <span>Jaspersoft Server</span>
                <span>Crystal Reports</span>
                <span>BI Reporting</span>
                <span>PDF Processing</span>
                <span>Git</span>
                <span>GitHub</span>
                <span>Jira</span>
                <span>Postman</span>
                <span>Docker</span>
                <span>Visual Studio</span>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section Placeholder */}

        {/* Experience Section */}
        <section className="content-section section-reveal" id="experience">
          <p className="section-label">03 / PROFESSIONAL EXPERIENCE</p>

          <div className="experience-heading">
            <h2>
              Where I've
              <span> made an impact.</span>
            </h2>

            <p>
              My professional journey across software engineering, full-stack
              development, education technology, and reporting solutions.
            </p>
          </div>

          <div className="experience-timeline">
            {/* AITS */}
            <article className="experience-item">
              <div className="timeline-marker">
                <span></span>
              </div>

              <div className="experience-card">
                <div className="experience-top">
                  <div>
                    <span className="experience-period">
                      MAY 2026 — PRESENT
                    </span>

                    <h3>Full Stack Developer Intern</h3>

                    <h4>Achyut Inspire Technology and Solutions (AITS)</h4>
                  </div>

                  <span className="experience-type">Internship</span>
                </div>

                <p className="experience-summary">
                  Contributing to web application development, dashboards, data
                  visualizations, and reporting workflows.
                </p>

                <ul className="experience-responsibilities">
                  <li>
                    Develop and maintain user-facing features using React.js,
                    TypeScript, JavaScript, and Tailwind CSS, integrated with
                    PostgreSQL.
                  </li>

                  <li>
                    Contribute to a browser-based JRXML Report Builder that
                    generates report templates from user-defined configurations.
                  </li>

                  <li>
                    Support real-time report preview and validation, including
                    template structure, data types, and layout accuracy.
                  </li>

                  <li>
                    Improve document workflows through DOCX post-processing and
                    PDF-related utilities.
                  </li>

                  <li>
                    Collaborate on feature development, testing, debugging, and
                    project tracking.
                  </li>
                </ul>

                <div className="experience-tags">
                  <span>React.js</span>
                  <span>TypeScript</span>
                  <span>JavaScript</span>
                  <span>Tailwind CSS</span>
                  <span>PostgreSQL</span>
                  <span>JasperReports</span>
                  <span>.NET</span>
                  <span>C#</span>
                  <span>Java</span>
                  <span>GitHub</span>
                  <span>Jira</span>
                </div>
              </div>
            </article>

            {/* Bristlecone */}
            <article className="experience-item">
              <div className="timeline-marker">
                <span></span>
              </div>

              <div className="experience-card">
                <div className="experience-top">
                  <div>
                    <span className="experience-period">
                      JANUARY 2022 — JULY 2024
                    </span>

                    <h3>Software Engineer</h3>

                    <h4>Bristlecone</h4>
                  </div>

                  <span className="experience-type">Full-time</span>
                </div>

                <p className="experience-summary">
                  Worked on education technology products, supporting reporting,
                  analytics, learning management, and student performance
                  solutions.
                </p>

                <ul className="experience-responsibilities">
                  <li>
                    Worked on education-focused products including DnA (Data and
                    Analytics), Learning Management System (LMS), and Gradebook.
                  </li>

                  <li>
                    Contributed to DnA reporting and dashboard features that
                    transformed raw data into meaningful reports and analytics.
                  </li>

                  <li>
                    Supported LMS features that enabled customers to review
                    student learning and performance information.
                  </li>

                  <li>
                    Contributed to Gradebook dashboards and reports covering
                    historical performance across grades and assessment levels.
                  </li>

                  <li>
                    Worked with application data, reporting workflows, and
                    customer-specific requirements, while collaborating with
                    teammates to troubleshoot and maintain features.
                  </li>
                </ul>

                <div className="experience-tags">
                  <span>PHP</span>
                  <span>JavaScript</span>
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>MySQL</span>
                  <span>PostgreSQL</span>
                  <span>Vue.js</span>
                  <span>jQuery</span>
                  <span>AJAX</span>
                  <span>Java</span>
                  <span>JasperReports</span>
                  <span>Docker</span>
                  <span>Postman</span>
                  <span>Jira</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Projects Section Placeholder */}

        {/* Projects Section */}
        <section className="content-section section-reveal" id="projects">
          <p className="section-label">04 / FEATURED PROJECTS</p>

          <div className="projects-heading">
            <h2>
              Things I've
              <span> built with purpose.</span>
            </h2>

            <p>
              A selection of projects showcasing my interests in full-stack
              engineering, artificial intelligence, and modern web technologies.
            </p>
          </div>

          <div className="projects-list">
            {/* Project 01 - Syllabus Genius */}
            <article className="project-card">
              <div className="project-visual syllabus-visual">
                <div className="project-window">
                  <div className="window-header">
                    <div className="window-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span>SYLLABUS GENIUS</span>
                  </div>

                  <div className="syllabus-dashboard">
                    <div className="dashboard-sidebar">
                      <span className="sidebar-logo">SG.</span>
                      <span className="sidebar-active"></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                    <div className="dashboard-main">
                      <div className="dashboard-welcome">
                        <div>
                          <small>YOUR LEARNING SPACE</small>
                          <h4>Welcome back!</h4>
                        </div>
                        <span className="dashboard-avatar">A</span>
                      </div>

                      <div className="dashboard-stats">
                        <div>
                          <small>Subjects</small>
                          <strong>06</strong>
                        </div>
                        <div>
                          <small>Study progress</small>
                          <strong>78%</strong>
                        </div>
                      </div>

                      <div className="dashboard-chart">
                        <div className="chart-heading">
                          <span>Learning activity</span>
                          <span>This week</span>
                        </div>

                        <div className="chart-bars">
                          {[35, 55, 42, 75, 60, 90, 68].map((height, index) => (
                            <span
                              key={index}
                              style={{ height: `${height}%` }}
                            ></span>
                          ))}
                        </div>
                      </div>

                      <div className="dashboard-subject">
                        <span>AI-generated study materials</span>
                        <span className="subject-status">Ready</span>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="project-visual-label">
                  AI-POWERED LEARNING PLATFORM
                </span>
              </div>

              <div className="project-information">
                <div className="project-meta">
                  <span>01 / FULL STACK DEVELOPMENT</span>
                  <span className="project-category">AI & EDUCATION</span>
                </div>

                <h3>Syllabus Genius</h3>

                <p className="project-tagline">
                  Turning academic syllabuses into personalized learning
                  experiences.
                </p>

                <p className="project-description">
                  An AI-powered academic platform that analyzes uploaded
                  syllabuses and transforms them into structured learning
                  content. It helps students generate notes, quizzes, practice
                  problems, learning analytics, and personalized study plans.
                </p>

                <div className="project-features">
                  <span>AI-generated notes and quizzes</span>
                  <span>PDF syllabus extraction</span>
                  <span>AI learning mentor</span>
                  <span>Personalized study planning</span>
                  <span>Learning analytics</span>
                </div>

                <div className="project-tech">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>Tailwind CSS</span>
                  <span>Supabase</span>
                  <span>PostgreSQL</span>
                  <span>Gemini AI</span>
                  <span>React Query</span>
                </div>
              </div>
            </article>

            {/* Project 02 - AR NAV */}
            <article className="project-card project-card-reverse">
              <div className="project-visual ar-visual">
                <div className="ar-device">
                  <div className="ar-device-top">
                    <span>AR NAV</span>
                    <span className="ar-live-dot">● LIVE</span>
                  </div>

                  <div className="ar-camera-view">
                    <div className="ar-sky"></div>
                    <div className="ar-ground"></div>

                    <div className="ar-route-line"></div>

                    <div className="ar-direction">
                      <span>↑</span>
                      <small>TURN AHEAD</small>
                    </div>

                    <div className="ar-distance">
                      <strong>120 m</strong>
                      <span>Continue straight</span>
                    </div>

                    <div className="ar-location-pin">
                      <span></span>
                    </div>
                  </div>

                  <div className="ar-device-bottom">
                    <div>
                      <span>VOICE</span>
                      <strong>ON</strong>
                    </div>
                    <div>
                      <span>LOCATION</span>
                      <strong>ACTIVE</strong>
                    </div>
                    <div>
                      <span>ROUTE</span>
                      <strong>READY</strong>
                    </div>
                  </div>
                </div>

                <span className="project-visual-label">
                  BROWSER-BASED AR NAVIGATION
                </span>
              </div>

              <div className="project-information">
                <div className="project-meta">
                  <span>02 / FULL STACK DEVELOPMENT</span>
                  <span className="project-category">AR & WEB APIS</span>
                </div>

                <h3>AR NAV</h3>

                <p className="project-tagline">
                  Exploring navigation through augmented reality.
                </p>

                <p className="project-description">
                  A progressive web application for pedestrian navigation
                  directly in the browser. It combines Google Maps route
                  calculation with camera-based directional overlays, location
                  tracking, and device orientation to support an interactive
                  navigation experience.
                </p>

                <div className="project-features">
                  <span>Camera-based directional overlays</span>
                  <span>Google Maps route integration</span>
                  <span>Voice guidance and commands</span>
                  <span>Haptic feedback</span>
                  <span>Real-time location sharing</span>
                </div>

                <div className="project-tech">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>Tailwind CSS</span>
                  <span>Supabase</span>
                  <span>Google Maps API</span>
                  <span>Web APIs</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="content-section section-reveal" id="education">
          <p className="section-label">05 / EDUCATION & CERTIFICATIONS</p>

          <div className="education-heading">
            <h2>
              Learning that shapes <span>what I build.</span>
            </h2>
            <p>
              A foundation in computer science, strengthened through continuous
              learning and hands-on technical exploration.
            </p>
          </div>

          <div className="education-grid">
            <div className="education-timeline">
              <h3 className="subsection-title">Education</h3>

              <div className="education-item">
                <div className="education-marker"></div>
                <div className="education-card">
                  <span className="education-period">JUL 2024 — AUG 2026</span>
                  <h4>Master of Science in Computer Science</h4>
                  <p>Bharathiar University</p>
                  <span className="education-type">Postgraduate Degree</span>
                </div>
              </div>

              <div className="education-item">
                <div className="education-marker"></div>
                <div className="education-card">
                  <span className="education-period">COMPLETED 2021</span>
                  <h4>Bachelor of Science in Computer Science</h4>
                  <p>Calicut University</p>
                  <span className="education-type">Undergraduate Degree</span>
                </div>
              </div>

              <div className="education-item">
                <div className="education-marker"></div>
                <div className="education-card">
                  <span className="education-period">MAY 2021 — JAN 2022</span>
                  <h4>Web Development and MVC .NET</h4>
                  <p>Professional Training Course</p>
                  <span className="education-type">Technical Training</span>
                </div>
              </div>
            </div>

            <div className="certifications">
              <h3 className="subsection-title">Certifications</h3>

              <div className="certification-list">
                {[
                  "JavaScript Training — Prudentia",
                  "Oracle Database 12c: Basic SQL",
                  "PHP: OOP with Databases",
                  "Learning Python",
                  "Vue: The Complete Guide",
                  "jQuery Essential Training",
                  "DevOps Fundamentals",
                  "The Complete Java Certification Course",
                ].map((certification, index) => (
                  <div className="certification-card" key={certification}>
                    <div className="certification-icon">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <p>{certification}</p>
                    <span className="certification-arrow">↗</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section Placeholder */}

        <section
          className="content-section section-reveal contact-section"
          id="contact"
        >
          <p className="section-label">06 / GET IN TOUCH</p>

          <div className="contact-content">
            <div className="contact-heading">
              <span className="contact-eyebrow">HAVE A PROJECT IN MIND?</span>

              <h2>
                Let's create something
                <span> meaningful together.</span>
              </h2>

              <p>
                I'm always interested in exploring new opportunities,
                collaborating on exciting projects, and connecting with people
                who love building great things.
              </p>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="contact-name">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      maxLength={100}
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-email">Your Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      maxLength={150}
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    maxLength={200}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-message">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about your project or opportunity..."
                    value={contactForm.message}
                    onChange={handleContactChange}
                    maxLength={5000}
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="primary-btn contact-submit"
                  disabled={contactStatus === "loading"}
                >
                  {contactStatus === "loading" ? "Sending..." : "Send Message"}

                  <ArrowUpRight size={18} />
                </button>

                {contactFeedback && (
                  <p
                    className={`contact-feedback ${
                      contactStatus === "success" ? "success" : "error"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {contactFeedback}
                  </p>
                )}
              </form>
            </div>

            <div className="contact-details">
              <div className="contact-detail-card">
                <span className="contact-detail-label">EMAIL</span>
                <a href="mailto:arathy13m@gmail.com">
                  arathy13m@gmail.com
                  <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="contact-detail-card">
                <span className="contact-detail-label">PHONE</span>
                <a href="tel:+917561009266">
                  +91 7561009266
                  <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="contact-detail-card">
                <span className="contact-detail-label">LOCATION</span>
                <p>Kerala, India</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-content">
            <a href="#home" className="footer-logo">
              Arathy<span>.M</span>
            </a>

            <p>Designed & developed with curiosity and creativity.</p>

            <div className="footer-socials">
              <a
                href="https://github.com/arathy-13"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub size={19} />
              </a>

              <a
                href="https://www.linkedin.com/in/arathy-m-b76441257/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={19} />
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Arathy M. All rights reserved.</p>
            <a href="#home">Back to top ↑</a>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
