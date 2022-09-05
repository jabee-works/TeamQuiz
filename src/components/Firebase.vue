<template>
  <div id="firebase-area">
    <div id="form-area">
      <textarea name="postform" rows="5" cols="50"></textarea>
      <button type="button" v-on:click="fbwrite">送信</button>
    </div>
    <ul id="post-area">
      <li v-for="value in postData">
        {{value}}
      </li>
    </ul>
  </div>
</template>

<script>
import firebase, { functions } from 'firebase'
import config from '../firebase'
export default {
  name: 'Firebase',
  props: {
    msg: String
  },
  data: function() {
    return {
      postData: []
    }
  },
  mounted() {
    this.postData = [];
    let postData = this.postData;
    firebase.database().ref('posts').on("value", function(snapshot) {
      // this.postData = snapshot;
      console.log(snapshot);
      snapshot.forEach((data) => {
      postData.push(data.val().text);

        // console.log(postData);
      });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  },
  methods: {
    fbwrite: function() {
      const $postform = document.getElementsByName("postform")[0];
      var inputVal = $postform.value;
      var postId = (new Date).getTime();

      if(!inputVal) { return; }

      firebase.database().ref('posts/post' + postId).set({
        text: inputVal
      });

      $postform.value = "";
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
ul li {
  list-style-type: none;
  background-color: bisque;
  margin: 5px;
  width: 200px;
  height: 100px;
  float: left;
}
</style>
