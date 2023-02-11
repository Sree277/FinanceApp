import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './budget/budget.component';
import { IncomeExpenseSummaryComponent } from './income-expense-summary/income-expense-summary.component';
import { IncomeExpenseComponent } from './income-expense/income-expense.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'Main', pathMatch: 'full' },
  { path: 'Main', component: MainComponent },
  { path: 'Budget', component: BudgetComponent },
  { path: 'IncomeExpense', component: IncomeExpenseComponent },
  { path: 'IncomeExpenseSummary', component: IncomeExpenseSummaryComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
