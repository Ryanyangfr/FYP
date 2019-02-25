module.exports = {
  getDateTime() {
    const date = new Date();
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);

    let hour = date.getHours();
    hour = (hour < 10 ? '0' : '') + hour;

    let min = date.getMinutes();
    min = (min < 10 ? '0' : '') + min;

    let sec = date.getSeconds();
    sec = (sec < 10 ? '0' : '') + sec;

    const year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = (month < 10 ? '0' : '') + month;

    let day = date.getDate();
    day = (day < 10 ? '0' : '') + day;

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  },

  getActiveTrailInstanceID(conn) {
    const getActiveTrailInstance = 'SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1';

    conn.query(getActiveTrailInstance, (err, data) => {
      if (err) {
        console.log(`get active trail instance error: ${err}`);
      } else {
        console.log(data);
        return data[0].TRAIL_INSTANCE_ID;
      }
    });
  }
}