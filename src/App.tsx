import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import { Suspense, lazy } from "react";
import LoaderComp from "./components/loader/loader";

// Pages
import Home from "@/pages/home/home";
const Treatment = lazy(() => import("@/pages/treatment/treatment")) 
const Service = lazy(() => import("@/pages/service/service")) 
const HistoryPatsient = lazy(() => import("@/pages/history-patsient/history-patsient"))
const Patsients = lazy(() => import("@/pages/patsient/patsient"));
const HistoryDoctor = lazy(
  () => import("@/pages/history-doctor/history-doctor")
);
const Position = lazy(() => import("@/pages/position/position"));
const Room = lazy(() => import("@/pages/room/room"));
const Doctors = lazy(() => import("@/pages/doctors/doctors"));
const Spec = lazy(() => import("@/pages/spec/spec"));
const Department = lazy(() => import("@/pages/department/department"));
const ErrorPage = lazy(() => import("@/pages/error/error"));
const Login = lazy(() => import("@/pages/login/login"));
const Register = lazy(() => import("@/pages/register/register"));

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: (
        <Suspense fallback={<LoaderComp />}>
          <ErrorPage />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/department",
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Department />
            </Suspense>
          ),
        },
        {
          path: "/room",
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Room />
            </Suspense>
          ),
        },
        {
          path: "/spec",
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Spec />
            </Suspense>
          ),
        },
        {
          path: "/position",
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Position />
            </Suspense>
          ),
        },
        {
          path: "/doctors",
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Doctors />
            </Suspense>
          ),
        },
        {
          path: "/patsients",
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Patsients />
            </Suspense>
          ),
        },
        {
          path: "/treatment",
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Treatment />
            </Suspense>
          ),
        },
        {
          path: "/service",
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Service />
            </Suspense>
          ),
        },
        {
          path: "/patsients/:id",
          element: (
            <Suspense fallback={<LoaderComp />}>
              <HistoryPatsient />
            </Suspense>
          ),
        },
        {
          path: "doctors/:id",
          element: (
            <Suspense fallback={<LoaderComp />}>
              <HistoryDoctor />
            </Suspense>
          ),
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/register",
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Register />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
