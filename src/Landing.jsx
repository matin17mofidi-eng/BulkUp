import React, { useState } from "react";
import {
  ArrowRight, Dumbbell, UtensilsCrossed, Droplets, TrendingUp,
  ChevronDown, ChevronUp, Flame, Calendar, ChefHat, Instagram, Mail
} from "lucide-react";

const FAQS = [
  {
    q: "I eat a lot already but still can't gain weight. Will this actually help?",
    a: "Most people who struggle to gain weight aren't actually eating as much as they think — it's easy to underestimate calories without tracking. BulkUp shows you exactly how many calories and how much protein you need based on your stats, and gives you specific meals that hit those numbers, so there's no guesswork left.",
  },
  {
    q: "Do I need a gym membership?",
    a: "The built-in workout schedule is designed around standard gym equipment (barbells, dumbbells, machines), since resistance training is what turns extra calories into muscle instead of just fat. If you're training at home with limited equipment, you can still use the meal and macro tracking on its own.",
  },
  {
    q: "Is this medical advice?",
    a: "No. Calorie and macro targets are calculated from standard formulas based on the stats you enter, not a personalized medical assessment. If you're underweight due to an underlying health condition, or you're unsure why you're struggling to gain weight, talk to a doctor before starting an aggressive surplus.",
  },
  {
    q: "Does it work on my phone?",
    a: "Yes — it runs in your phone or computer's browser, no app store download needed. Your data is saved on your device so it's there next time you open it.",
  },
  {
    q: "Is my data private?",
    a: "Your profile, meals, and progress are stored locally in your own browser. Nothing is sent to a server or shared with anyone else.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #262626" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 16, background: "none", border: "none", padding: "1.1rem 0", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: "#E8E8E8" }}>{q}</span>
        {open ? <ChevronUp size={18} color="#8A8A8A" style={{ flexShrink: 0 }} /> : <ChevronDown size={18} color="#8A8A8A" style={{ flexShrink: 0 }} />}
      </button>
      {open && <p style={{ fontSize: 15, color: "#A8A8A8", lineHeight: 1.65, paddingBottom: "1.1rem", margin: 0 }}>{a}</p>}
    </div>
  );
}

function FeatureCard({ icon, title, body }) {
  return (
    <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 18, padding: "1.5rem" }}>
      <div style={{ width: 42, height: 42, borderRadius: 12, background: "#0A0A0A", border: "1px solid #2A4A1F", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, color: "#39FF14" }}>
        {icon}
      </div>
      <p style={{ fontSize: 16, fontWeight: 700, color: "#E8E8E8", marginBottom: 6 }}>{title}</p>
      <p style={{ fontSize: 14, color: "#8A8A8A", lineHeight: 1.6, margin: 0 }}>{body}</p>
    </div>
  );
}

function StepRow({ number, title, body, isLast }) {
  return (
    <div style={{ display: "flex", gap: 18 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#39FF14", color: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
          {number}
        </div>
        {!isLast && <div style={{ width: 2, flex: 1, background: "#262626", marginTop: 6 }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : "2rem" }}>
        <p style={{ fontSize: 17, fontWeight: 700, color: "#E8E8E8", marginBottom: 4 }}>{title}</p>
        <p style={{ fontSize: 14.5, color: "#8A8A8A", lineHeight: 1.6, margin: 0, maxWidth: 440 }}>{body}</p>
      </div>
    </div>
  );
}

export default function Landing({ onStart }) {
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: "#0A0A0A", color: "#E8E8E8", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ maxWidth: 1080, margin: "0 auto", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <img src="/assets/logo-icon.png" alt="BulkUp" style={{ width: 36, height: 36, borderRadius: 9, objectFit: "cover" }} />
          <span style={{ fontSize: 17, fontWeight: 700, color: "#E8E8E8" }}>BulkUp</span>
        </div>
        <button
          onClick={onStart}
          style={{ padding: "10px 18px", borderRadius: 12, border: "1px solid #39FF14", background: "transparent", color: "#39FF14", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
        >
          Use our tracker
        </button>
      </nav>

      {/* Hero */}
      <header style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 4rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#0F1F0A", border: "1px solid #2A4A1F", color: "#39FF14", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: "1.75rem" }}>
          <TrendingUp size={14} /> Built for people trying to gain weight, not lose it
        </div>
        <h1 style={{ fontSize: "clamp(34px, 6vw, 52px)", fontWeight: 700, lineHeight: 1.12, margin: "0 0 1.25rem", letterSpacing: "-0.01em", color: "#F2F2F2" }}>
          Stop guessing.<br /><span style={{ color: "#39FF14" }}>Start gaining.</span>
        </h1>
        <p style={{ fontSize: 18, color: "#A8A8A8", lineHeight: 1.6, maxWidth: 560, margin: "0 auto 2.25rem" }}>
          BulkUp tells you exactly what to eat, how much, and when — plus a built-in
          gym schedule — so building real mass and muscle stops being a mystery.
        </p>
        <button
          onClick={onStart}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 28px", borderRadius: 14,
            border: "none", background: "#39FF14", color: "#0A0A0A", fontWeight: 700, fontSize: 16, cursor: "pointer",
          }}
        >
          Use our tracker <ArrowRight size={18} />
        </button>
        <p style={{ fontSize: 13, color: "#666666", marginTop: 12 }}>Free. No account needed. Works right in your browser.</p>
      </header>

      {/* Feature grid */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
          <FeatureCard
            icon={<UtensilsCrossed size={20} />}
            title="Meal plans with real recipes"
            body="Breakfast, lunch, dinner, and snacks built around hitting your calorie and protein targets — with step-by-step recipes, not just a number."
          />
          <FeatureCard
            icon={<Dumbbell size={20} />}
            title="A real gym schedule"
            body="A full push/pull/legs week with sets, reps, and rest times built in, plus a form-check link for every exercise."
          />
          <FeatureCard
            icon={<Flame size={20} />}
            title="Macros calculated for you"
            body="Calorie and protein targets based on your height, weight, and goals — not a generic number copied from someone else's plan."
          />
          <FeatureCard
            icon={<Droplets size={20} />}
            title="Water tracking"
            body="A simple daily water tracker, because eating bigger volumes of food takes hydration most people forget about."
          />
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "1rem 1.5rem 4rem" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#39FF14", letterSpacing: "0.05em", marginBottom: 8 }}>HOW IT WORKS</p>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: "2.25rem", color: "#E8E8E8" }}>Three steps to a plan built around you</h2>
        <StepRow
          number={1}
          title="Tell us about you"
          body="Your name, age, height, current weight, goal weight, and how fast you want to gain. Takes under a minute."
        />
        <StepRow
          number={2}
          title="Get your numbers"
          body="We calculate your daily calorie and macro targets based on your stats, then line up meals and a gym schedule to hit them."
        />
        <StepRow
          number={3}
          title="Track every day"
          body="Log meals, check off workouts, track water, and log your weight as it climbs. Everything saves automatically."
          isLast
        />
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "1rem 1.5rem 4rem" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#39FF14", letterSpacing: "0.05em", marginBottom: 8 }}>QUESTIONS</p>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: "1rem", color: "#E8E8E8" }}>Frequently asked</h2>
        <div>
          {FAQS.map((f, i) => <FaqItem key={i} {...f} />)}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "1rem 1.5rem 5rem", textAlign: "center" }}>
        <div style={{ background: "#141414", border: "1px solid #2A4A1F", borderRadius: 24, padding: "3rem 2rem" }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: "#F2F2F2", marginBottom: 10 }}>Ready to stop guessing?</h2>
          <p style={{ fontSize: 15, color: "#A8A8A8", marginBottom: "1.75rem" }}>Set up your plan in under a minute.</p>
          <button
            onClick={onStart}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 14,
              border: "none", background: "#39FF14", color: "#0A0A0A", fontWeight: 700, fontSize: 16, cursor: "pointer",
            }}
          >
            Use our tracker <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "2.5rem 1.5rem 2rem" }}>
        <img src="/assets/logo-full.png" alt="BulkUp — gain more, be more" style={{ width: 120, height: 120, borderRadius: 16, marginBottom: "1.5rem", objectFit: "cover" }} />
        <p style={{ fontSize: 13, fontWeight: 700, color: "#39FF14", letterSpacing: "0.05em", marginBottom: 14 }}>CONTACT US FOR INQUIRIES</p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
          <a
            href="https://instagram.com/bulkupapp"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 12,
              border: "1px solid #262626", color: "#E8E8E8", textDecoration: "none", fontSize: 13, fontWeight: 600,
            }}
          >
            <Instagram size={16} color="#39FF14" /> @bulkupapp
          </a>
          <a
            href="mailto:bulkupapp@gmail.com"
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 12,
              border: "1px solid #262626", color: "#E8E8E8", textDecoration: "none", fontSize: 13, fontWeight: 600,
            }}
          >
            <Mail size={16} color="#39FF14" /> bulkupapp@gmail.com
          </a>
        </div>
        <p style={{ color: "#666666", fontSize: 13, margin: 0, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
          BulkUp is not a substitute for medical advice. Talk to a doctor if you're underweight due to a health condition.
        </p>
      </footer>
    </div>
  );
}
