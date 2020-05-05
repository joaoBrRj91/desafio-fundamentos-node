import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface ListTransactionData {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionWithBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): ListTransactionData {
    const transactions = this.transactionsRepository.all();
    const balance = this.generatedBalanceTransactions(transactions);

    return {
      transactions,
      balance,
    };
  }

  private generatedBalanceTransactions(transactions: Transaction[]): Balance {
    const balance = transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    balance.total = balance.income - balance.outcome;
    return balance;
  }
}

export default GetTransactionWithBalanceService;
