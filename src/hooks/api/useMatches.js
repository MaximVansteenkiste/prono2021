import { useContext } from "react";
import { useQuery } from "react-query";
import { MainContext } from "../../App";
import { db, querySnapshotToData } from "../../firebase";

const useMatches = () => {
  const { setIsLoading } = useContext(MainContext);
  const { data, isLoading, error } = useQuery("calendar", async () => {
    return querySnapshotToData(await db.collection("matches").get());
  });
  
  return { matches: data?.sort((a, b) => a.id - b.id), isLoading, error };
};

export default useMatches;
