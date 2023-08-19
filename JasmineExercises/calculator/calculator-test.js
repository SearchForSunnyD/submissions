
it('should calculate the monthly rate correctly', function () {
  // ...
    const values = {amount: 89647, term: 12, rate: 10.2};
    expect(calculateMonthlyPayment(values)).toEqual('1081.74');
});

it("should return a result with 2 decimal places", function() {
  // ..
    const values = {amount: 175890, term: 36, rate: 2.25};
    expect(calculateMonthlyPayment(values)).toBeCloseTo('594.43');
});

/// etc
