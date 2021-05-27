import Card from "./Card";

const MatchInput = ({ hometeam, awayteam, date }) => {
  return (
    <Card>
      <div className="flex justify-between">
        <div className="text-xl font-bold">België</div>
        {true ? (
          <div className="text-xs font-light grid place-items-center">
            19:00
          </div>
        ) : (
          <div className="text-lg font-semibold grid place-items-center">
            1 - 0
          </div>
        )}
        <div className="text-xl font-bold">Spanje</div>
      </div>
    </Card>
  );
};

export default MatchInput;
