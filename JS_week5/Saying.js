function SAY_GOOD() {
    var d = Date();
    var time = d.getHours();
    document.getElementById("hello").innerHTML="HELLO!";
    if (time < 10) {
        document.getElementById("hello").innerHTML="GOOD MORNING!";
    }else if(time >=10 && time<20){
        document.getElementById("hello").innerHTML="HAVE A NICE DAY!";
    }else {
        document.getElementById("hello").innerHTML="GOOD NIGHT!";
    }
}