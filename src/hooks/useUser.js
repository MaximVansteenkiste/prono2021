import { useState } from "react";
import { useQuery } from "react-query";
import firebase, { db } from "../firebase";

const useUser = () => {
  const [user, setUser] = useState(firebase.auth().currentUser ?? "loading");

  const { data } = useQuery(
    "userData",
    async () => {
      const q = await db.collection("users").doc(user.uid).get();
      return { ...q.data(), id: q.id };
    },
    { enabled: !!user?.uid }
  );

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return data ? { ...user, ...data } : user;
};

export default useUser;
