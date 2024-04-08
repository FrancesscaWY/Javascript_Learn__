<script type="text/javascript" src="jquery-1.7.2.min.js"></script>
    $('#js_logo_img').change(function() {
    var file=this.files[0];
    readFile(file);
    function readFile(file) {
    // 新建阅读器
    var reader = new FileReader();
    // 根据文件类型选择阅读方式
    switch (file.type){
    case 'image/jpg':
    case 'image/png':
    case 'image/jpeg':
    case 'image/gif':
    reader.readAsDataURL(file);
    break;
}
    // 当文件阅读结束后执行的方法
    reader.addEventListener('load',function () {
    // 如果说让读取的文件显示的话 还是需要通过文件的类型创建不同的标签
    switch (file.type){
    case 'image/jpg':
    case 'image/png':
    case 'image/jpeg':
    case 'image/gif':
    console.log(reader.result);
    $(".user_avatar").attr("src",reader.result);//这里是将读取的文件显示出来
    break;
}
});
}
})