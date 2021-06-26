import useMatches from "../../hooks/api/useMatches";
import useQuestions from "../../hooks/api/useQuestions";
import useMatchPredictions from "../../hooks/api/useMatchPredictions";
import Loading from "../../components/Loading";
import Prono from "./Prono";
import { useMemo } from "react";

const PronoContainer = () => {
  const { matches } = useMatches();
  const { questions } = useQuestions();
  const { predictions } = useMatchPredictions();

  const defaultValues = useMemo(() => {
    let values = {};
    predictions?.forEach(({ id, answer, ...rest }) => {
      values = {
        ...values,
        [id]: answer ?? { ...rest },
      };
    });
    return [];
  }, [predictions]);

  if (!matches || !questions || !predictions || defaultValues === {}) {
    return <></>;
  }

  return (
    <Prono
      matches={matches}
      predictions={predictions}
      questions={questions}
      defaultValues={defaultValues}
    />
  );
};

export default PronoContainer;
