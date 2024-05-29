const express = require("express")
const router = require("./src/route/api")
const app = new express()

// BASIC PACKAGES IMPORT
const cors = require("cors")
const helmet = require("helmet")
const hpp = require("hpp")
const rateLimit = require("express-rate-limit")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const path = require("path")
const { connect } = require("http2")

// USED PACKAGES WITHING APP
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(xss())


app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))

const limiter = rateLimit({windowMs: 15*60*1000, max: 1000})
app.use(limiter)

// MONGOOSE CONNECTION
mongoose.connect('mongodb+srv://assignment:aG7RtNlLUeAX0E4O@examweek.o3lsixc.mongodb.net/rowdb').then((res) => {
    console.log("MongoDB connected")
}).catch((e) => {
    console.log("MongoDB Connection failed")
})


app.use("/api/v1", router)

app.get("*", (req, res) => {
    res.status(401).json({status: "PAGE NOT FOUND"})
})

module.exports = app;