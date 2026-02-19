import { useState, useEffect } from "react";

function TransactionForm({ onSubmit, editData, cancelEdit }) {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        date: editData.date ? editData.date.split("T")[0] : "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    if (!editData) {
      setForm({
        type: "expense",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    }
  };

  return (
    <div className="mb-8 rounded-xl p-6 
      bg-white dark:bg-gray-800 
      shadow-md border border-gray-200 dark:border-gray-700">

      <h2 className="text-xl font-semibold mb-6 
        text-gray-800 dark:text-white">
        {editData ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="sm:col-span-2 px-3 py-2 rounded-lg 
            bg-gray-100 dark:bg-gray-700 
            text-gray-800 dark:text-white
            border border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-700
            text-gray-800 dark:text-white
            border border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-700
            text-gray-800 dark:text-white
            border border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-700
            text-gray-800 dark:text-white
            border border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="sm:col-span-2 px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-700
            text-gray-800 dark:text-white
            border border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="sm:col-span-2 py-2 rounded-lg
            bg-indigo-600 hover:bg-indigo-700
            text-white font-medium
            transition duration-200"
        >
          {editData ? "Update Transaction" : "Add Transaction"}
        </button>

        {editData && (
          <button
            type="button"
            onClick={cancelEdit}
            className="sm:col-span-2 py-2 rounded-lg
              bg-gray-400 hover:bg-gray-500
              dark:bg-gray-600 dark:hover:bg-gray-500
              text-white transition duration-200"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TransactionForm;