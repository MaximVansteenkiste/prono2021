import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import useNetwork from "./hooks/useNetwork";
import Loading from "./components/Loading";
import Notification from "./components/Notification";
import { ReactQueryDevtools } from "react-query/devtools";
import Login from "./pages/Login/Login";
import useUser from "./hooks/useUser";
import Register from "./pages/Login/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Calendar from "./pages/Calendar/Calendar";

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
  const [notification, setNotification] = useState();
  const [isLoading, setIsLoading] = useState();

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
      <MainContext.Provider value={{ setNotification, setIsLoading }}>
        <div className="container mx-auto h-full">
          <Routes isLoading={isLoading} />
          <Notification notification={notification} />
        </div>
      </MainContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const Routes = ({ isLoading }) => {
  const user = useUser();

  if (user === "loading" || isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-2 mt-1">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/">
            <Calendar />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};

const PrivateRoute = ({ children, ...props }) => {
  const user = useUser();

  return (
    <Route
      {...props}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
