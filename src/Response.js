import "./Response.css";
import { myDataFn } from "./Components/Inputs";
function Response() {
  const myData = myDataFn();
  try {
    return (
      <div className="App">
        <h3>Sus datos son:</h3>
        Nombre completo: <p>{myData.full_name}</p>
        Correo electrónico: <p>{myData.email}</p>
        Fecha de nacimiento: <p>{myData.birth_date}</p>
        ¿Acepta los términos y condiciones?:
        <p>{myData.terms_and_conditions ? "true" : "false"}</p>
      </div>
    );
  } catch {
    return (
      <div className="App">
        <h3>
          Primero debe utilizar el formulario. Se encuentra en la ruta "/"
        </h3>
      </div>
    );
  }
}

export default Response;
