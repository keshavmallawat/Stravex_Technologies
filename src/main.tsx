import { createRoot } from "react-dom/client";
import * as React from "react";
import App from "./App.tsx";
import "./index.css";

// Diagnostic: ensure React is present at runtime
// This will appear in the browser console
// Example: React version: 18.3.1
console.log("React version:", (React as any)?.version);

createRoot(document.getElementById("root")!).render(<App />);
