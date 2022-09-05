<template>
  <div id="form-area">
    <select v-model="teamId" name="team" id="team">
      <option v-for="item in teamId"
        :value="item.id" 
        :key="item.id">
        {{item.label}}
      </option>
    </select>
    <ul>
      <li><label v-bind:class="selected" class="maru"><input type="radio" name="answer" value="ans1" v-model="selected"></label></li>
      <li><label v-bind:class="selected" class="batsu"><input type="radio" name="answer" value="ans2" v-model="selected"></label></li>
    </ul>
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
        teamId: [
          { id: 'team1', label: 'team1' },
          { id: 'team2', label: 'team2' },
          { id: 'team3', label: 'team3' },
          { id: 'team4', label: 'team4' },
          { id: 'team5', label: 'team5' }
        ],
        selected: ''
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
        const ref = doc(db, "stage1", "team1")
        const data = {answer: selected}

        setDoc(ref, data)
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
}
#form-area li label.batsu {
  background-image: url(../assets/batsu.jpeg);
  background-size: 90%;
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
</style>
