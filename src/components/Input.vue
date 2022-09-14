<template>
  <div id="form-area">
    <select id="teamselect" v-model="myteam">
      <option></option>
      <option v-for="team in teams" :key="team.name" :value="team.value">
        {{team.name}}
      </option>
    </select>
    <div class="team">Team: {{selectedItem}}</div>
    <ul>
      <li><label v-bind:class="selected" class="maru"><input type="radio" name="answer" value="ans1" v-model="selected"></label></li>
      <li><label v-bind:class="selected" class="batsu"><input type="radio" name="answer" value="ans2" v-model="selected"></label></li>
    </ul>
    <div>
      <select id="rate" v-model="myrate">
        <option v-for="rate in rates" :key="rate.name" :value="rate.value">
          {{rate.score}}
        </option>
      </select>
      <div class="rate">Rate: {{myrate}}</div>
    </div>
    <button v-on:click="setAnswer">決定</button>
  </div>
</template>

<script>
  import firebaseApp from "../firebase.js"
  import {
    collection,
    getDocs,
    getFirestore,
    query,
    onSnapshot,
    setDoc,
    doc
  } from "firebase/firestore";
  export default {
    name: 'Input',
    data() {
      return {
        data: [],
        teams: [
          {name: "モエール", value:"1"},
          {name: "モエーナイ", value:"2"},
          {name: "シーゲン", value:"3"},
          {name: "ビン・カーン", value:"4"},
          {name: "ボトルペット", value:"5"}
        ],
        myteam: '1',
        selected: '',
        myrate: '',
        rates: [
          {score: "100", value:"100"},
          {score: "200", value:"200"},
          {score: "300", value:"300"},
          {score: "400", value:"400"},
          {score: "500", value:"500"}
        ],
      }
    },
    computed: {
      selectedItem: function() {
        return this.teams[Number(this.myteam) - 1].name;
      }
    },
    mounted: function () {
      const db = getFirestore(firebaseApp);
      const docRef = collection(db, "stage1")
      getDocs(docRef).then(snapshot => {
        snapshot.docs.forEach(doc => {
          console.log(doc.id)
          console.log(doc.data())
        })
      });

      
    },
    methods: {
      setAnswer: function() {
        const db = getFirestore(firebaseApp);
        const selected = this.selected == "ans1" ? "◯":"×"
        const team = document.getElementById("team")
        const ref = doc(db, "stage1", this.myteam)
        const data = {answer: selected}

        setDoc(ref, data)

        const rateref = doc(db, "rate", "team" + this.myteam)
        const ratedata = {rate: this.myrate}

      }
    }
      
  }
  </script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#form-area {
  text-align: center;
  margin-top: 10px;
}
#form-area ul {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
#form-area li {
  list-style-type: none;
  
  
}
#form-area li label {
  background-repeat: no-repeat;
  display: block;
  width: 320px;
  height: 320px;
  background-position: center;
  opacity: 0.2;
}
#form-area li label.maru {
  background-image: url(../assets/maru.jpeg);
  background-size: 60%;
}
#form-area li label.batsu {
  background-image: url(../assets/batsu.jpeg);
  background-size: 50%;
}
#form-area li label.maru.ans1,
#form-area li label.batsu.ans2 {
  opacity: 1;
}
#form-area li label input {
  display: none;
}
#form-area button {
  width: 200px;
  height: 80px;
  font-size: 2em;
  font-weight: bold;
}

#form-area .team {
  font-size: 3em;
  font-weight: bold;
  color: blue;
}

select {
  font-size: 2em;
  width: 400px;
  text-align: center;
  margin: 20px 0;
}
select#teamselect {
  font-size: 1.5em;
  widows: 200px;
}

#form-area .rate {
  font-size: 3em;
  font-weight: bold;
  color: blue;
}
</style>
