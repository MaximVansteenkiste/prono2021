import { useCallback } from "react";
import CSVReader from "react-csv-reader";
import StyledButton from "../../components/StyledButton";
import { auth, db } from "../../firebase";
import { updateScores } from "./partials/updateScores";
import { updateGroups } from "./partials/updateGroups";

const Admin = () => {
  const onUpload = useCallback((data) => {
    data.forEach((row) => {
      db.collection("matches").doc(row[0]).set({
        homeTeamName: row[1],
        awayTeamName: row[2],
        outcomeHome: row[3],
        outcomeAway: row[4],
        winner: "",
        // canUpdatePrediction: false,
      });
    });
  }, []);
  return (
    <div className="flex flex-col">
      <div>Upload matches</div>
      <CSVReader onFileLoaded={(data) => onUpload(data)} />
      <div className="flex justify-center mt-5">
        <StyledButton className="mt-5" onClick={updateScores}>
          Update scores
        </StyledButton>
      </div>
      <div className="flex justify-center mt-5">
        <StyledButton className="mt-5" onClick={updateGroups}>
          Update groups
        </StyledButton>
      </div>
    </div>
  );
};

export default Admin;
