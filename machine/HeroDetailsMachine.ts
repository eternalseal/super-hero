import { createMachine, assign } from 'xstate'
import HeroModel from '../model/Hero.model';

interface ContextStateMachine {
    hero: HeroModel | null
}

export const HeroesDetailsStateMachine = createMachine<ContextStateMachine>({
    id: 'Hero',
    context: {
        hero: null,
    },
    on: {
        ADD_HEROES: {
            actions: assign({
                hero: (context, event) => event.hero,
            })
        }
    }
})
