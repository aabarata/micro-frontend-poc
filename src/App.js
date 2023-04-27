import {useEffect, useState} from "react";

function App({eventType = "coucou", baseData}) {
  const [filters, setFilters] = useState(baseData);
  const listener = (event) => {
    setFilters(event.detail.filters);
  }
  useEffect(() => {
    document.addEventListener(eventType, listener);
    return () => {
      document.removeEventListener(eventType, listener);
    }
  }, []);

  return (
    <div className="app">
      {JSON.stringify(filters)}
    </div>
  );
}

export default App;
