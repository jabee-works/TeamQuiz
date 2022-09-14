<template>

  <div class="home">
    <div>
      回答用ページ<br>
      <img src="../assets/qr.png"></img>
    </div>
    <button class="reset" type="button" v-on:click="reset">reset all</button>
  </div>
</template>

<script>
// @ is an alias to /src
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

    methods: {
      reset: function() {
        const db = getFirestore(firebaseApp);
      
        // for(var i = 0; i < 5; i++) {
        //   const ref = doc(db, "stage1", (i + 1))
        //   const data = {answer: "◯"}
        //   setDoc(ref, data)
        // }

        for(var j = 0; j < 5; j++) {
          const ref = doc(db, "rate", "team" + (j + 1))
          const data = {rate: 100}

          setDoc(ref, data)
        }

        for(var k = 0; k < 5; k++) {
          const ref = doc(db, "team", "team" + (k + 1))
          const data = {score: 1000}

          setDoc(ref, data)
        }

      }
    }
  }
</script>
