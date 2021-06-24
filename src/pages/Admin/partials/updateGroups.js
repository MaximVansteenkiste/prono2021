import { db, querySnapshotToData } from "../../../firebase";

export const updateGroups = async () => {
  const matches = querySnapshotToData(await db.collection("matches").get());
  const users = querySnapshotToData(
    await db.collection("users").where("username", "!=", "test").get()
  );

  //   let groupA = ["Italië", "Wales", "Zwisterland", "Turkije"];
  //   let groupB = ["België", "Denemarken", "Finland", "Rusland"];
  //   let groupC = ["Nederland", "Oekraïne", "Oostenrijk", "Noord-Macedonië"];
  //   let groupD = ["Engeland", "Tsjechië", "Kroatië", "Schotland"];
  //   let groupE = ["Spanje", "Slovakije", "Zweden", "Polen"];
  //   let groupF = ["Frankrijk", "Portugal", "Duitsland", "Hongarije"];

  return users?.forEach(async (u) => {
    let totalScore = 0;
    console.log(u);
    let A = {
      Ital: [0, 0, 0, 0],
      Turk: [0, 0, 0, 0],
      Wale: [0, 0, 0, 0],
      Swit: [0, 0, 0, 0],
    };
    let B = {
      Belg: [0, 0, 0, 0],
      Denm: [0, 0, 0, 0],
      Russ: [0, 0, 0, 0],
      Finl: [0, 0, 0, 0],
    };
    let C = {
      Nort: [0, 0, 0, 0],
      Ukra: [0, 0, 0, 0],
      Aust: [0, 0, 0, 0],
      Neth: [0, 0, 0, 0],
    };
    let D = {
      Engl: [0, 0, 0, 0],
      Croa: [0, 0, 0, 0],
      Scot: [0, 0, 0, 0],
      Czec: [0, 0, 0, 0],
    };
    let E = {
      Spai: [0, 0, 0, 0],
      Swed: [0, 0, 0, 0],
      Pola: [0, 0, 0, 0],
      Slov: [0, 0, 0, 0],
    };
    let F = {
      Port: [0, 0, 0, 0],
      Germ: [0, 0, 0, 0],
      Fran: [0, 0, 0, 0],
      Hung: [0, 0, 0, 0],
    };

    const predictions = querySnapshotToData(
      await db.collection("users").doc(u.id).collection("predictions").get()
    );
    predictions?.forEach((prediction) => {
      if (!prediction.id.includes("question")) {
        const match = matches.find((m) => m.id === prediction.id);
        const home = match?.homeTeamName.substring(0, 4);
        const away = match?.awayTeamName.substring(0, 4);
        let group;
        switch (match?.group) {
          case "Group A":
            group = A;
            break;
          case "Group B":
            group = B;
            break;
          case "Group C":
            group = C;
            break;
          case "Group D":
            group = D;
            break;
          case "Group E":
            group = E;
            break;
          case "Group F":
            group = F;
            break;
        }
        // gescoorde doelpunten
        group[home][1] += Number(prediction?.outcomeHome);
        group[home][2] += Number(prediction?.outcomeAway);
        group[away][2] += Number(prediction?.outcomeHome);
        group[away][1] += Number(prediction?.outcomeAway);

        // doelpuntensaldo
        group[home][3] = group[home][1] - group[home][2];
        group[away][3] = group[away][1] - group[away][2];

        // verdiende punten
        if (prediction?.outcomeHome > prediction?.outcomeAway) {
          group[home][0] += 3;
        } else if (prediction?.outcomeHome === prediction?.outcomeAway) {
          group[home][0] += 1;
          group[away][0] += 1;
        } else {
          group[away][0] += 3;
        }
      }
    });
    let groups = [A, B, C, D, E, F];

    let r = new Array(6);

    for (let i = 0; i < r.length; i++) {
      r[i] = new Array(4);
      for (let j = 0; j < r[i].length; j++) {
        r[i][j] = ["", 0, 0, 0, 0];
      }
    }

    for (let i = 0; i < 6; i++) {
      let a = Object.keys(groups[i]);
      for (let j = 0; j < 4; j++) {
        r[i][j][0] = a[j];
        r[i][j][1] = groups[i][a[j]][0];
        r[i][j][2] = groups[i][a[j]][1];
        r[i][j][3] = groups[i][a[j]][2];
        r[i][j][4] = groups[i][a[j]][3];
      }
      r[i].sort(sortfunction);
    }

    let formatted = format(r);
    let header = [
      "Team",
      "points",
      "goals voor",
      "goals tegen",
      "doelpuntensaldo",
      "Team",
      "points",
      "goals voor",
      "goals tegen",
      "doelpuntensaldo",
      "Team",
      "points",
      "goals voor",
      "goals tegen",
      "doelpuntensaldo",
      "Team",
      "points",
      "goals voor",
      "goals tegen",
      "doelpuntensaldo",
    ];
    //export_csv(header, formatted, ";", u.username + "GroupResults");
    //console.log(`${u.username}: ${totalScore}p`);
    // db.collection("users")
    //   .doc(u.id)
    //   .set({ points: totalScore }, { merge: true });
  });
};

function sortfunction(a, b) {
  if (a[1] === b[1]) {
    return 0;
  } else {
    return a[1] > b[1] ? -1 : 1;
  }
}

function format(r) {
  let res = new Array(r.length);

  for (let i = 0; i < res.length; i++) {
    res[i] = new Array(r[0].length * r[0][0].length);
    for (let j = 0; j < res[i].length; j++) {
      res[i][j] = `${r[i][Math.floor(j / r[0][0].length)][j % r[0][0].length]}`;
    }
  }

  return res;
}

function export_csv(arrayHeader, arrayData, delimiter, fileName) {
  let header = arrayHeader.join(delimiter) + "\n";
  let csv = header;
  arrayData.forEach((array) => {
    csv += array.join(delimiter) + "\n";
  });

  let csvData = new Blob([csv], { type: "text/csv" });
  let csvUrl = URL.createObjectURL(csvData);

  let hiddenElement = document.createElement("a");
  hiddenElement.href = csvUrl;
  hiddenElement.target = "_blank";
  hiddenElement.download = fileName + ".csv";
  hiddenElement.click();
}
