# Relentless
This is the backend server for the Relentless project.
It includes basic CRUD operations for all three major data sources
(i.e. annual goals, monthly goals, and weekly goals) that are critical
to the app's functionality.

Link to Live App: https://fast-hollows-95993.herokuapp.com/api

#### Database Setup

To set up the database:
1. Make sure you are in psql in your command line.
2. Run the SQL command `CREATE USER achiever;`.
3. Run the SQL command `CREATE DATABASE relentless OWNER achiever;`.
4. Ensure your .env file is created and has the line `DATABASE_URL="postgresql://achiever@localhost/relentless"`.
5. Exit psql and run the command `npm run migrate` to create the tables in the database.

Note that step 5 (and specifically migrating up to step 4) seeds the tabs with data.

## Documentation of API
GET - obtains all goals in database and related information 
POST - allows adding new goals into database, with the required inputs

Please note each of the above operations are available for the three major data sources.

### Endpoints

Descriptions of how to operate the critical endpoints are listed below.

#### Get all goals using GET /annualGoals or /monthlyGoals or /weeklyGoals 

Call this endpoint to see all goals that have been added and identified

Get all annual goals using GET /api/annualGoals
Get all monthly goals using GET /api/monthlyGoals
Get all weekly goals using GET /api/weeklyGoals

**Example:**
```javascript
fetch(`https://fast-hollows-95993.herokuapp.com/api/annualGoals`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
```
**Example response:**
```javascript
[
    {
        "id": 2,
        "content": "Get my masters degree; get into a medical school; set yourself up for success in medical school",
        "date_created": "2020-01-01T00:00:00.000Z",
        "goal_category": "Professional",
        "complete": false
    },
    {
        "id": 3,
        "content": "Seeing how my career trajectory fit in overall healthcare industry by connecting myself to resources {communication skill-building, finding mentor}",
        "date_created": "2020-01-01T00:00:00.000Z",
        "goal_category": "Professional",
        "complete": false
    },
    {
        "id": 1,
        "content": "Improve my physical, mental and spiritual aspects of health",
        "date_created": "2020-01-01T00:00:00.000Z",
        "goal_category": "Health",
        "complete": false
    }
]
```

#### Get a particular goal using GET /annualGoals/:goal_id or /monthlyGoals/:goal_id or /weeklyGoals/:goal_id

Call this endpoint to return information on a specific goal

Get all annual goals using GET /api/annualGoals/:goal_id
Get all monthly goals using GET /api/monthlyGoals/:goal_id
Get all weekly goals using GET /api/weeklyGoals/:goal_id

**Example:**
```javascript
fetch(`https://fast-hollows-95993.herokuapp.com/api/weeklyGoals/4`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
```

**Example response:**
```javascript
{
    "id": 4,
    "content": "Generate an idea list of 10+ ways to cut costs.",
    "date_created": "2020-02-24T00:00:00.000Z",
    "complete": true,
    "monthly_goal": 4
}
```

#### Add a location using POST /annualGoals or /monthlyGoals or /weeklyGoals

Call this endpoint to add new a goal into either annualGoals, monthlyGoals, or weeklyGoals tables

**Required / Optional Fields:**

For annual goals...
Required field(s): `content` (type = string), `date_created` (type = time)
Optional field(s): `goal_category` (must be either "Financial", "Professional", "Health", "Relationships", "Social", "Personal", or "Other"), `complete` (type = boolean), `date_modified` (type = time)

For monthly goals...
Required field(s): `content` (type = string), `annual_goal` (type = number), `date_created` (type = time)
Optional field(s): `complete` (type = boolean), `date_modified` (type = time)

For weekly goals...
Required field(s): `content` (type = string), `monthly_goal` (type = number), `date_created` (type = time)
Optional field(s): `complete` (type = boolean), `date_modified` (type = time)

If successful, the server responds with a status of 201 and the location data (see below). If you're missing a required field, you'll get a status of 400.

**Example request:**

```javascript
const newGoal = {
    content: "monthly goal for annual goal 1",
    annual_goal: 1,
    data_created: "2020-01-01T00:00:00.000Z"
};

fetch(`https://frozen-everglades-23155.herokuapp.com/api/monthlyGoals`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newLocation)
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
```

**Example response:**
```javascript
{
    "id": 13,
    "content": "monthly goal for annual goal 1",
    "date_created": "2020-01-01T00:00:00.000Z",
    "complete": false,
    "annual_goal": 1
}
```

### Technology Used
Node.js, JavaScript, PostgreSQL, Express
Mocha, Chai, Nodemon, Knex, Helmet, Morgan

### Set up
1. Clone this repository to your local machine `git clone PROJECT-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`

### Configuring Postgres

For tests involving time to run properly, your Postgres database must be configured to run in the UTC timezone.
1. Locate the `postgresql.conf` file for your Postgres installation.
    - OS X, Homebrew: `/usr/local/var/postgres/postgresql.conf`
2. Uncomment the `timezone` line and set it to `UTC` as follows:
```
# - Locale and Formatting -
datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

### Sample Data
- To seed the database for development: `psql -U relentless -d relentless -a -f seeds/seed.relentless_goals.sql`
- To clear seed data: `psql -U relentless -d relentless -a -f seeds/trunc.relentless_goals.sql`

### Scripts
Start the application `npm start`
Start nodemon for the application `npm run dev`
Run the tests `npm test`
Migrate the dev database `npm run migrate`
Migrate the test database `npm run migrate:test`

### Deploying
When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.