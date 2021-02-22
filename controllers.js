const Contact = require('./Contact');
const mongoose = require('mongoose')


exports.getAllContact = (req, res) => {
    Contact.find()
        .then(contacts => {
            res.render('index', { contacts, error: {} },)
        })
        .catch(e => {
            console.log(e);
            res.json({
                message: 'Error Occurred'
            })
        })
}

exports.getSingleContact = (req, res) => {
    let { id } = req.params;

    Contact.findById(id)
        .then(contact => {
            res.json(contact)
        })
        .catch(e => {
            console.log(e);
            res.json({
                message: e.message
            })
        })
}

exports.createContact = (req, res) => {
    let { name, phone, email, id } = req.body;



    let error = {}
    if (!name) {
        error.name = 'Please Provide Your Name'
    }
    if (!phone) {
        error.phone = 'Please Provide Your Phone Number'
    }
    if (!email) {
        error.email = 'Please Provide Your An Email'
    }

    let isError = Object.keys(error).length > 0;
    if (isError) {
        Contact.find()
            .then(contacts => {
                return res.render('index', { contacts, error })
            })
            .catch(e => {
                return res.json({
                    message: e.message
                })
            })
    };
    if (id) {
        
        Contact.findOneAndReplace({_id: id},
            {
                $set: {
                    name,
                    email,
                    phone
                }
            }, {
            new: true
        })
            .then((c) => {
                console.log(c);
                Contact.find()
                    .then(contacts => {

                        res.render('index', { contacts, error: {} })
                    })
            })
            .catch(e => {
                console.log(e);
                return res.json({
                    message: e.message
                })
            })
    } else {
        let contact = new Contact({
            name,
            email,
            phone
        })

        contact.save()
            .then(() => {
                Contact.find()
                    .then(contacts => {
                        return res.render('index', { contacts, error: {} })
                    })
                    .catch(e => {
                        console.log(e);
                        res.json({
                            message: e.message
                        })
                    })
            })
            .catch(e => {
                console.log(e);
                res.json({
                    message: e.message
                })
            })
    }




}

exports.updateContact = (req, res) => {
    let { id } = req.params;
    let { name, email, phone } = req.body;

    Contact.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                name,
                email,
                phone
            }
        },
        { new: true }
    )
        .then(contact => {
            res.json(contact)
        })
        .catch(e => {
            console.log(e);
            res.json({
                message: e.message
            })
        })
}

exports.deleteContact = (req, res) => {
    let { id } = req.params;

    Contact.findOneAndDelete({ _id: id })
        .then(() => {
            Contact.find()
                .then(contacts => {
                    res.render('index', { contacts, error: {} })
                })
        })
        .catch(e => {
            console.log(e);
            res.json({
                message: e.message
            })
        })
}