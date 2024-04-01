// Importación de módulos necesarios
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Configuración de la estrategia local
passport.use(new LocalStrategy({
    // Nombres de los campos del formulario de login
    usernameField: 'user_email',
    passwordField: 'user_password'
}, 
    async function(email, password, done)  {
        try {
            // Buscar un usuario con el email proporcionado en la base de datos
            const user = await userModel.findOne({ user_email: email
            });
            // Si no se encuentra el usuario, devolver un mensaje de error
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }
            // Si la contraseña no coincide, devolver un mensaje de error
            if (!user.password !== password) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            // Si todo está correcto, devolver el usuario
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Serialización del usuario para almacenarlo en la sesión
// Serialización es el proceso de convertir un objeto en una secuencia de bytes para almacenarlo o transmitirlo a la memoria, una base de datos o un archivo.

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialización del usuario para obtenerlo de la sesión y poder utilizarlo en las rutas protegidas por Passport 
// Deserialización convertir una secuencia de bytes en un objeto.

passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
        done(err, user);
    });
});

// Exportar el módulo de configuración de Passport
module.exports = passport;
