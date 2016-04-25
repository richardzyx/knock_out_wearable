var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'ahEjU-BFS8c',
    playerVars: {'iv_load_policy': 3, 'autoplay': 0},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
var time_recorded = "0:0";
function onPlayerStateChange(event) {

  if(event.data==1) { // playing
      var myTimer = setInterval(function(){ 
          var time;
          time = player.getCurrentTime();
          if(string_to_second(formatTime(time)) != string_to_second(time_recorded)){
              console.log("in if loop");
              time_recorded = formatTime(time);
              $("#current-time").text(time_recorded);
              var socket = io('http://tuftsknockout.herokuapp.com/');
              socket.emit('time', { time: time_recorded });
          }
      }, 100);
  }
  else { // not playing
      clearInterval(myTimer);
  }
}
function stopVideo() {
  player.stopVideo();
}

function string_to_second(time_string){
    var times = time_string.split(":");
    var minutes = times[0];
    var seconds = times[1];
    seconds = parseInt(seconds, 10) + (parseInt(minutes, 10) * 60);
    return seconds
}

function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}
