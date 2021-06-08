import Card from "./Card";
import Input from "./Input";

const MatchInput = ({
  match: { homeTeamName, awayTeamName, id, date },
  onChange,
  prediction,
  editable,
}) => {
  return (
    <Card>
      <div className="grid grid-cols-3">
        <div className="flex flex-col place-content-center md:text-xl font-bold truncate ml-2">
          <div>{homeTeamName}</div>
        </div>

        <div
          className="text-lg font-semibold place-self-center flex justify-center"
          style={{ maxWidth: "10rem" }}
        >
          <Input
            type="number"
            className="w-10 text-center mx-1"
            defaultValue={prediction?.outcomeHome}
            disabled={!editable}
            required
            min={0}
            onChange={(e) => onChange(e, { outcomeHome: e.target.value })}
            name={id}
          />{" "}
          -{" "}
          <Input
            type="number"
            className="w-10 text-center mx-1"
            defaultValue={prediction?.outcomeAway}
            disabled={!editable}
            required
            min={0}
            onChange={(e) => onChange(e, { outcomeAway: e.target.value })}
            name={id}
          />
        </div>

        <div className="flex flex-col place-content-center md:text-xl font-bold truncate text-right ml-2">
          {awayTeamName}
        </div>
      </div>
      {prediction?.points >= 0 && (
        <div className="flex justify-center text-accent mt-2">
          {prediction.points} p
        </div>
      )}
    </Card>
  );
};

export default MatchInput;
