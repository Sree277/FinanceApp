export interface budget {
    "monthly": number,
    "yearly": number,
}

export interface incomeExpense {
    "type": string,
    "date": Date,
    "amount": number,
    "remarks": string
}