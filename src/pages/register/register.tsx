import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/context/user-context";
import useLoading from "@/hooks/use-loading";
import axios from "axios";
import { FormEvent, useContext, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Register() {
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [cookies] = useCookies()
  const navigate = useNavigate()
  const { isPending, loading } = useLoading()
  const context = useContext(UserContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        isPending(true)
      const loginData = {
        login: loginRef?.current?.value,
        name: nameRef?.current?.value,
        password: passwordRef?.current?.value,
      };

      if (!loginData.login || !loginData.password || !loginData.name) {
        return;
      }

      const res = await axios.post(apiUrl + "auth/reg", loginData);
      if(res.status === 201) {
        navigate('/login')
        return
      }
      return;
    } catch (error) {
      console.log(error);
    }finally {
        isPending(false)
    }
  };

  useEffect(() => {
    if(cookies?.token && context?.user) {
      navigate('/')
    }
  }, [cookies.token, navigate, context?.user])

  return (
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="max-w-[600px] w-full flex flex-col gap-4 mt-20"
      >
        <Label className="font-bold text-xl">
          Name
          <Input
            ref={nameRef}
            className="mt-2"
            type="text"
            placeholder="Jamshid Turdiyev"
            required
          />
        </Label>
        <Label className="font-bold text-xl">
          Login
          <Input
            ref={loginRef}
            className="mt-2"
            type="text"
            placeholder="Jamshid"
            required
          />
        </Label>
        <Label className="font-bold text-xl">
          Password
          <Input
            ref={passwordRef}
            className="mt-2"
            type="password"
            placeholder="*********"
            required
          />
        </Label>
        <Button>{loading ? 'loading...' : 'Register'}</Button>
      </form>
    </div>
  );
}
