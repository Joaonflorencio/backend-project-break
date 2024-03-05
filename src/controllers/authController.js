const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Certifique-se de substituir pelo modelo de usuário correto

const baseHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> Inicia Sesión </title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
`;


const getNavBar = () => {
    return `
        <nav>
            <!-- Inserir HTML da barra de navegação aqui -->
        </nav>
    `;
};

const authController = {
    showLoginForm: (req, res) => {
        const loginFormHtml = `
            ${baseHtml}
            ${getNavBar()}
            <div class="login-container">
                <div class="login-box">
                    <h2>Inicia sesión</h2>
                    <form action="/login" method="post">
                        <div class="form-control">
                            <input type="email" id="email" name="email" required>
                            <label for="email">Email*</label>
                        </div>
                        <div class="form-control">
                            <input type="password" id="password" name="password" required>
                            <label for="password">Contraseña*</label>
                        </div>
                        <a href="#" class="forgot-password">¿Has olvidado la contraseña?</a>
                        <button type="submit">Acceder</button>
                    </form>
                </div>
            </div>
            </body>
            </html>
        `;
        res.send(loginFormHtml);
    },

    processLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user && bcrypt.compareSync(password, user.password)) {
                // Credenciais válidas
                req.session.userId = user._id;
                res.redirect('/dashboard');
            } else {
                // Credenciais inválidas
                res.status(401).send('Credenciais inválidas');
            }
        } catch (error) {
            res.status(500).send('Erro interno');
        }
    },

    processLogout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
};

module.exports = authController;