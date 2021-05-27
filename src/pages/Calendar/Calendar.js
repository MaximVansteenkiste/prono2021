import MatchInput from "../../components/MatchInput";

const Calendar = () => {
  return (
    <div className="h-full">
      <div className="px-3 pb-3 pt-2 flex text-2xl justify-between align-middle sticky top-0 bg-background z-10"></div>
      <div className="px-2 pb-5">
        <MatchInput />
      </div>
    </div>
  );
};

export default Calendar;
