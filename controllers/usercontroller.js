const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors')

const usercontroller = Router();



usercontroller.post('/register', async (req, res) => {
    let { email, firstName, lastName, password, actName } = req.body;
    console.log(req.body)
    console.log('TESTING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    let thing = bcrypt.hashSync(password, 10)
    console.log(thing)
    console.log('test again!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    try {
        let signingUp = await User.create({
            email,
            firstName, 
            lastName,
            password: bcrypt.hashSync(password, 12),
            actName,
        });
        console.log(signingUp)
        // console.log(signingUp, password)
        if( signingUp && await bcrypt.compare(password, signingUp.password)) {
                console.log(password)
            const token = jwt.sign({ id: signingUp.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            console.log(token)
                    res.status(200).json({
                        message: 'register success',
                        token
                    })

                    console.log('!!!!!!!why!!!!!!!!!!!!')
                    
        } else {
            res.status(401).json({
                message: 'register failed'
            })
        }
    } catch (e) {
        if(e instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'email already in use'
            });
        } else {
            res.status(500).json({
                message: 'failed to register user'
            })
        }
    }
});



usercontroller.post('/login', async (req, res) => {
    let { email, password } = req.body;
    try {
        let loggingIn = await User.findOne({
            where: {
                email
            }
        })
        if( loggingIn && await bcrypt.compare(password, loggingIn.password)) {
            const token = jwt.sign({ id: loggingIn.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                    res.status(200).json({
                        message: 'login success',
                        token
                    })
        } else {
            res.status(401).json({
                message: 'login failed'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: 'error logging in'
        })
    }
})


module.exports = usercontroller;