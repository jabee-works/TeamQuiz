<template>
  <div>
    <h1>Stage1</h1>
    <table>
      <tr>
        <th>team1</th>
        <th>team2</th>
        <th>team3</th>
        <th>team4</th>
        <th>team5</th>
      </tr>
      <tr>
        <td class="team1">{{answer.team1}}</td>
        <td class="team2"></td>
        <td class="team3"></td>
        <td class="team4"></td>
        <td class="team5"></td>
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
        team3: ""
      }
    }
  },
  mounted: function () {
    const db = getFirestore(firebaseApp);

    onSnapshot(collection(db, "stage1"), (snapshot) => {
      snapshot.docs.forEach(doc => {
        this.answer[doc.id] = doc.data().answer;
      })
    })
  }
}
</script>
