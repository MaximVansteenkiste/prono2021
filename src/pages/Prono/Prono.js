import MatchInput from "../../components/MatchInput";
import QuestionInput from "../../components/QuestionInput";
import { useCallback, useState } from "react";
import KnockOut from "./partials/KnockOut";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { CgArrowLeftO } from "react-icons/cg";

const Prono = ({ predictions, matches, questions, defaultValues }) => {
  const [form, setForm] = useState(defaultValues);
  const [predictionsOpen, setPredictionsOpen] = useState(false);
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
      <div className="px-3 pb-3 pt-2 flex text-2xl justify-between align-middle sticky top-0 bg-background z-10 text-title">
        <Link to="/home">
          <Button className="text-accent">
            <CgArrowLeftO />
          </Button>
        </Link>
      </div>
      <div className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10">
        Voorspellingen
      </div>
      <div className="px-2 pb-5 flex flex-col space-y-2">
        <button
          className="text-gray-500 font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10"
          onClick={(e) => {
            e.preventDefault();
            setPredictionsOpen((prev) => !prev);
          }}
        >
          Groepsfase
        </button>
        {predictions &&
          predictionsOpen &&
          matches
            ?.filter((m) => Number(m.id) > 0)
            .map((m) => (
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
      </div>
    </div>
  );
};

export default Prono;
