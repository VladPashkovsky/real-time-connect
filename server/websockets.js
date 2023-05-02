const ws = require('ws')

const wss = new ws.WebSocketServer({
  port: 5000,

}, () => console.log(`Server started on PORT 5000`))

wss.on('connection', function connection(ws) {
  // ws.id = Date.now()
  ws.on('message', function(message) {
    message = JSON.parse(message)
    switch (message.event) {
      case 'message':
        broadcastMessage(message)
        break
      case 'connection':
        broadcastMessage(message)
        break
    }
  })
})

function broadcastMessage(message) {
  wss.clients.forEach(client => {
      client.send(JSON.stringify(message))

  })
}

function broadcastMessageWithId(message, id) {
  wss.clients.forEach(client => {
    if (client.id === id) {
      client.send(JSON.stringify(message))
    }
  })
}

const message = {
  event: 'message/connection',
  id: 123,
  date: '02.05.2023',
  username: 'Vlad',
  message: 'Hello Dude'
}