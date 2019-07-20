const express = require('express')
const redis = require('redis')

const app = express()
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
})

//Set initial visits
client.set('visits', 0);

//defining the root endpoint
app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Number of visits is: ' + visits)
        client.set('visits', parseInt(visits) + 1)
    })
})

//specifying the listening port
app.listen(8081, ()=>{
    console.log('Listening on port 8081')
})