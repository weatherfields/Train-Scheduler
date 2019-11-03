const firebaseConfig = {
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

//reference the firebase database
const database = firebase.database();
// let trainSchedule = database.ref("/trainschedule");

// just to make sure moment.js is working.
let timeNow = moment().format("MMMM Do YYYY, h:mm a");
// console.log(timeNow);
// click function for submit button
$(document).ready(function() {
    $("#add-train").on("click", function(event) {
        event.preventDefault();
        
        // variables for the input fields
        let trainName = $("#train-input").val().trim();
        let trainDestination = $("#destination-input").val().trim();
        let firstTrainTime = $("#first-train").val().trim();
        // make string integer
        let frequency = $("#frequency-input").val().trim();
        // create the first train time to be 1 day prior:
        let firstTTmoved = moment(firstTrainTime, "HH:mm").subtract(1, "days");
        // to get the difference in minutes 
        let ttDiff = moment().diff(moment(firstTTmoved), "minutes");
        let timeModulo = ttDiff % frequency;
        let minutesAway = frequency - timeModulo;
        let nextArrival = moment().add(minutesAway, "minutes").format("hh:mm")
        
        // push new train info to firebase.
        database.ref().push({
            name: trainName,
            destination: trainDestination,
            firstTT: firstTrainTime,
            frequency: frequency,
            minutesAway: minutesAway,
            nextArrival: nextArrival,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
            // TIMESTAMP: A placeholder value for auto-populating the current timestamp (since unix epoch).
            // ServerValue: a placeholder value container (is the way I understand it).
            // unixTime: firebase.database.ServerValue.TIMESTAMP // time since the Unix epoch, in milliseconds) as determined by the Firebase servers. https://firebase.google.com/docs/reference/js/firebase.database.ServerValue
        });
        // clears inputs
        $("#train-input").val("");
        $("#destination-input").val("");
        $("#first-train").val("");
        $("#frequency-input").val("");
        
        }); 
        // end of click function
        // i need to create a child
        // add to html
        database.ref().on("child_added", function(childSnapshot){ 
            $("#tschedule-table > tbody").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + childSnapshot.val().nextArrival + "</td><td>" + childSnapshot.val().minutesAway + "</td></tr>");
        });
    });
    // Notes and code that I ended up replacing/rewriting
    // MOMENT.JS NOTES
    
    // (m.toString()); toString will display current date and time
    
    // Unix time https://en.wikipedia.org/wiki/Unix_time
    // Put simply, Unix time is the amount of seconds past since jan 1 1970
    // using Unix seconds
    // const m = moment.unix(86400);
    // const m = moment();
    // console.log(m);
    
    // getting units
    
    // console.log(m.toString());
    // console.log(m.minutes());
    // console.log(m.hour());
    // console.log(m.week());
    
    // setting units
    
    // let m = moment.duration(1, "day"); would set a duration of 1 day. can also be used for hours mins secs ...
    // .humanize would give plain english results
    // m.minutes(44);
    // m.hour(10);
    // m.week(20);
    // m.set("day", 6);
    
    // From & fromNow // 
    // const m = moment();
    // const m2 = moment("01/01/2019");
    // console.log(m2.from(m));
    
    // calendar time 
    // console.log(m.calendar());
    // calendar will output time we're used to seeing
    
    // isSame to check if a date is the same as another one. returns boolean
    // isBefore check to see if date comes before another 
    //isBetween check to see if one date is between two others
    
    // console.log(m.toString());
    //compare moment objects
    // const differentMoment = moment("11/25/2019");
    // console.log(moment.min(moment(), differentMoment).toString());
    // create from ISO 8601 string
    //  m = moment('2019-10-31');
    
    // parse using format 
    // m = moment("10/10/2019 9:01pm", "MM/DD/YYYY h:mmA");
    // console.log(m);
    
    // Manipulating moments
    // let m = moment("10/10/2019 12:01pm", "MM/DD/YYYY hh:mmA");
    
    // console.log(m.format("MM dd YYYY"));
    // console.log(`Original Moment: ${m.toString()}`);
    
    // console.log(m.format('L')); // will show date as todays date. ex 1/1/2019
    
    // m.add(4, 'hours'); // adds four hours to Original Moment
    // m.add(7, "hours").add(15, "minutes"); // adds 7 hours and 15 mins
    // m.add({
        //     "hours": 7,
        //     "minutes": 15
        //       });   // also adds 7 hours and 15 mins
        // m.subtract({  // Subtracts 7 and 15
        //     "hours": 7,
        //     "minutes": 15
        // })
        // m.startOf("year"); sets time to start of the year
        // m.endOf("day"); sets time to end of the day
        // console.log(`After Manipulation: ${m.toString()}`);
        // 
        // let trainInfo = snapshot.val().trainInfo;
        // let trainName = trainInfo.name;
        // let trainDestination = trainInfo.destination;
        // let firstTrainTime = trainInfo.firstTT;
        // let FreqInput = trainInfo.frequency;

        // let trainName = childSnapshot.val().name;
        // let trainDestination = childSnapshot.val().destination;
        // let firstTrainTime = childSnapshot.val().firstTT;
        // let FreqInput = childSnapshot.val().frequency;
// don't refresh page
        // $("input").val('');
        // return false
// console.log(firebase.database());