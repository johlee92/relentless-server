-- psql -U dunder_mifflin -d relentless -f ./migrations/001.undo.create_relentless_goals.sql

DROP TABLE IF EXISTS weekly_goals;
DROP TABLE IF EXISTS monthly_goals;
DROP TABLE IF EXISTS annual_goals;
