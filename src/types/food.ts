export type RiskLevel = 'low' | 'medium' | 'high'

export type LactosePresence = boolean | 'low_or_trace'

export type RecommendationCode =
  | 'avoid_or_test_carefully'
  | 'avoid_or_use_lactose_free'
  | 'check_ingredients'
  | 'test_portion'
  | 'test_portion_or_avoid'
  | 'usually_ok'

export interface FoodDataItem {
  nameEn: string
  namePt: string
  riskLevel: RiskLevel
  recommendation: RecommendationCode
  containsLactose?: LactosePresence
  notes: string
}

export interface FoodCategory {
  id: string
  namePt: string
  nameEn: string
  highFodmapFoods: FoodDataItem[]
  lowFodmapAlternatives: FoodDataItem[]
}

export interface FoodDatabase {
  metadata: {
    name: string
    version: string
    description: string
    source: string
    notes: string[]
  }
  categories: FoodCategory[]
}

export interface Food {
  id: string
  name: string
  nameEn: string
  category: string
  riskLevel: RiskLevel
  irritationLevel: RiskLevel
  containsLactose?: LactosePresence
  recommendation: string
  notes: string
  alternatives: string[]
  searchTerms: string[]
}
