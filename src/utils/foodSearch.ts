import type { Food } from '../types/food'
import { normalizeText } from './normalizeText'

const foodMatchesQuery = (food: Food, normalizedQuery: string): boolean => {
  const searchableFields = [
    food.name,
    food.category,
    food.servingSize,
    food.notes ?? '',
    ...food.fodmapGroups,
    ...(food.aliases ?? []),
  ]

  return searchableFields.some((field) =>
    normalizeText(field).includes(normalizedQuery),
  )
}

export function searchFood(foods: Food[], query: string): Food[] {
  const normalizedQuery = normalizeText(query)

  if (!normalizedQuery) {
    return foods
  }

  return foods.filter((food) => foodMatchesQuery(food, normalizedQuery))
}
