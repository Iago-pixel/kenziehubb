import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Rotes from "./components/Rotas";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />
        <Rotes></Rotes>
      </header>
    </div>
  );
}

export default App;
