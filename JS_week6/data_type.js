console.log('Data Type');
function isArray(myArray){
    return myArray.constructor.toString().indexOf("Array")>-1;
}
var fruits= ["Banana", "Orange", "Apple", "Mango"];
document.getElementById("constructor..").innerHTML = isArray(fruits);



var f=2;
//why not show always show the result??
var Car ={
    name:"Disco",
    age: 20,
    change_color: function(){
        if(f>5){
            f=1;
        }
        let text=`<video autoplay loop width=100% height=100%> <source src="src/video/car`+f+`.mp4" type="video/mp4"></video>`;
            document.getElementById("car").innerHTML=text;
            f++;
    }

}