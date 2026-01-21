import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import aptisEsolRoutes from "@/features/aptis-esol/routes/route";
import dictionaryRoutes from "@/features/dictionary/routes/route";
import grammarRoutes from "@/features/grammar/routes/route";
import ieltsRoutes from "@/features/ielts/routes/route";
import landingRoutes from "@/features/landing/routes/route";
import phoneticRoutes from "@/features/phonetic/routes/route";
import posRoutes from "@/features/pos/routes/route";
import vgslRoutes from "@/features/vgsl/routes/route";
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
      dictionaryRoutes,
      vgslRoutes,
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollProvider>
        <Suspense
          fallback={<div className="dark:bg-black-850 h-screen w-screen"></div>}
        >
          <RouterProvider router={router} />
        </Suspense>
      </ScrollProvider>
    </QueryClientProvider>
  );
}

export default App;
