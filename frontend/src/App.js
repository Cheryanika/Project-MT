import React,{useState} from "react";
import image from "./Image/rmutl.webp";
import image2 from "./Image/browser.webp";
import image3 from "./Image/book.webp";
import image4 from "./Image/document.webp";
import howtouse from "./Image/howtousewebsite.pdf";

function App() {
  
  //Function Select Language Option
  const[showtext, setShowtext]= useState("ภาษาไทย (Thai)");
  const[showtext1, setShowtext1]= useState("ภาษาอังกฤษ (English)");
  const[showtext2, setShowtext2]= useState("กรุณาใส่บทคัดย่อภาษาไทย");

  const url = "https://5030-35-192-146-164.ngrok-free.app"

  const handletext=(e)=>{
    var getvalue = document.getElementById('lange_text').value
    var getlage1 = document.getElementById('lange_text1')
    var getlage2 = document.getElementById('lange_text2')
    
    var textarea1 = document.getElementById('input_text')
    var textarea2 = document.getElementById('result')
     
    if(getvalue==='en-th')
     {
      getlage1 = "ภาษาอังกฤษ (English)"
      getlage2 = "ภาษาไทย (Thai)"
      const show = "กรุณาใส่บทคัดย่อภาษาอังกฤษ"
      setShowtext(getlage1);
      setShowtext1(getlage2);
      setShowtext2(show);
      textarea1.value = '';
      textarea2.value = '';
     }

     else if(getvalue==='th-en')
     {
      getlage1 = "ภาษาไทย (Thai)"
      getlage2 = "ภาษาอังกฤษ (English)"
      const show = "กรุณาใส่บทคัดย่อภาษาภาษาไทย"
      setShowtext(getlage1);
      setShowtext1(getlage2);
      setShowtext2(show);
      textarea1.value = '';
      textarea2.value = '';
     }
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------//
  //Function Translate and Collect translate data
  function translator() {
    getOption();
    setTimeout(() => {
      createData();
    }, 150000);
  }

  // ---------------------------------------------------------------------------------------------------------------------------//
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
  // ---------------------------------------------------------------------------------------------------------------------------//
  // Function Loading Model spinner
  // show loading
  function displayLoading() {
    const loader = document.getElementById("loading");
    loader.classList.add("display");}
    
  // hidden loading
  function hideLoading() {
    const loader = document.getElementById("loading");
    loader.classList.remove("display");}

  // ---------------------------------------------------------------------------------------------------------------------------//
  // Function Call API EN-TH
  function translatorMBART_EN_TH(){
    displayLoading()
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    let i = 0

    var data = {
      "machine": "mbart",
      "task": "en-th",
      "text": sentence
    }

    async function query(data) {
      const response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const result = await response.json();
      return result;
    }
    
    query(data).then((response) => {
      // console.log(JSON.stringify(response));
      hideLoading()
      for(i = 0; i < response.prediction.length; i++) {
        textArea.value += response.prediction[i] + ' '
      }
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------
  
  function translatorMT5_EN_TH(){
    displayLoading()
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    let i = 0

    var data = {
      "machine": "mt5",
      "task": "en-th",
      "text": sentence
    }

    async function query(data) {
      const response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const result = await response.json();
      return result;
    }
    
    query(data).then((response) => {
      // console.log(JSON.stringify(response));
      hideLoading()
      for(i = 0; i < response.prediction.length; i++) {
        textArea.value += response.prediction[i] + ' '
      }
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------
  
  function translatorMarian_EN_TH(){
    displayLoading()
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    let i = 0

    var data = {
      "machine": "marian",
      "task": "en-th",
      "text": sentence
    }

    async function query(data) {
      const response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const result = await response.json();
      return result;
    }
    
    query(data).then((response) => {
      // console.log(JSON.stringify(response));
      hideLoading()
      for(i = 0; i < response.prediction.length; i++) {
        textArea.value += response.prediction[i] + ' '
      }
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------// 

  // Function Call API TH-EN
  function translatorMBART_TH_EN() {
    displayLoading()
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    let i = 0

    var data = {
      "machine": "mbart",
      "task": "th-en",
      "text": sentence
    }

    async function query(data) {
      const response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const result = await response.json();
      return result;
    }
    
    query(data).then((response) => {
      // console.log(JSON.stringify(response));
      hideLoading()
      for(i = 0; i < response.prediction.length; i++) {
        textArea.value += response.prediction[i] + ' '
      }
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------

  function translatorMT5_TH_EN() {
    displayLoading()
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    let i = 0

    var data = {
      "machine": "mt5",
      "task": "th-en",
      "text": sentence
    }

    async function query(data) {
      const response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const result = await response.json();
      return result;
    }
    
    query(data).then((response) => {
      // console.log(JSON.stringify(response));
      hideLoading()
      for(i = 0; i < response.prediction.length; i++) {
        textArea.value += response.prediction[i] + ' '
      }
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------

  function translatorMarian_TH_EN() {
    displayLoading()
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    let i = 0

    var data = {
      "machine": "marian",
      "task": "th-en",
      "text": sentence
    }

    async function query(data) {
      const response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const result = await response.json();
      return result;
    }
    
    query(data).then((response) => {
      // console.log(JSON.stringify(response));
      hideLoading()
      for(i = 0; i < response.prediction.length; i++) {
        textArea.value += response.prediction[i] + ' '
      }
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------

  // Function Create Data
  function createData() {
    let url = "http://localhost:8000/create/translator"
    var Machine = document.getElementById("select_text").value;
    var Input = document.getElementById("input_text").value;
    var Output = document.getElementById("result").value;
    var Translate = document.getElementById("lange_text").value;

    fetch(url,{
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        Machine: Machine,
        Translate: Translate,
        Input: Input,
        Output: Output,}),
    })
    .then((response) => response.json())       
    }

  // ---------------------------------------------------------------------------------------------------------------------------// 
  return (
    <>
      <div>
        <div style={{ backgroundColor: "#3B270C", maxWidth: 5000,maxheight: 150, fontSize: 26}}>
          <table>
            <tr>
              <th><img src={image} weight={82} height={150} alt={image}></img></th>
              <th className="text-light">แปลภาษาบทคัดย่อภาษาไทย - อังกฤษ<br/>Abstract Translation Thai-English</th><br/><br/>
              <select className="form-select position-absolute right-0 end-0 translate-middle" 
                        id="lange_text"
                        onChange={(e)=>handletext(e)}>
                      <option value="th-en">TH-EN</option>
                      <option value="en-th">EN-TH</option>
              </select>
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
                <option value="MT5">MT5 Model (แนะนำ)</option>
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
            style={{ maxWidth: 1300, height: 130 }}
          />
        </div>
        <div className="text-center">
          <br />
          <br />
          <button
            id="submit"
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
          <div
            style={{ backgroundColor: "#3B270C", maxWidth: 1300, height: 50 }}>
              <br /><br /><br /><br />
              
          <table className="container">
            <tr>
                <th>
                    <div id="loading">
                        <div className="spinner"></div>
                        <span className="text-dark"style={{ fontSize: 20 }}>
                              &nbsp;&nbsp;Loading Model&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.</span>
                    </div>
                </th>
            </tr>
          </table>
          </div>

          <textarea
            id="result"
            className="form-control"
            readOnly
            style={{ maxWidth: 1300, height: 130 }}
            defaultValue={String}>
          </textarea>
          <br />
        </div>
        <br/>

        <table className="container credit">

        <tr>
        <th className="credit_pad"><img src={image2} alt={image2}></img></th>
        <th className="credit_pad"><img src={image3} alt={image3}></img></th>
        <th className="credit_pad"><img src={image4} alt={image4}></img></th>
        </tr>

        <tr>
          <th className="credit_pad" style={{fontSize: 18}}> เกี่ยวกับเว็บไซต์ </th>
          <th className="credit_pad" style={{fontSize: 18}}> วิธีใช้งานและคำแนะนำ </th>
          <th className="credit_pad" style={{fontSize: 18}}> รายละเอียดของโครงงาน </th>
        </tr>

        <tr>
          <th className="credit-text-1" style={{fontSize: 15 }}>
              ระบบแปลภาษาสำหรับบทคัดย่อบทความทางวิชาการภาษาไทย-อังกฤษด้วยแบบจำลอง Deep Neural Machine Translation 
              ฝึกด้วยชุดข้อมูลบทคัดย่อภาษาไทย-อังกฤษซึ่งรวบรวมมาจากวารสารทางวิศวกรรมที่ตีพิมพ์บน<a href="https://www.tci-thaijo.org/" >&nbsp;ThaiJO&nbsp;</a>
              จำนวน 1,125 บทความในขณะนี้รองรับ 3 แบบจำลองได้แก่<a href="https://arxiv.org/abs/2010.11934"> MT5, </a>
              <a href="https://arxiv.org/abs/2001.08210"> MBART, </a>
              <a href="https://arxiv.org/abs/1804.00344">Marian </a>
              <br/><br/><br/><br/>
            </th>

            <th className="credit-text-2" style={{fontSize: 15 }}><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. กรอกบทคัดย่อในกล่องข้อความจากนั้นเลือกภาษาที่จะแปล<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;โดยมีให้เลือกระหว่าง TH-EN และ EN-TH และเลือก Machine 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Translation และกดแปลภาษา<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. ในการแปลครั้งแรกจะต้องรอประมาณ 5 - 10 นาที<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. บทคัดย่อควรมียาวประมาณไม่เกิน 10 ประโยค<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. หากพบข้อผิดพลาดใดๆสามารถแจ้งปัญหาได้ทาง<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://forms.gle/iEXJGkvbuBxQgFUA6">Google Form </a> นี้

              <br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<button className="btn-custom btn-sm">
                <a className="a-2" href={howtouse} download={"HowToUseWebsite"}>คู่มือการใช้งาน</a>
              </button>
              <br/>
            </th>

            <th className="credit-text-1" style={{fontSize: 15 }}>
           ระบบนี้เป็นส่วนหนึ่งของปริญญานิพนธ์สาขาวิศวกรรมคอมพิวเตอร์&nbsp;คณะวิศวกรรมศาสตร์มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา 
          เชียงใหม่ 
            จัดทำโดย นายนครินทร์ คมลาย และนางสาวเฌอญานิกา วงค์ตาแก้ว
            ซึ่งพัฒนาโดยใช้ Google Colab Pro ในการฝึกแบบจำลองใช้ <a href="https://wandb.ai/home">Weights & Bias</a>&nbsp;ในการติดตามผลการฝึกแบบจำลอง
            <a href="https://huggingface.co/docs/transformers/index"> Huggingface </a> 
            ในการอัพโหลดแบบจำลองและเรียกใช้งานผ่าน&nbsp;Inference&nbsp;API&nbsp;และใช้ระบบ&nbsp;Host&nbsp;และฐานข้อมูล&nbsp;Database&nbsp;โดย  
            <a href="https://firebase.google.com/">&nbsp;Firebase</a>&nbsp;  
            ผู้ที่สนใจสามารถดู Code ของโครงงานได้ที่
            <a href="https://github.com/defyMiy/NMT-Project"> Github</a>
            <br/><br/>
            </th>

        </tr>

        </table>
        <br/>

        <footer
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#3B270C", maxWidth: 5000, height: 50 }}>
        </footer>
      </div>
    </>
  );
}

export default App;
