document.addEventListener("DOMContentLoaded", function () {
  const mapContainer = document.getElementById("map");
  const prizeModal = document.getElementById("prizeModal");
  const closeModal = document.getElementById("closeModal");
  const prizeText = document.getElementById("prizeText");
  const claimPrizeBtn = document.getElementById("claimPrizeBtn");

  // Current Date for calculation
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // The number of months after the current month you want to show
  const monthsAfter = 4;

  // Function to generate dynamic prizes
  function generatePrizes() {
    const prizes = {};
    for (let i = 0; i <= monthsAfter; i++) {
      const monthIndex = (currentMonth + i) % 12;
      prizes[monthIndex] = `Prize for day ${i + 1} of month ${new Date(2025, monthIndex).toLocaleString('default', { month: 'long' })}`;
    }
    return prizes;
  }

  const prizes = generatePrizes(); // Dynamically generated prizes

  // Function to generate the map (current month and next months)
  function generateMap() {
    for (let i = 0; i <= monthsAfter; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const monthName = new Date(2025, monthIndex).toLocaleString('default', { month: 'long' });
      const island = document.createElement("div");
      island.textContent = monthName;
      island.dataset.month = monthIndex;
      island.classList.add("month");
      
      island.addEventListener("click", () => openCalendar(monthIndex));
      mapContainer.appendChild(island);
    }
  }

  // Function to generate the calendar for a selected month
  function openCalendar(month) {
    const calendarWrapper = document.createElement("div");
    calendarWrapper.classList.add("calendar-wrapper");

    const calendarContainer = document.createElement("div");
    calendarContainer.classList.add("calendar");

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close map";
    closeButton.addEventListener("click", () => {
      mapContainer.innerHTML = ""; // Clear the current calendar view
      generateMap(); // Re-generate the map view
    });

    const daysInMonth = new Date(2025, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = i;
      dayDiv.classList.add("day");

      if (month < currentMonth || (month === currentMonth && i < currentDay)) {
        dayDiv.classList.add("past");
      } else if (month === currentMonth && i === currentDay) {
        dayDiv.classList.add("today");
        dayDiv.addEventListener("click", () => openPrizeModal(i));
      } else {
        dayDiv.classList.add("future");
      }

      calendarContainer.appendChild(dayDiv);
    }

    calendarWrapper.appendChild(calendarContainer);
    calendarWrapper.appendChild(closeButton);
    mapContainer.innerHTML = "";
    mapContainer.appendChild(calendarWrapper);
  }

  // Function to open the prize modal
  function openPrizeModal(day) {
    prizeText.textContent = prizes[day] || `You won a random prize! ${day}`;
    prizeModal.style.display = "flex";
  }

  // Close the prize modal
  closeModal.addEventListener("click", () => {
    prizeModal.style.display = "none";
  });

  // Claim prize button action
  claimPrizeBtn.addEventListener("click", () => {
    alert("Prize Claimed!");
    prizeModal.style.display = "none";
  });

  // Generate the initial map when the page loads
  generateMap();
});
