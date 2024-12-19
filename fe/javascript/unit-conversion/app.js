const convertBtn = document.getElementById("convert-btn");
const lengthEl = document.getElementById("length");
const volumeEl = document.getElementById("volume");
const massEl = document.getElementById("mass");
const inputEl = document.getElementById("unit-input");
const mToFt = 3.28084;
const lToGal = 0.264172;
const kgToLbs = 2.20462;

convertBtn.addEventListener("click", () => {
    let userInput = Number(inputEl.value);
    console.log(typeof userInput);
    if (!isNaN(userInput)) {
        lengthEl.innerHTML = conversionCalculator(
            userInput,
            "meters",
            "feet",
            mToFt
        );
        volumeEl.innerHTML = conversionCalculator(
            userInput,
            "liters",
            "gallons",
            lToGal
        );
        massEl.innerHTML = conversionCalculator(
            userInput,
            "kilos",
            "pounds",
            kgToLbs
        );
    } else {
        lengthEl.innerHTML = "Please provide a valid number input.";
        volumeEl.innerHTML = "Please provide a valid number input.";
        massEl.innerHTML = "Please provide a valid number input.";
    }
});

function conversionCalculator(input, unit1, unit2, conversionRate) {
    return `${input} ${unit1} = ${(input * conversionRate).toFixed(
        3
    )} ${unit2} | ${input} ${unit2} = ${(input / conversionRate).toFixed(
        3
    )} ${unit1}`;
}
