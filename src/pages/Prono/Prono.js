import MatchInput from "../../components/MatchInput";
import QuestionInput from "../../components/QuestionInput";
import StyledButton from "../../components/StyledButton";
import useUpdatePredictions from "../../hooks/api/useUpdatePredictions";
import { useHistory } from "react-router";
import { useCallback, useState } from "react";

const Prono = ({ predictions, matches, questions, defaultValues }) => {
  const history = useHistory();

  const { update } = useUpdatePredictions();
  const [form, setForm] = useState(defaultValues);

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
      <div className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10">
        Mijn voorspellingen
      </div>
      <div className="px-2 pb-5">
        <form
          className="flex flex-col space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            update(form, { onSuccess: () => history.push("/") });
          }}
        >
          {predictions &&
            matches?.map((m) => (
              <MatchInput
                key={m.id + "match"}
                match={m}
                prediction={predictions.find((p) => p.id === m.id)}
                onChange={onChange}
                editable={m.canUpdatePrediction}
              />
            ))}
          <div className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10">
            Varia
          </div>
          {questions &&
            predictions &&
            questions.map((q) => (
              <QuestionInput
                key={q.id}
                question={q}
                prediction={predictions.find((p) => p.id === `question${q.id}`)}
                editable={!!q.canUpdatePrediction}
                onChange={onChange}
              />
            ))}
          <div className="flex justify-center">
            <StyledButton className="mt-4" type="submit">
              Opslaan
            </StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Prono;
