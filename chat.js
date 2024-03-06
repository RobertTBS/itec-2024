let startX = 0; // Start X position for both touch and mouse events
let endX = 0; // End X position for both touch and mouse events
let channelsOpen = false;
let usersOpen = false;

// Function to handle the start of a swipe or drag
function handleStart(event) {
  // Check if the event target is an input or textarea
  if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
    return; // Exit the function early if editing an input or textarea
  }
  startX = event.type.includes("touch")? event.touches[0].clientX: event.clientX;
}

// Function to handle the end of a swipe or drag
function handleEnd(event) {
  // Check if the event target is an input or textarea
  if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
    return; // Exit the function early if editing an input or textarea
  }
  endX = event.type.includes("touch")? event.changedTouches[0].clientX: event.clientX;
  handleGesture();
}

function handleGesture() {
  if (endX - startX > 75 || startX - endX > 75) {
    if (endX > startX) {
      // Swipe right
      if (!channelsOpen && !usersOpen) {
        document.getElementById("channelListContainer").style.left = "2%";
        channelsOpen = true;
      }
      if (usersOpen && !channelsOpen) {
        document.getElementById("userListContainer").style.right = "-23%";
        usersOpen = false;
      }
    } else {
      //Left swipe
      if (!usersOpen && !channelsOpen) {
        document.getElementById("userListContainer").style.right = "2%";
        usersOpen = true;
      }
      if (channelsOpen && !usersOpen) {
        document.getElementById("channelListContainer").style.left = "-23%";
        channelsOpen = false;
      }
    }
  }
}
// Add touch event listeners
document.addEventListener("touchstart", handleStart, false);
document.addEventListener("touchend", handleEnd, false);

// Add mouse event listeners
document.addEventListener("mousedown", handleStart, false);
document.addEventListener("mouseup", handleEnd, false);



//LOGIN AND ACCOUNT

if (localStorage.getItem("uname") != null){
  document.getElementById("uname").innerHTML = localStorage.getItem("uname");
}
if (localStorage.getItem("icon") != null){
  document.getElementById("user-icon").src = localStorage.getItem("icon");
  document.getElementById("no-user-icon").style.display = "none";
}
if (localStorage.getItem("admin") != null && localStorage.getItem("admin") != false){
  document.getElementById("isAdmin").style.display = "";
}

function logout(){
  localStorage.clear();
  location.reload();
}

//Channels

function switchChannel(channel){
  console.log(channel);
}

//Prefrences

function shortenFileName(){
  console.log("Changed!");
  if (document.getElementById("filename").innerHTML.length > 19){
    document.getElementById("filename").innerHTML = document.getElementById("filename").innerHTML.substring(0,16)+"...";
  }
}

//File uploads

function uploadYoutube(that){
  const url = prompt("Youtube video link");
  if (!url) return;
  const idArr = url.split("watch?v=");
  if (idArr.length == 1) return;
  send('<iframe style="width:20%;" src="https://www.youtube.com/embed/'+idArr[1]+' title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>')
}

//Sending

function send(){}