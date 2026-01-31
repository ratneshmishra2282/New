const form = document.getElementById("appointmentForm");
const statusMsg = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: form[0].value,
        email: form[1].value,
        date: form[2].value,
        message: form[3].value
    };

    const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
        statusMsg.innerText = "Appointment booked successfully.";
        form.reset();
    }
});

function openWhatsApp() {
    const phone = "916388205751"; // your number
    const msg = encodeURIComponent(
        "Hello, I would like to discuss enterprise IT solutions."
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}
