// ================= ELEMENTS =================
const currentRate = document.getElementById("currentRate");
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
const arrow = document.getElementById("arrow");
const result = document.getElementById("result");
const calculateBtn = document.getElementById("calculate");
const sound = document.getElementById("sound");

// ================= MAP =================
const currencyToCountry = {
  USD: "us",
  INR: "in",
  EUR: "eu",
  GBP: "gb",
  PKR: "pk",
  CAD: "ca",
  KWD: "kw",
  AUD: "au",
  CHF: "ch",
  CNY: "cn",
  HKD: "hk",
  IQD: "iq",
  JOD: "jo",
  AED: "ae",
  MAD: "ma",
  MXN: "mx",
  PHP: "ph",
  COP: "co",
  DKK: "dk",
  RWF: "rw",
  NOK: "no",
  IDR: "id",
  IRR: "ir"
};

// ================= FLAG UPDATE =================
function updateFlag(select, img) {
  const countryCode = currencyToCountry[select.value];
  img.src = `https://flagcdn.com/${countryCode}.svg`;
}

// ================= EVENTS =================
fromCurrency.addEventListener("change", () =>
  updateFlag(fromCurrency, fromFlag)
);

toCurrency.addEventListener("change", () =>
  updateFlag(toCurrency, toFlag)
);

// Swap currencies
arrow.addEventListener("click", () => {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  updateFlag(fromCurrency, fromFlag);
  updateFlag(toCurrency, toFlag);
});

// ================= CONVERT =================
async function convertCurrency() {
  const amount = Number(amountInput.value);

  if (!amount || amount <= 0) {
    result.innerText = "Enter valid amount";
    return;
  }

  const from = fromCurrency.value.toLowerCase();
  const to = toCurrency.value.toLowerCase();

  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
    );
    const data = await response.json();

    const rate = data[from][to];
    const converted = (amount * rate).toFixed(2);

    result.innerText = `${converted} ${to.toUpperCase()}`;
    currentRate.innerText =
      `1 ${from.toUpperCase()} = ${rate.toFixed(4)} ${to.toUpperCase()}`;

  } catch (error) {
    result.innerText = "Error fetching data";
    console.error(error);
  }
}

calculateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  convertCurrency();
  
  //==== CLICK SOUND ====
  sound.currentTime = 0;
  sound.play();
});

// ================= INIT =================
updateFlag(fromCurrency, fromFlag);
updateFlag(toCurrency, toFlag);
