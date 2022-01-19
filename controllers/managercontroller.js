const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { Manager } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors')

const managercontroller = Router();


/**
 * @swagger
 * /manager/register:
 *   post:
 *     summary: Register a manager and returns a message of "register success" 
 *     tags: [Manager]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Manager'
 *     responses:
 *       200:
 *         description: "register success"
 *       401:
 *         description: 'register failed'
 *       409:
 *         description: 'email already in use'
 *       500:
 *         description: 'failed to register manager'
 */

managercontroller.post('/register', async (req, res) => {
    let { email, firstName, lastName, password } = req.body;

    try {
        let signingUp = await Manager.create({
            email,
            firstName, 
            lastName,
            password: bcrypt.hashSync(password, 12)
        });

        if( signingUp && await bcrypt.compare(password, signingUp.password)) {
            const token = jwt.sign({ id: signingUp.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                    res.status(200).json({
                        message: 'register success',
                        token
                    })
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
                message: 'failed to register manager'
            })
        }
    }
});


/**
 * @swagger
 * /manager/login:
 *   post:
 *     summary: Log in a manager and returns a message of "login success" 
 *     tags: [Manager]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Manager'
 *     responses:
 *       200:
 *         description: "login success"
 *       401:
 *         description: 'login failed'
 *       500:
 *         description: 'error logging in'
 */

managercontroller.post('/login', async (req, res) => {
    let { email, password } = req.body;
    try {
        let loggingIn = await Manager.findOne({
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


module.exports = managercontroller;