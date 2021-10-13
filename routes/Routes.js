const MakeRoutes = require('./MakeRoutes');

module.exports = function (http) {
    const Route = new MakeRoutes(http);
    const apiRoute_v1 = 'api/v1';

    Route.get('/', 'HomeController@teste', []);

    // API - V1
    /************************************************
     * Rotas Autenticação
     ************************************************/

    // Processo de login
    Route.post('login', 'LoginController@login', []);

    // Processo de logout
    Route.post('logout', 'LoginController@logout', ['auth']);

    // Criar usuário
    Route.post('register', 'LoginController@register', []);

    /************************************************
     * Api V1
     ************************************************/

    /************************************************
     * Rotas Usuário
     ************************************************/

    // Retorna dados do proprio usuario.
    Route.get(`${apiRoute_v1}/user`, 'UserController@user', ['auth', 'status']); // OK

    // Atualiza dados do usuario por id informada.
    Route.put(`${apiRoute_v1}/user`, 'UserController@userUpdate', ['auth', 'admin', 'status']); // OK

    // Registra novo usuario - rota de admin
    Route.post(`${apiRoute_v1}/user/register`, 'LoginController@register', ['auth', 'admin', 'status']);

    // Retorna usuario por id informado
    Route.get(`${apiRoute_v1}/user:userId`, 'UserController@getUserById', ['auth', 'admin', 'status']); // OK

    // Retorna todos usuários do sistema
    Route.get(`${apiRoute_v1}/user/all/:page`, 'UserController@getAllUsers', ['auth', 'admin', 'status']); // OK

    // Atualiza senha do usuario
    Route.put(`${apiRoute_v1}/user/recovery-password`, 'LoginController@recoverPassword', ['auth', 'admin', 'status']); // Definir Regras
};