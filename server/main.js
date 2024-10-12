import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World")
})

// app.get("/getMe ", (req, res) => {
//   res.send("Bot info")
// })

// app.get("/setMyCommands", (req, res) => {
//   res.send("Commands set")
// })


const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

start()
