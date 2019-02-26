DROP DATABASE Engaging_U;
CREATE DATABASE IF NOT EXISTS Engaging_U;
USE Engaging_U;

CREATE TABLE REMINDER
(
REMINDER_ID INT NOT NULL,
TIME_LEFT INT NOT NULL,
REMINDER_TEXT VARCHAR(100) NOT NULL,
CONSTRAINT REMINDER_PK PRIMARY KEY (REMINDER_ID)
);

CREATE TABLE TRAIL
(
TRAIL_ID INT NOT NULL,
TITLE VARCHAR(100) NOT NULL,
TOTAL_TIME INT NOT NULL,
CONSTRAINT TRAIL_PK PRIMARY KEY (TRAIL_ID)
);

CREATE TABLE TRAIL_REMINDERS
(
TRAIL_ID INT NOT NULL,
REMINDER_ID INT NOT NULL,
CONSTRAINT TRAIL_REMINDERS_PK PRIMARY KEY (TRAIL_ID, REMINDER_ID)
);

CREATE TABLE TRAIL_INSTANCE
(
TRAIL_INSTANCE_ID VARCHAR(10) NOT NULL,
TRAIL_ID INT NOT NULL,
ISACTIVE TINYINT NOT NULL,
HASSTARTED TINYINT NOT NULL,
CONSTRAINT TRAIL_INSTANCE_PK PRIMARY KEY (TRAIL_INSTANCE_ID),
CONSTRAINT TRAIL_INSTANCE_FK1 FOREIGN KEY (TRAIL_ID)
REFERENCES TRAIL(TRAIL_ID) 
);

CREATE TABLE FEEDBACK_QUESTION
(
FEEDBACK_QUESTION_ID INT NOT NULL,
FEEDBACK_QUESTION VARCHAR(100) NOT NULL,
CONSTRAINT FEEDBACK_PK PRIMARY KEY (FEEDBACK_QUESTION_ID)
);

CREATE TABLE FEEDBACK_SUBMISSION
(
FEEDBACK_SUBMISSION_ID INT NOT NULL,
FEEDBACK_ANSWER VARCHAR(100) NOT NULL,
FEEDBACK_QUESTION_ID INT NOT NULL,
TRAIL_INSTANCE_ID VARCHAR(10) NOT NULL,
CONSTRAINT FEEDBACK_SUBMISSION_PK PRIMARY KEY (FEEDBACK_SUBMISSION_ID),
CONSTRAINT FEEDBACK_SUBMISSION_FK1 FOREIGN KEY (FEEDBACK_QUESTION_ID)
REFERENCES FEEDBACK_QUESTION(FEEDBACK_QUESTION_ID),
CONSTRAINT FEEDBACK_SUBMISSION_FK2 FOREIGN KEY (TRAIL_INSTANCE_ID)
REFERENCES TRAIL_INSTANCE(TRAIL_INSTANCE_ID)
);

CREATE TABLE TEAM
(
TEAM_ID INT NOT NULL,
TEAM_POINTS INT NOT NULL,
LATITUDE VARCHAR(20) NOT NULL,
LONGTITUDE VARCHAR(20) NOT NULL,
TRAIL_INSTANCE_ID VARCHAR(10) NOT NULL,
CONSTRAINT TEAM_PK PRIMARY KEY (TEAM_ID, TRAIL_INSTANCE_ID),
CONSTRAINT TEAM_FK1 FOREIGN KEY (TRAIL_INSTANCE_ID)
REFERENCES TRAIL_INSTANCE(TRAIL_INSTANCE_ID)
);

CREATE TABLE PARTICIPANT
(
USER_ID INT NOT NULL,
USERNAME VARCHAR(100) NOT NULL,
TEAM_ID INT NOT NULL,
isLeader TINYINT NOT NULL,
CONSTRAINT PARTICIPANT_PK PRIMARY KEY (USER_ID),
CONSTRAINT PARTICIPANT_FK1 FOREIGN KEY (TEAM_ID)
REFERENCES TEAM(TEAM_ID)
);

CREATE TABLE NARRATIVE
(
NARRATIVE_ID INT NOT NULL,
NARRATIVE_TITLE VARCHAR(100) NOT NULL,
NARRATIVE VARCHAR(1000) NOT NULL,
CONSTRAINT NARRATIVE_PK PRIMARY KEY (NARRATIVE_ID)
);

CREATE TABLE HOTSPOT
(
HOTSPOT_NAME VARCHAR(50) NOT NULL,
LATITUDE VARCHAR(20) NOT NULL,
LONGTITUDE VARCHAR(20) NOT NULL,
CONSTRAINT HOTSPOT_PK PRIMARY KEY (HOTSPOT_NAME)
);

CREATE TABLE MISSION
(
MISSION_ID INT NOT NULL,
MISSION_TITLE VARCHAR(100) NOT NULL,
CONSTRAINT MISSION_PK PRIMARY KEY (MISSION_ID)
);

CREATE TABLE TRAIL_HOTSPOT
(
TRAIL_ID INT NOT NULL,
HOTSPOT_NAME VARCHAR(50) NOT NULL,
NARRATIVE_ID INT NOT NULL,
MISSION_ID INT NOT NULL,
CONSTRAINT TRAIL_HOTSPOT_PK PRIMARY KEY (TRAIL_ID, HOTSPOT_NAME,NARRATIVE_ID, MISSION_ID),
CONSTRAINT TRAIL_HOTSPOT_FK1 FOREIGN KEY (TRAIL_ID)
REFERENCES TRAIL(TRAIL_ID),
CONSTRAINT TRAIL_HOTSPOT_FK2 FOREIGN KEY (HOTSPOT_NAME)
REFERENCES HOTSPOT(HOTSPOT_NAME),
CONSTRAINT TRAIL_HOTSPOT_FK3 FOREIGN KEY (NARRATIVE_ID)
REFERENCES NARRATIVE(NARRATIVE_ID),
CONSTRAINT TRAIL_HOTSPOT_FK4 FOREIGN KEY (MISSION_ID)
REFERENCES MISSION(MISSION_ID)
);
-- CREATE TABLE TRAIL_MISSION
-- (
-- TRAIL_ID INT NOT NULL,
-- MISSION_ID INT NOT NULL,
-- HOTSPOT_NAME VARCHAR(50) NOT NULL,
-- CONSTRAINT TRAIL_MISSION_PK PRIMARY KEY (TRAIL_ID,MISSION_ID),
-- CONSTRAINT TRAIL_MISSION_FK1 FOREIGN KEY (TRAIL_ID)
-- REFERENCES TRAIL(TRAIL_ID),
-- CONSTRAINT TRAIL_MISSION_FK2 FOREIGN KEY (MISSION_ID)
-- REFERENCES MISSION(MISSION_ID),
-- CONSTRAINT TRAIL_MISSION_FK3 FOREIGN KEY (HOTSPOT_NAME)
-- REFERENCES HOTSPOT(HOTSPOT_NAME)
-- );

CREATE TABLE QUIZ
(
QUIZ_ID INT NOT NULL,
QUIZ_QUESTION VARCHAR(1000) NOT NULL,
QUIZ_ANSWER VARCHAR(1000) NOT NULL,
MISSION_ID INT NOT NULL,
CONSTRAINT QUIZ_PK PRIMARY KEY (QUIZ_ID),
CONSTRAINT QUIZ_FK1 FOREIGN KEY (MISSION_ID)
REFERENCES MISSION(MISSION_ID)
);

CREATE TABLE QUIZ_OPTION
(
QUIZ_ID INT NOT NULL,
QUIZ_OPTION_ID INT NOT NULL,
QUIZ_OPTION VARCHAR(1000) NOT NULL,
CONSTRAINT QUIZ_OPTION_PK PRIMARY KEY (QUIZ_ID, QUIZ_OPTION_ID),
CONSTRAINT QUIZ_OPTION_FK1 FOREIGN KEY (QUIZ_ID)
REFERENCES QUIZ(QUIZ_ID)
);

CREATE TABLE SUBMISSION_QUESTION
(
QUESTION_ID INT NOT NULL,
QUESTION VARCHAR(1000) NOT NULL,
MISSION_ID INT NOT NULL,
CONSTRAINT SUBMISSION_QUESTION_PK PRIMARY KEY (QUESTION_ID),
CONSTRAINT SUBMISSION_QUESTION_FK FOREIGN KEY (MISSION_ID)
REFERENCES MISSION(MISSION_ID)
);

CREATE TABLE DRAWING_QUESTION
(
QUESTION_ID INT NOT NULL,
QUESTION VARCHAR(1000) NOT NULL,
MISSION_ID INT NOT NULL,
CONSTRAINT DRAWING_QUESTION_PK PRIMARY KEY (QUESTION_ID),
CONSTRAINT DRAWING_QUESTION_FK FOREIGN KEY (MISSION_ID)
REFERENCES MISSION(MISSION_ID)
);

CREATE TABLE SUBMISSION
(SUBMISSION_ID INT NOT NULL,
SUBMISSION_IMAGE_URL VARCHAR(100) NOT NULL,
TEAM_ID INT NOT NULL,
TRAIL_INSTANCE_ID VARCHAR(10) NOT NULL,
SUBMISSION_QUESTION_ID INT,
DRAWING_QUESTION_ID INT,
CONSTRAINT SUBMISSION_PK PRIMARY KEY (SUBMISSION_ID),
CONSTRAINT SUBMISSION_FK1 FOREIGN KEY (TEAM_ID)
REFERENCES TEAM(TEAM_ID),
CONSTRAINT SUBMISSION_FK2 FOREIGN KEY (SUBMISSION_QUESTION_ID)
REFERENCES SUBMISSION_QUESTION(QUESTION_ID),
CONSTRAINT SUBMISSION_FK3 FOREIGN KEY (DRAWING_QUESTION_ID)
REFERENCES DRAWING_QUESTION(QUESTION_ID),
CONSTRAINT SUBMISSION_FK4 FOREIGN KEY (TRAIL_INSTANCE_ID)
REFERENCES TRAIL_INSTANCE(TRAIL_INSTANCE_ID)
);

CREATE TABLE TEAM_HOTSPOT_STATUS
(
HOTSPOT_NAME VARCHAR(50) NOT NULL,
TRAIL_INSTANCE_ID VARCHAR(10) NOT NULL,
TEAM_ID INT NOT NULL,
ISCOMPLETED TINYINT NOT NULL,
TIME_COMPLETED VARCHAR(50)
CONSTRAINT TEAM_HOTSPOT_STATUS_PK PRIMARY KEY (HOTSPOT_NAME, TRAIL_INSTANCE_ID, TEAM_ID),
CONSTRAINT TEAM_HOTSPOT_STATUS_FK1 FOREIGN KEY (HOTSPOT_NAME)
REFERENCES HOTSPOT(HOTSPOT_NAME),
CONSTRAINT TEAM_HOTSPOT_STATUS_FK2 FOREIGN KEY (TRAIL_INSTANCE_ID)
REFERENCES TEAM(TRAIL_INSTANCE_ID),
CONSTRAINT TEAM_HOTSPOT_STATUS_FK3 FOREIGN KEY (TEAM_ID)
REFERENCES TEAM(TEAM_ID)
);

CREATE TABLE ADMIN
(
USERNAME VARCHAR(50) NOT NULL,
USER_PASSWORD VARCHAR(50) NOT NULL,
CONSTRAINT ADMIN_PK PRIMARY KEY (USERNAME)
);

CREATE TABLE MULTIMEDIA
(
MULTIMEDIA_ID INT NOT NULL,
MULTIMEDIA_URL VARCHAR(50) NOT NULL,
CONSTRAINT MULTIMEDIA_PK PRIMARY KEY (MULTIMEDIA_ID)
);

CREATE TABLE DRAG_AND_DROP
(
DRAGANDDROP_ID INT NOT NULL,
DRAGANDDROP_QUESTION VARCHAR(1000) NOT NULL,
MISSION_ID INT NOT NULL,
CONSTRAINT DRAGANDDROP_PK PRIMARY KEY (DRAGANDDROP_ID),
CONSTRAINT DRAGANDDROP_FK1 FOREIGN KEY (MISSION_ID)
REFERENCES MISSION(MISSION_ID)
);

CREATE TABLE DRAG_AND_DROP_OPTION
(
DRAGANDDROP_ID INT NOT NULL,
DRAGANDDROP_QUESTION_OPTION VARCHAR(500) NOT NULL,
DRAGANDDROP_QUESTION_ANSWER VARCHAR(500) NOT NULL,
CONSTRAINT DRAG_AND_DROP_OPTION_PK PRIMARY KEY (DRAGANDDROP_ID,DRAGANDDROP_QUESTION_OPTION, DRAGANDDROP_QUESTION_ANSWER),
CONSTRAINT DRAG_AND_DROP_OPTION_FK1 FOREIGN KEY (DRAGANDDROP_ID)
REFERENCES DRAG_AND_DROP(DRAGANDDROP_ID)
);

CREATE TABLE ANAGRAM
(
ANAGRAM_ID INT NOT NULL,
ANAGRAM_WORD VARCHAR(1000) NOT NULL,
MISSION_ID INT NOT NULL,
CONSTRAINT ANAGRAM_PK PRIMARY KEY (ANAGRAM_ID),
CONSTRAINT ANAGRAM_FK1 FOREIGN KEY (MISSION_ID)
REFERENCES MISSION(MISSION_ID)
);

CREATE TABLE WORDSEARCH
(
WORDSEARCH_TITLE VARCHAR(100) NOT NULL,
MISSION_ID INT NOT NULL,
CONSTRAINT WORDSEARCH_PK PRIMARY KEY (WORDSEARCH_TITLE),
CONSTRAINT WORDSEARCH_FK1 FOREIGN KEY (MISSION_ID)
REFERENCES MISSION(MISSION_ID)
);

CREATE TABLE WORDSEARCH_WORD
(
WORDSEARCH_TITLE VARCHAR(100) NOT NULL,
WORD VARCHAR(100) NOT NULL,
CONSTRAINT WORDSEARCH_WORD_PK PRIMARY KEY (WORDSEARCH_TITLE,WORD),
CONSTRAINT WORDSEARCH_WORD_FK1 FOREIGN KEY (WORDSEARCH_TITLE)
REFERENCES WORDSEARCH(WORDSEARCH_TITLE)
);

INSERT INTO NARRATIVE VALUES
(1, 'LKCSB NARRATIVE','In 2000, SMU commenced its curriculum with the School of Business, welcoming its first batch of cohort in August. The SMU School of Business and university-wide scholars programme was named in perpetuity after Dr Lee Kong Chian in recognition of the Lee Foundation generous contribution of S$50 million to SMU in 2004. Dr Lee Kong Chain is a well-known Southeast Asia businessmen, philanthropist and community leader. SMU school of business is therefore known as LKCSB (Lee Kong Chian School of Business)'),
(2, 'SOA NARRATIVE','School of Accountancy (SOA) is the second largest school in SMU, with its humble beginnings going way back to 2000. The first Dean then was Professor Pang Yang Hoong, who was also part of the planning team at SMU. A lecture hall lies within SOA, being the only school to have a lecture hall. It was set up by the Chinese immigrants in the late 19th century, naming it after the charitable foundation Ngee Ann Kongsi - Ngee Ann Kongsi Auditorium.'),
(3, 'SOE NARRATIVE','The School of Economics and Social Science was established on 1 July 2002 under the Bachelor of Science degree. The Bachelor of Social Science undergraduate degree programme had 3 majors -Psychology, Sociology, and Political Science. In April 2007, the School of Economics and the School of Social Sciences were established as separate schools to better focus on the development of the undergraduate and graduate curricula and programmes, as well as faculty research in the respective disciplines. The current dean for School of Economics and School of Social Science are Prof Bryce Hool and Tan Yoo Guan respectively.'),
(4, 'SIS NARRATIVE','Established in 2003, School of Information Systems is a dynamic school that is constantly seeking to lift our education and research to a higher level. It houses 10 institutes, centres, labs and initiatives (ICLIs) in SMU. These ICLIs have several areas of focus such as Analytics for Business, Consumer & Social Insights, Urban Management & Sustainability, Ageing & Healthcare Management, Finance & Financial Markets, and Cybersecurity Initiative.'),
(5, 'SOL NARRATIVE','School of law officially commence in 2007, welcoming its first batch of student to its LLB and JD programmes at the helm of Professor Michael Furmston. However, the law department has always been in SMU within Lee Kong Chian School of Business, created and headed by Professor Andrew Phang (presently Judge of Appeal). The SOL Building broke ground on 20 January 2014 and was officially opened in 2017. Prior to this, School of Law was sharing the same building as School of Accountancy. A key feature of the new building is the Kwa Geok Choo Law Library, named in memory of the late Madam Kwa Geok Choo, wife of former Prime Minister Lee Kuan Yew. The 2,200-square-metre Law Library is fully equipped with modern technology wired for legal research in the 21st century.'),
(6, 'LKSL NARRATIVE','Officially opened on 24 February 2006, the library was named after Hong Kong businessman Dr. Li Ka-Shing, Chairman of Cheung Kong (Holdings) Limited and Hutchison Whampoa Limited. The Li Ka Shing Foundation donated an endowment to the library for collections and to the University for scholarship. SMU Libraries offers a range of learning spaces, including open areas for individual and collaborative use, study carrels, project rooms equipped with LCD panels, learning labs, quiet areas, investment studio, graduate lounges, and Hive - an innovative space for collaborative learning.'),
(7, 'Admin NARRATIVE','Home to around 10,000 undergraduates and postgraduates, SMU comprises six schools which offer a wide range of bachelor’s, master’s and PhD degree programmes in the disciplinary areas associated with the six schools, as well as in inter- disciplinary combinations of these areas. At level three, there is a Multi-Purpose Sports Hall, commonly used for CCA training sessions, competition, camps, examination hall and many more.');

INSERT INTO HOTSPOT VALUES
('Lee Kong Chian School of Business', '1.2953', '103.8506'),
('School of Accountancy', '1.2956', '103.8498'),
('School of Economics/School of Social Sciences', '1.2979', '103.8489'),
('School of Information Systems', '1.2974', '103.8495'),
('School of Law', '1.2949', '103.8495'),
('Li Ka Shing Library', '1.2962', '103.8501'),
('Administrative Building', '1.2968', '103.8522');

INSERT INTO MISSION VALUES 
(1, 'title 1'),
(2, 'title 2'),
(3, 'title 3'),
(4, 'title 4'),
(5, 'title 5'),
(6, 'title 6'),
-- (7, 'title 7'),
-- (8, 'title 8'),
-- (9, 'title 9'),
-- (10, 'title 10'),
-- (11, 'title 11'),
-- (12, 'title 12'),
-- (13, 'title 13'),
-- (14, 'title 14'),
-- (15, 'title 15'),
-- (16, 'title 16'),
-- (17, 'title 17'),
(18, 'title 18'),
-- (19, 'title 19'),
(20, 'title 20'),
(21, 'title 21');

INSERT INTO QUIZ VALUES
(1, 'Which of the following lab is not located in School of Information Systems?', 'SAS Lab', 1),
(2, 'Which floor is the General Office located?', '5', 1),
(3, 'Locate the gym and find out which faculty goes to gym the most. Which faculty is it?', 'Lee Kong Chian School of Business', 1),
(4, 'Locate the CIRCLE value poster in SOA and find which of the following is not part of the CIRCLE values', 'Respect', 4),
(5, 'Look for Ngee Ann KongSi Auditorium and find out the date that it was officially launched', '2007', 4),
(6, 'When you are hungry at SOA where is the nearest food place to go', 'SwissBake', 4),
(7, 'As an admin and research staff, how many books/items can we borrow from the SMU Libraries', '40', 5),
(8, 'Which level can you find dedicated exhibition space in Li Ka Shing Library', '4', 5),
(9, 'The Investment Studio is a dedicated space on Level 3 of Li Ka Shing Library which allows users to access finance terminals under one roof. Which floor is the Investment Studio located', '3', 5);
-- (1,'In the CIRCLE values, what does the first alphabet \'C\' represent?', 'Commitment', 1),
-- (2,'In the CIRCLE values, what does the alphabet \'I\' represent?', 'Integrity', 1),
-- (3,'In the CIRCLE values, what does the alphabet \'R\' represent?', 'Responsibility', 1),
-- (4,'In the CIRCLE values, what does the fourth alphabet \'C\' represent?', 'Collegiality', 1),
-- (5,'In the CIRCLE values, what does the alphabet \'L\' represent?', 'Leadership', 1),
-- (6,'In the CIRCLE values, what does the alphabet \'E\' represent?', 'Excellence', 1),
-- (7,'A game changer represents:', 'Transformative Education for A New Generation of Graduates', 2),
-- (8,'A Great University represents:', 'Tacking World’s Complexities, Impacting Human Positively', 2),
-- (9,'A game catalyst represents:', 'Leader In Cutting Edge Multi-disciplinary Research', 2),
-- (10,'A Global Exemplar represents:', 'Pre-eminent and Esteemed Global City University in Asia', 2),
-- (11,'Who is the founding dean of School of Economics?', 'Professor Roberto S. Mariano', 3),
-- (12,'What is one way in which SMU supports staff in achieving excellence?', 'Open Enrolment Program', 3),
-- (13,'What does collegiality entail in SMU?', 'Being a responsible citizen in the University Community', 3),
-- (14,'Dean Prof Pang Hwee Hwa is the ______ Dean of School of Information Systems.', 'second', 4),
-- (15,'All proceeds from B3 Burger Beer Bistro at the Basement Concourse go to ________.', 'foundation of SMU guild house in the not too distant future.', 4),
-- (16,'The Living Analytics Research Centre (LARC) is a collaboration with ________.', 'Carnegie Mellon University', 4),
-- (17,'Which level is the Office of Finance located at?', '11', 7),
-- (18,'We are required to tap the employee card in the lift’s card reader if we want to access Levels __  and above.', '7', 7),
-- (19,'The University Lounge is a great place for all employees and alumni members to relax. It is located at Level ___ in the Administration building.', '6', 7);



INSERT INTO QUIZ_OPTION VALUES
(1,1,'Live Labs'),
(1,2,'Living Analytics Research Centre(LARC)'),
(1,3,'SMU-TCS ICity Lab'),
(1,4,'SAS Lab'),
(2,5,'2'),
(2,6,'3'),
(2,7,'4'),
(2,8,'5'),
(3,9,'School of Economics'),
(3,10,'School of Law'),
(3,11,'Lee Kong Chian School of Business'),
(3,12,'School of Information Systems'),
(4,13,'Respect'),
(4,14,'Commitment'),
(4,15,'Integrity'),
(4,16,'Excellence'),
(5,17,'2005'),
(5,18,'2006'),
(5,19,'2007'),
(5,20,'2008'),
(6,21,'1983'),
(6,22,'SwissBake'),
(6,23,'Koufu'),
(6,24,'BrickLane'),
(7,24,'40'),
(7,25,'12'),
(7,26,'6'),
(7,27,'100'),
(8,28,'4'),
(8,29,'3'),
(8,30,'2'),
(8,31,'5'),
(9,32,'2'),
(9,33,'3'),
(9,34,'4'),
(9,35,'5');


-- (1,1, 'Commitment'),
-- (1,2, 'Character'),
-- (1,3, 'Culture'),
-- (1,4, 'Courage'),
-- (2,5, 'Integrity'),
-- (2,6, 'Intelligent'),
-- (2,7, 'Inspiring'),
-- (2,8, 'Innovative'),
-- (3,9, 'Responsibility'),
-- (3,10, 'Rational'),
-- (3,11, 'Respect'),
-- (3,12, 'Resolved'),
-- (4,13, 'Collegiality'),
-- (4,14, 'Character'),
-- (4,15, 'Culture'),
-- (4,16, 'Courage'),
-- (5,17, 'Leadership'),
-- (5,18, 'Lively'),
-- (5,19, 'Linguistic'),
-- (5,20, 'Loyal'),
-- (6,21, 'Excellence'),
-- (6,22, 'Encourage'),
-- (6,23, 'Engaging'),
-- (6,24, 'Equal'),
-- (7,25, 'Transformative Education for A New Generation of Graduates'),
-- (7,26, 'Leader In Cutting Edge Multi-disciplinary Research'),
-- (7,27, 'Pre-eminent and Esteemed Global City University in Asia'),
-- (7,28, 'Tacking World’s Complexities, Impacting Human Positively'),
-- (8,29, 'Tacking World’s Complexities, Impacting Human Positively'),
-- (8,30, 'Transformative Education for A New Generation of Graduates'),
-- (8,31, 'Leader In Cutting Edge Multi-disciplinary Research'),
-- (8,32, 'Pre-eminent and Esteemed Global City University in Asia'),
-- (9,33, 'Pre-eminent and Esteemed Global City University in Asia'),
-- (9,34, 'Transformative Education for A New Generation of Graduates'),
-- (9,35, 'Leader In Cutting Edge Multi-disciplinary Research'),
-- (9,36, 'Tacking World’s Complexities, Impacting Human Positively'),
-- (10,37, 'Pre-eminent and Esteemed Global City University in Asia'),
-- (10,38, 'Transformative Education for A New Generation of Graduates'),
-- (10,39, 'Leader In Cutting Edge Multi-disciplinary Research'),
-- (10,40, 'Tacking World’s Complexities, Impacting Human Positively'),
-- (11,41, 'Professor Roberto S. Mariano'),
-- (11,42, 'Professor James Tang'),
-- (11,43, 'Professor Bryce Hool'),
-- (12,44, 'Virtual classrooms'),
-- (12,45, 'Recreational programs'),
-- (12,46, 'Open Enrolment Program'),
-- (13,47, 'Working together with my colleagues'),
-- (13,48, 'Being a responsible citizen in the University Community'),
-- (13,49, 'Developing good working relationships'),
-- (14,50, 'first'),
-- (14,51, 'second'),
-- (14,52, 'third'),
-- (14,53, 'fourth'),
-- (15,54, 'foundation of SMU guild house in the not too distant future.'),
-- (15,55, 'funding of scholarships for students.'),
-- (15,56, 'B3’s owners who are not affiliated with SMU.'),
-- (15,57, 'SMU’s building funds.'),
-- (16,58, 'Harvard University'),
-- (16,59, 'Oxford University'),
-- (16,60, 'University of Washington'),
-- (16,61, 'Carnegie Mellon University'),
-- (17,62, '10'),
-- (17,63, '11'),
-- (17,64, '12'),
-- (17,65, '13'),
-- (18,66, '7'),
-- (18,67, '8'),
-- (18,68, '9'),
-- (18,69, '10'),
-- (19,70, '6'),
-- (19,71, '5'),
-- (19,72, '4'),
-- (19,73, '3');



INSERT INTO SUBMISSION_QUESTION VALUES
(1, 'Take a group photo at Tea Party while pretending to be slurping their DELICIOUS noodles', 2),
(2, 'Locate Lee Kong Chian School of Business mission statement and take a wefie', 3),
(3, 'Explore the roof top at School of Law and take a fun group picure', 6);
-- (1, 'Find the Mission Statement and take a wefie!', 8),
-- (2, 'Find the Mission Statement and take a wefie!', 9),
-- (3, 'Find Le Suantio Gallery and take a wefie!', 10),
-- (4, 'Locate the SMU Gym and take a wefie together with one qualified student fitness instructor!', 11),
-- (5, 'Locate Living Analytics Research Centre (LARC) and take a wefie together with LARC’s logo!', 12),
-- (6, 'Locate the SMU Hall and take a wefie outside of the Hall! (Hint: Basement)', 13),
-- (7, 'Locate the Kwa Geok Choo Library and take a wefie next to the scenic elevator!', 5),
-- (8, 'Locate the Eagle’s Nest and take a wefie! (Hint: Its outdoors)', 14),
-- (9, 'Locate the Hive at the Learning Commons and take a wefie!', 15),
-- (10, 'Locate the Daringly Different book in the Library and take a wefie together with a Library staff.', 6),
-- (11, 'Locate the SMU Shop in this building and take a wefie with one of the retail staff!', 17);
-- -- (12, 'Locate the Campus Green and take a wefie together with Bernar Venet’s Sculpture “97.5° Arc x 8”!', 18);

INSERT INTO DRAWING_QUESTION VALUES
(1, 'Draw Smoo Smoo', 20);

INSERT INTO TRAIL VALUES
(1,'test trail',45),
(2, 'wet weather trail', 45);

INSERT INTO TRAIL_INSTANCE VALUES
(1,1,0,0),
('175239', 1, 1, 1);

-- INSERT INTO TRAIL_MISSION VALUES
-- (1,18, 'Lee Kong Chian School of Business'),
-- (1,21, 'School of Accountancy'),
-- (1,20, 'School of Economics/School of Social Sciences'),
-- (1,4, 'School of Information Systems'),
-- (1,19, 'School of Law'),
-- (1,6, 'Li Ka Shing Library');

INSERT INTO TRAIL_HOTSPOT VALUES
(1, 'Lee Kong Chian School of Business', 1, 3),
(1, 'School of Accountancy', 2, 21),
-- (1, 'School of Economics/School of Social Sciences', 3, 2),
-- (1, 'School of Information Systems', 4, 1),
(1, 'School of Law', 5, 6),
(2, 'Li Ka Shing Library', 6, 5),
(2, 'Lee Kong Chian School of Business', 1, 3),
(2, 'School of Accountancy', 2, 4);

INSERT INTO TEAM VALUES
(1,0,'1.2953', '103.8506',1),
(2,0,'1.2953', '103.8506',1),
(3,0,'1.2953', '103.8506',1),
(1,0,'1.2953', '103.8506','175239'),
(2,0,'1.2953', '103.8506','175239'),
(3,0,'1.2953', '103.8506','175239');

INSERT INTO TEAM_HOTSPOT_STATUS VALUES
('Lee Kong Chian School of Business', '175239', 1, 0),
('Lee Kong Chian School of Business', '175239', 2, 0),
('Lee Kong Chian School of Business', '175239', 3, 0),
('School of Accountancy', '175239', 1, 0),
('School of Accountancy', '175239', 2, 0),
('School of Accountancy', '175239', 3, 0),
('School of Economics/School of Social Sciences', '175239', 1, 0),
('School of Economics/School of Social Sciences', '175239', 2, 0),
('School of Economics/School of Social Sciences', '175239', 3, 0),
('School of Information Systems', '175239', 1, 0),
('School of Information Systems', '175239', 2, 0),
('School of Information Systems', '175239', 3, 0),
('School of Law', '175239', 1, 0),
('School of Law', '175239', 2, 0),
('School of Law', '175239', 3, 0),
('Li Ka Shing Library', '175239', 1, 0),
('Li Ka Shing Library', '175239', 2, 0),
('Li Ka Shing Library', '175239', 3, 0);

INSERT INTO DRAG_AND_DROP VALUES
(1,'Match the words', 18);

INSERT INTO DRAG_AND_DROP_OPTION VALUES
(1,'I', 'Integrity'),
(1,'R', 'Responsibility'),
(1,'C', 'Collegiality'),
(1,'L', 'Leadership');

-- INSERT INTO ANAGRAM VALUES
-- (1,'kwageokchoo', 19);

INSERT INTO WORDSEARCH VALUES
('Accountancy Word Search', 21);

INSERT INTO WORDSEARCH_WORD VALUES
('Accountancy Word Search', 'account'),
('Accountancy Word Search', 'study'),
('Accountancy Word Search', 'money'),
('Accountancy Word Search', 'loss'),
('Accountancy Word Search', 'profit');

INSERT INTO ADMIN VALUES
('admin', 'password');











