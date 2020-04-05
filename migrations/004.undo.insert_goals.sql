-- psql -U dunder_mifflin -d relentless -f ./migrations/004.undo.insert_goals.sql

TRUNCATE
  annual_goals,
  monthly_goals,
  weekly_goals
  RESTART IDENTITY CASCADE;
