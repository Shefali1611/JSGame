
//Variable declarations
var latterOccurrence = {};
var cells = document.querySelectorAll('#myTable td');
var clickedCells = 0;
var timer;
var score = 0;
var highScore = localStorage.getItem('highScore') || 0;
document.getElementById('highScore').textContent = highScore;
var charOccurrences = {};
var uniqueAlphabets = [];
var clicked = false;




// Function to display alphabet occurrences
function displayAlphabetOccurrences() {
  debugger
  var alphabetOccurrences = document.getElementsByClassName('alphabetOccurrences')[0];
  alphabetOccurrences.innerHTML = '';
  var table = document.createElement('TABLE');
  var tbody = document.createElement('TBODY');
  var tr = document.createElement('TR');
  table.appendChild(tbody);
  for (var alphabet in charOccurrences) {
    var count = charOccurrences[alphabet];
    for (var i = 0; i < alphabet.length; i++) {
      var tr = document.createElement('TR');
      var td1 = document.createElement('TD');
      var td2 = document.createElement('TD');
      td1.appendChild(document.createTextNode(alphabet[i]));
      td2.appendChild(document.createTextNode(count));
      tr.appendChild(td1);
      tr.appendChild(td2);
      tbody.appendChild(tr);
    }
  }
  alphabetOccurrences?.appendChild(table);
}



// Function to fill the table with random alphabets
function fillTableWithAlphabets() {
  debugger
  clickedCells = 0;
  uniqueAlphabets = [];
  charOccurrences = {};
  var cells = document.querySelectorAll('#myTable td');
  // Keep track of how many characters have occurred three times
  var threeOccurrencesCount = 0;
  cells.forEach(function (cell) {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var alphabet;
    do {
      alphabet = alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    } while (charOccurrences[alphabet] && charOccurrences[alphabet] >= 3);
    charOccurrences[alphabet] = (charOccurrences[alphabet] || 0) + 1;
    // If the alphabet has occurred three times, don't allow it to occur again
    if (charOccurrences[alphabet] === 3) {
      threeOccurrencesCount++;
      if (threeOccurrencesCount > 2) {
        // If two characters have already occurred three times, decrement the count and choose another alphabet
        charOccurrences[alphabet]--;
      }
    }
    cell.textContent = alphabet;
    if (!uniqueAlphabets.includes(alphabet)) {
      uniqueAlphabets.push(alphabet);
    }
  });
  // Display alphabet occurrences
  var totalCount = 0;
  for (var alphabet in charOccurrences) {
    var count = charOccurrences[alphabet];
    totalCount += count;
  }
  console.log("Total occurrences:", totalCount);
  displayAlphabetOccurrences();
}


// Function to update score and high score
function updatescoreAndHighScore() {
  debugger
  score++;
  document.getElementById('score').textContent = score;

  // Update high score if necessary
  if (score > highScore) {
    highScore = score;
    document.getElementById('highScore').textContent = highScore;
    localStorage.setItem('highScore', highScore);
  }
}



// Function to start the countdown
function startCountdown() {
  clearInterval(timer);
  var seconds = 20;
  var countdownSpan = document.getElementById('countdownSpan');
  countdownSpan.textContent = seconds
  timer = setInterval(function () {
    seconds--;
    countdownSpan.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(timer);
      alert('Game over!! Your time is up.');
      clearTable();
    }
  }, 1000);
}



function cellclicllistner(event) {
  startCountdown(20);
  debugger
  var cell = event.target;
  if (event.target.textContent === '') {
    return;
  }
  if (event.target.tagName === 'TD') {
    // Check if the clicked cell is the same as the previous one
    if (latterOccurrence[event.target.textContent] && latterOccurrence[event.target.textContent] >= 1) {
      clearInterval(timer);
      alert('Game is over');
      clearTable();
      return;
    }
    // Update varter occurrences using ternary 
    latterOccurrence[event.target.textContent] = (latterOccurrence[event.target.textContent] || 0) + 1;

    // Update score and high score
    updatescoreAndHighScore();

    clickedCells++;
    if (clickedCells === uniqueAlphabets.length) {
      clearInterval(timer);
      alert('Task completed!');
      clearTable();
      return
    }
  }
}


function clearTable() {
  debugger
  cells.forEach(function (cell) {
    cell.textContent = '';
    latterOccurrence = {};
    clickedCells = 0;
    document.getElementById('score').textContent = 0;
    document.getElementById('countdownSpan').textContent = 20;
    document.getElementsByClassName('alphabetOccurrences')[0].innerHTML = '';
    return;
  });
}


function resetGame() {
  if (clickedCells != 0) {
    clearInterval(timer);
    alert('Game is over');
    document.getElementsByClassName('alphabetOccurrences')[0].innerHTML = '';
    clearTable();
    return;
  }
}


// document.getElementById('startButton').addEventListener('click', function () {
//   clicked = true;
//   console.log(clicked); 
//   score = 0;
//   document.getElementById('score').textContent = score;
//   startCountdown(20);
// });
document.getElementById('startButton').addEventListener('click', function () {
  clicked = true;
  console.log(clicked); 
  score = 0;
  document.getElementById('score').textContent = score;

  fillTableWithAlphabets(); // 👈 ADD THIS LINE
  startCountdown(20);
});
document.getElementById('myTable').addEventListener('click', cellclicllistner);
document.getElementById('cancelButton').addEventListener('click', resetGame);





