var firebaseConfig = {
   apiKey: "AIzaSyABBAXDXBGoREB4xyz68B1XpgP84RLELKc",
   authDomain: "kwitter-7b7da.firebaseapp.com",
   databaseURL: "https://kwitter-7b7da-default-rtdb.firebaseio.com",
   projectId: "kwitter-7b7da",
   storageBucket: "kwitter-7b7da.appspot.com",
   messagingSenderId: "806906796614",
   appId: "1:806906796614:web:6cc3561d1456ff440b4847"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
User_name = localStorage.getItem("User_name");
Room_name = localStorage.getItem("Room_name");

function send() {
   msg = document.getElementById("msg").value;
   firebase.database().ref(Room_name).push({
      name: User_name,
      message: msg,
      like: 0
   });
   document.getElementById("msg").value = "";
}

function getData() {
   firebase.database().ref("/" + Room_name).on('value', function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
         childKey = childSnapshot.key;
         childData = childSnapshot.val();
         if (childKey != "purpose") {
            firebase_message_id = childKey;
            message_data = childData;
            //Start code
            console.log(firebase_message_id);
            console.log(message_data);
            name = message_data['name'];
            message = message_data['message'];
            like = message_data['like'];
            name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
            message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
            like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
            span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
            row = "<center>" + name_with_tag + message_with_tag + like_button + span_with_tag + "</center>";
            document.getElementById("output").innerHTML += row;
         }
      });
   });
}
getData();

function updateLike(message_id) {
   console.log("clicked on like button - " + message_id);
   button_id = message_id;
   likes = document.getElementById(button_id).value;
   updated_likes = Number(likes) + 1;
   console.log(updated_likes);
   firebase.database().ref(Room_name).child(message_id).update({
      like: updated_likes
   });

}

function logout() {
   localStorage.removeItem("User_name");
   localStorage.removeItem("Room_name");
   window.location.replace("index.html");
}
