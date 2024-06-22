import Header from "@/components/header/header";
import MenuBar from "@/components/menu-bar/menu-bar";
import { UserContextProvider } from "@/context/user-context";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <UserContextProvider>
      <div className="flex items-start w-full">
        <div className="max-w-[380px] w-full">
          <MenuBar />
        </div>
        <div className="flex-1">
          <Header />
          <Outlet />
        </div>
      </div>
    </UserContextProvider>
  );
}
