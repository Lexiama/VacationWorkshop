function init() {
  let totalCost = 0;

  // discount
  const seniorDiscount = 10 / 100;
  const militaryDiscount = 20 / 100;

  // tax
  const taxRate = 12 / 100;

  function getRoomRate(roomType, checkInDate) {
    let roomPrice = 150;
    // ! (not)

    let checkInMonth = checkInDate.getMonth();
    if (
      checkInMonth >= 5 &&
      checkInMonth <= 7 &&
      roomType !== "2-bedroom-suite"
    ) {
      roomPrice = 250;
    } else if (
      checkInMonth >= 5 &&
      checkInMonth <= 7 &&
      roomType === "2-bedroom-suite"
    ) {
      roomPrice = 350;
    } else if (roomType === "2-bedroom-suite") {
      roomPrice = 210;
    }

    return roomPrice;
  }

  function roomSuppoted(roomType, noOfGuests) {
    let isSupported = true;
    if (roomType === "queen" && noOfGuests > 5) {
      isSupported = false;
    }

    if (roomType === "king" && noOfGuests > 2) {
      isSupported = false;
    }

    if (roomType === "2-bedroom-suite" && noOfGuests > 6) {
      isSupported = false;
    }
    return isSupported;
  }

  // reference to all the html elments

  //fname
  //inputEmail
  //InputcheckIn

  const fnameEl = document.getElementById("fname");
  const emailEl = document.getElementById("inputEmail");
  const checkInEl = document.getElementById("InputcheckIn");
  const noOfNightsEl = document.getElementById("inputNumberOfNights");
  const roomTypeEls = document.querySelectorAll('input[name="roomType"]');
  const kingRoomEl = document.getElementById("kingRadioBtn");
  const queenRoomEl = document.getElementById("QueenRadioBtn");
  const twoBedroomSuiteEl = document.getElementById("twoBedRadioBtn");
  const noOfAdultsEl = document.getElementById("numberOfAdults");
  const noOfKidsEl = document.getElementById("numberOfKids");
  const noDiscountEl = document.getElementById("no-discount");
  const seniorDiscountEl = document.getElementById("senior-discount");
  const militaryDiscountEl = document.getElementById("military-discount");

  // cost display referencecs

  const outputTotalCostEl = document.getElementById("outputTotal");
  const originalRoomCostEl = document.getElementById("costOfRoom");
  const discountCostEl = document.getElementById("discountCost");
  const discountedRoomCostEl = document.getElementById("discountedRoomCost");
  const taxCostEl = document.getElementById("taxCost");
  const totalCostEl = document.getElementById("totalCost");

  const messageEl = document.getElementById("messageDiv");

  const bookingFormEl = document.getElementById("booking-form");

  bookingFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
    messageEl.innerText = "";

    let noOfGuests = parseInt(noOfAdultsEl.value) + parseInt(noOfKidsEl.value);
    let roomType = "";

    if (kingRoomEl.checked === true) {
      roomType = "king";
    } else if (queenRoomEl.checked === true) {
      roomType = "queen";
    } else {
      roomType = "2-bedroom-suite";
    }

    let roomIsSupported = roomSuppoted(roomType, noOfGuests);
    if (roomIsSupported === false) {
      messageEl.innerText = "The room you selected will not hold your party";
      return;
    }
    debugger;

    //rate claculation log
    let roomPrice = getRoomRate(roomType, new Date(checkInEl.value));

    let totalDiscount = 0;
    if (noOfAdultsEl.checked === true) {
      // not disounct
    } else {
      if (seniorDiscountEl.checked === true) {
        totalDiscount = roomPrice * seniorDiscount;
      }
      if (militaryDiscountEl.checked === true) {
        totalDiscount = totalDiscount + roomPrice * militaryDiscount; //135
        console.log({ roomPriceMilitaryDiscount: totalDiscount });
      }
    }

    // discounted price
    let discountedPrice = roomPrice - totalDiscount;

    // tax calculation
    let appliedTax = discountedPrice * taxRate;
    let roomPriceAfterTax = discountedPrice + appliedTax;

    totalCost = roomPriceAfterTax * parseInt(noOfNightsEl.value);

    // display the all the costs

    outputTotalCostEl.value = "$" + totalCost;
    originalRoomCostEl.innerText = "$" + roomPrice;

    discountCostEl.innerText = "$" + totalDiscount;
    discountedRoomCostEl.innerText = "$" + discountedPrice;
    taxCostEl.innerText = "$" + appliedTax;
    totalCostEl.innerText = "$" + totalCost;
  });
}

init();
