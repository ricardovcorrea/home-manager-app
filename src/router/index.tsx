import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage, ProductsPage, ReaderPage } from "../pages";
import { AppLayout } from "./layout";

export const Router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/products",
          element: <ProductsPage />,
        },
        {
          path: "/*",
          element: <Navigate to='/' replace />,
        },
      ],
    },
    {
      path: "/reader",
      element: <ReaderPage />,
    },
  ],
  {
    basename: "/home-manager-app",
  }
);
