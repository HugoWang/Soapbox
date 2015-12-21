/*
var likeObject = {
  value: 0,
  increment: function (inc) {
                    this.value += typeof inc === 'number' ? inc : 1;
           }
};

var dislikeObject = {
  value: 0,
  increment: function (inc) {
                    this.value += typeof inc === 'number' ? inc : 1;
           }
};
*/

window.setInterval(function() {
  var elem = document.getElementById('listofcomments');
  elem.scrollTop = elem.scrollHeight;
}, 1000);

function reportSpeech(){
	var d = document.getElementById("report");
	tempAlert("The speech was reported!",2000);
	hotspot.report();
}

function tempAlert(msg,duration){
     var el = document.createElement("div");
     el.setAttribute("style","position:absolute;top:40%;left:40%;width:300px;height:80px;line-height:80px;opacity: 0.8;color:white;font-size:150%;border-radius: 7px;text-align:center;background-color:red;");
     el.innerHTML = msg;
     setTimeout(function(){el.parentNode.removeChild(el);},duration);
     document.body.appendChild(el);
}

