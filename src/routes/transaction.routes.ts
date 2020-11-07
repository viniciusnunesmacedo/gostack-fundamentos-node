import { Router } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);

transactionRouter.get('/', (request, response) => {
  try {
    return response.status(200).json(transactionsRepository.getBalance());
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const transaction = new Transaction({ title, value, type });

    const transactionSaved = createTransactionService.execute(transaction);

    return response.status(200).json(transactionSaved);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
