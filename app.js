require('dotenv').config()
const Express = require('express')
const app = Express()
const db = require('./db')
const { cors, validate } = require('./middlewares')
const { user, manager, venues } = require('./controllers')
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use("/static", Express.static("node_modules"));
app.use(Express.json())
app.use(cors)


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VenYou API",
      description:
        "API is designed for venue owners to rent out their spaces to musicians",
      contact: {
        name: "Corynne Moody",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
      {
        url: "https://heroku.com",
      },
    ]
  },
  apis: ["*.js", "./controllers/*.js", "./models/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { 
    // explorer: true 
  })
);


app.use('/user', user)
app.use('/manager', manager)

app.use(validate)
app.use('/venue', venues)



db.authenticate()
  .then(() => db.sync())
  // .then(() => db.sync({force: true}))
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[venyou-server]: app listening on ${process.env.PORT}`);
    })
  );

module.exports = app;