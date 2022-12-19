import { useRef, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import customStyle from "./login.module.css";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, password]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/login",
        data: {
          email: user,
          password,
        },
      });
      console.log(response.data.data)
        localStorage.setItem("userId", response.data.data._id);
        localStorage.setItem("userBalance", response.data.data.balance);

      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className={customStyle.form}>
        {success ? (
          <section>
            <Navigate replace to="/" />

            {/* <h1>You are logged in!</h1> */}
          </section>
        ) : (
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <u>
              <h2
                style={{
                  // marginTop: "30px",
                  // marginBottom: "18px",
                  textAlign: "center",
                }}
              >
                Sign In
              </h2>
            </u>

            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Email:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />

              <button>Sign In</button>
            </form>
          </section>
        )}
      </div>
    </>
  );
};

export default Login;
