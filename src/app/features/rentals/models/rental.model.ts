import { Car } from '../../cars/models/car.model';

export interface Rental {
  id?: string;
  car_id: string;
  user_id?: string;
  start_date?: string;
  end_date?: string | null;
  expected_return_date: Date;
  total?: number | null;
  created_at?: string;
  updated_at?: string;
  car?: Car;
}
