function SAY_GOOD() {
    var d = new Date();
    var time = d.getHours();
    var x;

    // document.getElementById("hello").innerHTML="HELLO!";
    if (time < 10) {
        x="GOOD MORNING!";
    }else if(time >=10 && time<20){
        x="HAVE A NICE DAY!";
    }else {
        x="GOOD NIGHT!";
    }
    document.getElementById("hello").innerHTML=x;
}

function ZOU() {
    var d = new Date().getDay();
    switch (d) {
        case 0:
            x = "今天是星期日";
            break;
        case 1:
            x = "今天是星期一";
            break;
        case 2:
            x = "今天是星期二";
            break;
        case 3:
            x = "今天是星期三";
            break;
        case 4:
            x = "今天是星期四";
            break;
        case 5:
            x = "今天是星期五";
            break;
        case 6:
            x = "今天是星期六";
            break;
    }
    document.getElementById("yes").innerHTML = x;

}

function Free_Day(){
    var d=new Date().getDay();
    switch (d){
        case 6:x="Today is Saturday."
            break;
        case 0:x="Today is Sunday."
            break;
        default:
            x="HOPE WEEKDAY!"
    }
    document.getElementById("hello").innerHTML=x;
}
