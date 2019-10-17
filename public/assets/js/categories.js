$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        var html=template('categoryTpl',{data:res});
        $('#categoryBox').html(html);
    }
})

$('#addCategory').on('submit',function(){
    $.ajax({
        type:'post',
        url:'/categories',
        data:$(this).serialize(),
        success:function(){
            location.reload;
        }
    })
})
$('#categoryBox').on('click','.edit',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(res){
           var html=template('modifycategoryTpl',res);
            $('#modifyBox').html(html);
        }
    })
})
$('#modifyBox').on('submit','#addCategory',function(){
    var id=$(this).attr('data-id');
    console.log(id);
    
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:$(this).serialize(),
        success:function(){
            location.reload();
        }
    })
})
