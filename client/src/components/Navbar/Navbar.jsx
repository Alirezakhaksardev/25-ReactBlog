import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();

    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {localStorage.getItem("user_name") ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/">
                    خانه
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/blog"}>
                    ارسال بلاگ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={logout} to={"/loqout"}>
                    خروج
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/">
                    خانه
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    ورود
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/Register"}>
                    ثبت نام
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <NavLink className="navbar-brand" to="/">
          Blog AlirezaKhaksar
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
