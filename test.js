// Importing the Intl API to get timezone support
const getIndianDateTime = () => {
    const indianTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const dateObj = new Date(indianTime);
    const complaintDate = dateObj.toISOString().split("T")[0]; // Extract YYYY-MM-DD
    const complaintTime = dateObj.toTimeString().split(" ")[0]; // Extract HH:MM:SS
    return { complaintDate, complaintTime };
};

import { exec } from 'child_process'

function extractMetadata(filePath) {
    exec(`ffprobe -v quiet -print_format json -show_format -show_streams "${filePath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Metadata: ${stdout}`);
    });
}
extractMetadata("https://pbs.twimg.com/media/GeR4GDNWQAASUwg?format=jpg&name=large")