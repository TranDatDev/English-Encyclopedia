import { lazy } from "react";
import type { RouteObject } from "react-router";

const BandPage = lazy(() => import("@/features/vgsl/pages/BandPage"));
const VgslHomePage = lazy(() => import("@/features/vgsl/pages/VgslHomePage"));
const MainLayout = lazy(() => import("@/shared/layouts/MainLayout"));

const vgslRoutes: RouteObject = {
  path: "/vgsl",
  element: <MainLayout />,
  children: [
    { index: true, element: <VgslHomePage /> },
    { path: ":bandId", element: <BandPage /> },
  ],
};

export default vgslRoutes;
