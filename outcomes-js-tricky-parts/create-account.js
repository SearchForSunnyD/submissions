function createAccount(pin, amount = 0) {
  function checkBalance(pin) {
    if (this.pin !== pin) return "Invalid PIN.";
    return `$${this.balance}`;
  }
  function deposit(pin, amount) {
    if (this.pin !== pin) return "Invalid PIN.";
    this.balance += amount;
    return `Succesfully deposited $${amount}. Current balance: $${this.balance}.`;
  }
  function withdraw(pin, amount) {
    if (this.pin !== pin) return "Invalid PIN.";
    else if (this.balance < amount)
      return "Withdrawal amount exceeds account balance. Transaction cancelled.";

    this.balance -= amount;
    return `Succesfully withdrew $${amount}. Current balance: $${this.balance}.`;
  }
  function changePin(pin, newPin) {
    if (this.pin !== pin) return "Invalid PIN.";
    this.pin = newPin;
    return "PIN successfully changed!";
  }
  return {
    balance:amount,
    pin,
    checkBalance,
    changePin,
    withdraw,
    deposit,
  };
}

module.exports = { createAccount };
