"use strict";

//Modern javascript
const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

const querySnapshotToData = (qs) => {
  const array = [];
  qs.forEach((q) => array.push({ ...q.data(), id: q.id }));
  return array;
};

exports.updateScores = functions.https.onRequest(async (req, res) => {
  const matches = querySnapshotToData(
    await admin.firestore().collection("matches").get()
  );
  const users = querySnapshotToData(
    await admin.firestore().collection("users").get()
  );
  return users === null || users === void 0
    ? void 0
    : users.forEach(async (u) => {
        let totalScore = 0;
        const predictions = querySnapshotToData(
          await admin
            .firestore()
            .collection("users")
            .doc(u.id)
            .collection("predictions")
            .get()
        );
        predictions === null || predictions === void 0
          ? void 0
          : predictions.forEach((prediction) => {
              var _matches$prediction$i, _matches$prediction$i2;

              const outcomeHome =
                (_matches$prediction$i = matches[prediction.id]) === null ||
                _matches$prediction$i === void 0
                  ? void 0
                  : _matches$prediction$i.outcomeHome;
              const outcomeAway =
                (_matches$prediction$i2 = matches[prediction.id]) === null ||
                _matches$prediction$i2 === void 0
                  ? void 0
                  : _matches$prediction$i2.outcomeAway;
              const predHome = prediction.outcomeHome;
              const predAway = prediction.outcomeAway;
              let p = 0; // juise TOTO = 3 punten
              // 1 punt voor juiste aantal doelpunten (per team)
              // 2 bonuspunten indien match volledig juist -> 7 in totaal

              if (predHome === predAway && outcomeHome === outcomeAway) {
                p += 3;
                if (predHome === outcomeHome) p += 4;
              } else {
                if (predHome === outcomeHome) p += 1;
                if (predAway === outcomeAway) p += 1;
                if ((predHome - predAway) * (outcomeHome - outcomeAway) > 0)
                  p += 3;
                if (p === 5) p += 2;
              }

              totalScore += p;
              admin
                .firestore()
                .collection("users")
                .doc(u.id)
                .collection("predictions")
                .doc(prediction.id)
                .set(
                  {
                    points: p,
                  },
                  {
                    merge: true,
                  }
                );
            });
        res.send(`${u.username}: ${totalScore}`);
        admin.firestore().collection("users").doc(u.id).set(
          {
            points: totalScore,
          },
          {
            merge: true,
          }
        );
      });
});
