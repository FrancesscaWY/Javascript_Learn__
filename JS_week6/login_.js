// $("input:radio").click(function(){
//     var doName=$(this).attr("female");
//     var checkedState=$(this).attr('checked');
//     $("input:radio[name='"+doName+"']").attr('checked',false);
//     if(checkedState=='checked'){
//         $(this).attr('checked',false);
//     }
// });
var selector;
function RChecked(selector){
    var rtn="";
    selector.each(function (){
        if($(this).prop("checked")){
            rtn=$(this).attr("value");
        }

    });
    return rtn;
}
selector=$('input[type="radio"][name="gender"]');
var value=RChecked(selector);

for(var i=1900;i<=2024;i++){
    document.getElementById("year").innerHTML="<option value='"+i+"'>"+i+"</option>"
}
for(var j=1;j<=12;j++){
    document.getElementById("month").innerHTML="<option> value='" +j+ "'>"+j+"</option>"
}

var y=Number(document.getElementById("year").innerText);
var m=Number(document.getElementById("month").innerText);

function IsYear(y){
    if((y%4==0 && y%100!=0)||y%400==0){
        return true;
    }
}

for(var k=1;k<=31;k++){
    document.getElementById("day").innerHTML="<option value='"+k+"'>"+k+"</option>"
    if(IsYear(y)){
        while(m==2){
            while(k==29){
                break;
            }
        }
    }else {
        if(m==2){
            while(k==28){
                break;
            }
        }
        if(k%2==0||k!=8){
            while(k==30){
                break;
            }
        }
    }
}
