import { useReducer } from "react";
import "./index";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

const initialState = {
  balance: 0,
  loan: 0,
  isActive: true,
  deposit: 0,
  withdraw: 0,
  requestLoan: 0,
  payLoan: 0,
};

function reducer(state, action) {
  if (state.isActive && action.type !== "open") return state;

  switch (action.type) {
    case "open":
      return {
        ...state,
        isActive: false,
        balance: 500,
        deposit: 150,
        withdraw: 50,
        requestLoan: 5000,
      };

    case "withdraw":
      return {
        ...state,
        balance: state.balance - state.withdraw,
      };

    case "deposit":
      return { ...state, balance: state.balance + state.deposit };

    case "loan":
      if (state.loan > 0) {
        alert("You already taken a loan");
        return { ...state };
      }

      return {
        ...state,
        balance: state.balance + state.requestLoan,
        loan: state.requestLoan,
      };

    case "payLoan":
      // if (state.balance >= state.loan) {
      //   return { ...state, balance: state.balance - state.loan, loan: 0 };
      // } else {
      //   alert("You don't have enough money to pay loan😢");
      //   return { ...state };
      // }
      return { ...state, balance: state.balance - state.loan, loan: 0 };

    case "close":
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    { balance, loan, isActive, deposit, withdraw, requestLoan },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={() => dispatch({ type: "open" })} disabled={!isActive}>
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit" })}
          disabled={isActive}
        >
          Deposit {deposit}
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw" })}
          disabled={isActive}
        >
          Withdraw {withdraw}
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "loan" })} disabled={isActive}>
          Request a loan of {requestLoan}
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "close" })} disabled={isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
