import TransactionsRepository from '../repositories/TransactionsRepository';
import CalculateExpenseService from './CalculateExpenseService';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  private calculateExpenseService: CalculateExpenseService;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;

    this.calculateExpenseService = new CalculateExpenseService(
      this.transactionsRepository,
    );
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Invalid type');
    }

    if (typeof value === 'undefined') {
      throw Error('Value not informed');
    }

    const myBalance = this.calculateExpenseService.execute().balance.total;
    if (type === 'outcome' && value > myBalance) {
      throw Error(`you don't have enough balance`);
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
