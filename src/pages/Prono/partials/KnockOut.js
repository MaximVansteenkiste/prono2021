import { useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../../components/Button";
import MatchInput from "../../../components/MatchInput";
import StyledButton from "../../../components/StyledButton";
import useUpdatePredictions from "../../../hooks/api/useUpdatePredictions";

const nextRound = (currentRound) => {
  switch (currentRound) {
    case "A":
      return "K";
    case "K":
      return "H";
    case "H":
      return "F";
  }
};
const winner = ({
  outcomeHome,
  outcomeAway,
  homeTeamName,
  awayTeamName,
  winner,
}) => {
  if (outcomeHome !== outcomeAway) {
    return Number(outcomeHome) > Number(outcomeAway)
      ? homeTeamName
      : awayTeamName;
  }
  return winner === "home" ? homeTeamName : awayTeamName;
};
const KnockOut = ({ matches, predictions }) => {
  const [currentEditIndex, setCurrentEditIndex] = useState(0);
  const [currentEditCode, setCurrentEditCode] = useState("A");

  const [myFinals, setMyFinals] = useState([
    ...matches.filter(
      (m) =>
        m.id.charAt(0) === "A" ||
        ((m.id.charAt(0) === "K" ||
          m.id.charAt(0) === "H" ||
          m.id.charAt(0) === "F") &&
          predictions.find((p) => p.id === m.id))
    ),
  ]);

  const history = useHistory();
  const { update } = useUpdatePredictions();

  const updateFinals = useCallback(
    ({ data, currentFinalId }) => {
      const currentFinal = {
        ...myFinals.find((m) => m.id === currentFinalId),
        ...data,
      };
      const matchNumber = Number(currentFinalId.charAt(1));
      const nextFinalId = `${nextRound(currentFinalId.charAt(0))}${Math.round(
        matchNumber / 2
      )}`;

      const nextFinal = {
        ...myFinals?.find((m) => m.id === nextFinalId),
        outcomeHome: "-1",
        outcomeAway: "-1",
        id: nextFinalId,
      };
      if (
        currentFinal.outcomeHome !== "-1" &&
        currentFinal.outcomeAway !== "-1"
      ) {
        if (!nextFinal.teams) nextFinal.teams = {};

        nextFinal.teams[currentFinalId] = {
          name: winner({
            outcomeHome: currentFinal.outcomeHome,
            outcomeAway: currentFinal.outcomeAway,
            homeTeamName: currentFinal.homeTeamName,
            awayTeamName: currentFinal.awayTeamName,
            winner: currentFinal.winner ?? "home",
          }),
          previousFinalNumber: Number(currentFinalId.charAt(1)),
        };

        const sortedTeamCodes = Object.keys(nextFinal.teams)?.sort(
          (a, b) => Number(a.charAt(1)) - Number(b.charAt(1))
        );
        if (sortedTeamCodes?.length > 0) {
          nextFinal.homeTeamName = nextFinal.teams[sortedTeamCodes[0]]?.name;
          nextFinal.awayTeamName = nextFinal.teams[sortedTeamCodes[1]]?.name;
        }

        if (
          currentFinal.outcomeHome === currentFinal.outcomeAway &&
          !currentFinal.winner
        ) {
          currentFinal.winner = "home";
        }
      }
      setMyFinals((prev) => {
        const prevCopy = [...prev];
        const currentFinalIndex = prevCopy.findIndex(
          (m) => m.id === currentFinalId
        );
        const nextFinalIndex = prevCopy.findIndex((m) => m.id === nextFinalId);
        prevCopy.splice(currentFinalIndex, 1, currentFinal);
        if (nextFinalIndex > 0) {
          prevCopy.splice(nextFinalIndex, 1, nextFinal);
          return prevCopy;
        }

        if (currentFinal.id.charAt(0) === "F") return prevCopy;

        return [...prevCopy, nextFinal];
      });
    },
    [myFinals]
  );

  const onChange = useCallback(
    (e, data, currentFinalId, index) => {
      const { outcomeHome } = myFinals.find((m) => m.id === currentFinalId);
      if (
        (currentFinalId === "A8" ||
          currentFinalId === "K4" ||
          currentFinalId === "H2") &&
        data.outcomeAway &&
        data.outcomeAway !== outcomeHome
      ) {
        setCurrentEditCode((prev) => nextRound(prev));
        setCurrentEditIndex(0);
      } else {
        setCurrentEditIndex(index);
      }
      updateFinals({ data, currentFinalId });
    },
    [myFinals, updateFinals]
  );
console.log(predictions)
  return (
    <form
      className="flex flex-col space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        update(myFinals, { onSuccess: () => history.push("/") });
      }}
    >
      <Finals
        matches={myFinals.filter((m) => m.id.charAt(0) === "A")}
        predictions={predictions}
        onChange={onChange}
        title="1/8 finales"
        currentEditCode={currentEditCode}
        currentEditIndex={currentEditIndex}
        setNextRound={() => setCurrentEditCode((prev) => nextRound(prev))}
        setCurrentEditIndex={setCurrentEditIndex}
      />
      <Finals
        matches={myFinals.filter((m) => m.id.charAt(0) === "K")}
        predictions={predictions}
        onChange={onChange}
        title="1/4 finales"
        currentEditCode={currentEditCode}
        currentEditIndex={currentEditIndex}
        setNextRound={() => setCurrentEditCode((prev) => nextRound(prev))}
        setCurrentEditIndex={setCurrentEditIndex}
      />
      <Finals
        matches={myFinals.filter((m) => m.id.charAt(0) === "H")}
        predictions={predictions}
        onChange={onChange}
        title="1/2 finales"
        currentEditCode={currentEditCode}
        currentEditIndex={currentEditIndex}
        setNextRound={() => setCurrentEditCode((prev) => nextRound(prev))}
        setCurrentEditIndex={setCurrentEditIndex}
      />
      <Finals
        matches={myFinals.filter((m) => m.id.charAt(0) === "F")}
        predictions={predictions}
        onChange={onChange}
        title="Finale"
        setNextRound={() => setCurrentEditCode((prev) => nextRound(prev))}
        currentEditIndex={currentEditIndex}
        currentEditCode={currentEditCode}
        setCurrentEditIndex={setCurrentEditIndex}
      />
      <div className="flex justify-center">
        <StyledButton
          className="mt-4"
          type="submit"
          disabled={myFinals.length !== 15 || predictions?.length === 62}
        >
          Opslaan
        </StyledButton>
      </div>
    </form>
  );
};
const Finals = ({
  matches,
  predictions,
  onChange,
  title,
  currentEditCode,
  currentEditIndex,
  setNextRound,
  setCurrentEditIndex,
}) => {
  return (
    <>
      <div className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10">
        {title}
      </div>
      {matches?.map((m, i) => (
        <div>
          <MatchInput
            key={m.id + "final"}
            match={m}
            prediction={predictions.find((p) => p.id === m.id)}
            onChange={(e, data) => onChange(e, data, m.id, i)}
            editable={
              currentEditCode === m.id.charAt(0) &&
              (currentEditIndex === i || currentEditIndex + 1 === i) &&
              Boolean(
                predictions.find((p) => p.id === m.id)?.canUpdatePrediction ??
                  true
              )
            }
            isKnockout={true}
          />
          {(m.id === "A8" || m.id === "K4" || m.id === "H2") &&
            m.outcomeAway &&
            m.outcomeAway === m.outcomeHome &&
            m.outcomeAway !== "-1" &&
            currentEditIndex === i && (
              <div className="flex justify-center text-white">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentEditIndex(0);
                    setNextRound();
                  }}
                >
                  Volgende
                </button>
              </div>
            )}
        </div>
      ))}
    </>
  );
};

export default KnockOut;
