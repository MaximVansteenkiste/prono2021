import { useQueryClient } from "react-query";
import firebase from "../firebase";

const useUser = () => {
  const queryClient = useQueryClient();

  firebase.auth().onAuthStateChanged((user) => {
    queryClient.setQueriesData("user", user);
  });

  return queryClient.getQueryData("user") ?? "loading";
};

export default useUser;
