import React, { useState, useEffect } from "react";
import Landing from "./Landing.jsx";
import Tracker from "./Tracker.jsx";

function getInitialView() {
  if (typeof window === "undefined") return "landing";
  const hash = window.location.hash;
  if (hash === "#app") return "app";
  return "landing";
}

export default function App() {
  const [view, setView] = useState(getInitialView);

  useEffect(() => {
    window.location.hash = view === "app" ? "#app" : "";
  }, [view]);

  useEffect(() => {
    function onHashChange() {
      setView(getInitialView());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (view === "app") {
    return <Tracker onExit={() => setView("landing")} />;
  }
  return <Landing onStart={() => setView("app")} />;
}
