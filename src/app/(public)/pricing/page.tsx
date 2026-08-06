import Link from "next/link";
import { Check } from "lucide-react";

import { Container, StatusBadge } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For freelancers testing a better client workflow.",
    features: [
      "2 active projects",
      "3 clients",
      "3 workspace members",
      "1 GB file storage",
    ],
  },
  {
    name: "Studio",
    price: "$24",
    description: "For small studios managing ongoing client work.",
    features: [
      "15 active projects",
      "30 clients",
      "10 workspace members",
      "20 GB file storage",
    ],
    featured: true,
  },
  {
    name: "Agency",
    price: "$59",
    description: "For established agencies with more clients and teams.",
    features: [
      "50 active projects",
      "100 clients",
      "25 workspace members",
      "100 GB file storage",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <StatusBadge>Simple pricing</StatusBadge>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Start small and upgrade when your client work grows.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Every plan includes the core project, file, feedback, and approval workflow.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.featured
                  ? "relative border-primary bg-primary text-primary-foreground shadow-xl"
                  : "bg-white shadow-sm"
              }
            >
              <CardContent className="flex h-full flex-col p-7">
                {plan.featured && (
                  <Badge className="absolute right-5 top-5 bg-white text-primary">
                    Most popular
                  </Badge>
                )}

                <h2 className="text-lg font-semibold">{plan.name}</h2>

                <div className="mt-5 flex items-end gap-1">
                  <span className="text-4xl font-semibold">{plan.price}</span>
                  <span
                    className={
                      plan.featured
                        ? "pb-1 text-sm text-primary-foreground/60"
                        : "pb-1 text-sm text-muted-foreground"
                    }
                  >
                    / month
                  </span>
                </div>

                <p
                  className={
                    plan.featured
                      ? "mt-4 min-h-12 text-sm leading-6 text-primary-foreground/70"
                      : "mt-4 min-h-12 text-sm leading-6 text-muted-foreground"
                  }
                >
                  {plan.description}
                </p>

                <div className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="size-4 text-emerald-500" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan.featured ? "secondary" : "outline"}
                  className="mt-8 w-full"
                  nativeButton={false}
                  render={<Link href="/register" />}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}