const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const DATA_FILE = "appointments.json";

app.post("/api/appointment", (req, res) => {
    const { name, email, date, message } = req.body;

    if (!name || !email || !date) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newAppointment = {
        id: Date.now(),
        name,
        email,
        date,
        message
    };

    let data = [];
    if (fs.existsSync(DATA_FILE)) {
        data = JSON.parse(fs.readFileSync(DATA_FILE));
    }

    data.push(newAppointment);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json({ success: true });
});

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
