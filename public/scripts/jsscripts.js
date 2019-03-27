$(document).ready(function(){
    $('.formelement').val('');

    $('#logout').click(function(){
        $.ajax({
            type: 'GET',
            url: '/users/logout',
            cache: 'false',
            success: function(){
                alert("Logged out successfully");
                window.location = '/'
            },
            error: function(){
                alert("error");
            }
        });
    });

    $("#register").submit(function(){
        event.preventDefault();
      });

    $('#reg').click(()=>{
        $.ajax({
            type:'POST',
            url: '../register',
            cache: false,
            async:true,
            dataType:'json',
            data: {
              username: $("#user").val(),
              dummy: $("#dummy").val(),
              email: $("#email").val(),
              password: $("#password").val(),
            },
            success:(res)=>{
                alert(res.success);
                {$("#id").val();
                window.location = '../';}
            },
            error: (err)=>{
//                error = JSON.stringify(err);
//                alert(err.responseJSON.error);
                if(err.responseJSON.error == 'SequelizeUniqueConstraintError')
                    alert('User exists');
            }
        });
    });

    $("#lreq").submit(function(){
        event.preventDefault();
    });

    $('#req').click(function(){
        $.ajax({
            type: 'POST',
            url: '../users/student',
            cache:false,
            async:true,
            data:{
                id: $('#id').val(),
                prog: $('#prog').val(),
                yoj: $('#yoj').val(),
                batch: $('#batch').val(),
                sem: $('#sem').val(),
                event: $('#event').val(),
                from: $('#from').val(),
                to: $('#to').val(),
            },
            success: ()=>{
                alert("Leave requested");
            },
            error:()=>{
                alert('Error');
            }
        });
    });

    $('#designation').change(function(){
        $('#dummy').prop('hidden',false);
        if($('#designation').val() == 'faculties')
            $('#dummy').attr('placeholder','Programme');
        else
            $('#dummy').attr('placeholder','ID');
    });

    $('table').on('click',function(event){
//        alert(event.target.id);
        var oldW = $(`#${event.target.id}`).width();
        $(`#${event.target.id}`).toggleClass('clicked');
        if(event.target.id.substring(0,4) == 'abtn')
            $(`#dbtn${event.target.id.charAt(4)}`).toggleClass('hidden');
        else if(event.target.id.substring(0,4) == 'dbtn')
            $(`#abtn${event.target.id.charAt(4)}`).toggleClass('hidden');
        var newW = $(`#${event.target.id}`).width();
        if(newW > oldW)
        /* TODO update table */
            alert('Updated');
    });
});