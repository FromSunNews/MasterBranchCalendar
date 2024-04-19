export interface EventResponse {
  id: string;
  title: string;
  type: "BOOKING_CLIENT" | "WEBINAR_EVENT";
  start_time: string;
  start_timestamp: number;
  end_time: string;
  end_timestamp: number;
  description: string;
  location?: string;
  recurring: boolean;
  recurring_pattern?: "DAYLY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  primary_color: string;
  background_color: string;
  meeting_url?: string;
  profile_client_url?: string;
  profile_client_image?: string;
}
