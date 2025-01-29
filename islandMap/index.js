document.addEventListener("DOMContentLoaded", function () {
//config
  const baseDate = new Date();
  const monthsAfter = 2; // Show the current month and the next 2 months
  const baseYear = baseDate.getFullYear();
  const baseMonth = baseDate.getMonth();
  const baseDay = baseDate.getDate();
  let prizes = {};

 
  const mapContainer = document.getElementById("map");
  const prizeModal = document.getElementById("prizeModal");
  const closeModal = document.getElementById("closeModal");
  const prizeText = document.getElementById("prizeText");
  const claimPrizeBtn = document.getElementById("claimPrizeBtn");

  // Background images for each month
  const monthBackgrounds = {
    0: "./png/png.webp",
    1: "./png/png.webp",
    2: "./png/png.webp",
  };

  // generate a date key for prizes
  const generateDateKey = (day, month, year) => `${day}-${month + 1}-${year}`;

  // Get month details dynamically, including number of days in the month
  const getMonthDetails = (offset) => {
    const targetMonth = (baseMonth + offset) % 12;
    const targetYear = baseYear + Math.floor((baseMonth + offset) / 12);
    const monthName = new Date(targetYear, targetMonth).toLocaleString("default", { month: "long" });
    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    return { targetMonth, targetYear, monthName, daysInMonth };
  };

  // Fetch all prizes for the given period (current month + monthsAfter)
  const fetchPrizes = async () => {
    const prizes = {};
    for (let i = 0; i <= monthsAfter; i++) {
      const { targetMonth, targetYear, monthName, daysInMonth } = getMonthDetails(i);
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = generateDateKey(day, targetMonth, targetYear);
        prizes[dateKey] = `Prize for ${day} ${monthName}`;
      }
    }
    return prizes;
  };

  // Initialize prize data
  const initializePrizes = async () => {
    try {
      prizes = await fetchPrizes();
    } catch (error) {
      console.error("Error fetching prizes:", error);
    }
  };

  // Setup claim prize button action
  const setupClaimPrizeBtn = () => {
    claimPrizeBtn.addEventListener("click", claimPrize);
  };

  // Setup modal close button action
  const setupCloseModalBtn = () => {
    closeModal.addEventListener("click", () => {
      prizeModal.style.display = "none";
      prizeModal.parentNode.removeChild(prizeModal);
    });
  };

  // Claim prize for today
  const claimPrize = () => {
    const dateKey = generateDateKey(baseDay, baseMonth, baseYear);
    alert(`Prize Claimed for ${dateKey}!`);
    prizeModal.style.display = "none";
  };

  // Render the map of months (islands)
  const generateMap = async () => {
    mapContainer.innerHTML = "";
    for (let i = 0; i <= monthsAfter; i++) {
      const { monthName, targetMonth, targetYear } = getMonthDetails(i);
      const island = createIsland(monthName, targetMonth, targetYear);
      mapContainer.appendChild(island);
    }
  };

  // Create months in the map
  const createIsland = (monthName, targetMonth, targetYear) => {
    const island = document.createElement("div");
    island.textContent = monthName;
    island.dataset.month = targetMonth;
    island.dataset.year = targetYear;
    island.classList.add(`m-${monthName.toLowerCase()}`);
    island.addEventListener("click", () => openCalendar(targetMonth, targetYear));
    return island;
  };

  // Open the calendar for the selected month
  const openCalendar = (targetMonth, targetYear) => {
    const calendarWrapper = createCalendarWrapper(targetMonth, targetYear);
    const parentElement = mapContainer.parentNode;
    parentElement.removeChild(mapContainer);
    parentElement.appendChild(calendarWrapper);
  };

  // Wrapper for the calendar, background image, and calendar grid
  const createCalendarWrapper = (targetMonth, targetYear) => {
    const calendarWrapper = document.createElement("div");
    calendarWrapper.classList.add("calendar-wrapper");
    const monthImageDiv = createMonthImageDiv(targetMonth, targetYear);
    const calendarContainer = createCalendarContainer(targetMonth, targetYear);
    const closeButton = closeBtn();
    closeButton.addEventListener("click", async () => {
      calendarWrapper.parentNode.removeChild(calendarWrapper);
      await generateMap();
    });

    calendarWrapper.appendChild(monthImageDiv);
    calendarWrapper.appendChild(calendarContainer);
    calendarWrapper.appendChild(closeButton);

    return calendarWrapper;
  };

  // Background image for the month
  const createMonthImageDiv = (targetMonth, targetYear) => {
    const monthImageDiv = document.createElement("div");
    monthImageDiv.classList.add("month-image");
    const bgImage = monthBackgrounds[targetMonth] || monthBackgrounds[0];
    const monthImage = document.createElement("img");
    monthImage.src = bgImage;
    monthImage.alt = `Image for ${targetMonth}`;
    monthImage.classList.add(`img-${targetMonth}`);
    monthImageDiv.appendChild(monthImage);
    return monthImageDiv;
  };

  // Create the calendar container for the specific month
  const createCalendarContainer = (targetMonth, targetYear) => {
    const calendarContainer = document.createElement("div");
    calendarContainer.classList.add("calendar");
    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    const currentDate = new Date(baseYear, baseMonth, baseDay);
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = createDayDiv(day, targetMonth, targetYear, currentDate);
      calendarContainer.appendChild(dayDiv);
    }
    return calendarContainer;
  };

  // Create a day block for the calendar
  const createDayDiv = (day, targetMonth, targetYear, currentDate) => {
    const dayDiv = document.createElement("div");
    const dayDate = new Date(targetYear, targetMonth, day);
    const isPast = dayDate < currentDate;
    const isFuture = dayDate > currentDate;
    const isToday = dayDate.toDateString() === currentDate.toDateString();
    dayDiv.textContent = day;
    dayDiv.dataset.index = day;
    dayDiv.classList.add("day");

    if (isPast) {
      dayDiv.classList.add("past");
    } else if (isFuture) {
      dayDiv.classList.add("future");
    } else if (isToday) {
      dayDiv.classList.add("today");
      dayDiv.addEventListener("click", () => openPrizeModal(day, targetMonth, targetYear));
    }

    return dayDiv;
  };

  // Open the prize modal for the current day
  const openPrizeModal = async (day, month, year) => {
    const dateKey = generateDateKey(day, month, year);
    try {
      const prize = await getPrize(dateKey);
      prizeText.textContent = prize;
      prizeModal.style.display = "flex";
    } catch (error) {
      console.error("Error fetching prize:", error);
      prizeText.textContent = "Something went wrong. Try again later.";
      prizeModal.style.display = "flex";
    }
  };

  // Get the prize for a given date
  const getPrize = async (dateKey) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (prizes[dateKey]) {
          resolve(prizes[dateKey]);
        } else {
          reject("Prize not found");
        }
      }, 300);
    });
  };

  // Create the "Close map" button
  const closeBtn = () => {
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close map";
    return closeButton;
  };

  // Initialize the entire application
  const initializeApp = async () => {
    await initializePrizes();
    await generateMap();
    setupClaimPrizeBtn();
    setupCloseModalBtn();
  };

  // Start the app initialization
  initializeApp();
});
