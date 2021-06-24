import { db, querySnapshotToData } from "../../../firebase";

export const updateScores = async () => {
  const matches = querySnapshotToData(
    await db.collection("matches").where("outcomeHome", "!=", "-1").get()
  );
  const users = querySnapshotToData(
    await db.collection("users").where("username", "==", "test").get()
  );

  return users?.forEach(async (u) => {
    let totalScore = 0;

    const predictions = querySnapshotToData(
      await db.collection("users").doc(u.id).collection("predictions").get()
    );

    predictions?.forEach((prediction) => {
      let p = 0;
      if (!prediction.id.includes("question")) {
        //if (prediction?.points === "-1") {
        if (
          prediction.id.startsWith("H") ||
          prediction.id.startsWith("F") ||
          prediction.id.startsWith("K") ||
          prediction.id.startsWith("A")
        ) {
          const match = matches.find((m) => m.id === prediction.id);
          const outcomeHome = Number(match?.outcomeHome);
          const outcomeAway = Number(match?.outcomeAway);
          const predHome = Number(prediction.outcomeHome);
          const predAway = Number(prediction.outcomeAway);

          if (match?.awayTeamName === prediction?.awayTeamName) {
            p +=
              2 * match.id.startsWith("K") +
              4 * match.id.startsWith("H") +
              8 * match.id.startsWith("F");
          }
          if (match?.homeTeamName === prediction?.homeTeamName) {
            p +=
              2 * match.id.startsWith("K") +
              4 * match.id.startsWith("H") +
              8 * match.id.startsWith("F");
          }

          if (match.id.startsWith("F")) {
            if (match?.winner === prediction?.winner) {
              p += 10;
            }
          }

          // juise TOTO = 4 punten
          // 2 punt voor juiste aantal doelpunten (per team)
          // 2 bonuspunten indien match volledig juist -> 10 in totaal
          if (match) {
            if (predHome === predAway && outcomeHome === outcomeAway) {
              p += 4;
              if (predHome === outcomeHome) p += 6;
            } else {
              if (predHome === outcomeHome) p += 2;
              if (predAway === outcomeAway) p += 2;
              if ((predHome - predAway) * (outcomeHome - outcomeAway) > 0)
                p += 4;
              if (p === 8) p += 2;
            }
          } else {
            p = -1;
          }
        } else {
          p = prediction?.points;
        }
      }

      totalScore += p > -1 ? p : 0;
      // db.collection("users")
      //   .doc(u.id)
      //   .collection("predictions")
      //   .doc(prediction.id)
      //   .set({ points: p }, { merge: true });
    });
    console.log(`${u.username}: ${totalScore}p`);
    // db.collection("users")
    //   .doc(u.id)
    //   .set({ points: totalScore }, { merge: true });
  });
};
