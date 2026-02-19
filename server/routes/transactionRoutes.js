import express from 'express';
import Transaction from '../models/Transaction.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Creting Transaction
router.post('/', protect, async (req, res) => {
    try {
        const {type, amount, category, description, date} = req.body;

        if(!type || !amount || !category){
            return res.status(400).json({message: "Required fields missing"})
        }

        const transaction = await Transaction.create({
            user: req.user._id,
            type,
            amount,
            category,
            description,
            date
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// Get All The Transactions
router.get('/', protect, async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user._id,
        }).sort({createdAt: -1});
        res.json(transactions);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


//Delete Transactions
router.delete('/:id', protect, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if(!transaction){
            return res.status(404).json({message: "Transaction not found"});
        }

        if(transaction.user.toString() !== req.user._id.toString()){
            return res.json(401).json({message: "Not authorized"})
        }

        await transaction.deleteOne();

        res.json({message: "Transaction deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// Update Transaction
router.put('/:id', protect, async (req, res) => {
    try {
        const {type, amount, category, description, date} = req.body;
        const transaction = await Transaction.findById(req.params.id);

        if(!transaction){
            return res.status(400).json({message: "Transaction not found"});
        }

        if(transaction.user.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Not authorized"});
        }

        transaction.type = type || transaction.type;
        transaction.amount = amount || transaction.amount;
        transaction.category = category || transaction.category;
        transaction.description = description || transaction.description;
        transaction.date = date || transaction.date;

        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } catch (error) {
        res.json({message: error.message});
    }
});


// Get Summary (Income, Expense, Balance)
router.get('/summary', protect, async (req, res) => {
    try {
        const summary = await Transaction.aggregate([
            {
                $match: {user: req.user._id}
            },
            {
                $group: {
                    _id: "$type",
                    total: {$sum: "$amount"}
                }
            }
        ]);

        let income = 0;
        let expense = 0;

        summary.forEach(item => {
            if(item._id === "income"){
                income = item.total;
            }else if(item._id === "expense"){
                expense = item.total;
            }
        });
        const balance = income - expense;

        res.json({
            income, expense, balance
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// Category Breakdown For Charts 
router.get("/category-summary", protect, async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      { $match: { user: req.user._id, type: "expense" } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;