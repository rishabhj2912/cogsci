import { useState, useEffect } from "react";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("SLE Project");
  }, []);

  return <div style={{ textAlign: "center" }}>Website {name}</div>;
};

export default Home;
