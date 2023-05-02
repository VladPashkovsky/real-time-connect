import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const WebSockets = () => {
  const [messages, setMessage] = useState([])
  const [value, setValue] = useState('')
  const socket = useRef()
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState('')


  function connect() {
    socket.current = new WebSocket('ws://localhost:5000')

    //отправка на сервер
    socket.current.onopen = () => {
      setConnected(true)
      const message = {
        event: 'connection',
        username,
        id: Date.now(),
      }
      socket.current.send(JSON.stringify(message))
    }

    //получение на клиент
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessage(prev => [message, ...prev])
    }

    socket.current.onclose = () => {
      console.log('Websocket closed')
    }

    socket.current.onerror = () => {
      console.log('WebSocket error')
    }
  }


  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: `message`
    }
    socket.current.send(JSON.stringify(message))
    setValue('')
  }


  if (!connected) {
    return (
      <div className='center'>
        <div className='form'>
          <input
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <button onClick={connect}>Enter</button>
        </div>
      </div>
    )
  }

  return (
    <div className='center'>
      <div>
        <div className='form'>
          <input
            value={value}
            onChange={event => setValue(event.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage()
              }
            }}
            type='text' />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className='messages'>
          {messages.map(mess =>
            <div key={mess.id}>
              {mess.event === 'connection'
                ? <div className='connection_message'>User {mess.user} is connected</div>
                : <div className='message'>{mess.username}: {mess.message}</div>
              }
            </div>,
          )}
        </div>
      </div>
    </div>
  )
}

export default WebSockets