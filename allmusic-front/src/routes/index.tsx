
import { Login, Preview, Register } from "../pages";
import { Header } from "@shared/components/header/Header";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/navbar",
    element: <Header />
  },
  {
    path: "/",
    element: <Preview />
  }
]);
