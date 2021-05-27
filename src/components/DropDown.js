import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import Button from "./Button";
import Zoom from "react-reveal/Zoom";

const DropDown = ({
  Initiator,
  actions,
  className = "origin-top-left left-0",
  position,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button>{Initiator}</Menu.Button>
          <Zoom duration={300} when={open}>
            <Menu.Items
              className={`z-10 absolute mt-2 bg-card-lighter divide-y divide-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                position === "right"
                  ? "origin-top-left left-0 ml-3 mr-5"
                  : "origin-top-right right-0 mr-3 ml-5"
              }`}
            >
              {actions.map(({ label, onClick = () => {} }) => (
                <Menu.Item
                  className="px-2 py-2 text-sm w-full"
                  key={`action${label}`}
                  onClick={onClick}
                >
                  <Button onClick={onClick}>{label}</Button>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Zoom>
        </>
      )}
    </Menu>
  );
};

export default DropDown;
