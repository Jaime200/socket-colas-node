//Establecer conexion con socket

var socket = io();
var label = $('#lblNuevoTicket')


socket.on('connect',function(){
    console.log('Cliente conectado')    
})

socket.on('estadoActual',function(actual){
    label.text(actual.actual)
})

socket.on('disconnect', function(){
    console.log('Cliente desconectado')
})

$("button").on('click', function(){
    
    socket.emit('siguienteTicket',null,function(siguiente){
        label.text(siguiente)
        console.log(siguiente)
    }
    );
})