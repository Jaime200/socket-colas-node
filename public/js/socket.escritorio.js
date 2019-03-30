var socket = io();
var label = $('#lblNuevoTicket')


/*obteniendo los parametros de la url */
var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new erro('El escritorio es necesario');
    
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio)

$('h1').text('Escritorio ' + escritorio)

/*Comunicacion con socket */
socket.on('connect',function(){
    console.log('Cliente conectado')

    
})
 
socket.on('disconnect', function(){
    console.log('Cliente desconectado')
})


$('button').on('click', function(){

    console.log('escritorio' + escritorio)
    socket.emit('atenderTicket',{escritorio: escritorio   },function(err,resp){

        if(err){
            alert(err.mensaje);

            return
        }

        console.log(resp)
        $('small').text('ticket '+ resp.numero)


    })
})