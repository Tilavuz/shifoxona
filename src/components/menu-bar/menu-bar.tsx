import { Link } from "react-router-dom";
import { list } from "./list";

export default function MenuBar() {
  return (
    <div className="border-r h-screen">
      <div className="flex items-center h-[69px] border-b justify-center mb-4">
        <Link className="font-bold text-3xl" to="/">
          Hospital
        </Link>
      </div>
      <ul className="flex flex-col gap-3 items-start">
        {list.map((item) => {
          return (
            <li key={item.title} className="font-bold hover:underline px-4 w-full">
              <Link to={item.link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
