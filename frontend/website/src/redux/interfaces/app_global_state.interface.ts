import { EventState } from "./event_state.interface";
import { GlobalState } from "./global_state.interface";

export interface AppGlobalState {
  event: EventState;
  global: GlobalState;
}