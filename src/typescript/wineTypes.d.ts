

interface Wine {
  id: number;
  name?: string;
  varietal?: string;
  vintage?: number;
  color: string;
  created_at: string;
}

interface NewWine {
  name?: string | null;
  varietal?: string | null;
  vintage?: number | null;
  color: string;
}

interface WineUpdates {
  name?: string | null;
  varietal?: string | null;
  vintage?: number | null;
  color?: string;
}

interface WineEncounter {
  id: number;
  wine_id?: number;
  wine_name: string;
  bottle_price?: number;
  purchase_location?: string;
  rating?: number;
  notes: string;
  encounter_date: string;
}


interface NewEncounter {
  wine_id: number
  wine_name?: string
  bottle_price?: number
  purchase_location?: string
  rating?: number
  notes?: string
  encounter_date?: string
  user_id: number
}