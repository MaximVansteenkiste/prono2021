import { useForm } from "react-hook-form";
import MatchInput from "../../components/MatchInput";
import StyledButton from "../../components/StyledButton";
import useMatches from "../../hooks/api/useMatches";
import useMatchPredictions from "../../hooks/api/useMatchPredictions";
import useUpdatePredictions from "../../hooks/api/useUpdatePredictions";

const Prono = () => {
  const { matches } = useMatches();
  const { update } = useUpdatePredictions();
  const { register, handleSubmit, watch } = useForm();
  const { predictions } = useMatchPredictions();

  return (
    <div className="h-full">
      <div className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10">
        Mijn voorspellingen
      </div>
      <div className="px-2 pb-5">
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit((data) => update({ matches: data }))}
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
          <div className="flex justify-center">
            <StyledButton className="mt-4">Opslaan</StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Prono;
