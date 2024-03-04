// src/controllers/authController.js
const User = require('../models/user'); // Substitua pelo modelo de usuário correto
const bcrypt = require('bcryptjs'); // Necessário para a verificação da senha

const authController = {
    // Método para mostrar o formulário de login
    showLoginForm: (req, res) => {
        res.render('login'); // Substitua 'login' pelo seu template de login
    },

    // Método para processar o login
    processLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user && bcrypt.compareSync(password, user.password)) {
                // As credenciais são válidas
                req.session.userId = user._id; // Salva o ID do usuário na sessão
                res.redirect('/dashboard'); // Redireciona para a área protegida
            } else {
                // As credenciais são inválidas
                res.status(401).render('login', {
                    errors: ['E-mail ou senha incorretos'],
                    email
                });
            }
        } catch (error) {
            res.status(500).send('Ocorreu um erro interno');
        }
    },

    // Método para processar o logout
    processLogout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
};

module.exports = authController;