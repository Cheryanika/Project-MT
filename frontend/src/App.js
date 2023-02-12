import React from "react";

function App() {
  return (
    <div>
      <div className="text-center" style={{ backgroundColor: "#3B270C" }}>
        <br />
        <img src="/frontend/src/Image/rmutl.webp" weight={82} height={150} />
        <p className="text-light" style={{ fontSize: 35 }}>
          แปลบทคัดย่อภาษาไทย-อังกฤษ <br />
          Abstract Translation Thai-English{" "}
        </p>
      </div>
      <div className="container">
        <p className="text-dark" style={{ fontSize: 25 }}>
          {" "}
          ภาษาไทย (Thai)
        </p>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#3B270C", maxWidth: 1300, height: 50 }}
        >
          <div className="container">
            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm"
            >
              <option selected>กรุณาเลือก Machine Translation Model</option>
              <option value={1}>mt5 model</option>
              <option value={2}>mBART model</option>
              <option value={3}>Marian model</option>
            </select>
          </div>
        </nav>
        <textarea
          className="form-control"
          type="text"
          placeholder="กรุณาใส่บทคัดย่อภาษาไทย"
          style={{ maxWidth: 1300 }}
          defaultValue={""}
        />
      </div>
      <div className="text-center">
        <br />
        <br />
        <button
          type="button"
          className="btn-custom btn-lg"
          style={{ maxWidth: 200, height: 50 }}
        >
          แปลภาษา
        </button>
      </div>
      <div className="container">
        <br />
        <p className="text-dark" style={{ fontSize: 25 }}>
          {" "}
          ภาษาอังกฤษ (English)
        </p>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#3B270C", maxWidth: 1300, height: 50 }}
        ></nav>
        <textarea
          className="form-control"
          type="text"
          readOnly
          style={{ maxWidth: 1300 }}
          defaultValue={""}
        />
        <br />
      </div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#3B270C", height: 80 }}
      />
    </div>
  );
}

export default App;
