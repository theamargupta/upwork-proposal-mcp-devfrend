'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Briefcase,
  Search,
  ListFilter,
  TrendingUp,
  Zap,
  ArrowRight,
  Terminal,
  Brain,
  BadgeCheck,
  BarChart3,
  Heart,
} from 'lucide-react'

const ease: [number, number, number, number] = [0.25, 0.4, 0.25, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease },
  }),
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const tools = [
  {
    name: 'list_jobs',
    desc: 'Browse saved jobs with filters for status, score, budget, and pagination.',
    icon: ListFilter,
  },
  {
    name: 'get_job',
    desc: 'Pull full details — 30+ fields including client history, bid range, skills.',
    icon: Briefcase,
  },
  {
    name: 'search_jobs',
    desc: 'Search by keyword across titles, descriptions, and skills.',
    icon: Search,
  },
  {
    name: 'update_job_status',
    desc: 'Mark jobs as applying, applied, maybe, or skip. Add notes.',
    icon: BadgeCheck,
  },
  {
    name: 'get_top_jobs',
    desc: 'Get highest-scored actionable jobs. Skip the noise.',
    icon: TrendingUp,
  },
]

const features = [
  {
    title: 'Chrome Extension Pipeline',
    desc: 'Extract jobs from Upwork with one click. Batch mode grabs 50 jobs automatically.',
    icon: Zap,
  },
  {
    title: 'AI Scoring',
    desc: 'Jobs scored 1-10 based on budget, client spend, competition, and payment verification.',
    icon: BarChart3,
  },
  {
    title: 'Claude-Powered Decisions',
    desc: 'Claude analyzes your saved jobs, recommends which to apply to, and helps write proposals.',
    icon: Brain,
  },
  {
    title: 'Live Dashboard',
    desc: 'Interactive job board with filtering, score charts, status pipeline, and detail views.',
    icon: ListFilter,
  },
  {
    title: 'Status Tracking',
    desc: 'Track every job through your pipeline: new, maybe, applying, applied, skip.',
    icon: BadgeCheck,
  },
  {
    title: 'Same Data Everywhere',
    desc: 'Extension saves, dashboard displays, Claude analyzes — all hitting the same Supabase table.',
    icon: Briefcase,
  },
]

function KofiIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
    </svg>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 bg-[#0a0a12]/70 backdrop-blur-xl border-b border-[var(--glass-border)]">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#10b981] to-[#34d399] flex items-center justify-center shadow-lg shadow-[#10b981]/20">
            <span className="text-white font-bold text-xs font-mono">U</span>
          </div>
          <span className="font-heading font-semibold text-sm tracking-tight">Upwork Job MCP</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-[var(--muted-foreground)] hover:text-foreground transition-colors">
            Sign In
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium px-4 py-1.5 rounded-lg bg-[#10b981] text-white hover:bg-[#34d399] transition-all active:scale-[0.98] shadow-lg shadow-[#10b981]/20"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-14 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#10b981]/8 blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#22d3ee]/5 blur-[100px] pointer-events-none" />

        <motion.div
          className="max-w-3xl text-center space-y-8 relative z-10"
          initial="hidden"
          animate="visible"
        >
          <motion.div custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#34d399] border border-[#10b981]/20 rounded-full px-4 py-1.5 mb-6 bg-[#10b981]/5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
              MCP-Powered Job Hunting
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight"
          >
            Stop scrolling.
            <br />
            <span className="text-gradient">Let Claude apply.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed"
          >
            Extract Upwork jobs. Score them automatically.
            <br className="hidden sm:block" />
            Let Claude pick winners and write proposals.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="flex flex-col items-center gap-4 pt-2">
            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="group px-6 py-2.5 rounded-lg bg-[#10b981] text-white font-semibold text-sm hover:bg-[#34d399] transition-all active:scale-[0.98] glow-primary flex items-center gap-2"
              >
                Open Dashboard
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="#how"
                className="px-6 py-2.5 rounded-lg border border-[rgba(255,255,255,0.12)] text-sm font-medium text-[var(--muted-foreground)] hover:text-foreground hover:bg-white/5 transition-all"
              >
                How It Works
              </Link>
            </div>
          </motion.div>

          {/* Terminal preview */}
          <motion.div custom={4} variants={fadeUp} className="pt-8">
            <div className="mx-auto max-w-lg rounded-2xl border border-[var(--glass-border)] bg-[#0c0c18]/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-[#10b981]/5">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--glass-border)] bg-white/[0.02]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f87171]/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#34d399]/60" />
                <span className="ml-2 text-[10px] font-mono text-[var(--muted-foreground)]/50">claude</span>
              </div>
              <div className="p-5 font-mono text-[13px] leading-relaxed space-y-1">
                <p><span className="text-[#10b981]">&gt;</span> <span className="text-[var(--muted-foreground)]">&quot;Show me top Upwork jobs for React&quot;</span></p>
                <p className="text-[var(--muted-foreground)]/50">  <span className="text-[#22d3ee]/70">get_top_jobs</span>(limit: 5)</p>
                <p className="text-foreground/80">  Found 5 jobs, avg score <span className="text-[#10b981]">8.2</span></p>
                <p className="mt-3"><span className="text-[#10b981]">&gt;</span> <span className="text-[var(--muted-foreground)]">&quot;Apply to the $2000 Next.js one&quot;</span></p>
                <p className="text-[var(--muted-foreground)]/50">  <span className="text-[#22d3ee]/70">update_job_status</span>(id: 47, status: &quot;applying&quot;)</p>
                <p className="text-foreground/80">  Marked as <span className="text-purple-400">applying</span>. Here&apos;s a draft proposal...</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Problem / Solution ── */}
      <section className="py-24 px-6 border-t border-[var(--glass-border)]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card space-y-5"
            style={{ borderColor: 'rgba(248,113,113,0.15)' }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#f87171]/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f87171]/60" />
              Manual Upwork Hunting
            </span>
            <div className="space-y-3 text-[15px] text-[var(--muted-foreground)]">
              <p className="flex gap-3 items-start"><span className="text-[#f87171] shrink-0 mt-0.5">&#10005;</span> Scroll through hundreds of listings manually</p>
              <p className="flex gap-3 items-start"><span className="text-[#f87171] shrink-0 mt-0.5">&#10005;</span> Waste connects on low-quality jobs</p>
              <p className="flex gap-3 items-start"><span className="text-[#f87171] shrink-0 mt-0.5">&#10005;</span> Write proposals from scratch every time</p>
              <p className="flex gap-3 items-start"><span className="text-[#f87171] shrink-0 mt-0.5">&#10005;</span> Lose track of what you applied to</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card space-y-5"
            style={{ borderColor: 'rgba(52,211,153,0.15)' }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#34d399]/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]/60" />
              With Upwork Job MCP
            </span>
            <div className="space-y-3 text-[15px] text-foreground/80">
              <p className="flex gap-3 items-start"><span className="text-[#34d399] shrink-0 mt-0.5">&#10003;</span> Batch extract 50 jobs in one click</p>
              <p className="flex gap-3 items-start"><span className="text-[#34d399] shrink-0 mt-0.5">&#10003;</span> AI scores every job 1-10 automatically</p>
              <p className="flex gap-3 items-start"><span className="text-[#34d399] shrink-0 mt-0.5">&#10003;</span> Claude writes tailored proposals from job data</p>
              <p className="flex gap-3 items-start"><span className="text-[#34d399] shrink-0 mt-0.5">&#10003;</span> Full pipeline tracking: new &rarr; applying &rarr; applied</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="py-24 px-6 border-t border-[var(--glass-border)]">
        <AnimatedSection className="max-w-4xl mx-auto">
          <motion.h2
            variants={staggerItem}
            className="font-heading text-3xl sm:text-4xl font-bold text-center mb-16"
          >
            Three pieces. One workflow.
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-[#10b981]/30 via-[#22d3ee]/30 to-[#10b981]/30" />

            {[
              { num: '01', title: 'Extract', desc: 'Chrome extension pulls job data from Upwork. Title, budget, client history, skills — 30+ fields per job.' },
              { num: '02', title: 'Analyze', desc: 'Dashboard scores and organizes everything. Filter by score, status, budget. See the full picture.' },
              { num: '03', title: 'Apply', desc: 'Claude reads your jobs via MCP. Picks the best ones. Helps write proposals. Marks jobs as applied.' },
            ].map((step) => (
              <motion.div
                key={step.num}
                variants={staggerItem}
                className="space-y-4 text-center md:text-left"
              >
                <div className="inline-flex items-center justify-center md:justify-start">
                  <span className="text-5xl font-heading font-extralight text-gradient">{step.num}</span>
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── MCP Tools ── */}
      <section className="py-24 px-6 border-t border-[var(--glass-border)]">
        <AnimatedSection className="max-w-4xl mx-auto">
          <motion.h2
            variants={staggerItem}
            className="font-heading text-3xl sm:text-4xl font-bold text-center mb-4"
          >
            5 tools Claude can call.
          </motion.h2>
          <motion.p variants={staggerItem} className="text-center text-[var(--muted-foreground)] mb-16 text-sm">
            Every tool scoped to your user. OAuth keeps it secure.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <motion.div
                  key={tool.name}
                  variants={staggerItem}
                  className="glass-card group !p-6 space-y-3"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#10b981]/8 flex items-center justify-center group-hover:bg-[#10b981]/15 transition-colors">
                    <Icon size={20} className="text-[#34d399]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold font-mono text-[#34d399]">{tool.name}</h3>
                  <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed">{tool.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </AnimatedSection>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6 border-t border-[var(--glass-border)]">
        <AnimatedSection className="max-w-4xl mx-auto">
          <motion.h2
            variants={staggerItem}
            className="font-heading text-3xl sm:text-4xl font-bold text-center mb-4"
          >
            Built for freelancers who hustle.
          </motion.h2>
          <motion.p variants={staggerItem} className="text-center text-[var(--muted-foreground)] mb-16 text-sm">
            From extraction to application — every step is covered.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  variants={staggerItem}
                  className="glass-card group !p-6 space-y-3"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#10b981]/8 flex items-center justify-center group-hover:bg-[#10b981]/15 transition-colors">
                    <Icon size={20} className="text-[#34d399]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold">{f.title}</h3>
                  <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </AnimatedSection>
      </section>

      {/* ── Setup ── */}
      <section className="py-24 px-6 border-t border-[var(--glass-border)]">
        <AnimatedSection className="max-w-2xl mx-auto text-center space-y-8">
          <motion.h2
            variants={staggerItem}
            className="font-heading text-3xl sm:text-4xl font-bold"
          >
            Connect in 30 seconds.
          </motion.h2>
          <motion.div
            variants={staggerItem}
            className="rounded-2xl border border-[var(--glass-border)] bg-[#0c0c18]/80 backdrop-blur-xl overflow-hidden text-left shadow-2xl shadow-[#10b981]/5"
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--glass-border)] bg-white/[0.02]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f87171]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#34d399]/60" />
              <span className="ml-2 text-[10px] font-mono text-[var(--muted-foreground)]/50">terminal</span>
            </div>
            <div className="p-5 font-mono text-[13px] leading-loose space-y-0.5">
              <p className="text-[var(--muted-foreground)]/50"># add the MCP server to Claude Code</p>
              <p><span className="text-[#10b981]">$</span> claude mcp add --transport http upwork-jobs https://your-domain.com/api/mcp</p>
              <p className="text-[var(--muted-foreground)]/50 mt-1"># authenticate via browser, then ask Claude:</p>
              <p className="mt-4"><span className="text-[#10b981]">&gt;</span> &quot;Show me top-scored Upwork jobs for Next.js&quot;</p>
              <p><span className="text-[#10b981]">&gt;</span> &quot;Mark job #42 as applying and draft a proposal&quot;</p>
            </div>
          </motion.div>
          <motion.div variants={staggerItem}>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#10b981] text-white font-semibold text-sm hover:bg-[#34d399] transition-all active:scale-[0.98] glow-primary"
            >
              Open Dashboard
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--glass-border)] py-8 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-[12px] text-[var(--muted-foreground)]/60">
          <span className="font-heading font-medium">Upwork Job MCP</span>
          <div className="flex items-center gap-4">
            <a
              href="https://ko-fi.com/amargupta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#ff5e5b]/30 text-[#ff5e5b] text-[11px] font-semibold hover:bg-[#ff5e5b]/10 transition-all"
            >
              <KofiIcon /> Support on Ko-fi
            </a>
            <span className="hover:text-[#34d399] transition-colors">Built by Amar Gupta</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
