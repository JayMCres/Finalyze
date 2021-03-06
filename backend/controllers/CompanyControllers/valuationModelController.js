const fetch = require("node-fetch");
const baseUrl = process.env.QUANDL_BASE_URL;

const apiKey = process.env.QUANDL_API_KEY;
const valuation = process.env.QUANDL_VALUATION;

exports.getModelHistoricalData = async (req, res) => {
  const url = `${baseUrl}/SF1.json?ticker=${req.body.post}&dimension=${valuation}&api_key=${apiKey}`;

  let response = await fetch(url);
  // console.log("response", response);

  let json = await response.json();
  // console.log("json", json);

  let datatable = await json.datatable.data;
  // console.log("datatable", datatable);

  let reorganizedData = await datatable.map((item, index) => {
    const divisor = 1000000000;
    const capex = item[6] * 1;
    return {
      Revenue: (item[1] / divisor).toLocaleString("us-EN", {
        style: "currency",
        currency: "USD"
      }),
      EBITDA: (item[2] / divisor).toLocaleString("us-EN", {
        style: "currency",
        currency: "USD"
      }),
      Margin: (item[3] * 100).toFixed(2) + "%",
      OCF: (item[4] / divisor).toLocaleString("us-EN", {
        style: "currency",
        currency: "USD"
      }),
      Conversion: (item[4] / item[7]).toFixed(2) + "x",
      FCF: (item[6] / divisor).toLocaleString("us-EN", {
        style: "currency",
        currency: "USD"
      }),
      capex: ((capex / item[1]) * 100).toFixed(2) + "%",
      numRev: item[1] / divisor,
      numEBITDA: item[2] / divisor,
      numOCF: item[4] / divisor,
      numFCF: item[6] / divisor
    };
  });

  res.send(reorganizedData);
};
