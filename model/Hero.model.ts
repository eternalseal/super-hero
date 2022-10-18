interface HeroModel {
    id: string,
    name: string,
    image: {
        url: string
    },
    appearance: Appearance,
    biography: Biography,
    connections: Connections,
    powerstats: Powerstats,
    work: Work
}

export const HeroModelInitialData: HeroModel = {
    id: '',
    name: '',
    image: {
        url: ''
    },
    appearance: {
        'eye-color': '',
        'hair-color': '',
        gender: '',
        height: [''],
        weight: [''],
        race: ''
    },
    biography: {
        'alter-egos': '',
        'first-appearance': '',
        'full-name': '',
        'place-of-birth': '',
        aliases: [''],
        alignment: '',
        publisher: ''
    },
    connections: {
        'group-affiliation': '',
        'relatives': ''
    },
    powerstats: {
        combat: '',
        durability: '',
        intelligence: '',
        power: '',
        speed: '',
        strength: ''
    },
    work: {
        base: '',
        occupation: ''
    }
}

export interface Powerstats {
    combat: string
    durability: string,
    intelligence: string,
    power: string,
    speed: string,
    strength: string
}

export interface Appearance {
    'eye-color': string,
    'hair-color': string,
    gender: string,
    height: Array<string>,
    weight: Array<string>,
    race: string
}

export interface Biography {
    'alter-egos': string,
    'first-appearance': string,
    'full-name': string,
    'place-of-birth': string,
    aliases: Array<string>,
    alignment: string,
    publisher: string
}

export interface Work {
    base: string
    occupation: string
}

export interface Connections {
    'group-affiliation': string,
    'relatives': string
}

export default HeroModel 