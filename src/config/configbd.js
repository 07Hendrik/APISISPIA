const oracledb = require("oracledb");
const { BIND_OUT, CURSOR } = require("oracledb");

/*cns = {
  user: "system",
  password: "oracle",
  connectString: "192.168.100.236/XE",
};*/

cns = {
  user: "SISPIA",
  password: "D3v3l0p3r$",
  connectString: "10.50.74.11/DEVELOPER",
};

async function _BDSISPIA() {
  let cnn = await oracledb.getConnection(cns);
  return cnn;
}

async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
      user: "SISPIA",
      password: "D3v3l0p3r$",
      connectString: "10.50.74.11/DEVELOPER",
    });

    console.log("connected to database");
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        //console.log("close connection success");
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

async function Open(sql, binds, autoCommit) {
  let cnn = await oracledb.getConnection(cns);
  let result = await cnn.execute(sql, binds, { autoCommit });
  cnn.release();
  return result;
}

async function OpenSISPIA(sql, binds, autoCommit) {
  let cnn = await oracledb.getConnection(BDSISPIA);
  let result = await cnn.execute(sql, binds, { autoCommit });
  cnn.release();
  return result;
}

async function devuelvePersona(req) {
  let cnn = await oracledb.getConnection(cns);

  sql = "begin get_persona(:pidpersona, :pcurdata); end;";

  const Param = {
    pidpersona: req,
    pcurdata: { type: CURSOR, dir: BIND_OUT },
  };

  const result = await cnn.execute(sql, Param, {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  });
  //console.log(result);
  const resultSet1 = result.outBinds.pcurdata;
  //console.log(resultSet1);
  //console.log("Cursor metadata:");
  //console.log(resultSet1);
  const rows1 = await resultSet1.getRows(); // no parameter means get all rows
  //console.log(rows1);

  await resultSet1.close();
  cnn.release();
  return rows1;
}

exports.Open = Open;
exports.OpenSISPIA = OpenSISPIA;
exports.devuelvePersona = devuelvePersona;
exports._BDSISPIA = _BDSISPIA;
exports.checkConnection = checkConnection;
