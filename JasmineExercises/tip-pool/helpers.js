
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
    let total = 0;

    for (let key in allPayments) {
        let payment = allPayments[key];

        total += Number(payment[type]);
    }

    return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
    return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
    let newTd = document.createElement('td');

    newTd.innerText = value;
    tr.append(newTd);
}

//expects a td element, appends a delete button that will delete the targets parent
function appendDelete(tr) {
    let deleteButton = document.createElement('td')
    
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', removeParent)
    deleteButton.classList = 'deleteBtn'
    tr.append(deleteButton);
}
function removeParent(evt){
    let target = evt.target
    
    if(target.parentNode.id.includes('server')){
        delete allServers[target.parentNode.id]
    }else if(target.parentNode.id.includes('payment')){
        delete allPayments[target.parentNode.id]
        updateSummary()
    }
    updateServerTable()
    
    target.parentNode.remove()
}
