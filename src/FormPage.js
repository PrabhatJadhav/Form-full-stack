import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function FormPage() {
  const [newEmData, setnewEmData] = useState({
    username: "",
    id: "",
    age: "",
    dept: "",
  });
  const [updtEmData, setupdtEmData] = useState({
    username: "",
    newUsername: "",
    newDept: "",
  });
  const [delEmData, setdelEmData] = useState({
    username: "",
  });

  const getnewEmData = (e) => {
    let info = e.target.name;
    let value = e.target.value;
    setnewEmData({ ...newEmData, [info]: value });
  };
  const updateEmployeeData = (e) => {
    let info = e.target.name;
    let value = e.target.value;
    setupdtEmData({ ...updtEmData, [info]: value });
  };
  const deleteEmployeeData = (e) => {
    let info = e.target.name;
    let value = e.target.value;
    setdelEmData({ [info]: value });
  };

  const postnewEmData = async (e) => {
    e.preventDefault();
    // console.log(newEmData);
    const { username, id, age, dept } = newEmData;

    const res = await fetch("http://localhost:4000/users/new", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        Username: username,
        Id: id,
        Age: age,
        Department: dept,
      }),
    });

    const finalRes = await res.json();
    console.log(finalRes);

    setnewEmData({
      username: "",
      id: "",
      age: "",
      dept: "",
    });
  };

  const updateEmData = async (e) => {
    e.preventDefault();
    const { username, newUsername, newDept } = updtEmData;

    const res = await fetch("http://localhost:4000/users/updt", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        Username: username,
        NewUsername: newUsername,
        NewDepartment: newDept,
      }),
    });

    const finalRes = await res.json();
    console.log(finalRes);

    setupdtEmData({
      username: "",
      newUsername: "",
      newDept: "",
    });
  };

  const deleteEmData = async (e) => {
    e.preventDefault();
    const username = delEmData.username;

    const res = await fetch("http://localhost:4000/users/del", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        Username: username,
      }),
    });

    const finalRes = await res.json();
    console.log(finalRes);
    setdelEmData({ username: "" });
  };

  return (
    <div className=" py-5 container">
      <div className="d-flex row-10 align-items-center justify-content-around flex-wrap">
        <form className="" method="POST" onSubmit={postnewEmData}>
          <h3>New Employee</h3>
          <input
            className="my-3"
            placeholder="Username"
            value={newEmData.username}
            name="username"
            type="text"
            minLength="3"
            maxLength="32"
            onChange={getnewEmData}
            required
          />
          <br />
          <input
            className="my-3"
            placeholder="Employee Id"
            value={newEmData.id}
            name="id"
            type="tel"
            minLength="1"
            maxLength="4"
            onChange={getnewEmData}
            required
          />
          <br />
          <input
            className="my-3"
            placeholder="Age"
            value={newEmData.age}
            name="age"
            type="tel"
            minLength="2"
            maxLength="2"
            onChange={getnewEmData}
            required
          />
          <br />
          <label>Department - </label>
          <select
            onChange={getnewEmData}
            id="selectbox"
            name="dept"
            value={newEmData.dept}
          >
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
          </select>
          <br />
          <br />
          <button onClick={postnewEmData}>Submit</button>
        </form>

        <form className="" method="POST" onSubmit={updateEmData}>
          <h3>Update Employee</h3>
          <input
            className="my-3"
            placeholder="Username"
            value={updtEmData.username}
            name="username"
            type="text"
            minLength="3"
            maxLength="32"
            onChange={updateEmployeeData}
            required
          />
          <br />
          <input
            className="my-3"
            placeholder="New Username"
            value={updtEmData.newUsername}
            name="newUsername"
            type="text"
            minLength="3"
            maxLength="32"
            onChange={updateEmployeeData}
            required
          />
          <br />
          <label>New Department - </label>
          <select
            onChange={updateEmployeeData}
            id="selectbox"
            name="newDept"
            value={updtEmData.newDept}
          >
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
          </select>
          <br />
          <br />
          <button onClick={updateEmData}>Update</button>
        </form>

        <form className="" method="DELETE" onSubmit={deleteEmData}>
          <h3>Delete Employee Data</h3>
          <input
            className="my-3"
            placeholder="Username"
            value={delEmData.username}
            name="username"
            type="text"
            minLength="3"
            maxLength="32"
            onChange={deleteEmployeeData}
            required
          />
          <br />
          <br />
          <button onClick={deleteEmData}>Delete</button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;


