import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Files,
  FolderKanban,
  MessageSquareText,
  MoreHorizontal,
  Plus,
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

const metrics = [
  {
    label: "Active projects",
    value: "8",
    detail: "+2 from last month",
    icon: FolderKanban,
  },
  {
    label: "Pending reviews",
    value: "3",
    detail: "2 require attention",
    icon: FileCheck2,
  },
  {
    label: "Upcoming deadlines",
    value: "5",
    detail: "Within the next 14 days",
    icon: CalendarDays,
  },
  {
    label: "Incomplete tasks",
    value: "12",
    detail: "Across 4 active projects",
    icon: CheckCircle2,
  },
];

const projects = [
  {
    initials: "AS",
    company: "Alder & Stone",
    name: "Website Redesign",
    status: "In Progress",
    tone: "info" as const,
    progress: 68,
    deadline: "Aug 18",
  },
  {
    initials: "VD",
    company: "Vela Dental",
    name: "Patient Portal",
    status: "Client Review",
    tone: "purple" as const,
    progress: 82,
    deadline: "Aug 11",
  },
  {
    initials: "HC",
    company: "Harbor Coffee",
    name: "E-commerce Launch",
    status: "Planning",
    tone: "neutral" as const,
    progress: 24,
    deadline: "Sep 04",
  },
  {
    initials: "NT",
    company: "Nomad Trails",
    name: "Booking Experience",
    status: "In Progress",
    tone: "info" as const,
    progress: 51,
    deadline: "Aug 27",
  },
];

const activity = [
  {
    icon: FileCheck2,
    title: "Homepage concept approved",
    description: "Sophia Miller approved the latest design.",
    time: "12 min ago",
    className: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: MessageSquareText,
    title: "New comment on Vela Dental",
    description: "James left feedback on the patient flow.",
    time: "34 min ago",
    className: "bg-blue-50 text-blue-700",
  },
  {
    icon: Files,
    title: "New project file uploaded",
    description: "Maya uploaded brand-guidelines-v2.pdf.",
    time: "1 hr ago",
    className: "bg-violet-50 text-violet-700",
  },
  {
    icon: Clock3,
    title: "Project deadline updated",
    description: "Nomad Trails moved to August 27.",
    time: "3 hrs ago",
    className: "bg-amber-50 text-amber-700",
  },
];

export default function StudioDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1500px]">
      <PageHeader />

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card key={metric.label} className="bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                      {metric.value}
                    </p>
                  </div>

                  <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" />
                  </div>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  {metric.detail}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
        <ActiveProjects />
        <RecentActivity />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <UpcomingDeadlines />
        <PendingReviews />
      </section>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-primary">
          Thursday, August 6
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
          Good evening, Olivia
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Here is what is happening across Northline Studio.
        </p>
      </div>

      <Button className="sm:hidden">
        <Plus />
        New project
      </Button>
    </header>
  );
}

function ActiveProjects() {
  return (
    <Card className="overflow-hidden bg-white shadow-sm">
      <CardHeader className="flex-row items-center justify-between border-b">
        <div>
          <CardTitle>Active projects</CardTitle>
          <CardDescription className="mt-1">
            Current work across the studio
          </CardDescription>
        </div>

        <Button variant="ghost" size="sm">
          View all
          <ArrowUpRight />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y">
          {projects.map((project) => (
            <div
              key={project.name}
              className="grid gap-4 px-5 py-4 transition-colors hover:bg-secondary/30 sm:grid-cols-[auto_1fr_130px_90px_auto] sm:items-center"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-xs font-semibold">
                {project.initials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {project.name}
                </p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {project.company}
                </p>
              </div>

              <StatusBadge tone={project.tone}>
                {project.status}
              </StatusBadge>

              <div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{project.progress}%</span>
                  <span className="sm:hidden">{project.deadline}</span>
                </div>
                <Progress value={project.progress} className="mt-2 h-1.5" />
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-xs font-medium">{project.deadline}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Deadline
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon-sm"
                className="hidden sm:inline-flex"
              >
                <MoreHorizontal />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivity() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="border-b">
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>
          Latest workspace updates
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {activity.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-start gap-3">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${item.className}`}
              >
                <Icon className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-1.5 text-[10px] text-muted-foreground">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function UpcomingDeadlines() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="border-b">
        <CardTitle>Upcoming deadlines</CardTitle>
        <CardDescription>
          Due in the next fourteen days
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pt-5">
        {[
          ["Vela Dental", "Final UX review", "Aug 11", "VD"],
          ["Alder & Stone", "Homepage approval", "Aug 18", "AS"],
          ["Nomad Trails", "Booking flow delivery", "Aug 27", "NT"],
        ].map(([company, task, date, initials]) => (
          <div
            key={task}
            className="flex items-center gap-3 rounded-xl border p-3.5"
          >
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{task}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {company}
              </p>
            </div>

            <span className="text-xs font-medium">{date}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function PendingReviews() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="border-b">
        <CardTitle>Pending reviews</CardTitle>
        <CardDescription>
          Materials waiting for client decisions
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pt-5">
        {[
          ["Homepage design concept", "Alder & Stone", "2 days"],
          ["Patient onboarding flow", "Vela Dental", "4 hours"],
          ["Campaign landing page", "Harbor Coffee", "1 day"],
        ].map(([material, company, waiting]) => (
          <div
            key={material}
            className="flex items-center gap-3 rounded-xl border p-3.5"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <FileCheck2 className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{material}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {company}
              </p>
            </div>

            <span className="text-xs text-muted-foreground">
              {waiting}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}