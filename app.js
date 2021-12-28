require('dotenv').config()
const Express = require('express')
const app = Express()
const db = require('./db')
const { cors, validate } = require('./middlewares')
const { user, manager, venues } = require('./controllers')

app.use("/static", Express.static("node_modules"));
app.use(Express.json())

app.use(cors)
app.use('/user', user)
app.use('/manager', manager)

app.use(validate)
app.use('/venue', venues)



db.authenticate()
  // .then(() => db.sync())
  .then(() => db.sync({force: true}))
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[venyou-server]: app listening on ${process.env.PORT}`);
    })
  );

module.exports = app;