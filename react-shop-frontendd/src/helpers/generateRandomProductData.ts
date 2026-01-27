type RandomProductData = {
  name: string
  count: number
  price: number
  description: string
}

export const generateRandomProductData = (): RandomProductData => {
  const adjectives = ['Стильный', 'Классический', 'Модный', 'Элегантный', 'Современный', 'Премиальный', 'Практичный', 'Универсальный']
  const nouns = ['Товар', 'Продукт', 'Изделие', 'Аксессуар', 'Предмет', 'Комплект', 'Набор']

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  const randomId = Math.floor(Math.random() * 1000)

  return {
    name: `${randomAdjective} ${randomNoun} ${randomId}`,
    count: Math.floor(Math.random() * 100) + 1,
    price: Math.floor(Math.random() * 50000) + 500,
    description: `Описание для ${randomAdjective.toLowerCase()} ${randomNoun.toLowerCase()} #${randomId}`,
  }
}

export const getRandomOption = <T extends { id: number }>(options: T[]): number | undefined => {
  if (!options?.length) return undefined
  return options[Math.floor(Math.random() * options.length)].id
}
