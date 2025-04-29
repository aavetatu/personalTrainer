import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Customerlist from "./components/Customerlist.tsx";
import Traininglist from "./components/Traininglist.tsx";

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
    ]
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
