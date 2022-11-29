import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";

import "./home.scss";

function Home() {
  const [useCaseID, setUseCaseID] = useState(null);
  const [useCaseData, setUseCaseData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const featureFlags = {
    InputsValidation: localStorage.getItem("development_inputsValidation"),
    Conditions: localStorage.getItem("development_conditions"),
    Tags: localStorage.getItem("development_tags"),
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.href.includes("nodeUuid")) {
      navigate(
        `${window.location.pathname}?nodeUuid=${searchParams.get("nodeUuid")}`,
        { replace: true }
      );
    } else {
      navigate(window.location.pathname, { replace: true });
    }
    const useCaseID = window.location.pathname.split("/")[2];
    fetchUseCaseData(useCaseID);
    setUseCaseID(useCaseID);
  }, []);

  const fetchUseCaseData = async (useCaseID) => {
    if (useCaseID) {
      const FETCH_PATH = (useCaseId) => `/services/${useCaseId}`;
      const response = await axios.get(FETCH_PATH(useCaseID));
      setUseCaseData(response.data);
    }
  };

  const handleSelectNodeClick = () => {
    setSearchParams({ nodeUuid: "xxxx-xxxx-xxxx-xxxx" });
  };

  const handleUnselectNodeClick = () => {
    setSearchParams({});
  };

  return (
    <div className="home">
      <h1>Welcome to the React micro-frontend</h1>
      <br />
      <div>
        <span>
          <b>The use case id is:</b> {useCaseID}
        </span>
        <br />
        <br />
        <span>
          <b>Use case data:</b>
        </span>
        <ul>
          {Object.keys(useCaseData).map((key, index) =>
            useCaseData[key] &&
            typeof useCaseData[key] === "object" &&
            Object.keys(useCaseData[key]).length > 1 ? (
              <li key={index} className="li-1">
                {key}:
                <ul>
                  {Object.keys(useCaseData[key]).map((minorKey, minorIndex) => (
                    <li key={minorIndex} className="li-2">
                      {minorKey}: {useCaseData[key][minorKey]}
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={index} className="li-1">
                {key}: {useCaseData[key]}
              </li>
            )
          )}
        </ul>
      </div>
      <br />
      <div>
        <span>
          <b>Feature flags:</b>
        </span>
        <ul>
          {Object.keys(featureFlags).map((key, index) => (
            <li key={index}>
              {key}: {featureFlags[key]}
            </li>
          ))}
        </ul>
      </div>
      <br />
      <div>
        <span>
          <b>Selected node UUID: </b>
          {searchParams.get("nodeUuid")}
        </span>
        <div>
          <b>Should open the drawer?</b>
          {searchParams.get("nodeUuid") ? " Yes" : " No"}
        </div>
      </div>
      <br />
      <br />
      <div>
        <button
          type="button"
          styles={{ marginRight: "15px" }}
          onClick={handleSelectNodeClick}
        >
          Select Node
        </button>
        <button type="button" onClick={handleUnselectNodeClick}>
          Unselect Node
        </button>
      </div>
    </div>
  );
}

export default Home;
