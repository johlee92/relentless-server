const path = require('path')
const express = require('express')
const xss = require('xss')
const AnnualGoalsService = require('./annual-goals-service')

const annualGoalsRouter = express.Router()
const jsonParser = express.json()

const serializeGoal = goal => ({
    id: goal.id,
    content: xss(goal.content),
    date_created: goal.date_created,
    category: goal.goal_category,
    complete: goal.complete,
    user_id: goal.user_id
  })
  
  annualGoalsRouter
    .route('/')
    .get((req, res, next) => {
      const knexInstance = req.app.get('db')
      AnnualGoalsService.getAllAnnualGoals(knexInstance)
        .then(goals => {
          res.json(goals.map(serializeGoal))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
      const { content, goal_category } = req.body
      const newGoal = { content }
  
      for (const [key, value] of Object.entries(newGoal))
        if (value == null)
          return res.status(400).json({
            error: { message: `Missing '${key}' in request body` }
          })
  
      AnnualGoalsService.insertAnnualGoal(
        req.app.get('db'),
        newGoal
      )
        .then(goal => {
          res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${goal.id}`))
            .json(serializeGoal(goal))
        })
        .catch(next)
    })
  
    annualGoalsRouter
        .route('/:goal_id')
        .all((req, res, next) => {
            AnnualGoalsService.getById(
                req.app.get('db'),
                req.params.goal_id
        )
        .then(goal => {
          if (!goal) {
            return res.status(404).json({
              error: { message: `Goal doesn't exist` }
            })
          }
          res.goal = goal
          //don't forget to call enxt so the next middleware happens!
          next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeGoal(res.goal))
    })
    .delete((req, res, next) => {
        AnnaulGoalsService.deleteAnnualGoal(
            req.app.get('db'),
            req.params.goal_id
        )
        .then(numRowsAffected => {
              res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
      const { content, goal_category } = req.body
      const goalToUpdate = { content, goal_category }
  
      const numberOfValues = Object.values(goalToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
        return res.status(400).json({
          error: {
            message: `Request body must content either 'content' or 'category'`
          }
        })
  
      AnnualGoalsService.updateAnnualGoal(
        req.app.get('db'),
        req.params.goal_id,
        goalToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })
  

module.exports = annualGoalsRouter