import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import edit from "./assest/edit.png";
import deleteBtn from "./assest/delete.png";
import Alert from "./Alert";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function App() {
  const [show, setShow] = useState(false);
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const [countryImage, setCountryImage] = useState([]);

  const [mail, setMail] = useState("");

  const [showCountry, setShowCountry] = useState(false);
  const [showState, setShowState] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    country: "",
    state: "",
    city: "",
  });

  const { email, country, state: countryState, city: Statecity } = formData;

  const avaState = state.find((c) => c.name === selectedCountry);

  const avaCity = avaState?.states?.find((c) => c.name === selectedState);

  const API_URL = "https://countriesnow.space/api/v0.1/countries/flag/images";

  const STATE_URL = "https://countriesnow.space/api/v0.1/countries/states";

  const CITY_URL = "https://countriesnow.space/api/v0.1/countries/state/cities";

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setCountries(response.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get(STATE_URL).then((response) => {
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
          setCity(data.data.data);
        });
    };

    fetchData();
  }, [selectedCountry, selectedState]);

  // useEffect(() => {

  // });

  const handleClick = () => {
    if (!showCountry) setShowCountry(true);
    else setShowCountry(false);
  };

  const handleState = () => {
    if (!showState) setShowState(true);
    else setShowState(false);
  };

  const handleCity = () => {
    if (!showCity) setShowCity(true);
    else setShowCity(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormData({
      email: mail,
      country: selectedCountry,
      countryState: selectedState,
      Statecity: selectedCities,
    });

    if (email === "" || selectedCountry === "") {
      setShow(true);
    } else {
      localStorage.setItem("FormData", JSON.stringify(formData));
    }
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
          <p className="sub__heading">Fill the appropriate details</p>
          <form className="form" onSubmit={onSubmit}>
            <div className="input_wrapper">
              <input
                type="text"
                className="input_text"
                onChange={(e) => setMail(e.target.value)}
                contentEditable
              />
              <label className="label" htmlFor="email">
                Email
              </label>
            </div>

            {/* Country select  */}
            <div
              value={selectedCountry}
              onChange={(e) => e.target.value}
              className="input_wrapper"
              onClick={handleClick}
            >
              <div
                name="country"
                className="input_text select__input"
                contentEditable
              >
                {showCountry === true && (
                  <div className="list__wrapper" contentEditable="false">
                    {countries.map((country, key) => (
                      <>
                        <div
                          className="list__items"
                          value={selectedCountry}
                          key={key}
                          onClick={(e) => {
                            e.preventDefault();
                            setCountryImage(country.flag);
                            setSelectedCountry(country.name);
                          }}
                        >
                          <img className="img_flag" src={country.flag} alt="" />
                          {country.name}
                        </div>
                      </>
                    ))}
                  </div>
                )}
                {showCountry === true ? (
                  <FaAngleUp className="angle__down" />
                ) : (
                  <FaAngleDown className="angle__down" />
                )}

                <img className="img_flag_div" src={countryImage} />
              </div>
              <label className="label" htmlFor="country">
                Country
              </label>
            </div>

            {/* State select */}

            <div className="input_wrapper " onClick={handleState}>
              <div
                contentEditable
                name="state"
                className="input_text select__input"
              >
                {showState && (
                  <div className="list__wrapper" contentEditable="false">
                    {avaState?.states.map((e, key) => (
                      <>
                        <div
                          className="list__items"
                          value={e.name}
                          key={key}
                          onClick={() => {
                            setSelectedState(e.name);
                          }}
                        >
                          {e.name}
                        </div>
                      </>
                    ))}
                  </div>
                )}
              </div>
              <label className="label" htmlFor="state">
                State
              </label>
              {showState === true ? (
                <FaAngleUp className="angle__down" />
              ) : (
                <FaAngleDown className="angle__down" />
              )}

              <p className="state_name">{selectedState}</p>
            </div>

            {/* Select cities */}

            <div className="input_wrapper" onClick={handleCity}>
              <div
                name="city"
                className="input_text select__input"
                contentEditable
              >
                {showCity === true && (
                  <div className="list__wrapper" contentEditable="false">
                    {city?.map((e, key) => (
                      <div
                        className="list__items"
                        value={e}
                        key={key}
                        onClick={() => setSelectedCities(e)}
                      >
                        {e}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <label className="label" htmlFor="city">
                city/town
              </label>

              {showCity === true ? (
                <FaAngleUp className="angle__down" />
              ) : (
                <FaAngleDown className="angle__down" />
              )}

              <p className="state_name">{selectedCities}</p>
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
              {selectedCities !== "" &&
                selectedCountry !== "" &&
                selectedState !== "" &&
                mail !== "" && (
                  <div className="images">
                    <img src={edit} alt="" className="img" />
                    <img src={deleteBtn} alt="" className="img" />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      {show === true && email === "" && (
        <div className="cover" onClick={() => setShow(false)}>
          <Alert detail="Enter your mail" />
        </div>
      )}
      {/* {show === true && country === "" && (
        <div className="cover" onClick={() => setShow(false)}>
          <Alert detail="Choose a country to continue" />
        </div>
      )} */}
    </div>
  );
}

export default App;
