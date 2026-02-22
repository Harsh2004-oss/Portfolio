import React, { useState } from "react";
import { api } from "../api";

interface Props { onLogin: () => void }

const Login: React.FC<Props> = ({onLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const res = await api.post("/admin/login", formData);
      if (res.data.success) onLogin();
    } catch (err) {
      alert("Wrong credentials");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;