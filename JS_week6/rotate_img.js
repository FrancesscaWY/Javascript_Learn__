var rotateVal=0;
var InterVal;
window.onload=function(){
    rotate();
    document.getElementById("ro").onmousedown=function(){
        clearInterval(InterVal);
    }
    document.getElementById("ro").onmouseup=function(){
        rotate();
    }
}

function rotate(){
    InterVal=setInterval(function(){
    let img=document.getElementById("ro");
    rotateVal+=1;
    img.style.transform='rotate('+rotateVal+'deg)';
    img.transaction='0.000001 linear';
    },10)
}
