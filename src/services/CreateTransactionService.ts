import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import GetTransactionWithBalanceService from './GetTransactionWithBalanceService';

interface CreateTransactionData {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  private transactionWithBalanceService: GetTransactionWithBalanceService;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
    this.transactionWithBalanceService = new GetTransactionWithBalanceService(
      transactionsRepository,
    );
  }

  public execute({ title, value, type }: CreateTransactionData): Transaction {
    const { balance } = this.transactionWithBalanceService.execute();

    if (type === 'outcome' && value > balance.total) {
      throw new Error('Value of the transaction is lower than total balance');
    }

    const newTransaction = this.transactionsRepository.create(
      new Transaction({
        title,
        value,
        type,
      }),
    );

    return newTransaction;
  }
}

export default CreateTransactionService;
