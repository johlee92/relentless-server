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
