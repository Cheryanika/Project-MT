import image from "./Image/rmutl.webp";
function App() {
  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/SigmarAI/mt5-sentence-translator",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  // query({ inputs: "The answer to the universe is" }).then((response) => {
  //   console.log(JSON.stringify(response));
  // });

  return (
    <>
      <div>
        <nav
          className="text-center text-light"
          style={{ backgroundColor: "#3B270C", fontSize: 35 }}
        >
          <br />
          <img src={image} weight={82} height={150} />
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
            id="input"
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
    </>
  );
}

export default App;
