export type AppointmentBoardRow = {
  id: string;
  client_id: string;
  scheduled_at?: string | null;
  appointment_date?: string | null;
  contact_name?: string | null;
  customer_name?: string | null;
  notes?: string | null;
  status?: string | null;
};
