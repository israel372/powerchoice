import { useState } from "react";
import { getBackendStatus } from "./api/api";

function App() {
  const [message, setMessage] = useState("");

  const testBackend = async () => {
    try {
      const data = await getBackendStatus();
      setMessage(data.message);
    } catch (error) {
      setMessage("Cannot connect to backend.");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
        fontFamily: "Arial",
      }}
    >
      <h1>PowerChoice</h1>

      <button onClick={testBackend}>
        Test Backend
      </button>

      <h3>{message}</h3>
    </div>
  );
}

export default App;