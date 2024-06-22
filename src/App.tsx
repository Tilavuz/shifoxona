import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootLayout from "./layouts/root-layout"
import { Suspense, lazy } from "react"
import LoaderComp from "./components/loader/loader"

// Pages
import Department from "./pages/home/department"
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
          element: <Department />
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
