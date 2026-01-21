import { lazy } from "react";
import type { RouteObject } from "react-router";

const MainLayout = lazy(() => import("@/shared/layouts/MainLayout"));
const HomePage = lazy(() => import("@/features/landing/pages/HomePage"));

const landingRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [{ index: true, element: <HomePage /> }],
};

export default landingRoutes;
