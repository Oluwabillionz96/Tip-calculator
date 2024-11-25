const amount = document.querySelector("#bill");
const tipButtons = document.querySelectorAll(".percentage");
const customButton = document.querySelector(".custom");
const numberOfPeople = document.querySelector("#people");
const totals = document.querySelectorAll(".number");
const reset = document.querySelector(".reset");
const error = document.querySelectorAll(".red");

const ud = () => {
  if (tipButtons[0].click()) {
    return console.log(true);
  } else {
    return console.log(false);
  }
};

function elses(index, element) {
  error[index].style.display = "block";
  element.style.border = "2px solid red";
  element.addEventListener("keypress", () => {
    error[index].style.display = "none";
    element.style.border = "none";
  });
}

function tipCalc(operand) {
  const realTip = Number(amount.value.trim()) * (Number(operand) / 100);
  if (numberOfPeople.value) {
    const tipResult = realTip / Number(numberOfPeople.value.trim());
    totals[0].textContent = tipResult.toFixed(2);
  } else {
    elses(1, numberOfPeople);
  }
}

function totalCalc(operand) {
  if (amount.value && numberOfPeople.value) {
    const realTip = Number(amount.value.trim()) * (Number(operand) / 100);
    const realAmount = realTip + Number(amount.value.trim());
    const totaled = realAmount / numberOfPeople.value;
    totals[1].textContent = totaled.toFixed(2);
  }
}

for (const button of tipButtons) {
  button.addEventListener("click", () => {
    const anOperand = button.textContent.slice(
      0,
      button.textContent.length - 1
    );
    if (amount.value) {
      switch (button.textContent) {
        case "5%":
        case "10%":
        case "15%":
        case "25%":
        case "50%":
          tipCalc(anOperand);
          break;

        default:
          console.log("What?");
          break;
      }
    } else {
      elses(0, amount);
    }

    totalCalc(anOperand);
  });
}

customButton.onclick = () => {
  if (customButton.textContent) {
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    customButton.innerHTML = "";
    input.style.width = "100%";
    input.style.height = "100%";
    input.style.outline = "none";
    customButton.appendChild(input);
    input.focus();
  }
};

document.addEventListener("keypress", (e) => {
  if (document.querySelectorAll("input")[1].value) {
    if (e.key === "Enter") {
      const customInput = document.querySelectorAll("input")[1].value;
      tipCalc(customInput);
      customButton.innerHTML = "Custom";

      totalCalc(customInput);
    }
  }
});

reset.addEventListener("click", () => {
  amount.value = "";
  numberOfPeople.value = "";
  totals.forEach((total) => (total.textContent = "0.00"));
});
