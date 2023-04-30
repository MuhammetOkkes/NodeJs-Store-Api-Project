const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')   
const app = express();
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
require('express-async-errors')


//middleware
app.use(express.json()) // (express.json()) fonksiyonu req'teki json verilerini işlemek için kullanılır.

//rootes
app.get('/',(req,res) => {
    res.send('<h1>Store API</h1><a href="api/v1/products">products route</a>')
})

app.use('/api/v1/products',productsRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

//products route
const port = process.env.port || 3000;

//app.listen() fonksiyonu, ilk parametresi olarak dinlemek istediğimiz port numarasını alır. İkinci parametre olarak opsiyonel olarak bir geri çağrı işlevi alabilir. Bu geri çağrı işlevi, sunucunun başlatıldığını bildirmek için kullanılabilir.

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()