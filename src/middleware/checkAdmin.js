const adminUser = {
    user: (req, res, next) =>{
        req.user = {
            user:'Luis',
            isAdmin: true
        };
        next();
    },

    admin: (req, res , next) =>{
        console.log(req.user.isAdmin);
        if (req.user.isAdmin) next();   
        else res.status(403).send('you dont have permission');
    }

}

module.exports = adminUser