document.addEventListener("DOMContentLoaded", function () {
  
  

  var calculateButton = document.getElementById("calculateButton"); //same
  calculateButton.addEventListener("click", calculate);

  var copyAndSendButton = document.getElementById("copyAndSendButton");
  copyAndSendButton.addEventListener("click", shareOutput);

  var clearButton = document.getElementById("clearButton"); //same
  clearButton.addEventListener("click", refreshPage);

  var storeNameInput = document.getElementById("textInput");
  storeNameInput.addEventListener("input", predictiveSearch);

  fetch('storeNames.txt')
        .then(response => response.text())
        .then(data => {
            window.storeNames = data.split('\n').filter(name => name.trim() !== ''); // Load names into the storeNames array
        })
        .catch(error => console.error('Error fetching store names:', error));


        document.addEventListener("click", function (event) {
          var suggestionsDropdown = document.getElementById("suggestionsDropdown");
  
          // Check if the click event target is outside the suggestions dropdown and input field
          if (!event.target.closest('#suggestionsDropdown') && event.target !== storeNameInput) {
              suggestionsDropdown.style.display = "none";
          }
      });

});


function predictiveSearch() {
  var storeNameInput = document.getElementById("textInput");
  var suggestionsDropdown = document.getElementById("suggestionsDropdown");

  var searchInput = storeNameInput.value.toLowerCase();

  // Check if storeNames is defined
  if (!window.storeNames) {
      suggestionsDropdown.style.display = "none";
      return;
  }

  var filteredStores = storeNames.filter(store => store.toLowerCase().includes(searchInput));

  suggestionsDropdown.innerHTML = '';

  if (searchInput.trim() === "") {
      suggestionsDropdown.style.display = "none";
      return;
  }

  filteredStores.forEach(store => {
      var listItem = document.createElement("li");
      listItem.textContent = store;
      listItem.onclick = function () {
          storeNameInput.value = store;
          suggestionsDropdown.style.display = "none";
      };
      suggestionsDropdown.appendChild(listItem);
  });

  if (filteredStores.length > 0) {
      suggestionsDropdown.style.display = "block";
  } else {
      suggestionsDropdown.style.display = "none";
  }
}


  // Function to run when the Calculate button is clicked
  function calculate() {

 
     // Calculate sum of text field values
     var textFieldContainer = document.getElementById("textFieldContainer");
     var numberFields = textFieldContainer.querySelectorAll("input[type='number']");
     var sumOfNumberFields = 0;
 
     
     for (var i = 0; i < numberFields.length; i++) {
       var fieldValue = parseFloat(numberFields[i].value);
       if (!isNaN(fieldValue)) {
         sumOfNumberFields += fieldValue;
       }
     }
 
      var storeName = document.getElementById("textInput").value;
      var totalAmount = document.getElementById("Total").value; // Total amount
      var capAmount = document.getElementById("Captured").value; // Captured amount
      var orderNumber = document.getElementById("orderInput").value; // 
      var warning = document.getElementById("warningMessage").value;

      // Get selected radio button value
      let selectedStore = "";
      const radioButtons = document.getElementsByName("radio");
      for (const radioButton of radioButtons) {
          if (radioButton.checked) {
              selectedStore = radioButton.nextSibling.textContent;
              break;
          }
      }
    
        var calculatedReservationFee = totalAmount *0.1;
        var calculatedTotal = calculatedReservationFee + totalAmount *1;
        var calculatedRefundAmount = calculatedTotal - capAmount;
        var calculatedSettlementAmount = capAmount *1;

        if(totalAmount == "" || capAmount == "" ){
          document.getElementById("warningMessage").textContent = "Fill In Amount Fields!";
        }

        else if (calculatedTotal < 0 || calculatedSettlementAmount < 0 || calculatedRefundAmount < 0) {

    var warningMessage = document.getElementById("warningMessage");
    warningMessage.textContent = "Warning! Amounts do not balance!";

    var popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "block";

    var popupOutput = document.getElementById("popupOutput");
    popupOutput.textContent = "Warning! Amounts do not balance!";

    var popupOverlay = document.querySelector(".popup-overlay");
    popupOverlay.addEventListener("click", closePopup);

        } 

       
        else{
        // Update HTML elements with calculated values
        document.getElementById("orderNumberOutput").textContent = "Order Number: # " + orderNumber;
        document.getElementById("reservationFeeOutput").textContent = "Reservation Fee: R " + calculatedReservationFee.toFixed(2);
        document.getElementById("totalOutput").textContent = "Total Order Amount: R " + calculatedTotal.toFixed(2);
        document.getElementById("settlementAmountOutput").textContent = "Settlement Amount: R " + calculatedSettlementAmount.toFixed(2);
        document.getElementById("refundAmountOutput").textContent = "Refund Amount: R " + calculatedRefundAmount.toFixed(2);
        document.getElementById("storeNameOutput").textContent = "Store Name: " + storeName ;
        document.getElementById("warningMessage").textContent = "";
        copyAndSendButton.removeAttribute("disabled");
      var warningMessage = document.getElementById("warningMessage");
    warningMessage.textContent = ""; // Clear warning message
        }
    }






  function generateFields() {
    var selectNumber = document.getElementById("weight");
    var textFieldContainer = document.getElementById("textFieldContainer");
  
    var selectedNumber = parseInt(selectNumber.value);
    textFieldContainer.innerHTML = ""; // Clear previous fields
  
    for (var i = 0; i < selectedNumber; i++) {
      var numberField = document.createElement("input");
      numberField.type = "number"; // Change to number input type
      numberField.name = "number" + i;
      numberField.placeholder = "Amount: " + (i + 1);
      numberField.classList.add("custom-number-input");
      textFieldContainer.appendChild(numberField);
    }

  }

  function refreshPage() {
    location.reload(); // Reload the page
  }
  
  function shareOutput() {
    var totaltotalAmount = document.getElementById("totalOutput").textContent;
    var settlementAmount = document.getElementById("settlementAmountOutput").textContent;
    var refundAmount = document.getElementById("refundAmountOutput").textContent;
    var orderNumber = document.getElementById("orderInput").value; // Get the order number from input
    var storeName = document.getElementById("textInput").value;

    // Get selected radio button value
var selectedStore ="";

 var orderStatus = "";
    const radioButtons = document.getElementsByName("radio");
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          orderStatus = radioButton.nextSibling.textContent;
            break;
        }
    }

    if (orderStatus === "Order Delivered") {
      
      console.log("Order is in status D. Performing action 1.");
      var outputText = "Store Name: " + storeName  + "\n\nOrder Number: #" + orderNumber + "\n\n" + totaltotalAmount + "\n\n" + settlementAmount + "\n\n" + refundAmount;
      var keyWord = "refund";
    } else {
     
      console.log("Order is not in status D. Performing action 2.");
      var outputText = "Store Name: " + storeName  + "\n\nOrder Number: #" + orderNumber + "\n\n" + totaltotalAmount;
      var keyWord = "reversal";
    }
  

    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = outputText;

    document.body.appendChild(tempTextArea);

    tempTextArea.select();

    try {
        // Copy the selected text to the clipboard
        document.execCommand("copy");
        var popupContainer = document.getElementById("popupContainer");
        popupContainer.style.display = "block";
    
        var popupOutput = document.getElementById("popupOutput");
        popupOutput.textContent = "Amounts have been shared via Email!";

        var popupOverlay = document.querySelector(".popup-overlay");
        popupOverlay.addEventListener("click", closePopup);
    } catch (err) {
        console.error("Sharing via email failed:", err);
    }

    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);

  // Open email 
  var emailBody = encodeURIComponent("Hi TJ,\n \nPlease advise if the below SPAR2U" + " " + keyWord + " " + "has been processed:\n\n" + outputText + "\n\n");
  var ccEmails = 'dhashen.govender@spar.co.za; Mohammed.Haroun@spar.co.za; retail.helpdesk@spar.co.za'
  var emailLink = "mailto:support@switch.tj?subject=SPAR2U Refund Query - Order #"+orderNumber + " || " + storeName + " " + selectedStore + "&body=" + emailBody + "&cc=" + ccEmails;
  window.location.href = emailLink;
}

function closePopup() {
  var popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "none";

  // Remove event listener 
  var popupOverlay = document.querySelector(".popup-overlay");
  popupOverlay.removeEventListener("click", closePopup);
}


  
  
