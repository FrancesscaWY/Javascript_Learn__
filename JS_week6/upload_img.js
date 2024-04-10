// <script type="text/javascript" src="jquery-1.7.2.min.js"></script>
//图片上传并预览
$('#logo_img').change(function () {
    var file = this.files[0];
    readFile(file);
    function readFile(file){
        var reader = new FileReader();//create a new reader
        switch (file.type){
            case 'image/jpg':
            case 'image/png':
            case 'image/jpeg':
            case 'image/gif':
            case 'image/svg':
                reader.readAsDataURL(file);//read the file
                break;
        }
        reader.addEventListener('load',function(){
            switch (file.type){
                case 'image/jpg':
                case 'image/png':
                case 'image/jpeg':
                case 'image/gif':
                case 'image/svg':
                    console.log(reader.result);
                    $(".user_avatar").attr("src",reader.result);//show the file
                    break;
            }
        });
    }

})