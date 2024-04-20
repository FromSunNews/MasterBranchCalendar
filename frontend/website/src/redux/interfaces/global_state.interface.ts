export interface GlobalState {
  current_date_selected: Date;
  number_day_in_month_selected: number;
  showModalType: null | "DELETE" | "CREATE";
  idToDelete: string | null;
}