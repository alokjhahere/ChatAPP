
socket.emit("userConnected", username);

socket.on("join", function (dataObj) {
  let joinDiv = document.createElement("div");
  joinDiv.classList.add("join");
  joinDiv.classList.add("chat");
  joinDiv.textContent = `${dataObj.username} joined chat`;
  chatwindow.append(joinDiv);
  chatwindow.scrollTop = chatwindow.scrollHeight;
  addInOnlineList(dataObj);


})

socket.on("userDisconnected", function (dataObj) {
  let leaveDiv = document.createElement("div");
  leaveDiv.classList.add("leave");
  leaveDiv.classList.add("chat");
  leaveDiv.textContent = `${dataObj.username} left chat`;
  chatwindow.append(leaveDiv);
  deleteFromOnlineList(dataObj.id);
  chatwindow.scrollTop = chatwindow.scrollHeight;

})

socket.on("leftChat", function (chatObj) {
  let chatDiv = document.createElement("div");
  chatDiv.classList.add("chat");
  chatDiv.classList.add("left");
  chatDiv.textContent = chatObj.username + " : " + chatObj.chat;
  chatwindow.append(chatDiv);
  chatwindow.scrollTop = chatwindow.scrollHeight;

})

socket.on("online-list", function (userList) {
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id != socket.id) {
      let userDiv = document.createElement("div");
      userDiv.classList.add("user");
      userDiv.setAttribute("id", userList[i].id);

      userDiv.innerHTML = `<div class="user-image">
              <img src="./default.png" alt="user Image" />
            </div>
            <div class="user-name">${userList[i].username}</div>`


      onlineList.append(userDiv);
    }

  }
  // < div class="user" >
  // <div class="user-image">
  //   <img src="./default.png" alt="user Image" />
  // </div>
  // <div class="user-name">Ravi</div>
  // </div > 
})

function deleteFromOnlineList(id) {
  document.querySelector(`#${id}`).remove();

}


function addInOnlineList(userObj) {
  let userDiv = document.createElement("div");
  userDiv.classList.add("user");
  userDiv.setAttribute("id", userObj.id);

  userDiv.innerHTML = `<div class="user-image">
              <img src="./default.png" alt="user Image" />
            </div>
            <div class="user-name">${userObj.username}</div>`


  onlineList.append(userDiv);
}