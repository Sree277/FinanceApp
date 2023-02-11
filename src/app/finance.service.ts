import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { budget, incomeExpense } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "https://63e409238e1ed4ccf6d9a9bf.mockapi.io/api/";

  getBudget() {
    return this.http.get<budget>(this.baseUrl + "budget/1")
  }

  saveBudget(data: budget) {
    return this.http.put(this.baseUrl + "budget/1", data);
  }

  getIncomeExpense() {
    return this.http.get<Array<incomeExpense>>(this.baseUrl + "income-expense")
  }

  saveIncomeExpense(data: incomeExpense) {
    return this.http.post(this.baseUrl + "income-expense", data);
  }
}
