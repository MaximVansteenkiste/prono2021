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
    const {outcomeHome, outcomeAway, id} = { ...snap.data(), id: snap.id };
    const users = querySnapshotToData(
      await admin.firestore().collection("users").get()
    );

    users.forEach(async (u) => {
      const predictions = querySnapshotToData(
        await db.collection("users").doc(u.id).collection("predictions").get()
      );
      predictions[id]
      let p = 0;
      // juise TOTO = 3 punten

      // 1 punt voor juiste aantal doelpunten (per team)
      // 2 bonuspunten indien match volledig juist

      admin.firestore().collection("users").doc(u.id).update({ points: p });
    });
  });
