import AuthService from "../services/auth.service.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuário
 */
class AuthController {

    constructor() {
        this.authService = new AuthService();
    }

    login = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            return res.status(200).json(await this.authService.login(username, password));
        } catch (error) { next(error); }
    };

    refresh = async (req, res, next) => {
        try {
            const { refresh_token } = req.body;
            return res.status(200).json(await this.authService.refresh(refresh_token));
        } catch (error) { next(error); }
    };
}

export default AuthController;