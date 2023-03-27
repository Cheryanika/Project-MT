import React,{useState} from "react";
import image from "./Image/rmutl.webp";
import API_TOKEN from "./apitoken";

function App() {

  //Function Select Language Option
  const[showtext, setShowtext]= useState("ภาษาไทย (Thai)");
  const[showtext1, setShowtext1]= useState("ภาษาอังกฤษ (English)");
  const[showtext2, setShowtext2]= useState("กรุณาใส่บทคัดย่อภาษาไทย");


  const handletext=(e)=>{
    var getvalue = document.getElementById('lange_text').value
    var getlage1 = document.getElementById('lange_text1')
    var getlage2 = document.getElementById('lange_text2')
     
    if(getvalue==='en-th')
     {
      getlage1 = "ภาษาอังกฤษ (English)"
      getlage2 = "ภาษาไทย (Thai)"
      const show = "กรุณาใส่บทคัดย่อภาษาอังกฤษ"
      setShowtext(getlage1);
      setShowtext1(getlage2);
      setShowtext2(show);
     }

     else if(getvalue==='th-en')
     {
      getlage1 = "ภาษาไทย (Thai)"
      getlage2 = "ภาษาอังกฤษ (English)"
      const show = "กรุณาใส่บทคัดย่อภาษาภาษาไทย"
      setShowtext(getlage1);
      setShowtext1(getlage2);
      setShowtext2(show);
     }
  }

    //Function Translate and Collect translate data EN-TH
    function translator() {
      getOption();
      setTimeout(() => {
        createData();
      }, 60000);
    }

  //Function Select Model Option
  function getOption() {
    var option = document.getElementById('select_text').value
    var option2 = document.getElementById('lange_text').value

    if(option === 'MT5' && option2 === 'th-en') {
      translatorMT5_TH_EN()
    }else  if(option === 'MT5' && option2 === 'en-th') {
      translatorMT5_EN_TH()
    } else if(option === 'MBART' && option2 === 'th-en') {
      translatorMBART_TH_EN()
    } else if(option === 'MBART' && option2 === 'en-th') {
      translatorMBART_EN_TH()
    }else if(option === 'Marian' && option2 === 'th-en') {
      translatorMarian_TH_EN()
    } else if(option === 'Marian' && option2 === 'en-th') {
      translatorMarian_EN_TH()
    }
  }

    // Function Call API EN-TH
  function translatorMBART_EN_TH(){
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
  }
  
  function translatorMT5_EN_TH(){
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
  }

  function translatorMarian_EN_TH(){
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
  }

  // Function Call API TH-EN
  function translatorMBART_TH_EN() {
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    var data = sentence.split(" ")

    // // starting model
    // fetch("https://api-inference.huggingface.co/models/SigmarAI/MT5", {
    //   headers: { Authorization: "Bearer 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" },
    //   method: "POST",
    //   body: JSON.stringify(data[0]),
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //   if(!('generated_text' in data[0])){
    //     console.log('in starting model function')
    //     textArea.value = 'loading model...'
    //     setTimeout(console.log('starting model', 60000))
    //     textArea.value = ''
    //   }
    // })
    
    for(var i = 0; i < data.length; i++) {
      textArea.value = textArea.value.slice(0, -20)
      fetch("https://api-inference.huggingface.co/models/SigmarAI/MBART",
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        method: "POST",
        body: JSON.stringify(data[i])
      })
      .then((response) => response.json())
      .then((data) => {
        try {
          if('generated_text' in data[0]){
            console.log(JSON.stringify(data))
            textArea.value += data[0].generated_text
            if(data[0].generated_text.slice(-1) === '.') {
              textArea.value += ' '
            } else if(data[0].generated_text.slice(-1) === ','){
              textArea.value += ' '
            } else {
              textArea.value += '. '
            }
          }
        } catch (error) {
          var timeleft = 30;
          var downloadTimer = setInterval(function(){
            if(timeleft <= 0){
              clearInterval(downloadTimer);
              textArea.value = 'model started please try again...'
              } else {
                textArea.value = 'starting model please try again in... ' + timeleft;
              }
            timeleft -= 1;
          }, 1000);
        }
      });
      if(i !== data.length - 1){
        textArea.value += ' model predicting...'
      }
    }
  }

  function translatorMT5_TH_EN() {
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    var data = sentence.split(" ")

    // translate
    for(var i = 0; i < data.length; i++) {
      textArea.value = textArea.value.slice(0, -20)
      fetch("https://api-inference.huggingface.co/models/SigmarAI/MT5",
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        method: "POST",
        body: JSON.stringify(data[i])
      })
      .then((response) => response.json())
      .then((data) => {
        try {
          if('generated_text' in data[0]){
            console.log(JSON.stringify(data))
            textArea.value += data[0].generated_text
            if(data[0].generated_text.slice(-1) === '.') {
              textArea.value += ' '
            } else if(data[0].generated_text.slice(-1) === ','){
              textArea.value += ' '
            } else {
              textArea.value += '. '
            }
          }
        } catch (error) {
          var timeleft = 60;
          var downloadTimer = setInterval(function(){
            if(timeleft <= 0){
              clearInterval(downloadTimer);
              textArea.value = 'model started please try again...'
              } else {
                textArea.value = 'starting model please try again in... ' + timeleft;
              }
            timeleft -= 1;
          }, 1000);
        }
      });
      if(i !== data.length - 1){
        textArea.value += ' model predicting...'
      }
    }
  }

  function translatorMarian_TH_EN() {
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    var data = sentence.split(" ")

    for(var i = 0; i < data.length; i++) {
      textArea.value = textArea.value.slice(0, -20)
      fetch("https://api-inference.huggingface.co/models/SigmarAI/Marian",
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        method: "POST",
        body: JSON.stringify(data[i])
      })
      .then((response) => response.json())
      .then((data) => {
        try {
          if('generated_text' in data[0]){
            console.log(JSON.stringify(data))
            textArea.value += data[0].generated_text
            if(data[0].generated_text.slice(-1) === '.') {
              textArea.value += ' '
            } else if(data[0].generated_text.slice(-1) === ','){
              textArea.value += ' '
            } else {
              textArea.value += '. '
            }
          }
        } catch (error) {
          var timeleft = 30;
          var downloadTimer = setInterval(function(){
            if(timeleft <= 0){
              clearInterval(downloadTimer);
              textArea.value = 'model started please try again...'
              } else {
                textArea.value = 'starting model please try again in... ' + timeleft;
              }
            timeleft -= 1;
          }, 1000);
        }
      });
      if(i !== data.length - 1){
        textArea.value += ' model predicting...'
      }
    }
  }

  // Function Create Data
  function createData() {
    let url = "http://localhost:8000/create/translator"
    var Machine = document.getElementById("select_text").value;
    var Input = document.getElementById("input_text").value;
    var Output = document.getElementById("result").value;

    fetch(url,{
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        Machine: Machine,
        Input: Input,
        Output: Output,}),
    })
    .then((response) => response.json())       
    }

  return (
    <>
      <div>
        <div style={{ backgroundColor: "#3B270C", maxWidth: 2000,height: 150, fontSize: 26}}>
          <table>
            <tr>
              <th><img src={image} weight={82} height={150} alt={image}></img></th>
              <th className="text-light">แปลภาษาบทคัดย่อภาษาไทย - อังกฤษ<br/>Abstract Translation Thai-English</th><br/><br/>
              <div>
                <select className="form-select position-absolute right-0 end-0 translate-middle" 
                        id="lange_text"
                        onChange={(e)=>handletext(e)}>
                      <option value="th-en">TH-EN</option>
                      <option value="en-th">EN-TH</option>
                  </select>
              </div>
            </tr>
          </table>
        </div>
       
        <div className="container">
          <br />
          <p className="text-dark" style={{ fontSize: 25 }}>
            {" "}
            <label className="form-label" id="lange_text1" >{showtext}</label>
          </p>
          <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{ backgroundColor: "#3B270C", maxWidth: 1300, height: 50 }}
          >
            <div className="container">
              <select id="select_text" 
              className="form-select form-select-sm" 
              aria-label=".form-select-sm">
                <option>กรุณาเลือก Machine Translation Model</option>
                <option value="MT5">MT5 Model</option>
                <option value="MBART">MBART Model</option>
                <option value="Marian">Marian Model</option>
              </select>
            </div>
          </nav>
          <textarea
            id="input_text"
            className="form-control"
            defaultValue={String}
            placeholder={showtext2}
            style={{ maxWidth: 1300, height: 100 }}
          />
        </div>
        <div className="text-center">
          <br />
          <br />
          <button
            type="submit"
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
            <label className="form-label" id="lange_text2" >{showtext1}</label>
          </p>
          <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{ backgroundColor: "#3B270C", maxWidth: 1300, height: 50 }}
          ></nav>
          <textarea
            id="result"
            className="form-control"
            readOnly
            style={{ maxWidth: 1300, height: 100 }}
            defaultValue={String}
          />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#3B270C", height: 102 }}
        />
      </div>
    </>
  );
}

export default App;
