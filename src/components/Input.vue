<template>
  <div id="form-area">
    <textarea name="postform" rows="5" cols="50"></textarea>
    <button type="button" v-on:click="fbwrite">button</button>
  </div>
</template>

<script>
  import firebaseApp from "../firebase.js"
  import {
    collection,
    getDocs,
    getFirestore,
    query,
    onSnapshot
  } from "firebase/firestore";
  export default {
    name: 'Input',
    data() {
      return {
        data: [],
      }
    },
    mounted: function () {
      const db = getFirestore(firebaseApp);
      const q = query(collection(db, "team1"))
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              console.log('added: ', change.doc.data())
              
            }
          })
      })
    }
      
  }
  </script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#form-area {
  text-align: center;
  margin-top: 10px;
}
#form-area textarea {
  padding: 5px;
  border-radius: 5px;
}
#form-area button {
  display: block;
  margin: 0 auto;
  padding: 5px 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  background-color: rgb(57, 180, 108);
  color: white;
  cursor: pointer;
  width: 200px;
}
</style>
