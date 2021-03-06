$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBQkT7cHktBGCqeDIAm0DFD5A8e-sNp0Mw",
        authDomain: "rockpaperscissorslizards-58ec1.firebaseapp.com",
        databaseURL: "https://rockpaperscissorslizards-58ec1.firebaseio.com",
        projectId: "rockpaperscissorslizards-58ec1",
        storageBucket: "rockpaperscissorslizards-58ec1.appspot.com",
        messagingSenderId: "598763734331"
      };
      firebase.initializeApp(config);
   var database = firebase.database();
   
   // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
   var computerChoices = ["r", "p", "s", "l", "k"];
   var player1 = "";
   var player2 = "";
   var user1Guess = "";
   var user2Guess = "";
   var user1Wins = 0;
   var user1Losses = 0;
   var user2Wins = 0;
   var user2Losses = 0;
   var user1GetsTied = 0;
   var user2GetsTied = 0;
   var user1Name = "";
   var user2Name = "";
   
   // Attach a listener to the database /players/ node to listen for any changes
   database.ref("/players/").on("value", function(snapshot) {
       // Check for existence of player 1 in the database
       if (snapshot.child("player1").exists()) {
           console.log("Player 1 exists");
   
       } else {
           console.log("Player 1 does NOT exist");
   
      
       if (snapshot.child("player2").exists()) {
           console.log("Player 2 exists");
   
       } else {
           console.log("Player 2 does NOT exist");
   
      
   
       // If both players are now present, it's player1's turn
       if (player1 && player2) {
           // Update the display with a green border around player 1
           $("#playerPanel1").addClass("playerPanelTurn");
   
           // Update the center display
           $("#waitingNotice").html("Waiting on " + user1Name + " to choose...");
       }
   
       // If both players leave the game, empty the chat session
       if (!player1 && !player2) {
         
       }
   });
   
   // Attach a listener that detects user disconnection events
   database.ref("/players/").on("child_removed", function(snapshot) {
       var msg = snapshot.val().name + " has disconnected!";
   
 
   });
   
   function runGuesses() {
   // Randomly chooses a choice from the options array. This is the Computer's guess.
   user2Guess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
   
   // Alerts the Computer's guess.
   alert("Computer guess: " + user2Guess);
   
   }
   
   $(".choice").on("click", function(event) {
       event.preventDefault();
       user1Guess = $(this).attr("data-name");
       alert("User guess: " + user1Guess);
       runGame();
   })
   
   $("#add1player").on("click", function(event) {
       event.preventDefault();
       user1Name = $("#player1-input").val().trim();
       // form.reset();
       database.ref().child("/players/player1").push(user1Name);
       database.ref("/players/player1").onDisconnect().remove();
   })
   
   $("#add2player").on("click", function(event) {
       event.preventDefault();
       user2Name = $("#player2-input").val().trim();
       // form.reset();
       database.ref().child("/players/player2").push(user2Name);
       database.ref("/players/player2").onDisconnect().remove();
   })
   
   function runGame() {
   
       runGuesses();
       if (user1Guess == user2Guess)  //condition 1
           userTied();
           else if (user1Guess == "r") //condition 2
               if (user2Guess == "s") 
                   // alert("User wins");
                   user1Won();
               else if (user2Guess == "l")
                   // alert("User wins");
                   user1Won();
               else 
                   // alert("User2 wins");
                   user2Won();
       
           else if (user1Guess == "p") //condition 3
               if (user2Guess == "r") 
                   // alert("User wins");
                   user1Won();
               else if (user2Guess == "k")
                   // alert("User wins");
                   user1Won();
               else 
                   // alert("User2 wins");
                   user2Won();
       
           else if (user1Guess == "s")
               if (user2Guess == "p")
                   // alert("User wins");
                   user1Won();
               else if (user2Guess == "l")
                   // alert("User wins");
                   user1Won();
               else 
                   // alert("User2 wins");
                   user2Won();
   
           else if (user1Guess == "l")
               if (user2Guess == "p")
                   // alert("User wins");
                   user1Won();
               else if (user2Guess == "k")
                   // alert("User wins");
                   user1Won();
               else
                   // alert("User2 wins");
                   user2Won();
   
           else if (user1Guess == "k")
               if (user2Guess == "r")
                   // alert("User wins");
                   user1Won();
               else if (user2Guess == "s")
                   // alert("User wins");
                   user1Won();
               else
                   // alert("User2 wins");
                   user2Won();
   
   }
   
   function user1Won() {
       database.ref().child("/players/" + user1Name + "/win").set(user1Wins++);
       database.ref().child("/players/" + user2Name + "/lose").set(user2Losses++);
   }
   
   function user2Won() {
       database.ref().child("/players/" + user1Name + "/lose").set(user1Losses++);
       database.ref().child("/players/" + user2Name + "/win").set(user2Wins++);
   }
   
   function userTied() {
       database.ref().child("/players/" + user1Name + "/tie").set(user1GetsTied++);
       database.ref().child("/players/" + user2Name + "/tie").set(user2GetsTied++)
   }
   
   });