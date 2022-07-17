const { BIND_OUT, CURSOR, OUT_FORMAT_OBJECT, outFormat } = require("oracledb");
const BD = require("../config/configbd");

async function devuelveUsuario(req) {
  let cnn;
  try {
    cnn = await BD._BDSISPIA();

    sql = "begin PKG_USUARIO.ver_usuario(:pcoduser, :pcurdata); end;";

    const Param = {
      pcoduser: req,
      pcurdata: { type: CURSOR, dir: BIND_OUT },
    };

    const result = await cnn.execute(sql, Param, {
      outFormat: OUT_FORMAT_OBJECT,
    });

    const resultSet = result.outBinds.pcurdata;

    //console.log("Cursor metadata:");

    const rows = await resultSet.getRows(); // no parameter means get all rows

    await resultSet.close();
    //cnn.release();
    return rows;
  } catch (err) {
    console.error(err);
  } finally {
    if (cnn) {
      try {
        await cnn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function ListaRol() {
  let cnn;
  try {
    cnn = await BD._BDSISPIA();

    sql = "begin PKG_USUARIO.sp_lista_rol(:pcurdata); end;";

    const Param = {
      //pcoduser: req,
      pcurdata: { type: CURSOR, dir: BIND_OUT },
    };

    const result = await cnn.execute(sql, Param, {
      outFormat: OUT_FORMAT_OBJECT,
    });

    const resultSet = result.outBinds.pcurdata;

    //console.log("Cursor metadata:");

    const rows = await resultSet.getRows(); // no parameter means get all rows

    await resultSet.close();
    //cnn.release();
    return rows;
  } catch (err) {
    console.error(err);
  } finally {
    if (cnn) {
      try {
        await cnn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function RegistrarRol(req, autoCommit) {
  let cnn;
  const { codrol, txtrol, flgrol } = req.body;

  try {
    cnn = await BD._BDSISPIA();

    sql =
      "begin PKG_USUARIO.sp_registra_rol(:codrol, :txtrol, :flgrol, :codrolout); end;";

    const Param = {
      codrol: codrol,
      txtrol: txtrol,
      flgrol: flgrol,
      codrolout: { dir: BIND_OUT },
    };

    const result = await cnn.execute(sql, Param, { autoCommit });

    const resultSet = result.outBinds;

    return resultSet;
  } catch (err) {
    console.error(err);
  } finally {
    if (cnn) {
      try {
        await cnn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

exports.devuelveUsuario = devuelveUsuario;
exports.ListaRol = ListaRol;
exports.RegistrarRol = RegistrarRol;
