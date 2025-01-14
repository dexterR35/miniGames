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

  const snakePathParameters = [
    { amplitude: 20, frequency: 3, yBase: 50 }, // January
    { amplitude: 20, frequency: 2, yBase: 48 }, // February
    { amplitude: 25, frequency: 5, yBase: 50 }, // March
    { amplitude: 35, frequency: 2, yBase: 45 }, // April
    { amplitude: 40, frequency: 6, yBase: 60 }, // May
  ];

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
        island.classList.add("disabled");
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
    const { amplitude, frequency, yBase } = snakePathParameters[month]; // Get the parameters for the current month
    
    // Create the days for the selected month dynamically
    const positions = [];
    for (let i = 0; i < daysInMonth; i++) {
      const progress = i / (daysInMonth + 1); // Progress on the X axis (0 to 1)
      const x = 5 + progress * 95; // Distribute evenly on the X axis
      const y = yBase + Math.sin(progress * Math.PI * frequency) * amplitude; // Sinusoidal curve on the Y axis
      positions.push({ x, y });
    }

    positions.forEach((pos, index) => {
      const dayDiv = document.createElement("div");
      calendarContainer.appendChild(dayDiv);
    
      // Styles for each day
      dayDiv.style.position = "absolute";
      dayDiv.style.width = "30px";
      dayDiv.style.height = "30px";
      dayDiv.style.borderRadius = "50%";
      dayDiv.style.display = "flex";
      dayDiv.style.justifyContent = "center";
      dayDiv.style.alignItems = "center";
      dayDiv.style.fontWeight = "bold";
      dayDiv.style.fontSize = "12px";
      dayDiv.style.textShadow = "1px 1px 2px white";
    
      // Position each day based on the coordinates
      dayDiv.style.left = pos.x + "%";
      dayDiv.style.top = pos.y + "%";
    
      // Customize start, finish, and intermediate days
      if (index === 0) {
        dayDiv.style.backgroundColor = "green";
        dayDiv.style.color = "white";
        dayDiv.textContent = "Start";
      } else if (index === positions.length - 1) {
        dayDiv.style.backgroundColor = "red";
        dayDiv.style.color = "white";
        dayDiv.textContent = "Finish";
      } else if (month < currentMonth || (month === currentMonth && index < currentDay)) {
        dayDiv.classList.add("before");
        dayDiv.style.backgroundColor = "gray";
        dayDiv.style.color = "white";
        dayDiv.textContent = index + 1;
      }else if (month === currentMonth && index === currentDay) {
        dayDiv.classList.add("current");
        dayDiv.style.backgroundColor = "purple";
        dayDiv.style.color = "white";
        dayDiv.textContent = index + 1; 
        dayDiv.addEventListener("click", () => {
          console.log(`Clicked on day ${index + 1}`); // Debugging log
          openPrizeModal(index + 1); // Open prize modal on click of the current day
        });
      }else if (month === currentMonth && index === currentDay - 1) {
        dayDiv.classList.add("current");
        dayDiv.style.backgroundColor = "blue";
        dayDiv.style.color = "white";
        dayDiv.textContent = index + 1;

        // Enable click only for the current day
      
      } else {
        dayDiv.classList.add("next");
        dayDiv.style.backgroundColor = "gold";
        dayDiv.style.color = "black";
        dayDiv.textContent = index + 1;

        // Disable future days from being clickable by not attaching an event listener
        dayDiv.removeEventListener("click", () => {
          console.log(`Clicked on day ${index + 1}`); // Debugging log
        });
      }
    });

    // Append calendar and close button into the calendarWrapper
    calendarWrapper.appendChild(calendarContainer);
    calendarWrapper.appendChild(closeButton);

    // Clear the map and show the calendar inside the wrapper
    mapContainer.innerHTML = "";
    mapContainer.appendChild(calendarWrapper);
  }

  // Function to open the prize modal
  function openPrizeModal(day) {
    console.log(`Opening prize modal for day ${day}`); // Debugging log
    prizeText.textContent = prizes[day] || `You won a random prize! ${day}`;
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
