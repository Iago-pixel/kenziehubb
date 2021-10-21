const Users = ({ handleClick, users, DeleteUsers }) => {
  return (
    <>
      {users.techs &&
        users.techs.map((techs) => (
          <ul key={techs.id}>
            <li>Tecnologia: {techs.title}</li>
            <li>Status: {techs.status}</li>
            <button className="Btns" onClick={() => DeleteUsers(techs)}>
              Deletar
            </button>
          </ul>
        ))}
      <button className="Btns" onClick={handleClick}>
        Minhas Tecnologias
      </button>
    </>
  );
};
export default Users;
