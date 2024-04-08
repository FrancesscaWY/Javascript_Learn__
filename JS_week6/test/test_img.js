//选择文件完毕的回调
function inputFile(obj) {

    const file = obj.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        $("#avatar").attr("src", this.result);
    }
}

//提交表单数据
function saveInfo(){
    //jquery对象转js对象
    const avatarFile = $('btn-file')[0].files[0];

    var form = new FormData();
    form.append('name', $('#name').val());
    form.append('avatar', avatarFile);
    form.append('mobile', $('#mobile').val());
    form.append('unit', $('#unit').val());

    form.append('email', $('#email').val());

    postRequest("UpdateUserInfo", form, (result)=>{
        location.reload(true)
    })
}