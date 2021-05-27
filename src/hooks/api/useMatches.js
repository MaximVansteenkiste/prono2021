import { useContext } from "react";
import { useQuery } from "react-query";
import { MainContext } from "../../App";
import { db, querySnapshotToData } from "../../firebase";

const useMatches = () => {
  const { setIsLoading } = useContext(MainContext);
  const { data, isLoading, error } = useQuery("Prono", async () => {
    return querySnapshotToData(await db.collection("matches").get());
  });

  return { matches: data, isLoading, error };
};

export default useMatches;
