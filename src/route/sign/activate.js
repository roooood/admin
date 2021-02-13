import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { t } from "locales";
import { post } from "library/request";
import _ from "lodash";
import OtpInput from "component/otp-input";
import { numEn } from "library/helper";

const Activate = () => {
  const history = useHistory();
  const [error, setError] = useState({});
  const [code, setCode] = useState("");

  const validate = () => {
    const inputs = { code };
    const temp = {};
    if (code.length < 6) {
      temp["code"] = "validation.min";
    }
    const res = _.isEmpty(temp) ? null : temp;
    setError(res);
    return res;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      post("activate", { email: "-", code }).then((data) => {
        if (data.success) {
          history.push("/");
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
              <h4>{t("code")}</h4>
              <form className="pt-3" autoComplete="off" onSubmit={onSubmit}>
                <div className="mt-5 mb-5 dir-ltr align-content-center">
                  <OtpInput
                    value={code}
                    onChange={(val) => setCode(numEn(val))}
                    numInputs={6}
                    isInputNum={true}
                    inputStyle={"form-control"}
                    containerStyle={"justify-content-center"}
                    separator={<span>-</span>}
                  />
                </div>
                <div className="mt-5">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                    {t("activate")}
                  </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  {t("activateNotSended")}{" "}
                  <a className="text-primary">{t("reSend")}</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activate;
