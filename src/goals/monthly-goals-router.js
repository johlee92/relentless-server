const path = require('path')
const express = require('express')
const xss = require('xss')
const MonthlyGoalService = require('./annual-goals-service')

const monthlyGoalsRouter = express.Router()
const jsonParser = express.json()

module.exports = monthlyGoalsRouter