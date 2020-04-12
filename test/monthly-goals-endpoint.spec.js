const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Monthly Goals Endpoints', function() {
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
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`GET /api/monthlyGoals`, () => {
        context(`Given no goals`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                .get('/api/monthlyGoals')
                .expect(200, [])
            })
        })

        context('Given there are goals in the database', () => {
            beforeEach('insert annual goals', () => {
                return helpers.seedGoalsTables(
                    db,
                    'annual',
                    testAnnualGoals,
                )
            })

            beforeEach('insert monthly goals', () => {
                return helpers.seedGoalsTables(
                    db,
                    'monthly',
                    testMonthlyGoals,
                )
            })

            beforeEach('insert weekly goals', () => {
                return helpers.seedGoalsTables(
                    db,
                    'weekly',
                    testWeeklyGoals,
                )
            })

            it('responds with 200 and all of the goals', () => {
                const expectedGoals = testMonthlyGoals.map(goal =>
                    helpers.makeExpectedGoal(
                        view,
                        goal,
                    )
                )
            
                return supertest(app)
                    .get('/api/monthlyGoals')
                    .expect(200, expectedGoals)
            })
        })

        context(`Given an XSS attack goal`, () => {
            const {
                maliciousGoal,
                expectedGoal,
            } = helpers.makeMaliciousGoal(view)

            beforeEach('insert annual goals', () => {
                return helpers.seedGoalsTables(
                    db,
                    'annual',
                    testAnnualGoals,
                )
            })

            beforeEach('insert monthly goals', () => {
                return helpers.seedGoalsTables(
                    db,
                    'monthly',
                    testMonthlyGoals,
                )
            })

            beforeEach('insert weekly goals', () => {
                return helpers.seedGoalsTables(
                    db,
                    'weekly',
                    testWeeklyGoals,
                )
            })

            beforeEach('insert malicious goal', () => {
                return helpers.seedMaliciousGoal(
                    db,
                    view,
                    maliciousGoal,
                )
            })

            it('removes XSS attack content', () => {
                return supertest(app)
                    .get(`/api/monthlyGoals`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body[res.body.length-1].content).to.eql(expectedGoal.content)
                })
            })
        })
    })

    describe(`GET /api/monthlyGoals/:goal_id`, () => {
        context(`Given no goals`, () => {

            it(`responds with 404`, () => {
                const goalId = 123456789
                return supertest(app)
                    .get(`/api/monthlyGoals/${goalId}`)
                    .expect(404, { error: { message: `Goal doesn't exist` } })
            })
        })

        context('Given there are goals in the database', () => {
            beforeEach('insert annual goals', () => {
                return helpers.seedGoalsTables(
                    db,
                    'annual',
                    testAnnualGoals,
                )
            })

            beforeEach('insert monthly goals', () => {
                return helpers.seedGoalsTables(
                    db,
                    'monthly',
                    testMonthlyGoals,
                )
            })

            beforeEach('insert weekly goals', () => {
                return helpers.seedGoalsTables(
                    db,
                    'weekly',
                    testWeeklyGoals,
                )
            })

            it('responds with 200 and the specified goal', () => {
                const goalId = 2
                const expectedGoal = helpers.makeExpectedGoal(
                    view,
                    testMonthlyGoals[goalId - 1],
                )

                return supertest(app)
                    .get(`/api/monthlyGoals/${goalId}`)
                    .expect(200, expectedGoal)
            })
        })

        context(`Given an XSS attack goal`, () => {
            const {
                maliciousGoal,
                expectedGoal,
            } = helpers.makeMaliciousGoal(view)

            beforeEach('insert annual goals', () => {
                return helpers.seedGoalsTables(
                    db,
                    'annual',
                    testAnnualGoals,
                )
            })

            beforeEach('insert monthly goals', () => {
                return helpers.seedGoalsTables(
                    db,
                    'monthly',
                    testMonthlyGoals,
                )
            })

            beforeEach('insert weekly goals', () => {
                return helpers.seedGoalsTables(
                    db,
                    'weekly',
                    testWeeklyGoals,
                )
            })

            beforeEach('insert malicious goal', () => {
                return helpers.seedMaliciousGoal(
                    db,
                    view,
                    maliciousGoal,
                )
            })

            it('removes XSS attack content', () => {
                return supertest(app)
                    .get(`/api/monthlyGoals/${maliciousGoal.id}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.content).to.eql(expectedGoal.content)
                })
            })
        })
    })

})