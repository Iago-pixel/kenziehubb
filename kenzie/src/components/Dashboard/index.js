import { Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import Users from "../Cards";
import axios from "axios";
import { useState } from "react";

const Dashboard = ({ authenticated }) => {
  const [users, setUsers] = useState({});
  const { register, handleSubmit } = useForm();

  const [token] = useState(
    JSON.parse(localStorage.getItem("@KenzieHub:token") || "")
  );
  const [userId] = useState(JSON.parse(localStorage.getItem("@Kenzie")) || "");
  const showUsers = () => {
    axios
      .get(`https://kenziehub.herokuapp.com/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data);

        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(userId);
  console.log(users);

  const createTechs = (data) => {
    axios
      .post(
        "https://kenziehub.herokuapp.com/users/techs",
        data,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleted = (techno) => {
    axios
      .delete(`https://kenziehub.herokuapp.com/users/techs/${techno.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!authenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <h1>Seja bem vindo!!</h1>
      <form onSubmit={handleSubmit(createTechs)}>
        <input
          className="Inpts"
          {...register("title")}
          placeholder="Adicionar Tecnologia"
        ></input>
        <input
          className="Inpts"
          {...register("status")}
          placeholder="Qual status ?"
        ></input>
        <button className="btnAdd" type="submit">
          +
        </button>
      </form>
      <div className="container2">
        <Users DeleteUsers={deleted} handleClick={showUsers} users={users} />
      </div>
    </div>
  );
};
export default Dashboard;
