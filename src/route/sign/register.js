import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { t } from "locales";
import { post } from "library/request";
import Input from "component/input";
import { validateEmail } from "library/helper";
import _ from "lodash";

const Register = () => {
  const history = useHistory();
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState("");

  const validate = () => {
    const inputs = { name, email, password };
    const temp = {};
    if (name.length < 5) {
      temp["name"] = "validation.min";
    }
    if (!validateEmail(email)) {
      temp["email"] = "validation.email";
    }
    if (password.length < 5) {
      temp["password"] = "validation.min";
    }
    for (let i in inputs) {
      if (inputs[i] == "") temp[i] = "validation.empty";
    }
    const res = _.isEmpty(temp) ? null : temp;
    setError(res);
    return res;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      post("auth", { name, email, password, referral }).then((data) => {
        if (data.success) {
          history.push("/activate");
        } else if (data.error) {
          const temp = {};
          for (let i in data.error) {
            temp[i] = [i, data.error[i][0]];
          }
          setError(temp);
        }
      });
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light  py-5 px-4 px-sm-5">
              <div className="brand-logo text-center">
                <img src={require("assets/images/logo.svg")} alt="logo" />
              </div>
              <h4>{t("signUp")}</h4>
              <form className="pt-3" autoComplete="off" onSubmit={onSubmit}>
                <Input
                  placeholder={"name"}
                  value={name}
                  onChange={setName}
                  error={error?.name}
                />
                <Input
                  placeholder={"email"}
                  value={email}
                  onChange={setEmail}
                  error={error?.email}
                />
                <Input
                  type="password"
                  placeholder={"password"}
                  value={password}
                  onChange={setPassword}
                  error={error?.password}
                />
                <Input
                  placeholder={"referral"}
                  value={referral}
                  onChange={setReferral}
                />
                <div className="mt-3">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                    {t("signUp")}
                  </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  {t("haveAccount")}{" "}
                  <Link to="/login" className="text-primary">
                    {t("login")}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
