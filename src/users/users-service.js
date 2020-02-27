const UsersService = {
    getAllUsers(knex) {
      return knex.select('*').from('relentless_users')
    },
  
    insertUser(knex, newUser) {
      return knex
        .insert(newUser)
        .into('relentless_users')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('relentless_users')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteUser(knex, id) {
      return knex('relentless_users')
        .where({ id })
        .delete()
    },
  
    updateUser(knex, id, newUserFields) {
      return knex('relentless_users')
        .where({ id })
        .update(newUserFields)
    },
  }
  
  module.exports = UsersService