import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';
import { incomeExpense } from '../interfaces';

@Component({
  selector: 'app-income-expense-summary',
  templateUrl: './income-expense-summary.component.html',
  styleUrls: ['./income-expense-summary.component.css']
})
export class IncomeExpenseSummaryComponent implements OnInit {

  constructor(private financeService: FinanceService) {
    this.financeService.getIncomeExpense().subscribe(value => {
      this.incomeExpenseList = value;
      this.showTotal();
    });
  }

  ngOnInit(): void {
  }

  totalIncome: number = 0;
  totalExpense: number = 0;

  incomeExpenseList: Array<incomeExpense> = [];
  summaryType: string = "monthly";
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();

  showTotal() {
    if (this.summaryType == "yearly") {
      this.totalIncome = this.incomeExpenseList.filter(x => x.type == "income").filter(x => new Date(x.date).getFullYear() == this.year)
        .reduce((partialSum, incomeExpense) => partialSum + incomeExpense.amount, 0);

      this.totalExpense = this.incomeExpenseList.filter(x => x.type == "expense").filter(x => new Date(x.date).getFullYear() == this.year)
        .reduce((partialSum, incomeExpense) => partialSum + incomeExpense.amount, 0);
    } else {
      this.totalIncome = this.incomeExpenseList.filter(x => x.type == "income").filter(x => new Date(x.date).getFullYear() == this.year && new Date(x.date).getMonth() + 1 == this.month)
        .reduce((partialSum, incomeExpense) => partialSum + incomeExpense.amount, 0);

      this.totalExpense = this.incomeExpenseList.filter(x => x.type == "expense").filter(x => new Date(x.date).getFullYear() == this.year && new Date(x.date).getMonth() + 1 == this.month)
        .reduce((partialSum, incomeExpense) => partialSum + incomeExpense.amount, 0);
    }
  }
}
