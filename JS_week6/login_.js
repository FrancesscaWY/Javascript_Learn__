// $("input:radio").click(function(){
//     var doName=$(this).attr("female");
//     var checkedState=$(this).attr('checked');
//     $("input:radio[name='"+doName+"']").attr('checked',false);
//     if(checkedState=='checked'){
//         $(this).attr('checked',false);
//     }
// });
// var selector;
// function RChecked(){
//     let rtn="";
//     selector.each = function () {
//         if($('input[name="gender"]:checked')){
//             selector=$(this);//赋值给全局变量
//             if(selector.length>0){
//                 rtn=$(this).attr("value");
//             }
//             // rtn=$(this).attr("value");
//         }
//
//     }
//     return rtn;
// }
// // selector=$('input[type="radio"][name="gender"]');
// //zhe tiao yu ju shi cuo de
// //ni zhe li de yu ju wo mei kan dong
// console.log(selector);
// var value=RChecked();
// let value=RChecked();

// for(var i=1900;i<=2024;i++){
//     document.getElementById("year").innerHTML+="<option value='"+i+"'>"+i+"</option>"
// }
// for(var j=1;j<=12;j++){
//     document.getElementById("month").innerHTML+="<option> value='" +j+ "'>"+j+"</option>"
// }
//
// let y=Number(document.getElementById("year").innerText);
// let m=Number(document.getElementById("month").innerText);
//
// function IsYear(y){
//     if((y%4==0 && y%100!=0)||y%400==0){
//         return true;
//     }
// }
//
// for(var k=1;k<=31;k++){
//     document.getElementById("day").innerHTML+="<option value='"+k+"'>"+k+"</option>"
//     if(IsYear(y)){
//         while(m==2){
//             while(k==29){
//                 break;
//             }
//         }
//     }else {
//         if(m==2){
//             while(k==28){
//                 break;
//             }
//         }
//         if(k%2==0||k!=8){
//             while(k==30){
//                 break;
//             }
//         }
//     }
// }
//

function  ymd(){
    //shi zhe li mei zhi xing ma?wo zai jian cha yi xia ba
    let yyy=document.getElementById("year");
    let mmm=document.getElementById("month");
    let ddd=document.getElementById("day");

    let date=new Date();
    let yy=parseInt(date.getFullYear());//get the year
    initSelect(yyy,1920,yy);
    initSelect(mmm,1,12);
    initSelect(ddd,1,31);//init the day

    let n=yyy.length;
    yyy.selectedIndex=Math.round(n/2);
}

function initSelect(obj,start,end){
    for(let i=start;i<=end;i++){
        console.log("test")
        obj.options.add(new Option(i,i));
    }
}

function    selectYmd(){
    let yyy=document.getElementById("year");
    let mmm=document.getElementById("month");
    let ddd=document.getElementById("day");
    let m=parseInt(mmm.value);
    var dayEnd;
    if(m===4||m===6||m===9||m===11){
        dayEnd=30;
    }else if(m===2){
        dayEnd=28;
        y=parseInt(yyy.value);
        if(((y%4===0)&&(y%100!==0))||(y%400===0)){
            dayEnd=29;
        }
    }else {
        dayEnd=31;
    }
    ddd.options.length=0;//clear the day
    initSelect(ddd,1,dayEnd);
}




