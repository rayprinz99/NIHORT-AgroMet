if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log("Service Worker Registered"))
      .catch((err) => console.log("Service Worker Failed", err));
  }
  
document.getElementById('calcBtn').addEventListener('click', function() {
    // 1. Grab inputs
    const T = parseFloat(document.getElementById('dry').value);
    const Tw = parseFloat(document.getElementById('wet').value);
    const P = 1013.25; // Standard Sea Level Pressure

    // Validation
    if (isNaN(T) || isNaN(Tw)) {
        alert("Please enter valid temperatures.");
        return;
    }
    if (Tw > T) {
        alert("Wet bulb cannot be higher than dry bulb.");
        return;
    }

    // 2. Constants for the Magnus-Tetens formula
    const a = 6.112;
    const m = 7.5;
    const Tn = 237.3;

    // 3. Calculation Steps
    // Saturation Vapour Pressure at Wet Bulb
    const ew = a * Math.pow(10, (m * Tw) / (Tw + Tn));
    
    // Actual Vapour Pressure (e) via Psychrometric Equation
    const e = ew - (0.00066 * (1 + 0.00115 * Tw) * P * (T - Tw));
    
    // Saturation Vapour Pressure at Dry Bulb
    const es = a * Math.pow(10, (m * T) / (T + Tn));
    
    // Relative Humidity (%)
    const rh = (e / es) * 100;
    
    // Dew Point (°C)
    const logE = Math.log10(e / a);
    const dp = (Tn * logE) / (m - logE);

    // 4. Update UI
    document.getElementById('resVP').innerText = e.toFixed(2);
    document.getElementById('resRH').innerText = Math.min(100, Math.max(0, rh)).toFixed(1);
    document.getElementById('resDP').innerText = dp.toFixed(1);

    // Show the results section
    document.getElementById('resultsBoard').style.display = 'grid';

});

