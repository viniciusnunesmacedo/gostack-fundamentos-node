import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (transaction.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (transaction.value > balance.balance.total) {
        throw Error('No have this value.');
      }
    }

    const transactionSaved = this.transactionsRepository.create(transaction);

    return transactionSaved;
  }
}

export default CreateTransactionService;
