import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Gallery } from "./pages/Gallery";
import { Guestbook } from "./pages/Guestbook";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "gallery", Component: Gallery },
      { path: "guestbook", Component: Guestbook },
    ],
  },
]);
