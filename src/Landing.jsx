import React, { useState, useRef, useEffect } from "react";
import {
  ArrowRight, Dumbbell, UtensilsCrossed, Droplets, TrendingUp,
  ChevronDown, ChevronUp, Flame, Calendar, ChefHat, Instagram, Mail,
  MessageCircle, X, Send, Star
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

/* ---------------------------------------------------------
   Chad's knowledge base — keyword-matched FAQ responses.
   Not a real AI model; matches visitor questions against
   keywords and returns the best pre-written answer.
--------------------------------------------------------- */
const CHAD_KNOWLEDGE = [
  {
    keywords: ["price", "cost", "free", "pay", "subscription", "money"],
    answer: "BulkUp is completely free to use right now — no account, no subscription, no payment needed. Just tap \"Use our tracker\" and you're in.",
  },
  {
    keywords: ["eat", "weight", "gain", "skinny", "underweight", "help"],
    answer: "Most people who struggle to gain weight aren't eating as much as they think. BulkUp calculates your exact calorie and protein targets, then gives you real meals and recipes built to hit them, so there's no guesswork.",
  },
  {
    keywords: ["gym", "workout", "exercise", "membership", "lift"],
    answer: "The built-in workout schedule is a 7-day push/pull/legs split designed around standard gym equipment. If you're training at home, you can still use the meal and macro tracking on its own.",
  },
  {
    keywords: ["medical", "doctor", "health", "safe", "advice"],
    answer: "BulkUp isn't medical advice — the targets come from standard formulas based on your stats, not a personalized assessment. If you're underweight due to a health condition, talk to a doctor before starting.",
  },
  {
    keywords: ["phone", "app", "download", "android", "iphone", "mobile"],
    answer: "BulkUp runs right in your phone or computer's browser, no app store download needed. Your progress is saved on your device automatically.",
  },
  {
    keywords: ["private", "data", "account", "sign up", "login", "password"],
    answer: "No account or sign-up needed. Your profile, meals, and progress are stored locally in your own browser, not on a server.",
  },
  {
    keywords: ["start", "begin", "onboard", "setup", "get going", "how do i use"],
    answer: "Just tap \"Use our tracker\" at the top of the page. It'll ask for your height, weight, and goals, takes under a minute, then builds your plan automatically.",
  },
  {
    keywords: ["recipe", "meal", "food", "breakfast", "lunch", "dinner", "snack"],
    answer: "The meal planner has full recipes for breakfast, lunch, dinner, and snacks built around your calorie and protein targets — or you can log your own food with our search tool if you'd rather eat something else.",
  },
  {
    keywords: ["sleep", "water", "recovery", "hydration"],
    answer: "The Recovery tab tracks both water intake and sleep, with a suggested 7-9 hour target each night, since recovery matters just as much as eating and lifting when you're trying to build mass.",
  },
  {
    keywords: ["contact", "email", "support", "instagram", "reach", "question"],
    answer: "You can reach the BulkUp team at bulkupapp@gmail.com or on Instagram @bulkupapp — both are linked in the footer at the bottom of this page.",
  },
];

function matchChadAnswer(message) {
  const lower = message.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;
  for (const entry of CHAD_KNOWLEDGE) {
    const score = entry.keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }
  if (bestMatch) return bestMatch.answer;
  return "I'm not sure about that one — but you can reach the real BulkUp team anytime at bulkupapp@gmail.com or @bulkupapp on Instagram. Anything else I can help with?";
}

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

/* ---------------------------------------------------------
   Chad — FAQ chat widget with end-of-chat star rating.
   Keyword-matched responses, no real AI model or backend cost.
   Ratings submit to a Formspree endpoint (set FORMSPREE_ENDPOINT below).
--------------------------------------------------------- */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xbdeewqj";

function ChadWidget() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState("chat"); // "chat" | "rating" | "done"
  const [messages, setMessages] = useState([
    { from: "chad", text: "Hey, I'm Chad. Ask me anything about BulkUp — pricing, how it works, recipes, whatever's on your mind." },
  ]);
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, stage]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const answer = matchChadAnswer(text);
    setMessages((m) => [...m, { from: "user", text }, { from: "chad", text: answer }]);
    setInput("");
  }

  function endChat() {
    setMessages((m) => [...m, { from: "chad", text: "Glad I could help! Before you go — how'd I do?" }]);
    setStage("rating");
  }

  async function submitRating() {
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ rating, review: reviewText, source: "Chad chat widget" }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStage("done");
    } catch (err) {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function resetWidget() {
    setOpen(false);
    setStage("chat");
    setMessages([{ from: "chad", text: "Hey, I'm Chad. Ask me anything about BulkUp — pricing, how it works, recipes, whatever's on your mind." }]);
    setRating(0);
    setReviewText("");
    setSubmitError(false);
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed", bottom: 22, right: 22, width: 58, height: 58, borderRadius: "50%",
            background: "#39FF14", border: "none", cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", boxShadow: "0 4px 18px rgba(57,255,20,0.35)", zIndex: 100,
          }}
        >
          <MessageCircle size={26} color="#0A0A0A" />
        </button>
      )}

      {open && (
        <div
          style={{
            position: "fixed", bottom: 22, right: 22, width: 340, maxWidth: "calc(100vw - 32px)",
            height: 480, maxHeight: "calc(100vh - 100px)", background: "#141414", border: "1px solid #262626",
            borderRadius: 20, display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 100,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #262626", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#39FF14", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0A0A", fontWeight: 700, fontSize: 15 }}>
                C
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#E8E8E8", margin: 0 }}>Chad</p>
                <p style={{ fontSize: 11, color: "#8A8A8A", margin: 0 }}>BulkUp assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8A8A" }}>
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {stage === "chat" && messages.map((m, i) => (
              <div
                key={i}
                style={{
                  maxWidth: "85%", alignSelf: m.from === "chad" ? "flex-start" : "flex-end",
                  background: m.from === "chad" ? "#0A0A0A" : "#39FF14",
                  color: m.from === "chad" ? "#E8E8E8" : "#0A0A0A",
                  borderRadius: 14, padding: "9px 13px", fontSize: 13.5, lineHeight: 1.45,
                }}
              >
                {m.text}
              </div>
            ))}

            {stage === "rating" && (
              <>
                {messages.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      maxWidth: "85%", alignSelf: m.from === "chad" ? "flex-start" : "flex-end",
                      background: m.from === "chad" ? "#0A0A0A" : "#39FF14",
                      color: m.from === "chad" ? "#E8E8E8" : "#0A0A0A",
                      borderRadius: 14, padding: "9px 13px", fontSize: 13.5, lineHeight: 1.45,
                    }}
                  >
                    {m.text}
                  </div>
                ))}
                <div style={{ background: "#0A0A0A", border: "1px solid #262626", borderRadius: 14, padding: "14px", marginTop: 4 }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setRating(n)}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
                      >
                        <Star size={26} fill={n <= rating ? "#39FF14" : "none"} color={n <= rating ? "#39FF14" : "#666666"} strokeWidth={1.5} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    placeholder="Anything else you want us to know? (optional)"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={3}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #333333",
                      background: "#141414", color: "#E8E8E8", fontSize: 13, outline: "none", resize: "none",
                      boxSizing: "border-box", marginBottom: 10, fontFamily: "inherit",
                    }}
                  />
                  {submitError && (
                    <p style={{ fontSize: 12, color: "#FF4D4D", marginBottom: 8 }}>
                      Couldn't send that — check your connection and try again.
                    </p>
                  )}
                  <button
                    onClick={submitRating}
                    disabled={rating === 0 || submitting}
                    style={{
                      width: "100%", padding: "11px 0", borderRadius: 10, border: "none", cursor: rating === 0 ? "not-allowed" : "pointer",
                      background: rating === 0 ? "#262626" : "#39FF14", color: rating === 0 ? "#666666" : "#0A0A0A",
                      fontWeight: 700, fontSize: 13,
                    }}
                  >
                    {submitting ? "Sending..." : "Submit feedback"}
                  </button>
                </div>
              </>
            )}

            {stage === "done" && (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <p style={{ fontSize: 32, marginBottom: 8 }}>🎉</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E8E8", marginBottom: 6 }}>Thanks for the feedback!</p>
                <p style={{ fontSize: 12.5, color: "#8A8A8A", marginBottom: 16 }}>It genuinely helps us improve BulkUp.</p>
                <button
                  onClick={resetWidget}
                  style={{ padding: "9px 18px", borderRadius: 10, border: "1px solid #262626", background: "#0A0A0A", color: "#E8E8E8", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {stage === "chat" && (
            <div style={{ padding: "12px 14px", borderTop: "1px solid #262626", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  placeholder="Type a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                  style={{
                    flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #333333",
                    background: "#0A0A0A", color: "#E8E8E8", fontSize: 13, outline: "none",
                  }}
                />
                <button
                  onClick={sendMessage}
                  style={{ width: 38, height: 38, borderRadius: 10, border: "none", background: "#39FF14", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
                >
                  <Send size={16} color="#0A0A0A" />
                </button>
              </div>
              <button
                onClick={endChat}
                style={{ background: "none", border: "none", color: "#8A8A8A", fontSize: 12, cursor: "pointer", textDecoration: "underline", alignSelf: "center" }}
              >
                That's all, end chat
              </button>
            </div>
          )}
        </div>
      )}
    </>
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

      <ChadWidget />
    </div>
  );
}
