const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.skip('Monthly Goals Endpoints', function() {
    let db;

    //get the test data from the helper
    const {
        testAnnualGoals,
        testMonthlyGoals,
        testWeeklyGoals
    } = helpers.makeGoalsFixtures()

    //letting the helper know that this is for the monthly goals endpoint
    const view = 'monthly';

    //creates the knex instance for the database before each test suite
    before('make knex instance', () => {
        console.log('before connect from db')
    })

    after('disconnect from db', () => console.log('after disconnect from db'))

    before('cleanup', () => console.log('before cleanup tables'))

    afterEach('cleanup', () => console.log('afterEach cleanup tables'))

    describe(`GET /api/monthlyGoals`, () => {
        context(`Given no articles`, () => {
            it('responds with 404 not found', () => {
            })
        })

        context('Given there are goals in the database', () => {
            beforeEach('insert goals', () => {
                console.log('beforeEach insert goals')
            })

            it('responds with 200 and all of the articles', () => {
            })
        })

        context(`Given an XSS attack goal`, () => {
            const {
                maliciousGoal,
                expectedGoal,
            } = helpers.makeMaliciousGoal(view)

            beforeEach('insert goals', () => {
                console.log('beforeEach insert goals')
            })

            beforeEach('insert malicious goal', () => {
                console.log('beforeEach insert malicious goal')
            })

            it('removes XSS attack content', () => {
            })
        })
    })

    describe(`GET /api/monthlyGoals/:goal_id`, () => {
        context(`Given no goals`, () => {

            it(`responds with 404`, () => {
            })
        })

        context('Given there are articles in the database', () => {
            beforeEach('insert goals', () => {
                console.log('beforeEach insert goals')
            })

            it('responds with 200 and the specified article', () => {
            })
        })

        context(`Given an XSS attack article`, () => {
            const {
                maliciousGoal,
                expectedGoal,
            } = helpers.makeMaliciousGoal(view)

            beforeEach('insert goals', () => {
                console.log('beforeEach insert goals')
            })

            beforeEach('insert malicious goal', () => {
                console.log('beforeEach insert malicious goal')
            })

            it('removes XSS attack content', () => {
            })
        })
    })

})