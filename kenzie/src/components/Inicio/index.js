import { useHistory, Redirect } from "react-router-dom";

const Inicio = ({ authenticated }) => {
  const history = useHistory();
  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <div className="titles">
        <h1 className="kenzie">Kenzie</h1>
        <h1 className="hub">Hub</h1>
      </div>
      <h2 className="Titlefirst">Crie sua conta agora,ou faça seu login </h2>
      <div className="Buttons">
        <button className="btnsc" onClick={() => history.push("/singup")}>
          Cadastre-se{" "}
        </button>
        <button className="btnsl" onClick={() => history.push("/login")}>
          Login
        </button>
      </div>
    </>
  );
};
export default Inicio;
