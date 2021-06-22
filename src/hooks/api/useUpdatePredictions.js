import { useContext } from "react";
import { useMutation } from "react-query";
import { MainContext } from "../../App";
import { db } from "../../firebase";
import useUser from "../useUser";

const useUpdatePredictions = () => {
  const user = useUser();
  const { setNotification } = useContext(MainContext);
  const { mutate } = useMutation((data) => {
    data.forEach(async (match) => {
      return await db
        .collection("users")
        .doc(user.uid)
        .collection("predictions")
        .doc(match.id)
        .set({
          outcomeHome: data.find((m) => m.id === match.id).outcomeHome ?? "",
          outcomeAway: data.find((m) => m.id === match.id).outcomeAway ?? "",
          homeTeamName: data.find((m) => m.id === match.id).homeTeamName,
          awayTeamName: data.find((m) => m.id === match.id).awayTeamName,
          winner: data.find((m) => m.id === match.id).winner ?? "",
          points: -1,
        });
    });
    setNotification({ message: "Opgeslagen!", type: "success" });
  });

  return { update: mutate };
};

export default useUpdatePredictions;
