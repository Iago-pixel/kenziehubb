import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import "./style.css";
import { Paper, Grid } from "@material-ui/core";
import { useHistory, Redirect } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Users from "../Cards";
const Cadastro = ({ authenticated }) => {
  const [userData, setUserData] = useState([]);

  const history = useHistory();

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 caracteres")
      .required("Campo obrigatório")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Senha deve ter letras e números"
      ),
    bio: yup.string().required("Campo obrigatório"),
    contact: yup.string().required("Campo obrigatório"),
    course_module: yup.string().required("Campo obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/users", data)
      .then((response) => {
        toast.success("Success Notification !");
        history.push("/login");
        setUserData(response.data);
      })
      .catch((err) => toast.error("Erro ao criar conta"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <div className="titles">
        <h1 className="kenzie">Kenzie</h1>
        <h1 className="hub">Hub</h1>
      </div>

      <Grid>
        <Grid>
          <Paper>
            <div className="cont">
              <form className="formCont" onSubmit={handleSubmit(onSubmit)}>
                <h2> Cadastro</h2>
                <input
                  className="Inpts"
                  {...register("name")}
                  placeholder="Nome"
                ></input>
                <span className="errors"> {errors.name?.message}</span>
                <input
                  className="Inpts"
                  {...register("email")}
                  placeholder="Email"
                ></input>
                <span className="errors"> {errors.email?.message}</span>
                <input
                  className="Inpts"
                  {...register("password")}
                  placeholder="Senha"
                  type="password"
                ></input>
                <span className="errors"> {errors.password?.message}</span>
                <input
                  className="Inpts"
                  {...register("bio")}
                  placeholder="Bio"
                ></input>
                <span className="errors"> {errors.bio?.message}</span>
                <input
                  className="Inpts"
                  {...register("contact")}
                  placeholder="Contato"
                ></input>
                <span className="errors"> {errors.contact?.message}</span>
                <input
                  className="Inpts"
                  {...register("course_module")}
                  placeholder="Módulo"
                ></input>
                <span className="errors"> {errors.course_module?.message}</span>
                <div className="Buttons">
                  <button className="Btns" type="submit">
                    Cadastrar-se
                  </button>
                  <button className="Btns" onClick={() => history.push("/")}>
                    Home
                  </button>
                </div>
              </form>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default Cadastro;
