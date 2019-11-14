var socket=io.connect('http://localhost:8080');

$('#chat').submit(function(e) {
    if ($('#txt').val() != ""){
        e.preventDefault(); // prevents page reloading
        socket.emit('new_message', $('#txt').val());
        $("#txt").val('');
    }
    return false;
});

socket.on('summary', function(msg){
    $('#summary').html(msg.replace(/\n/g, "<br />"));
});

socket.on('drop', function(msg){
    $("#summary").html('');
});