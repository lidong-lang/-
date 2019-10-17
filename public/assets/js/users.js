$.ajax({
    type:'get',
    url:'/users',
    success:function(res){
        var html=template('usersTpl',{data:res})
        $('#usersBox').html(html)
    }
})
// 添加用户
$('#userForm').on('submit',function(){
    var formData=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(res){
            location.reload();
        }
    })
    return false;
})

// 上传用户的头像
$('#modifyBox').on('change','#avatar',function(){
    var fd=new FormData();
    fd.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        // 让jquery不要解析data
        processData:false,
        // 让jquery不要添加contentType
        contentType:false,
        data:fd,
        success:function(res){
            // 设置预览图 
            $('#preview').attr('src',res[0].avatar)
            // 设置一个隐藏域 把用户输入的文件地址传给服务器
            $('#avatarImg').val(res[0].avatar)
        }
    })
})

//修改用户信息
$('#usersBox').on('click','.edit',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(res){
            var html=template('modifyTpl',res)
            $('#modifyBox').html(html)
            
        }
    })
})

// 提交修改用户信息
$('#modifyBox').on('submit','#modifyForm',function(){
    var formData=$(this).serialize();
    var id=$(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/users/'+id,
        data:formData,
        success:function(){
            location.reload();
        }
    })
    
    return false
})

// 删除用户信息
$('#usersBox').on('click','.delete',function(){
    if(confirm('确定要删除此用户么？')){
        var id=$(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(){
                location.reload();
            }
        })
    }
})

// 批量删除
$('#checkAll').on('change',function(){
    var bool=$(this).prop('checked');
    var checkList=$('#usersBox input[type="checkbox"]');
    checkList.prop('checked',bool);
    if(bool){
        $('#deleteAll').show()
    }else{
        $('#deleteAll').hide()
    }
})
$('#usersBox').on('change','input[type="checkbox"]',function(){
    if($('#usersBox input[type="checkbox"]').length==$('#usersBox input[type="checkbox"]:checked').length){
        $('#checkAll').prop('checked',true)
    }else{
        $('#checkAll').prop('checked',false)
    }
    if($('#usersBox input[type="checkbox"]:checked').length>0){
        $('#deleteAll').show()
    }else{
        $('#deleteAll').hide()
    }
})
$('#deleteAll').on('click',function(){
    if(confirm('确定要删除所选的所有用户么？')){
        var id='';
        var checkUsers=$('#usersBox input[type="checkbox"]:checked')
        $.each(checkUsers,function(index,item){
            id+=$(item).attr('data-id')+'-'
        })
        id=id.substr(0,id.length-1);
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            data:id,
            success:function(res){
                location.reload();
            }
        })
    }
})