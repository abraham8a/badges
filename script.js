const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

function startScanner() {
    scanner.render(onScanSuccess, onScanError);
}

startScanner(); // Initial start

function onScanSuccess(decodedText) {
    scanner.clear();
    let scannedDate;
    try {
        scannedDate = new Date(decodedText.trim());
        if (isNaN(scannedDate)) throw new Error("Invalid date");
    } catch (e) {
        document.body.innerHTML = "<p>Invalid QR content: Must be a valid date (e.g., YYYY-MM-DD).</p>";
        return;
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Normalize to date only
    scannedDate.setHours(0, 0, 0, 0);

    const resultDiv = document.createElement("div");
    if (currentDate <= scannedDate) {
        resultDiv.className = "valid";
        resultDiv.textContent = "VALID";
    } else {
        resultDiv.className = "invalid";
        resultDiv.textContent = "INVALID / EXPIRED";
    }
    document.body.innerHTML = "";
    document.body.appendChild(resultDiv);

    // Auto-return to scanner after 3 seconds
    setTimeout(() => {
        document.body.innerHTML = `
            <h1>Scan QR Code for Date Validation</h1>
            <div id="reader" style="width: 300px; margin: auto;"></div>
            <p id="result"></p>
        `;
        startScanner(); // Restart scanner
    }, 3000);
}

function onScanError(error) {
    console.warn(error);
}
