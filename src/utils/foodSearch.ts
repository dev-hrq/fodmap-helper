import type {
  Food,
  FoodCategory,
  FoodDataItem,
  FoodDatabase,
  RecommendationCode,
  RiskLevel,
} from '../types/food'
import { normalizeText } from './normalizeText'

const recommendationLabels: Record<RecommendationCode, string> = {
  avoid_or_test_carefully:
    'Pode causar sintomas. Melhor evitar ou testar com cautela.',
  avoid_or_use_lactose_free:
    'Pode conter lactose. Prefira versao zero lactose.',
  check_ingredients:
    'Verifique os ingredientes, pois pode conter itens irritativos.',
  test_portion: 'Pode depender da quantidade. Teste porcoes menores.',
  test_portion_or_avoid:
    'Pode ser fermentativo. Teste pequenas quantidades ou evite em fases de crise.',
  usually_ok: 'Geralmente melhor tolerado, mas observe sua resposta individual.',
}

const slugify = (value: string): string =>
  normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const getIrritationLevel = (food: FoodDataItem): RiskLevel => {
  if (food.riskLevel === 'high') {
    return 'high'
  }

  if (food.riskLevel === 'medium' || food.recommendation === 'test_portion') {
    return 'medium'
  }

  return 'low'
}

const getAlternatives = (
  category: FoodCategory,
  currentFood: FoodDataItem,
): string[] => {
  if (currentFood.riskLevel !== 'high') {
    return []
  }

  return category.lowFodmapAlternatives
    .filter((alternative) => alternative.namePt !== currentFood.namePt)
    .map((alternative) => alternative.namePt)
}

const getSearchTerms = (item: FoodDataItem): string[] => {
  if (item.nameEn === 'Most legumes / pulses') {
    return ['feijao', 'grao-de-bico', 'lentilha', 'ervilha seca']
  }

  if (item.nameEn === 'Plain cooked poultry') {
    return ['frango', 'peru']
  }

  return []
}

const toFood = (
  item: FoodDataItem,
  category: FoodCategory,
  group: 'high' | 'low',
): Food => ({
  id: `${category.id}-${group}-${slugify(item.namePt)}`,
  name: item.namePt,
  nameEn: item.nameEn,
  category: category.namePt,
  riskLevel: item.riskLevel,
  irritationLevel: getIrritationLevel(item),
  containsLactose: item.containsLactose,
  recommendation: recommendationLabels[item.recommendation],
  notes: item.notes,
  alternatives: getAlternatives(category, item),
  searchTerms: getSearchTerms(item),
})

export function flattenFoodDatabase(database: FoodDatabase): Food[] {
  return database.categories.flatMap((category) => [
    ...category.highFodmapFoods.map((food) => toFood(food, category, 'high')),
    ...category.lowFodmapAlternatives.map((food) => toFood(food, category, 'low')),
  ])
}

const foodMatchesQuery = (food: Food, normalizedQuery: string): boolean => {
  const searchableFields = [
    food.name,
    food.nameEn,
    food.category,
    food.recommendation,
    food.notes,
    food.riskLevel,
    food.irritationLevel,
    ...food.alternatives,
    ...food.searchTerms,
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
