document.getElementById("impact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get user input
    let paper = parseFloat(document.getElementById("paper").value);
    let plastic = parseFloat(document.getElementById("plastic").value);
    let glass = parseFloat(document.getElementById("glass").value);
    let aluminum = parseFloat(document.getElementById("aluminum").value);

    // Constants for impact values (per kg)
    const paperCO2 = 1.3; // kg CO2 per kg of paper recycled
    const plasticCO2 = 6.0; // kg CO2 per kg of plastic recycled
    const glassCO2 = 0.6; // kg CO2 per kg of glass recycled
    const aluminumCO2 = 9.0; // kg CO2 per kg of aluminum recycled

    // Calculate CO2 savings
    let totalCO2 = (paper * paperCO2) + (plastic * plasticCO2) + (glass * glassCO2) + (aluminum * aluminumCO2);

    // Example calculations for water and energy (You can add more complex formulas here)
    let waterSaved = (paper * 100) + (plastic * 50) + (glass * 10) + (aluminum * 5); // In gallons
    let energySaved = (paper * 30) + (plastic * 200) + (glass * 50) + (aluminum * 250); // In kWh

    // Display results
    document.getElementById("co2").textContent = totalCO2.toFixed(2);
    document.getElementById("water").textContent = waterSaved.toFixed(2);
    document.getElementById("energy").textContent = energySaved.toFixed(2);

    // Show results
    document.getElementById("results").style.display = "block";

    // Show chart (using Chart.js)
    let ctx = document.getElementById("impactChart").getContext("2d");
    let impactChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Paper', 'Plastic', 'Glass', 'Aluminum'],
            datasets: [{
                label: 'Impact Breakdown',
                data: [
                    (paper * paperCO2) / totalCO2,
                    (plastic * plasticCO2) / totalCO2,
                    (glass * glassCO2) / totalCO2,
                    (aluminum * aluminumCO2) / totalCO2
                ],
                backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99']
            }]
        }
    });

    document.getElementById("chart").style.display = "block";
});
