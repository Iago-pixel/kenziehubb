import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import "../SingUp/style.css";
import { Paper, Grid } from "@material-ui/core";
import { useHistory, Redirect } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
const Login = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 caracteres")
      .required("Campo obrigatório")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Senha deve ter letras e números"
      ),
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
      .post("https://kenziehub.herokuapp.com/sessions", data)
      .then((response) => {
        localStorage.setItem("@Kenzie", JSON.stringify(response.data.user.id));
        const { token } = response.data;
        localStorage.setItem("@KenzieHub:token", JSON.stringify(token));
        setAuthenticated(true);
        return history.push("/dashboard");
      })
      .catch((err) => toast.error("Sucesso no login"));
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
                <h2> Faça seu Login</h2>
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
                <div className="Buttons">
                  <button className="Btns" type="submit">
                    Entrar
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
export default Login;
