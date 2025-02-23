import { Router } from "express";
import authService from "../services/authService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/error-utils.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;
    try {
        await authService.register(userData);
    } catch (err) {
        // Log the error if needed
        const error = getErrorMessage(err);
        // Return user to register page
        // return res.redirect('auth/register');
        // Display message to user
        return res.render('auth/register', { error });
    }

    res.redirect('/auth/login');
});

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch(err) {
        console.log(err.message);
        return res.render('auth/login', {error: getErrorMessage(err)});
}
});

authController.get('/logout', isAuth, (req, res ) => {
    res.clearCookie('auth');
    res.redirect('/');
});

export default authController;