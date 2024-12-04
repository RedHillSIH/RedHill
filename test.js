// Importing the Intl API to get timezone support
const getIndianDateTime = () => {
    const indianTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const dateObj = new Date(indianTime);
    const complaintDate = dateObj.toISOString().split("T")[0]; // Extract YYYY-MM-DD
    const complaintTime = dateObj.toTimeString().split(" ")[0]; // Extract HH:MM:SS
    return { complaintDate, complaintTime };
};

const { complaintDate, complaintTime } = getIndianDateTime();

console.log("Complaint Date:", complaintDate); // e.g., 2024-12-05
console.log("Complaint Time:", complaintTime); // e.g., 15:34:21
