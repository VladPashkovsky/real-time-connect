import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LongPulling = () => {
  const [messages, setMessage] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    subscribe()
  }, [])

  const subscribe = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/get-message')
      setMessage(prev => [data, ...prev])
      setValue('')
      await subscribe()
    } catch (e) {
      setTimeout(() => {
        subscribe()
      }, 500)
    }
  }

  const sendMessage = async () => {
    await axios.post('http://localhost:5000/new-message', {
      message: value,
      id: Date.now(),
    })
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
            <div className='message' key={mess.id}>{mess.message}</div>,
          )}
        </div>
      </div>
    </div>
  )
}

export default LongPulling