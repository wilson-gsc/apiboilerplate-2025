const { expressjwt } = require('express-jwt');
const config = require('../config'); // Use the centralized config
const db = require('../_helpers/db');

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    // Ensure config.secret is loaded correctly
    if (!config.secret) {
        console.error("FATAL ERROR: JWT_SECRET is not set in the environment variables or config.");
        process.exit(1);
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        // Use expressjwt({ config }) to CREATE the middleware
        expressjwt({ secret: config.secret, algorithms: ['HS256'] }),

        // authorize based on user role
        async (req, res, next) => {
            const account = await db.Account.findByPk(req.user.id);
            
            if (!account || (roles.length && !roles.includes(account.role))) {
                // account no longer exists or role not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            req.user.role = account.role;
            const refreshTokens = await account.getRefreshTokens();
            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
            next();
        }
    ];
}