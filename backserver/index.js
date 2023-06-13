import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import userDao from "./dao/websiteDAO.js"
import eventsDAO from "./dao/eventsDAO.js"
import leaveDAO from "./dao/leaveDAO.js"
dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 7333 

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 500,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }

)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await userDao.injectDB(client) 
    await eventsDAO.injectDB(client)
    await leaveDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})