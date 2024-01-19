import React from "react";
import "./auth.css";
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const [formRegisterData, setFormRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error , setError] = useState([])

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormRegisterData({ ...formRegisterData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/register", formRegisterData)
      .then((res) => {
        if(res.data.status == 200){
          Swal.fire({
            title: 'عملیات ثبت نام',
            text: res.data.message,
            icon: 'success',
            confirmButtonText: 'عالی'
          });
          setError([])
          setFormRegisterData({name:'',email:'',password:''})
          navigate('/login')
        }else{
          setError(res.data.validation_errors);
        }
      })
      .catch((err) => {
        Swal.fire({
          title: 'ارور',
          text: "مشکلی در سمت سرور به وجود اماده است لطفا بعدا امتحان فرمایید",
          icon: 'error',
          confirmButtonText: 'عالی'
        })
      });
  };

  const { name, email, password } = formRegisterData;
  return (
    <div className="auth register">
      <div className="container">
        <div className="row align-items-center min-vh-100 auth-res">
          <div className="col-lg-4 col-md-6 bg-dark py-4 rounded">
            <div className="text-center text-white">
              <h2 className="fw-bold mb-5 auth-title">ثبت نام کنید</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-3">
                <label htmlFor="" className="text-white mb-2">
                  نام شما
                </label>
                <input type="text" className="form-control mb-2" name="name" value={name} onChange={handelChange} />
                {
                  error && <small className="text-danger">{error.name}</small>
                }
              </div>
              <div className="form-group mt-3">
                <label htmlFor="" className="text-white mb-2">
                  ایمیل
                </label>
                <input type="text" className="form-control mb-2" name="email" value={email} onChange={handelChange} />
                {
                  error && <small className="text-danger mt-2">{error.email}</small>
                }
              </div>
              <div className="form-group mt-3">
                <label htmlFor="" className="text-white mb-2">
                  پسوورد
                </label>
                <input type="passwoed" className="form-control mb-2" name="password" value={password} onChange={handelChange} />
                {
                  error && <small className="text-danger">{error.password}</small>
                }
              </div>
              <div className="form-group mt-4">
                <button type="submit" className="btn btn-success w-100">
                  ثبت نام
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
