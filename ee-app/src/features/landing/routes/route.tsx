import type { RouteObject } from "react-router";
import MainLayout from "@/shared/layouts/MainLayout";
import HomePage from "../pages/HomePage";

const landingRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />, // layout chung toàn app
  children: [{ index: true, element: <HomePage /> }],
};

export default landingRoutes;
