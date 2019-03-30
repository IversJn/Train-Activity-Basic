
var config = {
    apiKey: "AIzaSyDuEep9a-T_dWNzTGgU0njHFArqS1VCZ4k",
    authDomain: "train-schedule-dd1f2.firebaseapp.com",
    databaseURL: "https://train-schedule-dd1f2.firebaseio.com",
    projectId: "train-schedule-dd1f2",
    storageBucket: "",
    messagingSenderId: "700130475381"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trnName = $("#train-name-input").val().trim();
    var trnDestination = $("#destination-input").val().trim();
    var trnFirst = $("#first-input").val().trim();
    var trnFrequency = $("#frequency-input").val().trim();
  
    var newTrain = {
      name: trnName,
      destination: trnDestination,
      first: trnFirst,
      frequency: trnFrequency
    };
  
    database.ref().push(newTrain);
  
    alert("Train successfully added");
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {

    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var trnFirst = childSnapshot.val().first;
    var trnFrequency = childSnapshot.val().frequency;
  
   

    var firstTimeConverted = moment(trnFirst, "HH:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % trnFrequency;

    var tMinutesTillTrain = trnFrequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    var newRow = $("<tr>").append(
      $("<td>").text(trnName),
      $("<td>").text(trnDestination),
      $("<td>").text(trnFrequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain)
    );
  
    $("#train-table > tbody").append(newRow);
  });
  
