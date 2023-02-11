import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';
import { budget } from '../interfaces';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  constructor(private financeService: FinanceService) {
    this.financeService.getBudget().subscribe(value => {
      this.budget = value;
    });
  }

  ngOnInit(): void {

  }

  budget: budget = { monthly: 0, yearly: 0 };

  saveBudget() {
    this.financeService.saveBudget(this.budget).subscribe();
    alert("Budget saved...");
  }
}
