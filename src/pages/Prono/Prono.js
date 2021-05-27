import { useForm } from "react-hook-form";
import MatchInput from "../../components/MatchInput";
import StyledButton from "../../components/StyledButton";
import useMatches from "../../hooks/api/useMatches";
import useUpdatePredictions from "../../hooks/api/useUpdatePredictions";

const Prono = () => {
  const { matches } = useMatches();
  const { update } = useUpdatePredictions();
  const { register, handleSubmit, watch } = useForm();

  return (
    <div className="h-full">
      <div className="px-3 pb-3 pt-2 flex text-2xl justify-between align-middle sticky top-0 bg-background z-10"></div>
      <div className="px-2 pb-5">
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit((data) => update({ matches: data }))}
        >
          {matches?.map((m) => (
            <MatchInput key={m.id} match={m} register={register} />
          ))}
          <div className="flex justify-center">
            <StyledButton className="mt-4">Opslaan</StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Prono;
