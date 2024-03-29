
function displayDate(){
    document.getElementById("time").innerHTML=Date();
}
displayDate();
function CHANGE_text(){
    document.getElementById("text").innerHTML=("HELLO JAVASCRIPT.");
}

function changeImage(){
    element=document.getElementById('my_image');
    if(element.src.match("face"))
    {
        element.src="src_/picture/sad.svg";
    }
    else {
        element.src="src_/picture/emoji-4.svg";
        document.getElementById("emotion").innerHTML="Thank you! I'm HAPPY now."
    }
}

a=5;
b=9;
c=a+b;
    console.log(c);

function clue(){
    // alert(a+c);
    // alert(c);
    alert("WELCOME!");
}

var person={
    firstName:"BOb",
    lastName:"Doe",
    id:3344
};
function object() {
    document.getElementById("demo").innerHTML = person.id + " " + person.firstName + " " + person.lastName;
}

