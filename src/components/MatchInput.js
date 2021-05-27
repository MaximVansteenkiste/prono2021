import Card from "./Card";
import Input from "./Input";

const MatchInput = ({
  match: { homeTeamName, awayTeamName, date, outcomeAway, outcomeHome },
}) => {
  return (
    <Card>
      <div className="flex justify-between">
        <div className="text-xl font-bold">{homeTeamName}</div>
        {false ? (
          <div className="text-xs font-light grid place-items-center">
            19:00
          </div>
        ) : (
          <div className="text-lg font-semibold flex mx-5">
            <Input type="number" placeholder={0} required className="w-8 text-center mx-1"/> -{" "}
            <Input type="number" placeholder={0} required className="w-8 text-center mx-1"/>
          </div>
        )}
        <div className="text-xl font-bold">{awayTeamName}</div>
      </div>
    </Card>
  );
};

export default MatchInput;
