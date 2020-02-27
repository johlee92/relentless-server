const AnnualGoalsService = {
    getAllAnnualGoals(knex) {
        return knex.select('*').from('annual_goals')
    },

    insertAnnualGoal(knex, newGoal) {
        // returned an empty object that says that the promise has been resolved
        // return Promise.resolve({})
        return knex
            .insert(newGoal)
            .into('annual_goals')
            .returning('*')
            .then(arrayOfRows => {
                return arrayOfRows[0]
            })
    },

    getById(knex, id) {
        return knex.from('annual_goals').select('*').where('id', id).first()
    },

    deleteAnnualGoal(knex, id) {
        return knex('annual_goals')
            .where({ id })
            .delete()
    },

    updateAnnualGoal(knex, id, newGoalFields) {
        return knex('annual_goals')
            .where({ id })
            .update(newGoalFields)
    }
}

module.exports = AnnualGoalsService;