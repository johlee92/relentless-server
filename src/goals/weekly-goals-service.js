const WeeklyGoalsService = {
    getAllWeeklyGoals(knex) {
        return knex.select('*').from('weekly_goals')
    },

    insertWeeklyGoal(knex, newGoal) {
        // returned an empty object that says that the promise has been resolved
        // return Promise.resolve({})
        return knex
            .insert(newGoal)
            .into('weekly_goals')
            .returning('*')
            .then(arrayOfRows => {
                return arrayOfRows[0]
            })
    },

    getById(knex, id) {
        return knex.from('weekly_goals').select('*').where('id', id).first()
    },

    deleteWeeklyGoal(knex, id) {
        return knex('weekly_goals')
            .where({ id })
            .delete()
    },

    updateWeeklyGoal(knex, id, newGoalFields) {
        return knex('weekly_goals')
            .where({ id })
            .update(newGoalFields)
    }
}

module.exports = WeeklyGoalsService;