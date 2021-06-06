import { useEffect } from "react";
import Card from "./Card";
import Input from "./Input";

const MatchInput = ({
  match: { homeTeamName, awayTeamName, id, date },
  register,
  prediction,
  setValue,
  editable
}) => {
  useEffect(() => {
    if (prediction) {
      setValue(`${id}.outcomeHome`, prediction.outcomeHome);
      setValue(`${id}.outcomeAway`, prediction.outcomeAway);
    }
  }, []);

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
            {...register(`${id}.outcomeHome`, {
              required: true,
              min: 0,
            })}
          />{" "}
          -{" "}
          <Input
            type="number"
            className="w-10 text-center mx-1"
            defaultValue={prediction?.outcomeAway}
            disabled={!editable}
            required
            min={0}
            {...register(`${id}.outcomeAway`, {
              required: true,
              min: 0,
            })}
          />
        </div>

        <div className="flex flex-col place-content-center md:text-xl font-bold truncate text-right ml-2">
          {awayTeamName}
        </div>
      </div>
    </Card>
  );
};

export default MatchInput;
