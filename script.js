const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

scanner.render(onScanSuccess, onScanError);

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
}

function onScanError(error) {
    console.warn(error);
}
