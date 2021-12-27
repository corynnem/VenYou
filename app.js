require('dotenv').config()

const Express = require('express')
const app = Express()

app.use("/static", Express.static("node_modules"));





db.authenticate()
  .then(() => db.sync())
  // .then(() => db.sync({force: true}))
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[venyou-server]: app listening on ${process.env.PORT}`);
    })
  );

module.exports = app;