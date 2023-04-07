const Employee = require("../model/employee");
const createError = require('http-errors');


const page = (req, res) => {
    res.render("pages/employeePage")
};


const createEmployee =  (req, res, next) => {
    const newEmployee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        birth: req.body.birth,
        phoneNumber: req.body.phoneNumber,
        userId: req.body.userId,
        city: req.body.city,
        company: req.body.company,
        position: req.body.position,
    });

    newEmployee.save()
    .then(savedEmployee => {
        return res.json(savedEmployee);
    })
    .catch(err => {
        return next(createError(500, err.message));
    });
};


const getAllEmployees = (req, res, next) => {
    Employee.find({}, {__v:0})
    .then(employees => res.json(employees))
    .catch(err => {
        return next(createError(500, err.message));
    });
};

const readEmployee = (req, res, next) => {
    Employee.findOne({"userId":req.body.userId})
    .then(employees => res.json(employees))
    .catch(err => {
        return next(createError(500, err.message));
    })
};

const updateEmployee =  (req, res, next) => {
    const updatedEmployee = {
        firstName: req.body[1].firstName,
        lastName: req.body[1].lastName,
        gender: req.body[1].gender,
        birth: req.body[1].birth,
        phoneNumber: req.body[1].phoneNumber,
        city: req.body[1].city,
        company: req.body[1].company,
        position: req.body[1].position,
    };

    Employee.updateOne({"userId":req.body[0].userId},updatedEmployee)
    .then(employees => res.json(employees))
    .catch(err => {
        return next(createError(500, err.message));
    })
};

const removeEmployee = (req, res, next) => {
    Employee.deleteOne({"userId":req.body.userId})
    .then(employees => res.json(employees))
    .catch(err => {
        return next(createError(500, err.message));
    })
};

module.exports = {
    createEmployee,
    getAllEmployees,
    readEmployee,
    updateEmployee,
    removeEmployee,
    page
};