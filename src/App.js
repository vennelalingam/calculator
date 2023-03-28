import React, { useState } from "react";


function App() {

  //main State
  const [transactions, setTransactions] = useState([
    { id: 1, name: "Groceries", amount: -200 },
    { id: 2, name: "Internet_Bill", amount: -50 },
    { id: 3, name: "Salary", amount: 1500 },
    { id: 4, name: "Kiddy_Bank", amount: 100 },
  ]);
  console.log(transactions);

  //derived state
  const [newTransaction, setNewTransaction] = useState(
    {       
      name: "Enter_Transaction_detail_here..", 
      amount: 0
    }
  );
  
  const savings = transactions
  .filter(transactions => transactions.amount > 0)
  .reduce((acc, b) => acc + +b.amount, 0);

  const expenses = transactions
  .filter(transactions => transactions.amount < 0)
  .reduce((acc, b) => acc + +b.amount, 0);

  const netBalance = savings + expenses;

  const handleInputChange = (event) => {    
    const value = event.target.value;
    const name = event.target.name;
    const newId = transactions.length + 1;
    setNewTransaction((state) => ({...state, [name]: value, id: newId} )); 
  };

  const addTransaction = () => {
    setTransactions((state) => [...state, newTransaction]);
    
  }

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transcation => transcation.id !== id))
  }

  return (
    <div className="container">
      <h1>Calculator</h1>
      <br/>
      <div><b>Savings_Amt:</b> {savings}$</div>      
      <br />
      <div><b>Expenses_Amt:</b> {expenses}$</div>
      <br />
      <div><b>Net_Balance:</b> {netBalance}$</div>
      <br />
      
      <input 
        value={newTransaction.name} 
        name="name" 
        onChange={(e) => handleInputChange(e)}
        className="form-control"
      />
      <br />
      <input 
        value={newTransaction.amount} 
        name="amount" 
        onChange={(e) => handleInputChange(e)}
        className="form-control"
      />
      <br />
      <button className="btn btn-primary" onClick={() => addTransaction()}>Add Transaction</button>

      <ul className="list-group mt-4">
        {
          transactions.map((transactions, i) => (
          <li 
            key={i} 
            className="list-group-item d-flex justify-content-between">
              <span>{i + 1}</span>
              <span>{transactions.name}</span> 
              <span>{transactions.amount}</span>
            <button 
              className="btn btn-primary" 
              onClick={() => deleteTransaction(transactions.id)}
            >Delete</button> 
          </li>
          ))
         }
      </ul>
    </div>
  );
}

export default App;
