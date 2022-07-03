const oracledb = require('oracledb');

cns = {
    user: "system",
    password: "oracle",
    connectString: "192.168.100.236/XE"
}

async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;