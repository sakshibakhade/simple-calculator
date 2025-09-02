

document.addEventListener("DOMContentLoaded", () => {
  const calculator = document.querySelector(".calculator");
  const menubtn = document.querySelector(".menu-btn");
  const historypanel = document.querySelector("#history-panel");
  const historylist = document.querySelector("#history-list");
  const clearhistory = document.querySelector(".clear-history");
  const input = document.querySelector("#display");
  const numbtn = document.querySelectorAll(".num-btn");
  const cancelbtn = document.querySelector(".cancel-btn");
  const equalbtn = document.querySelector(".equal-btn");
  const deletebtn = document.querySelector(".delete-btn");
  const dividebtn = document.querySelector(".divide-btn");
  const percentagebtn = document.querySelector(".percentage-btn");
  const dotbtn = document.querySelector(".dot-btn");
  const mulbtn = document.querySelector(".mul-btn");
  const addbtn = document.querySelector(".add-btn");
  const subbtn = document.querySelector(".sub-btn");
  const buttonsWrapper = document.querySelector(".buttons");
  

  let currentinput = "";
  let history = [];


  const updatedisplay = () => {
    input.value = currentinput;
  };

  const addnumber = (num) => {
    currentinput += num;
    updatedisplay();
  };

  const opreatorfun = (opreator) => {
    currentinput += opreator;
    updatedisplay();
  };

  const clearall = () => {
    currentinput = "";
    updatedisplay();
  };

  const deleteLast = () => {
    currentinput = currentinput.slice(0, -1);
    updatedisplay();
  };

  const calculated = () => {
    try {
      const expression = currentinput;
      const result = Function(`"use strict"; return (${currentinput})`)();
      input.value = result;

      currentinput = result.toString();
      
      history.push({expression, result });
      
    } catch {
      input.value = "Error";
      currentinput = "";
    }
  };
  
  

  const menutoggle = () => {

     calculator.classList.toggle("show-history");

    if (calculator.classList.contains("show-history")) {
      buttonsWrapper.style.display = "none";
      historypanel.style.display = "block";
      menubtn.textContent = "← Back";
      menubtn.style.marginRight = "40px"

      historylist.innerHTML = "";
      
     history.forEach((item) => {
       const li = document.createElement("li");
       li.textContent = `${item.expression} = ${item.result}`;
       historylist.appendChild(li);
     });

    } else {
      buttonsWrapper.style.display = "grid";
      historypanel.style.display = "none";
      menubtn.textContent = "☰";
    }
  };

  
    const clearhistorylist = () => {
      history = [];
      historylist.innerHTML = "";
    };


  // Event listeners
 historylist.addEventListener("click", (e) => {
   if (e.target.tagName === "LI") {
     currentinput = e.target.textContent.split("=")[0].trim();
     updatedisplay();
   }
 });


  numbtn.forEach((button) => {
    button.addEventListener("click", () => addnumber(button.textContent));
  });
  
  addbtn.addEventListener("click", () => opreatorfun("+"));
  subbtn.addEventListener("click", () => opreatorfun("-"));
  mulbtn.addEventListener("click", () => opreatorfun("*"));
  dividebtn.addEventListener("click", () => opreatorfun("/"));
  percentagebtn.addEventListener("click", () => opreatorfun("%"));
  dotbtn.addEventListener("click", () => opreatorfun("."));
  
  deletebtn.addEventListener("click", deleteLast);
  cancelbtn.addEventListener("click", clearall);
  equalbtn.addEventListener("click", calculated);
  
menubtn.addEventListener("click", menutoggle);
  clearhistory.addEventListener("click", clearhistorylist);
});  