//suite of helpers for running the test suites

//creates the array with annual goals dummy data
function makeAnnualGoalsArray() {
    return [
        {
            id: 1,
            content: 'Improve my physical, mental and spiritual aspects of health',
            complete: false,
            goal_category: 'Health',
            date_created: new Date('2020-01-01T00:00:00.000Z'),
        },
        {
            id: 2,
            content: 'Get my masters degree; get into a medical school; set yourself up for success in medical school',
            complete: false,
            goal_category: 'Professional',
            date_created: new Date('2020-01-01T00:00:00.000Z'),
        },
        {
            id: 3,
            content: 'Seeing how my career trajectory fit in overall healthcare industry by connecting myself to resources {communication skill-building, finding mentor}',
            complete: false,
            goal_category: 'Professional',
            date_created: new Date('2020-01-01T00:00:00.000Z'),
        }
    ]
}

//creates the array with monthly goals dummy data
function makeMonthlyGoalsArray() {
    return [
        {
            id: 1,
            content: 'Continue to build on my exercise routine. Be able to swim 800m freestyle in under 10 minutes',
            complete: false,
            annual_goal: 1,
            date_created: new Date('2020-01-05T00:00:00.000Z'),
        },
        {
            id: 2,
            content: 'Read 50 papers, 3 papers per day. Create outline of thesis paper.',
            complete: false,
            annual_goal: 2,
            date_created: new Date('2020-01-05T00:00:00.000Z'),
        },
        {
            id: 3,
            content: 'Develop my own framework for communicating my research findings at the Galper Lab, by first studying reports of pharmaceutical companies and consulting groups.',
            complete: false,
            annual_goal: 3,
            date_created: new Date('2020-01-05T00:00:00.000Z'),
        },
        {
            id: 4,
            content: 'Get into a routine of improving physical health',
            complete: true,
            annual_goal: 1,
            date_created: new Date('2020-02-05T00:00:00.000Z'),
        },
        {
            id: 5,
            content: 'Put myself in the best possible position to be successful for the interview in February',
            complete: true,
            annual_goal: 2,
            date_created: new Date('2020-02-05T00:00:00.000Z'),
        },
        {
            id: 6,
            content: 'Be able to speak intelligently about Taiwanese healthcare, hospital administration at Tufts and in the US, and common topics on medical ethics',
            complete: true,
            annual_goal: 3,
            date_created: new Date('2020-02-05T00:00:00.000Z'),
        }
    ]
}

//creates the array with weekly goals dummy data
function makeWeeklyGoalsArray() {
    return [
        {
            id: 1,
            content: 'Get healthy (recover from flu). Swim twice this week, and run on the treadmill at least once. Stretch/Yoga the rest of the days.',
            complete: true,
            monthly_goal: 1,
            date_created: new Date('2020-02-17T00:00:00.000Z'),
        },
        {
            id: 2,
            content: 'Read 18 papers, 3 papers per day. Annotate.',
            complete: false,
            monthly_goal: 2,
            date_created: new Date('2020-02-17T00:00:00.000Z'),
        },
        {
            id: 3,
            content: 'Create master word document for project, including hyperlinks to different files. Transfer presentations to Regenera onto this document.',
            complete: false,
            monthly_goal: 3,
            date_created: new Date('2020-02-17T00:00:00.000Z'),
        },
        {
            id: 4,
            content: 'Generate an idea list of 10+ ways to cut costs.',
            complete: false,
            monthly_goal: 4,
            date_created: new Date('2020-02-24T00:00:00.000Z'),
        },
        {
            id: 5,
            content: 'Record and listen to me reading an article from WSJ, Economist, or similar publication 3 times weekly.',
            complete: false,
            monthly_goal: 5,
            date_created: new Date('2020-02-24T00:00:00.000Z'),
        },
        {
            id: 6,
            content: 'Continue to record on my CRM and begin to generate ideas for types of people to address monthly question.',
            complete: false,
            monthly_goal: 6,
            date_created: new Date('2020-02-24T00:00:00.000Z'),
        },
        {
            id: 7,
            content: '10 minute meditation every day at noon. Three cardio days. One swim day. The other four days are 10+ minute stretching or weightlifting. No caffeine until noon.',
            complete: false,
            monthly_goal: 1,
            date_created: new Date('2020-03-02T00:00:00.000Z'),
        },
        {
            id: 8,
            content: 'Satisfied with 95% of my answers and delivery in Saturday afternoon’s mock interview. Practice all questions that have been asked in mock interviews one time through by Wednesday. Consolidate all advice and practice again by Friday.',
            complete: false,
            monthly_goal: 2,
            date_created: new Date('2020-03-02T00:00:00.000Z'),
        },
        {
            id: 9,
            content: 'Make concrete of list takeaways on Taiwanese healthcare, hospital administration in the US, biotech,and ethics on (end-of-life care, medical proxy, and HIPAA) for the purpose of answering interview questions.',
            complete: false,
            monthly_goal: 3,
            date_created: new Date('2020-03-02T00:00:00.000Z'),
        },
        {
            id: 10,
            content: 'Continue to monitor the Mint framework and workbook, and determine whether it’s sufficient for the short term',
            complete: false,
            monthly_goal: 4,
            date_created: new Date('2020-03-02T00:00:00.000Z'),
        },
        {
            id: 11,
            content: 'Focus on three daily exercises that came from voice coaching: 1) tape listening, 2) intonation/speech stairs/speech notebook, and 3) tongue twisters',
            complete: false,
            monthly_goal: 5,
            date_created: new Date('2020-03-02T00:00:00.000Z'),
        },
        {
            id: 12,
            content: 'Fully migrate and test my excel CRM worksheet. Continue to add individuals as appropriate',
            complete: false,
            monthly_goal: 6,
            date_created: new Date('2020-03-02T00:00:00.000Z'),
        }
    ]
}

function makeExpectedGoal(view, goal) {
    if (view.toLowerCase() === 'annual') {
        return {
            id: goal.id,
            content: goal.content,
            complete: goal.complete,
            category: goal.goal_category,
            date_created: goal.date_created.toISOString(),
            user_id: null
        }
    } else if (view.toLowerCase() === 'monthly') {
        return {
            id: goal.id,
            content: goal.content,
            complete: goal.complete,
            annual_goal: goal.annual_goal,
            date_created: goal.date_created.toISOString(),
        }
    } else if (view.toLowerCase() === 'weekly') {
        return {
            id: goal.id,
            content: goal.content,
            complete: goal.complete,
            monthly_goal: goal.monthly_goal,
            date_created: goal.date_created.toISOString(),
        }
    }
}

//creates malicious conent to test
function makeMaliciousGoal(view) {

    let maliciousGoal;
    
    if (view.toLowerCase() === 'annual') {
        maliciousGoal = {
            id: 911,
            content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
            complete: false,
            goal_category: 'Health',
            date_created: new Date('2020-02-17T00:00:00.000Z'),
        }
    } else if (view.toLowerCase() === 'monthly') {
        maliciousGoal = {
            id: 911,
            content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
            annual_goal: 1,
            complete: false,
            date_created: new Date('2020-02-17T00:00:00.000Z'),
        }
    } else if (view.toLowerCase() === 'weekly') {
        maliciousGoal = {
            id: 911,
            content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
            monthly_goal: 1,
            complete: false,
            date_created: new Date('2020-02-17T00:00:00.000Z'),
        }
    }

    const expectedGoal = {
        ...makeExpectedGoal(view, maliciousGoal),
        content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    }

    return {
        maliciousGoal,
        expectedGoal,
    }
}

//creates the necesssary test data
function makeGoalsFixtures() {
    const testAnnualGoals = makeAnnualGoalsArray();
    const testMonthlyGoals = makeMonthlyGoalsArray();
    const testWeeklyGoals = makeWeeklyGoalsArray();
    return { testAnnualGoals, testMonthlyGoals, testWeeklyGoals }
}

//cleans up the tables after use
function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
        `TRUNCATE
            weekly_goals,
            monthly_goals,
            annual_goals
            RESTART IDENTITY CASCADE;
        `
        )
        // .then(() =>
        //     Promise.all([
        //         trx.raw(`ALTER SEQUENCE weekly_goals_id_seq minvalue 0 START WITH 1`),
        //         trx.raw(`ALTER SEQUENCE monthly_goals_id_seq minvalue 0 START WITH 1`),
        //         trx.raw(`ALTER SEQUENCE annual_goals_id_seq minvalue 0 START WITH 1`),
        //         // trx.raw(`ALTER SEQUENCE weekly_goals_monthly_goal_fkey minvalue 0 START WITH 1`),
        //         // trx.raw(`ALTER SEQUENCE montly_goals_annual_goal_fkey minvalue 0 START WITH 1`),
        //         trx.raw(`SELECT setval('weekly_goals_id_seq', 0)`),
        //         trx.raw(`SELECT setval('monthly_goals_id_seq', 0)`),
        //         trx.raw(`SELECT setval('annual_goals_id_seq', 0)`),
        //         // trx.raw(`SELECT setval('weekly_goals_monthly_goal_fkey', 0)`),
        //         // trx.raw(`SELECT setval('monthly_goals_annual_goal_fkey', 0)`),
        //     ])
        // )
    )
}

function seedGoalsTables(db, view, goals) {
    
    if (view.toLowerCase() === 'annual') {
        // use a transaction to group the queries and auto rollback on any failure
        return db.transaction(async trx => {
            await trx.into('annual_goals').insert(goals)
            // update the auto sequence to match the forced id values
            // await Promise.all([
            //     trx.raw(
            //         `SELECT setval('annual_goals_id_seq', ?)`,
            //         [goals[goals.length - 1].id],
            //     ),
            // ])
        })
    } else if (view.toLowerCase() === 'monthly') {
        // use a transaction to group the queries and auto rollback on any failure
        return db.transaction(async trx => {
            await trx.into('monthly_goals').insert(goals)
            // update the auto sequence to match the forced id values
            // await Promise.all([
            //     trx.raw(
            //         `SELECT setval('monthly_goals_id_seq', ?)`,
            //         [goals[goals.length - 1].id],
            //     ),
            // ])
        })
    } else if (view.toLowerCase() === 'weekly') {
        // use a transaction to group the queries and auto rollback on any failure
        return db.transaction(async trx => {
            await trx.into('weekly_goals').insert(goals)
            // update the auto sequence to match the forced id values
            // await Promise.all([
            //     trx.raw(
            //         `SELECT setval('weekly_goals_id_seq', ?)`,
            //         [goals[goals.length - 1].id],
            //     ),
            // ])
        })
    }
    
}

//seeds the macilious goal for testing into database
function seedMaliciousGoal(db, view, goal) {
    if (view.toLowerCase() === 'annual') {
        return db
            .into('annual_goals')
            .insert([goal])
    } else if (view.toLowerCase() === 'monthly') {
        return db
            .into('monthly_goals')
            .insert([goal])
    } else if (view.toLowerCase() === 'weekly') {
        return db
            .into('weekly_goals')
            .insert([goal])
    }
}

//basic authorization header for the authorization functionalities
function makeAuthHeader(user) {
    const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64')
    return `Basic ${token}`
}

module.exports = {
    makeExpectedGoal,
    makeMaliciousGoal,
    makeGoalsFixtures,
    cleanTables,
    seedGoalsTables,
    seedMaliciousGoal,
    makeAuthHeader,
}
  