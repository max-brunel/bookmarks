const express = require("express")
const consola = require("consola")
const { Nuxt, Builder } = require("nuxt")
const { JsonDB } = require("node-json-db")
const { Config } = require("node-json-db/dist/lib/JsonDBConfig")
var bodyParser = require("body-parser")

// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
var db = new JsonDB(new Config("bookmarksDB", true, true, "/"))
const app = express()
app.use(bodyParser.json()) // support json encoded bodies

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js")
config.dev = process.env.NODE_ENV !== "production"

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

app.get("/bookmarks", (req, res) => {
  res.send(db.getData("/bookmarks"))
})

app.get("/tags", (req, res) => {
  res.send(db.getData("/tags"))
})

app.post("/create-bookmark", (req, res) => {
  db.push("/bookmarks[]", req.body, true)
  res.send(req.body)
})

app.post("/create-tag", (req, res) => {
  db.push("/tags[]", req.body, true)
  res.send(req.body)
})

app.delete("/delete-bookmark", (req, res) => {
  const data = db.getData("/bookmarks")
  if (!req.query.url) {
    res.status(400).send("Url param is not defined")
  }
  const indexToDelete = data.map(b => b.link).indexOf(req.query.url)
  if (indexToDelete < 0) {
    res.status(404).send("Bookmark not found")
  } else {
    db.delete(`/bookmarks[${indexToDelete}]`)
    const newData = db.getData("/bookmarks")
    res.send(newData)
  }
})

// To put in vue component
// function deleteBookmark(url) {
//   axios
//     .delete("/delete-bookmark", {
//       params: { url: url }
//     })
//     .then(response => {
//       //Response.data is the new array without the deleted one
//       this.items = response.data
//     })
//     .catch(e => {
//       this.errors.push(e)
//     })
// }

start()
