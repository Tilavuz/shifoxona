import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootLayout from "./layouts/root-layout"
import { Suspense, lazy } from "react"
import LoaderComp from "./components/loader/loader"

// Pages
import Home from "./pages/home/home"
const Room = lazy(() => import("./pages/room/room")) 
const Doctors = lazy(() => import("./pages/doctors/doctors")) 
const Spec = lazy(() => import("./pages/spec/spec")) 
const Department = lazy(() => import("./pages/department/department"))
const ErrorPage = lazy(() => import('@/pages/error/error'))
const Login = lazy(() => import('@/pages/login/login'))
const Register = lazy(() => import('@/pages/register/register'))

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: (
        <Suspense fallback={<LoaderComp />}>
          <ErrorPage />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/department',
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Department />
            </Suspense>
          )
        },
        {
          path: '/room',
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Room />
            </Suspense>
          )
        },
        {
          path: '/spec',
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Spec />
            </Suspense>
          )
        },
        {
          path: '/doctors',
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Doctors />
            </Suspense>
          )
        },
        {
          path: '/login',
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Login />
            </Suspense>
          )
        },
        {
          path: '/register',
          element: (
            <Suspense fallback={<LoaderComp />}>
              <Register />
            </Suspense>
          )
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}
