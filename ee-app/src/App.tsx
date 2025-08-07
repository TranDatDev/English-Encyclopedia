import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import ScrollProvider from "@/shared/components/ScrollProvider";
import landingRoutes from "@/features/landing/routes/route";
import posRoutes from "@/features/pos/routes/route";
import RootLayout from "@/shared/layouts/RootLayout";
import grammarRoutes from "@/features/grammar/routes/route";
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      landingRoutes,
      posRoutes,
      grammarRoutes,
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
