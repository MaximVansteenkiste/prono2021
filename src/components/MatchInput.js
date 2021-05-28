import Card from "./Card";
import Input from "./Input";

const MatchInput = ({
  match: { homeTeamName, awayTeamName, id, date },
  register,
  prediction,
}) => {
  return (
    <Card>
      <div className="flex justify-between">
        <div className="text-xl font-bold truncate">{homeTeamName}</div>

        <div className="text-lg font-semibold flex mx-5">
          <Input
            type="number"
            className="w-10 text-center mx-1"
            defaultValue={prediction?.outcomeHome}
            required
            min={0}
            {...register(`${id}.outcomeHome`, { required: true, min: 0 })}
          />{" "}
          -{" "}
          <Input
            type="number"
            className="w-10 text-center mx-1"
            defaultValue={prediction?.outcomeAway}
            required
            min={0}
            {...register(`${id}.outcomeAway`, { required: true, min: 0 })}
          />
        </div>

        <div className="text-xl font-bold truncate">{awayTeamName}</div>
      </div>
    </Card>
  );
};

export default MatchInput;
