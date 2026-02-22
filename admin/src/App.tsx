import { useState } from "react";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) return <Login onLogin={()=>setLoggedIn(true)} />;

  return <Dashboard />;
}

export default App;