import React, { useState, useEffect, useMemo } from "react";
import {
  Home, Dumbbell, UtensilsCrossed, Droplets, User, ChevronRight,
  ChevronLeft, Plus, Minus, Flame, Beef, Wheat, Droplet, X, Check,
  ExternalLink, Calendar, TrendingUp, Award, Edit3, Moon
} from "lucide-react";

/* ---------------------------------------------------------
   DATA: workout program (push/pull/legs, 6-day weight-gain split)
--------------------------------------------------------- */
const WORKOUT_PROGRAM = {
  Monday: {
    name: "Push (chest, shoulders, triceps)",
    type: "lift",
    exercises: [
      { name: "Barbell bench press", sets: 4, reps: "6-8", rest: "2-3 min", note: "Heavy compound — drive mass" },
      { name: "Incline dumbbell press", sets: 3, reps: "8-10", rest: "90 sec" },
      { name: "Seated dumbbell shoulder press", sets: 3, reps: "8-10", rest: "90 sec" },
      { name: "Cable lateral raise", sets: 3, reps: "12-15", rest: "60 sec" },
      { name: "Triceps dip (or assisted dip)", sets: 3, reps: "8-12", rest: "60 sec" },
      { name: "Overhead cable triceps extension", sets: 3, reps: "10-12", rest: "60 sec" },
    ],
  },
  Tuesday: {
    name: "Pull (back, biceps)",
    type: "lift",
    exercises: [
      { name: "Deadlift", sets: 4, reps: "5-6", rest: "3 min", note: "Heaviest lift of the week" },
      { name: "Pull-up (or lat pulldown)", sets: 3, reps: "6-10", rest: "2 min" },
      { name: "Barbell row", sets: 3, reps: "8-10", rest: "90 sec" },
      { name: "Seated cable row", sets: 3, reps: "10-12", rest: "90 sec" },
      { name: "Barbell curl", sets: 3, reps: "8-10", rest: "60 sec" },
      { name: "Hammer curl", sets: 3, reps: "10-12", rest: "60 sec" },
    ],
  },
  Wednesday: {
    name: "Legs (quads, hamstrings, glutes, calves)",
    type: "lift",
    exercises: [
      { name: "Barbell back squat", sets: 4, reps: "6-8", rest: "3 min", note: "Heavy compound — drive mass" },
      { name: "Romanian deadlift", sets: 3, reps: "8-10", rest: "2 min" },
      { name: "Leg press", sets: 3, reps: "10-12", rest: "90 sec" },
      { name: "Walking lunge", sets: 3, reps: "10 per leg", rest: "90 sec" },
      { name: "Leg curl machine", sets: 3, reps: "10-12", rest: "60 sec" },
      { name: "Standing calf raise", sets: 4, reps: "12-15", rest: "60 sec" },
    ],
  },
  Thursday: {
    name: "Rest / light walk",
    type: "rest",
    exercises: [],
  },
  Friday: {
    name: "Push (chest, shoulders, triceps) — volume day",
    type: "lift",
    exercises: [
      { name: "Incline barbell press", sets: 4, reps: "6-8", rest: "2-3 min" },
      { name: "Flat dumbbell press", sets: 3, reps: "8-10", rest: "90 sec" },
      { name: "Machine shoulder press", sets: 3, reps: "10-12", rest: "90 sec" },
      { name: "Cable chest fly", sets: 3, reps: "12-15", rest: "60 sec" },
      { name: "Close-grip bench press", sets: 3, reps: "8-10", rest: "90 sec" },
      { name: "Triceps rope pushdown", sets: 3, reps: "12-15", rest: "60 sec" },
    ],
  },
  Saturday: {
    name: "Pull (back, biceps) — volume day",
    type: "lift",
    exercises: [
      { name: "T-bar row", sets: 4, reps: "8-10", rest: "2 min" },
      { name: "Chin-up (or assisted chin-up)", sets: 3, reps: "6-10", rest: "2 min" },
      { name: "Single-arm dumbbell row", sets: 3, reps: "10-12", rest: "90 sec" },
      { name: "Face pull", sets: 3, reps: "12-15", rest: "60 sec" },
      { name: "Preacher curl", sets: 3, reps: "10-12", rest: "60 sec" },
      { name: "Cable curl", sets: 3, reps: "12-15", rest: "60 sec" },
    ],
  },
  Sunday: {
    name: "Rest day",
    type: "rest",
    exercises: [],
  },
};

/* ---------------------------------------------------------
   DATA: meal plan with recipes (high calorie, balanced macros)
--------------------------------------------------------- */
const MEAL_DATABASE = {
  breakfast: [
    {
      id: "b1",
      name: "Peanut butter banana oats",
      calories: 680, protein: 28, carbs: 92, fat: 22,
      ingredients: [
        "1 cup rolled oats",
        "2 cups whole milk",
        "2 tbsp peanut butter",
        "1 banana, sliced",
        "1 tbsp honey",
        "1 scoop whey protein (optional, stir in after cooking)",
      ],
      steps: [
        "Combine oats and whole milk in a pot over medium heat.",
        "Stir frequently for 5-6 minutes until thickened.",
        "Remove from heat, stir in peanut butter and honey.",
        "Top with sliced banana and protein powder if using.",
      ],
    },
    {
      id: "b2",
      name: "Three-egg veggie scramble with toast and avocado",
      calories: 620, protein: 34, carbs: 48, fat: 30,
      ingredients: [
        "3 whole eggs",
        "1/4 cup shredded cheese",
        "1/2 cup diced bell pepper and onion",
        "2 slices whole grain toast",
        "1/2 avocado",
        "1 tbsp olive oil",
      ],
      steps: [
        "Heat olive oil in a pan, sauté peppers and onion 3 minutes.",
        "Whisk eggs, pour into pan, scramble until just set.",
        "Stir in cheese off heat.",
        "Toast bread, top with mashed avocado.",
        "Serve scramble alongside toast.",
      ],
    },
    {
      id: "b3",
      name: "Greek yogurt mass bowl",
      calories: 590, protein: 38, carbs: 70, fat: 16,
      ingredients: [
        "1.5 cups full-fat Greek yogurt",
        "1/3 cup granola",
        "1 tbsp honey",
        "1/4 cup mixed berries",
        "2 tbsp chopped walnuts",
      ],
      steps: [
        "Spoon yogurt into a bowl.",
        "Layer granola, berries, and walnuts on top.",
        "Drizzle with honey and serve.",
      ],
    },
  ],
  lunch: [
    {
      id: "l1",
      name: "Chicken, rice, and broccoli bowl",
      calories: 780, protein: 52, carbs: 88, fat: 18,
      ingredients: [
        "8 oz chicken breast",
        "1.5 cups cooked white rice",
        "1 cup steamed broccoli",
        "1 tbsp olive oil",
        "Salt, pepper, garlic powder to taste",
        "1 tbsp soy sauce",
      ],
      steps: [
        "Season chicken with salt, pepper, garlic powder.",
        "Pan-sear chicken in olive oil 6-7 min per side until cooked through.",
        "Steam broccoli for 5 minutes.",
        "Slice chicken, serve over rice with broccoli, drizzle soy sauce.",
      ],
    },
    {
      id: "l2",
      name: "Beef and bean burrito bowl",
      calories: 820, protein: 48, carbs: 84, fat: 28,
      ingredients: [
        "6 oz ground beef (85/15)",
        "1 cup cooked rice",
        "1/2 cup black beans",
        "1/4 cup shredded cheese",
        "2 tbsp sour cream",
        "Salsa to taste",
      ],
      steps: [
        "Brown ground beef in a pan, season with cumin, chili powder, salt.",
        "Warm beans separately.",
        "Layer rice, beans, beef in a bowl.",
        "Top with cheese, sour cream, and salsa.",
      ],
    },
    {
      id: "l3",
      name: "Turkey avocado club wrap with sweet potato fries",
      calories: 740, protein: 44, carbs: 76, fat: 26,
      ingredients: [
        "Large tortilla wrap",
        "6 oz sliced turkey breast",
        "1/2 avocado",
        "2 slices bacon",
        "Lettuce, tomato",
        "1 medium sweet potato, cut into fries",
        "1 tbsp olive oil",
      ],
      steps: [
        "Toss sweet potato fries in olive oil, bake at 425°F for 25 minutes, flipping halfway.",
        "Cook bacon until crisp.",
        "Layer turkey, avocado, bacon, lettuce, tomato on tortilla.",
        "Roll tightly and slice in half. Serve with fries.",
      ],
    },
  ],
  dinner: [
    {
      id: "d1",
      name: "Salmon, mashed potatoes, and green beans",
      calories: 760, protein: 46, carbs: 62, fat: 32,
      ingredients: [
        "8 oz salmon fillet",
        "2 medium potatoes",
        "1/4 cup butter",
        "1/4 cup whole milk",
        "1 cup green beans",
        "1 tbsp olive oil",
      ],
      steps: [
        "Boil potatoes until fork-tender, about 15 minutes. Mash with butter and milk.",
        "Season salmon, pan-sear or bake at 400°F for 12-15 minutes.",
        "Steam green beans 5 minutes.",
        "Plate salmon with mashed potatoes and green beans.",
      ],
    },
    {
      id: "d2",
      name: "Steak, baked potato, and roasted vegetables",
      calories: 880, protein: 58, carbs: 64, fat: 38,
      ingredients: [
        "10 oz sirloin steak",
        "1 large baked potato",
        "2 tbsp butter",
        "1.5 cups mixed roasted vegetables",
        "1 tbsp olive oil",
        "Salt, pepper, garlic to taste",
      ],
      steps: [
        "Bake potato at 425°F for 45-50 minutes.",
        "Toss vegetables in olive oil, roast alongside potato for last 25 minutes.",
        "Season steak generously, sear in a hot pan 4-5 min per side for medium.",
        "Rest steak 5 minutes, top potato with butter, plate together.",
      ],
    },
    {
      id: "d3",
      name: "Pasta with ground turkey meat sauce",
      calories: 810, protein: 50, carbs: 96, fat: 22,
      ingredients: [
        "3 oz dry pasta (about 1.5 cups cooked)",
        "6 oz ground turkey",
        "1 cup marinara sauce",
        "1/4 cup parmesan cheese",
        "1 tbsp olive oil",
        "Garlic, onion, Italian herbs to taste",
      ],
      steps: [
        "Cook pasta according to package directions.",
        "Brown turkey in olive oil with garlic and onion.",
        "Stir in marinara, simmer 10 minutes.",
        "Toss with pasta, top with parmesan.",
      ],
    },
  ],
  snacks: [
    { id: "s1", name: "Trail mix handful", calories: 280, protein: 8, carbs: 24, fat: 18, ingredients: ["1/3 cup almonds", "1/4 cup raisins", "2 tbsp dark chocolate chips"], steps: ["Mix all ingredients in a bowl or bag."] },
    { id: "s2", name: "Protein shake with peanut butter", calories: 420, protein: 36, carbs: 32, fat: 16, ingredients: ["1 scoop whey protein", "1 cup whole milk", "1 tbsp peanut butter", "1 banana"], steps: ["Blend all ingredients until smooth."] },
    { id: "s3", name: "Cottage cheese with pineapple", calories: 260, protein: 24, carbs: 28, fat: 6, ingredients: ["1 cup full-fat cottage cheese", "1/2 cup pineapple chunks"], steps: ["Combine in a bowl and serve."] },
    { id: "s4", name: "Bagel with cream cheese", calories: 380, protein: 12, carbs: 56, fat: 12, ingredients: ["1 plain bagel", "2 tbsp cream cheese"], steps: ["Toast bagel, spread cream cheese."] },
    { id: "s5", name: "Mixed nuts and dried fruit", calories: 320, protein: 9, carbs: 26, fat: 22, ingredients: ["1/3 cup mixed nuts", "1/4 cup dried apricots"], steps: ["Combine and portion into a container."] },
  ],
};

/* ---------------------------------------------------------
   DATA: common foods reference (offline lookup for custom logging)
   Macros are per typical serving listed — approximate values for
   whole foods and well-known items, used to auto-fill the custom
   meal logger. Not a live database; covers common staples only.
--------------------------------------------------------- */
const COMMON_FOODS = [
  { name: "Chicken breast (6 oz, cooked)", calories: 280, protein: 53, carbs: 0, fat: 6 },
  { name: "Steak, sirloin (8 oz, cooked)", calories: 490, protein: 62, carbs: 0, fat: 24 },
  { name: "Ground beef 85/15 (6 oz, cooked)", calories: 470, protein: 42, carbs: 0, fat: 32 },
  { name: "Salmon (6 oz, cooked)", calories: 350, protein: 39, carbs: 0, fat: 21 },
  { name: "Pork chop (6 oz, cooked)", calories: 380, protein: 48, carbs: 0, fat: 19 },
  { name: "Turkey breast (6 oz, cooked)", calories: 260, protein: 50, carbs: 0, fat: 5 },
  { name: "Bacon (3 slices)", calories: 130, protein: 9, carbs: 0, fat: 10 },
  { name: "Eggs, whole (2 large)", calories: 140, protein: 12, carbs: 1, fat: 10 },
  { name: "Egg whites (1 cup)", calories: 130, protein: 27, carbs: 2, fat: 0 },
  { name: "White rice, cooked (1 cup)", calories: 205, protein: 4, carbs: 45, fat: 0 },
  { name: "Brown rice, cooked (1 cup)", calories: 215, protein: 5, carbs: 45, fat: 2 },
  { name: "Pasta, cooked (1 cup)", calories: 220, protein: 8, carbs: 43, fat: 1 },
  { name: "Bread, white (2 slices)", calories: 160, protein: 6, carbs: 30, fat: 2 },
  { name: "Bagel, plain (1 whole)", calories: 290, protein: 11, carbs: 56, fat: 2 },
  { name: "Oats, dry (1 cup)", calories: 300, protein: 10, carbs: 54, fat: 5 },
  { name: "Potato, baked (1 medium)", calories: 160, protein: 4, carbs: 37, fat: 0 },
  { name: "Sweet potato, baked (1 medium)", calories: 115, protein: 2, carbs: 27, fat: 0 },
  { name: "Avocado (1 whole)", calories: 240, protein: 3, carbs: 13, fat: 22 },
  { name: "Banana (1 medium)", calories: 105, protein: 1, carbs: 27, fat: 0 },
  { name: "Apple (1 medium)", calories: 95, protein: 0, carbs: 25, fat: 0 },
  { name: "Peanut butter (2 tbsp)", calories: 190, protein: 7, carbs: 7, fat: 16 },
  { name: "Almonds (1/4 cup)", calories: 205, protein: 7, carbs: 8, fat: 18 },
  { name: "Greek yogurt, full-fat (1 cup)", calories: 220, protein: 20, carbs: 9, fat: 11 },
  { name: "Cottage cheese, full-fat (1 cup)", calories: 220, protein: 25, carbs: 8, fat: 10 },
  { name: "Milk, whole (1 cup)", calories: 150, protein: 8, carbs: 12, fat: 8 },
  { name: "Cheddar cheese (1 oz)", calories: 115, protein: 7, carbs: 0, fat: 9 },
  { name: "Whey protein (1 scoop)", calories: 120, protein: 24, carbs: 3, fat: 1 },
  { name: "Broccoli, steamed (1 cup)", calories: 55, protein: 4, carbs: 11, fat: 0 },
  { name: "Mixed vegetables, cooked (1 cup)", calories: 80, protein: 3, carbs: 17, fat: 0 },
  { name: "Black beans, cooked (1 cup)", calories: 225, protein: 15, carbs: 41, fat: 1 },
  { name: "Tortilla, flour (1 large)", calories: 210, protein: 6, carbs: 35, fat: 6 },
  { name: "McDonald's Big Mac", calories: 550, protein: 25, carbs: 45, fat: 30 },
  { name: "McDonald's medium fries", calories: 320, protein: 4, carbs: 43, fat: 15 },
  { name: "Chipotle chicken bowl (typical build)", calories: 685, protein: 45, carbs: 70, fat: 24 },
  { name: "Chick-fil-A chicken sandwich", calories: 440, protein: 28, carbs: 41, fat: 19 },
  { name: "Subway 6-inch turkey sub", calories: 280, protein: 18, carbs: 46, fat: 4 },
  { name: "Domino's pepperoni slice (1 slice, large)", calories: 300, protein: 12, carbs: 33, fat: 13 },
  { name: "Starbucks venti caffe latte (whole milk)", calories: 250, protein: 14, carbs: 20, fat: 13 },
  { name: "Protein bar (typical, 1 bar)", calories: 220, protein: 20, carbs: 23, fat: 8 },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/* ---------------------------------------------------------
   Helpers
--------------------------------------------------------- */
function calcBMR(weightLbs, heightIn, age, sex) {
  const kg = weightLbs * 0.453592;
  const cm = heightIn * 2.54;
  const base = 10 * kg + 6.25 * cm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

function calcSuggestedGoalWeight(heightIn) {
  // Targets the middle of the healthy BMI range (18.5–25), landing around BMI 22.
  // This gives a sensible, evidence-based default without requiring the user to know their own target.
  const heightM = heightIn * 0.0254;
  const targetBMI = 22;
  const kg = targetBMI * heightM * heightM;
  const lbs = kg / 0.453592;
  return Math.round(lbs);
}

function calcTargets(profile) {
  const bmr = calcBMR(profile.weight, profile.height, profile.age, profile.sex);
  const activityMultiplier = 1.55; // moderately active w/ lifting
  const tdee = bmr * activityMultiplier;
  const surplus = profile.goalPace === "aggressive" ? 500 : profile.goalPace === "moderate" ? 350 : 200;
  const targetCalories = Math.round(tdee + surplus);
  const proteinTarget = Math.round(profile.weight * 1); // 1g per lb bodyweight
  const fatTarget = Math.round((targetCalories * 0.25) / 9);
  const carbsTarget = Math.round((targetCalories - proteinTarget * 4 - fatTarget * 9) / 4);
  return { targetCalories, proteinTarget, carbsTarget, fatTarget, tdee: Math.round(tdee) };
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadState() {
  try {
    const raw = localStorage.getItem("bulkup-state-v1");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(state) {
  try {
    localStorage.setItem("bulkup-state-v1", JSON.stringify(state));
  } catch {}
}

function youtubeSearchUrl(exerciseName) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(exerciseName + " proper form tutorial")}`;
}

/* ---------------------------------------------------------
   Onboarding
--------------------------------------------------------- */
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", age: "", sex: "male", height: "", weight: "", goalWeight: "", goalWeightMode: null, goalPace: "moderate",
  });

  const steps = [
    { key: "name", label: "What's your name?", type: "text", placeholder: "Your name" },
    { key: "age", label: "How old are you?", type: "number", placeholder: "Age in years" },
    { key: "sex", label: "Sex (used for calorie calculation)", type: "select", options: [["male", "Male"], ["female", "Female"]] },
    { key: "height", label: "Height (inches)", type: "number", placeholder: 'e.g. 70 for 5\'10"' },
    { key: "weight", label: "Current weight (lbs)", type: "number", placeholder: "Current weight" },
    { key: "goalWeight", label: "Your goal weight", type: "goalWeight" },
    { key: "goalPace", label: "How fast do you want to gain?", type: "select", options: [["lean", "Slow & lean (~0.25 lb/week)"], ["moderate", "Moderate (~0.5 lb/week)"], ["aggressive", "Faster gain (~1 lb/week)"]] },
  ];

  const current = steps[step];

  // The moment the user picks "calculated", fill in the suggested number based on height.
  useEffect(() => {
    if (current.key === "goalWeight" && form.goalWeightMode === "calculated" && form.height) {
      const suggested = calcSuggestedGoalWeight(Number(form.height));
      setForm((f) => ({ ...f, goalWeight: String(suggested) }));
    }
  }, [form.goalWeightMode]);

  const canProceed =
    current.key === "goalWeight"
      ? form.goalWeightMode === "calculated" || (form.goalWeightMode === "custom" && form.goalWeight !== "")
      : form[current.key] !== "" && form[current.key] !== null;

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      const profile = {
        ...form,
        age: Number(form.age),
        height: Number(form.height),
        weight: Number(form.weight),
        goalWeight: Number(form.goalWeight),
        startWeight: Number(form.weight),
        createdAt: todayKey(),
        weightHistory: [{ date: todayKey(), weight: Number(form.weight) }],
      };
      onComplete(profile);
    }
  }

  return (
    <div style={{ minHeight: "520px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "2rem 1.5rem", maxWidth: "440px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: "2rem" }}>
        {steps.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? "#39FF14" : "#262626" }} />
        ))}
      </div>
      <p style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 6, fontWeight: 500, letterSpacing: "0.02em" }}>
        STEP {step + 1} OF {steps.length}
      </p>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#E8E8E8", marginBottom: "1.5rem", lineHeight: 1.3 }}>
        {current.label}
      </h2>

      {current.type === "select" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "2rem" }}>
          {current.options.map(([val, label]) => (
            <button
              key={val}
              onClick={() => setForm({ ...form, [current.key]: val })}
              style={{
                padding: "14px 16px",
                borderRadius: 12,
                border: form[current.key] === val ? "2px solid #39FF14" : "1px solid #333333",
                background: form[current.key] === val ? "#0F1F0A" : "#141414",
                textAlign: "left",
                fontSize: 15,
                fontWeight: 500,
                color: "#E8E8E8",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      ) : current.type === "goalWeight" ? (
        <div style={{ marginBottom: "2rem" }}>
          {form.goalWeightMode === null && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={() => setForm({ ...form, goalWeightMode: "calculated" })}
                style={{
                  padding: "16px", borderRadius: 12, border: "1px solid #2A4A1F", background: "#0F1F0A",
                  textAlign: "left", cursor: "pointer",
                }}
              >
                <p style={{ fontSize: 15, fontWeight: 600, color: "#39FF14", margin: "0 0 4px" }}>Calculate it for me</p>
                <p style={{ fontSize: 13, color: "#8A8A8A", margin: 0, lineHeight: 1.4 }}>
                  We'll suggest a healthy goal weight based on your height
                </p>
              </button>
              <button
                onClick={() => setForm({ ...form, goalWeightMode: "custom", goalWeight: "" })}
                style={{
                  padding: "16px", borderRadius: 12, border: "1px solid #333333", background: "#141414",
                  textAlign: "left", cursor: "pointer",
                }}
              >
                <p style={{ fontSize: 15, fontWeight: 600, color: "#E8E8E8", margin: "0 0 4px" }}>I'll set my own target</p>
                <p style={{ fontSize: 13, color: "#8A8A8A", margin: 0, lineHeight: 1.4 }}>
                  Enter a specific number you're aiming for
                </p>
              </button>
            </div>
          )}

          {form.goalWeightMode === "calculated" && (
            <div>
              <div style={{ background: "#0F1F0A", border: "1px solid #2A4A1F", borderRadius: 14, padding: "1.25rem", marginBottom: 14, textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "#39FF14", fontWeight: 600, marginBottom: 8, letterSpacing: "0.02em" }}>
                  YOUR SUGGESTED GOAL
                </p>
                <p style={{ fontSize: 36, fontWeight: 700, color: "#E8E8E8", margin: "0 0 6px" }}>
                  {form.goalWeight} lb
                </p>
                <p style={{ fontSize: 13, color: "#8A8A8A", lineHeight: 1.5, margin: 0 }}>
                  Based on a healthy weight range for your height
                </p>
              </div>
              <button
                onClick={() => setForm({ ...form, goalWeightMode: null, goalWeight: "" })}
                style={{ width: "100%", padding: "10px", borderRadius: 10, border: "none", background: "none", color: "#8A8A8A", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}
              >
                Pick a different option
              </button>
            </div>
          )}

          {form.goalWeightMode === "custom" && (
            <div>
              <input
                autoFocus
                type="number"
                placeholder="Goal weight (lbs)"
                value={form.goalWeight}
                onChange={(e) => setForm({ ...form, goalWeight: e.target.value })}
                onKeyDown={(e) => { if (e.key === "Enter" && canProceed) next(); }}
                style={{
                  width: "100%", padding: "14px 16px", fontSize: 17, borderRadius: 12,
                  border: "1px solid #333333", outline: "none", background: "#141414", color: "#E8E8E8",
                  boxSizing: "border-box", marginBottom: 12,
                }}
              />
              <button
                onClick={() => setForm({ ...form, goalWeightMode: null, goalWeight: "" })}
                style={{ width: "100%", padding: "10px", borderRadius: 10, border: "none", background: "none", color: "#8A8A8A", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}
              >
                Pick a different option
              </button>
            </div>
          )}
        </div>
      ) : (
        <input
          autoFocus
          type={current.type}
          placeholder={current.placeholder}
          value={form[current.key]}
          onChange={(e) => setForm({ ...form, [current.key]: e.target.value })}
          onKeyDown={(e) => { if (e.key === "Enter" && canProceed) next(); }}
          style={{
            padding: "14px 16px",
            fontSize: 17,
            borderRadius: 12,
            border: "1px solid #333333",
            marginBottom: "2rem",
            outline: "none",
            background: "#141414",
            color: "#E8E8E8",
          }}
        />
      )}

      <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{ padding: "12px 18px", borderRadius: 12, border: "1px solid #333333", background: "#141414", color: "#8A8A8A", fontWeight: 500, cursor: "pointer" }}
          >
            <ChevronLeft size={18} />
          </button>
        )}
        <button
          onClick={next}
          disabled={!canProceed}
          style={{
            flex: 1, padding: "14px 18px", borderRadius: 12, border: "none",
            background: canProceed ? "#39FF14" : "#262626",
            color: canProceed ? "#0A0A0A" : "#666666",
            fontWeight: 600, fontSize: 16, cursor: canProceed ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          {step === steps.length - 1 ? "Build my plan" : "Continue"}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Stacking progress bar (signature visual element)
--------------------------------------------------------- */
function StackBar({ value, max, color, height = 14 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ width: "100%", height, borderRadius: height / 2, background: "#262626", overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: height / 2, transition: "width 0.4s ease" }} />
    </div>
  );
}

/* ---------------------------------------------------------
   Dashboard / Home
--------------------------------------------------------- */
function Dashboard({ state, setState, targets, setTab }) {
  const day = DAYS[(new Date().getDay() + 6) % 7];
  const workout = WORKOUT_PROGRAM[day];
  const today = state.daily[todayKey()] || { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0, completedExercises: [] };

  const weightChange = (state.profile.weight - state.profile.startWeight).toFixed(1);

  return (
    <div style={{ padding: "1.25rem 1.25rem 6rem" }}>
      <p style={{ fontSize: 14, color: "#8A8A8A", marginBottom: 2 }}>
        {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
      </p>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#E8E8E8", marginBottom: "1.25rem" }}>
        Hey {state.profile.name}, let's build
      </h1>

      {/* Calorie ring card */}
      <div style={{ background: "#141414", border: "1px solid #2A4A1F", borderRadius: 20, padding: "1.5rem", marginBottom: "1rem", color: "#E8E8E8" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: "#8A8A8A", fontWeight: 500 }}>CALORIES TODAY</span>
          <span style={{ fontSize: 13, color: "#8A8A8A" }}>goal {targets.targetCalories}</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 38, fontWeight: 700, color: "#39FF14" }}>{today.calories}</span>
          <span style={{ fontSize: 16, color: "#8A8A8A" }}>/ {targets.targetCalories} kcal</span>
        </div>
        <StackBar value={today.calories} max={targets.targetCalories} color="#39FF14" height={10} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, gap: 10 }}>
          <MacroChip label="Protein" value={today.protein} target={targets.proteinTarget} color="#FF4D4D" />
          <MacroChip label="Carbs" value={today.carbs} target={targets.carbsTarget} color="#39FF14" />
          <MacroChip label="Fat" value={today.fat} target={targets.fatTarget} color="#39C5FF" />
        </div>
      </div>

      {/* Quick stats row */}
      <div style={{ display: "flex", gap: 10, marginBottom: "1rem" }}>
        <StatCard icon={<TrendingUp size={18} />} label="Weight change" value={`${weightChange > 0 ? "+" : ""}${weightChange} lb`} />
        <StatCard icon={<Droplet size={18} />} label="Water" value={`${today.water}/${state.profile.waterGoal || 10} cups`} />
      </div>

      {/* Today's workout */}
      <SectionCard
        title="Today's workout"
        onClick={() => setTab("gym")}
        icon={<Dumbbell size={18} color="#39FF14" />}
      >
        <p style={{ fontWeight: 600, fontSize: 15, color: "#E8E8E8", marginBottom: 4 }}>{workout.name}</p>
        <p style={{ fontSize: 13, color: "#8A8A8A" }}>
          {workout.type === "rest" ? "Recovery day — no lifting" : `${workout.exercises.length} exercises`}
        </p>
      </SectionCard>

      {/* Today's meals quick link */}
      <SectionCard
        title="Today's meal plan"
        onClick={() => setTab("meals")}
        icon={<UtensilsCrossed size={18} color="#39FF14" />}
      >
        <p style={{ fontSize: 13, color: "#8A8A8A" }}>Breakfast, lunch, dinner, and snacks lined up to hit {targets.targetCalories} kcal</p>
      </SectionCard>

      {/* Recovery quick link */}
      <SectionCard title="Recovery" onClick={() => setTab("recovery")} icon={<Moon size={18} color="#39FF14" />}>
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          {Array.from({ length: state.profile.waterGoal || 10 }).map((_, i) => (
            <div key={i} style={{ width: 16, height: 22, borderRadius: 4, background: i < today.water ? "#39C5FF" : "#262626" }} />
          ))}
        </div>
        {today.sleep && (
          <p style={{ fontSize: 12, color: "#8A8A8A", marginTop: 8, marginBottom: 0 }}>
            Last night: {today.sleep.hours.toFixed(1)}h sleep
          </p>
        )}
      </SectionCard>
    </div>
  );
}

function MacroChip({ label, value, target, color }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "#8A8A8A" }}>{label}</span>
        <span style={{ fontSize: 11, color: "#8A8A8A" }}>{value}/{target}g</span>
      </div>
      <StackBar value={value} max={target} color={color} height={6} />
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div style={{ flex: 1, background: "#141414", border: "1px solid #262626", borderRadius: 16, padding: "1rem" }}>
      <div style={{ color: "#39FF14", marginBottom: 6 }}>{icon}</div>
      <p style={{ fontSize: 12, color: "#8A8A8A", marginBottom: 2 }}>{label}</p>
      <p style={{ fontSize: 17, fontWeight: 700, color: "#E8E8E8" }}>{value}</p>
    </div>
  );
}

function SectionCard({ title, icon, children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", textAlign: "left", background: "#141414", border: "1px solid #262626",
        borderRadius: 16, padding: "1.1rem", marginBottom: "0.85rem", cursor: "pointer", display: "block",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {icon}
          <span style={{ fontWeight: 600, fontSize: 15, color: "#E8E8E8" }}>{title}</span>
        </div>
        <ChevronRight size={16} color="#8A8A8A" />
      </div>
      {children}
    </button>
  );
}

/* ---------------------------------------------------------
   Gym schedule tab
--------------------------------------------------------- */
function GymTab({ state, setState }) {
  const todayIdx = (new Date().getDay() + 6) % 7;
  const [selectedDay, setSelectedDay] = useState(DAYS[todayIdx]);
  const workout = WORKOUT_PROGRAM[selectedDay];
  const dateKey = todayKey();
  const today = state.daily[dateKey] || { completedExercises: [] };

  function toggleExercise(exerciseName) {
    const key = `${selectedDay}:${exerciseName}`;
    const completed = today.completedExercises || [];
    const updated = completed.includes(key) ? completed.filter((x) => x !== key) : [...completed, key];
    setState({
      ...state,
      daily: {
        ...state.daily,
        [dateKey]: { ...emptyDay(state), ...today, completedExercises: updated },
      },
    });
  }

  return (
    <div style={{ padding: "1.25rem 1.25rem 6rem" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#E8E8E8", marginBottom: "1rem" }}>Weekly schedule</h1>

      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: "1.25rem", paddingBottom: 4 }}>
        {DAYS.map((d, i) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            style={{
              flex: "0 0 auto", padding: "8px 14px", borderRadius: 12, fontSize: 13, fontWeight: 600,
              border: i === todayIdx ? "2px solid #39FF14" : "1px solid #262626",
              background: selectedDay === d ? "#39FF14" : "#141414",
              color: selectedDay === d ? "#0A0A0A" : "#E8E8E8",
              cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            {d.slice(0, 3)}
          </button>
        ))}
      </div>

      <div style={{ background: workout.type === "rest" ? "#141414" : "#0F1F0A", border: workout.type === "rest" ? "1px solid #262626" : "1px solid #2A4A1F", color: "#E8E8E8", borderRadius: 18, padding: "1.25rem", marginBottom: "1.25rem" }}>
        <p style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>{selectedDay.toUpperCase()}</p>
        <p style={{ fontSize: 19, fontWeight: 700, color: workout.type === "rest" ? "#E8E8E8" : "#39FF14" }}>{workout.name}</p>
      </div>

      {workout.type === "rest" ? (
        <p style={{ color: "#8A8A8A", fontSize: 14, lineHeight: 1.6 }}>
          Recovery matters as much as lifting when you're building mass — this is where muscle actually repairs and grows. A light 20-30 minute walk is fine, but skip the gym today.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {workout.exercises.map((ex) => {
            const key = `${selectedDay}:${ex.name}`;
            const done = (today.completedExercises || []).includes(key);
            return (
              <div key={ex.name} style={{ background: "#141414", border: "1px solid #262626", borderRadius: 16, padding: "1rem", opacity: done ? 0.6 : 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <button
                    onClick={() => toggleExercise(ex.name)}
                    style={{
                      width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                      border: done ? "none" : "2px solid #333333", background: done ? "#39FF14" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    }}
                  >
                    {done && <Check size={15} color="#0A0A0A" />}
                  </button>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 15, color: "#E8E8E8", marginBottom: 4, textDecoration: done ? "line-through" : "none" }}>
                      {ex.name}
                    </p>
                    <p style={{ fontSize: 13, color: "#8A8A8A", marginBottom: ex.note ? 4 : 0 }}>
                      {ex.sets} sets × {ex.reps} reps · rest {ex.rest}
                    </p>
                    {ex.note && <p style={{ fontSize: 12, color: "#39FF14", fontStyle: "italic" }}>{ex.note}</p>}
                  </div>
                  <a
                    href={youtubeSearchUrl(ex.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flexShrink: 0, display: "flex", alignItems: "center", gap: 4, fontSize: 12,
                      color: "#FF4D4D", textDecoration: "none", fontWeight: 600, padding: "6px 10px",
                      border: "1px solid #3A1F1F", borderRadius: 10, marginTop: 2,
                    }}
                  >
                    <ExternalLink size={12} /> Form
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Meals tab
--------------------------------------------------------- */
function emptyDay(state) {
  return { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0, completedExercises: [], loggedMeals: [], customMeals: [], sleep: null };
}

function MealsTab({ state, setState, targets }) {
  const [activeCategory, setActiveCategory] = useState("breakfast");
  const [recipeModal, setRecipeModal] = useState(null);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const dateKey = todayKey();
  const today = state.daily[dateKey] || emptyDay(state);
  const loggedIds = today.loggedMeals || [];
  const customMeals = today.customMeals || [];

  function logMeal(meal) {
    const isLogged = loggedIds.includes(meal.id);
    const updatedDay = { ...emptyDay(state), ...today };
    if (isLogged) {
      updatedDay.loggedMeals = loggedIds.filter((id) => id !== meal.id);
      updatedDay.calories -= meal.calories;
      updatedDay.protein -= meal.protein;
      updatedDay.carbs -= meal.carbs;
      updatedDay.fat -= meal.fat;
    } else {
      updatedDay.loggedMeals = [...loggedIds, meal.id];
      updatedDay.calories += meal.calories;
      updatedDay.protein += meal.protein;
      updatedDay.carbs += meal.carbs;
      updatedDay.fat += meal.fat;
    }
    setState({ ...state, daily: { ...state.daily, [dateKey]: updatedDay } });
  }

  function addCustomMeal(entry) {
    const updatedDay = { ...emptyDay(state), ...today };
    const newEntry = { ...entry, id: `custom-${Date.now()}` };
    updatedDay.customMeals = [...customMeals, newEntry];
    updatedDay.calories += entry.calories;
    updatedDay.protein += entry.protein;
    updatedDay.carbs += entry.carbs;
    updatedDay.fat += entry.fat;
    setState({ ...state, daily: { ...state.daily, [dateKey]: updatedDay } });
    setCustomModalOpen(false);
  }

  function removeCustomMeal(id) {
    const entry = customMeals.find((m) => m.id === id);
    if (!entry) return;
    const updatedDay = { ...emptyDay(state), ...today };
    updatedDay.customMeals = customMeals.filter((m) => m.id !== id);
    updatedDay.calories -= entry.calories;
    updatedDay.protein -= entry.protein;
    updatedDay.carbs -= entry.carbs;
    updatedDay.fat -= entry.fat;
    setState({ ...state, daily: { ...state.daily, [dateKey]: updatedDay } });
  }

  const categories = [
    ["breakfast", "Breakfast"],
    ["lunch", "Lunch"],
    ["dinner", "Dinner"],
    ["snacks", "Snacks"],
  ];

  return (
    <div style={{ padding: "1.25rem 1.25rem 6rem" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#E8E8E8", marginBottom: 4 }}>Meal planner</h1>
      <p style={{ fontSize: 13, color: "#8A8A8A", marginBottom: "1.1rem" }}>
        Daily target: {targets.targetCalories} kcal · {targets.proteinTarget}g protein
      </p>

      <button
        onClick={() => setCustomModalOpen(true)}
        style={{
          width: "100%", padding: "13px 0", borderRadius: 12, border: "1px dashed #39FF14", background: "#0F1F0A",
          color: "#39FF14", fontWeight: 600, fontSize: 14, cursor: "pointer", marginBottom: "1.1rem",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}
      >
        <Plus size={16} /> Log what you actually ate
      </button>

      {customMeals.length > 0 && (
        <div style={{ marginBottom: "1.1rem" }}>
          <p style={{ fontSize: 12, color: "#8A8A8A", fontWeight: 600, marginBottom: 8, letterSpacing: "0.02em" }}>LOGGED TODAY</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {customMeals.map((m) => (
              <div key={m.id} style={{ background: "#141414", border: "1px solid #262626", borderRadius: 14, padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: "#E8E8E8", marginBottom: 2 }}>{m.name}</p>
                  <p style={{ fontSize: 12, color: "#8A8A8A" }}>{m.calories} kcal · P{m.protein} C{m.carbs} F{m.fat}</p>
                </div>
                <button onClick={() => removeCustomMeal(m.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8A8A", padding: 4 }}>
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <p style={{ fontSize: 12, color: "#8A8A8A", fontWeight: 600, marginBottom: 8, letterSpacing: "0.02em" }}>OUR SUGGESTIONS</p>

      <div style={{ display: "flex", gap: 6, marginBottom: "1.25rem" }}>
        {categories.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            style={{
              flex: 1, padding: "9px 4px", borderRadius: 12, fontSize: 13, fontWeight: 600,
              border: "1px solid #262626",
              background: activeCategory === key ? "#39FF14" : "#141414",
              color: activeCategory === key ? "#0A0A0A" : "#E8E8E8",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MEAL_DATABASE[activeCategory].map((meal) => {
          const logged = loggedIds.includes(meal.id);
          return (
            <div key={meal.id} style={{ background: "#141414", border: "1px solid #262626", borderRadius: 16, padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 15, color: "#E8E8E8", marginBottom: 4 }}>{meal.name}</p>
                  <p style={{ fontSize: 12, color: "#8A8A8A" }}>
                    {meal.calories} kcal · P{meal.protein} C{meal.carbs} F{meal.fat}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setRecipeModal(meal)}
                  style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: "1px solid #262626", background: "#0A0A0A", color: "#E8E8E8", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                >
                  Recipe
                </button>
                <button
                  onClick={() => logMeal(meal)}
                  style={{
                    flex: 1, padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer",
                    background: "#39FF14", color: "#0A0A0A", fontSize: 13, fontWeight: 600,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                    opacity: logged ? 0.6 : 1,
                  }}
                >
                  {logged ? <><Check size={14} /> Logged</> : "Log meal"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {recipeModal && (
        <RecipeModal meal={recipeModal} onClose={() => setRecipeModal(null)} />
      )}

      {customModalOpen && (
        <CustomMealModal onClose={() => setCustomModalOpen(false)} onSave={addCustomMeal} />
      )}
    </div>
  );
}

function RecipeModal({ meal, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 50 }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#141414", border: "1px solid #262626", borderRadius: "24px 24px 0 0", padding: "1.5rem", maxWidth: 480, width: "100%", maxHeight: "80vh", overflowY: "auto" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <h2 style={{ fontSize: 19, fontWeight: 700, color: "#E8E8E8" }}>{meal.name}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8A8A" }}>
            <X size={22} />
          </button>
        </div>
        <p style={{ fontSize: 13, color: "#39FF14", marginBottom: "1.25rem" }}>
          {meal.calories} kcal · {meal.protein}g protein · {meal.carbs}g carbs · {meal.fat}g fat
        </p>

        <p style={{ fontSize: 13, fontWeight: 700, color: "#E8E8E8", marginBottom: 8, letterSpacing: "0.02em" }}>INGREDIENTS</p>
        <ul style={{ marginBottom: "1.25rem", paddingLeft: 18 }}>
          {meal.ingredients.map((ing, i) => (
            <li key={i} style={{ fontSize: 14, color: "#A8A8A8", marginBottom: 5, lineHeight: 1.5 }}>{ing}</li>
          ))}
        </ul>

        <p style={{ fontSize: 13, fontWeight: 700, color: "#E8E8E8", marginBottom: 8, letterSpacing: "0.02em" }}>STEPS</p>
        <ol style={{ paddingLeft: 18 }}>
          {meal.steps.map((step, i) => (
            <li key={i} style={{ fontSize: 14, color: "#A8A8A8", marginBottom: 8, lineHeight: 1.5 }}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function CustomMealModal({ onClose, onSave }) {
  const [mode, setMode] = useState("search"); // "search" or "manual"
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [manual, setManual] = useState({ name: "", calories: "", protein: "", carbs: "", fat: "" });

  const matches = query.trim().length > 0
    ? COMMON_FOODS.filter((f) => f.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
    : [];

  function handleSave() {
    if (mode === "search" && selected) {
      onSave({ name: selected.name, calories: selected.calories, protein: selected.protein, carbs: selected.carbs, fat: selected.fat });
    } else if (mode === "manual") {
      onSave({
        name: manual.name || "Custom food",
        calories: Number(manual.calories) || 0,
        protein: Number(manual.protein) || 0,
        carbs: Number(manual.carbs) || 0,
        fat: Number(manual.fat) || 0,
      });
    }
  }

  const canSave = mode === "search" ? !!selected : manual.name.trim() !== "" && manual.calories !== "";

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 50 }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#141414", border: "1px solid #262626", borderRadius: "24px 24px 0 0", padding: "1.5rem", maxWidth: 480, width: "100%", maxHeight: "85vh", overflowY: "auto" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <h2 style={{ fontSize: 19, fontWeight: 700, color: "#E8E8E8" }}>Log what you ate</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8A8A" }}>
            <X size={22} />
          </button>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: "1.25rem" }}>
          <button
            onClick={() => setMode("search")}
            style={{
              flex: 1, padding: "9px 0", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
              border: "1px solid #262626", background: mode === "search" ? "#39FF14" : "#0A0A0A",
              color: mode === "search" ? "#0A0A0A" : "#E8E8E8",
            }}
          >
            Search foods
          </button>
          <button
            onClick={() => setMode("manual")}
            style={{
              flex: 1, padding: "9px 0", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
              border: "1px solid #262626", background: mode === "manual" ? "#39FF14" : "#0A0A0A",
              color: mode === "manual" ? "#0A0A0A" : "#E8E8E8",
            }}
          >
            Enter manually
          </button>
        </div>

        {mode === "search" ? (
          <div>
            <input
              autoFocus
              type="text"
              placeholder="Try 'chicken breast' or 'Big Mac'"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
              style={{
                width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid #333333",
                background: "#0A0A0A", color: "#E8E8E8", fontSize: 15, outline: "none", boxSizing: "border-box", marginBottom: 12,
              }}
            />
            {matches.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                {matches.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => { setSelected(f); setQuery(f.name); }}
                    style={{
                      textAlign: "left", padding: "11px 14px", borderRadius: 12, cursor: "pointer",
                      border: selected?.name === f.name ? "2px solid #39FF14" : "1px solid #262626",
                      background: selected?.name === f.name ? "#0F1F0A" : "#0A0A0A",
                    }}
                  >
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E8E8", margin: "0 0 2px" }}>{f.name}</p>
                    <p style={{ fontSize: 12, color: "#8A8A8A", margin: 0 }}>{f.calories} kcal · P{f.protein} C{f.carbs} F{f.fat}</p>
                  </button>
                ))}
              </div>
            )}
            {query.trim().length > 0 && matches.length === 0 && (
              <p style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 14, lineHeight: 1.5 }}>
                No match in our list yet — try "Enter manually" above to log it with your own numbers.
              </p>
            )}
            {selected && (
              <div style={{ background: "#0F1F0A", border: "1px solid #2A4A1F", borderRadius: 14, padding: "1rem", marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: "#39FF14", fontWeight: 600, marginBottom: 4 }}>SELECTED</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#E8E8E8", margin: "0 0 4px" }}>{selected.name}</p>
                <p style={{ fontSize: 13, color: "#8A8A8A", margin: 0 }}>
                  {selected.calories} kcal · P{selected.protein}g C{selected.carbs}g F{selected.fat}g
                </p>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              type="text"
              placeholder="What did you eat?"
              value={manual.name}
              onChange={(e) => setManual({ ...manual, name: e.target.value })}
              style={{ padding: "13px 14px", borderRadius: 12, border: "1px solid #333333", background: "#0A0A0A", color: "#E8E8E8", fontSize: 15, outline: "none" }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input
                type="number"
                placeholder="Calories"
                value={manual.calories}
                onChange={(e) => setManual({ ...manual, calories: e.target.value })}
                style={{ padding: "13px 14px", borderRadius: 12, border: "1px solid #333333", background: "#0A0A0A", color: "#E8E8E8", fontSize: 15, outline: "none" }}
              />
              <input
                type="number"
                placeholder="Protein (g)"
                value={manual.protein}
                onChange={(e) => setManual({ ...manual, protein: e.target.value })}
                style={{ padding: "13px 14px", borderRadius: 12, border: "1px solid #333333", background: "#0A0A0A", color: "#E8E8E8", fontSize: 15, outline: "none" }}
              />
              <input
                type="number"
                placeholder="Carbs (g)"
                value={manual.carbs}
                onChange={(e) => setManual({ ...manual, carbs: e.target.value })}
                style={{ padding: "13px 14px", borderRadius: 12, border: "1px solid #333333", background: "#0A0A0A", color: "#E8E8E8", fontSize: 15, outline: "none" }}
              />
              <input
                type="number"
                placeholder="Fat (g)"
                value={manual.fat}
                onChange={(e) => setManual({ ...manual, fat: e.target.value })}
                style={{ padding: "13px 14px", borderRadius: 12, border: "1px solid #333333", background: "#0A0A0A", color: "#E8E8E8", fontSize: 15, outline: "none" }}
              />
            </div>
            <p style={{ fontSize: 12, color: "#666666", margin: 0, lineHeight: 1.4 }}>
              Don't know the exact macros? A best guess is fine — calories and protein matter most.
            </p>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={!canSave}
          style={{
            width: "100%", padding: "14px 0", borderRadius: 12, border: "none", marginTop: 16, cursor: canSave ? "pointer" : "not-allowed",
            background: canSave ? "#39FF14" : "#262626", color: canSave ? "#0A0A0A" : "#666666", fontWeight: 700, fontSize: 15,
          }}
        >
          Add to today's log
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Water tab
--------------------------------------------------------- */
function RecoveryTab({ state, setState }) {
  const [section, setSection] = useState("water");
  const dateKey = todayKey();
  const today = state.daily[dateKey] || emptyDay(state);
  const goal = state.profile.waterGoal || 10;

  function adjustWater(delta) {
    const updated = { ...emptyDay(state), ...today, water: Math.max(0, today.water + delta) };
    setState({ ...state, daily: { ...state.daily, [dateKey]: updated } });
  }

  return (
    <div style={{ padding: "1.25rem 1.25rem 6rem" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#E8E8E8", marginBottom: "1rem" }}>Recovery</h1>

      <div style={{ display: "flex", gap: 6, marginBottom: "1.5rem" }}>
        <button
          onClick={() => setSection("water")}
          style={{
            flex: 1, padding: "10px 0", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer",
            border: "1px solid #262626", background: section === "water" ? "#39FF14" : "#141414",
            color: section === "water" ? "#0A0A0A" : "#E8E8E8",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <Droplets size={15} /> Water
        </button>
        <button
          onClick={() => setSection("sleep")}
          style={{
            flex: 1, padding: "10px 0", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer",
            border: "1px solid #262626", background: section === "sleep" ? "#39FF14" : "#141414",
            color: section === "sleep" ? "#0A0A0A" : "#E8E8E8",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <Moon size={15} /> Sleep
        </button>
      </div>

      {section === "water" ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: "#8A8A8A", marginBottom: "1.5rem", alignSelf: "flex-start" }}>
            Staying hydrated supports digestion when you're eating bigger volumes of food.
          </p>

          <div style={{ fontSize: 56, fontWeight: 700, color: "#39C5FF", marginBottom: 4 }}>{today.water}</div>
          <p style={{ fontSize: 14, color: "#8A8A8A", marginBottom: "1.5rem" }}>of {goal} cups today</p>

          <div style={{ display: "flex", gap: 8, marginBottom: "2rem", flexWrap: "wrap", justifyContent: "center", maxWidth: 320 }}>
            {Array.from({ length: goal }).map((_, i) => (
              <Droplet key={i} size={28} fill={i < today.water ? "#39C5FF" : "none"} color={i < today.water ? "#39C5FF" : "#333333"} strokeWidth={1.5} />
            ))}
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            <button
              onClick={() => adjustWater(-1)}
              style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid #262626", background: "#141414", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Minus size={22} color="#E8E8E8" />
            </button>
            <button
              onClick={() => adjustWater(1)}
              style={{ width: 56, height: 56, borderRadius: "50%", border: "none", background: "#39FF14", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Plus size={22} color="#0A0A0A" />
            </button>
          </div>
        </div>
      ) : (
        <SleepSection state={state} setState={setState} today={today} dateKey={dateKey} />
      )}
    </div>
  );
}

function SleepSection({ state, setState, today, dateKey }) {
  const sleep = today.sleep;
  const [bedtime, setBedtime] = useState(sleep?.bedtime || "22:30");
  const [wakeTime, setWakeTime] = useState(sleep?.wakeTime || "06:30");
  const [editing, setEditing] = useState(!sleep);

  const suggestedHours = 8; // standard adult recommendation, 7-9 hour range

  function calcHours(bed, wake) {
    const [bh, bm] = bed.split(":").map(Number);
    const [wh, wm] = wake.split(":").map(Number);
    let bedMinutes = bh * 60 + bm;
    let wakeMinutes = wh * 60 + wm;
    if (wakeMinutes <= bedMinutes) wakeMinutes += 24 * 60; // wrapped past midnight
    return (wakeMinutes - bedMinutes) / 60;
  }

  function saveSleep() {
    const hours = calcHours(bedtime, wakeTime);
    const updatedDay = { ...emptyDay(state), ...today, sleep: { bedtime, wakeTime, hours } };
    setState({ ...state, daily: { ...state.daily, [dateKey]: updatedDay } });
    setEditing(false);
  }

  const displayHours = sleep ? sleep.hours : null;
  const hoursLabel = displayHours !== null ? `${Math.floor(displayHours)}h ${Math.round((displayHours % 1) * 60)}m` : null;
  const metGoal = displayHours !== null && displayHours >= 7;

  return (
    <div>
      <p style={{ fontSize: 13, color: "#8A8A8A", marginBottom: "1.5rem" }}>
        Aim for {suggestedHours} hours a night — recovery and muscle repair both happen mostly during sleep.
      </p>

      {!editing && sleep ? (
        <div>
          <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 18, padding: "1.5rem", marginBottom: 14, textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#8A8A8A", marginBottom: 6, letterSpacing: "0.02em" }}>LAST NIGHT</p>
            <p style={{ fontSize: 40, fontWeight: 700, color: metGoal ? "#39FF14" : "#FF4D4D", margin: "0 0 6px" }}>{hoursLabel}</p>
            <p style={{ fontSize: 13, color: "#8A8A8A", margin: 0 }}>
              {sleep.bedtime} → {sleep.wakeTime}
            </p>
          </div>
          <button
            onClick={() => setEditing(true)}
            style={{ width: "100%", padding: "11px 0", borderRadius: 12, border: "1px solid #262626", background: "#0A0A0A", color: "#E8E8E8", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
          >
            <Edit3 size={14} /> Edit last night's sleep
          </button>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, color: "#8A8A8A", marginBottom: 6 }}>Went to sleep</p>
              <input
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                style={{ width: "100%", padding: "12px 10px", borderRadius: 12, border: "1px solid #333333", background: "#141414", color: "#E8E8E8", fontSize: 15, outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, color: "#8A8A8A", marginBottom: 6 }}>Woke up</p>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                style={{ width: "100%", padding: "12px 10px", borderRadius: 12, border: "1px solid #333333", background: "#141414", color: "#E8E8E8", fontSize: 15, outline: "none", boxSizing: "border-box" }}
              />
            </div>
          </div>
          <div style={{ background: "#0F1F0A", border: "1px solid #2A4A1F", borderRadius: 14, padding: "0.85rem 1rem", marginBottom: 14, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#8A8A8A", margin: 0 }}>
              That's <span style={{ color: "#39FF14", fontWeight: 700 }}>{calcHours(bedtime, wakeTime).toFixed(1)} hours</span> of sleep
            </p>
          </div>
          <button
            onClick={saveSleep}
            style={{ width: "100%", padding: "13px 0", borderRadius: 12, border: "none", background: "#39FF14", color: "#0A0A0A", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Profile tab
--------------------------------------------------------- */
function ProfileTab({ state, setState, targets }) {
  const [editing, setEditing] = useState(false);
  const [weightInput, setWeightInput] = useState(state.profile.weight);

  function logWeight() {
    const newWeight = Number(weightInput);
    if (!newWeight || newWeight <= 0) return;
    const history = state.profile.weightHistory || [];
    const today = todayKey();
    const withoutToday = history.filter((h) => h.date !== today);
    setState({
      ...state,
      profile: {
        ...state.profile,
        weight: newWeight,
        weightHistory: [...withoutToday, { date: today, weight: newWeight }],
      },
    });
    setEditing(false);
  }

  const totalGain = (state.profile.weight - state.profile.startWeight).toFixed(1);
  const remaining = (state.profile.goalWeight - state.profile.weight).toFixed(1);

  return (
    <div style={{ padding: "1.25rem 1.25rem 6rem" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#E8E8E8", marginBottom: "1.25rem" }}>Profile & progress</h1>

      <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 18, padding: "1.25rem", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#39FF14", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0A0A", fontWeight: 700, fontSize: 18 }}>
            {state.profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 17, color: "#E8E8E8" }}>{state.profile.name}</p>
            <p style={{ fontSize: 13, color: "#8A8A8A" }}>{state.profile.age} yrs · {Math.floor(state.profile.height / 12)}'{state.profile.height % 12}" · {state.profile.sex}</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: "1rem" }}>
          <MiniStat label="Current" value={`${state.profile.weight} lb`} />
          <MiniStat label="Goal" value={`${state.profile.goalWeight} lb`} />
          <MiniStat label="To go" value={`${remaining} lb`} />
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            style={{ width: "100%", padding: "11px 0", borderRadius: 12, border: "1px solid #262626", background: "#0A0A0A", color: "#E8E8E8", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
          >
            <Edit3 size={14} /> Log today's weight
          </button>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="number"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #333333", background: "#0A0A0A", color: "#E8E8E8", fontSize: 15 }}
            />
            <button onClick={logWeight} style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: "#39FF14", color: "#0A0A0A", fontWeight: 600, cursor: "pointer" }}>
              Save
            </button>
          </div>
        )}
      </div>

      <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 18, padding: "1.25rem", marginBottom: "1rem" }}>
        <p style={{ fontWeight: 600, fontSize: 15, color: "#E8E8E8", marginBottom: 4 }}>Weight over time</p>
        <WeightChart history={state.profile.weightHistory || []} goalWeight={state.profile.goalWeight} />
      </div>

      <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 18, padding: "1.25rem", marginBottom: "1rem" }}>
        <p style={{ fontWeight: 600, fontSize: 15, color: "#E8E8E8", marginBottom: 10 }}>Daily targets</p>
        <TargetRow label="Calories" value={`${targets.targetCalories} kcal`} sub={`maintenance ~${targets.tdee} kcal`} />
        <TargetRow label="Protein" value={`${targets.proteinTarget} g`} sub="~1g per lb bodyweight" />
        <TargetRow label="Carbs" value={`${targets.carbsTarget} g`} />
        <TargetRow label="Fat" value={`${targets.fatTarget} g`} />
      </div>

      <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 18, padding: "1.25rem" }}>
        <p style={{ fontWeight: 600, fontSize: 15, color: "#E8E8E8", marginBottom: 4 }}>Progress since start</p>
        <p style={{ fontSize: 28, fontWeight: 700, color: totalGain >= 0 ? "#39FF14" : "#FF4D4D" }}>
          {totalGain > 0 ? "+" : ""}{totalGain} lb
        </p>
        <p style={{ fontSize: 12, color: "#8A8A8A" }}>since {state.profile.createdAt}</p>
      </div>
    </div>
  );
}

function WeightChart({ history, goalWeight }) {
  if (!history || history.length < 2) {
    return (
      <p style={{ fontSize: 13, color: "#8A8A8A", lineHeight: 1.5, margin: "8px 0 0" }}>
        Log your weight a few more times to see your trend appear here.
      </p>
    );
  }

  const sorted = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
  const weights = sorted.map((h) => h.weight);
  const allValues = goalWeight ? [...weights, goalWeight] : weights;
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const range = maxVal - minVal || 1;
  const padding = range * 0.15;
  const chartMin = minVal - padding;
  const chartMax = maxVal + padding;
  const chartRange = chartMax - chartMin || 1;

  const width = 320;
  const height = 140;
  const padLeft = 8;
  const padRight = 8;
  const padTop = 12;
  const padBottom = 24;
  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;

  function xFor(i) {
    if (sorted.length === 1) return padLeft + plotWidth / 2;
    return padLeft + (i / (sorted.length - 1)) * plotWidth;
  }
  function yFor(value) {
    return padTop + plotHeight - ((value - chartMin) / chartRange) * plotHeight;
  }

  const linePoints = sorted.map((h, i) => `${xFor(i)},${yFor(h.weight)}`).join(" ");
  const goalY = goalWeight ? yFor(goalWeight) : null;

  const firstLabel = new Date(sorted[0].date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const lastLabel = new Date(sorted[sorted.length - 1].date).toLocaleDateString(undefined, { month: "short", day: "numeric" });

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {goalY !== null && (
          <>
            <line x1={padLeft} y1={goalY} x2={width - padRight} y2={goalY} stroke="#39FF14" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            <text x={width - padRight} y={goalY - 6} textAnchor="end" fontSize="10" fill="#39FF14" opacity="0.8">
              Goal {goalWeight} lb
            </text>
          </>
        )}
        <polyline points={linePoints} fill="none" stroke="#39FF14" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {sorted.map((h, i) => (
          <circle key={h.date} cx={xFor(i)} cy={yFor(h.weight)} r={i === sorted.length - 1 ? 4.5 : 3} fill="#39FF14" />
        ))}
        <text x={padLeft} y={height - 6} fontSize="10" fill="#8A8A8A">{firstLabel}</text>
        <text x={width - padRight} y={height - 6} textAnchor="end" fontSize="10" fill="#8A8A8A">{lastLabel}</text>
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <p style={{ fontSize: 12, color: "#8A8A8A", margin: 0 }}>{sorted.length} entries logged</p>
        <p style={{ fontSize: 12, color: "#E8E8E8", margin: 0, fontWeight: 600 }}>
          Latest: {sorted[sorted.length - 1].weight} lb
        </p>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div style={{ background: "#0A0A0A", border: "1px solid #262626", borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
      <p style={{ fontSize: 11, color: "#8A8A8A", marginBottom: 2 }}>{label}</p>
      <p style={{ fontSize: 15, fontWeight: 700, color: "#E8E8E8" }}>{value}</p>
    </div>
  );
}

function TargetRow({ label, value, sub }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid #262626" }}>
      <div>
        <span style={{ fontSize: 14, color: "#E8E8E8" }}>{label}</span>
        {sub && <span style={{ fontSize: 11, color: "#666666", marginLeft: 6 }}>{sub}</span>}
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: "#E8E8E8" }}>{value}</span>
    </div>
  );
}

/* ---------------------------------------------------------
   Main App
--------------------------------------------------------- */
export default function Tracker({ onExit }) {
  const [state, setStateRaw] = useState(() => loadState() || { profile: null, daily: {} });
  const [tab, setTab] = useState("home");

  function setState(newState) {
    setStateRaw(newState);
    saveState(newState);
  }

  useEffect(() => {
    if (state.profile && !state.daily[todayKey()]) {
      setState({ ...state, daily: { ...state.daily, [todayKey()]: emptyDay(state) } });
    }
  }, [state.profile]);

  if (!state.profile) {
    return (
      <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: "#0A0A0A", minHeight: "600px" }}>
        <Onboarding
          onComplete={(profile) => setState({ profile: { ...profile, waterGoal: 10 }, daily: { [todayKey()]: { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0, completedExercises: [], loggedMeals: [] } } })}
        />
      </div>
    );
  }

  const targets = calcTargets(state.profile);

  const tabs = [
    ["home", "Home", <Home size={20} />],
    ["gym", "Gym", <Dumbbell size={20} />],
    ["meals", "Meals", <UtensilsCrossed size={20} />],
    ["recovery", "Recovery", <Moon size={20} />],
    ["profile", "Profile", <User size={20} />],
  ];

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: "#0A0A0A", minHeight: "600px", maxWidth: 480, margin: "0 auto", position: "relative", borderRadius: 0 }}>
      {tab === "home" && <Dashboard state={state} setState={setState} targets={targets} setTab={setTab} />}
      {tab === "gym" && <GymTab state={state} setState={setState} />}
      {tab === "meals" && <MealsTab state={state} setState={setState} targets={targets} />}
      {tab === "recovery" && <RecoveryTab state={state} setState={setState} />}
      {tab === "profile" && <ProfileTab state={state} setState={setState} targets={targets} />}

      {onExit && (
        <button
          onClick={onExit}
          style={{
            position: "absolute", top: 14, left: 14, background: "rgba(20,20,20,0.9)",
            border: "1px solid #333333", borderRadius: 10, padding: "6px 10px", fontSize: 12,
            color: "#8A8A8A", cursor: "pointer", zIndex: 5, fontWeight: 500,
          }}
        >
          ← Site
        </button>
      )}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#141414", borderTop: "1px solid #262626", display: "flex", justifyContent: "space-around", padding: "10px 4px 14px" }}>
        {tabs.map(([key, label, icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "none", border: "none", cursor: "pointer",
              color: tab === key ? "#39FF14" : "#666666",
              flex: 1,
            }}
          >
            {icon}
            <span style={{ fontSize: 11, fontWeight: tab === key ? 600 : 400 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
