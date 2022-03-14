import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import edit from "./assest/edit.png";
import deleteBtn from "./assest/delete.png";
import Alert from "./Alert";

function App() {
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const [mail, setMail] = useState("");
  const [show, setShow] = useState(false);

  const avaState = state.find((c) => c.name === selectedCountry);

  const avaCity = avaState?.states?.find((c) => c.name === selectedState);

  // console.log(avaCity);

  const API_URL = "https://countriesnow.space/api/v0.1/countries/flag/images";

  const STATE_URL = "https://countriesnow.space/api/v0.1/countries/states";

  const CITY_URL = "https://countriesnow.space/api/v0.1/countries/state/cities";

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      console.log(response.data.data);
      setCountries(response.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get(STATE_URL).then((response) => {
      console.log(response.data.data);
      setState(response.data.data);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post(CITY_URL, {
          country: selectedCountry,
          state: selectedState.split(" ")[0],
        })
        .then((data) => {
          console.log(data.data.data);
          setCity(data.data.data);
        });
    };

    fetchData();
  }, [selectedCountry, selectedState]);

  const onSubmit = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="circle"></div>
        <div className="circle_two"></div>
        <div className="circle_three"></div>
        <div className="circle_four"></div>
        <div className="circle_five"></div>
        <div className="circle_six"></div>
        <div className="circle_seven"></div>

        <div className="form_wrapper">
          <h2 className="heading">Let’s know you more</h2>
          <p>Fill the appropriate details</p>
          <form className="form" onSubmit={onSubmit}>
            <div className="input_wrapper">
              <input
                type="text"
                className="input_text"
                onChange={(e) => setMail(e.target.value)}
              />
              <label className="label" htmlFor="email">
                Email
              </label>
            </div>

            <div className="input_wrapper">
              <select
                name="country"
                className="input_text"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option></option>
                {countries.map((country) => (
                  <>
                    <option value={country.name} key={country.iso3}>
                      {country.name}
                    </option>
                  </>
                ))}
              </select>
              <label className="label" htmlFor="country">
                Country
              </label>
            </div>

            <div className="input_wrapper">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                name="state"
                className="input_text"
              >
                <option></option>
                {avaState?.states.map((e, key) => {
                  return (
                    <option value={e.name} key={key}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              <label className="label" htmlFor="state">
                State
              </label>
            </div>

            <div className="input_wrapper">
              <select
                name="city"
                className="input_text"
                value={selectedCities}
                onChange={(e) => setSelectedCities(e.target.value)}
              >
                <option></option>
                {city?.map((e, key) => {
                  return (
                    <option value={e} key={key}>
                      {e}
                    </option>
                  );
                })}
              </select>
              <label className="label" htmlFor="city">
                city/town
              </label>
            </div>

            <button type="submit" className="input_text btn">
              Submit
            </button>
          </form>
        </div>

        <div className="contact_list">
          <h2 className="contact_list_heading">Contact list</h2>

          <div className="result">
            <div className="email">
              <h6 className="result_heading">Email</h6>
              <p>{mail}</p>
            </div>
            <div className="country">
              <h6 className="result_heading">Country</h6>
              <p>{selectedCountry}</p>
            </div>
            <div className="state">
              <h6 className="result_heading">State</h6>
              <p>{selectedState}</p>
            </div>
            <div className="city">
              <h6 className="result_heading">City</h6>
              <p>{selectedCities}</p>
            </div>
            <div className="city">
              <h6 className="result_heading"></h6>
              <div className="images">
                <img src={edit} alt="" className="img" />
                <img src={deleteBtn} alt="" className="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {show === true && (
        <div className="cover" onClick={() => setShow(false)}>
          <Alert />
        </div>
      )}
    </div>
  );
}

export default App;
