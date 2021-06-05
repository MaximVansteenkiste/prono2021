//Modern javascript

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "1GB",
};

const querySnapshotToData = (qs) => {
  const array = [];
  qs.forEach((q) => array.push({ ...q.data(), id: q.id }));
  return array;
};

exports.updatePredictions = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    const matches = querySnapshotToData(
      await admin.firestore().collection("matches").get()
    );
    const users = querySnapshotToData(
      await admin.firestore().collection("users").get()
    );

    return users?.forEach(async (u) => {
      const predictions = querySnapshotToData(
        await admin
          .firestore()
          .collection("users")
          .doc(u.id)
          .collection("predictions")
          .where("points", "<", 0)
          .get()
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
        res.send(`${u.username}: ${p}`);
        admin
          .firestore()
          .collection("users")
          .doc(u.id)
          .collection("predictions")
          .doc(prediction.id)
          .set({ points: p }, { merge: true });
      });
    });
  });

exports.updateScores = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    const users = querySnapshotToData(
      await admin.firestore().collection("users").get()
    );

    return users?.forEach(async (u) => {
      const predictions = querySnapshotToData(
        await admin
          .firestore()
          .collection("users")
          .doc(u.id)
          .collection("predictions")
          .where("points", ">", 0)
          .get()
      );

      let totalPoints = 0;
      predictions.forEach((p) => (totalPoints += p.points));
      admin
        .firestore()
        .collection("users")
        .doc(u.id)
        .set({ points: totalPoints }, { merge: true });
    });
  });
