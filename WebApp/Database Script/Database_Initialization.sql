INSERT INTO NARRATIVE VALUES
(1, 'SOB NARRATIVE','In 2000, SMU commenced its curriculum with the School of Business, welcoming its first batch of cohort in August. The SMU School of Business and university-wide scholars programme was named in perpetuity after Dr Lee Kong Chian in recognition of the Lee Foundation generous contribution of S$50 million to SMU in 2004. Dr Lee Kong Chain is a well-known Southeast Asia businessmen, philanthropist and community leader. SMU school of business is therefore known as LKCSB (Lee Kong Chian School of Business)'),
(2, 'SOA NARRATIVE','School of Accountancy (SOA) is the second largest school in SMU, with its humble beginnings going way back to 2000. The first Dean then was Professor Pang Yang Hoong, who was also part of the planning team at SMU. A lecture hall lies within SOA, being the only school to have a lecture hall. It was set up by the Chinese immigrants in the late 19th century, naming it after the charitable foundation Ngee Ann Kongsi - Ngee Ann Kongsi Auditorium.'),
(3, 'SOE NARRATIVE','The School of Economics and Social Science was established on 1 July 2002 under the Bachelor of Science degree. The Bachelor of Social Science undergraduate degree programme had 3 majors -Psychology, Sociology, and Political Science. In April 2007, the School of Economics and the School of Social Sciences were established as separate schools to better focus on the development of the undergraduate and graduate curricula and programmes, as well as faculty research in the respective disciplines. The current dean for School of Economics and School of Social Science are Prof Bryce Hool and Tan Yoo Guan respectively.'),
(4, 'SIS NARRATIVE','Established in 2003, School of Information Systems is a dynamic school that is constantly seeking to lift our education and research to a higher level. It houses 10 institutes, centres, labs and initiatives (ICLIs) in SMU. These ICLIs have several areas of focus such as Analytics for Business, Consumer & Social Insights, Urban Management & Sustainability, Ageing & Healthcare Management, Finance & Financial Markets, and Cybersecurity Initiative.'),
(5, 'SOL NARRATIVE','School of law officially commence in 2007, welcoming its first batch of student to its LLB and JD programmes at the helm of Professor Michael Furmston. However, the law department has always been in SMU within Lee Kong Chian School of Business, created and headed by Professor Andrew Phang (presently Judge of Appeal). The SOL Building broke ground on 20 January 2014 and was officially opened in 2017. Prior to this, School of Law was sharing the same building as School of Accountancy. A key feature of the new building is the Kwa Geok Choo Law Library, named in memory of the late Madam Kwa Geok Choo, wife of former Prime Minister Lee Kuan Yew. The 2,200-square-metre Law Library is fully equipped with modern technology wired for legal research in the 21st century.'),
(6, 'LKSL NARRATIVE','Officially opened on 24 February 2006, the library was named after Hong Kong businessman Dr. Li Ka-Shing, Chairman of Cheung Kong (Holdings) Limited and Hutchison Whampoa Limited. The Li Ka Shing Foundation donated an endowment to the library for collections and to the University for scholarship. SMU Libraries offers a range of learning spaces, including open areas for individual and collaborative use, study carrels, project rooms equipped with LCD panels, learning labs, quiet areas, investment studio, graduate lounges, and Hive - an innovative space for collaborative learning.'),
(7, 'Admin NARRATIVE','Home to around 10,000 undergraduates and postgraduates, SMU comprises six schools which offer a wide range of bachelor’s, master’s and PhD degree programmes in the disciplinary areas associated with the six schools, as well as in inter- disciplinary combinations of these areas. At level three, there is a Multi-Purpose Sports Hall, commonly used for CCA training sessions, competition, camps, examination hall and many more.');

INSERT INTO HOTSPOT VALUES
('Lee Kong Chian School of Business', '1.2953', '103.8506', 1),
('School of Accountancy', '1.2956', '103.8498', 2),
('School of Economics/School of Social Sciences', '1.2979', '103.8489', 3),
('School of Information Systems', '1.2974', '103.8495', 4),
('School of Law', '1.2949', '103.8495', 5),
('Li Ka Shing Library', '1.2962', '103.8501', 6),
('Administrative Building', '1.268', '103.8522', 7);

INSERT INTO MISSION VALUES 
(1, 'Lee Kong Chian School of Business'),
(2, 'School of Accountancy'),
(3, 'School of Economics/School of Social Sciences'),
(4, 'School of Information Systems'),
(5, 'School of Law'),
(6, 'Li Ka Shing Library'),
(7, 'Administrative Building'),
(8, 'Lee Kong Chian School of Business'),
(9, 'School of Accountancy'),
(10, 'School of Economics/School of Social Sciences'),
(11, 'School of Information Systems'),
(12, 'School of Information Systems'),
(13, 'School of Law'),
(14, 'School of Law'),
(16, 'Li Ka Shing Library'),
(17, 'Li Ka Shing Library'),
(18, 'Li Ka Shing Library'),
(19, 'Lee Kong Chian School of Business'),
(20, 'School of Law'),
(21, 'School of Law');

INSERT INTO QUIZ VALUES
(1,'In the CIRCLE values, what does the first alphabet \'C\' represent?', 'Commitment', 1),
(2,'In the CIRCLE values, what does the alphabet \'I\' represent?', 'Integrity', 1),
(3,'In the CIRCLE values, what does the alphabet \'R\' represent?', 'Responsibility', 1),
(4,'In the CIRCLE values, what does the fourth alphabet \'C\' represent?', 'Collegiality', 1),
(5,'In the CIRCLE values, what does the alphabet \'L\' represent?', 'Leadership', 1),
(6,'In the CIRCLE values, what does the alphabet \'E\' represent?', 'Excellence', 1),
(7,'A game changer represents:', 'Transformative Education for A New Generation of Graduates', 2),
(8,'A Great University represents:', 'Tacking World’s Complexities, Impacting Human Positively', 2),
(9,'A game catalyst represents:', 'Leader In Cutting Edge Multi-disciplinary Research', 2),
(10,'A Global Exemplar represents:', 'Pre-eminent and Esteemed Global City University in Asia', 2),
(11,'Who is the founding dean of School of Economics?', 'Professor Roberto S. Mariano', 3),
(12,'What is one way in which SMU supports staff in achieving excellence?', 'Open Enrolment Program', 3),
(13,'What does collegiality entail in SMU?', 'Being a responsible citizen in the University Community', 3),
(14,'Dean Prof Pang Hwee Hwa is the ______ Dean of School of Information Systems.', 'second', 4),
(15,'All proceeds from B3 Burger Beer Bistro at the Basement Concourse go to ________.', 'foundation of SMU guild house in the not too distant future.', 4),
(16,'The Living Analytics Research Centre (LARC) is a collaboration with ________.', 'Carnegie Mellon University', 4),
(17,'Which level is the Office of Finance located at?', '11', 7),
(18,'We are required to tap the employee card in the lift’s card reader if we want to access Levels __  and above.', '7', 7),
(19,'The University Lounge is a great place for all employees and alumni members to relax. It is located at Level ___ in the Administration building.', '6', 7);



INSERT INTO QUIZ_OPTION VALUES
(1,1, 'Commitment'),
(1,2, 'Character'),
(1,3, 'Culture'),
(1,4, 'Courage'),
(2,5, 'Integrity'),
(2,6, 'Intelligent'),
(2,7, 'Inspiring'),
(2,8, 'Innovative'),
(3,9, 'Responsibility'),
(3,10, 'Rational'),
(3,11, 'Respect'),
(3,12, 'Resolved'),
(4,13, 'Collegiality'),
(4,14, 'Character'),
(4,15, 'Culture'),
(4,16, 'Courage'),
(5,17, 'Leadership'),
(5,18, 'Lively'),
(5,19, 'Linguistic'),
(5,20, 'Loyal'),
(6,21, 'Excellence'),
(6,22, 'Encourage'),
(6,23, 'Engaging'),
(6,24, 'Equal'),
(7,25, 'Transformative Education for A New Generation of Graduates'),
(7,26, 'Leader In Cutting Edge Multi-disciplinary Research'),
(7,27, 'Pre-eminent and Esteemed Global City University in Asia'),
(7,28, 'Tacking World’s Complexities, Impacting Human Positively'),
(8,29, 'Tacking World’s Complexities, Impacting Human Positively'),
(8,30, 'Transformative Education for A New Generation of Graduates'),
(8,31, 'Leader In Cutting Edge Multi-disciplinary Research'),
(8,32, 'Pre-eminent and Esteemed Global City University in Asia'),
(9,33, 'Pre-eminent and Esteemed Global City University in Asia'),
(9,34, 'Transformative Education for A New Generation of Graduates'),
(9,35, 'Leader In Cutting Edge Multi-disciplinary Research'),
(9,36, 'Tacking World’s Complexities, Impacting Human Positively'),
(10,37, 'Pre-eminent and Esteemed Global City University in Asia'),
(10,38, 'Transformative Education for A New Generation of Graduates'),
(10,39, 'Leader In Cutting Edge Multi-disciplinary Research'),
(10,40, 'Tacking World’s Complexities, Impacting Human Positively'),
(11,41, 'Professor Roberto S. Mariano'),
(11,42, 'Professor James Tang'),
(11,43, 'Professor Bryce Hool'),
(12,44, 'Virtual classrooms'),
(12,45, 'Recreational programs'),
(12,46, 'Open Enrolment Program'),
(13,47, 'Working together with my colleagues'),
(13,48, 'Being a responsible citizen in the University Community'),
(13,49, 'Developing good working relationships'),
(14,50, 'first'),
(14,51, 'second'),
(14,52, 'third'),
(14,53, 'fourth'),
(15,54, 'foundation of SMU guild house in the not too distant future.'),
(15,55, 'funding of scholarships for students.'),
(15,56, 'B3’s owners who are not affiliated with SMU.'),
(15,57, 'SMU’s building funds.'),
(16,58, 'Harvard University'),
(16,59, 'Oxford University'),
(16,60, 'University of Washington'),
(16,61, 'Carnegie Mellon University'),
(17,62, '10'),
(17,63, '11'),
(17,64, '12'),
(17,65, '13'),
(18,66, '7'),
(18,67, '8'),
(18,68, '9'),
(18,69, '10'),
(19,70, '6'),
(19,71, '5'),
(19,72, '4'),
(19,73, '3');



INSERT INTO SUBMISSION_QUESTION VALUES
(1, 'Find the Mission Statement and take a wefie!', 8),
(2, 'Find the Mission Statement and take a wefie!', 9),
(3, 'Find Le Suantio Gallery and take a wefie!', 10),
(4, 'Locate the SMU Gym and take a wefie together with one qualified student fitness instructor!', 11),
(5, 'Locate Living Analytics Research Centre (LARC) and take a wefie together with LARC’s logo!', 12),
(6, 'Locate the SMU Hall and take a wefie outside of the Hall! (Hint: Basement)', 13),
(7, 'Locate the Kwa Geok Choo Library and take a wefie next to the scenic elevator!', 5),
(8, 'Locate the Eagle’s Nest and take a wefie! (Hint: Its outdoors)', 14),
(9, 'Locate the Hive at the Learning Commons and take a wefie!', 16),
(10, 'Locate the Daringly Different book in the Library and take a wefie together with a Library staff.', 6),
(11, 'Locate the SMU Shop in this building and take a wefie with one of the retail staff!', 18),
(12, 'Locate the Campus Green and take a wefie together with Bernar Venet’s Sculpture “97.5° Arc x 8”!', 17);

INSERT INTO DRAWING_QUESTION VALUES
(1, 'Draw Something Retarded', 21);

INSERT INTO TRAIL VALUES
(1,45);

INSERT INTO TRAIL_INSTANCE VALUES
(1,1,0,0),
('175239', 1, 1, 0);

INSERT INTO TRAIL_MISSION VALUES
(1,19),
(1,2),
(1,3),
(1,4),
(1,21),
(1,6);

INSERT INTO TRAIL_HOTSPOT VALUES
(1, 'Lee Kong Chian School of Business'),
(1, 'School of Accountancy'),
(1, 'School of Economics/School of Social Sciences'),
(1, 'School of Information Systems'),
(1, 'School of Law'),
(1, 'Li Ka Shing Library');

INSERT INTO TEAM VALUES
(1,0,1),
(2,0,1),
(3,0,1),
(1,0,'175239'),
(2,0,'175239'),
(3,0,'175239');

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
(1,'In the CIRCLE values, what does the first alphabet \'C\' represent?', 'Commitment', 19),
(2,'In the CIRCLE values, what does the alphabet \'I\' represent?', 'Integrity', 19),
(3,'In the CIRCLE values, what does the alphabet \'R\' represent?', 'Responsibility', 19),
(4,'In the CIRCLE values, what does the fourth alphabet \'C\' represent?', 'Collegiality', 19),
(5,'In the CIRCLE values, what does the alphabet \'L\' represent?', 'Leadership', 19);

INSERT INTO ANAGRAM VALUES
(1,'RYDERTHEFAGGOT', 20);

INSERT INTO ADMIN VALUES
('admin', 'password');











