import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [formLoginData, setFormLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState([]);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormLoginData({ ...formLoginData, [name]: value });
  };

  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post("/api/login", formLoginData)
        .then((res) => {
          if (res.data.status === 200) {
            localStorage.setItem("auth_token" , res.data.token)
            localStorage.setItem("user_name" , res.data.username)
            localStorage.setItem("user_id" , res.data.user_id)
            Swal.fire({
              title: "تبریک میگم",
              text: res.data.message,
              icon: "success",
              confirmButtonText: "تایید",
            });
            navigate('/')
          } else if (res.data.status === 401) {
            Swal.fire({
              title: "مشکلی پیش امده",
              text: res.data.message,
              icon: "warning",
              confirmButtonText: "تصحیح",
            });
          } else {
            setError(res.data.validation_errors);
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "ارور",
            text: "مشکلی در سمت سرور به وجود اماده است لطفا بعدا امتحان فرمایید",
            icon: "error",
            confirmButtonText: "تایید",
          });
        });
    });
  };
  const { email, password } = formLoginData;
  return (
    <div className="auth login">
      <div className="container">
        <div className="row align-items-center min-vh-100 auth-res">
          <div className="col-lg-4 col-md-6 bg-dark py-4 rounded">
            <div className="text-center text-white">
              <h2 className="fw-bold mb-5 auth-title">ورود به حساب کاربری</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-3">
                <label htmlFor="" className="text-white mb-2">
                  ایمیل شما
                </label>
                <input type="text" className="form-control mb-2" name="email" value={email} onChange={handelChange} />
                {error && <small className="text-danger">{error.email}</small>}
              </div>

              <div className="form-group mt-3">
                <label htmlFor="" className="text-white mb-2">
                  پسوورد
                </label>
                <input
                  type="password"
                  className="form-control mb-2"
                  name="password"
                  value={password}
                  onChange={handelChange}
                />
                {error && <small className="text-danger">{error.password}</small>}
              </div>
              <div className="form-group mt-4">
                <button type="submit" className="btn btn-success w-100">
                  ورود
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
