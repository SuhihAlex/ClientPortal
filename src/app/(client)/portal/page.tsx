import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Download,
  FileCheck2,
  Files,
  FolderKanban,
  MessageSquareText,
} from "lucide-react";

import { StatusBadge } from "@/components/shared";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const recentFiles = [
  {
    name: "homepage-design-v3.fig",
    meta: "Figma file · 12.4 MB",
    date: "Today",
    initials: "MT",
  },
  {
    name: "brand-guidelines-v2.pdf",
    meta: "PDF document · 4.8 MB",
    date: "Yesterday",
    initials: "MT",
  },
  {
    name: "website-copy-review.docx",
    meta: "Word document · 820 KB",
    date: "Aug 4",
    initials: "EC",
  },
];

const comments = [
  {
    author: "Maya Torres",
    initials: "MT",
    text: "The updated homepage direction is ready for your review.",
    time: "34 minutes ago",
  },
  {
    author: "Ethan Cole",
    initials: "EC",
    text: "We moved the final design deadline to August 18.",
    time: "Yesterday",
  },
];

export default function ClientDashboardPage() {
  return (
    <div>
      <DashboardHeader />

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={FolderKanban}
          label="Active projects"
          value="2"
          detail="1 currently in review"
        />

        <SummaryCard
          icon={FileCheck2}
          label="Awaiting your review"
          value="1"
          detail="Homepage design concept"
          highlighted
        />

        <SummaryCard
          icon={CalendarDays}
          label="Next deadline"
          value="Aug 18"
          detail="Final UI approval"
        />

        <SummaryCard
          icon={MessageSquareText}
          label="New comments"
          value="3"
          detail="Across your projects"
        />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <ProjectOverview />
        <ReviewRequired />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <RecentFiles />
        <RecentComments />
      </section>
    </div>
  );
}

function DashboardHeader() {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <StatusBadge tone="success">
          Project workspace active
        </StatusBadge>

        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
          Welcome back, Sophia
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Review project progress, access your files, and respond to materials
          that need your attention.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border bg-white p-3 shadow-sm">
        <Avatar className="size-10 rounded-xl">
          <AvatarFallback className="rounded-xl bg-primary text-xs text-primary-foreground">
            NS
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="text-xs text-muted-foreground">
            Managed by
          </p>
          <p className="text-sm font-medium">Northline Studio</p>
        </div>
      </div>
    </header>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  detail,
  highlighted = false,
}: {
  icon: typeof FolderKanban;
  label: string;
  value: string;
  detail: string;
  highlighted?: boolean;
}) {
  return (
    <Card
      className={
        highlighted
          ? "border-primary/20 bg-primary text-primary-foreground shadow-[0_18px_45px_rgba(35,49,89,0.13)]"
          : "bg-white shadow-sm"
      }
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p
              className={
                highlighted
                  ? "text-sm text-primary-foreground/65"
                  : "text-sm text-muted-foreground"
              }
            >
              {label}
            </p>

            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
              {value}
            </p>
          </div>

          <div
            className={
              highlighted
                ? "flex size-10 items-center justify-center rounded-xl bg-white/10 text-white"
                : "flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"
            }
          >
            <Icon className="size-5" />
          </div>
        </div>

        <p
          className={
            highlighted
              ? "mt-4 truncate text-xs text-primary-foreground/60"
              : "mt-4 truncate text-xs text-muted-foreground"
          }
        >
          {detail}
        </p>
      </CardContent>
    </Card>
  );
}

function ProjectOverview() {
  return (
    <Card className="overflow-hidden bg-white shadow-sm">
      <CardHeader className="border-b">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardDescription>Active project</CardDescription>
            <CardTitle className="mt-1 text-xl">
              Alder &amp; Stone Website Redesign
            </CardTitle>
          </div>

          <StatusBadge tone="info">In Progress</StatusBadge>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Overall progress</p>
            <p className="mt-1 text-xs text-muted-foreground">
              3 of 5 project stages completed
            </p>
          </div>

          <span className="text-2xl font-semibold tracking-[-0.04em]">
            68%
          </span>
        </div>

        <Progress value={68} className="mt-5 h-2" />

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <ProjectMetric
            label="Current stage"
            value="UI Design"
          />
          <ProjectMetric
            label="Next deadline"
            value="August 18"
          />
          <ProjectMetric
            label="Project manager"
            value="Ethan Cole"
          />
        </div>

        <div className="mt-7">
          <p className="text-sm font-medium">Project stages</p>

          <div className="mt-4 space-y-3">
            <StageRow
              title="Discovery and strategy"
              subtitle="Completed July 12"
              completed
            />

            <StageRow
              title="UX architecture"
              subtitle="Completed July 26"
              completed
            />

            <StageRow
              title="UI design"
              subtitle="Current stage · Due August 18"
              current
            />

            <StageRow
              title="Development"
              subtitle="Starts after design approval"
            />
          </div>
        </div>

        <Button variant="outline" className="mt-6">
          Open project
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
}

function ReviewRequired() {
  return (
    <Card className="overflow-hidden border-violet-200 bg-white shadow-sm">
      <div className="bg-violet-50 px-5 py-3 text-xs font-medium text-violet-700">
        Action required
      </div>

      <CardContent className="p-5">
        <StatusBadge tone="purple">Ready for Review</StatusBadge>

        <h2 className="mt-4 text-lg font-semibold tracking-[-0.025em]">
          Homepage design concept
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Review the latest homepage direction and either approve it or request
          changes.
        </p>

        <div className="mt-5 aspect-[4/3] overflow-hidden rounded-xl border bg-[#e9e8e4] p-3">
          <div className="flex h-full flex-col rounded-lg bg-[#faf8f3] p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="h-2 w-16 rounded-full bg-slate-300" />
              <div className="h-2 w-10 rounded-full bg-slate-200" />
            </div>

            <div className="mt-auto">
              <div className="h-3 w-3/4 rounded-full bg-slate-700" />
              <div className="mt-2 h-2 w-1/2 rounded-full bg-slate-300" />
              <div className="mt-4 h-7 w-24 rounded-md bg-slate-800" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock3 className="size-4" />
          Review requested 2 days ago
        </div>

        <Button className="mt-5 w-full">
          Review material
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
}

function ProjectMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-secondary/30 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-medium">{value}</p>
    </div>
  );
}

function StageRow({
  title,
  subtitle,
  completed = false,
  current = false,
}: {
  title: string;
  subtitle: string;
  completed?: boolean;
  current?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-3.5">
      <div
        className={
          completed
            ? "flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
            : current
              ? "flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700"
              : "flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground"
        }
      >
        {completed ? (
          <Check className="size-4" />
        ) : (
          <span className="size-2 rounded-full bg-current" />
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function RecentFiles() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="flex-row items-center justify-between border-b">
        <div>
          <CardTitle>Recent files</CardTitle>
          <CardDescription className="mt-1">
            Latest files shared with you
          </CardDescription>
        </div>

        <Button variant="ghost" size="sm">
          View all
          <ArrowRight />
        </Button>
      </CardHeader>

      <CardContent className="divide-y p-0">
        {recentFiles.map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-secondary/30"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Files className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {file.name}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {file.meta}
              </p>
            </div>

            <span className="hidden text-xs text-muted-foreground sm:block">
              {file.date}
            </span>

            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Download ${file.name}`}
            >
              <Download />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function RecentComments() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="border-b">
        <CardTitle>Recent comments</CardTitle>
        <CardDescription>
          Latest updates from the project team
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 pt-5">
        {comments.map((comment) => (
          <div key={comment.text} className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback>{comment.initials}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-sm font-medium">{comment.author}</p>
                <span className="text-[10px] text-muted-foreground">
                  {comment.time}
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {comment.text}
              </p>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full">
          View all comments
        </Button>
      </CardContent>
    </Card>
  );
}