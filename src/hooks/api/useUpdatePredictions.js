import { useContext } from "react";
import { useMutation } from "react-query";
import { MainContext } from "../../App";
import { db } from "../../firebase";
import useUser from "../useUser";

const useUpdatePredictions = () => {
  const user = useUser();
  const { setNotification } = useContext(MainContext);
  const { mutate } = useMutation(({ matches }) => {
    Object.keys(matches).forEach(async (mId) => {
      await db
        .collection("users")
        .doc(user.uid)
        .collection("predictions")
        .doc(mId)
        .set(matches[mId], { merge: true });
    });
    setNotification({ message: "Opgeslagen!", type: "success" });
  });

  return { update: mutate };
};

export default useUpdatePredictions;
