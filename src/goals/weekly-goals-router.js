const path = require('path')
const express = require('express')
const xss = require('xss')
const WeeklyGoalsService = require('./weekly-goals-service')

const weeklyGoalsRouter = express.Router()
const jsonParser = express.json()

const serializeGoal = goal => ({
    id: goal.id,
    content: xss(goal.content),
    date_created: goal.date_created,
    complete: goal.complete,
    user_id: goal.user_id
  })
  
  weeklyGoalsRouter
    .route('/')
    .get((req, res, next) => {
      const knexInstance = req.app.get('db')
      WeeklyGoalsService.getAllWeeklyGoals(knexInstance)
        .then(goals => {
          res.json(goals.map(serializeGoal))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
      const { content, monthly_goal } = req.body
      const newGoal = { content, monthly_goal }
  
      for (const [key, value] of Object.entries(newGoal))
        if (value == null)
          return res.status(400).json({
            error: { message: `Missing '${key}' in request body` }
          })
  
      WeeklyGoalsService.insertWeeklyGoal(
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
  
    weeklyGoalsRouter
        .route('/:goal_id')
        .all((req, res, next) => {
            WeeklyGoalsService.getById(
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
        AnnaulGoalsService.deleteWeeklyGoal(
            req.app.get('db'),
            req.params.goal_id
        )
        .then(numRowsAffected => {
              res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
      const { content, complete } = req.body
      const goalToUpdate = { content, complete }
  
      const numberOfValues = Object.values(goalToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
        return res.status(400).json({
          error: {
            message: `Request body must contain either 'content' or 'complete'`
          }
        })
  
      WeeklyGoalsService.updateWeeklyGoal(
        req.app.get('db'),
        req.params.goal_id,
        goalToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })
  

module.exports = weeklyGoalsRouter