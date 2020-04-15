import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface OutputDTO {
  transactions: Transaction[];
  balance: Balance;
}

class CalculateExpenseService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): OutputDTO {
    return {
      balance: this.getBalance(),
      transactions: this.transactionsRepository.all(),
    };
  }

  public getBalance(): Balance {
    const transactions = this.transactionsRepository.all();

    let sumIncome = 0;
    let sumOutCome = 0;

    transactions.forEach(t => {
      if (t.type === 'income') {
        sumIncome += t.value;
      }
    });

    transactions.forEach(t => {
      if (t.type === 'outcome') {
        sumOutCome += t.value;
      }
    });

    return {
      income: sumIncome,
      outcome: sumOutCome,
      total: sumIncome - sumOutCome,
    };
  }
}

export default CalculateExpenseService;
