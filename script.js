if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log(err));
    });
}

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('calcBtn').addEventListener('click', () => {
    const Td = parseFloat(document.getElementById('td').value);
    const Tw = parseFloat(document.getElementById('tw').value);
    
    if (isNaN(Td) || isNaN(Tw)) {
        alert("Please enter values for both Dry and Wet bulb.");
        return;
    }

    const P = 1013; 
    const A = 0.0008;
    const getSVP = (t) => 6.11 * Math.exp((17.27 * t) / (t + 237.3));

    const Esd = getSVP(Td); 
    const Esw = getSVP(Tw); 
    const e = Esw - (A * P * (Td - Tw));
    const rh = (e / Esd) * 100;
    const gamma = Math.log(e / 6.11);
    const dp = (237.3 * gamma) / (17.27 - gamma);

    
    document.getElementById('resVP').innerText = e.toFixed(1);
    document.getElementById('resRH').innerText = Math.round(Math.max(0, Math.min(100, rh)));
    document.getElementById('resDP').innerText = Math.round(dp);
    
    document.getElementById('resultsBoard').style.display = 'grid';
});

document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('td').value = '';
    document.getElementById('tw').value = '';
    document.getElementById('resultsBoard').style.display = 'none';
    document.getElementById('resVP').innerText = '--';
    document.getElementById('resRH').innerText = '--';
    document.getElementById('resDP').innerText = '--';
});