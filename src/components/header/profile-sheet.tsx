import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserContext, UserContextInterface } from "@/context/user-context";
import axios from "axios";
import useLoading from "@/hooks/use-loading";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function ProfileSheet() {
  const context = useContext(UserContext);
  const passwordRef1 = useRef<HTMLInputElement>(null);
  const passwordRef2 = useRef<HTMLInputElement>(null);
  const [login, setLogin] = useState<string>();
  const { isPending, loading } = useLoading();

  useEffect(() => {
    if (context?.user?.login) {
      setLogin(context?.user.login);
    }
  }, [context?.user?.login]);

  const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const changeUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      isPending(true);
      if (passwordRef1?.current?.value === passwordRef2.current?.value) {
        const changeData = {
          _id: context?.user?.id,
          login,
          password: passwordRef1?.current?.value,
          name: context?.user?.name,
        };
        const res = await axios.put(apiUrl + "auth/update", changeData);
        const resData: UserContextInterface = {
          id: res.data._id,
          login: res.data.login,
          name: res.data.name,
        };
        localStorage.setItem("user", JSON.stringify(resData));
      }
    } catch (err) {
      console.log(err);
    } finally {
      isPending(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-4">{context?.user?.name}</SheetTitle>
        </SheetHeader>
        <form onSubmit={(e) => changeUser(e)} className="flex flex-col gap-4">
          <Label className="font-bold text-lg">
            Login
            <Input
              type="text"
              placeholder="login"
              value={login}
              onChange={(e) => handleLogin(e)}
              required
            />
          </Label>
          <Label className="font-bold text-lg">
            New password
            <Input
              ref={passwordRef1}
              type="password"
              placeholder="********"
              required
            />
          </Label>
          <Label className="font-bold text-lg">
            Repeat new password
            <Input
              ref={passwordRef2}
              type="password"
              placeholder="********"
              required
            />
          </Label>
          <Button>{loading ? "loading..." : "Change"}</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
