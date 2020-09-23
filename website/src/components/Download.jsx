import React        from "react";
import headerLens   from '../images/header-lens.png';

export default function Download() {
  return (
    <div id="download" className="basic-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-xl-5">
            <div className="text-container">
              <h2>
                Download <span className="blue">K8 Proxy Desktop</span>
              </h2>
              <p className="p-large">
              k8-proxy-desktop is a desktop based applications that provides a single entry point to all K8 projects.
               Build with Electron , react, it is aimed at providing a single window integration with GW git resources,
                file-drop, forensic-workbench, jupyter notebooks, and K8-* services. It is a standalone application for MacOS,
                Windows and Linux operating systems. K8 Proxy Desktop is open source. Download it today!
              </p>
              <a
                className = "btn-solid-lg"
                href      ="https://github.com/rajmbcoderx/k8-electron-react/suites/1234020498/artifacts/18606424">
                <i  className="fas fa-download">
                </i> Download
              </a>

              <a  href ="https://github.com/rajmbcoderx/k8-electron-react/suites/1234020498/artifacts/18606424">
                    <i className  ="supported-os-icon fab fa-apple"></i>
              </a>
              <a  href ="https://github.com/rajmbcoderx/k8-electron-react/suites/1234020498/artifacts/18606425">
                    <i className ="supported-os-icon fab fa-windows"> </i>
               </a>
               <a  href ="https://github.com/rajmbcoderx/k8-electron-react/suites/1234020498/artifacts/18606426" >
                    <i className ="supported-os-icon fab fa-linux"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-xl-7">
            <div className="image-container">
              <img
                className = "img-fluid"
                src       = {headerLens}
                alt       = "alternative"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
