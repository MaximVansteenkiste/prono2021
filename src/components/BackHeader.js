import { useContext } from "react";
import { MainContext } from "../App";
import Button from "./Button";
import { IoIosArrowBack } from "react-icons/io";

const BackHeader = ({ title, children }) => {
  const { setPath } = useContext(MainContext);
  return (
    <div className="flex justify-between align-middle px-5 py-5 text-xl pb-3 pt-2 sticky top-0 bg-background z-10">
      <button onClick={() => setPath("home")} className="font-bold text-accent">
        <IoIosArrowBack />
      </button>
      <div className="font-semibold text-xl">{title}</div>
      <div className="">{children}</div>
    </div>
  );
};

export default BackHeader;
