const express = require("express");
const app = express();
app.use(express.json());
var cors = require("cors");
const dbConnect = require("./MongoConnect");

app.use(cors());

app.post("/users/new", async (req, res) => {
  let data = await dbConnect("Company", "Employees");
  // console.log(
  //   req.body.Username,
  //   req.body.Id,
  //   req.body.Age,
  //   req.body.Department
  // );
  let result = await data.insertOne(req.body);
  res.send(result);
  console.log(result);
});

app.post("/users/updt", async (req, res) => {
  let data = await dbConnect("Company", "Employees");
  let result = await data.updateOne(
    { Username: req.body.Username },
    {
      $set: {
        Username: req.body.NewUsername,
        Department: req.body.NewDepartment,
      },
    }
  );
  res.send(result);
  console.log(result);
});

app.delete("/users/del", async (req, res) => {
  let data = await dbConnect("Company", "Employees");
  let result = await data.deleteOne({ Username: req.body.Username });
  res.send(result);
  console.log(result);
});

app.listen(4000);
