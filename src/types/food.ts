export type RiskLevel = 'low' | 'medium' | 'high'

export type FodmapGroup =
  | 'fructose'
  | 'lactose'
  | 'fructans'
  | 'galactans'
  | 'polyols'
  | 'unknown'

export interface Food {
  id: string
  name: string
  category: string
  riskLevel: RiskLevel
  servingSize: string
  fodmapGroups: FodmapGroup[]
  aliases?: string[]
  notes?: string
}
