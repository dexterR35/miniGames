document.addEventListener("DOMContentLoaded", function () {
  const mapContainer = document.getElementById("map");
  const prizeModal = document.getElementById("prizeModal");
  const closeModal = document.getElementById("closeModal");
  const prizeText = document.getElementById("prizeText");
  const claimPrizeBtn = document.getElementById("claimPrizeBtn");

  // Configuration
  const baseDate = new Date(); // Set your base date here
  const monthsAfter = 4; // Number of months to display

  // Utility: Generate a date key for prizes
  const generateDateKey = (year, month, day) => `${year}-${month + 1}-${day}`;
  const monthBackgrounds = {
    0: "./png/png.webp",  // January
    1: "path/to/february.jpg", // February
    2: "path/to/march.jpg",    // March
    // ...
    11: "path/to/december.jpg" // December
  };
  
  // Simulate an asynchronous prize fetching function
  const fetchPrizes = async (baseDate, monthsAfter) => {
    return new Promise((resolve) => {
      const prizes = {};
      const baseYear = baseDate.getFullYear();
      const baseMonth = baseDate.getMonth();

      for (let offset = 0; offset <= monthsAfter; offset++) {
        const targetMonth = (baseMonth + offset) % 12;
        const targetYear = baseYear + Math.floor((baseMonth + offset) / 12);
        const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          const dateKey = generateDateKey(targetYear, targetMonth, day);
          prizes[dateKey] = `Prize for ${day} ${new Date(targetYear, targetMonth).toLocaleString('default', { month: 'long' })}`;
        }
      }

      setTimeout(() => resolve(prizes), 500); // Simulate a delay
    });
  };

  // Fetch and initialize prizes
  let prizes = {};
  const initializePrizes = async () => {
    try {
      prizes = await fetchPrizes(baseDate, monthsAfter);
    } catch (error) {
      console.error("Error fetching prizes:", error);
    }
  };

  // Generate the map
  const generateMap = async () => {
    mapContainer.innerHTML = "";
    const baseYear = baseDate.getFullYear();
    const baseMonth = baseDate.getMonth();

    for (let offset = 0; offset <= monthsAfter; offset++) {
      const targetMonth = (baseMonth + offset) % 12;
      const targetYear = baseYear + Math.floor((baseMonth + offset) / 12);
      const monthName = new Date(targetYear, targetMonth).toLocaleString('default', { month: 'long' });

      const island = document.createElement("div");
      island.textContent = monthName;
      island.dataset.month = targetMonth;
      island.dataset.year = targetYear;
      island.classList.add("month");

      island.addEventListener("click", () => openCalendar(targetYear, targetMonth));
      mapContainer.appendChild(island);
    }
  };

  // Generate the calendar for a specific month
  const openCalendar = async (year, month) => {
    const calendarWrapper = document.createElement("div");
    calendarWrapper.classList.add("calendar-wrapper");
  
    // Div pentru imaginea lunii
    const monthImageDiv = document.createElement("div");
    monthImageDiv.classList.add("month-image");
    const bgImage = monthBackgrounds[month];
    const monthImage = document.createElement("img");
    monthImage.src = bgImage;
    monthImage.alt = `Background for ${new Date(year, month).toLocaleString('default', { month: 'long' })}`;
    monthImageDiv.appendChild(monthImage);
  
    // Div pentru zilele lunii
    const calendarContainer = document.createElement("div");
    calendarContainer.classList.add("calendar");
  
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close map";
    closeButton.addEventListener("click", async () => {
      mapContainer.innerHTML = "";
      await generateMap();
    });
  
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentYear = baseDate.getFullYear();
    const currentMonth = baseDate.getMonth();
    const currentDay = baseDate.getDate();
    const currentDate = new Date(currentYear, currentMonth, currentDay);
  
    for (let dayIndex = 0; dayIndex < daysInMonth; dayIndex++) {
      const dayDiv = document.createElement("div");
      const day = dayIndex + 1;
      const dayDate = new Date(year, month, day);
      const isPast = dayDate < currentDate;
      const isFuture = dayDate > currentDate;
      const isToday = dayDate.toDateString() === currentDate.toDateString();
  
      dayDiv.textContent = day;
      dayDiv.dataset.index = dayIndex;
      dayDiv.classList.add("day");
  
      // Adaugă clase pentru stilizare în funcție de starea zilei
      if (isPast) {
        dayDiv.classList.add("past");
      } else if (isFuture) {
        dayDiv.classList.add("future");
      } else if (isToday) {
        dayDiv.classList.add("today");
        dayDiv.addEventListener("click", () => openPrizeModal(year, month, day));
      }
  
      calendarContainer.appendChild(dayDiv);
    }
  
    calendarWrapper.appendChild(monthImageDiv); // Adaugă div-ul pentru imagine
    calendarWrapper.appendChild(calendarContainer); // Adaugă div-ul pentru zile
    calendarWrapper.appendChild(closeButton); // Adaugă butonul de închidere
    mapContainer.innerHTML = "";
    mapContainer.appendChild(calendarWrapper);
  };
  

  // Open the prize modal
  const openPrizeModal = async (year, month, day) => {
    const dateKey = generateDateKey(year, month, day);

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

  // Simulate an asynchronous action to get a prize
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

  // Claim prize action (no user information check)
  claimPrizeBtn.addEventListener("click", async () => {
    const dateKey = generateDateKey(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    alert("Prize Claimed!");
    prizeModal.style.display = "none";
  });

  // Close the prize modal
  closeModal.addEventListener("click", () => {
    prizeModal.style.display = "none";
  });

  // Initialize the application
  const initializeApp = async () => {
    await initializePrizes();
    await generateMap();
  };

  initializeApp();
});
