import Transaction from '../models/Transaction';

interface Balance {
  transactions: Transaction[];
  balance: {
    income: number;
    outcome: number;
    total: number;
  };
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let totalIncome = 0.0;
    let totalOutcome = 0.0;
    let totalTransaction = 0;

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.value;
      } else {
        totalOutcome += transaction.value;
      }
    });

    totalTransaction = totalIncome - totalOutcome;

    const balance: Balance = {
      transactions: this.transactions,
      balance: {
        income: totalIncome,
        outcome: totalOutcome,
        total: totalTransaction,
      },
    };

    return balance;
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
