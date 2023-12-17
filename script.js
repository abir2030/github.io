function calculateMargin() {
    let currentPrice = document.getElementById('currentPrice').value;
    let lotSize = document.getElementById('lotSize').value;
    let contractSize = document.getElementById('contractSize').value;
    let leverage = document.getElementById('leverage').value;

    if (leverage && currentPrice && lotSize && contractSize) {
        let margin = (currentPrice * lotSize * contractSize) / leverage;
        document.getElementById('result').innerText = `Margin Required: $${margin.toFixed(2)}`;
    } else {
        document.getElementById('result').innerText = 'Please fill all fields correctly.';
    }
}

function updateLeverageAndContractSize() {
    let accountModel = document.getElementById('accountModel').value;
    let phaseModel = document.getElementById('phaseModel').value;
    let assetType = document.getElementById('assetType').value;
    let leverage = getLeverage(accountModel, phaseModel, assetType);
    let contractSize = getContractSize(assetType);
    document.getElementById('leverage').value = leverage;
    document.getElementById('contractSize').value = contractSize;
}

function getLeverage(accountModel, phaseModel, assetType) {
    if (accountModel === "Evaluation" || accountModel === "Express") {
        if (phaseModel === "Challenge") {
            return assetType === "Forex" ? 100 : 50;
        } else { // FundedNext Phase
            return assetType === "Forex" ? 100 : (assetType === "Indices" ? 25 : 50);
        }
    } else if (accountModel === "Stellar1Step") {
        return assetType === "Forex" ? 30 : (assetType === "Indices" ? 5 : 10);
    } else if (accountModel === "Stellar2Step") {
        return assetType === "Forex" ? 100 : (assetType === "Indices" ? 20 : 40);
    }
    // Default leverage if none matches
    return 100;
}

function getContractSize(assetType) {
    switch (assetType) {
        case "Forex": return 100000;
        case "Indices": return 10;
        case "Commodities": return 100;
        case "XAGUSD": return 5000; // Special case for Silver
        default: return 1; // Default contract size if none matches
    }
}

// Initialize default leverage and contract size on page load
document.addEventListener('DOMContentLoaded', function() {
    updateLeverageAndContractSize();
});

// Update contract size when asset type changes
document.getElementById('assetType').addEventListener('change', function() {
    updateLeverageAndContractSize();
});
