const firebaseConfig = {
    apiKey: "AIzaSyAs0su1SC9BoU5hKeYHpzeHMvz6fvxQSwQ",
    authDomain: "train-scheduler-3d51f.firebaseapp.com",
    databaseURL: "https://train-scheduler-3d51f.firebaseio.com",
    projectId: "train-scheduler-3d51f",
    storageBucket: "train-scheduler-3d51f.appspot.com",
    messagingSenderId: "685538040692",
    appId: "1:685538040692:web:e35a0fb29a56f26bc5aa21",
    measurementId: "G-HY99ZDF0H8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //reference the firebase database
let database = firebase.database();

// click function for submit button
$(document).ready(function() {
$("#submit").on("click", function(event) {
    event.preventDefault();

// variables for the input fields
let trainName = $("#train-input").val().trim();
let trainDestination = $("#destination-input").val().trim();
let firstTrainTime = $("#first-train").val().trim();
let FreqInput = $("#frequency-input").val().trim();

// new train info
let trainInfo = {
    name: trainName,
    destination: trainDestination,
    firstTT: firstTrainTime,
    frequency: FreqInput
};

// push new train info to firebase, set would overwrite.
database.ref("/NewTrain").push({
    trainInfo
});
// clears inputs
$("#train-input").val("");
$("#destination-input").val("");
$("#first-train").val("");
$("#frequency-input").val("");

}); // end of click function

}); // endo of Jquery

 // var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
    // starCountRef.on('value', function(snapshot) {
    //   updateStarCount(postElement, snapshot.val());
    // });
    // used .update instead of .set because set deletes everything that came before it.
    // let curentTime = Dat.now();
    // let ref = firebase.database().ref('timestamp').update({
    //     [currentTime] : true