-- psql -U dunder_mifflin -d relentless -f ./migrations/004.do.alter_goals.sql

-- generated columns need to upgrade postgre up to v12

-- ALTER TABLE annual_goals
--     ADD year_num integer
--         GENERATED ALWAYS AS (id * 2);

-- ALTER TABLE annual_goals ADD year_num int AS (1 + 1);

-- ALTER TABLE annual_goals 
--     ADD Column year_num varchar(100); 
    
-- INSERT INTO annual_goals (year_num) 
--     VALUES SELECT DATEPART(year, date_created);

