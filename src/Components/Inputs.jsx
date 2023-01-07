import "./Inputs.css";
import db_json from "../db-json/db-json.json";
import { useState } from "react";
import { getDoc, collection, doc, setDoc } from "firebase/firestore";
import db from "../firebase/firebase";
import { Link } from "react-router-dom";
let myData;

export function myDataFn() {
  return myData;
}
export function Inputs() {
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [country_of_origin, setCountry_of_origin] = useState("");
  const [terms_and_conditions, setTerms_and_conditions] = useState(false);
  const [message, setMessage] = useState("");
  const items = db_json.items;
  let myFormId;

  const saveData = async (data) => {
    const newFormRef = doc(collection(db, "form"));
    await setDoc(newFormRef, data);
    myFormId = newFormRef.id;
  };

  const getData = async () => {
    const docRef = doc(db, "form", myFormId);
    const docSnap = await getDoc(docRef);
    myData = docSnap.data();
  };

  function handleSubmit(e) {
    e.preventDefault();

    saveData({
      full_name: full_name,
      email: email,
      birth_date: birth_date,
      country_of_origin: country_of_origin,
      terms_and_conditions: terms_and_conditions,
    }).then((data) => {
      setMessage(
        "Sus datos han sido enviados exitosamente. Presione el boton de debajo para ver sus datos:"
      );
      getData();
    });
  }
  function handleChange(e) {
    if (e.target.name === "full_name") {
      setFull_name(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "birth_date") {
      setBirth_date(e.target.value);
    }
    if (e.target.name === "country_of_origin") {
      setCountry_of_origin(e.target.options[e.target.selectedIndex].value);
    }
    if (e.target.name === "terms_and_conditions") {
      setTerms_and_conditions(e.target.checked ? true : false);
    }
  }
  return (
    <form className="Inputs-container" onSubmit={handleSubmit}>
      {items.map((e, i) => {
        if (e.type === "select") {
          return (
            <div className="input-container" key={i}>
              <label htmlFor={e.label}>{e.label}</label>
              <select
                name={e.name}
                required={e.required ? true : false}
                value={window[e.name]}
                id={e.label}
                label={e.label}
                onChange={handleChange}
              >
                <option value="">---Elige tu pais---</option>
                {e.options.map((el, j) => {
                  return (
                    <option key={j} value={el.value}>
                      {el.label}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        } else {
          return (
            <div className="input-container" key={i}>
              <label htmlFor={e.label}>{e.label}</label>
              <input
                type={e.type}
                name={e.name}
                required={e.required ? true : false}
                id={e.label}
                label={e.label}
                value={window[e.name]}
                onChange={handleChange}
              />
            </div>
          );
        }
      })}
      <p style={{ color: "wheat", marginLeft: "70px", marginRight: "70px" }}>
        {message}
      </p>
      <Link to="/response" style={{ textDecoration: "none" }}>
        <button
          className="viewDataBtn"
          style={message ? { display: "block" } : { display: "none" }}
        >
          Ver mis datos
        </button>
      </Link>
      {document.querySelector("input[type=button]")
        ? (document.querySelector("input[type=button]").onclick = function () {
            document.querySelector("form").submit();
          })
        : null}
    </form>
  );
}
