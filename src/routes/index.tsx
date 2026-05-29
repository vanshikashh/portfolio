import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Download,
  Code2,
  Cpu,
  Database,
  Globe,
  Sparkles,
  Brain,
  Layers,
  Server,
  Copy,
  Check,
  MapPin,
  GraduationCap,
} from "lucide-react";
import portrait from "@/assets/vanshika-portrait.jpeg";
import blob from "@/assets/blob.png";
import persensScreenshot from "@/assets/persens-screenshot.png";
import kogniPreview from "@/assets/kogni-preview.png";
import resume from "@/assets/Vanshika_Sharma_Resume.pdf";

/* ------------------------------- Data ---------------------------------- */

const NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const TECH_BADGES = ["FastAPI", "Django", "React", "PyTorch", "PostgreSQL", "Docker", "ML Systems"];

const METRICS = [
  { value: 3, suffix: "+", label: "Major Projects" },
  { value: 2, suffix: "", label: "Internships" },
  { value: 90.8, suffix: "%", label: "ML Accuracy" },
  { value: 110, suffix: "K+", label: "Validation Ratings" },
];

const EXPERIENCE = [
  {
    role: "ML Research Intern",
    org: "Dept. of AI & Data Science, IGDTUW",
    period: "Jun 2025 — Aug 2025",
    points: [
      "Developed phishing detection system with 92% accuracy.",
      "Benchmarked RF, SVM, and PCA pipelines on a 50K-sample dataset.",
      "Improved model accuracy by 15% over the untuned baseline.",
      "Used feature engineering and 5-fold cross-validation.",
    ],
  },
  {
    role: "Software Developer Intern",
    org: "Clovia Pvt Ltd",
    period: "Jun 2024 — Aug 2024",
    points: [
      "Implemented role-based authentication using Django permissions.",
      "Built optimized ORM queries and removed N+1 query patterns.",
      "Authored a 51-test suite reaching 94% coverage.",
      "Hardened CSRF-protected flows shipped to production.",
    ],
  },
];

const SKILLS = [
  { category: "Languages", icon: Code2, items: ["Python", "C/C++", "Java", "SQL", "JavaScript", "TypeScript", "HTML/CSS"] },
  { category: "Frameworks", icon: Layers, items: ["React", "Next.js", "Django", "FastAPI", "Flask", "Node.js", "WebSockets"] },
  { category: "AI / ML", icon: Brain, items: ["PyTorch", "scikit-learn", "SHAP", "CLIP", "NumPy", "Pandas", "Matplotlib"] },
  { category: "Tools & Platforms", icon: Server, items: ["Docker", "Git", "Firebase", "PostgreSQL", "SQLite", "Railway", "Vercel", "Chrome Ext APIs"] },
];

const PROJECTS = [
  {
    title: "Kogni",
    tagline: "Privacy-preserving cognitive health platform",
    tech: ["Chrome Extension", "FastAPI", "SQLite", "scikit-learn", "SHAP", "Next.js", "WebSockets"],
    description:
      "Uses behavioral signals — keystroke timing and scroll patterns — to predict cognitive fatigue with explainable ML, fully anonymized on-device.",
    highlights: [
      "Random Forest trained on 210K+ datapoints",
      "Bidirectional LSTM with attention — 90.8% accuracy",
      "SHAP explainability for every prediction",
      "Recovery engine using personalized baselines",
    ],
    github: "https://github.com/vanshikashh/Kogni",
    live: null,
    accent: "from-[oklch(0.55_0.08_120)] to-[oklch(0.78_0.06_90)]",
    image: kogniPreview,
  },
  {
    title: "Persens",
    tagline: "Perceptual material search engine",
    tech: ["PyTorch", "CLIP", "MLP", "FastAPI", "Qdrant", "React", "TypeScript", "Docker"],
    description:
      "ML-powered perceptual fingerprinting system with attribute-directed retrieval across materials, validated by 110K+ human ratings.",
    highlights: [
      "110,000+ human validation ratings",
      "Recall@5 = 3.2/5 across material classes",
      "Grad-CAM across 16 perceptual dimensions",
      "Authentication system: ROC-AUC = 0.89",
    ],
    github: "https://github.com/vanshikashh/Persens",
    live: "https://persens.vercel.app",
    accent: "from-[oklch(0.62_0.09_70)] to-[oklch(0.85_0.05_100)]",
    image: persensScreenshot,
  },
  {
    title: "Exit Management System",
    tagline: "HR offboarding with workflow automation",
    tech: ["Python", "Django", "SQLite", "HTML/CSS"],
    description:
      "Role-based HR offboarding platform with workflow automation, analytics, and same-day processing optimization.",
    highlights: [
      "5-state workflow tracker",
      "Automated exit interview aggregation",
      "Department-based role restrictions",
      "Task automation with progress tracking",
    ],
    github: "https://github.com/vanshikashh/Exit-Management",
    live: null,
    accent: "from-[oklch(0.48_0.07_140)] to-[oklch(0.82_0.04_85)]",
    image: null,
  },
];

const SERVICES = [
  { icon: Globe, title: "Full-Stack Development", body: "End-to-end web platforms with React, Next.js, Django, and FastAPI." },
  { icon: Server, title: "Backend Engineering", body: "Production APIs, auth, role systems, and scalable data layers." },
  { icon: Code2, title: "REST API Design", body: "Clean, documented, testable APIs with strong contracts." },
  { icon: Brain, title: "AI / ML Systems", body: "Model training, deployment, and explainability pipelines." },
  { icon: Sparkles, title: "Research-Oriented ML", body: "Benchmarking, ablations, and reproducible ML research." },
  { icon: Cpu, title: "Chrome Extensions", body: "Privacy-respecting, low-latency browser extensions." },
  { icon: Database, title: "Database Optimization", body: "Query tuning, indexing strategy, and N+1 elimination." },
  { icon: Layers, title: "ML Prototyping", body: "From notebook to deployed inference in days, not months." },
];

const ACHIEVEMENTS = [
  { title: "Nutanix WIT Scholarship", year: "2025" },
  { title: "Millennium Fellow", year: "2025" },
  { title: "SheFi Scholar", year: "2024" },
  { title: "Vice President — 180 Degrees Consulting", year: "" },
  { title: "UI/UX Mentor — GDG IGDTUW", year: "" },
  { title: "Project Leader — Enactus IGDTUW", year: "" },
];

/* ------------------------------ Helpers --------------------------------- */

function useCount(target: number, inView: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return n;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const n = useCount(value, inView);
  const display = Number.isInteger(value) ? Math.round(n).toString() : n.toFixed(1);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------- Sections ------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "w-[min(880px,94vw)]" : "w-[min(960px,94vw)]"
      }`}
    >
      <div className="glass flex items-center justify-between rounded-full px-5 py-3 shadow-[0_8px_30px_-12px_oklch(0.4_0.05_90/0.25)]">
        <a href="#top" className="font-display text-sm font-semibold tracking-tight">
          vanshika<span className="text-[var(--olive)]">.</span>
        </a>
        <ul className="hidden items-center gap-7 text-sm text-foreground/70 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="transition hover:text-foreground">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:bg-[var(--olive-dark)]"
        >
          Let's talk
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden pt-32 pb-20 grain">
      <motion.img
        src={blob}
        alt=""
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute -right-40 -top-20 h-[640px] w-[640px] opacity-60 blur-3xl"
      />
      <motion.img
        src={blob}
        alt=""
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute -left-60 top-1/2 h-[520px] w-[520px] opacity-40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-8">
        <motion.div style={{ y }} className="lg:col-span-7 lg:pt-10">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--olive)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--olive)]" />
              </span>
              Open to SWE / ML roles · 2026
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="text-balance font-display text-[clamp(2.5rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
              Building intelligent systems that blend{" "}
              <span className="font-serif italic text-[var(--olive-dark)]">AI, research</span> &amp;{" "}
              <span className="font-serif italic text-[var(--olive-dark)]">engineering</span>.
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-7 max-w-xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
              AIML undergraduate at IGDTUW building scalable backend systems, ML-powered
              applications, and production-grade developer tools.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-[var(--olive-dark)]"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/60 px-6 py-3 text-sm font-medium backdrop-blur transition hover:border-foreground/40"
              >
                Contact Me
              </a>
              <a
                href={resume}
                download="Vanshika_Sharma_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-foreground/70 transition hover:text-foreground"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="mt-12 flex flex-wrap gap-2">
              {TECH_BADGES.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  className="rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={5}>
            <div className="mt-8 flex items-center gap-5 text-foreground/60">
              {[
                { Icon: Github, href: "https://github.com/vanshikashh", label: "GitHub" },
                { Icon: Linkedin, href: "https://linkedin.com/in/vanshekasharma", label: "LinkedIn" },
                { Icon: Code2, href: "https://leetcode.com/vansheka", label: "LeetCode" },
                { Icon: Mail, href: "mailto:ivanshika2006@gmail.com", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </Reveal>
        </motion.div>

        <div className="relative lg:col-span-5">
          <Reveal delay={2} className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border bg-secondary shadow-[0_30px_80px_-30px_oklch(0.3_0.05_90/0.4)]">
              <img
                src={portrait}
                alt="Vanshika Sharma — AIML engineer and full-stack developer"
                className="h-full w-full object-cover"
                width={896}
                height={1152}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: 5 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="glass absolute -right-4 top-10 rounded-2xl px-4 py-3 shadow-lg"
            >
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-3.5 w-3.5 text-[var(--olive)]" />
                <span className="font-medium">New Delhi, IN</span>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>

      {/* Metrics */}
      <div className="relative mx-auto mt-24 max-w-7xl px-6">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border/60 md:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label} className="bg-card/80 p-6 backdrop-blur md:p-8">
                <div className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  <Counter value={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionLabel({ kicker, title, lead }: { kicker: string; title: React.ReactNode; lead?: string }) {
  return (
    <div className="mb-14 max-w-3xl">
      <Reveal>
        <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--olive-dark)]">
          <span className="h-px w-8 bg-[var(--olive-dark)]/60" />
          {kicker}
        </div>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="text-balance font-display text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={2}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel
          kicker="About"
          title={
            <>
              An engineer wired for <span className="font-serif italic text-[var(--olive-dark)]">systems</span>, research,
              and product craft.
            </>
          }
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-foreground/80">
              <p>
                I'm Vanshika — an AIML undergraduate at <span className="text-foreground">IGDTUW</span> (CGPA 8.69)
                building full-stack applications with Django, FastAPI, React, and PostgreSQL.
              </p>
              <p>
                I've shipped production-grade systems including a privacy-preserving cognitive health platform and
                an ML-based perceptual search engine. My work sits at the intersection of <span className="text-foreground">backend engineering</span>,
                <span className="text-foreground"> ML systems</span>, and <span className="text-foreground">research</span>.
              </p>
              <p className="text-muted-foreground">
                I care about clean APIs, reproducible experiments, fast feedback loops, and software that is honest about
                its uncertainty.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1} className="lg:col-span-5">
            <div className="glass relative overflow-hidden rounded-3xl p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--olive)]/15 text-[var(--olive-dark)]">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Education</div>
              </div>
              <div className="font-display text-xl font-semibold tracking-tight">
                Indira Gandhi Delhi Technical University for Women
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                B.Tech, Artificial Intelligence &amp; Machine Learning
              </div>
              <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Period</div>
                  <div className="mt-1 text-sm font-medium">Aug 2023 — May 2027</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">CGPA</div>
                  <div className="mt-1 font-display text-2xl font-semibold">8.69</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel
          kicker="Experience"
          title={
            <>
              Where I've <span className="font-serif italic text-[var(--olive-dark)]">built</span> and{" "}
              <span className="font-serif italic text-[var(--olive-dark)]">researched</span>.
            </>
          }
        />

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-1/2" />

          <div className="space-y-12">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.role} delay={i}>
                <div className={`relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className={`${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"} pl-12 md:pl-0`}>
                    <div className="text-xs uppercase tracking-widest text-[var(--olive-dark)]">{e.period}</div>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">{e.role}</h3>
                    <div className="mt-1 text-sm text-muted-foreground">{e.org}</div>
                  </div>

                  <div className="relative pl-12 md:pl-12">
                    <div className="absolute left-4 top-2 grid h-3 w-3 -translate-x-1/2 place-items-center md:left-0">
                      <div className="absolute h-3 w-3 animate-ping rounded-full bg-[var(--olive)]/50" />
                      <div className="relative h-2 w-2 rounded-full bg-[var(--olive)]" />
                    </div>
                    <div className="group rounded-2xl border border-border bg-card/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_20px_50px_-20px_oklch(0.3_0.05_90/0.3)]">
                      <ul className="space-y-2.5 text-sm text-foreground/80">
                        {e.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--olive)]" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel
          kicker="Stack"
          title={
            <>
              The <span className="font-serif italic text-[var(--olive-dark)]">tools</span> I reach for.
            </>
          }
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <Reveal key={s.category} delay={i}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_20px_50px_-20px_oklch(0.3_0.05_90/0.3)]">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--olive)]/10 blur-2xl transition group-hover:bg-[var(--olive)]/20" />
                <div className="relative">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-foreground/5 text-foreground/70">
                    <s.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold tracking-tight">{s.category}</h3>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-foreground/75 transition hover:border-[var(--olive)]/50 hover:text-foreground"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel
          kicker="Selected Work"
          title={
            <>
              Production systems, <span className="font-serif italic text-[var(--olive-dark)]">research</span>, and
              everything in between.
            </>
          }
          lead="A few projects where engineering rigor met curious questions."
        />

        <div className="space-y-10">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i}>
              <article className="group relative overflow-hidden rounded-[2rem] border border-border bg-card/70 backdrop-blur transition hover:shadow-[0_30px_80px_-30px_oklch(0.3_0.05_90/0.35)]">
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
                  <div className="relative lg:col-span-5">
                    <div className={`relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full ${p.image ? "bg-secondary" : `bg-gradient-to-br ${p.accent}`}`}>
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={`${p.title} screenshot`}
                          className="h-full w-full object-cover object-top"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 grain opacity-40" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="font-serif text-[clamp(3rem,8vw,6rem)] italic text-background/90 mix-blend-overlay">
                              {p.title}
                            </div>
                          </div>
                        </>
                      )}
                      <div className="absolute left-5 top-5 rounded-full bg-background/85 px-3 py-1 text-xs font-medium backdrop-blur">
                        0{i + 1} / 0{PROJECTS.length}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 lg:col-span-7 lg:p-12">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h3>
                        <div className="mt-1 text-sm text-[var(--olive-dark)]">{p.tagline}</div>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${p.title} GitHub`}
                          className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:border-foreground/40 hover:-translate-y-0.5"
                        >
                          <Github className="h-4 w-4" strokeWidth={1.5} />
                        </a>
                        {p.live && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${p.title} live demo`}
                            className="grid h-10 w-10 place-items-center rounded-full bg-foreground text-background transition hover:-translate-y-0.5 hover:bg-[var(--olive-dark)]"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="mt-5 text-base leading-relaxed text-foreground/75">{p.description}</p>

                    <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-foreground/80 sm:grid-cols-2">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--olive)]" strokeWidth={2} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel
          kicker="Services"
          title={
            <>
              Ways I can <span className="font-serif italic text-[var(--olive-dark)]">collaborate</span>.
            </>
          }
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i % 4}>
              <div className="group h-full bg-card/80 p-7 transition hover:bg-card">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-border text-foreground/70 transition group-hover:border-[var(--olive)] group-hover:text-[var(--olive-dark)]">
                  <s.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel
          kicker="Recognition"
          title={
            <>
              Scholarships, <span className="font-serif italic text-[var(--olive-dark)]">fellowships</span>, and
              leadership.
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i % 3}>
              <div className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_20px_50px_-20px_oklch(0.3_0.05_90/0.3)]">
                <div>
                  <Sparkles className="h-5 w-5 text-[var(--olive)]" strokeWidth={1.5} />
                  <div className="mt-4 font-display text-base font-semibold leading-snug tracking-tight">{a.title}</div>
                </div>
                {a.year && (
                  <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                    {a.year}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "ivanshika2006@gmail.com";
  const copy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-[oklch(0.96_0.02_90)] via-[oklch(0.93_0.03_95)] to-[oklch(0.9_0.04_110)] p-10 md:p-16 grain">
          <img src={blob} alt="" aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] opacity-50 blur-3xl" />
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--olive-dark)]">Contact</div>
              <h2 className="mt-4 text-balance font-display text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
                Let's build something{" "}
                <span className="font-serif italic text-[var(--olive-dark)]">impactful</span>.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
                I'm always up for thoughtful conversations about backend systems, ML research, and engineering craft.
                Reach out — I read everything.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <button
                  onClick={copy}
                  className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/70 px-5 py-3 text-sm font-medium backdrop-blur transition hover:border-foreground/50"
                >
                  {copied ? <Check className="h-4 w-4 text-[var(--olive-dark)]" /> : <Copy className="h-4 w-4" />}
                  <span className="font-mono">{email}</span>
                </button>
                <a
                  href={`mailto:${email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-[var(--olive-dark)]"
                >
                  Send a message
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="space-y-3">
                {[
                  { Icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/vanshekasharma", href: "https://linkedin.com/in/vanshekasharma" },
                  { Icon: Github, label: "GitHub", value: "github.com/vanshikashh", href: "https://github.com/vanshikashh" },
                  { Icon: Code2, label: "LeetCode", value: "leetcode.com/vansheka", href: "https://leetcode.com/vansheka" },
                  { Icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
                ].map(({ Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-background/60 px-5 py-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-foreground/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-foreground/5 text-foreground/70">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
                        <div className="text-sm font-medium">{value}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-foreground/50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/80 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
        <div>
          <div className="font-display text-base font-semibold tracking-tight">
            vanshika<span className="text-[var(--olive)]">.</span>
          </div>
          <p className="mt-2 max-w-md font-serif text-sm italic text-muted-foreground">
            "Engineering systems that think, adapt, and scale."
          </p>
        </div>
        <ul className="flex flex-wrap gap-5 text-sm text-muted-foreground">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="transition hover:text-foreground">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 text-foreground/60">
          {[
            { Icon: Github, href: "https://github.com/vanshikashh" },
            { Icon: Linkedin, href: "https://linkedin.com/in/vanshekasharma" },
            { Icon: Mail, href: "mailto:ivanshika2006@gmail.com" },
          ].map(({ Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noreferrer" className="transition hover:-translate-y-0.5 hover:text-foreground">
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-6 text-xs text-muted-foreground/70">
        © {new Date().getFullYear()} Vanshika Sharma. Designed &amp; built with care.
      </div>
    </footer>
  );
}

/* --------------------------------- Page --------------------------------- */

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Vanshika Sharma — AI/ML Engineer & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Vanshika Sharma, AIML undergraduate at IGDTUW building backend systems, ML-powered applications, and research-driven developer tools.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative overflow-x-clip">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Services />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}
