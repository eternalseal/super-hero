import { API_END_POINT } from '../constants/general';
import { assign, createMachine } from 'xstate'
import axios from 'axios';
import HeroModel from '../model/Hero.model';

interface ContextStateMachine {
    heroes: HeroModel[]
}

export const HeroesStateMachine = createMachine<ContextStateMachine>({
    id: 'Hero',
    context: {
        heroes: [],
    },
    on: {
        ADD_HEROES: {
            actions: assign({
                heroes: (context, event) => event.heroes,
            })
        }
    }
})
