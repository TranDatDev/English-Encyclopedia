import { lazy } from "react";
import type { RouteObject } from "react-router";

const MainLayout = lazy(() => import("@/shared/layouts/MainLayout"));
const DictionaryPage = lazy(
  () => import("@/features/dictionary/pages/DictionaryPage"),
);

const dictionaryRoutes: RouteObject = {
  path: "/dictionary/:word",
  element: <MainLayout />,
  children: [{ index: true, element: <DictionaryPage /> }],
};

export default dictionaryRoutes;
