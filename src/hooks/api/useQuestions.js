import { useContext } from "react";
import { useQuery } from "react-query";
import { MainContext } from "../../App";
import { db, querySnapshotToData } from "../../firebase";

const useQuestions = () => {
  const { setIsLoading } = useContext(MainContext);
  const { data, isLoading, error } = useQuery("questions", async () => {
    return querySnapshotToData(await db.collection("questions").get());
  });

  return { questions: data?.sort((a, b) => a.id - b.id), isLoading, error };
};

export default useQuestions;
