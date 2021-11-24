
// Strings
export const paramMissingError = 'One or more of the required parameters was missing.';
export const loginFailedErr = 'Login failed';

// Numbers
export const pwdSaltRounds = 12;

// Cookie Properties
export const cookieProps = Object.freeze({
    key: 'ExpressGeneratorTs',
    secret: process.env.COOKIE_SECRET,
    options: {
        httpOnly: true,
        signed: true,
        path: (process.env.COOKIE_PATH),
        maxAge: Number(process.env.COOKIE_EXP),
        secure: process.env.NODE_ENV === "production",
        sameSite: false
    },
});
