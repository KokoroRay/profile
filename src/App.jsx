import { useEffect, useRef, useState } from 'react';

const navItems = [
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const coreExpertise = [
  { icon: 'coffee', title: 'Java', subtitle: 'Spring Boot' },
  { icon: 'terminal', title: 'C#', subtitle: '.NET Ecosystem' },
  { icon: 'rocket', title: 'Go', subtitle: 'Microservices' },
  { icon: 'language', title: 'Web Stack', subtitle: 'HTML/CSS/JS' },
  { icon: 'smartphone', title: 'Flutter', subtitle: 'Mobile & Web' },
  { icon: 'architecture', title: 'Dart', subtitle: 'Type-Safe' },
];

const devOpsTools = [
  'Docker',
  'Kubernetes',
  'CI/CD',
  'Jenkins',
  'Kafka',
  'n8n',
  'GitHub Act.',
  'GitLab CI',
  'ArgoCD',
];

const databaseTools = ['SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB'];

const projects = [
  {
    title: 'Microservices Backend',
    description:
      'A high-throughput distributed system designed for real-time data processing. Features gRPC communication, Redis caching, and horizontal scaling capabilities.',
    tags: ['Go', 'Redis', 'gRPC'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBiWkB6yY3AREtSQD1-sTN0e4PJ6HKrZuZfF_5UV0cIOGv2RD28_lneGwUMoH6DJ-Pflaqvvs8ju8QHMvkIkm_MWm8wJE4NEibBEGAY5KkXEXCauNF_inTygGN0hpxzqVk46bMsEqMncnF_3X-fPcKFDXNzGs2F9EeSdzsHVxwnz_CG_jDupofB2BlpLAaK_gq1dc7z2lnLvzKJ0OKsfkJzqjezEhRYteFaXXFkyz54pd0v60cBVDgqfjW89gDSn7czNmtuLb8qS8E',
  },
  {
    title: 'Infrastructure as Code',
    description:
      'Fully automated cloud provisioning using Terraform. Multi-region disaster recovery and auto-scaling groups for enterprise-level availability.',
    tags: ['Terraform', 'AWS', 'Ansible'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC7BdHeAhXGJqRKj4edUq1BrO7l4tamJ0RZG2jKQb7l5ODtbSS8kpQtNnRJ69nppgr9KeQE357pC4ZxGMRtJR-HLFBhj1sMFORWp9S1pzaSo-oMDffiRtoxZeBQuTtmbWZQ4MDd4oQWoftZ97fB2_ZXXjOHSL9YBpBSFe4odzKv-3YIiNrxbrG84wpg9-cc0RAotYbCezW-cH6uhhZCgE_kwdl0VCpCc9Fq4PwIKxUrNTG-1Ja6sDLAwi4fceo6sLy3HHvUTvZVYZQ',
  },
];

const timeline = [
  {
    year: '9/2025 - 12/2025',
    label: 'Rikkeisoft HCM',
    title: 'Backend Developer Intern',
    description:
      'Built backend services with Java Spring Boot and AWS.',
    align: 'left',
    details: [
      'Rikkeisoft HCM',
      'Java Spring Boot, AWS, Docker',
      'Built the hocvienit.id.vn project during the internship at Rikkeisoft.',
      'RESTful APIs, CI/CD, async processing, serverless workflows',
    ],
  },
];

function SectionReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    const PARTICLE_COUNT = 200;
    const ICE_BLUE = '#7dd3fc';
    let animationFrameId = 0;

    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 1 + Math.random() * 1.5;
        this.opacity = 0.1 + Math.random() * 0.3;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.originOpacity = this.opacity;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 300;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            this.x += dx * force * 0.02;
            this.y += dy * force * 0.02;
            this.opacity = Math.min(0.6, this.originOpacity + force * 0.3);
          } else {
            this.opacity = this.originOpacity;
          }
        }

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = ICE_BLUE;
        ctx.shadowBlur = Math.min(12, this.size * 6);
        ctx.shadowColor = ICE_BLUE;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.restore();
      }
    }

    function initParticles() {
      particles = [];
      for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        particles.push(new Particle());
      }
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = window.requestAnimationFrame(animate);
    }

    const handleResize = () => resize();
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="ice-particles-canvas" aria-hidden="true" />;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const blobOneRef = useRef(null);
  const blobTwoRef = useRef(null);
  const motionReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (motionReduced) {
      return undefined;
    }

    const blobs = [blobOneRef.current, blobTwoRef.current].filter(Boolean);
    const strength = 0.02;

    const handleMouseMove = (event) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (event.clientX - cx) * strength;
      const dy = (event.clientY - cy) * strength;

      blobs.forEach((blob, index) => {
        const factor = 1 + index * 0.2;
        blob.style.transform = `translate3d(${dx * factor}px, ${dy * factor}px, 0) scale(${1 + index * 0.01})`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [motionReduced]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setCertificateOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenus = () => {
    setCertificateOpen(false);
    setMobileMenuOpen(false);
  };

  const contactDetails = [
    { label: 'Email', value: 'tamnguyen.engineer.work@gmail.com', href: 'mailto:tamnguyen.engineer.work@gmail.com' },
    { label: 'Phone/Zalo', value: '0933561709', href: 'tel:0933561709' },
    { label: 'GitHub', value: 'KokoroRay', href: 'https://github.com/KokoroRay?tab=repositories' },
    { label: 'LinkedIn', value: 'tam-nguyen-68aa672a9', href: 'https://www.linkedin.com/in/tam-nguyen-68aa672a9/' },
    { label: 'Facebook', value: 'kokoro.ray.639', href: 'https://www.facebook.com/kokoro.ray.639/' },
  ];

  return (
    <>
      <SectionReveal />
      <ParticleCanvas />
      <div className="min-h-screen bg-background text-on-surface selection:bg-primary/30 overflow-x-hidden relative">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f1524]/60 backdrop-blur-lg border-b border-primary/10 shadow-[0_0_30px_rgba(125,211,252,0.05)]">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
            <div className="text-xl font-headline font-semibold tracking-wider text-primary">Tam Nguyen</div>
            <div className="hidden md:flex gap-8 items-center font-body tracking-tight">
              {navItems.map((item) => (
                <a key={item.href} className="text-on-surface-variant hover:text-on-surface transition-colors" href={item.href}>
                  {item.label}
                </a>
              ))}
              <a className="bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full hover:bg-primary/20 transition-all duration-300" href="#contact">
                Contact
              </a>
            </div>
            <button className="md:hidden text-primary" type="button" onClick={() => setMobileMenuOpen(true)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>

          <div className={`fixed inset-0 z-40 bg-[#071022]/95 backdrop-blur-sm p-6 md:hidden ${mobileMenuOpen ? 'flex' : 'hidden'} flex-col`}>
            <div className="flex items-center justify-between mb-6">
              <div className="text-xl font-headline font-semibold text-primary">Tam Nguyen</div>
              <button id="mobile-menu-close" className="text-on-surface-variant" type="button" onClick={() => setMobileMenuOpen(false)}>
                Close
              </button>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              {navItems.map((item) => (
                <a key={item.href} className="text-on-surface-variant text-lg" href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
              <a className="mt-4 inline-block px-6 py-3 bg-primary text-on-primary rounded-xl" href="mailto:tamnguyen.engineer.work@gmail.com">
                Email
              </a>
            </div>
          </div>
        </nav>

        <main className="relative pt-16">
          <div className="page-bg-decor" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent" />
            <div ref={blobOneRef} className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-tertiary/5 blur-[120px] rounded-full decor-blob" />
            <div ref={blobTwoRef} className="absolute bottom-[-6%] left-[-15%] w-[420px] h-[420px] bg-primary/6 blur-[140px] rounded-full decor-blob" />
          </div>

          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              OPEN TO SELECT OPPORTUNITIES
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-on-surface-variant bg-clip-text text-transparent">
              Nguyễn Minh Tâm <br /> <span className="text-primary italic">(Ray)</span>
            </h1>

            <div className="w-full max-w-2xl glass-card rounded-xl p-6 text-left border-l-4 border-l-primary/50 overflow-hidden relative mb-20">
              <div className="flex gap-1.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="font-mono text-sm md:text-base space-y-1 text-on-surface-variant">
                <p className="text-primary/70">$ tam status check --all</p>
                <p className="text-on-surface">Final-year Software Engineering student focused on Web, DevOps, and Game Development.</p>
                <p className="text-on-surface">&quot;Powered by passion, funded by your job offers.&quot;</p>
                <p className="text-on-surface">
                  [OK] Portfolio Focus: <span className="text-green-400">Professional, Modern, and Recruiter-Friendly</span>
                </p>
                <p className="text-on-surface">
                  [OK] Availability: <span className="text-primary">Open for internships / junior roles</span>
                </p>
                <p className="text-primary/90 mt-4 terminal-cursor">Ready to connect</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  terminal
                </span>
              </div>
            </div>

            <div className="w-full max-w-4xl px-4">
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-on-surface-variant/60 mb-12">System Lifecycle</h2>
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-12" />
                {[
                  { icon: 'terminal', title: 'CODE', subtitle: 'Git / IDE', extra: '' },
                  { icon: 'settings', title: 'BUILD', subtitle: 'Artifacts', extra: 'animate-[spin_8s_linear_infinite]' },
                  { icon: 'deployed_code', title: 'DEPLOY', subtitle: 'CI / CD', extra: '' },
                  { icon: 'cloud_done', title: 'MONITOR', subtitle: 'Global/HA', extra: '' },
                ].map((item) => (
                  <div key={item.title} className="relative flex flex-col items-center group">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl glass-card flex items-center justify-center mb-4 border-primary/20 group-hover:scale-105 group-hover:border-primary/50 transition-all duration-300">
                      <span className={`material-symbols-outlined text-3xl md:text-4xl text-primary ${item.extra}`} style={item.title === 'CODE' ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                        {item.icon}
                      </span>
                    </div>
                    <span className="text-sm font-bold tracking-wider text-on-surface group-hover:text-primary transition-colors">{item.title}</span>
                    <span className="text-[10px] text-on-surface-variant uppercase mt-1">{item.subtitle}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 py-20 grid-mesh" id="tech-stack">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 glass-card spotlight-card rounded-3xl p-8 flex flex-col justify-between group reveal">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Core Expertise</h3>
                      <p className="text-on-surface-variant leading-relaxed max-w-md">Mastering the backbone of modern infrastructure. Focused on high-concurrency systems and resilient architectures.</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-3xl">code</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {coreExpertise.map((skill) => (
                      <div key={skill.title} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-primary">{skill.icon}</span>
                        <div>
                          <p className="font-bold text-sm">{skill.title}</p>
                          <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">{skill.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
              </div>

              <div className="md:col-span-4 glass-card spotlight-card rounded-3xl p-8 flex flex-col justify-between reveal">
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary mb-4">
                    <span className="material-symbols-outlined">cloud</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Cloud Ecosystem</h3>
                  <p className="text-sm text-on-surface-variant mb-6">Scalable global infrastructure.</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="font-medium">AWS</span>
                      <button className="text-[10px] bg-tertiary/20 text-tertiary px-2 py-0.5 rounded-full font-bold hover:bg-tertiary/30 transition-colors" type="button" onClick={() => setCertificateOpen(true)}>
                        DVA CERTIFIED
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Azure', 'GCP', 'Cloudflare', 'DigitalOcean'].map((item) => (
                        <span key={item} className="px-2 py-1 text-[10px] rounded-lg bg-white/5 border border-white/10 text-on-surface-variant">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 glass-card spotlight-card rounded-3xl p-8 reveal">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">settings_suggest</span>
                    </div>
                    <h3 className="text-xl font-bold">DevOps &amp; Automation</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                    {devOpsTools.map((tool) => (
                      <div key={tool} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-center aspect-square justify-center">
                        <span className="material-symbols-outlined text-primary text-xl">{tool === 'Docker' ? 'box' : tool === 'Kubernetes' ? 'hub' : tool === 'CI/CD' ? 'sync_alt' : tool === 'Jenkins' ? 'rebase_edit' : tool === 'Kafka' ? 'stream' : tool === 'n8n' ? 'bolt' : tool === 'GitHub Act.' ? 'terminal' : tool === 'GitLab CI' ? 'all_inclusive' : 'sync'}</span>
                        <span className="text-[10px] font-medium">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 glass-card spotlight-card rounded-3xl p-8 reveal">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined">database</span>
                    </div>
                    <h3 className="text-xl font-bold">Databases</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Relational &amp; NoSQL</p>
                      <div className="flex flex-wrap gap-2">
                        {databaseTools.map((tool) => (
                          <span key={tool} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 py-20 reveal" id="projects">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
                <p className="text-on-surface-variant">Selected work and highlights. These cards can be synced from your pinned GitHub repositories with a small API or workflow layer.</p>
              </div>
              <a className="text-primary flex items-center gap-2 hover:underline text-sm" href="https://github.com/KokoroRay?tab=repositories" target="_blank" rel="noopener noreferrer">
                View GitHub Repository <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.title} className="glass-card-elevated rounded-3xl overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <img alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={project.image} />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dim to-transparent" />
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-md ${tag === 'Terraform' || tag === 'AWS' || tag === 'Ansible' ? 'bg-tertiary/20 text-tertiary' : 'bg-primary/20 text-primary'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{project.description}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl font-bold text-sm hover:brightness-110 transition-all" type="button">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                        Case Study
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center border border-outline rounded-xl hover:bg-white/5 transition-colors" type="button">
                        <span className="material-symbols-outlined">link</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto px-6 py-20 reveal" id="experience">
            <h2 className="text-3xl font-bold mb-12 text-center">Journey &amp; Growth</h2>
            <div className="relative space-y-12">
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-outline/20 to-transparent" />
              {timeline.map((item, index) => (
                <div key={item.year} className={`relative flex flex-col md:flex-row ${item.align === 'right' ? 'md:flex-row-reverse' : ''} gap-8 md:items-center group`}>
                  <div className={`hidden md:block flex-1 ${item.align === 'left' ? 'text-right' : 'text-left'}`}>
                    <p className="text-primary font-bold">{item.year}</p>
                    <p className="text-sm text-on-surface-variant">{item.label}</p>
                  </div>
                  <div className={`absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full ${index === 0 ? 'bg-primary shadow-[0_0_10px_#7dd3fc]' : 'bg-outline-variant'}`} />
                  <div className={`flex-1 glass-card p-6 rounded-2xl ${item.align === 'left' ? 'md:ml-4' : 'md:mr-4'}`}>
                    <div className="md:hidden mb-2">
                      <p className="text-primary font-bold">{item.year}</p>
                    </div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{item.description}</p>
                    {item.details ? (
                      <ul className="mt-4 space-y-2 text-sm text-on-surface-variant list-disc pl-5">
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 py-32 reveal" id="contact">
            <div className="glass-card rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-tertiary/10 pointer-events-none" />
              <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">
                Let&apos;s build the <span className="text-primary">future</span> together.
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 relative z-10 text-lg">Currently open to freelance DevOps architecture consulting or full-time opportunities in high-growth engineering teams.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <a className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary font-bold rounded-2xl hover:brightness-110 transition-all" href="mailto:tamnguyen.engineer.work@gmail.com">
                  Send an Email
                </a>
                <a className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-2xl hover:bg-white/10 transition-colors" href="https://www.linkedin.com/in/tam-nguyen-68aa672a9/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="w-full py-12 border-t border-outline-variant/20">
          <div className="max-w-7xl mx-auto px-8 font-body text-sm">
            <div className="text-center mb-6">
              <div className="text-lg font-headline font-bold text-on-surface">Tam Nguyen</div>
              <p className="text-on-surface-variant text-xs uppercase tracking-[0.2em] mt-2">Contact Information</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-xs">
              {contactDetails.map((contact) => (
                <a key={contact.label} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-on-surface-variant hover:text-primary transition-colors" href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {contact.label}: {contact.value}
                </a>
              ))}
            </div>
          </div>
        </footer>

        <div className={`fixed inset-0 z-[60] ${certificateOpen ? 'flex' : 'hidden'} items-center justify-center bg-[#050814]/80 px-4`} id="certificate-modal" aria-hidden={!certificateOpen} onClick={(event) => event.target === event.currentTarget && setCertificateOpen(false)}>
          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0f1524] shadow-2xl">
            <button className="absolute right-4 top-4 z-10 rounded-full bg-black/40 px-3 py-2 text-sm text-white hover:bg-black/60 transition-colors" type="button" onClick={() => setCertificateOpen(false)}>
              Close
            </button>
            <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
              <div className="bg-black/20 p-4 md:p-6">
                <img alt="AWS Certified Developer - Associate certificate" className="max-h-[80vh] w-full rounded-2xl object-contain bg-black" src="/AWS%20Certified%20Developer%20-%20Associate%20certificate_page-0001.jpg" />
              </div>
              <div className="flex flex-col justify-between gap-6 p-6 md:p-8 border-t border-white/10 md:border-t-0 md:border-l">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Certification</p>
                  <h3 className="text-2xl font-bold mb-4">AWS Certified Developer - Associate</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Bấm vào nút DVA CERTIFIED để mở chứng chỉ trực tiếp ngay trên trang.</p>
                </div>
                <div className="text-xs text-on-surface-variant">File: AWS Certified Developer - Associate certificate_page-0001.jpg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mobileMenuOpen || certificateOpen ? <div className="hidden" onClick={closeMenus} /> : null}
    </>
  );
}

export default App;
