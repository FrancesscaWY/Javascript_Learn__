function dragStart(event){
    event.dataTransfer.setData("Text", event.target.id);//set the data to be dragged
}
function dragging(){
    document.getElementById("heart").innerText="HEART IS MOVING!";
}

function allowDrop(event){
    event.preventDefault();
}

function drop(event){
    event.preventDefault();
    var data=event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
    document.getElementById("heart").innerText="HEART IS HERE!";
}