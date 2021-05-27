import { useForm } from "react-hook-form";
import useMatches from "../../hooks/api/useMatches";
import useUpdatePredictions from "../../hooks/api/useUpdatePredictions";

const Home = () => {
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
        </form>
      </div>
    </div>
  );
};

export default Home;
