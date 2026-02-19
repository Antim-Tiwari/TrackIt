import React from 'react'

function SummaryCards({summary}) {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-400">Income</p>
          <h2 className="text-2xl text-green-400">
            ₹ {summary.income}
          </h2>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-400">Expense</p>
          <h2 className="text-2xl text-red-400">
            ₹ {summary.expense}
          </h2>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-400">Balance</p>
          <h2 className="text-2xl text-indigo-400">
            ₹ {summary.balance}
          </h2>
        </div>
      </div>
  )
}

export default SummaryCards