const MonthlyGoalsService = {
    getAllMonthlyGoals(knex) {
        return knex.select('*').from('monthly_goals')
    },

    insertMonthlyGoal(knex, newGoal) {
        // returned an empty object that says that the promise has been resolved
        // return Promise.resolve({})
        return knex
            .insert(newGoal)
            .into('monthly_goals')
            .returning('*')
            .then(arrayOfRows => {
                return arrayOfRows[0]
            })
    },

    getById(knex, id) {
        return knex.from('monthly_goals').select('*').where('id', id).first()
    },

    deleteMonthlyGoal(knex, id) {
        return knex('monthly_goals')
            .where({ id })
            .delete()
    },

    updateMonthlyGoal(knex, id, newGoalFields) {
        return knex('monthly_goals')
            .where({ id })
            .update(newGoalFields)
    }
}

module.exports = MonthlyGoalsService;