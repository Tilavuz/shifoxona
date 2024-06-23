import { Loader } from "lucide-react";

export default function LoaderComp() {
  return (
    <div className="w-full flex items-center justify-center">
        <Loader className="animate-spin" />
    </div>
  )
}
