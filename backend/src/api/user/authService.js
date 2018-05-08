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

/*
    responsavel pelos services da autenticacao (registrar, novo user, signup, login e validar o token)
*/