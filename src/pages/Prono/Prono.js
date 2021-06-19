import MatchInput from "../../components/MatchInput";
import QuestionInput from "../../components/QuestionInput";
import StyledButton from "../../components/StyledButton";
import useUpdatePredictions from "../../hooks/api/useUpdatePredictions";
import { useHistory } from "react-router";
import { useCallback, useState } from "react";
import KnockOut from "./partials/KnockOut";

const Prono = ({ predictions, matches, questions, defaultValues }) => {
  const history = useHistory();

  const { update } = useUpdatePredictions();
  const [form, setForm] = useState(defaultValues);
  const [predictionsOpen, setPredictionsOpen] = useState();
  const onChange = useCallback((e, data) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: data
        ? { ...prev[e.target.name], ...data }
        : e.target.value,
    }));
  }, []);

  return (
    <div className="h-full">
      <button
        className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10"
        onClick={() => setPredictionsOpen((prev) => !prev)}
      >
        Mijn voorspellingen
      </button>
      <div className="px-2 pb-5">
        <form
          className="flex flex-col space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            update(form, { onSuccess: () => history.push("/") });
          }}
        >
          {predictions &&
            predictionsOpen &&
            matches?.map((m) => (
              <MatchInput
                key={m.id + "match"}
                match={m}
                prediction={predictions.find((p) => p.id === m.id)}
                onChange={onChange}
                editable={m.canUpdatePrediction}
              />
            ))}
          {predictionsOpen && (
            <div className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10">
              Varia
            </div>
          )}
          {questions &&
            predictions &&
            predictionsOpen &&
            questions.map((q) => (
              <QuestionInput
                key={q.id}
                question={q}
                prediction={predictions.find((p) => p.id === `question${q.id}`)}
                editable={!!q.canUpdatePrediction}
                onChange={onChange}
              />
            ))}
          <KnockOut
            matches={matches}
            predictions={predictions}
            onChange={onChange}
            form={form}
          />
          {/* <div className="flex justify-center">
            <StyledButton className="mt-4" type="submit">
              Opslaan
            </StyledButton>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Prono;
