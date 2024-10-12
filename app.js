const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    // Add the remaining country codes...
  };
  
  const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
  
  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");
  
  const loadCurrencies = () => {
    dropdowns.forEach((select) => {
      for (const currCode in countryList) {
        let option = document.createElement("option");
        option.value = currCode;
        option.innerText = currCode;
  
        // Default selections
        if (select.name === "from" && currCode === "USD") {
          option.selected = true;
        }
        if (select.name === "to" && currCode === "INR") {
          option.selected = true;
        }
  
        select.appendChild(option);
      }
      select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
      });
    });
  };
  
  const updateExchangeRate = async () => {
    let amountInput = document.querySelector(".amount input");
    let amount = parseFloat(amountInput.value);
  
    if (isNaN(amount) || amount <= 0) {
      amount = 1;
      amountInput.value = "1";
    }
  
    try {
      const response = await fetch(
        `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
  
      const data = await response.json();
      const exchangeRate = data[toCurr.value.toLowerCase()];
      const convertedAmount = (amount * exchangeRate).toFixed(2);
  
      msg.innerText = `${amount} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
    } catch (error) {
      msg.innerText = "Failed to retrieve exchange rate.";
      console.error(error);
    }
  };
  
  const updateFlag = (element) => {
    const currCode = element.value;
    const countryCode = countryList[currCode];
    const img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  };
  
  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });
  
  window.addEventListener("load", () => {
    loadCurrencies();
    updateExchangeRate();
  });
  