import { useCallback, useMemo } from "react";
import Card from "./Card";
import Input from "./Input";

const MatchInput = ({
  match: {
    homeTeamName,
    awayTeamName,
    id,
    outcomeAway,
    outcomeHome,
    winner = "home",
  },
  isKnockout,
  onChange,
  prediction,
  editable,
}) => {
  const showCheckbox = useMemo(
    () =>
      prediction &&
      isKnockout &&
      prediction.outcomeHome === prediction.outcomeAway &&
      prediction.outcomeHome !== "-1" &&
      prediction.outcomeAway !== "-1",
    [isKnockout, prediction]
  );

  const onCheckBox = useCallback(
    (e, winner) =>
      onChange(
        e,
        {
          winner: e.target.checked
            ? winner
            : winner === "home"
            ? "away"
            : "home",
        },
        id
      ),
    [id, onChange]
  );

  return (
    <Card>
      <div className="grid grid-cols-3">
        <div className="flex flex-col place-content-center md:text-xl font-bold truncate ml-2">
          <div>
            {isKnockout && prediction ? prediction.homeTeamName : homeTeamName}
          </div>
          {showCheckbox && (
            <div className="flex text-xs font-light space-x-1">
              <input
                type="radio"
                name={id}
                onClick={(e) => onCheckBox(e, "home")}
                defaultChecked={
                  winner === "home" || prediction?.winner === "home"
                }
                disabled={!editable}
                required
              />
              <div>Winnaar?</div>
            </div>
          )}
        </div>

        <div
          className="text-lg font-semibold place-self-center flex justify-center"
          style={{ maxWidth: "10rem" }}
        >
          <Input
            type="number"
            className={`w-10 text-center mx-1 ${
              editable ? "border border-white" : ""
            }`}
            defaultValue={prediction?.outcomeHome}
            disabled={!editable}
            min={0}
            onChange={(e) => onChange(e, { outcomeHome: e.target.value })}
            name={id}
          />{" "}
          -{" "}
          <Input
            type="number"
            className={`w-10 text-center mx-1 ${
              editable ? "border border-white" : ""
            }`}
            defaultValue={prediction?.outcomeAway}
            disabled={!editable}
            min={0}
            onChange={(e) => onChange(e, { outcomeAway: e.target.value })}
            name={id}
          />
        </div>

        <div className="flex flex-col place-content-center md:text-xl font-bold truncate text-right ml-2">
          <div>
            {isKnockout && prediction ? prediction.awayTeamName : awayTeamName}
          </div>
          {showCheckbox && (
            <div className="flex text-xs font-light space-x-1 justify-end">
              <div>Winnaar?</div>
              <input
                type="radio"
                name={id}
                onClick={(e) => onCheckBox(e, "away")}
                defaultChecked={
                  winner === "away" || prediction?.winner === "away"
                }
                disabled={!editable}
                required
              />
            </div>
          )}
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
