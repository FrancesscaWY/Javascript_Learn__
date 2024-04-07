// console.log('Data Type');
// function isArray(myArray){
//     return myArray.constructor.toString().indexOf("Array")>-1;
// }
// var fruits= ["Banana", "Orange", "Apple", "Mango"];
// document.getElementById("constructor..").innerHTML = isArray(fruits);



var f=2;
var t=2;
var color=["Orange","Blue","Red","Cyan Blue","Green"];
var type=["Sedan","SUV","Coupe","Hatchback","Convertible","Wagon"];
//why not show always show the result??
var Car ={
    name:"Disco",
    age: 20,
    change_color: function(){
        if(f>5){
            f=1;
        }
        let text=`<video autoplay loop width=100% height=100%> <source src="src/video/car`+f+`.mp4" type="video/mp4"></video>`;
        let text_color=`<h1>The Car's Color is `+color[f-2]+`!</h1>`;
        document.getElementById("car_type").innerHTML=text_color;
            document.getElementById("car_color").innerHTML=text;
            f++;
    },
    changeType: function(){
        // document.getElementById("car_type").style.backgroundColor="black";
        if(t>6){
            t=1;
        }
        let text1=`<img src="src/picture/type`+t+`.svg" width=100% height=100% alt="There is no type.">`;
        let text_type=`<h1>The Car's Type is `+type[t-2]+`!</h1>`;
        document.getElementById("car_type").innerHTML=text1;
        document.getElementById("car_color").innerHTML=text_type;
        t++;
    }
}

function FIRST_love(){
    var str="I love you.";
    var n=str.search(/LOVE/i);
    document.getElementById("love").innerHTML=n;
}
function PLACE_love(){
    var str=document.getElementById("love").innerHTML;
    var text=str.replace(/love/ig,"Money");
    document.getElementById("love").innerHTML=text;
}

function Test_love(){
    // var patt=document.getElementById("love").innerHTML;
    var patt=new RegExp("I love you.");//目标RegExp
    document.getElementById("love").innerHTML += patt.test("Where the first \"LOVE\" appear?You love me.I love you.");
    //检测文本
    //ru use innerHtml directly,the quote will error
}