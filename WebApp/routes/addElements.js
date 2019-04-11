const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const router = express.Router();

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// getting the current quiz ids and quiz option ids
let quiz_id = 0;
let quiz_option_id = 0;
const quiz_query = 'SELECT MAX(QUIZ_ID) as count FROM QUIZ';
const quiz_option_query = 'SELECT MAX(QUIZ_OPTION_ID) as count FROM QUIZ_OPTION';

conn.query(quiz_query, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    quiz_id = data[0].count + 1;
  }
});

conn.query(quiz_option_query, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    quiz_option_id = data[0].count + 1;
  }
});

// getting the current wefie question id
let wefie_id = 0;
const wefie_query = 'SELECT MAX(QUESTION_ID) AS ID from SUBMISSION_QUESTION';

conn.query(wefie_query, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    wefie_id = data[0].ID + 1;
    console.log('wefie id: ' + wefie_id)
  }
});

//getting current drag and drop id
let dragAndDropID = 0;
const dragAndDropIDQuery = 'SELECT MAX(DRAGANDDROP_ID) AS ID FROM DRAG_AND_DROP';

conn.query(dragAndDropIDQuery, (err,data) => {
  if (err) {
    console.log(err);
  } else {
    dragAndDropID = data[0].ID + 1;
  }
})

// getting the current drawing question id
let drawing_id = 0;
const drawing_query = 'SELECT MAX(QUESTION_ID) AS ID FROM DRAWING_QUESTION';

conn.query(drawing_query, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    drawing_id = data[0].ID + 1;
  }
});

// getting the current mission id
let mission_id = 0;
const mission_query = 'SELECT MAX(MISSION_ID) as count from MISSION';

conn.query(mission_query, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    mission_id = data[0].count + 1;
  }
});

router.post('/addHotspot', (req,res) => {
  console.log(req.body);
  const hotspotName = req.body.hotspot_name;
  const latitude = req.body.latitude;
  const longtitude = req.body.longtitude;
  // const narrative_id = req.body.narrative_id;

  const query = 'INSERT INTO HOTSPOT VALUES (?,?,?)';

  conn.query(query,[hotspotName,latitude,longtitude], (err, query) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/addNarrative', (req,res) => {
  const narrative = req.body.narrative;
  const title = req.body.title;

  const getNumNarrative = 'SELECT MAX(NARRATIVE_ID) as count from NARRATIVE';

  conn.query(getNumNarrative, (err, data) => {
    const count = parseInt(data[0].count);
    const id = count + 1;

    const query = 'INSERT INTO NARRATIVE VALUES (?,?,?)';

    conn.query(query, [id, title, narrative], (err, reply) => {
      if (err) {
        console.log(err);
        res.send(JSON.stringify({ success: 'false' }));
      } else {
        res.send(JSON.stringify({ success: 'true' }));
      }
    });
  });
});

router.post('/addQuiz', (req,res) => {
  const title = req.body.title;
  const quiz = req.body.quiz;
  const ms_query = 'INSERT INTO MISSION VALUES (?,?)';

  conn.query(ms_query, [mission_id,title], (err, data) => {
    if (err) {
      res.send(JSON.stringify({ success: 'false' }));
      mission_id += 1;
      console.log(err);
    } else {
      let count = 0;
      for (const index in quiz) {
        count += 1;
        const row = quiz[index]
        const question = row.question;
        const option1 = row.option1;  
        const option2 = row.option2;
        const option3 = row.option3;
        const option4 = row.option4;
        const answer = row.answer;

        update_quiz(count, quiz.length, quiz_id, question, answer, mission_id, quiz_option_id, option1, option2, option3, option4, res);

        quiz_id = quiz_id + 1;
        quiz_option_id = quiz_option_id + 4;
      }
      mission_id += 1;
    }
  });
});

function update_quiz(count, final_count, quiz_id, question, answer, mission_id, quiz_option_id, option1, option2, option3, option4, res) {
  const qz_query = 'INSERT INTO QUIZ VALUES (?,?,?,?)';
  const qz_opt_query = 'INSERT INTO QUIZ_OPTION VALUES (?,?,?)';
  let counter = 0;
  conn.query(qz_query, [quiz_id, question, answer, mission_id], (err, response) => {
    if (err) {
      mission_id += 1;
      res.send(JSON.stringify({ success: 'false' }));
      console.log(err);
      return false;
    }
    counter = 0;
    conn.query(qz_opt_query, [quiz_id, quiz_option_id, option1], (err, reply) => {
      if (err) {
        res.send(JSON.stringify({ success: 'false' }));
        console.log(err);
        return false;
      }
      counter += 1;
      if (counter === 4 && count === final_count) {
        res.send(JSON.stringify({ success: 'true' }));
        mission_id += 1;
        return true;
      }
    });

    quiz_option_id += 1;
    conn.query(qz_opt_query, [quiz_id, quiz_option_id, option2], (err, reply) => {
      if (err) {
        res.send(JSON.stringify({ success: 'false' }));
        console.log(err);
        return false;
      }
      counter += 1;
      if (counter === 4 && count === final_count) {
        res.send(JSON.stringify({ success: 'true' }));
        mission_id += 1;
        return true;
      }
    });

    quiz_option_id += 1;
    conn.query(qz_opt_query, [quiz_id, quiz_option_id, option3], (err, reply) => {
      if (err) {
        res.send(JSON.stringify({ success: 'false' }));
        console.log(err);
        return false;
      }
      counter += 1;
      if (counter === 4 && count === final_count) {
        res.send(JSON.stringify({ success: 'true' }));
        mission_id += 1;
        return true;
      }
    });

    quiz_option_id += 1;
    conn.query(qz_opt_query, [quiz_id, quiz_option_id, option4], (err, reply) => {
      if (err) {
        res.send(JSON.stringify({ success: 'false' }));
        console.log(err);
        return false;
      }
      counter += 1;
      if (counter === 4 && count === final_count) {
        res.send(JSON.stringify({ success: 'true' }));
        mission_id += 1;
        return true;
      }
    });
  });
};

router.post('/addWefieQuestion', (req,res) => {
  const question = req.body.question;
  const title = req.body.title;

  const ms_query = 'INSERT INTO MISSION VALUES (?,?)';
  conn.query(ms_query, [mission_id,title], (err, data) => {
    if (err) {
      mission_id += 1;
      res.send(JSON.stringify({ success: 'false' }));
      console.log(err);
    } else {
      const add_query = 'INSERT INTO SUBMISSION_QUESTION VALUES (?,?,?)';
      conn.query(add_query, [wefie_id, question, mission_id], (err, data) => {
        if (err) {
          res.send(JSON.stringify({ success: 'false' }));
          console.log(err);
        } else {
          res.send(JSON.stringify({ success: 'true' }));
          mission_id += 1;
          wefie_id += 1;
        }
      });
    }
  });
});

router.post('/addDragAndDropQuestion', (req,res) => {

  const title = req.body.title;
  const question = req.body.question;
  const options = req.body.options;
  const ms_query = 'INSERT INTO MISSION VALUES (?,?)';
  const dragNDropQuery = 'INSERT INTO DRAG_AND_DROP VALUES (?,?,?)';
  const dragNDropOptionQuery = 'INSERT INTO DRAG_AND_DROP_OPTION VALUES (?,?,?)';

  conn.query(ms_query, [mission_id,title], (err,data) => {
    if (err) {
      mission_id += 1;
      res.send(JSON.stringify({ success: 'false' }));
      console.log(err);
    } else {
      conn.query(dragNDropQuery, [dragAndDropID, question, mission_id], (err, rows) => {
        // mission_id += 1;
        if (err) {
          console.log(err);
        } else {
          let counter = 0;
          options.forEach((option) => {
            let qn_option = option.option;
            let qn_answer = option.answer;
            conn.query(dragNDropOptionQuery, [dragAndDropID, qn_option, qn_answer], (err, data2) => {
              if (err) {
                console.log(err);
              } else {
                counter += 1;
                if (counter === options.length) {
                  mission_id += 1;
                  res.send(JSON.stringify({ success: 'true' }));
                }
              }
            })
          })
        }
      })
    }
  })
})

router.post('/addDrawingQuestion', (req,res) => {
  const question = req.body.question;
  const title = req.body.title;

  const ms_query = 'INSERT INTO MISSION VALUES (?,?)';

  conn.query(ms_query, [mission_id,title], (err, data) => {
    if (err) {
      mission_id += 1;
      res.send(JSON.stringify({ success: 'false' }));
      console.log(err);
    } else {
      const add_query = 'INSERT INTO DRAWING_QUESTION VALUES (?,?,?)';
      conn.query(add_query, [drawing_id, question, mission_id], (err, data) => {
        if (err) {
          res.send(JSON.stringify({ success: 'false' }));
          console.log(err);
        } else {
          res.send(JSON.stringify({ success: 'true' }));
          mission_id += 1;
          drawing_id += 1;
        }
      });
    }
  });
});

router.post('/addAnagram', (req,res) => {
  const word = req.body.word;
  const title = req.body.title;

  const anagramIDQuery = 'SELECT MAX(ANAGRAM_ID) AS ID FROM ANAGRAM';
  const ms_query = 'INSERT INTO MISSION VALUES (?,?)';
  const anagramQuery = 'INSERT INTO ANAGRAM VALUES (?,?,?);'

  conn.query(anagramIDQuery, (err,data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      const currAnagramID = data[0].ID + 1;
      conn.query(ms_query, [mission_id, title], (err, data2) => {
        if (err) {
          mission_id += 1;
          console.log(err);
          res.send(JSON.stringify({ success: 'false' }));
        } else {
          conn.query(anagramQuery, [currAnagramID, word, mission_id], (err, data3) => {
            if (err) {
              console.log(err);
              res.send(JSON.stringify({ success: 'false' }));
            } else {
              res.send(JSON.stringify({ success: 'true' }));
              mission_id += 1;
            }
          })
        }
      })
    }
  })
});

router.post('/addWordsearchQuestion', (req,res) => {
  const words = req.body.words;
  const title = req.body.title;

  const wordSearchIDQuery = 'SELECT MAX(WORDSEARCH_ID) AS ID FROM WORDSEARCH';
  const ms_query = 'INSERT INTO MISSION VALUES (?,?)';
  const wordSearchQuery = 'INSERT INTO WORDSEARCH VALUES (?,?)';
  const wordSearchWordsQuery = 'INSERT INTO WORDSEARCH_WORD VALUES (?,?)';


  conn.query(wordSearchIDQuery, (err,data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      const currWordSearchID = data[0].ID + 1;
      conn.query(ms_query, [mission_id, title], (err, data2) => {
        if (err) {
          mission_id += 1;
          console.log(err);
          res.send(JSON.stringify({ success: 'false' }));
        } else {
          conn.query(wordSearchQuery, [currWordSearchID, mission_id], (err, data3) => {
            if (err) {
              console.log(err);
              res.send(JSON.stringify({ success: 'false' }));
            } else {
              let count = 0;
              words.forEach((word)=>{
                conn.query(wordSearchWordsQuery, [currWordSearchID,word.word], (err, data4) => {
                  if (err) {
                    console.log(err);
                    res.send(JSON.stringify({ success: 'false' }));
                  } else {
                    count += 1;
                    if (count === words.length) {
                      res.send(JSON.stringify({ success: 'true' }));
                      mission_id += 1;
                    }
                  }
                })
              })
            }
          })
        }
      })
    }
  })
});

module.exports = router;
