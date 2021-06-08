import { useContext } from "react";
import { useMutation } from "react-query";
import { MainContext } from "../../App";
import { db } from "../../firebase";
import useUser from "../useUser";

const useUpdatePredictions = () => {
  const user = useUser();
  const { setNotification } = useContext(MainContext);
  const { mutate } = useMutation((data) => {
    Object.keys(data).forEach(async (id) => {
      if (id.includes("question")) {
        return await db
          .collection("users")
          .doc(user.uid)
          .collection("predictions")
          .doc(id)
          .set(
            {
              answer: data[id],
              type: "question",
              points: -1,
            },
            { merge: true }
          );
      }
      return await db
        .collection("users")
        .doc(user.uid)
        .collection("predictions")
        .doc(id)
        .set({
          outcomeHome: data[id].outcomeHome,
          outcomeAway: data[id].outcomeAway,
          points: -1,
        });
    });
    setNotification({ message: "Opgeslagen!", type: "success" });
  });

  return { update: mutate };
};

export default useUpdatePredictions;
