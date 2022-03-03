var pool = require('./connection.js')

module.exports.getAllRooms = async function() {
  try {
    let sql = "Select * from room";
    let result = await pool.query(sql);
    let rooms = result.rows;
    return { status: 200, result: rooms};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err};
  }
}