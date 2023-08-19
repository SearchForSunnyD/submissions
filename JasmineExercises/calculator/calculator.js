window.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("calc-form")
    if (form) {
        setupIntialValues();
        form.addEventListener("submit", function(e) {
        e.preventDefault();
        update();
        });
    }
});



function getCurrentUIValues() {
    return {
        amount: +(document.getElementById("loan-amount").value),
        years: +(document.getElementById("loan-years").value),
        rate: +(document.getElementById("loan-rate").value),
    }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
    const amount = document.getElementById("loan-amount")
    const term = document.getElementById("loan-years")
    const rate = document.getElementById("loan-rate")
    amount.value = 17500
    term.value = 25
    rate.value = 8.9
    update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
    const values = {}
    const amount = document.getElementById("loan-amount")
    const term = document.getElementById("loan-years")
    const rate = document.getElementById("loan-rate")
    values.amount = [amount.value]
    values.term = [term.value]
    values.rate = [rate.value]
    updateMonthly(calculateMonthlyPayment(values))
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
    let p = values.amount
    let i = (values.rate/12)/100
    let n = values.term*12
    return `${((p * i)/(1-((1+i)**(-1 * n)))).toFixed(2)}`
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
    const payment = document.getElementById("monthly-payment")
    payment.innerText =
    `$${(document.getElementById("loan-amount").value)} over ${(document.getElementById("loan-years").value)} years at a ${(document.getElementById("loan-rate").value)}% rate
    
    Monthly payment: ${monthly}`
}
