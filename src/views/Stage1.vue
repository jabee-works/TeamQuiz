<template>
  <div>
    <!-- <h1>Stage1</h1> -->

    <div>
      <video v-if="myquiz==1" src="../assets/q1.mp4" controls></video>
      <video v-if="myquiz==2" src="../assets/q2.mp4" controls></video>
      <video v-if="myquiz==3" src="../assets/q3.mp4" controls></video>
      <video v-if="myquiz==4" src="../assets/q4.mp4" controls></video>
      <video v-if="myquiz==5" src="../assets/q5.mp4" controls></video>
      <video v-if="myquiz==6" src="../assets/q6.mp4" controls></video>
      <video v-if="myquiz==7" src="../assets/q7.mp4" controls></video>
      <video v-if="myquiz==8" src="../assets/q8.mp4" controls></video>
      <video v-if="myquiz==9" src="../assets/q9.mp4" controls></video>
      <video v-if="myquiz==10" src="../assets/q10.mp4" controls></video>
    </div>
    <select id="quiz" v-model="myquiz">
      <option></option>
      <option v-for="quiz in quizs" :key="quiz.name" :value="quiz.value">
        {{quiz.name}}
      </option>
    </select>
    <button id="answer" type="button" v-on:click="getAnswer">正解は!?</button>

    <div class="setAnswer">
      {{setAnswer}}
    </div>

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
      <tr>
        <td class="sizelarge rate" :class="answer.team1">{{rate["team1"]}} pt</td>
        <td class="sizelarge rate" :class="answer.team2">{{rate["team2"]}} pt</td>
        <td class="sizelarge rate" :class="answer.team3">{{rate["team3"]}} pt</td>
        <td class="sizelarge rate" :class="answer.team4">{{rate["team4"]}} pt</td>
        <td class="sizelarge rate" :class="answer.team5">{{rate["team5"]}} pt</td>
      </tr>
      <tr>
        <td class="sizelarge score1" :class="answer.team1">{{score["team1"]}} pt</td>
        <td class="sizelarge score2" :class="answer.team2">{{score["team2"]}} pt</td>
        <td class="sizelarge score3" :class="answer.team3">{{score["team3"]}} pt</td>
        <td class="sizelarge score4" :class="answer.team4">{{score["team4"]}} pt</td>
        <td class="sizelarge score5" :class="answer.team5">{{score["team5"]}} pt</td>
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
  onSnapshot,
  setDoc,
  doc
} from "firebase/firestore";
export default {
  data() {
    return {
      data: [],
      myquiz: "",
      answer: {
        team1: "",
        team2: "",
        team3: "",
        team4: "",
        team5: ""
      },
      score: {
        team1: "",
        team2: "",
        team3: "",
        team4: "",
        team5: ""
      },
      rate: {
        team1: "",
        team2: "",
        team3: "",
        team4: "",
        team5: ""
      },
      quizs: [
        {name: "quiz1", value:"1"},
        {name: "quiz2", value:"2"},
        {name: "quiz3", value:"3"},
        {name: "quiz4", value:"4"},
        {name: "quiz5", value:"5"},
        {name: "quiz6", value:"6"},
        {name: "quiz7", value:"7"},
        {name: "quiz8", value:"8"},
        {name: "quiz9", value:"9"},
        {name: "quiz10", value:"10"}
      ],
      setAnswer: ""
    }
  },
  computed: {
    selectedItem: function() {
      return this.quizs[Number(this.myquiz) - 1].name;
    }
  },
  methods: {
    getAnswer: function() {
      const db = getFirestore(firebaseApp);
      const docRef = collection(db, "quiz")
      let setAnswer = this.setAnswer
      getDocs(docRef).then(snapshot => {
        snapshot.docs.forEach(doc => {
           setAnswer = doc.data()[this.myquiz]
           this.setAnswer = setAnswer
        })

        const answer = this.answer
        const score = this.score
        const rate = this.rate
        Object.keys(answer).forEach(function(key, value) {
          // スコア加算
          // 現在スコア
          let now_score = +score[key]

          // 加算スコア
          let plus_rate = setAnswer == answer[key] ? +rate[key] : -rate[key]

          const ref = doc(db, "team", key)
          const data = {score: now_score + plus_rate}

          setDoc(ref, data)
          
        })
      });

      
    }
  },
  mounted: function () {
    const db = getFirestore(firebaseApp);

    onSnapshot(collection(db, "stage1"), (snapshot) => {
      snapshot.docs.forEach(doc => {
        this.answer["team" + doc.id] = doc.data().answer;
      })
    })

    onSnapshot(collection(db, "team"), (snapshot) => {
      snapshot.docs.forEach(doc => {
        this.score[doc.id] = doc.data().score;
      })
    })

    onSnapshot(collection(db, "rate"), (snapshot) => {
      snapshot.docs.forEach(doc => {
        this.rate[doc.id] = doc.data().rate;
      })
    })
  }
}
</script>

<style>

video {
  width: 1000px;
}
table {
  margin: 0 auto;
  width: 1200px;
}
th {
  font-size: 2em;
}

td {
  border: 1px solid;
  width: 20%;
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

.setAnswer {
  height: 200px;
}

.score1, .score2, .score3, .score4, .score5 {
  color: black;
  font-size: 3em;
}

.rate {
  color: black;
}

.setAnswer {
  font-size: 10em;
  font-weight: bold;
}
</style>