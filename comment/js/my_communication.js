var ws = new SockJS('http://localhost:15674/stomp');
var client = Stomp.over(ws);

// logs1 & logs2 comes from server, we don't need to define them. "exchange" must exist.
var send_queue = "/exchange/logs1";
var receive_queue = "/exchange/logs2"

// SockJS does not support heart-beat: disable heart-beats
client.heartbeat.outgoing = 0;
client.heartbeat.incoming = 0;

var on_connect = function(x) {
    console.log("connected");
    //The queue will be auto deleted once the website is closed
    client.subscribe(receive_queue, on_message);
};

var on_error =  function(e) {
    console.log('error');
};

// This will be called upon arrival of a message, "available" is the key word in the json file.
function on_message(m) {
    console.log("ResponsedText");
    var msg = JSON.parse(m.body);
	
	if (msg.hasOwnProperty('available')){
		var userResponse = msg.available;
		if (userResponse){
			document.getElementById("available").innerHTML = "Valid username!";
			registerName.parentNode.classList.remove('invalid');
		}
		else{
			document.getElementById("available").innerHTML = "The username is existed!";
			registerName.parentNode.classList.add('invalid');
		}
	}
	
	if (msg.hasOwnProperty('registerResult')){
		var result = msg.registerResult;
		var getName = msg.username;
		if (result){
			document.getElementById("showUsername").value = getName;
			location.href="comment.html";
		}
		else{
			document.getElementById("available").innerHTML = "Register failed, please try again.";
		}
	}
	
	if (msg.hasOwnProperty('commentResponse')){
		var cResponse = msg.commentResponse;
		if (cResponse){
			alert("Sent successfully!");
		}
		else{
			alert("Sent failed, please try again!");			
		}
		$('#sendComment').prev('.ui-btn-inner').children('.ui-btn-text').html('Send');
	}
	
}

function send_message(type, username, comment, timestamp) {
    var msgObj = {
        "type": msgType,
        "username": username,
		"comment": comment,
		"timestamp": timestamp
    }
    client.send(send_queue, {},  JSON.stringify(msgObj));
}

window.onload = function() {
    client.connect('guest', 'guest', on_connect, on_error, '/');
}