import Header from "@/components/header/header";
import { UserContextProvider } from "@/context/user-context";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <UserContextProvider>
        <Header />
        <Outlet />
    </UserContextProvider>
  )
}
