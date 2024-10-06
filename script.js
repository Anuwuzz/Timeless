//clock//
  window.addEventListener('load', (event) => {
    let clock;

    clock = $('.clock').FlipClock(0, {
      clockFace: 'HourlyCounter', 
      countdown: false,           
      showSeconds: true
    });

    function updateClock() {

      const currentDate = new Date();
      
      const timeInSeconds = currentDate.getHours() * 3600 + currentDate.getMinutes() * 60 + currentDate.getSeconds();
      
      clock.setTime(timeInSeconds);
    }

    updateClock();
    
    setInterval(updateClock, 1000); 
  });

//stopwatch//
  var timer = document.getElementById("timer");
  var toggleBtn = document.getElementById("toggle");
  var resetBtn = document.getElementById("reset");

  var watch = new Stopwatch(timer);

toggleBtn.addEventListener("click", function () {
  if (watch.isOn) {
    watch.stop();
    toggleBtn.textContent = "Start";
  } else {
    watch.start();
    toggleBtn.textContent = "Stop";
  }
});

resetBtn.addEventListener("click", function () {
  watch.reset();
});

function Stopwatch(elem) {
  var time = 0; 
  var interval;
  var offset;

  function update() {
    if (this.isOn) {
      time += delta(); 
    }
    var formattedTime = timeFormatter(time); 
    elem.innerHTML = formattedTime; 
  }

  function delta() {
    var now = Date.now();
    var timePassed = now - offset;
    offset = now;
    return timePassed; 
  }

  function timeFormatter(timeInMilliseconds) {
    // Calculate minutes, seconds, and milliseconds
    var totalSeconds = Math.floor(timeInMilliseconds / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    var milliseconds = timeInMilliseconds % 1000;

    // Format the time with leading zeros
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    milliseconds = Math.floor(milliseconds / 10); 
    if (milliseconds < 10) {
      milliseconds = "0" + milliseconds;
    }

    return minutes + ":" + seconds + "." + milliseconds; 
  }

  this.isOn = false; 
  this.start = function () {
    if (!this.isOn) {
      interval = setInterval(update.bind(this), 10); 
      offset = Date.now();
      this.isOn = true; 
    }
  };
  
  this.stop = function () {
    if (this.isOn) {
      clearInterval(interval); 
      interval = null;
      this.isOn = false; 
    }
  };
  
  this.reset = function () {
    if (!this.isOn) {
      time = 0; 
      update(); 
    }
  };
}
  
// links //
function showSection(sectionId) {
    document.getElementById('clock-section').style.display = 'none';
    document.getElementById('stopwatch-section').style.display = 'none';
    document.getElementById('pomodoro-section').style.display = 'none';

    document.getElementById(sectionId).style.display = 'block';
}

document.getElementById('clock-link').addEventListener('click', function() {
    showSection('clock-section');
});

document.getElementById('stopwatch-link').addEventListener('click', function() {
    showSection('stopwatch-section');
});

document.getElementById('pomodoro-link').addEventListener('click', function() {
    showSection('pomodoro-section');
});

//adjustments//
function toggleHeaderVisibility() {
  const header = document.querySelector('.header'); 
  const mainContent = document.querySelector('main'); 
  
  if (window.innerHeight < 300) {
      header.style.display = 'none';
      mainContent.style.bottom = '0'; 
  } else {
      header.style.display = 'flex'; 
      mainContent.style.bottom = '40px'; 
  }
}

window.addEventListener('resize', toggleHeaderVisibility);

toggleHeaderVisibility();