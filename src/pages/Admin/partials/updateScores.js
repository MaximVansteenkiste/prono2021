import { db, querySnapshotToData } from "../../../firebase";

export const updateScores = async () => {
  const matches = querySnapshotToData(
    await db.collection("matches").where("outcomeHome", "!=", "-1").get()
  );
  const users = querySnapshotToData(await db.collection("users").get());

  return users?.forEach(async (u) => {
    let totalScore = 0;

    const predictions = querySnapshotToData(
      await db
        .collection("users")
        .doc(u.id)
        .collection("predictions")
        .where("points", ">", -1)
        .get()
    );

    predictions?.forEach((prediction) => {
      let p = 0;
      if (!prediction.id.includes("question")) {
        const outcomeHome = matches[prediction.id]?.outcomeHome;
        const outcomeAway = matches[prediction.id]?.outcomeAway;
        const predHome = prediction.outcomeHome;
        const predAway = prediction.outcomeAway;

        // juise TOTO = 3 punten
        // 1 punt voor juiste aantal doelpunten (per team)
        // 2 bonuspunten indien match volledig juist -> 7 in totaal
        if (predHome === predAway && outcomeHome === outcomeAway) {
          p += 3;
          if (predHome === outcomeHome) p += 4;
        } else {
          if (predHome === outcomeHome) p += 1;
          if (predAway === outcomeAway) p += 1;
          if ((predHome - predAway) * (outcomeHome - outcomeAway) > 0) p += 3;
          if (p === 5) p += 2;
        }
      } else {
        p = prediction.points >= 0 ? prediction.points : 0;
      }
      totalScore += p;
      db.collection("users")
        .doc(u.id)
        .collection("predictions")
        .doc(prediction.id)
        .set({ points: -1 }, { merge: true });
    });
    console.log(`${u.username}: ${totalScore}p`);
    db.collection("users").doc(u.id).set({ points: 0 }, { merge: true });
  });
};
