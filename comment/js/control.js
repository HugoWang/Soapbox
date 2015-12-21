var audience = new Audience();
window.current = false;

audience.connect(function () {
	audience.onreceivespeechinfo = function (speech_info) {
		window.current = true;
		console.log(window.current);
		if (speech_info.hasOwnProperty('topic')) {
			var topic = speech_info.topic;
			document.getElementById("ad_getTopic").innerHTML = topic;
			document.getElementById("get_topic").innerHTML = topic;
		}
		if (speech_info.hasOwnProperty('speaker')) {
			var speaker = speech_info.speaker;
			document.getElementById("ad_getSpeaker").innerHTML = speaker;
			document.getElementById("get_speaker").innerHTML = speaker;
		}
		if (speech_info.hasOwnProperty('lefttime')) {
			var lefttime= speech_info.lefttime;
			document.getElementById("get_time").innerHTML = lefttime;
		}	
	}
	audience.get_speech_info();
});	

function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 6;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

function indexToComment(){
	console.log(window.current);
	if (window.current == true){
		location.href="#commentPage";
	}
    else{
		alert("No current speech yet!");
	}
}

function indexToSchedule(){
    location.href="#schedulePage";
	
}

function indexToReserve(){
    location.href="#reservePage";
}


function webSubmit(){
	var topic = document.getElementById("topic").value;
	var speaker= document.getElementById("speakername").value;
	var time = document.getElementById("lefttime").value;
	if(topic == "" || speaker == "" || time == ""){
		alert("You need to fill all the information!");
	}
	else{
		document.getElementById("password").value = randomString();
		var formValues = $('input[type=text]');
		var speech_info= {};
		$.map(formValues, function(n, i) {
			speech_info[n.name] = $(n).val();
		});
		alert("Submited successfully!");
		audience.submit(speech_info);
	}
}


function sendComment(){
	var username = document.getElementById("user_name").value;
	var comment = document.getElementById("user_comment").value;
	if ((username == "") || (comment == "")){
		alert("You need to fill both of them!")
	}
	else{
			//You can comment here 
		audience.comment(username, comment);
		alert("Sent successfully!")
	}
}

function like(){
	document.getElementById("likeBtn").src="images/like2.png";
	document.getElementById("likeBtn").disabled = true;
	audience.like();
	alert("You liked it!");
}

function dislike(){
	document.getElementById("dislikeBtn").src="images/dislike3.png";
	document.getElementById("dislikeBtn").disabled = true;
	audience.dislike();
	alert("You disliked it!");
}
