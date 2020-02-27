-- psql -U dunder_mifflin -d relentless -f ./migrations/002.undo.alter_annual_goals.sql

ALTER TABLE annual_goals DROP COLUMN IF EXISTS goal_category;

DROP TYPE IF EXISTS category;