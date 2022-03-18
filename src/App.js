import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "./Alert";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import TableBody from "./TableBody";

function App() {
  const getContactList = () => {
    const data = localStorage.getItem("FormData");

    if (data) return JSON.parse(data);
    else return [];
  };

  const [show, setShow] = useState(false);
  const [checkCountry, setCheckCountry] = useState(false);
  const [checkState, setCheckState] = useState(false);
  const [checkCity, setCheckCity] = useState(false);
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCities, setSelectedCities] = useState("");
  const [countryImage, setCountryImage] = useState([]);
  const [mail, setMail] = useState("");
  const [showCountry, setShowCountry] = useState(false);
  const [showState, setShowState] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [contactList, setContactList] = useState(getContactList());

  // setting selected element for country, state, and city
  const avaState = state.find((c) => c.name === selectedCountry);
  const avaCity = avaState?.states?.find((c) => c.name === selectedState);

  //declaring variable for api calls
  const API_URL = "https://countriesnow.space/api/v0.1/countries/flag/images";
  const STATE_URL = "https://countriesnow.space/api/v0.1/countries/states";
  const CITY_URL = "https://countriesnow.space/api/v0.1/countries/state/cities";

  //loading country, state and city as the page loads
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

  //click handle for each select tag
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

  //button click
  const onSubmit = (e) => {
    e.preventDefault();

    if (mail === "" || !mail.includes("@")) {
      setShow(true);
    }
    if (selectedCountry === "") {
      setCheckCountry(true);
    }
    if (selectedState === "") {
      setCheckState(true);
    }
    if (selectedCities === "") {
      setCheckCity(true);
    }

    let data = {
      mail,
      selectedCountry,
      selectedState,
      selectedCities,
    };

    setContactList([...contactList, data]);

    setMail("");
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCities("");
    setCountryImage([]);
  };

  useEffect(() => {
    localStorage.setItem("FormData", JSON.stringify(contactList));
  }, [contactList]);

  console.log(contactList);

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
                placeholder="example@gmail.com"
                value={mail}
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

                <img className="img_flag_div" src={countryImage} alt="" />
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

            <button
              type="submit"
              className={
                mail !== "" ||
                selectedCountry !== "" ||
                selectedState !== "" ||
                selectedCities !== ""
                  ? "input_text btn"
                  : "input_text btn_btn"
              }
disabled={ mail !== "" ||
                selectedCountry !== "" ||
                selectedState !== "" ||
                selectedCities !== "" ? true : false}
            >
              Submit
            </button>
          </form>
        </div>

        {/* contact list */}
        <div className="contact_list">
          <h2 className="contact_list_heading">Contact list</h2>

          <div className="result">
            <table className="table">
              <thead className="table__head">
                <tr className="table_row">
                  <th className="table__row__head">Email</th>
                  <th className="table__row__head">Country</th>
                  <th className="table__row__head">State</th>
                  <th className="table__row__head">City</th>
                  <th className="table__row__head"></th>
                </tr>
              </thead>
              <tbody>
                <TableBody contact={contactList} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {show === true && (
        <div className="cover" onClick={() => setShow(false)}>
          <Alert detail="Enter your mail" />
        </div>
      )}
      {checkCountry === true && (
        <div className="cover" onClick={() => setCheckCountry(false)}>
          <Alert detail="Choose a country to continue" />
        </div>
      )}
      {checkState === true && (
        <div className="cover" onClick={() => setCheckState(false)}>
          <Alert detail="Choose a state to continue" />
        </div>
      )}
      {checkCity === true && (
        <div className="cover" onClick={() => setCheckCity(false)}>
          <Alert detail="Choose a city to continue" />
        </div>
      )}
    </div>
  );
}

export default App;
