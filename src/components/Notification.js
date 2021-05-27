import { useContext } from "react";
import Fade from "react-reveal/Fade";
import { MainContext } from "../App";

const Notification = ({ notification, duration = 3000 }) => {
  const { setNotification } = useContext(MainContext);

  return (
    <div className="fixed bottom-24 z-50 flex justify-center w-full">
      <Fade
        bottom
        when={!!notification}
        collapse
        duration={300}
        onReveal={() => setTimeout(() => setNotification(), duration)}
      >
        <div
          className={`text-black px-3 py-1 rounded-lg mx-2 ${
            notification?.type === "success" ? "bg-green-400" : "bg-red-500"
          }`}
          onClick={() => setNotification()}
        >
          {notification?.message}
        </div>
      </Fade>
    </div>
  );
};

export default Notification;
