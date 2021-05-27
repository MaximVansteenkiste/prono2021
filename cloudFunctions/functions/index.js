const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { firestore } = require("firebase-admin");
const { db } = require("../../src/firebase");
admin.initializeApp();

const querySnapshotToData = (qs) => {
  const array = [];
  qs.forEach((q) => array.push({ ...q.data(), id: q.id }));
  return array;
};

exports.onUpdateMatch = functions.firestore
  .document("/matches/{documentId}")
  .onUpdate(async (snap, context) => {
    const { outcomeHome, outcomeAway, id } = { ...snap.data(), id: snap.id };
    const users = querySnapshotToData(
      await admin.firestore().collection("users").get()
    );

    users.forEach(async (u) => {
      const predictions = querySnapshotToData(
        await db.collection("users").doc(u.id).collection("predictions").get()
      );
      // juise TOTO = 3 punten
      // 1 punt voor juiste aantal doelpunten (per team)
      // 2 bonuspunten indien match volledig juist -> 7 in totaal
      let predHome = predictions[id].outcomeHome;
      let predAway = predictions[id].outcomeAway;
      let p = 0;
      if (predHome == predAway && outcomeHome == outcomeAway) {
        p += 3;
        if (predHome == outcomeHome) p += 4;
      } else {
        if (predHome == outcomeHome) p += 1;
        if (predAway == outcomeAway) p += 1;
        if ((predHome - predAway) * (outcomeHome - outcomeAway) > 0) p += 3;
        if (p == 5) p += 2;
      }

      admin
        .firestore()
        .collection("users")
        .doc(u.id)
        .update({ points: u.points + p });
    });
  });
