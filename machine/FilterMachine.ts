import { createMachine, assign } from 'xstate';

interface ContextState {
    filter: boolean
}

export const filterMachine = createMachine({
    initial: 'active',
    context: { filter: false },
    states: {
        active: {
            on: {
                ENABLE: {
                    actions: assign({ filter: (ctx: ContextState) => ctx.filter = true })
                },
                DISABLE: {
                    actions: assign({ filter: (ctx: ContextState) => ctx.filter = false })
                }
            }
        }
    }
});