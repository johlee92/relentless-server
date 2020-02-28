-- psql -U dunder_mifflin -d relentless -f ./seeds/seed.relentless_goals.sql
-- first remove any data that may be present
TRUNCATE  annual_goals, monthly_goals, weekly_goals RESTART IDENTITY CASCADE;

-- used the datepart function for getting month number or week number

-- insert some annual goals
INSERT INTO annual_goals (content, complete, goal_category, date_created)
VALUES
('Improve my physical, mental and spiritual aspects of health', false, 'Health', '2020-01-01T00:00:00.000Z'),
('Get my masters degree; get into a medical school; set yourself up for success in medical school', false, 'Professional', '2020-01-01T00:00:00.000Z'),
('Seeing how my career trajectory fit in overall healthcare industry by connecting myself to resources {communication skill-building, finding mentor}', false, 'Professional', '2020-01-01T00:00:00.000Z');
-- ('To develop confidence in personal finance management, including increase savings rate to at least 30% of post-tax income', false, 'Financial', '2020-01-01T00:00:00.000Z')
-- ('Enhance verbal communication ability to speak with clarity and the desired intention; move on to written skills if possible', false, 'Personal', '2020-01-01T00:00:00.000Z')
-- ('Enhance social network, including going beyond finance, Penn, and TAS, current age range.', false, 'Social', '2020-01-01T00:00:00.000Z')

-- insert some monthly goals
INSERT INTO monthly_goals (content, complete, annual_goal, date_created)
VALUES
('Continue to build on my exercise routine. Be able to swim 800m freestyle in under 10 minutes', false, 1, '2020-01-05T00:00:00.000Z'),
('Read 50 papers, 3 papers per day. Create outline of thesis paper.', false, 2, '2020-01-05T00:00:00.000Z'),
('Develop my own framework for communicating my research findings at the Galper Lab, by first studying reports of pharmaceutical companies and consulting groups. ', false, 3, '2020-01-05T00:00:00.000Z'),
-- ('Review past several month’s spending, identify areas of cost savings, and act on those cost savings areas.', false, 4, '2020-01-05T00:00:00.000Z')
-- ('Record and listen to me reading an article from WSJ, Economist, or similar publication 3 times weekly.', false, 5, '2020-01-05T00:00:00.000Z')
-- ('Analyze existing communities; figure out what type of people are missing in my network.', false, 6, '2020-01-05T00:00:00.000Z')
('Get into a routine of improving physical health', true, 1, '2020-02-05T00:00:00.000Z'),
('Put myself in the best possible position to be successful for the interview in February', true, 2, '2020-02-05T00:00:00.000Z'),
('Be able to speak intelligently about Taiwanese healthcare, hospital administration at Tufts and in the US, and common topics on medical ethics', true, 3, '2020-02-05T00:00:00.000Z');
-- ('Develop framework and workbook to track detailed spend in the week.', true, 4, '2020-02-05T00:00:00.000Z')
-- ('Get into a routine of improving voice using exercises taught in class.', true, 5, '2020-02-05T00:00:00.000Z')
-- ('Analyze existing communities; figure out what type of people are missing in my network.', false, 6, '2020-02-05T00:00:00.000Z')

-- insert some weekly goals
INSERT INTO weekly_goals (content, complete, monthly_goal, date_created)
VALUES
('Get healthy (recover from flu). Swim twice this week, and run on the treadmill at least once. Stretch/Yoga the rest of the days.', true, 1, '2020-02-17T00:00:00.000Z'),
('Read 18 papers, 3 papers per day. Annotate.', false, 2, '2020-02-17T00:00:00.000Z'),
('Create master word document for project, including hyperlinks to different files. Transfer presentations to Regenera onto this document.', false, 3, '2020-02-17T00:00:00.000Z'),
('Generate an idea list of 10+ ways to cut costs.', false, 4, '2020-02-24T00:00:00.000Z'),
('Record and listen to me reading an article from WSJ, Economist, or similar publication 3 times weekly.', false, 5, '2020-02-24T00:00:00.000Z'),
('Continue to record on my CRM and begin to generate ideas for types of people to address monthly question.', false, 6, '2020-02-24T00:00:00.000Z'),
('10 minute meditation every day at noon. Three cardio days. One swim day. The other four days are 10+ minute stretching or weightlifting. No caffeine until noon.', false, 1, '2020-03-02T00:00:00.000Z'),
('Satisfied with 95% of my answers and delivery in Saturday afternoon’s mock interview. Practice all questions that have been asked in mock interviews one time through by Wednesday. Consolidate all advice and practice again by Friday.', false, 2, '2020-03-02T00:00:00.000Z'),
('Make concrete of list takeaways on Taiwanese healthcare, hospital administration in the US, biotech,and ethics on (end-of-life care, medical proxy, and HIPAA) for the purpose of answering interview questions.', false, 3, '2020-03-02T00:00:00.000Z'),
('Continue to monitor the Mint framework and workbook, and determine whether it’s sufficient for the short term', false, 4, '2020-03-02T00:00:00.000Z'),
('Focus on three daily exercises that came from voice coaching: 1) tape listening, 2) intonation/speech stairs/speech notebook, and 3) tongue twisters', false, 5, '2020-03-02T00:00:00.000Z'),
('Fully migrate and test my excel CRM worksheet. Continue to add individuals as appropriate', false, 6, '2020-03-02T00:00:00.000Z');
