const createError = require('http-errors');


function createEmployeeValidator(req, res, next) {
    // firstName validations
    if (!req.body.firstName) {
        // return res.status(400).send("FirstName is required!");

        //better
        return next(createError(400, "FirstName is required!"))
    };
    if (typeof req.body.firstName !== "string") {
        // return res.status(400).send("FirstName must be string!");

        return next(createError(400, "FirstName must be string!"))
    };
    if (req.body.firstName.length >= 30 || req.body.firstName.length <= 3) {
        // return res.status(400).send("FirstName length must be between 3 and 30!")

        return next(createError(400, "FirstName length must be between 3 and 30!"))
    };

    // lastName validations
    if (!req.body.lastName) {
        return res.status(400).send("LastName is required!")
    };
    if (typeof req.body.lastName !== "string") {
        // return res.status(400).send("FirstName must be string!");

        return next(createError(400, "lastName must be string!"))
    };
    if (req.body.lastName.length >= 30 || req.body.lastName.length <= 3) {
        // return res.status(400).send("lastName length must be between 3 and 30!")

        return next(createError(400, "lastName length must be between 3 and 30!"))
    };
    

    if (!req.body.gender) {
        return res.status(400).send("gender is required!")
    }

    // birth validations
    if (!req.body.birth) {
        return res.status(400).send("birth is required!")
    };
    if (Error(new Date(req.body.birth)) == 'Error: Invalid Date') {
        return res.status(400).send("birth is must be type of Date!")
    };


    if (!req.body.phoneNumber) {
        return res.status(400).send("phoneNumber is required!")
    }


    if (!req.body.userId) {
        return res.status(400).send("userId is required!")
    }
    if (req.body.userId.length != 10) {
        // return res.status(400).send("userID length must be between 10 and 10!")

        return next(createError(400, "userId length must be between 10 and 10!"))
    };
    if (req.body.userId.split('').some(item => isNaN(item))) {
        // return res.status(400).send("userId must be number!");

        return next(createError(400, "userId must be Number!"))
    };

    if (!req.body.city) {
        return res.status(400).send("city is required!")
    }
    if (req.body.city.split('').some(item => !isNaN(item))) {
        // return res.status(400).send("userId must be number!");

        return next(createError(400, "city must be String!"))
    };

    if (!req.body.company) {
        return res.status(400).send("company is required!")
    }

    // position validations
    if (!req.body.position) {
        return res.status(400).send("Position is required!")
    };
    // if (!["Backend Developer", "Client Developer", "Devops", "UI/UX Designer"].includes(req.body.position)) {
    //     return res.status(400).send("Bad value for position!")
    // };


    next();
};


module.exports = {
    createEmployeeValidator
};