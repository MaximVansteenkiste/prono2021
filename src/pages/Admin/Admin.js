import { useCallback } from "react";
import CSVReader from "react-csv-reader";
import StyledButton from "../../components/StyledButton";
import { auth, db } from "../../firebase";
import { updateScores } from "./partials/updateScores";

const Admin = () => {
  const onUpload = useCallback((data) => {
    data.forEach((row) => {
      db.collection("matches").doc(row[0]).set({
        date: row[1],
        time: row[2],
        homeTeamName: row[3],
        awayTeamName: row[4],
        group: row[5],
        place: row[6],
        canUpdatePrediction: true,
      });
    });
  }, []);
  return (
    <div className="flex flex-col">
      <CSVReader onFileLoaded={(data) => onUpload(data)} />
      <button className="mt-5" onClick={updateScores}>
        Update scores
      </button>
    </div>
  );
};

export default Admin;
