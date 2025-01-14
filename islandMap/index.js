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

  // The number of months after the current month you want to show
  const monthsAfter = 4; // You can change this to show more or fewer months

  // Function to generate dynamic prizes
  function generatePrizes() {
    const prizes = {};
    for (let i = 0; i <= monthsAfter; i++) {
      const monthIndex = (currentMonth + i) % 12;
      prizes[monthIndex] = `Prize for day ${i + 1} of month ${new Date(2025, monthIndex).toLocaleString('default', { month: 'long' })}`;
    }
    return prizes;
  }

  // Function to generate dynamic snake path parameters
  function generateSnakePathParameters() {
    const parameters = [];
    for (let i = 0; i <= monthsAfter; i++) {
      const monthIndex = (currentMonth + i) % 12;
      parameters.push({
        amplitude: 20 + Math.random() * 20, // Example: Random amplitude for visual effect
        frequency: 2 + Math.random() * 3, // Example: Random frequency for sinusoidal curve
        yBase: 40 + Math.random() * 20, // Example: Random y base
      });
    }
    return parameters;
  }

  const prizes = generatePrizes(); // Dynamically generated prizes
  const snakePathParameters = generateSnakePathParameters(); // Dynamically generated parameters

  // Function to generate the map (current month and next 4 months)
  function generateMap() {
    for (let i = 0; i <= monthsAfter; i++) {
      const monthIndex = (currentMonth + i) % 12; // Wrap around the months after December
      const monthName = new Date(2025, monthIndex).toLocaleString('default', { month: 'long' });
      const island = document.createElement("div");
      island.textContent = monthName;
      island.dataset.month = monthIndex;
      island.addEventListener("click", () => openCalendar(monthIndex));
      island.classList.add(`${monthName}`);
      
      if (monthIndex < currentMonth) {
        island.classList.add("disabled"); // Disable past months
      } else {
        island.removeAttribute("disabled"); // Enable the current and future months
      }
      mapContainer.appendChild(island);
    }
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
    const { amplitude, frequency, yBase } = snakePathParameters[month % snakePathParameters.length]; // Get the parameters for the current month
    
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
      } else if (month === currentMonth && index === currentDay) {
        dayDiv.classList.add("current");
        dayDiv.style.backgroundColor = "purple";
        dayDiv.style.color = "white";
        dayDiv.textContent = index + 1; 
        dayDiv.addEventListener("click", () => {
          console.log(`Clicked on day ${index + 1}`); 
          openPrizeModal(index + 1); 
        });
      } else if (month === currentMonth && index === currentDay - 1) {
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




// https://www.shutterstock.com/image-vector/cartoon-game-icons-inventory-items-gui-2376637053
// https://www.shutterstock.com/image-vector/pirate-trophy-cartoon-robbers-treasures-gems-2427355429
//https://www.shutterstock.com/image-vector/game-map-many-levels-landscape-user-2216013179
//https://www.shutterstock.com/image-vector/list-mobile-games-game-ui-kit-2280348893
// https://www.shutterstock.com/image-vector/retro-show-signs-set-isolated-on-2450496243
// https://www.shutterstock.com/image-vector/game-icon-bonus-items-illustration-collection-440578453
//https://www.shutterstock.com/image-vector/level-ui-game-icons-casino-bonus-1927326095
//https://www.shutterstock.com/image-vector/fantasy-game-icon-set-dragon-dungeon-2317370025
// https://es.pinterest.com/pin/88946161377270044/
// https://es.pinterest.com/pin/271553052519867047/
// https://es.pinterest.com/pin/3237030972445431/
// https://es.pinterest.com/pin/8022105581476562/
// https://es.pinterest.com/pin/12525705200296663/