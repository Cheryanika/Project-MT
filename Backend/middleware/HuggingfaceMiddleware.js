// // const fetch = require("node-fetch");

// async function translateWord(data, req, res, next) {
//   var data = { inputs: `${"งานวิจัยนี้ศึกษาเกี่ยวกับการแปลภาษา"}` };
//   // var data = { "สวัสดีวันอังคาร"}

//   var data = bodyParser.data;

//   const response = await fetch(
//     `https://api-inference.huggingface.co/models/SigmarAI/mt5-sentence-translator`,
//     {
//       headers: {
//         Authorization: "Bearer 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",
//       },
//       method: "POST",
//       body: JSON.stringify(data),
//     }
//   );
//   data = await response.json();
//   return data;
//   //   data = await response.json().then((response) => {
//   //     console.log(JSON.stringify(response));
//   //   });
//   //   return data;
// }

// // query({
// //   inputs: "Jessica Jessica Jessica",
// // }).then((response) => {
// //   console.log(JSON.stringify(response));
// // });

// module.exports = translateWord;
