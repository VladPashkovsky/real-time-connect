1. Разворачиваем server 
    npm init -y
    npm i express cors ws nodemon
2. Создаем longpolling.js
3. В package.json в scripts прописываем
   "start": "nodemon longpolling.js"
4. Делаем какркас express в longpolling.js
    Создаем там 2 endpoint get и post (- запросы)
    Для того, чтобы по какому-то событию возвращать ответ на клиент, нам понадобится способ управления событиями
    в node.js 'events'
    EventEmitter - для создания и подписывания на события
    emitter.once - регистрируем событие, оно отработает единожды
    callback вторым параметром возвращает всем пользователем, у кого висит это подключение, возвращаем это сообщение
    Затем в post с помощью emit, этот message вставляем