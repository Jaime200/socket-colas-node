const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')


let tickeControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //Siguiente ticket
    client.on('siguienteTicket', (data, callback)=>{
        
        //console.log(data)
        let siguiente = tickeControl.siguienteTicket();
        console.log('Siguiente ticket desde servidor', siguiente);
        callback(siguiente);
    })


    client.emit('estadoActual',{
        actual: tickeControl.getUltimoTicket(),
        ultimos4: tickeControl.getUltimos4()
    })

    client.on('atenderTicket',(escritorio,callback)=>{
console.log(escritorio)
       
        if(escritorio === undefined){
            return callback({
                err:false,
                mensaje:'El escritorio es necesarios'
            })
        }

        let atenderTicket =  tickeControl.atenderTicket(escritorio.escritorio);

        callback(null, atenderTicket)
        //actualizar o notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4',{
            ultimos4: tickeControl.getUltimos4()
        })

    })

});