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

query({ inputs: "สวัสดีวันจันทร์" }).then((response) => {
  console.log(JSON.stringify(response));
});
