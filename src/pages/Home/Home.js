import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Card from "../../components/Card";
import useMatches from "../../hooks/api/useMatches";
import useUpdatePredictions from "../../hooks/api/useUpdatePredictions";

const Home = () => {
  

  return (
    <div className="h-full">
      <div className="px-3 pb-3 pt-2 flex text-2xl justify-between align-middle sticky top-0 bg-background z-10 text-title">
        <div></div>
        <div>Stats</div>
        <Button></Button>
      </div>
      <div className="grid grid-cols-2 space-x-2">
        <Card>
          <div className="grid place-items-center">
            <div className="font-bold text-2xl">2</div>
            <div>punten</div>
          </div>
        </Card>
        <Card>
          <div className="grid place-items-center">
            <div className="font-bold text-2xl">2de</div>
            <div>plaats</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
