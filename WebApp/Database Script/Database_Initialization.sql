INSERT INTO NARRATIVE VALUES
(1, 'In 2000, SMU commenced its curriculum with the School of Business, welcoming its first batch of cohort in August. The SMU School of Business and university-wide scholars programme was named in perpetuity after Dr Lee Kong Chian in recognition of the Lee Foundation generous contribution of S$50 million to SMU in 2004. Dr Lee Kong Chain is a well-known Southeast Asia businessmen, philanthropist and community leader. SMU school of business is therefore known as LKCSB (Lee Kong Chian School of Business)'),
(2, 'School of Accountancy (SOA) is the second largest school in SMU, with its humble beginnings going way back to 2000. The first Dean then was Professor Pang Yang Hoong, who was also part of the planning team at SMU. A lecture hall lies within SOA, being the only school to have a lecture hall. It was set up by the Chinese immigrants in the late 19th century, naming it after the charitable foundation Ngee Ann Kongsi - Ngee Ann Kongsi Auditorium.'),
(3, 'The School of Economics and Social Science was established on 1 July 2002 under the Bachelor of Science degree. The Bachelor of Social Science undergraduate degree programme had 3 majors -Psychology, Sociology, and Political Science. In April 2007, the School of Economics and the School of Social Sciences were established as separate schools to better focus on the development of the undergraduate and graduate curricula and programmes, as well as faculty research in the respective disciplines. The current dean for School of Economics and School of Social Science are Prof Bryce Hool and Tan Yoo Guan respectively.'),
(4,'Established in 2003, School of Information Systems is a dynamic school that is constantly seeking to lift our education and research to a higher level. It houses 10 institutes, centres, labs and initiatives (ICLIs) in SMU. These ICLIs have several areas of focus such as Analytics for Business, Consumer & Social Insights, Urban Management & Sustainability, Ageing & Healthcare Management, Finance & Financial Markets, and Cybersecurity Initiative.'),
(5,'School of law officially commence in 2007, welcoming its first batch of student to its LLB and JD programmes at the helm of Professor Michael Furmston. However, the law department has always been in SMU within Lee Kong Chian School of Business, created and headed by Professor Andrew Phang (presently Judge of Appeal). The SOL Building broke ground on 20 January 2014 and was officially opened in 2017. Prior to this, School of Law was sharing the same building as School of Accountancy. A key feature of the new building is the Kwa Geok Choo Law Library, named in memory of the late Madam Kwa Geok Choo, wife of former Prime Minister Lee Kuan Yew. The 2,200-square-metre Law Library is fully equipped with modern technology wired for legal research in the 21st century.'),
(6,'Officially opened on 24 February 2006, the library was named after Hong Kong businessman Dr. Li Ka-Shing, Chairman of Cheung Kong (Holdings) Limited and Hutchison Whampoa Limited. The Li Ka Shing Foundation donated an endowment to the library for collections and to the University for scholarship. SMU Libraries offers a range of learning spaces, including open areas for individual and collaborative use, study carrels, project rooms equipped with LCD panels, learning labs, quiet areas, investment studio, graduate lounges, and Hive - an innovative space for collaborative learning.'),
(7, 'Home to around 10,000 undergraduates and postgraduates, SMU comprises six schools which offer a wide range of bachelor’s, master’s and PhD degree programmes in the disciplinary areas associated with the six schools, as well as in inter- disciplinary combinations of these areas. At level three, there is a Multi-Purpose Sports Hall, commonly used for CCA training sessions, competition, camps, examination hall and many more.');

INSERT INTO AR_GAME VALUES (1,'1');

INSERT INTO HOTSPOT VALUES
('Lee Kong Chian School of Business', '1.2953', '103.8506', 1, 1),
('School of Accountancy', '1.2956', '103.8498', 2, 1),
('School of Economics/School of Social Sciences', '1.2979', '103.8489', 3, 1),
('School of Information Systems', '1.2974', '103.8495', 4, 1),
('School of Law', '1.2949', '103.8495', 5, 1),
('Li Ka Shing Library', '1.2962', '103.8501', 6, 1),
('Administrative Building', '1.268', '103.8522', 7, 1);

INSERT INTO MISSION VALUES 
(1, 'Lee Kong Chian School of Business'),
(2, 'School of Accountancy'),
(3, 'School of Economics/School of Social Sciences'),
(4, 'School of Information Systems'),
(5, 'School of Law'),
(6, 'Li Ka Shing Library'),
(7, 'Administrative Building');

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
(1, 'Commitment'),
(1, 'Character'),
(1, 'Culture'),
(1, 'Courage'),
(2, 'Integrity'),
(2, 'Intelligent'),
(2, 'Inspiring'),
(2, 'Innovative'),
(3, 'Responsibility'),
(3, 'Rational'),
(3, 'Respect'),
(3, 'Resolved'),
(4, 'Collegiality'),
(4, 'Character'),
(4, 'Culture'),
(4, 'Courage'),
(5, 'Leadership'),
(5, 'Lively'),
(5, 'Linguistic'),
(5, 'Loyal'),
(6, 'Excellence'),
(6, 'Encourage'),
(6, 'Engaging'),
(6, 'Equal'),
(7, 'Transformative Education for A New Generation of Graduates'),
(7, 'Leader In Cutting Edge Multi-disciplinary Research'),
(7, 'Pre-eminent and Esteemed Global City University in Asia'),
(7, 'Tacking World’s Complexities, Impacting Human Positively'),
(8, 'Tacking World’s Complexities, Impacting Human Positively'),
(8, 'Transformative Education for A New Generation of Graduates'),
(8, 'Leader In Cutting Edge Multi-disciplinary Research'),
(8, 'Pre-eminent and Esteemed Global City University in Asia'),
(9, 'Pre-eminent and Esteemed Global City University in Asia'),
(9, 'Transformative Education for A New Generation of Graduates'),
(9, 'Leader In Cutting Edge Multi-disciplinary Research'),
(9, 'Tacking World’s Complexities, Impacting Human Positively'),
(10, 'Pre-eminent and Esteemed Global City University in Asia'),
(10, 'Transformative Education for A New Generation of Graduates'),
(10, 'Leader In Cutting Edge Multi-disciplinary Research'),
(10, 'Tacking World’s Complexities, Impacting Human Positively'),
(11, 'Professor Roberto S. Mariano'),
(11, 'Professor James Tang'),
(11, 'Professor Bryce Hool'),
(12, 'Virtual classrooms'),
(12, 'Recreational programs'),
(12, 'Open Enrolment Program'),
(13, 'Working together with my colleagues'),
(13, 'Being a responsible citizen in the University Community'),
(13, 'Developing good working relationships'),
(14, 'first'),
(14, 'second'),
(14, 'third'),
(14, 'fourth'),
(15, 'foundation of SMU guild house in the not too distant future.'),
(15, 'funding of scholarships for students.'),
(15, 'B3’s owners who are not affiliated with SMU.'),
(15, 'SMU’s building funds.'),
(16, 'Harvard University'),
(16, 'Oxford University'),
(16, 'University of Washington'),
(16, 'Carnegie Mellon University'),
(17, '10'),
(17, '11'),
(17, '12'),
(17, '13'),
(18, '7'),
(18, '8'),
(18, '9'),
(18, '10'),
(19, '6'),
(19, '5'),
(19, '4'),
(19, '3');



INSERT INTO SUBMISSION_QUESTION VALUES
(1, 'Find the Mission Statement and take a wefie!', 1),
(2, 'Find the Mission Statement and take a wefie!', 2),
(3, 'Find Le Suantio Gallery and take a wefie!', 3),
(4, 'Locate the SMU Gym and take a wefie together with one qualified student fitness instructor!', 4),
(5, 'Locate Living Analytics Research Centre (LARC) and take a wefie together with LARC’s logo!', 4),
(6, 'Locate the SMU Hall and take a wefie outside of the Hall! (Hint: Basement)', 5),
(7, 'Locate the Kwa Geok Choo Library and take a wefie next to the scenic elevator!', 5),
(8, 'Locate the Eagle’s Nest and take a wefie! (Hint: Its outdoors)', 5),
(9, 'Locate the Hive at the Learning Commons and take a wefie!', 6),
(10, 'Locate the Daringly Different book in the Library and take a wefie together with a Library staff.', 6),
(11, 'Locate the SMU Shop in this building and take a wefie with one of the retail staff!', 6),
(12, 'Locate the Campus Green and take a wefie together with Bernar Venet’s Sculpture “97.5° Arc x 8”!', 6);
















