$(document).ready(function(){
    $('.formelement').val('');

    $('#logout').click(function(){
        $.ajax({
            type: 'GET',
            url: '../users/logout',
            cache: 'false',
            success: function(){
                alert("Logged out successfully");
                window.location = '../'
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
            data: {
              username: $("#user").val(),
              id: $("#id").val(),
              email: $("#email").val(),
              password: $("#password").val(),
              designation: $("#designation").val()
            },
            success:()=>{
                alert("Account created");
                $("#designation").val();
                window.location = '../';
            },
            error: (err)=>{
                alert(err);
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
});