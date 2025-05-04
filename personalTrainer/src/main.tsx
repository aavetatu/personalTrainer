import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Customerlist from "./components/Customerlist.tsx";
import Traininglist from "./components/Traininglist.tsx";
import Calendar from "./components/Calendar.tsx";
import TrainingChart from "./components/TrainingChart.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Customerlist />,
        index: true,
      },
      {
        path: "trainings",
        element: <Traininglist />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "chart",
        element: <TrainingChart />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
