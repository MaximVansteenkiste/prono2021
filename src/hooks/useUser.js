import { useState } from "react";
import firebase from "../firebase";

const useUser = () => {
  const [user, setUser] = useState(firebase.auth().currentUser ?? "loading");

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return user;
};

export default useUser;
