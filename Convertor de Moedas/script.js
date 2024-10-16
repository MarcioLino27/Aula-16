let fromCurrency = document.getElementById("from");
let toCurrency = document.getElementById("to");
const amount = document.querySelector(".amount input");
const resultText = document.querySelector(".result");

const apiKey = "d92242e158f0973a55de8cc1";

const handleImage = (dropdown) => {
    const imgTag = dropdown.parentElement.querySelector("img");
    imgTag.src = `https://flagsapi.com/${
      countryCodes[dropdown.value]
    }/flat/64.png`;
  };

const onChange = (dropdown) => {
    dropdown.addEventListener("change", () => {
      handleImage(dropdown);
      getExchangeRate();
    });
  };

const getExchangeRate = async () => {
    amount.value = amount.value || 0;
  
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
      );
  
      const result = await response.json();
  
      const exchangeRate = result.conversion_rates[toCurrency.value];
  
      let totalExchangeRate = (amount.value * exchangeRate).toFixed(2);
  
      resultText.innerText = totalExchangeRate;
    } catch (error) {
      alert("Something went wrong!");
    }
  };

const exchange = () => {
    [fromCurrency.value, toCurrency.value] = [
      toCurrency.value,
      fromCurrency.value,
    ];
  
    [fromCurrency, toCurrency].forEach((dropdown) => handleImage(dropdown));
    getExchangeRate();
  };

const clearData = () => {
    amount.value = null;
    resultText.innerHTML = "0";
}
  
[fromCurrency, toCurrency].forEach((dropdown, index) => {
    for (let country in countryCodes) {
      let selected =
        (country === "INR" && index == 0) || (country === "USD" && index == 1)
          ? "selected"
          : "";

      let optionTag = document.createElement("option");
      optionTag.value = country;
      optionTag.selected = selected;
      optionTag.innerHTML = country;
      dropdown.appendChild(optionTag);
    }

    onChange(dropdown);
  });
