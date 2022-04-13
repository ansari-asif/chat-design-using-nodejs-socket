var socket = io();
let msg=$('.write_msg').val();
const name=prompt('enter your name')
const msg_history=$('.msg_history');

socket.emit('joining_name', name);

socket.on('chat-message', function(msg){
    $('.msg_history').append($('<h5 class="text-center">').text(msg));
});

$( ".msg_send_btn" ).click(function() {
    let msg=$('.write_msg').val();
    socket.emit('sender_msg',msg);
       let msg_div=`<div class="outgoing_msg">
                    <div class="sent_msg">
                        <p>${msg}</p>
                        <span class="time_date"> 11:01 AM    |    Today</span> 
                    </div>
                </div>`;
        $('.msg_history').append(msg_div);
        msg=$('.write_msg').val('');
        $('.msg_history').scrollTop($('.msg_history').height());



});

socket.on('received_msg', function(msg){
    let received_msg_div=`<div class="incoming_msg">
                    <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                    <div class="received_msg">
                        <div class="received_withd_msg">
                            <p>${msg}</p>
                            <span class="time_date"> 11:01 AM    |    Today</span></div>
                    </div>
                </div>`;
        $('.msg_history').append(received_msg_div);
        $('.msg_history').scrollTop($('.msg_history').height());

        
});

