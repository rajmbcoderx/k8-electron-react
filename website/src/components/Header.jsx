import React          from "react";
import headerLens     from '../images/header-lens.png';

export default function Loader() {
  return (
    <header id="header" className="header">
      <div className="header-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-container">
                <h1>
                  K8 Proxy Desktop Application <br />
                  FOR{" "}
                  <span id="js-rotating">
                    GIT BROWSER, FILE DROP, K8 PODS DASHBOARD, SLACK UI FOR BOTS, FORENSIC WORKBENCH
                  </span>
                </h1>
                <p className="p-large">
                 k8-proxy-desktop is a desktop based applications that provides a single entry point to all K8 projects It's open source. Download it
                  today!
                </p>
                <a
                    className = "btn-solid-lg"
                    href      ="https://github.com/rajmbcoderx/k8-electron-react/suites/1235384736/artifacts/18639102">
                  <i  className="fas fa-download"></i> 
                  Download
                </a>

                <a  href ="https://github.com/rajmbcoderx/k8-electron-react/suites/1235384736/artifacts/18639102">
                      <i className  ="supported-os-icon fab fa-apple"></i>
                </a>

                <a  href ="https://github.com/rajmbcoderx/k8-electron-react/suites/1235384736/artifacts/18639103">
                      <i className ="supported-os-icon fab fa-windows"> </i>
                </a>
                <a  href ="https://github.com/rajmbcoderx/k8-electron-react/suites/1235384736/artifacts/18639104" >
                      <i className ="supported-os-icon fab fa-linux"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="image-container">
                <img
                  className ="img-fluid"
                  src       ={headerLens}
                  alt       ="alternative"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
