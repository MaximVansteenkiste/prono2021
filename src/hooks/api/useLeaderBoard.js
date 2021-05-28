import { useContext } from "react";
import { useQuery } from "react-query";
import { MainContext } from "../../App";
import { db, querySnapshotToData } from "../../firebase";

const useMatchPredictions = () => {
  const { setIsLoading } = useContext(MainContext);

  const { data, isLoading, error } = useQuery("predictions", async () =>
    querySnapshotToData(await db.collection("users").orderBy("score").get())
  );

  return { leaderboard: data, isLoading, error };
};

export default useMatchPredictions;
