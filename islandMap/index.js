document.addEventListener("DOMContentLoaded", function () {
  const getCurrentDate = () => {
    const currentDate = new Date();
    return {
      currentDate,
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      day: currentDate.getDate(),
    };
  };

  const {
    currentDate,
    year: baseYear,
    month: baseMonth,
    day: baseDay,
  } = getCurrentDate();
  const monthsAfter = 2;
  let prizes = {}; // This will hold the dynamically fetched prizes

  const mapContainer = document.getElementById("map");
  let activeModal = null;

  const monthBackgrounds = {
    0: "./png/png.webp",
    1: "./png/png.webp",
    2: "./png/png.webp",
  };

  const getDateFromYearMonthDay = (year, month, day) => {
    return new Date(year, month, day);
  };

  const getMonthDetails = (offset) => {
    const targetMonth = (baseMonth + offset) % 12;
    const targetYear = baseYear + Math.floor((baseMonth + offset) / 12);
    const monthName = new Date(targetYear, targetMonth).toLocaleString(
      "default",
      { month: "long" }
    );
    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    return { targetMonth, targetYear, monthName, daysInMonth };
  };

  const fetchPrizes = async () => {
    try {
      const response = await fetch("./dynamic-prizes.json"); // Adjust path as necessary
      if (!response.ok)
        throw new Error(
          "Failed to fetch prizes, status code: " + response.status
        );
      const data = await response.json();
      console.log("Fetched prizes:", data); // Log the data to check
      return data.prizes || {}; // Return only the prizes object or empty object
    } catch (error) {
      console.error("Error fetching prizes:", error);
      alert(
        "An error occurred while loading the prizes. Please try again later."
      );
      return {}; // Return empty if an error occurs
    }
  };

  const initializePrizes = async () => {
    try {
      prizes = await fetchPrizes();
      console.log("Initialized prizes:", prizes); // Log the prizes object to check
    } catch (error) {
      console.error("Error initializing prizes:", error);
    }
  };

  const generateMap = async () => {
    mapContainer.innerHTML = "";
    for (let i = 0; i <= monthsAfter; i++) {
      const { monthName, targetMonth, targetYear } = getMonthDetails(i);
      const island = createIsland(monthName, targetMonth, targetYear);
      mapContainer.appendChild(island);
    }
  };

  const createIsland = (monthName, targetMonth, targetYear) => {
    const island = document.createElement("div");
    island.textContent = monthName;
    island.dataset.month = targetMonth;
    island.dataset.year = targetYear;
    island.classList.add(`m-${monthName.toLowerCase()}`);

    if (
      targetYear < baseYear ||
      (targetYear === baseYear && targetMonth < baseMonth)
    ) {
      island.classList.add("disabled"); // Add 'disabled' class for past months
      island.style.pointerEvents = "none"; // Disable click for past months
    } else if (targetYear === baseYear && targetMonth === baseMonth) {
      island.classList.add("current"); // Add 'current' class for the current month
      island.style.pointerEvents = "auto"; // Enable click for current month
      island.addEventListener("click", () =>
        openCalendar(targetMonth, targetYear)
      );
    } else {
      island.classList.add("future"); // Add 'future' class for future months
      island.style.pointerEvents = "none"; // Disable click for future months
    }

    return island;
  };

  const openCalendar = (targetMonth, targetYear) => {
    const calendarWrapper = createCalendarWrapper(targetMonth, targetYear);

    // Find the parent of calendarWrapper with the class 'wrap'
    const wrapElement = document.querySelector(".wrap");

    if (wrapElement) {
      // Replace the map with the calendarWrapper inside the 'wrap' container
      wrapElement.replaceChild(
        calendarWrapper,
        wrapElement.querySelector("#map")
      );

      // Add dynamic content after calendarWrapper in the parent 'wrap'
      appendDynamicDiv(targetMonth, targetYear, wrapElement);
    }

    createFloatingPrizeDiv(targetMonth, targetYear);
  };

  const appendDynamicDiv = (targetMonth, targetYear, parentWrapper) => {
    // Create the new div with 4 dynamic divs inside it using template literals
    const dynamicDivHTML = `
      <div class="dynamic-info">
        <div class="parent">
          <div class="section1 sections">
            <h2> ${targetMonth + 1}/${targetYear}</h2>
          </div>
          <div class="section2 sections">
            <h2> ${targetMonth + 1}/${targetYear}</h2>
          </div>
          <div class="section3 sections">
           <h2> ${targetMonth + 1}/${targetYear}</h2>
          </div>
         </div>
      </div>
  `;

    // Append the HTML string after the calendarWrapper in the parent 'wrap'
    parentWrapper.innerHTML += dynamicDivHTML; // Add the new dynamic div to the wrapper
  };
  const createCalendarWrapper = (targetMonth, targetYear) => {
    const calendarWrapper = document.createElement("div");
    calendarWrapper.classList.add("calendar-wrapper");

    const monthImageDiv = createMonthImageDiv(targetMonth);
    const calendarContainer = createCalendarContainer(targetMonth, targetYear);
    const closeButton = closeBtn(() => {
      calendarWrapper.replaceWith(mapContainer);
    });

    calendarWrapper.append(monthImageDiv, calendarContainer, closeButton);
    return calendarWrapper;
  };

  const createMonthImageDiv = (targetMonth) => {
    const monthImageDiv = document.createElement("div");
    monthImageDiv.classList.add("month-image");

    const bgImage = monthBackgrounds[targetMonth] || monthBackgrounds[0];
    const monthImage = document.createElement("img");
    monthImage.src = bgImage;
    monthImage.alt = `Image for ${targetMonth}`;

    monthImageDiv.appendChild(monthImage);
    return monthImageDiv;
  };

  const createCalendarContainer = (targetMonth, targetYear) => {
    const calendarContainer = document.createElement("div");
    calendarContainer.classList.add("calendar");

    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    const { currentDate } = getCurrentDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = createDayDiv(day, targetMonth, targetYear, currentDate);
      calendarContainer.appendChild(dayDiv);
    }
    return calendarContainer;
  };

  const createDayDiv = (day, targetMonth, targetYear, currentDate) => {
    const dayDiv = document.createElement("div");
    const dayDate = getDateFromYearMonthDay(targetYear, targetMonth, day);
    const isToday = dayDate.toDateString() === currentDate.toDateString();

    const monthYearKey = `${targetYear}-${(targetMonth + 1)
      .toString()
      .padStart(2, "0")}`;
    const prize =
      prizes[monthYearKey] && prizes[monthYearKey][day]
        ? prizes[monthYearKey][day]
        : null; // Set prize to null if not found

    dayDiv.textContent = prize || "No prize available"; // Show message if no prize
    dayDiv.classList.add("day");

    if (prize) {
      if (isToday) {
        dayDiv.classList.add("today");
        dayDiv.addEventListener("click", () =>
          openPrizeModal(day, targetMonth, targetYear, prize)
        );
      }
    } else {
      dayDiv.style.pointerEvents = "none"; // Disable clicks if no prize
    }

    return dayDiv;
  };

  const openPrizeModal = async (day, month, year, prize) => {
    if (!prize) return; // If no prize, prevent modal from opening

    const monthYearKey = `${year}-${(month + 1).toString().padStart(2, "0")}`;
    const modalContent = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>${prize}</p>
        <button id="claimPrizeBtn">Claim Prize</button>
      </div>
    `;
    const modal = createModal(modalContent);

    modal.querySelector(".close").addEventListener("click", () => {
      modal.remove();
      activeModal = null;
    });

    modal.querySelector("#claimPrizeBtn").addEventListener("click", () => {
      alert(`Prize Claimed for ${monthYearKey}!`);
      modal.remove();
      activeModal = null;
    });
  };

  const createModal = (content) => {
    if (activeModal) {
      activeModal.remove();
      activeModal = null;
    }

    const modal = document.createElement("div");
    modal.id = "prizeModal";
    modal.classList.add("modal");
    modal.innerHTML = content;
    document.body.appendChild(modal);
    activeModal = modal;
    return modal;
  };

  const closeBtn = (callback) => {
    const button = document.createElement("button");
    button.textContent = "Close map";
    button.addEventListener("click", callback);
    return button;
  };

  const createFloatingPrizeDiv = (targetMonth, targetYear) => {
    const { currentDate } = getCurrentDate();

    // Get the previous, current, and next day's date objects
    const prevDay = getDateFromYearMonthDay(
      targetYear,
      targetMonth,
      currentDate.getDate() - 1
    );
    const nextDay = getDateFromYearMonthDay(
      targetYear,
      targetMonth,
      currentDate.getDate() + 1
    );

    // Format the date keys (month-year) for prize lookup
    const formatDateKey = (date) =>
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
    const prevDayKey = formatDateKey(prevDay);
    const currentDayKey = formatDateKey(currentDate);
    const nextDayKey = formatDateKey(nextDay);

    // Retrieve the prizes for each day
    const prevPrize =
      prizes[prevDayKey] && prizes[prevDayKey][prevDay.getDate()]
        ? prizes[prevDayKey][prevDay.getDate()]
        : "Prize not found"; // Default prize text if not found

    const currentPrize =
      prizes[currentDayKey] && prizes[currentDayKey][currentDate.getDate()]
        ? prizes[currentDayKey][currentDate.getDate()]
        : "Prize not found"; // Default prize text if not found

    const nextPrize =
      prizes[nextDayKey] && prizes[nextDayKey][nextDay.getDate()]
        ? prizes[nextDayKey][nextDay.getDate()]
        : "Prize not found"; // Default prize text if not found

    // Create the floating div to display the prizes
    const prizeDiv = document.createElement("div");
    prizeDiv.classList.add("floating-prizes");

    // Set content for the floating div
    prizeDiv.innerHTML = `
    <h2>Prize info</h2>
      <p><strong>Previous Day's Prize:</strong> ${prevPrize}</p>
      <p><strong>Today's Prize:</strong> ${currentPrize}</p>
      <p><strong>Next Day's Prize:</strong> ${nextPrize}</p>
    `;

    // Add styles for the floating div
    prizeDiv.style.position = "fixed";
    prizeDiv.style.top = "20px";
    prizeDiv.style.left = "20px";
    prizeDiv.style.padding = "15px";
    prizeDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    prizeDiv.style.color = "#fff";
    prizeDiv.style.borderRadius = "8px";
    prizeDiv.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
    prizeDiv.style.zIndex = "9999";

    // Append the floating prize div to the document body
    document.body.appendChild(prizeDiv);

    return prizeDiv;
  };

  const initializeApp = async () => {
    try {
      await initializePrizes();
      await generateMap();
    } catch (error) {
      console.error("Error initializing app:", error);
      alert(
        "An error occurred while initializing the application. Please try again later."
      );
    }
  };

  initializeApp();
});
