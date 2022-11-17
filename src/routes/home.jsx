import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function Home() {
  const routerParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const featureFlags = {
    InputsValidation: localStorage.getItem("development_inputsValidation"),
    Conditions: localStorage.getItem("development_conditions"),
    Tags: localStorage.getItem("development_tags"),
  };

  useEffect(() => {
    //FETCH THE USE CASE DATA
    console.log(routerParams.uuid);
  }, [routerParams.uuid]);

  useEffect(() => {
    //FETCH THE NODE DATA
    console.log(searchParams.get("nodeUUID"));
  }, [searchParams]);

  const handleSelectNodeClick = () => {
    setSearchParams({ nodeUUID: "xxxx-xxxx-xxxx-xxxx" });
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
          <b>The use case id is:</b> {routerParams.uuid}
        </span>
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
          {searchParams.get("nodeUUID")}
        </span>
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
