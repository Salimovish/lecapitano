export interface PizzaSupplementLink {
  pizzaId: string;
  supplementId: string;
  quantity: number;
}

export interface PizzaWithSupplements {
  pizzaId: string;
  supplements: PizzaSupplementLink[];
}
