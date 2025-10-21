import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router";

import aptisEsolRoutes from "@/features/aptis-esol/routes/route";
import grammarRoutes from "@/features/grammar/routes/route";
import ieltsRoutes from "@/features/ielts/routes/route";
import landingRoutes from "@/features/landing/routes/route";
import phoneticRoutes from "@/features/phonetic/routes/route";
import posRoutes from "@/features/pos/routes/route";
import ScrollProvider from "@/shared/components/ScrollProvider";
import RootLayout from "@/shared/layouts/RootLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      landingRoutes,
      posRoutes,
      grammarRoutes,
      aptisEsolRoutes,
      ieltsRoutes,
      phoneticRoutes,
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ScrollProvider>
        <RouterProvider router={router} />
      </ScrollProvider>
    </>
  );
}

export default App;
