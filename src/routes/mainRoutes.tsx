import { HomePage } from "../pages/HomePage";
import { PlayPage } from "../pages/PlayPage";

export const MainRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/play",
    element: <PlayPage />,
  },
];
