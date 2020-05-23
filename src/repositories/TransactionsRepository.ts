import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const totalIncome = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((sum, trans) => sum + trans.value, 0);

    const totalOutcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((sum, trans) => sum + trans.value, 0);

    const total = totalIncome - totalOutcome;

    const result: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };

    return result;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
