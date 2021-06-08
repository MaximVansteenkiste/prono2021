import { db, querySnapshotToData } from "../../../firebase";

export const updateScores = async () => {
  const matches = querySnapshotToData(
    await db.collection("matches").where("outcomeHome", ">=", 0).get()
  );
  const users = querySnapshotToData(await db.collection("users").get());

  return users?.forEach(async (u) => {
    let totalScore = 0;

    const predictions = querySnapshotToData(
      await db.collection("users").doc(u.id).collection("predictions").get()
    );

    predictions?.forEach((prediction) => {
      const outcomeHome = matches[prediction.id]?.outcomeHome;
      const outcomeAway = matches[prediction.id]?.outcomeAway;
      const predHome = prediction.outcomeHome;
      const predAway = prediction.outcomeAway;
      let p = 0;

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
      totalScore += p;
      db.collection("users")
        .doc(u.id)
        .collection("predictions")
        .doc(prediction.id)
        .set({ points: p }, { merge: true });
    });
console.log(`${u.username}: ${totalScore}p`)
    db.collection("users")
      .doc(u.id)
      .set({ points: totalScore }, { merge: true });
  });
};
