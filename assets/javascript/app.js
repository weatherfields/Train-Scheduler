// $(document).ready(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyAs0su1SC9BoU5hKeYHpzeHMvz6fvxQSwQ",
        authDomain: "train-scheduler-3d51f.firebaseapp.com",
        databaseURL: "https://train-scheduler-3d51f.firebaseio.com",
        projectId: "train-scheduler-3d51f",
        storageBucket: "train-scheduler-3d51f.appspot.com",
        messagingSenderId: "685538040692",
        appId: "1:685538040692:web:e35a0fb29a56f26bc5aa21"
        // measurementId: "G-HY99ZDF0H8"
      };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
console.log(firebase.database());
  //reference the firebase database
var database = firebase.database();
// let trainSchedule = database.ref("/trainschedule");

// click function for submit button
$("#add-train").on("click", function(event) {
    event.preventDefault();

// variables for the input fields
let trainName = $("#train-input").val().trim();
let trainDestination = $("#destination-input").val().trim();
let firstTrainTime = $("#first-train").val().trim();
let FreqInput = $("#frequency-input").val().trim();

// new train info Object
let trainInfo = {
    name: trainName,
    destination: trainDestination,
    firstTT: firstTrainTime,
    frequency: FreqInput
};
// push new train info to firebase, set would overwrite.
database.ref().push(trainInfo);

console.log("train name", trainInfo.name);
console.log("train destination", trainInfo.destination);
console.log("train first Train Time", trainInfo.firstTT);
console.log("train frequency", trainInfo.frequency);

// clears inputs
$("#train-input").val("");
$("#destination-input").val("");
$("#first-train").val("");
$("#frequency-input").val("");

// database.ref().push(
//     trainInfo);
}); 
// end of click function


// i need to create a child
// hopefully add to html and firebase
database.ref().on("child_added", function(childSnapshot, prevChildKey){
    
    
    // let trainName = childSnapshot.val().name;
    // let trainDestination = childSnapshot.val().destination;
    // let firstTrainTime = childSnapshot.val().firstTT;
    // let FreqInput = childSnapshot.val().frequency;
    
    // 
    let trainInfo = snapshot.val().trainInfo;
    let trainName = trainInfo.name;
    let trainDestination = trainInfo.destination;
    let firstTrainTime = trainInfo.firstTT;
    let FreqInput = trainInfo.frequency;
    
    // some sort of function involving moment.js???
    
    $("#tschedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + firstTrainTime + "</td><td>" + FreqInput + "</td></tr>");
});
// });
 

 // var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
    // starCountRef.on('value', function(snapshot) {
    //   updateStarCount(postElement, snapshot.val());
    // });
    // used .update instead of .set because set deletes everything that came before it.
    // let curentTime = Dat.now();
    // let ref = firebase.database().ref('timestamp').update({
    //     [currentTime] : true

    // trainTime.text(moment(nextTrain).format("HH:mm"));