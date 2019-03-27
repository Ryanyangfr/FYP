const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const databaseConfig = require('../config/mysqlconf.js');

const router = express.Router();

const conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let trailID = 0;

conn.query('SELECT COUNT(*) AS COUNT FROM TRAIL', (err, num) => {
  if (err) {
    console.log(err);
  } else {
    trailID = num[0].COUNT;
  }
});

router.get('/getAllTrails', (req, res) => {
  const response = [];
  const query = 'SELECT TRAIL.TRAIL_ID, TRAIL_HOTSPOT.NARRATIVE_ID, NARRATIVE_TITLE, HOTSPOT_NAME, TITLE, TOTAL_TIME, MISSION_TITLE, TRAIL_HOTSPOT.MISSION_ID FROM TRAIL_HOTSPOT, TRAIL, MISSION, NARRATIVE WHERE TRAIL_HOTSPOT.TRAIL_ID = TRAIL.TRAIL_ID AND MISSION.MISSION_ID = TRAIL_HOTSPOT.MISSION_ID AND NARRATIVE.NARRATIVE_ID = TRAIL_HOTSPOT.NARRATIVE_ID ORDER BY TRAIL.TRAIL_ID';

  conn.query(query, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data[0] === undefined) {
        res.send([]);
        return;
      }
      let temp = [];
      let currTrailID = data[0].TRAIL_ID;
      let currTrailTitle = data[0].TITLE;
      let currTrailTotalTime = data[0].TOTAL_TIME;
      data.forEach((row) => {
        console.log(row.TRAIL_ID === currTrailID);
        if (row.TRAIL_ID === currTrailID) {
          temp.push({ hotspot: row.HOTSPOT_NAME, mission: row.MISSION_ID, missionTitle: row.MISSION_TITLE, narrativeTitle: row.NARRATIVE_TITLE, narrativeID: row.NARRATIVE_ID, missionType: '', missionList: [] });
        } else {
          console.log(temp);
          response.push({ trailID: currTrailID, title: currTrailTitle, totalTime: currTrailTotalTime, hotspotsAndMissions: temp });
          temp = [];
          temp.push({ hotspot: row.HOTSPOT_NAME, mission: row.MISSION_ID, missionTitle: row.MISSION_TITLE, narrativeTitle: row.NARRATIVE_TITLE, narrativeID: row.NARRATIVE_ID, missionType: '', missionList: [] });
          currTrailID = row.TRAIL_ID;
          currTrailTitle = row.TITLE;
          currTrailTotalTime = row.TOTAL_TIME;
        }
      });
      response.push({ trailID: currTrailID, title: currTrailTitle, totalTime: currTrailTotalTime, hotspotsAndMissions: temp });
      console.log(response);
      res.send(response);
    }
  });
});

router.post('/addTrail', (req, res) => {
  trailID += 1;
  const trailTitle = req.body.title;
  const totalTime = req.body.totalTime;
  const hotspotsAndMissions = req.body.hotspotsAndMissions;
  // const missions = req.body.missions;
  // const narrativeID = req.body.narrativeID;

  let hotspotCount = 0;
  const missionCount = 0;
  console.log(req.body);

  const trailCreationQuery = 'INSERT INTO TRAIL VALUES (?,?,?)';

  conn.query(trailCreationQuery, [trailID, trailTitle, totalTime], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const trailHotspotsCreationQuery = 'INSERT INTO TRAIL_HOTSPOT VALUES (?,?,?,?)';

      hotspotsAndMissions.forEach((hotspotAndMission) => {
        console.log(hotspotAndMission);
        conn.query(trailHotspotsCreationQuery, [trailID, hotspotAndMission.hotspot, hotspotAndMission.narrative, hotspotAndMission.mission], (err, result) => {
          if (err) {
            res.send(JSON.stringify({ success: 'false' }));
            console.log(err);
          } else {
            if (hotspotCount === hotspotsAndMissions.length - 1) {
              res.send(JSON.stringify({ success: 'true' }));
            } else {
              hotspotCount += 1;
            }
            // res.send(JSON.stringify({ success: 'true' }));
          }
        });
      });

      // const trailMissionsCreationQuery = 'INSERT INTO TRAIL_MISSION VALUES (?,?)';

      // missions.forEach((mission) => {
      //   conn.query(trailMissionsCreationQuery, [trailID, mission], (err, result) => {
      //     if (err) {
      //       res.send(JSON.stringify({ success: 'false' }));
      //       console.log(err);
      //        return;
      //     } else {
      //       if (missionCount === missions.length - 1 && hotspotCount === hotspots.length) {
      //         res.send(JSON.stringify({ success: 'true' }));
      //       } else {
      //         missionCount += 1;
      //       }
      //       // res.send(JSON.stringify({ success: 'true' }));
      //     }
      //   })
      // });
    }
  });
});

router.post('/editTrail', (req, res) => {
  console.log(req.body);
  const trailID = req.body.trailID;
  const trailTitle = req.body.title;
  const totalTime = req.body.totalTime;
  const hotspotsAndMissions = req.body.hotspotsAndMissions;

  let rowCount = 0;
  const updateTrailQuery = 'UPDATE TRAIL SET TITLE = ?, TOTAL_TIME = ? WHERE TRAIL_ID = ?';

  conn.query(updateTrailQuery, [trailTitle, totalTime, trailID], (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      const trailHotspotDeleteQuery = 'DELETE FROM TRAIL_HOTSPOT WHERE TRAIL_ID = ?';
      conn.query(trailHotspotDeleteQuery, trailID, (err, reply) => {
        if (err) {
          console.log(err);
          res.send(JSON.stringify({ success: 'false' }));
        } else {
          const trailHotspotsCreationQuery = 'INSERT INTO TRAIL_HOTSPOT VALUES (?,?,?,?)';
          hotspotsAndMissions.forEach((hotspotAndMission) => {
            console.log(hotspotAndMission);
            conn.query(trailHotspotsCreationQuery, [trailID, hotspotAndMission.hotspot, hotspotAndMission.narrative, hotspotAndMission.mission], (err, result) => {
              if (err) {
                res.send(JSON.stringify({ success: 'false' }));
                console.log(err);
              } else {
                if (rowCount === hotspotsAndMissions.length - 1) {
                  res.send(JSON.stringify({ success: 'true' }));
                } else {
                  rowCount += 1;
                }
                // res.send(JSON.stringify({ success: 'true' }));
              }
            });
          });
        }
      });
    }
  });
});

router.post('/initializeTrail', (req, res) => {
  const trailID = req.body.trailID;
  const trailInstanceID = req.body.trailInstanceID;
  const numTeams = req.body.numTeams;
  const date = req.body.date;
  let hasErr = false;

  console.log('number of teams: ' + numTeams);
  console.log(trailID);
  console.log('initialize trail');
  const query = 'INSERT INTO TRAIL_INSTANCE VALUES (?,?,?,?,?)';

  const checkIfAnyActiveTrailQuery = 'SELECT * FROM TRAIL_INSTANCE WHERE ISACTIVE = 1 OR HASSTARTED = 1';

  conn.query(checkIfAnyActiveTrailQuery, (err, data) => {
    if (err) {
      hasErr = true;
      console.log(err);
    } else {
      const updateQuery = 'UPDATE TRAIL_INSTANCE SET ISACTIVE = 0, HASSTARTED = 0 WHERE TRAIL_ID = ? AND TRAIL_INSTANCE_ID = ?';
      data.forEach((row) => {
        const activatedTrailID = row.TRAIL_ID;
        const activatedTrailInstanceID = row.TRAIL_INSTANCE_ID;
        conn.query(updateQuery, [activatedTrailID, activatedTrailInstanceID], (err, data) => {
          if (err) {
            console.log(err);
          }
        });
      });

      conn.query(query, [trailInstanceID, trailID, 1, 0, date], (err, data) => {
        if (err) {
          console.log(err);
          res.send(JSON.stringify({ success: 'false' }));
        } else {
          const updateTeamQuery = 'INSERT INTO TEAM VALUES (?,?,?,?,?,?)';

          for (let teamID = 0; teamID < numTeams; teamID++) {
            console.log('team: ' + teamID);
            conn.query(updateTeamQuery, [teamID + 1, 0, '1.268', '103.8522', '', trailInstanceID], (err, data) => {
              if (err) {
                console.log(err);
                hasErr = true;
                res.send(JSON.stringify({ success: 'false' }));
              } else if (teamID === numTeams - 1) {
                // res.send(JSON.stringify({ success: 'true' }));
              }
            });
          }

          const updateTeamHotspotStatusQuery = 'INSERT INTO TEAM_HOTSPOT_STATUS VALUES(?,?,?,?,?)';
          const retrieveHotspotsInTrail = 'SELECT HOTSPOT_NAME FROM TRAIL_HOTSPOT WHERE TRAIL_ID = ?';

          // retrieve all hotspots in trail
          conn.query(retrieveHotspotsInTrail, trailID, (err, hotspots) => {
            if (err) {
              console.log(err);
            } else {
              hotspots.forEach((hotspot) => {
                for (let teamID = 0; teamID < numTeams; teamID++) {
                  conn.query(updateTeamHotspotStatusQuery, [hotspot.HOTSPOT_NAME, trailInstanceID, teamID + 1, 0, null], (err, data) => {
                    if (err) {
                      console.log(err);
                    } else if(hotspot.HOTSPOT_NAME === hotspots[hotspots.length - 1].HOTSPOT_NAME && teamID === numTeams - 1 && hasErr != true) {
                      res.send(JSON.stringify({ success: 'true' }));
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });

  const insertMissionHistoryQuery = 'INSERT INTO MISSION_HISTORY VALUES (?,?)';
  conn.query('SELECT COUNT(*) AS COUNT FROM MISSION_HISTORY', (err, data1) => {
    if (err) {
      console.log(err);
    } else {
      let missionID = data1[0].COUNT + 1;
      duplicateMission(trailInstanceID, missionID, insertMissionHistoryQuery);
    }
  });

});

router.post('/startTrail', (req, res) => {
  const trailID = req.body.trailID;
  const trailInstanceID = req.body.trailInstanceID;

  const io = req.app.get('socketio');

  const query = 'UPDATE TRAIL_INSTANCE SET HASSTARTED = 1 WHERE TRAIL_INSTANCE_ID = ? AND TRAIL_ID = ?';

  conn.query(query, [trailInstanceID, trailID], (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      io.emit('startTrail', { trail_instance_id: trailInstanceID });
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

/** *********************************************************** methods **************************************************************************** */

// does anagram duplication first
function duplicateMission(trailInstanceID, missionID, insertMissionHistoryQuery) {
  const anagramQuery = 'SELECT HOTSPOT_NAME, MISSION.MISSION_ID, MISSION_TITLE, ANAGRAM_ID, ANAGRAM_WORD FROM TRAIL_HOTSPOT,MISSION,ANAGRAM WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND MISSION.MISSION_ID = TRAIL_HOTSPOT.MISSION_ID AND ANAGRAM.MISSION_ID = MISSION.MISSION_ID';
  const anagramHistoryInsertQuery = 'INSERT INTO ANAGRAM_HISTORY VALUES (?,?,?)';
  const summaryTableIDQuery = 'SELECT COUNT(*) AS COUNT FROM SUMMARY_TABLE';
  let numberOfiterations = 0;
  let summaryID = 0;

  conn.query('SELECT COUNT(*) as count FROM ANAGRAM_HISTORY', (err, data1) => {
    if (err) {
      console.log(err);
    } else {
      const anagramHistoryID = data1[0].count + 1;
      conn.query(anagramQuery, trailInstanceID, (err, data2) => {
        if (err) {
          console.log(err);
        } else {
          data2.forEach((row) => {
            numberOfiterations += 1;
            const hotspot = row.HOTSPOT_NAME;
            const title = row.MISSION_TITLE;
            const word = row.ANAGRAM_WORD;

            conn.query(insertMissionHistoryQuery, [missionID, title], (err,result) => {
              if (err) {
                console.log(err);
              } else {
                conn.query(anagramHistoryInsertQuery, [anagramHistoryID, word, missionID], (err, result2) => {
                  if (err) {
                    console.log(err);
                  }
                });
                conn.query(summaryTableIDQuery, (err, result3) => {
                  if (err) {
                    console.log(err);
                  } else {
                    summaryID = result3[0].COUNT + 1;
                    conn.query('INSERT INTO SUMMARY_TABLE VALUES (?,?,?,?)', [summaryID, trailInstanceID, hotspot, missionID], (err, result4) => {
                      if (err) {
                        console.log(err);
                      }
                    });
                  }
                });
                // missionID += 1;
                console.log(data2.length);
                console.log(numberOfiterations);
                if (numberOfiterations === data2.length) {
                  duplicateQuiz(trailInstanceID, missionID, insertMissionHistoryQuery, summaryID + 1);
                }
              }
            });
          });
        }
      });
    }
  });
}

function duplicateQuiz(trailInstanceID, missionHistoryID, insertMissionHistoryQuery, summaryID) {
  const quizQuery = 'SELECT HOTSPOT_NAME, MISSION.MISSION_ID, MISSION_TITLE, QUIZ.QUIZ_ID, QUIZ_QUESTION, QUIZ_ANSWER,  QUIZ_OPTION  FROM TRAIL_HOTSPOT,MISSION,QUIZ,QUIZ_OPTION WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND MISSION.MISSION_ID = TRAIL_HOTSPOT.MISSION_ID AND QUIZ.MISSION_ID = MISSION.MISSION_ID AND QUIZ.QUIZ_ID = QUIZ_OPTION.QUIZ_ID';
  const numQuizHistoryQuery = 'SELECT COUNT(*) AS COUNT FROM QUIZ_HISTORY';
  const numQuizOptionHistoryQuery = 'SELECT COUNT(*) AS COUNT FROM QUIZ_OPTION_HISTORY';
  const summaryTableIDQuery = 'SELECT COUNT(*) AS COUNT FROM SUMMARY_TABLE';

  conn.query(numQuizHistoryQuery, (err, result1) => {
    if (err) {
      console.log(err);
    } else {
      let numQuiz = result1[0].COUNT;
      
      conn.query(numQuizOptionHistoryQuery, (err, result2) => {
        if (err) {
          console.log(err);
        } else {
          let numQuizOption = result2[0].COUNT;

          conn.query(quizQuery, trailInstanceID, (err, result3) => {
            if (err) {
              console.log(err);
            } else {
              const rows = result3;
              // console.log(rows[0])
              // let currQuizID = result3[0].QUIZ_ID;
              let currMissionID = -1;
              let rowIndex = -1;

              result3.forEach((row) => {
                rowIndex += 1;
                console.log(`row index top: ${rowIndex%4 === 0}`);
                if (rowIndex % 4 === 0) {
                  console.log(`rowIndex: ${rowIndex}`);
                  console.log(row);
                  const hotspot = row.HOTSPOT_NAME;
                  const missionID = row.MISSION_ID;
                  const title = row.MISSION_TITLE;
                  const quizID = row.QUIZ_ID;
                  const quizOption1 = rows[rowIndex].QUIZ_OPTION;
                  const quizOption2 = rows[rowIndex+1].QUIZ_OPTION;
                  const quizOption3 = rows[rowIndex+2].QUIZ_OPTION;
                  const quizOption4 = rows[rowIndex+3].QUIZ_OPTION;
                  const quizQuestion = row.QUIZ_QUESTION;
                  const quizAnswer = row.QUIZ_ANSWER;

                  console.log(`current mission id: ${currMissionID}`);
                  console.log(`mission id: ${missionID}`);
                  if (currMissionID != missionID) {
                    missionHistoryID += 1;
                    currMissionID = missionID;
                    
                    conn.query(insertMissionHistoryQuery, [missionHistoryID, title], (err, result4) => {
                      if (err) {
                        console.log(err);
                      } else {
                        summaryID += 1;
                        console.log(`summary id: ${summaryID}`);
                        conn.query(summaryTableIDQuery, (err, result3) => {
                          if (err) {
                            console.log(err);
                          } else {
                            summaryID = result3[0].COUNT + 1;
                            conn.query('INSERT INTO SUMMARY_TABLE VALUES (?,?,?,?)', [summaryID, trailInstanceID, hotspot, missionHistoryID], (err, result4) => {
                              if (err) {
                                console.log(err);
                              }
                            });
                          }
                        });

                        // currQuizID = quizID;
                        // console.log(`curr quiz id: ${currQuizID}`);
                        numQuiz += 1;
                        addQuizOptions(numQuiz, numQuizOption, quizOption1, quizOption2, quizOption3, quizOption4, quizQuestion, quizAnswer, missionHistoryID);
                        numQuizOption += 4;
                      }
                    });
                  } else {
                    numQuiz += 1;
                    addQuizOptions(numQuiz, numQuizOption, quizOption1, quizOption2, quizOption3, quizOption4, quizQuestion, quizAnswer, missionHistoryID);
                    numQuizOption += 4;
                  }
                }
              });
              if (rowIndex === rows.length-1) {
                duplicateDragAndDrop(trailInstanceID, missionHistoryID, insertMissionHistoryQuery, summaryID);
              }
            }
          });
        }
      });
    }
  });
}

function addQuizOptions(numQuiz, numQuizOption, quizOption1, quizOption2, quizOption3, quizOption4, quizQuestion, quizAnswer, missionHistoryID) {
  const quizQuestionHistoryInsertQuery = 'INSERT INTO QUIZ_HISTORY VALUES (?,?,?,?)';
  const quizOptionHistoryInsertQuery = 'INSERT INTO QUIZ_OPTION_HISTORY VALUES (?,?,?)';
  conn.query(quizQuestionHistoryInsertQuery, [numQuiz, quizQuestion, quizAnswer, missionHistoryID], (err, result5) => {
    if (err) {
      console.log(err);
    } else {
      numQuizOption += 1;
      conn.query(quizOptionHistoryInsertQuery, [numQuiz, numQuizOption, quizOption1], (err, results6) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`1: ${quizOption1}`);
        }
      });

      numQuizOption += 1;
      conn.query(quizOptionHistoryInsertQuery, [numQuiz, numQuizOption, quizOption2], (err, results6) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`2: ${quizOption2}`);
        }
      });

      numQuizOption += 1;
      conn.query(quizOptionHistoryInsertQuery, [numQuiz, numQuizOption, quizOption3], (err, results6) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`3: ${quizOption3}`);
        }
      });

      numQuizOption += 1;
      conn.query(quizOptionHistoryInsertQuery, [numQuiz, numQuizOption, quizOption4], (err, results6) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`4: ${quizOption4}`);
        }
      });
    }
  });
}

function duplicateDragAndDrop(trailInstanceID, missionHistoryID, insertMissionHistoryQuery, summaryID) {
  const draganddropQuery = ' SELECT DRAG_AND_DROP.DRAGANDDROP_ID, DRAGANDDROP_QUESTION, DRAGANDDROP_QUESTION_OPTION, DRAGANDDROP_QUESTION_ANSWER, DRAG_AND_DROP.MISSION_ID, MISSION_TITLE, HOTSPOT_NAME FROM DRAG_AND_DROP, DRAG_AND_DROP_OPTION, TRAIL_HOTSPOT, MISSION WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TRAIL_HOTSPOT.MISSION_ID = DRAG_AND_DROP.MISSION_ID AND TRAIL_HOTSPOT.MISSION_ID = MISSION.MISSION_ID AND DRAG_AND_DROP.DRAGANDDROP_ID = DRAG_AND_DROP_OPTION.DRAGANDDROP_ID';
  const numDragAndDropQuery = 'SELECT COUNT(*) AS COUNT FROM DRAG_AND_DROP_HISTORY';
  const dragAndDropHistoryInsertQuery = 'INSERT INTO DRAG_AND_DROP_HISTORY VALUES (?,?,?)';
  const dragAndDropOptionHistoryInsertQuery = 'INSERT INTO DRAG_AND_DROP_OPTION_HISTORY VALUES (?,?,?)';
  const summaryTableIDQuery = 'SELECT COUNT(*) AS COUNT FROM SUMMARY_TABLE';

  conn.query(numDragAndDropQuery, (err, result1) => {
    if (err) {
      console.log(err);
    } else {
      let dragAndDropHistoryID = result1[0].COUNT;
      let rowIndex = -1;

      conn.query(draganddropQuery, trailInstanceID, (err, result3) => {
        if (err) {
          console.log(err);
        } else {
          result3.forEach((row) => {
            rowIndex += 1;
            if (rowIndex % 4 === 0) {
              const hotspot = row.HOTSPOT_NAME;
              const missionID = row.MISSION_ID;
              const title = row.MISSION_TITLE;
              const question = row.DRAGANDDROP_QUESTION;
              const option1 = result3[rowIndex].DRAGANDDROP_QUESTION_OPTION;
              const answer1 = result3[rowIndex].DRAGANDDROP_QUESTION_ANSWER;
              const option2 = result3[rowIndex+1].DRAGANDDROP_QUESTION_OPTION;
              const answer2 = result3[rowIndex+1].DRAGANDDROP_QUESTION_ANSWER;
              const option3 = result3[rowIndex+2].DRAGANDDROP_QUESTION_OPTION;
              const answer3 = result3[rowIndex+2].DRAGANDDROP_QUESTION_ANSWER;
              const option4 = result3[rowIndex+3].DRAGANDDROP_QUESTION_OPTION;
              const answer4 = result3[rowIndex+3].DRAGANDDROP_QUESTION_ANSWER;

              missionHistoryID += 1;

              conn.query(insertMissionHistoryQuery, [missionHistoryID, title], (err, result4) => {
                if (err) {
                  console.log(err);
                } else {
                  summaryID += 1;
                  console.log(`summary id: ${summaryID}`);
                  conn.query(summaryTableIDQuery, (err, result3) => {
                    if (err) {
                      console.log(err);
                    } else {
                      summaryID = result3[0].COUNT + 1;
                      conn.query('INSERT INTO SUMMARY_TABLE VALUES (?,?,?,?)', [summaryID, trailInstanceID, hotspot, missionHistoryID], (err, result4) => {
                        if (err) {
                          console.log(err);
                        }
                      });
                    }
                  });
                  dragAndDropHistoryID += 1;
                  conn.query(dragAndDropHistoryInsertQuery, [dragAndDropHistoryID, question, missionHistoryID], (err,data) => {
                    if (err) {
                      console.log(err);
                    } else {
                      conn.query(dragAndDropOptionHistoryInsertQuery, [dragAndDropHistoryID, option1, answer1], (err,data) => {
                        if (err) {
                          console.log(err);
                        } 
                      });

                      conn.query(dragAndDropOptionHistoryInsertQuery, [dragAndDropHistoryID, option2, answer2], (err,data) => {
                        if (err) {
                          console.log(err);
                        } 
                      });

                      conn.query(dragAndDropOptionHistoryInsertQuery, [dragAndDropHistoryID, option3, answer3], (err,data) => {
                        if (err) {
                          console.log(err);
                        } 
                      });

                      conn.query(dragAndDropOptionHistoryInsertQuery, [dragAndDropHistoryID, option4, answer4], (err,data) => {
                        if (err) {
                          console.log(err);
                        } 
                      });
                    }
                  });
                }
              });
            }
          });
          duplicateWordSearch(trailInstanceID, missionHistoryID, insertMissionHistoryQuery, summaryID);
        }
      });
    }
  });
}

function duplicateWordSearch(trailInstanceID, missionHistoryID, insertMissionHistoryQuery, summaryID) {
  const wordSearchQuery = 'SELECT WORDSEARCH.WORDSEARCH_ID, WORD, HOTSPOT_NAME, MISSION.MISSION_ID, MISSION_TITLE FROM WORDSEARCH, WORDSEARCH_WORD, TRAIL_HOTSPOT, MISSION WHERE WORDSEARCH.MISSION_ID = TRAIL_HOTSPOT.MISSION_ID AND WORDSEARCH.WORDSEARCH_ID = WORDSEARCH_WORD.WORDSEARCH_ID AND TRAIL_HOTSPOT.MISSION_ID = MISSION.MISSION_ID AND TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?)';
  const numWordSearchQuery = 'SELECT COUNT(*) AS COUNT FROM WORDSEARCH_HISTORY';
  const wordSearchHistoryInsertQuery = 'INSERT INTO WORDSEARCH_HISTORY VALUES (?,?)';
  const wordSearchWordHistoryInsertQuery = 'INSERT INTO WORDSEARCH_WORD_HISTORY VALUES (?,?)';
  const summaryTableIDQuery = 'SELECT COUNT(*) AS COUNT FROM SUMMARY_TABLE';

  conn.query(numWordSearchQuery, (err, result1) => {
    if (err) {
      console.log(err);
    } else {
      let wordSearchID = result1[0].COUNT;
      let rowIndex = -1;

      conn.query(wordSearchQuery, trailInstanceID, (err, result2) => {
        if (err) {
          console.log(err);
        } else {
          result2.forEach((row) => {
            rowIndex += 1;
            if (rowIndex % 5 == 0) {
              const hotspot = row.HOTSPOT_NAME;
              const missionID = row.MISSION_ID;
              const title = row.MISSION_TITLE;
              const word1 = result2[rowIndex].WORD;
              const word2 = result2[rowIndex+1].WORD;
              const word3 = result2[rowIndex+2].WORD;
              const word4 = result2[rowIndex+3].WORD;
              const word5 = result2[rowIndex+4].WORD;

              missionHistoryID += 1;

              conn.query(insertMissionHistoryQuery, [missionHistoryID, title], (err, result4) => {
                if (err) {
                  console.log(err);
                } else {
                  summaryID += 1;
                  console.log(`summary id: ${summaryID}`);
                  conn.query(summaryTableIDQuery, (err, result3) => {
                    if (err) {
                      console.log(err);
                    } else {
                      summaryID = result3[0].COUNT + 1;
                      conn.query('INSERT INTO SUMMARY_TABLE VALUES (?,?,?,?)', [summaryID, trailInstanceID, hotspot, missionHistoryID], (err, result4) => {
                        if (err) {
                          console.log(err);
                        }
                      });
                    }
                  });
                  wordSearchID += 1;
                  conn.query(wordSearchHistoryInsertQuery, [wordSearchID, missionHistoryID], (err, result5) => {
                    if (err) {
                      console.log(err);
                    } else {
                      conn.query(wordSearchWordHistoryInsertQuery, [wordSearchID, word1], (err, result6) => {
                        if (err) {
                          console.log(err);
                        }
                      });

                      conn.query(wordSearchWordHistoryInsertQuery, [wordSearchID, word2], (err, result6) => {
                        if (err) {
                          console.log(err);
                        }
                      });

                      conn.query(wordSearchWordHistoryInsertQuery, [wordSearchID, word3], (err, result6) => {
                        if (err) {
                          console.log(err);
                        }
                      });

                      conn.query(wordSearchWordHistoryInsertQuery, [wordSearchID, word4], (err, result6) => {
                        if (err) {
                          console.log(err);
                        }
                      });

                      conn.query(wordSearchWordHistoryInsertQuery, [wordSearchID, word5], (err, result6) => {
                        if (err) {
                          console.log(err);
                        }
                      });
                    }
                  });
                }
              });
            }
          });
          duplicateDrawingQuestion(trailInstanceID, missionHistoryID, insertMissionHistoryQuery, summaryID);
        }
      });
    }
  });
}

function duplicateDrawingQuestion(trailInstanceID, missionHistoryID, insertMissionHistoryQuery, summaryID) {
  const drawingQuestionQuery = 'SELECT QUESTION, MISSION.MISSION_ID, HOTSPOT_NAME, MISSION_TITLE FROM DRAWING_QUESTION, MISSION, TRAIL_HOTSPOT WHERE DRAWING_QUESTION.MISSION_ID = TRAIL_HOTSPOT.MISSION_ID AND MISSION.MISSION_ID = TRAIL_HOTSPOT.MISSION_ID AND TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?)';
  const numDrawingQuery = 'SELECT COUNT(*) AS COUNT FROM DRAWING_QUESTION_HISTORY';
  const summaryTableIDQuery = 'SELECT COUNT(*) AS COUNT FROM SUMMARY_TABLE';
  const drawingHistoryInsertQuery = 'INSERT INTO DRAWING_QUESTION_HISTORY VALUES (?,?,?)';

  conn.query(numDrawingQuery, (err,result1) => {
    if (err) {
      console.log(err);
    } else {
      let drawingID = result1[0].COUNT;
      conn.query(drawingQuestionQuery, trailInstanceID, (err, result2) => {
        if (err) {
          console.log(err);
        } else {
          result2.forEach((row) => {
            const question = row.QUESTION;
            const hotspot = row.HOTSPOT_NAME;
            const missionID = row.MISSION_ID;
            const title = row.MISSION_TITLE;

            missionHistoryID += 1;

            conn.query(insertMissionHistoryQuery, [missionHistoryID, title], (err, result4) => {
              if (err) {
                console.log(err);
              } else {
                summaryID += 1;
                console.log(`summary id: ${summaryID}`);
                conn.query(summaryTableIDQuery, (err, result3) => {
                  if (err) {
                    console.log(err);
                  } else {
                    summaryID = result3[0].COUNT + 1;
                    conn.query('INSERT INTO SUMMARY_TABLE VALUES (?,?,?,?)', [summaryID, trailInstanceID, hotspot, missionHistoryID], (err, result4) => {
                      if (err) {
                        console.log(err);
                      }
                    });
                  }
                  drawingID += 1;
                  conn.query(drawingHistoryInsertQuery, [drawingID, question, missionHistoryID], (err,result4) => {
                    if (err) {
                      console.log(err);
                    }
                  })
                });
              }
            })
          })
          duplicateSubmissionQuestion(trailInstanceID, missionHistoryID, insertMissionHistoryQuery, summaryID)
        }
      })
    }
  })
}

function duplicateSubmissionQuestion(trailInstanceID, missionHistoryID, insertMissionHistoryQuery, summaryID) {
  const submissionQuestionQuery = 'SELECT QUESTION, MISSION.MISSION_ID, HOTSPOT_NAME, MISSION_TITLE FROM SUBMISSION_QUESTION, MISSION, TRAIL_HOTSPOT WHERE SUBMISSION_QUESTION.MISSION_ID = TRAIL_HOTSPOT.MISSION_ID AND MISSION.MISSION_ID = TRAIL_HOTSPOT.MISSION_ID AND TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?)';
  const numSubmissionQuery = 'SELECT COUNT(*) AS COUNT FROM SUBMISSION_QUESTION_HISTORY';
  const summaryTableIDQuery = 'SELECT COUNT(*) AS COUNT FROM SUMMARY_TABLE';
  const submissionHistoryInsertQuery = 'INSERT INTO SUBMISSION_QUESTION_HISTORY VALUES (?,?,?)';

  conn.query(numSubmissionQuery, (err,result1) => {
    if (err) {
      console.log(err);
    } else {
      let submissionID = result1[0].COUNT;
      conn.query(submissionQuestionQuery, trailInstanceID, (err, result2) => {
        if (err) {
          console.log(err);
        } else {
          result2.forEach((row) => {
            const question = row.QUESTION;
            const hotspot = row.HOTSPOT_NAME;
            const missionID = row.MISSION_ID;
            const title = row.MISSION_TITLE;

            missionHistoryID += 1;

            conn.query(insertMissionHistoryQuery, [missionHistoryID, title], (err, result4) => {
              if (err) {
                console.log(err);
              } else {
                summaryID += 1;
                console.log(`summary id: ${summaryID}`);
                conn.query(summaryTableIDQuery, (err, result3) => {
                  if (err) {
                    console.log(err);
                  } else {
                    summaryID = result3[0].COUNT + 1;
                    conn.query('INSERT INTO SUMMARY_TABLE VALUES (?,?,?,?)', [summaryID, trailInstanceID, hotspot, missionHistoryID], (err, result4) => {
                      if (err) {
                        console.log(err);
                      }
                    });
                  }
                  submissionID += 1;
                  conn.query(submissionHistoryInsertQuery, [submissionID, question, missionHistoryID], (err,result4) => {
                    if (err) {
                      console.log(err);
                    }
                  })
                });
              }
            })
          })
        }
      })
    }
  })
}

module.exports = router;
