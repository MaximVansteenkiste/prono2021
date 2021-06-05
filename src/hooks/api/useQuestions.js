import { useContext } from "react";
import { useQuery } from "react-query";
import { MainContext } from "../../App";
import { db, querySnapshotToData } from "../../firebase";

const useQuestions = () => {
  const { setIsLoading } = useContext(MainContext);
  const { data, isLoading, error } = useQuery("questions", async () => {
    return querySnapshotToData(
      await db.collection("questions").orderBy("nummer").get()
    );
  });

  return { questions: data, isLoading, error };
};

export default useQuestions;
