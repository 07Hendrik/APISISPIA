const { Router } = require("express");
const router = Router();
const BD = require("../config/configbd");

//READ
router.get("/getUsers", async (req, res) => {
  sql = "select * from tabla_persona where idpersona=1";

  let result = await BD.Open(sql, [], false);
  Users = [];

  result.rows.map((user) => {
    let userSchema = {
      idpersona: user[0],
      dni: user[1],
      nombre: user[2],
      apepaterno: user[3],
    };

    Users.push(userSchema);
  });

  res.json(Users);
});

//CREATE
router.post("/addUser", async (req, res) => {
  const { idpersona, dni, nombre, apepaterno, apematerno } = req.body;

  console.log(idpersona);
  sql =
    "insert into tabla_persona(idpersona,dni,nombre, apepaterno, apematerno) values (:idpersona,:dni,:nombre, :apepaterno, :apematerno)";

  await BD.Open(sql, [idpersona,dni,nombre, apepaterno, apematerno], true);

  res.status(200).json({
    idpersona: idpersona,
    dni: dni,
    nombre: nombre,
  });
});

//UPDATE
router.put("/updateUser", async (req, res) => {
  const { idpersona, nombre, apepaterno, apematerno } = req.body;

  sql =
    "update tabla_persona set nombre=:nombre, apepaterno=:apepaterno, apematerno=:apematerno where idpersona=:idpersona";

  await BD.Open(sql, [nombre, apepaterno, apematerno, idpersona], true);

  res.status(200).json({
    idpersona: idpersona,
    nombre: nombre,
    apematerno: apematerno
  });
});

//DELETE
router.delete("/deleteUser", async (req, res) => {
  const { idpersona } = req.params;

  sql = "delete from tabla_persona where idpersona=:idpersona";

  await BD.Open(sql, [idpersona], true);

  res.json({ msg: "Usuario Eliminado" });
});

module.exports = router;
