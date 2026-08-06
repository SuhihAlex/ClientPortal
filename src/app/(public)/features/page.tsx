import {
  FileCheck2,
  Files,
  FolderKanban,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Container, StatusBadge } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: FolderKanban,
    title: "Projects and stages",
    description:
      "Organize every engagement into clear stages, deadlines, owners, and progress.",
  },
  {
    icon: Files,
    title: "Centralized files",
    description:
      "Keep files connected to projects and control exactly what clients can access.",
  },
  {
    icon: FileCheck2,
    title: "Approval workflow",
    description:
      "Send materials for review, collect decisions, and keep approval status visible.",
  },
  {
    icon: MessageSquareText,
    title: "Comments in context",
    description:
      "Keep project and material feedback attached to the work instead of scattered.",
  },
  {
    icon: Users,
    title: "Separate client portal",
    description:
      "Clients get a simple interface without seeing internal notes or tasks.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    description:
      "Owners, team members, and clients only see the data relevant to them.",
  },
  {
    icon: LayoutDashboard,
    title: "Studio dashboard",
    description:
      "Track projects, reviews, deadlines, unfinished tasks, and recent activity.",
  },
];

export default function FeaturesPage() {
  return (
    <main>
      <section className="border-b bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <StatusBadge tone="info">Product features</StatusBadge>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Everything needed for a clear client workflow.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              ClientPortal keeps projects, files, reviews, and communication in
              one focused system without becoming a full project management suite.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card key={feature.title} className="bg-white shadow-sm">
                  <CardContent className="p-7">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>

                    <h2 className="mt-6 text-lg font-semibold">
                      {feature.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}