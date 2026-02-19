function TransactionList({ transactions, onDelete }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl mb-4">Recent Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-400">No transactions found.</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((t) => (
            <div
              key={t._id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-700 p-3 rounded gap-2"
            >
              <div>
                <p>{t.category}</p>
                <p className="text-sm text-gray-400">
                  {new Date(t.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p
                  className={
                    t.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  ₹ {t.amount}
                </p>

                <button
                  onClick={() => onDelete(t._id)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;