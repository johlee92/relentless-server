-- psql -U dunder_mifflin -d relentless -f ./migrations/003.undo.create_relentless_users.sql

ALTER TABLE annual_goals
  DROP COLUMN user_id;

DROP TABLE IF EXISTS relentless_users;