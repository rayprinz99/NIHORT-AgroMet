if ('serviceWorker' in navigator) {
    window.addEventListener('load' , () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log("Service Worker Registered"))
      .catch((err) => console.log("Service Worker Failed", err));
    });
  }
  
document.getElementById('calcBtn').addEventListener('click', function() {
    const T = parseFloat(document.getElementById('dry').value);
    const Tw = parseFloat(document.getElementById('wet').value);
    const P = 1013.25;

    if (isNaN(T) || isNaN(Tw)) {
        alert("Please enter valid temperatures.");
        return;
    }
    if (Tw > T) {
        alert("Wet bulb cannot be higher than dry bulb.");
        return;
    }

    const a = 6.112;
    const m = 7.5;
    const Tn = 237.3;

    const ew = a * Math.pow(10, (m * Tw) / (Tw + Tn));
    
    const e = ew - (0.00066 * (1 + 0.00115 * Tw) * P * (T - Tw));
    
    const es = a * Math.pow(10, (m * T) / (T + Tn));
    
    const rh = (e / es) * 100;
    
    const logE = Math.log10(e / a);
    const dp = (Tn * logE) / (m - logE);

    document.getElementById('resVP').innerText = e.toFixed(2);
    document.getElementById('resRH').innerText = Math.min(100, Math.max(0, rh)).toFixed(1);
    document.getElementById('resDP').innerText = dp.toFixed(1);

    document.getElementById('resultsBoard').style.display = 'grid';

});