const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Weekly Goals Endpoints', function() {
    let db;

    //get the test data from the helper
    const {
        testAnnualGoals,
        testMonthlyGoals,
        testWeeklyGoals
    } = helpers.makeGoalsFixtures()

    //letting the helper know that this is for the weekly goals endpoint
    const view = 'weekly';

    //creates the knex instance for the database before each test suite
    before('make knex instance', () => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`GET /api/weeklyGoals`, () => {
        context(`Given no articles`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                .get('/api/weeklyGoals')
                .expect(200, [])
            })
        })

        context('Given there are goals in the database', () => {
            beforeEach('insert goals', () => {
                helpers.seedGoalsTables(
                    db,
                    'annual',
                    testAnnualGoals,
                )
                helpers.seedGoalsTables(
                    db,
                    'monthly',
                    testMonthlyGoals,
                )
                helpers.seedGoalsTables(
                    db,
                    'weekly',
                    testWeeklyGoals,
                )
            })

            it('responds with 200 and all of the articles', () => {
                const expectedGoals = testWeeklyGoals.map(goal =>
                    helpers.makeExpectedGoal(
                        view,
                        goal,
                    )
                )
            
                return supertest(app)
                    .get('/api/weeklyGoals')
                    .expect(200, expectedGoals)
            })
        })

        // context(`Given an XSS attack goal`, () => {
        //     const {
        //         maliciousGoal,
        //         expectedGoal,
        //     } = helpers.makeMaliciousGoal(view)
            
        //     beforeEach('insert goals', () => {
        //         helpers.seedGoalsTables(
        //             db,
        //             'annual',
        //             testAnnualGoals,
        //         )
        //         helpers.seedGoalsTables(
        //             db,
        //             'monthly',
        //             testMonthlyGoals,
        //         )
        //         helpers.seedGoalsTables(
        //             db,
        //             'weekly',
        //             testWeeklyGoals,
        //         )
        //     })

        //     beforeEach('insert malicious goal', () => {
        //         return helpers.seedMaliciousGoal(
        //             db,
        //             view,
        //             maliciousGoal,
        //         )
        //     })

        //     it('removes XSS attack content', () => {
        //         return supertest(app)
        //             .get(`/api/weeklyGoals`)
        //             .expect(200)
        //             .expect(res => {
        //                 expect(res.body[res.body.length-1].content).to.eql(expectedGoal.content)
        //         })
        //     })
        // })
    })

    describe(`GET /api/weeklyGoals/:goal_id`, () => {
        context(`Given no goals`, () => {

            it(`responds with 404`, () => {
                const goalId = 123456789
                return supertest(app)
                    .get(`/api/weeklyGoals/${goalId}`)
                    .expect(404, { error: { message: `Goal doesn't exist` } })
            })
        })

        // context('Given there are articles in the database', () => {
        //     beforeEach('insert goals', () => {
        //         helpers.seedGoalsTables(
        //             db,
        //             'annual',
        //             testAnnualGoals,
        //         )
        //         helpers.seedGoalsTables(
        //             db,
        //             'monthly',
        //             testMonthlyGoals,
        //         )
        //         helpers.seedGoalsTables(
        //             db,
        //             'weekly',
        //             testWeeklyGoals,
        //         )
        //     })

        //     it('responds with 200 and the specified article', () => {
        //         const goalId = 2
        //         const expectedGoal = helpers.makeExpectedGoal(
        //             view,
        //             testWeeklyGoals[goalId - 1],
        //         )

        //         return supertest(app)
        //             .get(`/api/weeklyGoals/${goalId}`)
        //             .expect(200, expectedGoal)
        //     })
        // })

        // context(`Given an XSS attack article`, () => {
        //     const {
        //         maliciousGoal,
        //         expectedGoal,
        //     } = helpers.makeMaliciousGoal(view)

        //     beforeEach('insert malicious goal', () => {
        //         return helpers.seedMaliciousGoal(
        //             db,
        //             view,
        //             maliciousGoal,
        //         )
        //     })

        //     it('removes XSS attack content', () => {
        //         return supertest(app)
        //             .get(`/api/weeklyGoals/${maliciousGoal.id}`)
        //             .expect(200)
        //             .expect(res => {
        //                 expect(res.body.content).to.eql(expectedGoal.content)
        //         })
        //     })
        // })
    })

})