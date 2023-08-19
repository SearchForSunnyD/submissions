describe("Helper test", function() {
    it(`should return the sum of the object's object keys`, function () {
        allPayments = {1 : {first: '1', second: '4', third: 6}, 2 : {first: '2', second: '5', third: '7'}}

        expect(sumPaymentTotal('first')).toEqual(3)
        expect(sumPaymentTotal('second')).toEqual(9)
        expect(sumPaymentTotal('third')).toEqual(13)
        
        allPayments = {}
    });
    it(`should return a percentage rounded up`, function () {
        expect(calculateTipPercent(20,2)).toEqual(10)
        expect(calculateTipPercent(5,2)).toEqual(40)
        expect(calculateTipPercent(174,12)).toEqual(7)
    });
    it(`add a new td element to the tr provided`, function () {
        let newTr = document.createElement('tr')

        appendTd(newTr, 'Text')
        expect(newTr.firstChild.textContent).toEqual('Text')
    });
    it(`add a new td element that will delete its parent to the tr provided`, function () {
        let newTr = document.createElement('tr')

        appendDelete(newTr)
        expect(newTr.firstChild.textContent).toEqual('X')
    });
});
