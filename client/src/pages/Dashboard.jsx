import { useEffect, useState } from "react";
import API from "../api/axios";
import TransactionForm from "../components/TransactionForm";
import SummaryCards from "../components/SummaryCards";
import TransactionList from "../components/TransactionList";
import { useAuth } from "../context/AuthContext";
import CategoryPieChart from "../components/CategoryPieChart";


function Dashboard() {
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [editData, setEditData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const summaryRes = await API.get("/transactions/summary");
      setSummary(summaryRes.data);

      const transactionsRes = await API.get("/transactions");
      setTransactions(transactionsRes.data);

      const categoryRes = await API.get("/transactions/category-summary");
      setCategoryData(categoryRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (form) => {
    try {
      if (editData) {
        await API.put(`/transactions/${editData._id}`, form);
        setEditData(null);
      } else {
        await API.post("/transactions", form);
      }

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 md:px-8 py-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-sm"
        >
          Logout
        </button>
      </div>

      <TransactionForm
        onSubmit={handleSubmit}
        editData={editData}
        cancelEdit={() => setEditData(null)}
      />

      <SummaryCards summary={summary} />

      <div className="mt-8">
        <CategoryPieChart data={categoryData} />
      </div>


      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={(transaction) => setEditData(transaction)}
      />
    </div>
  );
}

export default Dashboard;