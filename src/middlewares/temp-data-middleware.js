export const tempData = (req, res, next) => {
    // Attach error setter to res
    res.setError = (message) => {
        req.session.error = {
            message,
            isFirstRequest: true,
        };
    }

    if (!req.session.error) {
        return next();
    }
    
    // Read error and set to response
    if (req.session.error.isFirstRequest) {
        req.session.error.isFirstRequest = false; 
        res.locals.error = req.session.error.message;
    } else {
        // Delete errors more than 2 requests old
        req.session.error = null;
    }

    next();
}