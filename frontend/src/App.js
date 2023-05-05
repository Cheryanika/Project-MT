import React,{useState} from "react";
import image from "./Image/rmutl.webp";
import howtouse from "./Image/howtousewebsite.pdf";
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
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    
    var data = sentence.split('. ')
    
    // let str = sentence,
    // strArray = str.split(/[,.]/),
    // spliterArray = str.match(/[,.]/g),
    // data = [];

    // for (let [key, val] of strArray.entries()) {
    //   let splitVal = spliterArray[key] ? spliterArray[key] : "";
    //   data.push(val.trim() + splitVal);
    // }

    let promises = []; 
    let i = 0
    
    const fn = async() => {
      while(i < data.length) {
        if(data[i].slice(-1) !== '.'){
          data[i] = data[i] + '.'
        }
        promises.push(
          fetch("https://api-inference.huggingface.co/models/SigmarAI/MBART", {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data[i])
          }).then(response => response.json())
        )
        i++
      }
      if(!JSON.stringify(data).match('error')){
        await Promise.all(promises).then(data => {
          console.log(JSON.stringify(data));
          hideLoading()
          textArea.value = ''
          for(i = 0; i < data.length; i++) {
            textArea.value += data[i][0].generated_text + ' '
          }
        })
      } else {
        setTimeout(() => {
          hideLoading()
          document.getElementById("submit").click();
        }, 10000);
      }
    }
    
    // catch model starting
    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/SigmarAI/MBART",
        {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    }

    displayLoading()
    query('test').then((response) => {
      let sample_text = JSON.stringify(response)
      if(sample_text.match('error')){
        setTimeout(() => {
          hideLoading()
          document.getElementById("submit").click();
        }, 10000);
      } else {
        fn()
      }
    });

  }
  // ---------------------------------------------------------------------------------------------------------------------------
  
  function translatorMT5_EN_TH(){
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''

    var data = sentence.split('. ')

    // let str = sentence,
    // strArray = str.split(/[,.]/),
    // spliterArray = str.match(/[,.]/g),
    // data = [];

    // for (let [key, val] of strArray.entries()) {
    //   let splitVal = spliterArray[key] ? spliterArray[key] : "";
    //   data.push(val.trim() + splitVal);
    // }

    let promises = []; 
    let i = 0
    
    const fn = async() => {
      while(i < data.length) {
        if(data[i].slice(-1) !== '.'){
          data[i] = data[i] + '.'
        }
        promises.push(
          fetch("https://api-inference.huggingface.co/models/SigmarAI/MT5", {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data[i])
          }).then(response => response.json())
        )
        i++
      }
      if(!JSON.stringify(data).match('error')){
        await Promise.all(promises).then(data => {
          console.log(JSON.stringify(data));
          hideLoading()
          textArea.value = ''
          for(i = 0; i < data.length; i++) {
            textArea.value += data[i][0].generated_text + ' '
          }
        })
      } else {
        setTimeout(() => {
          hideLoading()
          document.getElementById("submit").click();
        }, 10000);
      }
    }
    
    // catch model starting
    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/SigmarAI/MT5",
        {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    }

    displayLoading()
    query('test').then((response) => {
      let sample_text = JSON.stringify(response)
      if(sample_text.match('error')){
        setTimeout(() => {
          hideLoading()
          document.getElementById("submit").click();
        }, 10000);
      } else {
        fn()
      }
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------
  
  function translatorMarian_EN_TH(){
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''

    var data = sentence.split('. ')

    // let str = sentence,
    // strArray = str.split(/[,.]/),
    // spliterArray = str.match(/[,.]/g),
    // data = [];

    // for (let [key, val] of strArray.entries()) {
    //   let splitVal = spliterArray[key] ? spliterArray[key] : "";
    //   data.push(val.trim() + splitVal);
    // }

    let promises = []; 
    let i = 0
    
    const fn = async() => {
      while(i < data.length) {
        if(data[i].slice(-1) !== '.'){
          data[i] = data[i] + '.'
        }
        promises.push(
          fetch("https://api-inference.huggingface.co/models/SigmarAI/Marian", {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data[i])
          }).then(response => response.json())
        )
        i++
      }
      if(!JSON.stringify(data).match('error')){
        await Promise.all(promises).then(data => {
          console.log(JSON.stringify(data));
          hideLoading()
          textArea.value = ''
          for(i = 0; i < data.length; i++) {
            textArea.value += data[i][0].generated_text.replaceAll('▁', '') + ' '
          }
        })
      } else {
        setTimeout(() => {
          hideLoading()
          document.getElementById("submit").click();
        }, 10000);
      }
    }
    
    // catch model starting
    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/SigmarAI/Marian",
        {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    }

    displayLoading()
    query('test').then((response) => {
      let sample_text = JSON.stringify(response)
      if(sample_text.match('error')){
        setTimeout(() => {
          hideLoading()
          document.getElementById("submit").click();
        }, 10000);
      } else {
        fn()
      }
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------// 

  // Function Call API TH-EN
  function translatorMBART_TH_EN() {
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    var data = sentence.split(" ")
    
    let promises = []; 
    let i = 0
    
    const fn = async() => {
      while(i < data.length) {
        promises.push(
          fetch("https://api-inference.huggingface.co/models/SigmarAI/MBART", {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data[i])
          }).then(response => response.json())
        )
        i++
      }
      if(!JSON.stringify(data).match('error')){
        await Promise.all(promises).then(data => {
          console.log(JSON.stringify(data));
          hideLoading()
          textArea.value = ''
          for(i = 0; i < data.length; i++) {
            textArea.value += data[i][0].generated_text
            if(data[i][0].generated_text.slice(-1) === '.') {
              textArea.value += ' '
            } else if(data[i][0].generated_text.slice(-1) === ','){
              textArea.value += ' '
            } else {
              textArea.value += '. '
            }
          }
        })
      } else {
        setTimeout(() => {
          hideLoading()
          document.getElementById("submit").click();
        }, 10000);
      }
    }
    
    // catch model starting
    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/SigmarAI/MBART",
        {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    }
    displayLoading()
    query('สวัสดี').then((response) => {
      let sample_text = JSON.stringify(response)
      if(sample_text.match('error')){
        setTimeout(() => {
          hideLoading()
          document.getElementById("submit").click();
        }, 10000);
      } else {
        fn()
      }
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------

  function translatorMT5_TH_EN() {
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    var data = sentence.split(" ")

    let promises = []; 
    let i = 0
    
    const fn = async() => {
      while(i < data.length) {
        promises.push(
          fetch("https://api-inference.huggingface.co/models/SigmarAI/MBART", {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data[i])
          }).then(response => response.json())
        )
        i++
      }
      if(!JSON.stringify(data).match('error')){
        await Promise.all(promises).then(data => {
          console.log(JSON.stringify(data));
          hideLoading()
          textArea.value = ''
          for(i = 0; i < data.length; i++) {
            textArea.value += data[i][0].generated_text
            if(data[i][0].generated_text.slice(-1) === '.') {
              textArea.value += ' '
            } else if(data[i][0].generated_text.slice(-1) === ','){
              textArea.value += ' '
            } else {
              textArea.value += '. '
            }
          }
        })
      } else {
        setTimeout(() => {
          hideLoading()
          document.getElementById("submit").click();
        }, 10000);
      }
    }
    
    // catch model starting
    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/SigmarAI/MBART",
        {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    }
    displayLoading()
    query('สวัสดี').then((response) => {
      let sample_text = JSON.stringify(response)
      if(sample_text.match('error')){
        setTimeout(() => {
          hideLoading()
          document.getElementById("submit").click();
        }, 10000);
      } else {
        fn()
      }
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------

  function translatorMarian_TH_EN() {
    var sentence = document.getElementById("input_text").value
    var textArea = document.getElementById("result");
    textArea.value = ''
    var data = sentence.split(" ")

    let promises = []; 
    let i = 0
    
    const fn = async() => {
      while(i < data.length) {
        promises.push(
          fetch("https://api-inference.huggingface.co/models/SigmarAI/MBART", {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data[i])
          }).then(response => response.json())
        )
        i++
      }
      if(!JSON.stringify(data).match('error')){
        await Promise.all(promises).then(data => {
          console.log(JSON.stringify(data));
          hideLoading()
          textArea.value = ''
          for(i = 0; i < data.length; i++) {
            textArea.value += data[i][0].generated_text.replaceAll('▁', '')
            if(data[i][0].generated_text.slice(-1) === '.') {
              textArea.value += ' '
            } else if(data[i][0].generated_text.slice(-1) === ','){
              textArea.value += ' '
            } else {
              textArea.value += '. '
            }
          }
        })
      } else {
        setTimeout(() => {
          hideLoading()
          document.getElementById("submit").click();
        }, 10000);
      }
    }
    
    // catch model starting
    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/SigmarAI/MBART",
        {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    }
    displayLoading()
    query('สวัสดี').then((response) => {
      let sample_text = JSON.stringify(response)
      if(sample_text.match('error')){
        setTimeout(() => {
          hideLoading()
          document.getElementById("submit").click();
        }, 10000);
      } else {
        fn()
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
        <div style={{ backgroundColor: "#3B270C", maxWidth: 5000,height: 150, fontSize: 26}}>
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
          <th className="credit_pad" style={{fontSize: 18}}> About </th>
          <th className="credit_pad" style={{fontSize: 18}}> วิธีใช้งานและคำแนะนำ </th>
          <th className="credit_pad" style={{fontSize: 18}}> รายละเอียด </th>
        </tr>

        <tr>
          <th className="credit-text-1" style={{fontSize: 14 }}>
              ระบบแปลภาษาสำหรับบทคัดย่อบทความทางวิชาการภาษาไทย-อังกฤษ
              <br/>ด้วยแบบจำลอง Deep Neural Machine Translation 
              <br/>ฝึกด้วยชุดข้อมูลบทคัดย่อภาษาไทย-อังกฤษ
              <br/>ซึ่งรวบรวมมาจากวารสารทางวิศวกรรมที่ตีพิมพ์บน&nbsp;<a href="https://www.tci-thaijo.org/" >ThaiJO</a>
              <br/>จำนวน 1,125 บทความ ในขณะนี้รองรับ 3 แบบจำลองได้แก่&nbsp;
              <a href="https://arxiv.org/abs/2010.11934">MT5,&nbsp;</a>
              <a href="https://arxiv.org/abs/2001.08210">MBART,&nbsp;</a>
              <a href="https://arxiv.org/abs/1804.00344">Marian&nbsp;</a>
              <br/><br/><br/><br/>
            </th>

            <th className="credit-text-2" style={{fontSize: 14 }}><br/>
              1. กรอกบทคัดย่อในกล่องข้อความจากนั้นเลือกภาษาที่จะแปลโดยมีให้เลือก
              <br/>&nbsp;&nbsp;&nbsp;&nbsp;ระหว่าง TH-EN และ EN-TH และเลือก Machine Translation และกดแปล
              <br/>&nbsp;&nbsp;&nbsp;&nbsp;ภาษา<br/>
              2. ในการแปลครั้งแรกจะต้องรอประมาณ 5 - 10 นาที<br/>
              3. บทคัดย่อควรมียาวประมาณไม่เกิน 10 ประโยค<br/>
              4. หากพบข้อผิดพลาดใดๆ สามารถแจ้งปัญหาได้ทาง
              <a href="https://docs.google.com/forms/u/0/"> Google&nbsp;Form</a>&nbsp;นี้
              <br/><br/>
              <button className="btn-custom btn-sm">
                <a className="a-2" href={howtouse} download={"HowToUseWebsite"}>คู่มือการใช้งานแบบละเอียด</a>
              </button>
              <br/><br/>
            </th>

            <th className="credit-text-1" style={{fontSize: 14 }}>
            ระบบนี้เป็นส่วนหนึ่งของปริญญานิพนธ์สาขาวิศวกรรมคอมพิวเตอร์ 
            <br/>คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงใหม่ 
            <br/>จัดทำโดย นางสาวเฌอญานิกา วงค์ตาแก้ว และนายนครินทร์ คมลาย
            <br/>ซึ่งพัฒนาโดยใช้ Google Colab Pro ในการฝึกแบบจำลอง 
            <br/>ใช้ <a href="https://wandb.ai/home">Weights & Bias</a> ในการวิเคราะห์พารามิเตอร์ของแบบจำลอง,&nbsp; 
            <br/><a href="https://huggingface.co/docs/transformers/index">Huggingface</a> สำหรับการอัพโหลดแบบจำลองและเรียกใช้งานผ่าน API
            <br/>และใช้ระบบ Host และฐานข้อมูล Database โดย <a href="https://firebase.google.com/">Firebase</a>&nbsp;  
            <br/>สามารถเข้าศึกษาแบบจำลองที่นักศึกษาใช้งานได้ที่&nbsp; <a href="https://github.com/defyMiy/NMT-Project">Github</a>
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
