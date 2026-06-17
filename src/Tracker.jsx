import React, { useState, useEffect, useMemo } from "react";
import {
  Home, Dumbbell, UtensilsCrossed, Droplets, User, ChevronRight,
  ChevronLeft, Plus, Minus, Flame, Beef, Wheat, Droplet, X, Check,
  ExternalLink, Calendar, TrendingUp, Award, Edit3
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
    name: "", age: "", sex: "male", height: "", weight: "", goalWeight: "", goalPace: "moderate",
  });

  const steps = [
    { key: "name", label: "What's your name?", type: "text", placeholder: "Your name" },
    { key: "age", label: "How old are you?", type: "number", placeholder: "Age in years" },
    { key: "sex", label: "Sex (used for calorie calculation)", type: "select", options: [["male", "Male"], ["female", "Female"]] },
    { key: "height", label: "Height (inches)", type: "number", placeholder: 'e.g. 70 for 5\'10"' },
    { key: "weight", label: "Current weight (lbs)", type: "number", placeholder: "Current weight" },
    { key: "goalWeight", label: "Goal weight (lbs)", type: "number", placeholder: "Where you want to get to" },
    { key: "goalPace", label: "How fast do you want to gain?", type: "select", options: [["lean", "Slow & lean (~0.25 lb/week)"], ["moderate", "Moderate (~0.5 lb/week)"], ["aggressive", "Faster gain (~1 lb/week)"]] },
  ];

  const current = steps[step];
  const canProceed = form[current.key] !== "" && form[current.key] !== null;

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
      };
      onComplete(profile);
    }
  }

  return (
    <div style={{ minHeight: "520px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "2rem 1.5rem", maxWidth: "440px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: "2rem" }}>
        {steps.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? "#D4742C" : "#E5DDD0" }} />
        ))}
      </div>
      <p style={{ fontSize: 13, color: "#8A7B68", marginBottom: 6, fontWeight: 500, letterSpacing: "0.02em" }}>
        STEP {step + 1} OF {steps.length}
      </p>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#1C1410", marginBottom: "1.5rem", lineHeight: 1.3 }}>
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
                border: form[current.key] === val ? "2px solid #D4742C" : "1px solid #E5DDD0",
                background: form[current.key] === val ? "#FBF0E4" : "#FFFFFF",
                textAlign: "left",
                fontSize: 15,
                fontWeight: 500,
                color: "#1C1410",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
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
            border: "1px solid #E5DDD0",
            marginBottom: "2rem",
            outline: "none",
            background: "#FFFFFF",
            color: "#1C1410",
          }}
        />
      )}

      <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{ padding: "12px 18px", borderRadius: 12, border: "1px solid #E5DDD0", background: "#FFFFFF", color: "#8A7B68", fontWeight: 500, cursor: "pointer" }}
          >
            <ChevronLeft size={18} />
          </button>
        )}
        <button
          onClick={next}
          disabled={!canProceed}
          style={{
            flex: 1, padding: "14px 18px", borderRadius: 12, border: "none",
            background: canProceed ? "#D4742C" : "#E5DDD0",
            color: canProceed ? "#FFF8EF" : "#A89A86",
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
    <div style={{ width: "100%", height, borderRadius: height / 2, background: "#EFE7D8", overflow: "hidden" }}>
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
      <p style={{ fontSize: 14, color: "#8A7B68", marginBottom: 2 }}>
        {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
      </p>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1C1410", marginBottom: "1.25rem" }}>
        Hey {state.profile.name}, let's build
      </h1>

      {/* Calorie ring card */}
      <div style={{ background: "#1C1410", borderRadius: 20, padding: "1.5rem", marginBottom: "1rem", color: "#FFF8EF" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: "#C9BBA4", fontWeight: 500 }}>CALORIES TODAY</span>
          <span style={{ fontSize: 13, color: "#C9BBA4" }}>goal {targets.targetCalories}</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 38, fontWeight: 700 }}>{today.calories}</span>
          <span style={{ fontSize: 16, color: "#C9BBA4" }}>/ {targets.targetCalories} kcal</span>
        </div>
        <StackBar value={today.calories} max={targets.targetCalories} color="#D4742C" height={10} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, gap: 10 }}>
          <MacroChip label="Protein" value={today.protein} target={targets.proteinTarget} color="#B8483F" />
          <MacroChip label="Carbs" value={today.carbs} target={targets.carbsTarget} color="#D4742C" />
          <MacroChip label="Fat" value={today.fat} target={targets.fatTarget} color="#7A8B5C" />
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
        icon={<Dumbbell size={18} color="#D4742C" />}
      >
        <p style={{ fontWeight: 600, fontSize: 15, color: "#1C1410", marginBottom: 4 }}>{workout.name}</p>
        <p style={{ fontSize: 13, color: "#8A7B68" }}>
          {workout.type === "rest" ? "Recovery day — no lifting" : `${workout.exercises.length} exercises`}
        </p>
      </SectionCard>

      {/* Today's meals quick link */}
      <SectionCard
        title="Today's meal plan"
        onClick={() => setTab("meals")}
        icon={<UtensilsCrossed size={18} color="#D4742C" />}
      >
        <p style={{ fontSize: 13, color: "#8A7B68" }}>Breakfast, lunch, dinner, and snacks lined up to hit {targets.targetCalories} kcal</p>
      </SectionCard>

      {/* Water tracker quick */}
      <SectionCard title="Water" onClick={() => setTab("water")} icon={<Droplets size={18} color="#D4742C" />}>
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          {Array.from({ length: state.profile.waterGoal || 10 }).map((_, i) => (
            <div key={i} style={{ width: 16, height: 22, borderRadius: 4, background: i < today.water ? "#7AA7C9" : "#EFE7D8" }} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function MacroChip({ label, value, target, color }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "#C9BBA4" }}>{label}</span>
        <span style={{ fontSize: 11, color: "#C9BBA4" }}>{value}/{target}g</span>
      </div>
      <StackBar value={value} max={target} color={color} height={6} />
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #EFE7D8", borderRadius: 16, padding: "1rem" }}>
      <div style={{ color: "#D4742C", marginBottom: 6 }}>{icon}</div>
      <p style={{ fontSize: 12, color: "#8A7B68", marginBottom: 2 }}>{label}</p>
      <p style={{ fontSize: 17, fontWeight: 700, color: "#1C1410" }}>{value}</p>
    </div>
  );
}

function SectionCard({ title, icon, children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", textAlign: "left", background: "#FFFFFF", border: "1px solid #EFE7D8",
        borderRadius: 16, padding: "1.1rem", marginBottom: "0.85rem", cursor: "pointer", display: "block",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {icon}
          <span style={{ fontWeight: 600, fontSize: 15, color: "#1C1410" }}>{title}</span>
        </div>
        <ChevronRight size={16} color="#C9BBA4" />
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
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1C1410", marginBottom: "1rem" }}>Weekly schedule</h1>

      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: "1.25rem", paddingBottom: 4 }}>
        {DAYS.map((d, i) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            style={{
              flex: "0 0 auto", padding: "8px 14px", borderRadius: 12, fontSize: 13, fontWeight: 600,
              border: i === todayIdx ? "2px solid #D4742C" : "1px solid #EFE7D8",
              background: selectedDay === d ? "#1C1410" : "#FFFFFF",
              color: selectedDay === d ? "#FFF8EF" : "#1C1410",
              cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            {d.slice(0, 3)}
          </button>
        ))}
      </div>

      <div style={{ background: workout.type === "rest" ? "#F2EEE3" : "#1C1410", color: workout.type === "rest" ? "#1C1410" : "#FFF8EF", borderRadius: 18, padding: "1.25rem", marginBottom: "1.25rem" }}>
        <p style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>{selectedDay.toUpperCase()}</p>
        <p style={{ fontSize: 19, fontWeight: 700 }}>{workout.name}</p>
      </div>

      {workout.type === "rest" ? (
        <p style={{ color: "#8A7B68", fontSize: 14, lineHeight: 1.6 }}>
          Recovery matters as much as lifting when you're building mass — this is where muscle actually repairs and grows. A light 20-30 minute walk is fine, but skip the gym today.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {workout.exercises.map((ex) => {
            const key = `${selectedDay}:${ex.name}`;
            const done = (today.completedExercises || []).includes(key);
            return (
              <div key={ex.name} style={{ background: "#FFFFFF", border: "1px solid #EFE7D8", borderRadius: 16, padding: "1rem", opacity: done ? 0.6 : 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <button
                    onClick={() => toggleExercise(ex.name)}
                    style={{
                      width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                      border: done ? "none" : "2px solid #E5DDD0", background: done ? "#7A8B5C" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    }}
                  >
                    {done && <Check size={15} color="#FFF8EF" />}
                  </button>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 15, color: "#1C1410", marginBottom: 4, textDecoration: done ? "line-through" : "none" }}>
                      {ex.name}
                    </p>
                    <p style={{ fontSize: 13, color: "#8A7B68", marginBottom: ex.note ? 4 : 0 }}>
                      {ex.sets} sets × {ex.reps} reps · rest {ex.rest}
                    </p>
                    {ex.note && <p style={{ fontSize: 12, color: "#D4742C", fontStyle: "italic" }}>{ex.note}</p>}
                  </div>
                  <a
                    href={youtubeSearchUrl(ex.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flexShrink: 0, display: "flex", alignItems: "center", gap: 4, fontSize: 12,
                      color: "#B8483F", textDecoration: "none", fontWeight: 600, padding: "6px 10px",
                      border: "1px solid #F0D9D4", borderRadius: 10, marginTop: 2,
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
  return { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0, completedExercises: [], loggedMeals: [] };
}

function MealsTab({ state, setState, targets }) {
  const [activeCategory, setActiveCategory] = useState("breakfast");
  const [recipeModal, setRecipeModal] = useState(null);
  const dateKey = todayKey();
  const today = state.daily[dateKey] || emptyDay(state);
  const loggedIds = today.loggedMeals || [];

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

  const categories = [
    ["breakfast", "Breakfast"],
    ["lunch", "Lunch"],
    ["dinner", "Dinner"],
    ["snacks", "Snacks"],
  ];

  return (
    <div style={{ padding: "1.25rem 1.25rem 6rem" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1C1410", marginBottom: 4 }}>Meal planner</h1>
      <p style={{ fontSize: 13, color: "#8A7B68", marginBottom: "1.1rem" }}>
        Daily target: {targets.targetCalories} kcal · {targets.proteinTarget}g protein
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: "1.25rem" }}>
        {categories.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            style={{
              flex: 1, padding: "9px 4px", borderRadius: 12, fontSize: 13, fontWeight: 600,
              border: "1px solid #EFE7D8",
              background: activeCategory === key ? "#1C1410" : "#FFFFFF",
              color: activeCategory === key ? "#FFF8EF" : "#1C1410",
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
            <div key={meal.id} style={{ background: "#FFFFFF", border: "1px solid #EFE7D8", borderRadius: 16, padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 15, color: "#1C1410", marginBottom: 4 }}>{meal.name}</p>
                  <p style={{ fontSize: 12, color: "#8A7B68" }}>
                    {meal.calories} kcal · P{meal.protein} C{meal.carbs} F{meal.fat}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setRecipeModal(meal)}
                  style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: "1px solid #EFE7D8", background: "#FBF7EF", color: "#1C1410", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                >
                  Recipe
                </button>
                <button
                  onClick={() => logMeal(meal)}
                  style={{
                    flex: 1, padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer",
                    background: logged ? "#7A8B5C" : "#D4742C", color: "#FFF8EF", fontSize: 13, fontWeight: 600,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
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
    </div>
  );
}

function RecipeModal({ meal, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,20,16,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 50 }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#FFF8EF", borderRadius: "24px 24px 0 0", padding: "1.5rem", maxWidth: 480, width: "100%", maxHeight: "80vh", overflowY: "auto" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <h2 style={{ fontSize: 19, fontWeight: 700, color: "#1C1410" }}>{meal.name}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A7B68" }}>
            <X size={22} />
          </button>
        </div>
        <p style={{ fontSize: 13, color: "#8A7B68", marginBottom: "1.25rem" }}>
          {meal.calories} kcal · {meal.protein}g protein · {meal.carbs}g carbs · {meal.fat}g fat
        </p>

        <p style={{ fontSize: 13, fontWeight: 700, color: "#1C1410", marginBottom: 8, letterSpacing: "0.02em" }}>INGREDIENTS</p>
        <ul style={{ marginBottom: "1.25rem", paddingLeft: 18 }}>
          {meal.ingredients.map((ing, i) => (
            <li key={i} style={{ fontSize: 14, color: "#3A2E22", marginBottom: 5, lineHeight: 1.5 }}>{ing}</li>
          ))}
        </ul>

        <p style={{ fontSize: 13, fontWeight: 700, color: "#1C1410", marginBottom: 8, letterSpacing: "0.02em" }}>STEPS</p>
        <ol style={{ paddingLeft: 18 }}>
          {meal.steps.map((step, i) => (
            <li key={i} style={{ fontSize: 14, color: "#3A2E22", marginBottom: 8, lineHeight: 1.5 }}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Water tab
--------------------------------------------------------- */
function WaterTab({ state, setState }) {
  const dateKey = todayKey();
  const today = state.daily[dateKey] || emptyDay(state);
  const goal = state.profile.waterGoal || 10;

  function adjust(delta) {
    const updated = { ...emptyDay(state), ...today, water: Math.max(0, today.water + delta) };
    setState({ ...state, daily: { ...state.daily, [dateKey]: updated } });
  }

  return (
    <div style={{ padding: "1.25rem 1.25rem 6rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1C1410", marginBottom: "0.25rem", alignSelf: "flex-start" }}>Water tracker</h1>
      <p style={{ fontSize: 13, color: "#8A7B68", marginBottom: "2rem", alignSelf: "flex-start" }}>
        Staying hydrated supports digestion when you're eating bigger volumes of food.
      </p>

      <div style={{ fontSize: 56, fontWeight: 700, color: "#1C1410", marginBottom: 4 }}>{today.water}</div>
      <p style={{ fontSize: 14, color: "#8A7B68", marginBottom: "1.5rem" }}>of {goal} cups today</p>

      <div style={{ display: "flex", gap: 8, marginBottom: "2rem", flexWrap: "wrap", justifyContent: "center", maxWidth: 320 }}>
        {Array.from({ length: goal }).map((_, i) => (
          <Droplet key={i} size={28} fill={i < today.water ? "#7AA7C9" : "none"} color={i < today.water ? "#7AA7C9" : "#D9CFBB"} strokeWidth={1.5} />
        ))}
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        <button
          onClick={() => adjust(-1)}
          style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid #EFE7D8", background: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Minus size={22} color="#1C1410" />
        </button>
        <button
          onClick={() => adjust(1)}
          style={{ width: 56, height: 56, borderRadius: "50%", border: "none", background: "#D4742C", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Plus size={22} color="#FFF8EF" />
        </button>
      </div>
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
    setState({
      ...state,
      profile: {
        ...state.profile,
        weight: newWeight,
        weightHistory: [...history, { date: todayKey(), weight: newWeight }],
      },
    });
    setEditing(false);
  }

  const totalGain = (state.profile.weight - state.profile.startWeight).toFixed(1);
  const remaining = (state.profile.goalWeight - state.profile.weight).toFixed(1);

  return (
    <div style={{ padding: "1.25rem 1.25rem 6rem" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1C1410", marginBottom: "1.25rem" }}>Profile & progress</h1>

      <div style={{ background: "#FFFFFF", border: "1px solid #EFE7D8", borderRadius: 18, padding: "1.25rem", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#D4742C", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF8EF", fontWeight: 700, fontSize: 18 }}>
            {state.profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 17, color: "#1C1410" }}>{state.profile.name}</p>
            <p style={{ fontSize: 13, color: "#8A7B68" }}>{state.profile.age} yrs · {Math.floor(state.profile.height / 12)}'{state.profile.height % 12}" · {state.profile.sex}</p>
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
            style={{ width: "100%", padding: "11px 0", borderRadius: 12, border: "1px solid #EFE7D8", background: "#FBF7EF", color: "#1C1410", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
          >
            <Edit3 size={14} /> Log today's weight
          </button>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="number"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #E5DDD0", fontSize: 15 }}
            />
            <button onClick={logWeight} style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: "#7A8B5C", color: "#FFF8EF", fontWeight: 600, cursor: "pointer" }}>
              Save
            </button>
          </div>
        )}
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #EFE7D8", borderRadius: 18, padding: "1.25rem", marginBottom: "1rem" }}>
        <p style={{ fontWeight: 600, fontSize: 15, color: "#1C1410", marginBottom: 10 }}>Daily targets</p>
        <TargetRow label="Calories" value={`${targets.targetCalories} kcal`} sub={`maintenance ~${targets.tdee} kcal`} />
        <TargetRow label="Protein" value={`${targets.proteinTarget} g`} sub="~1g per lb bodyweight" />
        <TargetRow label="Carbs" value={`${targets.carbsTarget} g`} />
        <TargetRow label="Fat" value={`${targets.fatTarget} g`} />
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #EFE7D8", borderRadius: 18, padding: "1.25rem" }}>
        <p style={{ fontWeight: 600, fontSize: 15, color: "#1C1410", marginBottom: 4 }}>Progress since start</p>
        <p style={{ fontSize: 28, fontWeight: 700, color: totalGain >= 0 ? "#7A8B5C" : "#B8483F" }}>
          {totalGain > 0 ? "+" : ""}{totalGain} lb
        </p>
        <p style={{ fontSize: 12, color: "#8A7B68" }}>since {state.profile.createdAt}</p>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div style={{ background: "#FBF7EF", borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
      <p style={{ fontSize: 11, color: "#8A7B68", marginBottom: 2 }}>{label}</p>
      <p style={{ fontSize: 15, fontWeight: 700, color: "#1C1410" }}>{value}</p>
    </div>
  );
}

function TargetRow({ label, value, sub }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid #F2EEE3" }}>
      <div>
        <span style={{ fontSize: 14, color: "#1C1410" }}>{label}</span>
        {sub && <span style={{ fontSize: 11, color: "#A89A86", marginLeft: 6 }}>{sub}</span>}
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1410" }}>{value}</span>
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
      <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: "#FAF6EE", minHeight: "600px" }}>
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
    ["water", "Water", <Droplets size={20} />],
    ["profile", "Profile", <User size={20} />],
  ];

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: "#FAF6EE", minHeight: "600px", maxWidth: 480, margin: "0 auto", position: "relative", borderRadius: 0 }}>
      {tab === "home" && <Dashboard state={state} setState={setState} targets={targets} setTab={setTab} />}
      {tab === "gym" && <GymTab state={state} setState={setState} />}
      {tab === "meals" && <MealsTab state={state} setState={setState} targets={targets} />}
      {tab === "water" && <WaterTab state={state} setState={setState} />}
      {tab === "profile" && <ProfileTab state={state} setState={setState} targets={targets} />}

      {onExit && (
        <button
          onClick={onExit}
          style={{
            position: "absolute", top: 14, left: 14, background: "rgba(255,255,255,0.9)",
            border: "1px solid #EFE7D8", borderRadius: 10, padding: "6px 10px", fontSize: 12,
            color: "#8A7B68", cursor: "pointer", zIndex: 5, fontWeight: 500,
          }}
        >
          ← Site
        </button>
      )}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#FFFFFF", borderTop: "1px solid #EFE7D8", display: "flex", justifyContent: "space-around", padding: "10px 4px 14px" }}>
        {tabs.map(([key, label, icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "none", border: "none", cursor: "pointer",
              color: tab === key ? "#D4742C" : "#A89A86",
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
