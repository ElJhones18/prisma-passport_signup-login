const passport = require('passport');
const userModel = require("../models/user_model");

// req: request, solicitud que se hace. res: response, respuesta
const signUpUser = async (req, res) => {
  try {
    const {
      user_name,
      lastname,
      nacionality,
      document,
      user_email,
      password,
      user_active
    } = req.body;
    console.log(req.body);

    // Crear un nuevo usuario
    const newUser = await userModel.create({
      user_name,
      lastname,
      nacionality,
      document,
      user_email,
      password,
      user_active
    });
    console.log(newUser);
    res.status(201).json({newUser, message: 'Usuario creado'});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

const loginUser = (req, res, next) => {
  // Utiliza passport para autenticar usando la estrategia local
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    // Si no hay usuario, devolver info
    if (!user) {
      return res.status(400).json(info);
    }
    // Si hay usuario, loguear
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({message: 'Usuario logueado'});
    });
  })(req, res, next);
}

module.exports = {
  signUpUser,
  loginUser
};
