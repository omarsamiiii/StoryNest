import { CheckCircle2, Moon, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { LinkButton } from "@/components/ui/link-button";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

const features = [
  ["Personal stories", "Themes, lessons, tone, and age range are tailored from parent-managed profiles."],
  ["Coloring pages", "Generate printable black-and-white page ideas from saved stories."],
  ["Usage controls", "Plans include clear monthly limits with upgrade paths and no hidden keys."]
];

const faqs = [
  ["Is this for children to use directly?", "No. StoryNest is designed for parent-controlled use."],
  ["Do I need AI or payment keys locally?", "No. The MVP uses mock providers behind replaceable interfaces."],
  ["What child data is collected?", "Only nickname, age range, interests, and preferences for story personalization."]
];

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-border bg-white px-3 py-1 text-sm font-semibold text-muted-foreground">
              Parent-controlled bedtime creativity
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-normal md:text-6xl">
              Personalized bedtime stories and printable coloring pages for your child.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              StoryNest helps parents create gentle, age-aware stories with safety constraints,
              discussion prompts, vocabulary words, and printable activities.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/signup">Create your first story</LinkButton>
              <LinkButton href="/pricing" variant="outline">
                View pricing
              </LinkButton>
            </div>
          </div>
          <HeroVisual />
        </section>

        <section id="how" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold">How it works</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {["Create a parent account", "Add a child nickname profile", "Generate, save, print"].map(
                (step, index) => (
                  <Card key={step}>
                    <CardHeader>
                      <span className="grid size-10 place-items-center rounded-md bg-muted font-bold">
                        {index + 1}
                      </span>
                      <CardTitle>{step}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm leading-6 text-muted-foreground">
                      Keep family data private while building a story library that fits bedtime.
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {features.map(([title, description]) => (
              <Card key={title}>
                <CardHeader>
                  <Sparkles className="text-accent" aria-hidden="true" />
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="safety" className="bg-primary py-16 text-primary-foreground">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <ShieldCheck size={40} aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold">Designed for parent trust</h2>
            </div>
            <div className="grid gap-3 text-sm leading-6 md:grid-cols-2">
              {[
                "No public child profiles",
                "No direct child chat",
                "No image uploads from children",
                "Bedtime-safe story constraints",
                "Nickname and age range only",
                "Replaceable provider interfaces"
              ].map((item) => (
                <div key={item} className="flex gap-2">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
            <Card>
              <CardHeader>
                <Moon className="text-primary" aria-hidden="true" />
                <CardTitle>Free to begin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  Start with 3 stories per month and one child profile, then upgrade when your
                  library grows.
                </p>
                <LinkButton href="/pricing" className="mt-5">
                  Compare plans
                </LinkButton>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Palette className="text-accent" aria-hidden="true" />
                <CardTitle>Printable moments</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                Premium plans include coloring page generation and print-friendly story layouts.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold">FAQ</h2>
            <div className="mt-6 grid gap-3">
              {faqs.map(([question, answer]) => (
                <Card key={question}>
                  <CardHeader>
                    <CardTitle className="text-lg">{question}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-6 text-muted-foreground">
                    {answer}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
