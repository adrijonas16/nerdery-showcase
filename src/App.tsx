import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Hero } from "./components/Hero";
import { AreaSelector } from "./components/AreaSelector";
import { AreaPage } from "./components/AreaPage";
import { areas } from "./data/projects";

type View =
  | { type: "home" }
  | { type: "area"; areaId: string }
  | { type: "project"; areaId: string; projectId: string };

function App() {
  const [view, setView] = useState<View>({ type: "home" });

  const currentArea =
    view.type !== "home" ? areas.find((a) => a.id === view.areaId) : null;

  const currentProject =
    view.type === "project" && currentArea
      ? currentArea.projects.find((p) => p.id === view.projectId)
      : null;

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <AnimatePresence mode="wait">
        {view.type === "home" && (
          <div key="home" style={{ width: "100%" }}>
            <Hero />
            <AreaSelector
              areas={areas}
              onSelect={(areaId) => setView({ type: "area", areaId })}
            />
          </div>
        )}

        {view.type === "area" && currentArea && (
          <AreaPage
            key={currentArea.id}
            area={currentArea}
            onBack={() => setView({ type: "home" })}
            onSelectProject={(projectId) =>
              setView({ type: "project", areaId: currentArea.id, projectId })
            }
          />
        )}

        {view.type === "project" && currentArea && currentProject && (
          <AreaPage
            key={currentProject.id}
            area={currentArea}
            selectedProject={currentProject}
            onBack={() => setView({ type: "area", areaId: currentArea.id })}
            onSelectProject={(projectId) =>
              setView({ type: "project", areaId: currentArea.id, projectId })
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
