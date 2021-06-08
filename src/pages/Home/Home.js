import Button from "../../components/Button";
import Card from "../../components/Card";
import useLeaderBoard from "../../hooks/api/useLeaderBoard";
import { CgProfile, CgCalendarDates } from "react-icons/cg";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
const Home = () => {
  const { leaderboard } = useLeaderBoard();
  const user = useUser();
  const plaats =
    leaderboard && leaderboard.findIndex((u) => u.id === user.uid) + 1;
  const plaatsPostScript = () => {
    if (plaats === 1 || plaats === 8 || plaats >= 20) {
      return "ste";
    }
    return "de";
  };
  return (
    <div className="h-full">
      <div className="px-3 pb-3 pt-2 flex text-2xl justify-between align-middle sticky top-0 bg-background z-10 text-title">
        <Link to="/prono">
          <Button className="text-accent">
            <CgProfile />
          </Button>
        </Link>

        <div></div>
        <div></div>
      </div>
      <div className="grid grid-cols-2 space-x-2">
        <Card>
          <div className="grid place-items-center">
            <div className="font-bold text-2xl">{user.points ?? 0}</div>
            <div>punten</div>
          </div>
        </Card>
        <Card>
          <div className="grid place-items-center">
            <div className="font-bold text-2xl">
              {plaats ? `${plaats}${plaatsPostScript()}` : "..."}
            </div>
            <div>plaats</div>
          </div>
        </Card>
      </div>
      <div className="mt-3 flex flex-col space-y-2">
        <div className="text-title text-2xl font-bold ml-3">Ranking</div>
        {leaderboard?.map((u, i) => (
          <Card>
            <div className="flex space-between">
              <div className="flex-grow font-bold text-white">{`${i + 1}. ${
                u.username
              }`}</div>
              <div className="font-semibold">{`${u.points}p`}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
