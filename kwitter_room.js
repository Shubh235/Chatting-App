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
var Name = localStorage.getItem("User_name");
document.getElementById("User_Name").innerHTML = ("Welcome " + Name + "!");

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("Room Name - " + Room_names);
            row = "<div class = 'room_name' id=" + Room_names + "onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}
getData();

function Logout() {
    localStorage.removeItem("User_name");
    localStorage.removeItem("Room_name");
    window.location = "index.html";
}

function addRoom() {
    Room_Name = document.getElementById("Room_Name").value;
    firebase.database().ref("/").child(Room_Name).update({
        purpose: "adding room name"
    });
    localStorage.setItem("Room_name", Room_Name);
    window.location = "kwitter_page.html";
}

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("Room_name", name);
    window.location = "kwitter_page.html"
}
