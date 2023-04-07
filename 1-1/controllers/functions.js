const product = require("../models/product");

const documentFinder = (req,res) => {
    let findDocument = req.body
     product.find(...findDocument).then(users => {
         res.json(users);
     }).catch(err => {
         res.status(500).send("Somthing went wrong!");
    });
 }

const documentMaxFinder = (req, res) => {
    let findDocument = req.body
    product.find().sort(...findDocument).limit(1).then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).send("Somthing went wrong!");
    });
}

const documentLengthFinder = (req, res) => {
    let findDocument = req.body
    product.countDocuments(...findDocument).then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).send("Somthing went wrong!");
    });
}

const documentUpdater = (req,res) => {
    let findDocument = req.body
     product.updateOne(...findDocument).then(users => {
         res.json(users);
     }).catch(err => {
         res.status(500).send("Somthing went wrong!");
    });
 }

 const documentRemover = (req,res) => {
    let findDocument = req.body
     product.deleteOne(...findDocument).then(users => {
         res.json(users);
     }).catch(err => {
         res.status(500).send("Somthing went wrong!");
    });
 }

module.exports = {documentFinder , documentMaxFinder , documentLengthFinder , documentUpdater, documentRemover}