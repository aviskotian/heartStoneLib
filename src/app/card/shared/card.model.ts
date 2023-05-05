export interface CardDeck {
    name: string;
    types: string[];
}

export interface Card {
    cardId: string
    cardSet: string
    img: string
    imgGold: string
    name: string
    text: string
    playerClass: string
    cost: number
    attack: number
    health: number
    rarity: string
    type: string
    dbfId: string
    flavor: string
    faction: string
    locale: string
    favorite: boolean

}

