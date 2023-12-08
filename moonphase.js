
const moonPhases = [
    "New Moon", 
    "Waxing Crescent Moon", 
    "First Quarter Moon", 
    "Waxing Gibbous Moon", 
    "Full Moon", 
    "Waning Gibbous Moon", 
    "Last Quarter Moon", 
    "Waning Crescent Moon"
];

function getMoonPhase(index) {
    return moonPhases[index % moonPhases.length];
}

function formatDate(date, timezone) {
    // Convert the date to the specified timezone
    let options = { timeZone: timezone, hour12: false, 
                    year: 'numeric', month: 'numeric', day: 'numeric', 
                    hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function updateMoonPhases() {
    const selectedTimezone = document.getElementById('timezoneSelect').value;
    displayCurrentMoonPhase(selectedTimezone);
    displayUpcomingMoonPhases(selectedTimezone);
}

function displayCurrentMoonPhase(timezone) {
    const currentPhaseIndex = new Date().getUTCDate() % moonPhases.length;
    const currentDate = new Date();
    document.getElementById('currentMoonPhase').innerText = 
        `Today's Moon Phase in ${timezone}: ${getMoonPhase(currentPhaseIndex)} (${formatDate(currentDate, timezone)})`;
}

function displayUpcomingMoonPhases(timezone) {
    const currentPhaseIndex = new Date().getUTCDate() % moonPhases.length;
    const upcomingPhasesList = document.getElementById('upcomingMoonPhases');
    upcomingPhasesList.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
        const futureDate = new Date();
        futureDate.setUTCDate(futureDate.getUTCDate() + i);
        const phaseIndex = (currentPhaseIndex + i) % moonPhases.length;

        const listItem = document.createElement('li');
        listItem.innerText = `${getMoonPhase(phaseIndex)} on ${formatDate(futureDate, timezone)}`;
        upcomingPhasesList.appendChild(listItem);
    }
}
document.getElementById('timezoneSelect').addEventListener('change', updateMoonPhases);

updateMoonPhases();
