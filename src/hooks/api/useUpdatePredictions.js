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
        .set(
          {
            outcomeHome: matches[mId].outcomeHome,
            outcomeAway: matches[mId].outcomeAway,
            points: -1,
          },
          { merge: true }
        );
    });
    setNotification({ message: "Opgeslagen!", type: "success" });
  });

  return { update: mutate };
};

export default useUpdatePredictions;
