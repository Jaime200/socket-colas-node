var socket = io();


var lbl1 = $('#lblTicket1')
var lbl2 = $('#lblTicket2')
var lbl3 = $('#lblTicket3')
var lbl4 = $('#lblTicket4')

var lblEscritorio1 = $('#lblEscritorio1')
var lblEscritorio2 = $('#lblEscritorio2')
var lblEscritorio3 = $('#lblEscritorio3')
var lblEscritorio4 = $('#lblEscritorio4')

var arrlblTickets = [
    lbl1,
    lbl2,
    lbl3,
    lbl4
]
var arrlblEscriotios = [
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4
]

socket.on('connect',function(){
    console.log('Cliente conectado')    
})
 

socket.on('disconnect', function(){
    console.log('Cliente desconectado')
})


socket.on('estadoActual',function(data){
    console.log(data)
    actualizaHTML(data.ultimos4)
})


socket.on('ultimos4',function(data){
    // console.log(data)
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.ultimos4)
})


function actualizaHTML(ultimos4){
    for( var i=0; i< ultimos4.length; i++ ){
        arrlblTickets[i].text('Ticket ' + ultimos4[i].numero )
        arrlblEscriotios[i].text('Escritorio ' + ultimos4[i].escritorio )
    }
}