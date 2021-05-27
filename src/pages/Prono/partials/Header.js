import { FaUserCircle } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import { useCallback, useContext, useState } from "react";
import DropDown from "../../../components/DropDown";
import Selector from "../../../components/Selector";
import { getCurrentGroup, setCurrentGroup } from "../../../localstorage";
import { MainContext } from "../../../App";
import { auth } from "../../../firebase";

const Header = ({ refetchContacts, groups }) => {
  const [selectedGroup, setSelectedGroup] = useState(getCurrentGroup());

  const setGroup = useCallback(
    (group) => {
      setCurrentGroup(group);
      setSelectedGroup(group);
      refetchContacts();
    },
    [setSelectedGroup, refetchContacts]
  );

  return (
    <div className="px-3 pb-3 pt-2 flex text-2xl justify-between align-middle sticky top-0 bg-background z-10">
      <UserMenu />
      <div className="font-semibold mx-5 flex-grow">
        <Selector
          title="Kies een bubbel"
          selected={selectedGroup}
          setSelected={setGroup}
          options={groups}
        />
      </div>
      <OptionsMenu />
    </div>
  );
};

const UserMenu = () => {
  return (
    <DropDown
      Initiator={
        <button className="text-accent align-middle">
          <FaUserCircle />
        </button>
      }
      position="right"
      actions={[
        {
          label: "Afmelden",
          onClick: async () => {
            await auth.signOut();
          },
        },
        { label: "Verwijderen" },
      ]}
    />
  );
};

const OptionsMenu = () => {
  const { setPath } = useContext(MainContext);
  return (
    <DropDown
      Initiator={
        <button className="text-accent align-middle">
          <CgMoreO />
        </button>
      }
      position="left"
      actions={[
        { label: "Leden", onClick: () => setPath("people") },
        { label: "Exporteren" },
      ]}
    />
  );
};

export default Header;
