import Transaction from '../models/Transaction';

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  /* public getBalance(): Balance {
    const income = 3000;
    const outcome = 1000;
    const total = 2000;

    return {
      income,
      outcome,
      total,
    };
  } */

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
