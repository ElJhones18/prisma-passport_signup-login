// const express = require('express');

// const app = express();
// app.use(express.json());

// app.listen(3000, () => {
//     console.log(`Running on 3000`);
// })

// Importación de módulos necesarios con express-session

const express = require('express-session');
const passport = require('./src/passport/user_passport');

const userRoutes = require("./src/routes/user_routes");
// bodyParser es un middleware de express
// lo que hace es parsear el cuerpo de las solicitudes entrantes
// en formato JSON, multipartes (ficheros, imágenes) y lo convierte en un objeto JavaScript
const bodyParser = require("body-parser"); // nos permite desde el cuerpo enviar en formato json

require("dotenv").config();

const app = express();
// app.use para utilizar middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const CONNECTION_PORT = process.env.PORT || 3005;

app.listen(CONNECTION_PORT, () => {
    console.log(`Running on ${CONNECTION_PORT}`);
})

// conexion a base de datos

const mongo_connect = () => {
    try {
        mongoose
        .connect(process.env.DATABASE_CONNECTION_STRING)
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.log("Error connecting to database");
        })
    }
    catch (error){
        console.log(error);
    }
   
}
mongo_connect();

// Llamar la ruta. Rutas:
app.use('/api/v1/users', userRoutes);

// inicializa y configura el middleware de sesion-express

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
    })
);

// inicializa y configura el middleware de passport
app.use(passport.initialize());
app.use(passport.session());
