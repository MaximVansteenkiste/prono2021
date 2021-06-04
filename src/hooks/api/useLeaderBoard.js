import { useContext } from "react";
import { useQuery } from "react-query";
import { MainContext } from "../../App";
import { db, querySnapshotToData } from "../../firebase";

const useLeaderBoard = () => {
  const { setIsLoading } = useContext(MainContext);

  const { data, isLoading, error } = useQuery("leaderboard", async () =>
    querySnapshotToData(
      await db.collection("users").orderBy("points", "desc").get()
    )
  );

  return { leaderboard: data, isLoading, error };
};

export default useLeaderBoard;
