function checkAuth(req, res, next) {
    // Verificar se existe uma sessão de usuário
    if (req.session && req.session.usuario) {
        // Se a sessão existir, prosseguir para o próximo middleware ou rota
        next();
    } else {
        // Se não houver sessão, redirecionar para o formulário de login
        res.redirect('/login');
    }
}

module.exports = checkAuth;