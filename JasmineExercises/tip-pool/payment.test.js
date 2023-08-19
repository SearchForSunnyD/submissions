describe("Payment test (with setup and tear-down)", function() {
    beforeEach(function () {
        // initialization logic
        billAmtInput.value = 174
        tipAmtInput.value = 12
    });
    
    it('should update table w/ payment info', function () {
        submitPaymentInfo()

        expect(paymentTbody.lastChild.childNodes[0].textContent).toEqual('$174');
        expect(paymentTbody.lastChild.childNodes[1].textContent).toEqual('$12');
        expect(paymentTbody.lastChild.childNodes[2].textContent).toEqual('7%');
    });
    it('should NOT update table w/ payment info if both fields are not complete', function () {
        billAmtInput.value = ''
        tipAmtInput.value = ''
        submitPaymentInfo()
        expect(paymentTbody.innerHTML).toEqual('');
    });
    it('should add a new table element', function () {
        let curPayment = {billAmt: '', tipAmt: '', tipPercent: ''}
        appendPaymentTable(curPayment)

        expect(paymentTbody.childNodes).not.toEqual('')
    });
    it('create a payment object', function () {
        expect(createCurPayment()).toEqual({billAmt: '174', tipAmt: '12', tipPercent: 7})
    });
    it('append a payment object to the payment table', function () {
        let curPayment = createCurPayment();
        appendPaymentTable(curPayment);

        expect(paymentTbody.lastChild.childNodes[0].textContent).toEqual('$174');
        expect(paymentTbody.lastChild.childNodes[1].textContent).toEqual('$12');
        expect(paymentTbody.lastChild.childNodes[2].textContent).toEqual('7%');
    });
    it('add new payment to summary table and recalculate tip average percent', function () {
        submitPaymentInfo()
        billAmtInput.value = 26
        tipAmtInput.value = 8
        submitPaymentInfo()
        expect(summaryTds[0].innerText).toEqual('$200');
        expect(summaryTds[1].innerText).toEqual('$20');
        expect(summaryTds[2].innerText).toEqual('19%');
    });

    afterEach(function() {
        // teardown logic
        allPayments = {}
        paymentId = 0
        paymentTbody.innerHTML = ''
        summaryTds[0].innerHTML = ''
        summaryTds[1].innerHTML = ''
        summaryTds[2].innerHTML = ''
        billAmtInput.value = ''
        tipAmtInput.value = ''
    });
});
