document.getElementById('togglePricing').addEventListener('change', updatePrices);
document.getElementById('currencySelect').addEventListener('change', updatePrices);

function updatePrices() {
    const isYearly = document.getElementById('togglePricing').checked;
    const currency = document.getElementById('currencySelect').value;

    document.querySelectorAll('.price').forEach(price => {
        const monthly = price.getAttribute(`data-monthly-${currency}`);
        const yearly = price.getAttribute(`data-yearly-${currency}`);
        price.textContent = isYearly ? `${getCurrencySymbol(currency)}${yearly}` : `${getCurrencySymbol(currency)}${monthly}`;
    });
}

function getCurrencySymbol(currency) {
    switch (currency) {
        case 'usd':
            return '$';
        case 'inr':
            return '₹';
        default:
            return '$';
    }
}

// Initialize prices on page load
updatePrices();
