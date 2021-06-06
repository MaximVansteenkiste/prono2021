import { useForm } from "react-hook-form";
import MatchInput from "../../components/MatchInput";
import QuestionInput from "../../components/QuestionInput";
import StyledButton from "../../components/StyledButton";
import useMatches from "../../hooks/api/useMatches";
import useQuestions from "../../hooks/api/useQuestions";
import useMatchPredictions from "../../hooks/api/useMatchPredictions";
import useUpdatePredictions from "../../hooks/api/useUpdatePredictions";

const Prono = () => {
  const { matches } = useMatches();
  const { questions } = useQuestions();
  const { update } = useUpdatePredictions();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { predictions } = useMatchPredictions();
  console.log(errors);
  return (
    <div className="h-full">
      <div className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10">
        Mijn voorspellingen
      </div>
      <div className="px-2 pb-5">
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit((data) => update({ matches: data }))}
          /*
          - resultaat van elke match
          - topschutter
          - speler die owngoal maakt
          - land meest goals
          - land meeste tegengoals
          - land meeste gele/rode kaarten
          - totaal # gele kaarten toernooi
          - totaal # rode kaarten toernooi
          - totaal # doelpunten
          - aantal pentaltyreeksen
          - en dan nog een paar waar/vals vragen
          */
        >
          {predictions &&
            matches?.map(
              (m) =>
                m.isOpen !== false && (
                  <MatchInput
                    key={m.id}
                    match={m}
                    prediction={predictions.find((p) => p.id === m.id)}
                    register={register}
                  />
                )
            )}
          <div className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10">
            Varia
          </div>
          {predictions &&
            questions?.map(
              (q) =>
                q.isOpen !== false && (
                  <QuestionInput
                    key={q.id}
                    question={q}
                    prediction={predictions.find((p) => p.id === q.id)}
                    register={register}
                  />
                )
            )}
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
