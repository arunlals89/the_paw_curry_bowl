import Link from "next/link";

import { Logo } from "@/components/ui/Logo";

const steps = [
  { emoji: "🐶", title: "Tell us about your dog", desc: "Breed, weight, activity level & any allergies — takes under a minute." },
  { emoji: "🥘", title: "Customize the recipe", desc: "Dial in the chicken, veggie & rice ratio to match your pup's needs." },
  { emoji: "👨‍🍳", title: "We cook it fresh", desc: "Every batch is home-cooked each morning in our kitchen — no preservatives." },
  { emoji: "🛵", title: "Delivered to your door", desc: "Track your delivery live, right up to your doorstep." },
];

const plans = [
  { name: "Pawrfect", tagline: "For small breeds & light eaters", price: 149, weight: "250g / day" },
  { name: "Powerpaws", tagline: "Balanced energy for active dogs", price: 219, weight: "400g / day", popular: true },
  { name: "Big Dawg", tagline: "High-protein fuel for large breeds", price: 309, weight: "600g / day" },
];

const benefits = [
  { emoji: "🚫", title: "Zero preservatives", desc: "Just real chicken, veggies & rice — nothing artificial, ever." },
  { emoji: "⚖️", title: "Vet-informed ratios", desc: "50% chicken, 25% veggies, 25% rice — balanced for everyday nutrition." },
  { emoji: "🌅", title: "Cooked fresh every morning", desc: "Meals are prepared the same day they're delivered." },
  { emoji: "🥕", title: "Allergy-aware", desc: "Tell us what to leave out and the kitchen flags it on every ticket." },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
          <Logo size={38} />
          <nav className="hidden items-center gap-8 text-sm font-semibold text-bark-soft md:flex">
            <a href="#how-it-works" className="transition hover:text-bark">How it works</a>
            <a href="#plans" className="transition hover:text-bark">Plans</a>
            <a href="#why-fresh" className="transition hover:text-bark">Why fresh</a>
          </nav>
          <Link
            href="/app/login"
            className="rounded-xl bg-paw-orange px-4 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-paw-orange-dark"
          >
            Get Early Access
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-paw-green-light px-3.5 py-1.5 text-xs font-bold text-paw-green-dark">
                🐾 Now delivering across Coimbatore
              </span>
              <h1 className="mt-5 font-display text-4xl leading-tight text-bark md:text-5xl">
                Fresh, home-cooked meals your dog will love.
              </h1>
              <p className="mt-4 max-w-md text-base text-bark-soft md:text-lg">
                Real chicken, veggies &amp; rice — cooked fresh every morning and delivered to your door.
                No preservatives, no fillers, just a happy, healthy pup.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3" id="get-started">
                <a href="#plans" className="rounded-xl bg-paw-orange px-6 py-3.5 text-sm font-bold text-white shadow-soft-lg transition hover:bg-paw-orange-dark">
                  See meal plans
                </a>
                <a
                  href="https://www.instagram.com/the_paw_curry_bowl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-black/10 bg-white px-6 py-3.5 text-sm font-bold text-bark shadow-soft transition hover:border-paw-orange/40"
                >
                  Follow on Instagram
                </a>
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-bark-soft/70">
                50% Chicken &nbsp;·&nbsp; 25% Veggies &nbsp;·&nbsp; 25% Rice
              </p>
            </div>
            <div className="relative mx-auto flex h-72 w-72 items-center justify-center rounded-full bg-gradient-to-br from-paw-orange-light to-paw-green-light shadow-soft-lg md:h-96 md:w-96">
              <div className="flex h-56 w-56 items-center justify-center rounded-full bg-white shadow-soft md:h-72 md:w-72">
                <span className="text-7xl md:text-8xl">🍲</span>
              </div>
              <span className="absolute -right-2 top-6 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-bark shadow-soft-lg md:right-0">
                🐾 Cooked fresh today
              </span>
              <span className="absolute -left-4 bottom-10 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-bark shadow-soft-lg md:-left-6">
                ❤️ Loved by 300+ pups
              </span>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <h2 className="text-center font-display text-3xl text-bark">How it works</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-bark-soft">
            From sign-up to supper bowl in four simple steps.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-black/5 bg-white/70 p-5 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paw-orange-light text-xl">
                  {step.emoji}
                </div>
                <p className="mt-3 text-xs font-bold text-paw-orange-dark">STEP {i + 1}</p>
                <h3 className="mt-1 font-display text-lg text-bark">{step.title}</h3>
                <p className="mt-1.5 text-sm text-bark-soft">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Plans */}
        <section id="plans" className="bg-cream-dark/40 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2 className="text-center font-display text-3xl text-bark">Meal plans for every pup</h2>
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-bark-soft">
              Every plan follows the same 50:25:25 chicken, veggie &amp; rice ratio — portioned to your dog&apos;s size.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl border p-7 shadow-soft transition hover:shadow-soft-lg ${
                    plan.popular ? "border-paw-orange/40 bg-white" : "border-black/5 bg-white/70"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-7 rounded-full bg-paw-orange px-3 py-1 text-xs font-bold text-white shadow-soft">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-2xl text-bark">{plan.name}</h3>
                  <p className="mt-1 text-sm text-bark-soft">{plan.tagline}</p>
                  <p className="mt-5 font-display text-4xl text-paw-orange-dark">
                    ₹{plan.price}<span className="text-sm font-sans font-semibold text-bark-soft">/day</span>
                  </p>
                  <p className="mt-1 text-xs font-semibold text-bark-soft">{plan.weight}</p>
                  <ul className="mt-5 flex flex-col gap-2 text-sm text-bark-soft">
                    <li>🍗 50% fresh chicken</li>
                    <li>🥦 25% seasonal veggies</li>
                    <li>🍚 25% rice</li>
                  </ul>
                  <a
                    href="#get-started"
                    className={`mt-6 block rounded-xl py-3 text-center text-sm font-bold transition ${
                      plan.popular
                        ? "bg-paw-orange text-white hover:bg-paw-orange-dark"
                        : "bg-bark text-white hover:opacity-90"
                    }`}
                  >
                    Choose {plan.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why fresh */}
        <section id="why-fresh" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <h2 className="text-center font-display text-3xl text-bark">Why home-cooked, fresh food?</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white/70 p-5 shadow-soft">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paw-green-light text-xl">
                  {b.emoji}
                </div>
                <div>
                  <h3 className="font-display text-lg text-bark">{b.title}</h3>
                  <p className="mt-1 text-sm text-bark-soft">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-20">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-paw-green px-8 py-12 text-center shadow-soft-lg">
            <h2 className="font-display text-3xl text-white">Ready to spoil your pup?</h2>
            <p className="max-w-md text-sm text-paw-green-light">
              Join 300+ Bengaluru pet parents already feeding their dogs fresh, home-cooked meals.
            </p>
            <a href="#get-started" className="rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-paw-green-dark shadow-soft transition hover:bg-cream">
              Start your plan today
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-white/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center md:flex-row md:justify-between md:text-left md:px-8">
          <Logo size={32} />
          <p className="text-xs text-bark-soft">
            © {new Date().getFullYear()} The Paw Curry Bowl. Cooked fresh every morning in Bengaluru.
          </p>
          <a
            href="https://www.instagram.com/the_paw_curry_bowl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-paw-orange-dark"
          >
            @the_paw_curry_bowl
          </a>
        </div>
      </footer>
    </div>
  );
}
