import { useQuery } from "react-query";
import { db, querySnapshotToData } from "../../firebase";

const useMatches = () => {
  const { data, loading, error } = useQuery("calendar", async () => {
    return querySnapshotToData(await db.collection("matches").get());
  });

  return { matches: data, loading, error };
};

export default useMatches   