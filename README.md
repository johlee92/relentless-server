# Relentless Server!
This is the backend server for the Relentless project. It includes basic CRUD operations.

## Key Endpoints
GET - obtains all goals in database and related information 
POST - allows adding new goals into database, with the required inputs
PATCH - updates existing goals
DELETE - removes specific goals from the database

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

## Sample Data
- To seed the database for development: `psql -U relentless -d relentless -a -f seeds/seed.relentless_goals.sql`
- To clear seed data: `psql -U relentless -d relentless -a -f seeds/trunc.relentless_goals.sql`

#### Scripts
Start the application `npm start`
Start nodemon for the application `npm run dev`
Run the tests `npm test`
Migrate the dev database `npm run migrate`
Migrate the test database `npm run migrate:test`

##### Deploying
When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.