function is_str(){
    var str_="Is this all there is?";
    var str1="          Ai!    "
    var pat=/is/gi;
    document.getElementById("str").innerHTML=str_.match(pat)+str_.repeat(2)+str_.replace("this","that")
                +str_.search("all")+str_.slice(1,5)+"<br>"
                +str_.split(" ")+"<br>"
                +str_.startsWith("IS")+str_.startsWith("Is",0)
                +str_.substr(2,4)+"<br>"
                +str_.substring(0,3)+"<br>"
                +str_.toLowerCase() + "<br>"
                +str_.toUpperCase()
                +str1.trim()+"<br>"
                +str1.toLocaleLowerCase()
                +str1.toUpperCase();
// var pat_=new RegExp('is');
// document.write(pat_.test(str_));
}
