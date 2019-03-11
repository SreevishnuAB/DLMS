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
                alert('Account created');
            },
            error: (err)=>{
                alert(err);
            }
        });
    });
});