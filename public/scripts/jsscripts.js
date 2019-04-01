$(document).ready(function(){
  $('.formelement').val('');

  $('#logout').click(function(){
    $.ajax({
      type: 'GET',
      url: '/users/logout',
      cache: 'false',
      success: function(){
        alert("Logged out successfully");
        window.location = '/';
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
        username: $("#user-reg").val(),
        dummy: $("#dummy").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      },
      success:(res)=>{
        alert(res.success);
        $("#id").val();
        window.location = '../';
      },
      error: (err)=>{
//        error = JSON.stringify(err);
//        alert(err.responseJSON.error);
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
        error:(err)=>{
          alert(err.responseJSON.error);
      }
    });
  });

  $('.des').click(function(event){
    var target = event.target.id;
    $('.modal-title').html(`${$('.modal-title').html()} - ${target.charAt(0).toUpperCase()}${target.substring(1)}`);
    if(target == 'faculty')
      $('#dummy').attr('placeholder','Programme');
    else
      $('#dummy').prop('hidden',false);
    $('.reg-form, .des-select').toggleClass('hidden');
  });

  $('.modal').on('show.bs.modal',function(){
    $('input[type="text"], input[type="password"], input[type="email"]').val('');
    $('.modal-title').html('Register');
    var cname = $('.reg-form').attr('class');
    if(!cname.includes('hidden'))
      $('.reg-form, .des-select').toggleClass('hidden');
  });

  $('.faculty').on('click',function(event){
//        alert(event.target.id);  
    var target = event.target.id;
    var oldW = $(`#${target}`).width();
    $(`#${target}`).toggleClass('clicked');
    if(target.substring(0,4) == 'abtn')
      $(`#dbtn${target.charAt(4)}`).toggleClass('hidden');
    else if(target.substring(0,4) == 'dbtn')
      $(`#abtn${target.charAt(4)}`).toggleClass('hidden');
    var newW = $(`#${target}`).width();
    if(newW > oldW){
//      alert($(`#event${target.charAt(4)}`).text());
//      alert('Updated');
      $.ajax({
        type:'POST',
        url:'../users/faculty/update',
        cache:false,
        async:true,
        data:{
          status: target.charAt(0),
          id: $(`#id${target.charAt(4)}`).text(),
          event: $(`#event${target.charAt(4)}`).text(),
          },
        success:(success)=>{
          alert(success.success);
          },
        error:(err)=>{
          alert(JSON.stringify(err));
          }
        });
      }
  });
});