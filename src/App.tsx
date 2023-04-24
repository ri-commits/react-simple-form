import { useState } from "react";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import categories from "./categories";
import ExpenseList2 from "./expense-tracker/components/ExpenseList2";
import ExpenseFilter2 from "./expense-tracker/components/ExpenseFilter2";
import ExpenseForm2 from "./expense-tracker/components/ExpenseForm2";
import FormZod from "./zod-form/components/FormZod";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 10, category: "Utilities" },
    { id: 3, description: "ccc", amount: 10, category: "Utilities" },
    { id: 4, description: "ddd", amount: 10, category: "Utilities" },
  ]);
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  const [selectedCategory2, setSelectedCategory2] = useState("");
  const [expenses2, setExpenses2] = useState([
    { id: 1, description: "movie", amount: 12, category: "Entertainment" },
    { id: 2, description: "hummus", amount: 5, category: "Groceries" },
    { id: 3, description: "water", amount: 10, category: "Utilities" },
  ]);

  const visibleExpenses2 = selectedCategory2
    ? expenses2.filter((expence) => expence.category === selectedCategory2)
    : expenses2;

  return (
    <div>
      <div className="mb-5">
        <FormZod />
      </div>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
      <div className="mb-3 mt-5">
        <ExpenseForm2
          onSubmit={(expense) =>
            setExpenses2([
              ...expenses2,
              { ...expense, id: expenses2.length + 1 },
            ])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter2
          onSelectCategory={(category) => setSelectedCategory2(category)}
        />
      </div>
      <div className="mt-3">
        <ExpenseList2
          expences={visibleExpenses2}
          onDelete={(id) => setExpenses2(expenses2.filter((e) => e.id !== id))}
        />
      </div>
    </div>
  );
};

export default App;
