function Car(){
    var cars=[bus,taxi,van,railway];
    var x;
    for(var i=0;i<cars.length;i++){
        x= x +cars[i]+"<br>";
    }
    document.getElementById("emo").innerHTML=x;
}

