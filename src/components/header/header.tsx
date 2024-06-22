import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { UserContext } from "@/context/user-context";

import ProfileSheet from "./profile-sheet";

export default function Header() {
  const [cookies] = useCookies();
  const context = useContext(UserContext);

  return (
    <header className="py-4 border-b">
      <div className="container">
        <nav className="flex items-center justify-between">
          <div>
            
          </div>
          {cookies?.token && context?.user ? (
            <ProfileSheet />
          ) : (
            <div className="flex items-center gap-2">
              <Button className="font-bold" variant={"outline"} asChild>
                <Link to={"/register"}>Register</Link>
              </Button>
              <Button className="font-bold">
                <Link to={"login"}>Login</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
