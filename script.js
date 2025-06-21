// --- Global Constants and Assumed Returns ---
// Define the assumed inflation rate (6.5% average annual inflation)
const INFLATION_RATE = 0.065;

const ASSUMED_RETURNS = {
    'fd': 7.5,
    'large_cap': 12.0,
    'mid_cap': 15.0,
    'small_cap': 18.0,
    'conservative_debt': 6.0,
    'hybrid': 10.0,
    'elss': 16.0,
    'gold_etf': 9.0,
    'ultra_high_growth': 20.0
};

// --- Goal Definitions with Sub-Options ---
const GOAL_DEFINITIONS = {
    'bike_car': {
        label: 'Bike/Car Buying',
        sub_options: {
            'commuter': { label: 'Commuter Bike/Car (₹ 2-8 Lakhs)', amount: 500000 },
            'premium': { label: 'Premium Car/SUV (₹ 10-30 Lakhs)', amount: 2000000 },
            'luxury_sports': { label: 'Luxury Car/Sports Bike (₹ 40 Lakhs+)', amount: 6000000 }
        }
    },
    'medical_emergency': {
        label: 'Medical Emergency Fund',
        sub_options: {
            'basic_coverage': { label: 'Basic Coverage (₹ 1.5-3 Lakhs)', amount: 200000 },
            'extensive_coverage': { label: 'Extensive Coverage (₹ 3-6 Lakhs)', amount: 450000 },
            'critical_illness': { label: 'Critical Illness/Major Surgery (₹ 10-20 Lakhs)', amount: 1500000 }
        }
    },
    'marriage': {
        label: 'Marriage Fund',
        sub_options: {
            'simple': { label: 'Simple Ceremony (₹ 5-15 Lakhs)', amount: 1000000 },
            'moderate': { label: 'Moderate Wedding (₹ 20-40 Lakhs)', amount: 3000000 },
            'grand': { label: 'Grand Wedding (₹ 50 Lakhs+)', amount: 7000000 }
        }
    },
    'house': {
        label: 'House Building/Buying Fund',
        sub_options: {
            'tier2_apartment': { label: 'Apartment (Tier 2/3 City) (₹ 15-40 Lakhs)', amount: 2500000 },
            'tier1_apartment': { label: 'Apartment (Tier 1 City) (₹ 50-150 Lakhs)', amount: 8000000 },
            'luxury_villa': { label: 'Luxury Home/Villa (₹ 2 Cr+)', amount: 30000000 }
        }
    },
    'education': {
        label: 'Education Fund',
        sub_options: {
            'normal_indian': { label: 'Normal Indian Colleges (₹ 5-20 Lakhs)', amount: 1000000 },
            'premium_indian': { label: 'Premium Indian Colleges (₹ 25 Lakhs+)', amount: 3000000 },
            'foreign_university': { label: 'Foreign University (₹ 1 Cr+)', amount: 15000000 }
        }
    },
    'tour': {
        label: 'Tour (Foreign or Pan-India Fund)',
        sub_options: {
            'domestic': { label: 'Domestic Tour (₹ 1-3 Lakhs)', amount: 200000 },
            'international_mid': { label: 'International Tour (Mid-range) (₹ 4-8 Lakhs)', amount: 600000 },
            'international_luxury': { label: 'Luxury International Tour (₹ 10 Lakhs+)', amount: 1500000 }
        }
    },
    'business': {
        label: 'Business Fund (Future Venture)',
        sub_options: {
            'small_startup': { label: 'Small Scale Startup (₹ 5-20 Lakhs)', amount: 1000000 },
            'medium_growth': { label: 'Medium Scale Growth (₹ 30-100 Lakhs)', amount: 6000000 },
            'large_venture': { label: 'Large Scale Venture (₹ 1.5 Cr+)', amount: 25000000 }
        }
    },
    'normal_emergency': {
        label: 'Normal Emergency Fund (Others)',
        sub_options: {
            '3_6_months': { label: '3-6 Months Expenses (₹ 0.5-1.5 Lakhs)', amount: 100000 },
            '6_12_months': { label: '6-12 Months Expenses (₹ 1.5-3 Lakhs)', amount: 200000 },
            'contingency_plus': { label: 'Contingency + Small Investment (₹ 3-5 Lakhs)', amount: 400000 }
        }
    }
};


// --- Helper Functions ---

// Categorizes years into predefined time periods for recommendations
function categorizeTimePeriod(years) {
    if (years <= 3) return 'short';
    if (years > 3 && years <= 5) return 'medium';
    if (years > 5 && years <= 10) return 'long';
    if (years > 10) return 'very_long';
    return '';
}

// Determines an assumed return rate for a goal based on risk and years
function getAssumedReturnForGoal(riskAppetite, years) {
    const timeCategory = categorizeTimePeriod(years);

    if (riskAppetite === 'low') {
        if (timeCategory === 'short' || timeCategory === 'medium') return ASSUMED_RETURNS['fd'];
        return ASSUMED_RETURNS['conservative_debt'];
    } else if (riskAppetite === 'medium') {
        if (timeCategory === 'short') return ASSUMED_RETURNS['gold_etf'];
        if (timeCategory === 'medium') return ASSUMED_RETURNS['large_cap'];
        if (timeCategory === 'long') return ASSUMED_RETURNS['hybrid'];
        return ASSUMED_RETURNS['large_cap'];
    } else if (riskAppetite === 'high') {
        if (timeCategory === 'short') return ASSUMED_RETURNS['hybrid'];
        if (timeCategory === 'medium') return ASSUMED_RETURNS['mid_cap'];
        if (timeCategory === 'long') return ASSUMED_RETURNS['elss'];
        return ASSUMED_RETURNS['ultra_high_growth'];
    }
    return ASSUMED_RETURNS['fd'];
}

// Gives a general investment recommendation text based on risk and years
function getGeneralInvestmentRecommendation(riskAppetite, years) {
    let recommendationText = "";
    const timeCategory = categorizeTimePeriod(years);

    if (riskAppetite === 'low') {
        if (timeCategory === 'short' || timeCategory === 'medium') {
            recommendationText = "For your low risk appetite and short to medium-term goal, **Fixed Deposits (FDs)** are recommended for capital preservation and predictable returns.";
        } else if (timeCategory === 'long' || timeCategory === 'very_long') {
            recommendationText = "With a low risk appetite but a longer horizon, **Conservative Debt Mutual Funds** can offer slightly better returns than FDs while maintaining safety.";
        }
    } else if (riskAppetite === 'medium') {
        if (timeCategory === 'short') {
            recommendationText = "For a medium risk appetite and short-term goal, **Gold ETFs** can provide diversification and moderate risk.";
        } else if (timeCategory === 'medium') {
            recommendationText = "A medium risk appetite and medium-term goal aligns well with **Large Cap Mutual Funds** for steady growth.";
        } else if (timeCategory === 'long' || timeCategory === 'very_long') {
            recommendationText = "With a medium risk appetite and long-term goal, **Hybrid Mutual Funds** offer a balanced approach, mixing equity and debt for growth with managed volatility.";
        }
    } else if (riskAppetite === 'high') {
        if (timeCategory === 'short' || timeCategory === 'medium') {
            recommendationText = "Even with a high risk appetite, short to medium terms for aggressive equity can be volatile. **Hybrid Mutual Funds** can provide exposure with some balance.";
        } else if (timeCategory === 'long') {
            recommendationText = "For a high risk appetite and a long-term goal, **ELSS (Equity Linked Saving Schemes)** are excellent for potential high growth, with additional tax benefits.";
        } else if (timeCategory === 'very_long') {
            recommendationText = "Outstanding! For a high risk appetite and very long-term goal, **Ultra High Growth (e.g., Small Cap or aggressive Multi-Cap) Mutual Funds** are recommended for maximum wealth creation to achieve significant lump sums.";
        }
    }
    return recommendationText;
}

// Calculates the real (inflation-adjusted) value of a future nominal amount
function calculateRealValue(nominalFutureValue, years, inflationRate) {
    if (years <= 0) return nominalFutureValue;
    return nominalFutureValue / Math.pow((1 + inflationRate), years);
}

// --- Financial Calculation Functions ---

// Calculates Future Value of a Lump Sum
function calculateFutureValueLumpSum(principal, annualRate, years) {
    return principal * Math.pow((1 + annualRate), years);
}

// Calculates Future Value of Monthly SIP (Annuity Due - payment at beginning of period)
function calculateFutureValueMonthlySIP(monthlyPayment, annualRate, years) {
    const monthlyRate = annualRate / 12;
    const numberOfMonths = years * 12;
    if (monthlyRate === 0) return monthlyPayment * numberOfMonths;
    return monthlyPayment * ((Math.pow((1 + monthlyRate), numberOfMonths) - 1) / monthlyRate) * (1 + monthlyRate);
}

// Calculates Required Lump Sum (Present Value) for a Future Target
function calculateRequiredLumpSum(futureValue, annualRate, years) {
    if (years === 0) return futureValue;
    return futureValue / Math.pow((1 + annualRate), years);
}

// Calculates Required Monthly SIP for a Future Target (Reverse of Annuity Due)
function calculateRequiredMonthlySIP(futureValue, annualRate, years) {
    const monthlyRate = annualRate / 12;
    const numberOfMonths = years * 12;
    if (numberOfMonths === 0) return Infinity;
    if (monthlyRate === 0) return futureValue / numberOfMonths;

    const denominator = ((Math.pow((1 + monthlyRate), numberOfMonths) - 1) / monthlyRate) * (1 + monthlyRate);

    if (denominator === 0) return Infinity;
    return futureValue / denominator;
}


// --- DOM Element References ---

// Tab Elements
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Fund Analyzer Elements
const riskAppetiteSelect = document.getElementById('riskAppetite');
const investmentYearsInput = document.getElementById('investmentYears');
const investmentAmountInput = document.getElementById('investmentAmount');
const getRecommendationBtn = document.getElementById('getRecommendationBtn');
const resultsDiv = document.getElementById('results');
const investmentFrequencyRadios = document.querySelectorAll('input[name="investmentType"]');

// Future Planning Elements
const goalSelect = document.getElementById('goalSelect');
const subOptionsContainer = document.getElementById('subOptionsContainer');
const subOptionSelect = document.getElementById('subOptionSelect');
const goalYearsInput = document.getElementById('goalYears');
const goalRiskAppetiteSelect = document.getElementById('goalRiskAppetite');
const calculateGoalBtn = document.getElementById('calculateGoalBtn');
const goalResultsDiv = document.getElementById('goalResults');
const canSaveAmountGroup = document.getElementById('canSaveAmountGroup');
const canSaveAmountInput = document.getElementById('canSaveAmount');
const canSaveTypeRadios = document.querySelectorAll('input[name="canSaveType"]');
const recalculateGoalBtn = document.getElementById('recalculateGoalBtn');

// --- Event Listeners ---

// Tab Switching Logic
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// --- Fund Analyzer Logic ---
getRecommendationBtn.addEventListener('click', function() {
    const selectedRisk = riskAppetiteSelect.value;
    const inputYears = parseInt(investmentYearsInput.value);
    const investmentAmount = parseFloat(investmentAmountInput.value);

    let selectedFrequency = '';
    for (const radio of investmentFrequencyRadios) {
        if (radio.checked) {
            selectedFrequency = radio.value;
            break;
        }
    }

    // Input validation
    if (!selectedRisk || selectedRisk === "" || isNaN(inputYears) || inputYears < 1 || isNaN(investmentAmount) || investmentAmount < 1000 || !selectedFrequency) {
        resultsDiv.innerHTML = '<p style="color: red;">Please select your risk appetite, enter a valid investment period (at least 1 year), investment frequency, and enter a valid amount (at least ₹ 1,000).</p>';
        resultsDiv.style.borderColor = 'red';
        return;
    }
    resultsDiv.style.borderColor = '#e0e0e0';

    const recommendationText = getGeneralInvestmentRecommendation(selectedRisk, inputYears);
    const assumedAnnualReturn = getAssumedReturnForGoal(selectedRisk, inputYears);

    let resultsHTML = `<h3>Our Recommendation:</h3>
                       <p><strong>${recommendationText}</strong></p>`;

    // Potential Future Value Calculation
    if (assumedAnnualReturn) {
        let futureValue = 0; // Nominal future value
        let calculationText = "";

        if (selectedFrequency === 'lumpSum') {
            futureValue = calculateFutureValueLumpSum(investmentAmount, assumedAnnualReturn / 100, inputYears);
            calculationText = `(Starting with a lump sum of ₹ ${investmentAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})})`;
        } else if (selectedFrequency === 'monthly') {
            futureValue = calculateFutureValueMonthlySIP(investmentAmount, assumedAnnualReturn / 100, inputYears);
            calculationText = `(Investing ₹ ${investmentAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})} per month)`;
        }

        // Calculate inflation-adjusted real value
        const realFutureValue = calculateRealValue(futureValue, inputYears, INFLATION_RATE);

        resultsHTML += `<div class="potential-value-box">
                            <h4>Potential Future Value (Nominal):</h4>
                            <p>₹ ${futureValue.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                            <h4>Potential Future Value (Inflation-Adjusted / Today's Purchasing Power):</h4>
                            <p style="color: #28a745; font-size: 1.2em;">₹ ${realFutureValue.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                            <small><i>${calculationText}</i></small><br>
                            <small><i>(Assuming ~${assumedAnnualReturn.toFixed(1)}% average annual return and ${INFLATION_RATE * 100}% average annual inflation)</i></small>
                        </div>`;
    }

    resultsDiv.innerHTML = resultsHTML;
});

// --- Future Planning Logic ---

let currentBaseTargetAmount = 0; // Stores the original target amount (today's purchasing power)
let currentInflationAdjustedTargetAmount = 0; // Stores the inflated target amount (nominal future cost)
let currentGoalYears = 0;
let currentGoalRiskAppetite = '';
let currentGoalDisplayLabel = ''; // To store the full label for recalculation display

// Dynamically populate sub-options based on main goal selection
goalSelect.addEventListener('change', function() {
    const selectedGoalKey = goalSelect.value;
    const goalDefinition = GOAL_DEFINITIONS[selectedGoalKey];

    subOptionSelect.innerHTML = '<option value="">Select Specific Type</option>'; // Clear existing options
    
    if (goalDefinition && goalDefinition.sub_options) {
        for (const subKey in goalDefinition.sub_options) {
            const optionData = goalDefinition.sub_options[subKey];
            const optionElement = document.createElement('option');
            optionElement.value = subKey;
            optionElement.textContent = optionData.label;
            subOptionSelect.appendChild(optionElement);
        }
        subOptionsContainer.style.display = 'block'; // Show the sub-options select
    } else {
        subOptionsContainer.style.display = 'none'; // Hide if no sub-options
    }

    goalResultsDiv.innerHTML = ''; // Clear previous results
    canSaveAmountGroup.style.display = 'none'; // Hide "Can Save" option
});

// Calculate Goal Button Logic
calculateGoalBtn.addEventListener('click', function() {
    const selectedGoalKey = goalSelect.value;
    const goalYears = parseInt(goalYearsInput.value);
    const goalRiskAppetite = goalRiskAppetiteSelect.value;

    let baseTargetAmount = 0; // The amount in today's purchasing power for the goal
    let goalDisplayLabel = '';
    const goalDefinition = GOAL_DEFINITIONS[selectedGoalKey];

    // Input validation for goal calculation
    if (!selectedGoalKey || selectedGoalKey === "" || isNaN(goalYears) || goalYears < 1 || !goalRiskAppetite || goalRiskAppetite === "") {
        goalResultsDiv.innerHTML = '<p style="color: red;">Please select a goal, enter years to goal (at least 1 year), and your risk appetite for this goal.</p>';
        goalResultsDiv.style.borderColor = 'red';
        canSaveAmountGroup.style.display = 'none';
        return;
    }
    goalResultsDiv.style.borderColor = '#e0e0e0';
    canSaveAmountGroup.style.display = 'none'; // Hide "Can Save" until initial calculation is done

    // Determine the base target amount from GOAL_DEFINITIONS
    if (goalDefinition && goalDefinition.sub_options) {
        const selectedSubOptionKey = subOptionSelect.value;
        if (!selectedSubOptionKey || selectedSubOptionKey === "") {
            goalResultsDiv.innerHTML = '<p style="color: red;">Please select a specific type for your goal.</p>';
            goalResultsDiv.style.borderColor = 'red';
            return;
        }
        baseTargetAmount = goalDefinition.sub_options[selectedSubOptionKey].amount;
        goalDisplayLabel = goalDefinition.sub_options[selectedSubOptionKey].label;
    } else {
        // This case should ideally not be hit if all goals have sub_options
        // But for safety, use a default if somehow a goal without sub_options is selected
        // This 'target_amount' field does not exist for the new GOAL_DEFINITIONS structure
        // This path effectively won't be taken with the current GOAL_DEFINITIONS
        goalResultsDiv.innerHTML = '<p style="color: red;">Error: Goal definition not found or no sub-option selected.</p>';
        return;
    }

    // Inflate the base target amount to get the nominal future amount needed
    const inflationAdjustedTargetAmount = baseTargetAmount * Math.pow((1 + INFLATION_RATE), goalYears);

    currentBaseTargetAmount = baseTargetAmount;
    currentInflationAdjustedTargetAmount = inflationAdjustedTargetAmount; // Store the inflated target
    currentGoalYears = goalYears;
    currentGoalRiskAppetite = goalRiskAppetite;
    currentGoalDisplayLabel = goalDisplayLabel; // Store full label

    const assumedAnnualReturn = getAssumedReturnForGoal(goalRiskAppetite, goalYears);
    const annualRate = assumedAnnualReturn / 100;

    let requiredLumpSum = 0;
    let requiredMonthlySIP = 0;

    if (goalYears > 0) { // Ensure years are positive
        if (annualRate === 0) { // Special case for 0% return
            requiredLumpSum = inflationAdjustedTargetAmount;
            requiredMonthlySIP = inflationAdjustedTargetAmount / (goalYears * 12);
        } else {
            // Calculate required investments to reach the inflation-adjusted target
            requiredLumpSum = calculateRequiredLumpSum(inflationAdjustedTargetAmount, annualRate, goalYears);
            requiredMonthlySIP = calculateRequiredMonthlySIP(inflationAdjustedTargetAmount, annualRate, goalYears);
        }
    } else { // GoalYears is 0 or invalid
        goalResultsDiv.innerHTML = '<p style="color: red;">Please enter a valid number of years for your goal.</p>';
        return;
    }


    let resultsHTML = `<h3>Goal: ${goalDisplayLabel}</h3>
                       <p>Your goal requires the purchasing power of <strong>₹ ${baseTargetAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})} today</strong>, which you need in <strong>${goalYears} years</strong>.</p>
                       <p>Due to an estimated <strong>${(INFLATION_RATE * 100).toFixed(1)}%</strong> average annual inflation, the actual nominal amount you will need at that time is:</p>
                       <div class="potential-value-box" style="background-color: #ffe0b2; border-color: #ff9800;">
                           <h4>Projected Nominal Target Amount in ${goalYears} years:</h4>
                           <p>₹ ${inflationAdjustedTargetAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                       </div>
                       <p style="margin-top: 15px;">To achieve this (inflated) target, considering a <strong>${assumedAnnualReturn.toFixed(1)}%</strong> average annual investment return for your <strong>${goalRiskAppetite}</strong> risk appetite, you would need:</p>
                       <div class="potential-value-box">
                           <h4>Required One-Time Lump Sum:</h4>
                           <p>₹ ${requiredLumpSum.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                       </div>
                       <div class="potential-value-box" style="margin-top: 15px;">
                           <h4>OR Required Monthly SIP:</h4>
                           <p>₹ ${requiredMonthlySIP.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                       </div>
                       <p>Recommendation: ${getGeneralInvestmentRecommendation(goalRiskAppetite, goalYears)}</p>`;

    goalResultsDiv.innerHTML = resultsHTML;
    canSaveAmountGroup.style.display = 'block'; // Show the "Can Save" input
});

// Recalculate Goal Button Logic (Based on what user CAN save)
recalculateGoalBtn.addEventListener('click', function() {
    const canSaveAmount = parseFloat(canSaveAmountInput.value);
    let canSaveFrequency = '';
    for (const radio of canSaveTypeRadios) {
        if (radio.checked) {
            canSaveFrequency = radio.value;
            break;
        }
    }

    if (isNaN(canSaveAmount) || canSaveAmount < 1000 || !canSaveFrequency) {
        goalResultsDiv.innerHTML += '<p style="color: red; margin-top: 15px;">Please enter a valid "can save" amount (at least ₹ 1,000) and select frequency.</p>';
        goalResultsDiv.style.borderColor = 'red';
        return;
    }
    goalResultsDiv.style.borderColor = '#e0e0e0'; // Reset border color

    // Ensure we have previous calculation data (using the inflation-adjusted target for comparison)
    if (currentInflationAdjustedTargetAmount === 0 || currentGoalYears === 0 || currentGoalRiskAppetite === '') {
        goalResultsDiv.innerHTML += '<p style="color: red; margin-top: 15px;">Please calculate your initial goal first.</p>';
        return;
    }

    const assumedAnnualReturn = getAssumedReturnForGoal(currentGoalRiskAppetite, currentGoalYears);
    const annualRate = assumedAnnualReturn / 100;

    let achievableAmount = 0; // Nominal achievable amount
    let calculationSummary = "";
    let recommendationForAchievable = "";

    if (canSaveFrequency === 'lumpSum') {
        achievableAmount = calculateFutureValueLumpSum(canSaveAmount, annualRate, currentGoalYears);
        calculationSummary = `(Investing a lump sum of ₹ ${canSaveAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})})`;
    } else { // monthly
        achievableAmount = calculateFutureValueMonthlySIP(canSaveAmount, annualRate, currentGoalYears);
        calculationSummary = `(Investing ₹ ${canSaveAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})} per month)`;
    }

    // Calculate inflation-adjusted real achievable amount
    const realAchievableAmount = calculateRealValue(achievableAmount, currentGoalYears, INFLATION_RATE);

    let gapMessage = '';
    // Compare real achievable amount with the original base target amount (today's purchasing power)
    if (realAchievableAmount < currentBaseTargetAmount) {
        const shortfall = currentBaseTargetAmount - realAchievableAmount;
        gapMessage = `<p style="color: orange; font-weight: bold; margin-top: 15px;">This saving might result in a shortfall of about ₹ ${shortfall.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})} (in today's purchasing power) from your goal.</p>`;

        let additionalAdvice = "";
        if (currentGoalRiskAppetite === 'high' && currentGoalYears > 7) {
            additionalAdvice = "Consider increasing your investment amount or exploring even more aggressive (higher risk) options if appropriate for your risk tolerance and goal criticality.";
        } else if (canSaveFrequency === 'monthly') {
            additionalAdvice = "To bridge the gap, you might need to increase your monthly savings, extend your timeframe, or consider higher-risk investments if comfortable.";
        } else {
             additionalAdvice = "To bridge the gap, you might need to increase your lump sum investment, extend your timeframe, or consider higher-risk investments if comfortable.";
        }
        recommendationForAchievable = getGeneralInvestmentRecommendation(currentGoalRiskAppetite, currentGoalYears) + "<br>" + additionalAdvice;

    } else {
        recommendationForAchievable = getGeneralInvestmentRecommendation(currentGoalRiskAppetite, currentGoalYears) + "<br>This saving plan is on track to meet or exceed your goal! Well done!";
    }

    let currentHTML = goalResultsDiv.innerHTML;
    currentHTML += `<div class="potential-value-box" style="margin-top: 25px; background-color: #f0f8ff; border-color: #87ceeb;">
                        <h4>Achievable Fund in ${currentGoalYears} years:</h4>
                        <p style="font-size: 1.1em; color: #34495e;">Nominal Value: <strong>₹ ${achievableAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong></p>
                        <p style="font-size: 1.2em; font-weight: bold; color: #1e90ff;">Real Value (Today's Purchasing Power): <strong>₹ ${realAchievableAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong></p>
                        <small><i>${calculationSummary} over ${currentGoalYears} years, assuming ~${assumedAnnualReturn.toFixed(1)}% average annual return and ${(INFLATION_RATE * 100).toFixed(1)}% average annual inflation.</i></small>
                    </div>
                    ${gapMessage}
                    <p style="margin-top: 15px;"><strong>Revised Investment Suggestion:</strong> ${recommendationForAchievable}</p>`;

    goalResultsDiv.innerHTML = currentHTML;
});