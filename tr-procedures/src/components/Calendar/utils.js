function getDayNames(day) {
    if (day.toLowerCase() === 'monday') {
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    } else {
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }
}
function formatTime(hours, minutes) {
    var formattedHours = hours < 10 ? "0" + hours : hours;
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return formattedHours + ":" + formattedMinutes;
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${dayOfWeek} ${month} ${day} ${year} 00:00:00 GMT+0530 (India Standard Time)`;
}
function formatDateString(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export {
    getDayNames,
    formatTime,
    formatDate,
    formatDateString
}