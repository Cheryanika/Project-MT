import React from "react";
import image from "./Image/rmutl.webp";

function App() {
  // -------------------------- TASK --------------------------------------------------------------------------------------------

  // Get Function API จาก Backend มา --> ทำ Function HuggingFace เรียกใช้งาน
  // เมื่อ Function HuggingFace ทำงาน แปล translate success -> Will be store in Database -> Show the Output.

  // ----------------------------------------------------------------------------------------------------------------------------
  function translator() {
    translatorMBART();
    setTimeout(() => {
      createData();
    }, 60000);
    //createData();
  }

  function translatorMBART() {
    var text = document.getElementById("input_text").value
    var data = text.split(" ")
    fetch("https://api-inference.huggingface.co/models/SigmarAI/MBART",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    )
    .then((response) => response.json())
    .then((data) => {
      let textArea = document.getElementById("result");
      textArea.value = JSON.stringify(data);
    });
  }

  // Function CreateData
  function createData() {
    let url = "http://localhost:8000/create/translator"
    var Machine = document.getElementById("select_text").value;
    var Thai = document.getElementById("input_text").value;
    var English = document.getElementById("result").value;

    fetch(url,{
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        Machine: Machine,
        Thai: Thai,
        English: English,}),
    })
    .then((response) => response.json())       
    }

  return (
    <>
      <div>
        <nav
          className="text-center text-light"
          style={{ backgroundColor: "#3B270C", fontSize: 35 }}
        >
          <br />
          <img src={image} weight={82} height={150} alt={image} />
          <br />
          แปลบทคัดย่อภาษาไทย-อังกฤษ <br />
          Abstract Translation Thai-English
          <br />
          <br />{" "}
        </nav>
        <div className="container">
          <br />
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
                id="select_text"
                className="form-select form-select-sm"
                aria-label=".form-select-sm"
              >
                <option selected>กรุณาเลือก Machine Translation Model</option>
                <option value={"mt5"}>mt5 model</option>
                <option value={"mBART"}>mBART model</option>
                <option value={"Marian"}>Marian model</option>
              </select>
            </div>
          </nav>
          <textarea
            id="input_text"
            className="form-control"
            placeholder="กรุณาใส่บทคัดย่อภาษาไทย"
            style={{ maxWidth: 1300 }}
            defaultValue={String}
          />
        </div>
        <div className="text-center">
          <br />
          <br />
          <button
            type="submit"
            class="get_values"
            className="btn-custom btn-lg"

            // Call function translator มาใช้
            onClick={translator}
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
            id="result"
            className="form-control"
            readOnly
            style={{ maxWidth: 1300 }}
            defaultValue={String}
          />
          <br />
        </div>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#3B270C", height: 80 }}
        />
      </div>
    </>
  );
}

export default App;
