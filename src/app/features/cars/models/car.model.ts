export interface Car {
  id?: string;
  name: string;
  description: string;
  available?: boolean;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  category?: {
    id: string;
    name: string;
  };
  specifications?: {
    id: string;
    name: string;
    description?: string;
  }[];
}
