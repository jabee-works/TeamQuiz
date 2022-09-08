<template>
  <div>
    <!-- <h1>Stage1</h1> -->
    <table>
      <tr>
        <th>モエール</th>
        <th>モエーナイ</th>
        <th>シーゲン</th>
        <th>ビン・カーン</th>
        <th>ボトルペット</th>
      </tr>
      <tr>
        <td class="sizelarge team1" :class="answer.team1">{{answer["team1"]}}</td>
        <td class="sizelarge team2" :class="answer.team2">{{answer["team2"]}}</td>
        <td class="sizelarge team3" :class="answer.team3">{{answer["team3"]}}</td>
        <td class="sizelarge team4" :class="answer.team4">{{answer["team4"]}}</td>
        <td class="sizelarge team5" :class="answer.team5">{{answer["team5"]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js"
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot
} from "firebase/firestore";
export default {
  data() {
    return {
      data: [],
      answer: {
        team1: "",
        team2: "",
        team3: "",
        team4: "",
        team5: ""
      }
    }
  },
  mounted: function () {
    const db = getFirestore(firebaseApp);

    onSnapshot(collection(db, "stage1"), (snapshot) => {
      snapshot.docs.forEach(doc => {
        this.answer["team" + doc.id] = doc.data().answer;
      })
    })
  }
}
</script>

<style>
table {
  margin: 0 auto;
}
.sizelarge {
  font-size: 2em;
  font-weight: bold;
}
.◯ {
  color: red;
}
.× {
  color: blue;
}
</style>