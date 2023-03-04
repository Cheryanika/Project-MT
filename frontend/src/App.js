import React, { useState } from "react";
import image from "./Image/rmutl.webp";

function App() {
  // const[thai, setThai] = useState("");
  // const[eng, setEng] = useState("");
  // const[machine, setMachine] = useState("");

  // const addingdata = async (e) => {
  //   e.preventDefault();

  //   const docData = {
  //     Machine:machine,
  //     Thai:thai,
  //     English:eng
  //   };
  //   let objectDate = new Date();
  //   let day = objectDate.getDate();
  //   let month = objectDate.getMonth();
  //   let year = objectDate.getFullYear();
  //   let full = day.toString() + month.toString() + year.toString() ;

  //   let m = objectDate.getMinutes();
  //   let h = objectDate.getHours();
  //   let sc =objectDate.getSeconds();
  //   let time = h.toString() +m.toString() +sc.toString() ;

  //   await setDoc(doc(database, "Translation", "Date-" + full + "-" + time), docData);
  //   console.log("Document Added")
  // }

  // -------------------------- TASK --------------------------------------------------------------------------------------------

  // Get Function API จาก Backend มา --> ทำ Function HuggingFace เรียกใช้งาน
  // เมื่อ Function HuggingFace ทำงาน แปล translate success -> Will be store in Database -> Show the Output.

  // ----------------------------------------------------------------------------------------------------------------------------

  function translator(e) {
    translatorWord();
  }

  // Function HuggingFace
  function translatorWord() {
    let url = "https://api-inference.huggingface.co/models/SigmarAI/MBART";
    var text = document.getElementById("input_text").value;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ data: [text] }),
    })
      .then((response) => response.json())
      .then((data) => {
        let textArea = document.getElementById("result");
        // parsing the JSON value to string
        textArea.value = JSON.stringify(data);
      });
    // const result = await response.json();
    // return result;
  }

  // --------------------- TIP ----------------
  // ทำ CSS แยก class ก็ดีน่ะ Code จะได้ดู Clean

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
                className="form-select form-select-sm"
                aria-label=".form-select-sm"
                // onChange={(e) => setMachine(e.target.value)}
              >
                <option selected>กรุณาเลือก Machine Translation Model</option>
                <option value={"mt5"}>mt5 model</option>
                <option value={"mBART"}>mBART model</option>
                <option value={"Marian"}>Marian model</option>
              </select>
            </div>
          </nav>
          <textarea
            className="form-control"
            placeholder="กรุณาใส่บทคัดย่อภาษาไทย"
            style={{ maxWidth: 1300 }}
            // onChange={(e) => setThai(e.target.value)}
            defaultValue={""}
          />
        </div>
        <div className="text-center">
          <br />
          <br />
          <button
            type="submit"
            class="get_values"
            className="btn-custom btn-lg"
            // onClick={addingdata}
            
            // Call function translator มาใช้
            onClick="translator()"
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
            readOnly
            style={{ maxWidth: 1300 }}
            // onChange={(e) => setEng(e.target.value)}
            defaultValue={""}
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
