const {Router} = require('express')
const router = Router()
const User = require("../models/User")
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

///api/auth/register
router.post(
    '/register', 
    [
        check('email', "некоректный email").isEmail(),
        check('password', "некоректный password").isLength({min:6})
    ],
    async(req, res) =>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                massage: "некоректные данные при регистрации"
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if(candidate){
            return res.status(400).json({massage:"false"})
        }

        const hasPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hasPassword})

        await user.save()

        res.status(201).json({massage: "User Create"})

    }catch (e) {
        res.status(500).json({message:e.message})
    }
})

///api/auth/login
router.post(
    '/login',
    [
        check('email', "некоректный email").normalizeEmail().isEmail(),
        check('password', "некоректный password").isLength({min:6})
    ],
     async(req, res) =>{
        try{

            const errors = validationResult(req)
    
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    massage: "некоректные данные при loggin"
                })
            }
            
            const {email, password} = req.body
            const user = await User.findOne({email})

            if(!user){
                return res.status(400).json({message: 'Пользователь не сущуствует'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message: "try again"})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecter'), 
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id})
           
        }catch (e) {
            res.status(500).json({message:"Something wrong"})
        }
})

module.exports = router 