import { useCallback, useMemo, useState } from "react";
import MatchInput from "../../../components/MatchInput";

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

const KnockOut = ({ matches, predictions, onChange: changeForm, form }) => {
  const [myFinals, setMyFinals] = useState(
    matches.filter(
      (m) =>
        m.id.charAt(0) === "A" ||
        m.id.charAt(0) === "K" ||
        m.id.charAt(0) === "H" ||
        m.id.charAt(0) === "F"
    )
  );

  const onChange = useCallback(
    (e, data, currentFinalId) => {
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
        id: nextFinalId,
      };

      if (
        currentFinal.outcomeHome !== "-1" &&
        currentFinal.outcomeAway !== "-1"
      ) {
        if (!nextFinal.teams) nextFinal.teams = {};
        nextFinal.teams[currentFinalId] = {
          name:
            Number(currentFinal.outcomeHome) > Number(currentFinal.outcomeAway)
              ? currentFinal.homeTeamName
              : currentFinal.awayTeamName,
          previousFinalNumber: Number(currentFinalId.charAt(1)),
        };
      }
      setMyFinals((prev) => [
        ...prev.filter((m) => m.id !== nextFinal.id && m.id !== currentFinalId),
        currentFinal,
        nextFinal,
      ]);
      return changeForm(e, data);
    },
    [changeForm, myFinals]
  );

  return (
    <>
      <Finals
        matches={matches.filter((m) => m.id.charAt(0) === "A")}
        predictions={predictions}
        onChange={onChange}
        title="1/8 finales"
      />
      <Finals
        matches={myFinals.filter((m) => m.id.charAt(0) === "K")}
        predictions={predictions}
        onChange={onChange}
        title="1/4 finales"
      />
      <Finals
        matches={myFinals.filter((m) => m.id.charAt(0) === "H")}
        predictions={predictions}
        onChange={onChange}
        title="1/2 finales"
      />
      <Finals
        matches={myFinals.filter((m) => m.id.charAt(0) === "F")}
        predictions={predictions}
        onChange={onChange}
        title="Finale"
      />
    </>
  );
};

const Finals = ({ matches, predictions, onChange, title }) => {
  const finals = useMemo(
    () =>
      matches.map((m) => {
        const mCopy = {
          ...m,
          teams: Object.keys(m.teams ?? []),
        };
        if (mCopy.teams?.length > 0) {
          mCopy.homeTeamName = m.teams[mCopy.teams?.[0]]?.name ?? "?";
          mCopy.awayTeamName = m.teams[mCopy.teams?.[1]]?.name ?? "?";
          return mCopy;
        }

        return m;
      }),
    [matches]
  );
  return (
    <>
      <div className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10">
        {title}
      </div>
      {finals.map((m) => (
        <MatchInput
          key={m.id + "match"}
          match={m}
          prediction={predictions.find((p) => p.id === m.id)}
          onChange={(e, data) => onChange(e, data, m.id)}
          editable={m.canUpdatePrediction ?? true}
        />
      ))}
    </>
  );
};

export default KnockOut;
