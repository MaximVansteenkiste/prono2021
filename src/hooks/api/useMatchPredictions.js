import { useContext } from "react";
import { useQuery } from "react-query";
import { MainContext } from "../../App";
import { db, querySnapshotToData } from "../../firebase";
import useUser from "../useUser";

const useMatchPredictions = () => {
  const user = useUser();
  const { setIsLoading } = useContext(MainContext);

  const { data, isLoading, error } = useQuery("predictions", async () =>
    querySnapshotToData(
      await db.collection("users").doc(user.uid).collection("predictions").get()
    )
  );

  return { predictions: data, isLoading, error };
};

export default useMatchPredictions;
