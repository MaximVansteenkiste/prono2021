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
    return values;
  }, [predictions]);

  if (!matches || !questions || !predictions || defaultValues === {}) {
    return <></>;
  }

  return (
    <Prono
      matches={matches.filter(
        (m) =>
          m.id.charAt(0) !== "A" &&
          m.id.charAt(0) !== "K" &&
          m.id.charAt(0) !== "H" &&
          m.id.charAt(0) !== "F"
      )}
      predictions={predictions}
      questions={questions}
      defaultValues={defaultValues}
    />
  );
};

export default PronoContainer;
