const path = require('path')
const express = require('express')
const xss = require('xss')
const MonthlyGoalService = require('./annual-goals-service')

const weeklyGoalsRouter = express.Router()
const jsonParser = express.json()

module.exports = weeklyGoalsRouter