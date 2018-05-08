const _ = require('lodash')
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcrypt') 
const User = require('./user') 
const env = require('../../.env')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

//trata'ra os erros de banco de dados
const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message)) 
        return res.status(400).json({
        errors
    })
}

const login = (req, res, next) => {
    //a partir do request eu vou pegar o email e password que forem enviados
    const email = req.body.email || '' 
    const password = req.body.password || ''

    //dentro da colecao de usuários (User), eu procuro apenas um user(findOne), e faco um filtro pelo email
    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: "1 day"
            })
            const { name, email } = user
            res.json({ name, email, token })
        } else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] }) //msg de senha ou user invélidos
        }
    })
}

/*
    responsavel pelos services da autenticacao (registrar, novo user, signup, login e validar o token)

    1 - if (user && bcrypt.compareSync(password, user.password)) {
    2 -     const token = jwt.sign(user, env.authSecret, {
    3 -        expiresIn: "1 day"
    4 -    })
    5 -    const { name, email } = user //extreio o name e o email de user
    6 -    res.json({ name, email, token }) // gero um objeto com o nome, email e o token e transformo em json
        }

    1 - se o user for true, tb vou comparar sincronamente a senha que foi digitada com a senha que obtive do user user.password
    2 - gera um token a partir do env.authSecret
    3 - o token tem data de expiracao de 1 dia, ou seja pode ficar logado até um dia no máx
*/