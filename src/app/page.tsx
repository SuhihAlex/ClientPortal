import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleCheck,
  Clock3,
  FileCheck2,
  Files,
  FolderKanban,
  LayoutDashboard,
  MessageSquareText,
  MoreHorizontal,
  ShieldCheck,
  Sparkles,
  Users,
  Menu,
} from "lucide-react";

import { BrandLogo } from "@/components/brand";
import { Container, StatusBadge } from "@/components/shared";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const trustedCompanies = [
  "Northline",
  "Aperture",
  "Fieldwork",
  "Monogram",
  "Wavelength",
];

const features = [
  {
    icon: FolderKanban,
    title: "Every project in one place",
    description:
      "Keep stages, deadlines, files, tasks, participants, and project progress connected in one focused workspace.",
  },
  {
    icon: FileCheck2,
    title: "Clear approval workflows",
    description:
      "Send work for review, collect feedback, manage requested changes, and keep approval decisions documented.",
  },
  {
    icon: Users,
    title: "A portal clients understand",
    description:
      "Give clients a calm, focused interface without exposing internal notes, tasks, or unrelated projects.",
  },
  {
    icon: MessageSquareText,
    title: "Feedback with context",
    description:
      "Keep project and material comments attached to the work instead of scattered across email and messaging apps.",
  },
  {
    icon: ShieldCheck,
    title: "Built around access control",
    description:
      "Workspace isolation and fixed roles ensure owners, team members, and clients only see what they should.",
  },
  {
    icon: LayoutDashboard,
    title: "Instant project clarity",
    description:
      "See active projects, reviews, deadlines, incomplete tasks, and recent activity from one dashboard.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Create the project",
    description:
      "Add the client, define the scope, assign team members, and organize the work into clear stages.",
  },
  {
    number: "02",
    title: "Share the work",
    description:
      "Upload a file and send it to the client through a structured review workflow.",
  },
  {
    number: "03",
    title: "Collect a decision",
    description:
      "The client comments, requests changes, or approves the material directly in the portal.",
  },
];

const recentActivity = [
  {
    icon: FileCheck2,
    title: "Homepage concept approved",
    meta: "Olivia Bennett · 12 minutes ago",
    iconClassName: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: MessageSquareText,
    title: "New comment from Sophia Miller",
    meta: "Website Redesign · 34 minutes ago",
    iconClassName: "bg-blue-50 text-blue-700",
  },
  {
    icon: Files,
    title: "brand-guidelines-v2.pdf uploaded",
    meta: "Maya Torres · 1 hour ago",
    iconClassName: "bg-violet-50 text-violet-700",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-background">
      <section className="relative border-b bg-white">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_50%_0%,rgba(73,92,145,0.12),transparent_58%)]"
          aria-hidden="true"
        />

        <Container className="relative">
          <header className="relative z-20 animate-reveal-down pt-5 sm:pt-6">
            <div className="grid min-h-16 grid-cols-[1fr_auto] overflow-hidden rounded-[1.25rem] border border-border/80 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.07)] backdrop-blur-xl lg:grid-cols-[240px_1fr_240px]">
              <div className="flex items-center border-r border-border/70 px-4 sm:px-5">
                <BrandLogo />
              </div>

              <nav
                className="hidden items-center justify-center gap-1 px-4 lg:flex"
                aria-label="Primary navigation"
              >
                <HeaderNavItem href="#product" label="Product" active />
                <HeaderNavItem href="#features" label="Features" />
                <HeaderNavItem href="#workflow" label="Workflow" />
                <HeaderNavItem href="#pricing" label="Pricing" />
              </nav>

              <div className="flex items-center justify-end gap-2 px-3 sm:px-4 lg:border-l lg:border-border/70">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden text-muted-foreground hover:text-foreground sm:inline-flex"
                >
                  Sign in
                </Button>

                <Button
                  size="sm"
                  className="group rounded-xl px-4 shadow-[0_8px_22px_rgba(35,49,89,0.18)]"
                >
                  Start free
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Button>

                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded-xl lg:hidden"
                  aria-label="Open navigation"
                >
                  <Menu />
                </Button>
              </div>
            </div>

            <div className="mx-auto mt-3 hidden w-fit items-center gap-2 rounded-full border bg-white/70 px-3 py-1.5 text-[11px] text-muted-foreground shadow-sm backdrop-blur sm:flex lg:hidden">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Client workspace is online
            </div>
          </header>

          <div className="pb-16 pt-16 text-center sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
            <div className="mx-auto max-w-4xl">
              <Badge
                variant="outline"
                className="animate-reveal-up rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur"
              >
                <Sparkles className="size-3.5 text-primary" />
                Client collaboration, finally organized
              </Badge>

              <h1 className="animation-delay-100 animate-reveal-up mt-7 text-balance text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[5.25rem]">
                Give every client project a clear place to move forward.
              </h1>

              <p className="animation-delay-200 animate-reveal-up mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                ClientPortal helps studios manage projects, files, reviews,
                feedback, and approvals without forcing clients into another
                complicated project management tool.
              </p>

              <div className="animation-delay-300 animate-reveal-up mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg" className="group h-12 px-6">
                  Create your workspace
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 bg-white/70 px-6 backdrop-blur"
                >
                  View interactive demo
                </Button>
              </div>

              <div className="animation-delay-400 animate-reveal-up mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CircleCheck className="size-4 text-emerald-600" />
                  No credit card
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CircleCheck className="size-4 text-emerald-600" />
                  Setup in minutes
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CircleCheck className="size-4 text-emerald-600" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>

          <ProductPreview />
        </Container>
      </section>

      <section className="border-b bg-white py-10">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Built for teams doing their best work with clients
          </p>

          <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {trustedCompanies.map((company) => (
              <div
                key={company}
                className="text-center text-base font-semibold tracking-[-0.03em] text-foreground/40"
              >
                {company}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="product" className="py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="max-w-xl">
              <StatusBadge tone="info">Studio workspace</StatusBadge>

              <h2 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                Replace status meetings with shared project clarity.
              </h2>

              <p className="mt-6 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                Your team manages the work from a focused studio dashboard.
                Clients get a separate experience built around decisions,
                progress, and the materials that need their attention.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Separate studio and client experiences",
                  "Fixed project and approval statuses",
                  "Files, feedback, and decisions in context",
                  "Activity history everyone can understand",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-sm leading-6 text-foreground/80">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Button variant="link" className="mt-7 h-auto p-0">
                Explore the studio workspace
                <ArrowRight />
              </Button>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-8 -z-10 rounded-[3rem] bg-primary/[0.04] blur-2xl"
                aria-hidden="true"
              />

              <div className="rounded-[1.75rem] border bg-white p-3 shadow-[0_30px_90px_rgba(15,23,42,0.12)] sm:p-4">
                <div className="rounded-[1.25rem] border bg-[#f7f8fa] p-4 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Project overview
                      </p>
                      <h3 className="mt-1 text-xl font-semibold tracking-[-0.035em]">
                        Alder &amp; Stone Website
                      </h3>
                    </div>

                    <StatusBadge tone="info">In Progress</StatusBadge>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <MetricCard label="Progress" value="68%" />
                    <MetricCard label="Current stage" value="UI Design" />
                    <MetricCard label="Deadline" value="Aug 18" />
                  </div>

                  <div className="mt-4 rounded-xl border bg-white p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Project progress</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          3 of 5 stages completed
                        </p>
                      </div>

                      <span className="text-sm font-semibold">68%</span>
                    </div>

                    <Progress value={68} className="mt-5" />

                    <div className="mt-6 space-y-3">
                      <StageRow
                        title="Discovery and strategy"
                        status="Completed"
                        completed
                      />
                      <StageRow
                        title="UX architecture"
                        status="Completed"
                        completed
                      />
                      <StageRow
                        title="UI design"
                        status="In progress"
                        current
                      />
                      <StageRow
                        title="Development"
                        status="Upcoming"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="features" className="border-y bg-white py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <StatusBadge tone="purple">Everything in context</StatusBadge>

            <h2 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Enough structure to stay organized. Nothing your clients need to
              learn.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              ClientPortal focuses on the work between your team and the
              client—without becoming another oversized management platform.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group bg-white p-7 transition-[background-color,transform,box-shadow] duration-300 hover:relative hover:z-10 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl border bg-secondary/70 text-primary shadow-sm transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold tracking-[-0.025em]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more
                    <ChevronRight className="size-4" />
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="workflow" className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <StatusBadge tone="success">A simpler workflow</StatusBadge>

              <h2 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                From first brief to final approval.
              </h2>

              <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground">
                Keep the client experience consistent through every project,
                without changing how your team delivers the work.
              </p>
            </div>

            <div className="divide-y border-y">
              {workflow.map((item) => (
                <article
                  key={item.number}
                  className="grid gap-4 py-7 sm:grid-cols-[72px_1fr] sm:gap-8 sm:py-9"
                >
                  <span className="text-sm font-semibold tracking-[0.12em] text-primary">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#111827] py-24 text-white sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="max-w-xl">
              <Badge className="rounded-full border-white/10 bg-white/5 px-3 py-1 text-white">
                Client experience
              </Badge>

              <h2 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                Give clients a portal they will actually use.
              </h2>

              <p className="mt-6 text-pretty text-base leading-7 text-slate-300 sm:text-lg">
                Clients see exactly what matters: current progress, upcoming
                deadlines, available files, open reviews, and recent
                conversations.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "No internal studio clutter",
                  "No complex onboarding",
                  "No scattered email threads",
                  "No unclear approval status",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-emerald-400" />
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <ClientPortalPreview />
          </div>
        </Container>
      </section>

      <section id="pricing" className="border-b bg-white py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <StatusBadge>Simple pricing</StatusBadge>

            <h2 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Start small. Upgrade when your client work grows.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground">
              All plans include the core project, file, feedback, and approval
              workflow.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            <PricingCard
              name="Free"
              price="$0"
              description="For freelancers testing a better client workflow."
              features={[
                "2 active projects",
                "3 clients",
                "3 workspace members",
                "1 GB storage",
              ]}
              buttonLabel="Start for free"
            />

            <PricingCard
              name="Studio"
              price="$24"
              description="For small studios managing ongoing client work."
              features={[
                "15 active projects",
                "30 clients",
                "10 workspace members",
                "20 GB storage",
              ]}
              buttonLabel="Choose Studio"
              featured
            />

            <PricingCard
              name="Agency"
              price="$59"
              description="For established agencies with more clients and teams."
              features={[
                "50 active projects",
                "100 clients",
                "25 workspace members",
                "100 GB storage",
              ]}
              buttonLabel="Choose Agency"
            />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center text-primary-foreground shadow-[0_32px_90px_rgba(28,43,79,0.22)] sm:px-12 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.18),transparent_48%)]"
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                Make every client project feel more professional.
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-primary-foreground/75 sm:text-lg">
                Create a workspace, invite your first client, and bring the
                entire review process into one clear place.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 px-6 text-foreground"
                >
                  Start for free
                  <ArrowRight />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/20 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white"
                >
                  Book a product tour
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <footer className="border-t bg-white py-10">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <BrandLogo />
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                A focused client portal for studios and small agencies.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <a href="#product" className="hover:text-foreground">
                Product
              </a>
              <a href="#features" className="hover:text-foreground">
                Features
              </a>
              <a href="#pricing" className="hover:text-foreground">
                Pricing
              </a>
              <a href="/login" className="hover:text-foreground">
                Sign in
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 ClientPortal. All rights reserved.</p>
            <p>Built for better client collaboration.</p>
          </div>
        </Container>
      </footer>
    </main>
  );
}

function ProductPreview() {
  return (
    <div className="relative mx-auto max-w-6xl pt-3">
      <div
        className="animation-delay-500 animate-screen-line absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-12 bottom-0 top-16 -z-10 rounded-[3rem] bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="animation-delay-500 animate-screen-uncover">
        <div className="rounded-t-[1.5rem] border border-b-0 bg-[#111827] p-2 shadow-[0_35px_110px_rgba(15,23,42,0.18)] sm:rounded-t-[2rem] sm:p-3">
          <div className="overflow-hidden rounded-t-[1rem] border border-white/10 bg-[#f5f6f8] sm:rounded-t-[1.4rem]">
            <div className="flex h-11 items-center border-b bg-white px-4">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-slate-200" />
                <span className="size-2.5 rounded-full bg-slate-200" />
                <span className="size-2.5 rounded-full bg-slate-200" />
              </div>

              <div className="mx-auto hidden rounded-md bg-secondary px-20 py-1.5 text-[10px] text-muted-foreground sm:block">
                app.clientportal.dev
              </div>
            </div>

            <div className="grid min-h-[500px] md:grid-cols-[190px_1fr] lg:grid-cols-[220px_1fr]">
              <aside className="hidden bg-[#182135] p-5 text-white md:block">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-[#182135]">
                    CP
                  </span>
                  <span className="text-sm font-semibold">ClientPortal</span>
                </div>

                <div className="mt-9 space-y-1">
                  <PreviewNavItem
                    icon={LayoutDashboard}
                    label="Dashboard"
                    active
                  />
                  <PreviewNavItem icon={Users} label="Clients" />
                  <PreviewNavItem icon={FolderKanban} label="Projects" />
                  <PreviewNavItem icon={Files} label="Files" />
                  <PreviewNavItem icon={FileCheck2} label="Approvals" />
                </div>

                <div className="mt-10 border-t border-white/10 pt-5">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
                    Workspace
                  </p>

                  <div className="mt-4 flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback>NS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-medium">Northline Studio</p>
                      <p className="text-[10px] text-slate-500">Studio plan</p>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Thursday, August 6
                    </p>
                    <h2 className="mt-1 text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
                      Good evening, Olivia
                    </h2>
                  </div>

                  <Avatar>
                    <AvatarFallback>OB</AvatarFallback>
                  </Avatar>
                </div>

                <div className="animation-delay-600 animate-reveal-up">
                  <DashboardMetric
                    label="Active projects"
                    value="8"
                    change="+2 this month"
                  />
                </div>

                <div className="animation-delay-700 animate-reveal-up">
                  <DashboardMetric
                    label="Pending reviews"
                    value="3"
                    change="Needs attention"
                  />
                </div>

                <div className="animation-delay-800 animate-reveal-up">
                  <DashboardMetric
                    label="Upcoming deadlines"
                    value="5"
                    change="Next 14 days"
                  />
                </div>

                <div className="animation-delay-800 animate-reveal-up">
                  <DashboardMetric
                    label="Open tasks"
                    value="12"
                    change="Across 4 projects"
                  />
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-xl border bg-white">
                    <div className="flex items-center justify-between border-b px-5 py-4">
                      <div>
                        <p className="text-sm font-semibold">Active projects</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Current studio workload
                        </p>
                      </div>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal />
                      </Button>
                    </div>

                    <div className="divide-y">
                      <ProjectRow
                        initials="AS"
                        title="Alder & Stone"
                        subtitle="Website Redesign"
                        progress={68}
                        tone="info"
                        status="In Progress"
                      />
                      <ProjectRow
                        initials="VD"
                        title="Vela Dental"
                        subtitle="Patient Portal"
                        progress={82}
                        tone="purple"
                        status="Client Review"
                      />
                      <ProjectRow
                        initials="HC"
                        title="Harbor Coffee"
                        subtitle="E-commerce Launch"
                        progress={24}
                        tone="neutral"
                        status="Planning"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border bg-white">
                    <div className="border-b px-5 py-4">
                      <p className="text-sm font-semibold">Recent activity</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Latest workspace updates
                      </p>
                    </div>

                    <div className="space-y-5 p-5">
                      {recentActivity.map((activity) => {
                        const Icon = activity.icon;

                        return (
                          <div
                            key={activity.title}
                            className="flex items-start gap-3"
                          >
                            <div
                              className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${activity.iconClassName}`}
                            >
                              <Icon className="size-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-xs font-medium">
                                {activity.title}
                              </p>
                              <p className="mt-1 text-[10px] text-muted-foreground">
                                {activity.meta}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientPortalPreview() {
  return (
    <div className="animate-soft-float rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl backdrop-blur sm:p-4">
      <div className="rounded-[1.25rem] bg-[#f7f8fa] p-5 text-foreground sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Client portal</p>
            <p className="mt-1 font-semibold">Alder &amp; Stone Interiors</p>
          </div>

          <Avatar>
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
        </div>

        <div className="mt-7 rounded-xl border bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <StatusBadge tone="purple">Review required</StatusBadge>
              <h3 className="mt-4 text-lg font-semibold">
                Homepage design concept
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Submitted by Maya Torres
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock3 className="size-3.5" />
              Due August 9
            </span>
          </div>

          <div className="mt-5 aspect-[16/9] overflow-hidden rounded-lg border bg-[#e9e8e4] p-3">
            <div className="flex h-full flex-col rounded-md bg-[#f9f7f2] p-4 shadow-sm">
              <div className="h-2 w-16 rounded-full bg-slate-300" />
              <div className="mt-auto">
                <div className="h-3 w-2/3 rounded-full bg-slate-700" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-slate-300" />
                <div className="mt-4 h-6 w-20 rounded bg-slate-800" />
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" className="flex-1">
              Request changes
            </Button>
            <Button className="flex-1">
              <Check />
              Approve concept
            </Button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-4">
            <p className="text-xs font-medium text-muted-foreground">
              Overall progress
            </p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-2xl font-semibold">68%</span>
              <span className="text-xs text-muted-foreground">
                3 of 5 stages
              </span>
            </div>
            <Progress value={68} className="mt-3" />
          </div>

          <div className="rounded-xl border bg-white p-4">
            <p className="text-xs font-medium text-muted-foreground">
              Next deadline
            </p>
            <p className="mt-3 text-base font-semibold">August 18, 2026</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Final UI approval
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardMetric({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="text-[10px] font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-semibold tracking-[-0.035em]">{value}</p>
      <p className="mt-1 truncate text-[9px] text-muted-foreground">{change}</p>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-semibold">{value}</p>
    </div>
  );
}

function PreviewNavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: typeof LayoutDashboard;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs ${
        active
          ? "bg-white/10 font-medium text-white"
          : "text-slate-400"
      }`}
    >
      <Icon className="size-4" />
      {label}
    </div>
  );
}

function ProjectRow({
  initials,
  title,
  subtitle,
  progress,
  tone,
  status,
}: {
  initials: string;
  title: string;
  subtitle: string;
  progress: number;
  tone: "neutral" | "info" | "purple";
  status: string;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 px-5 py-4 sm:grid-cols-[auto_1fr_110px] sm:items-center">
      <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-xs font-semibold">
        {initials}
      </div>

      <div className="min-w-0">
        <p className="truncate text-xs font-medium">{title}</p>
        <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1">
        <div className="hidden w-12 sm:block">
          <Progress value={progress} />
        </div>
        <StatusBadge tone={tone} className="text-[9px]">
          {status}
        </StatusBadge>
      </div>
    </div>
  );
}

function StageRow({
  title,
  status,
  completed = false,
  current = false,
}: {
  title: string;
  status: string;
  completed?: boolean;
  current?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <div
        className={`flex size-7 shrink-0 items-center justify-center rounded-full ${
          completed
            ? "bg-emerald-100 text-emerald-700"
            : current
              ? "bg-blue-100 text-blue-700"
              : "bg-secondary text-muted-foreground"
        }`}
      >
        {completed ? (
          <Check className="size-4" />
        ) : (
          <span className="size-2 rounded-full bg-current" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
      </div>

      <span className="text-xs text-muted-foreground">{status}</span>
    </div>
  );
}

function HeaderNavItem({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "bg-secondary text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
      }`}
    >
      {label}

      {active && (
        <span
          className="absolute inset-x-4 -bottom-[17px] h-px bg-primary"
          aria-hidden="true"
        />
      )}
    </a>
  );
}

function PricingCard({
  name,
  price,
  description,
  features,
  buttonLabel,
  featured = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonLabel: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`relative flex flex-col rounded-2xl border p-7 ${
        featured
          ? "border-primary bg-primary text-primary-foreground shadow-[0_24px_70px_rgba(35,49,89,0.16)]"
          : "bg-white"
      }`}
    >
      {featured && (
        <Badge className="absolute right-5 top-5 bg-white text-primary hover:bg-white">
          Most popular
        </Badge>
      )}

      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="mt-5 flex items-end gap-1">
          <span className="text-4xl font-semibold tracking-[-0.045em]">
            {price}
          </span>
          <span
            className={
              featured
                ? "pb-1 text-sm text-primary-foreground/60"
                : "pb-1 text-sm text-muted-foreground"
            }
          >
            / month
          </span>
        </div>
        <p
          className={`mt-4 min-h-12 text-sm leading-6 ${
            featured
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      </div>

      <div className="mt-7 space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3 text-sm">
            <Check
              className={`size-4 ${
                featured ? "text-emerald-300" : "text-emerald-600"
              }`}
            />
            {feature}
          </div>
        ))}
      </div>

      <Button
        variant={featured ? "secondary" : "outline"}
        className="mt-8 w-full"
      >
        {buttonLabel}
      </Button>
    </article>
  );
}