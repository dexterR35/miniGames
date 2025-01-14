document.addEventListener("DOMContentLoaded", function () {
  const mapContainer = document.getElementById("map");
  const prizeModal = document.getElementById("prizeModal");
  const closeModal = document.getElementById("closeModal");
  const prizeText = document.getElementById("prizeText");
  const claimPrizeBtn = document.getElementById("claimPrizeBtn");

  // Current Date for calculation
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-based index (January is 0)
  const currentDay = currentDate.getDate(); // 1-based day

  // Prize pool for each day
  const prizes = {
    1: "Prize for day 1",
    2: "Prize for day 2",
    3: "Prize for day 3",
    4: "Prize for day 4",
    5: "Prize for day 5",
    // Add more prizes for other days as needed
  };

  // Function to generate the map (4 islands for 4 months)
  function generateMap() {
    const months = ["January", "February", "March", "April"];
    months.forEach((month, index) => {
      const island = document.createElement("div");
      island.textContent = month;
      island.dataset.month = index;
      island.addEventListener("click", () => openCalendar(index));
      island.classList.add(`${month}`);
      if (index !== currentMonth) {
        // Disable the island for future months (using JavaScript)
    
      } else {
        island.removeAttribute("disabled"); // Ensure current month is enabled
      }

      mapContainer.appendChild(island);
    });
  }

  // Function to generate the calendar for a selected month
  function openCalendar(month) {
    const calendarWrapper = document.createElement("div");
    calendarWrapper.classList.add("calendar-wrapper");

    // Create the calendar container and the close button
    const calendarContainer = document.createElement("div");
    calendarContainer.id = "calendar";
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close Calendar";

    // Attach event to close the calendar
    closeButton.addEventListener("click", () => {
      mapContainer.innerHTML = ""; // Clear the current calendar view
      generateMap(); // Re-generate the map view
    });

    const daysInMonth = new Date(2025, month + 1, 0).getDate(); // Get number of days in the selected month

    // Create the days for the selected month dynamically
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = i;

      if (month < currentMonth || (month === currentMonth && i < currentDay)) {
        // Past days are disabled
        dayDiv.classList.add("before");
      } else if (month === currentMonth && i === currentDay) {
        // Current day is active
        dayDiv.classList.add("current");
        dayDiv.addEventListener("click", () => openPrizeModal(i)); // Add click event for current day
      } else {
        // Future days are marked with a question mark (future)
        dayDiv.textContent = `${i}?`;
        dayDiv.classList.add("next");
      }

      calendarContainer.appendChild(dayDiv);
    }

    // Append calendar and close button into the calendarWrapper
    calendarWrapper.appendChild(calendarContainer);
    calendarWrapper.appendChild(closeButton);

    // Clear the map and show the calendar inside the wrapper
    mapContainer.innerHTML = "";
    mapContainer.appendChild(calendarWrapper);
  }

  // Function to open the prize modal
  function openPrizeModal(day) {
    prizeText.textContent = prizes[day] || "You won a random prize!";
    prizeModal.style.display = "flex"; // Show the prize modal
  }

  // Close the prize modal
  closeModal.addEventListener("click", () => {
    prizeModal.style.display = "none"; // Hide the prize modal
  });

  // Claim prize button action
  claimPrizeBtn.addEventListener("click", () => {
    alert("Prize Claimed!");
    prizeModal.style.display = "none"; // Hide the prize modal after claiming
  });

  // Generate the initial map when the page loads
  generateMap();
});
