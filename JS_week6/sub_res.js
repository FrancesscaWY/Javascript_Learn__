let form=document.getElementById("form_");
var i=0;
let x=document.getElementsByClassName("form");
let y=document.getElementsByClassName("form").item(i).innerText;//get the first element
let len=document.getElementsByClassName("form").length;
// let A=document.getElementById('a');
// x.click(function(){
//     x.style.border="none";
// });



// alert("hello")
document.getElementById("submit_").addEventListener("click",function(){
    form.submit();
    for(i=0;i<len;i++){
        if(x.item(i).value.length===0){
            x.item(i).style.border="2px solid red";
            // A.setAttribute("data-href","javascript:;");
            // alert("There are no full information!");
            // A.addEventListener("click", function (e){
            //     e.preventDefault();
            // })
        }else{
            x.item(i).style.border="none";
        }
    }


});
document.getElementById("reset").addEventListener("click",function(){
    form.reset();
});

document.getElementById("submit_img").addEventListener("click",function(){
    form.submit();
});

document.getElementById("reset_img").addEventListener("click",function(){
    form.reset();
});

function validate(){
    var z = document.forms["L_form"]["f_email"].value;	//找到表单中email输入框的内容
    var atpos = z.indexOf("@");	//从前往后数@符号所在的位置
    var dotpos = z.lastIndexOf(".");	//从后往前数.符号所在的位置
    if(atpos<1||dotpos<atpos+2||dotpos+2>=z.length){
        alert("不是一个有效的e-mail地址");
        return false;
    }
}


