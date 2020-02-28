-- psql -U dunder_mifflin -d relentless -f ./migrations/002.do.alter_annual_goals.sql

CREATE TYPE category AS ENUM (
    'Financial',
    'Professional',
    'Health',
    'Relationships',
    'Social',
    'Personal',
    'Other'
);

ALTER TABLE annual_goals
    ADD COLUMN
        goal_category category;
