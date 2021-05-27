import { useState } from "react";
import firebase from "../firebase";

const useUser = () => {
  const [user, setUser] = useState(firebase.auth().currentUser);

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return user ?? "loading";
};

export default useUser;
