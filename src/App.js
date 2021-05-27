import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import useNetwork from "./hooks/useNetwork";
import Loading from "./components/Loading";
import Notification from "./components/Notification";
import SelectGroup from "./components/SelectGroup/SelectGroup";
import firebase from "./firebase";
import { getCurrentGroup, setCurrentGroup } from "./localstorage";
import Login from "./pages/Login/Login";
import Overview from "./pages/Overview/Overview";
import People from "./pages/People/People";
import { ReactQueryDevtools } from "react-query/devtools";
import useUser from "./hooks/useUser";

export const sugar = require("sugar");
sugar.extend();
require("sugar/locales/nl");
sugar.Date.setLocale("nl");

export const MainContext = createContext();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: "Infinity",
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  const isOnline = useNetwork();
  const [path, setPath] = useState("");
  const [notification, setNotification] = useState();
  const user = useUser();

  useEffect(() => window.history.pushState("", "", path), [path]);

  useEffect(() => {
    if (!isOnline) {
      setNotification({
        message:
          "U bent niet verbonden met het internet. Uw wijzigingen worden lokaal opgeslagen en doorgestuurd wanneer u weer verbonden bent.",
        duration: 10000,
      });
    }
  }, [isOnline]);

  return (
    <QueryClientProvider client={queryClient}>
      <MainContext.Provider value={{ setPath, user, setNotification }}>
        <div className="container mx-auto h-full relative">
          <Pages path={path} setPath={setPath} user={user} />
          <Notification notification={notification} />
        </div>
      </MainContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const Pages = ({ path, setPath, user }) => {
  if (user && user !== "loading") {
    if (path === "home" || path === "") {
      return <Overview />;
    }
  }

  if (!user) {
    setPath("login");
    return <Login />;
  }

  return <Loading />;
};

export default App;
