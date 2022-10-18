interface FilterModel {
    name: string,
    gender: string,
    alignment: string,
    powerStat: string,
    intelligence: string,
    speed: string,
    power: string,
    durability: string
}

export type filterListItems =
    | 'name'
    | 'gender'
    | 'alignment'
    | 'powerStat'
    | 'intelligence'
    | 'speed'
    | 'power'
    | 'durability';

export const defaultFilter: FilterModel = {
    name: '',
    gender: '',
    alignment: '',
    powerStat: '',
    intelligence: '0,100',
    speed: '0,100',
    power: '0,100',
    durability: '0,100'
}

export default FilterModel