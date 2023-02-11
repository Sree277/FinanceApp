import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';
import { budget, incomeExpense } from '../interfaces';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css']
})
export class IncomeExpenseComponent implements OnInit {

  constructor(private financeService: FinanceService) {
    this.loadIncomeExpenseList();
    this.financeService.getBudget().subscribe(value => {
      this.budget = value;
    });
  }

  ngOnInit(): void {
  }

  incomeExpense: incomeExpense = {
    type: "income",
    date: new Date(),
    amount: 0,
    remarks: "",
  }
  incomeExpenseList: Array<incomeExpense> = [];
  budget: budget = { monthly: 0, yearly: 0 };

  loadIncomeExpenseList() {
    this.financeService.getIncomeExpense().subscribe(value => {
      this.incomeExpenseList = value;
    });
  }
  saveIncomeExpense() {
    if (this.incomeExpense.date != new Date() && this.incomeExpense.amount) {

      let yearlyExpense = this.incomeExpenseList.filter(x => x.type == "expense").filter(x => new Date(x.date).getFullYear() == new Date(this.incomeExpense.date).getFullYear())
        .reduce((partialSum, incomeExpense) => partialSum + incomeExpense.amount, 0);
      let monthlyExpense = this.incomeExpenseList.filter(x => x.type == "expense").filter(x => new Date(x.date).getFullYear() == new Date(this.incomeExpense.date).getFullYear() && new Date(x.date).getMonth() + 1 == new Date(this.incomeExpense.date).getFullYear())
        .reduce((partialSum, incomeExpense) => partialSum + incomeExpense.amount, 0);


      if (this.incomeExpense.type == "expense" && (yearlyExpense + this.incomeExpense.amount) > this.budget.yearly) {
        return alert("Expense is exceeded the yearly budget...");
      }
      if (this.incomeExpense.type == "expense" && (monthlyExpense + this.incomeExpense.amount) > this.budget.monthly) {
        return alert("Expense is exceeded the monthly budget...");
      }

      this.financeService.saveIncomeExpense(this.incomeExpense).subscribe();
      alert(this.incomeExpense.type + this.incomeExpense.type.slice(1) + " saved...");
      this.incomeExpense = {
        type: "income",
        date: new Date(),
        amount: 0,
        remarks: "",
      }
      this.loadIncomeExpenseList();
    }
  }
}
