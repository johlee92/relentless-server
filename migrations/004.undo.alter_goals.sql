-- psql -U dunder_mifflin -d relentless -f ./migrations/004.undo.alter_goals.sql

ALTER TABLE annual_goals DROP COLUMN IF EXISTS year_num;
ALTER TABLE monthly_goals DROP COLUMN IF EXISTS month_num;
ALTER TABLE weekly_goals DROP COLUMN IF EXISTS week_num;