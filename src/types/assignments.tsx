export interface assignments {
  id: number;
  start_time: string;
  end_time: string;
  driver: {
    id: number;
    name: string;
    phone: number;
    email: string;
    location: string;
    work_start_time: string;
    work_end_time: string;
  };
  vehicle: {
    id: number;
    make: string;
    model: string;
    plate_number: string;
  };
}

