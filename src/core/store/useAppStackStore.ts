import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { AppCardState } from "@features/app-card/types"

interface State {
  appCards: Record<string, AppCardState>
  activeCard: AppCardState | undefined
  navigationStack: string[] // AppCard IDs
}

interface Action {
  reset: () => void
  setTitle: (id: string, title: string) => void
  addAppCard: (appCard: AppCardState) => void
  removeAppCard: (id: string) => void
  setActiveCard: (id: string, skipNavigationStack?: boolean) => void
  hideActiveCard: () => void
  pushNavigationStack(id: string): void
  popNavigationStack(): void
}

type AppStackStore = State & Action

const defaultState: State = {
  appCards: {},
  activeCard: undefined,
  navigationStack: [],
}

export const useAppStackStore = create<AppStackStore>()(
  devtools(
    (set, _get) => ({
      ...defaultState,

      reset: () => set(defaultState),
      setTitle: (id, title) =>
        set((state) => {
          return {
            appCards: {
              ...state.appCards,
              [id]: { ...state.appCards[id], title },
            },
            activeCard:
              state.activeCard?.id === id ? { ...state.activeCard, title } : state.activeCard,
          }
        }),

      addAppCard: (appCard) =>
        set((state) => {
          const updatedCards = Object.fromEntries(
            Object.entries(state.appCards).map(([id, card]) => [id, { ...card, active: false }]),
          )
          updatedCards[appCard.id] = { ...appCard, active: true }

          const updatedStack = getUpdatedStack(state)

          return {
            appCards: { ...state.appCards, [appCard.id]: appCard },
            activeCard: updatedCards[appCard.id],
            navigationStack: updatedStack,
            isSwitcherOpen: false,
          }
        }),

      removeAppCard: (id) =>
        set((state) => {
          const updatedAppCards = { ...state.appCards }
          delete updatedAppCards[id]

          return {
            appCards: updatedAppCards,
            activeCard: state.activeCard?.id === id ? undefined : state.activeCard,
            navigationStack: state.navigationStack.filter((id) => id !== id),
            isSwitcherOpen: false,
          }
        }),

      setActiveCard: (id, skipNavigationStack) =>
        set((state) => {
          const updatedCards = Object.fromEntries(
            Object.entries(state.appCards).map(([key, card]) => [
              key,
              { ...card, active: key === id },
            ]),
          )
          const updatedStack = getUpdatedStack(state, id)
          return {
            appCards: updatedCards,
            activeCard: updatedCards[id],
            navigationStack: skipNavigationStack ? [...state.navigationStack] : updatedStack,
            isSwitcherOpen: false,
          }
        }),

      hideActiveCard: () =>
        set((state) => {
          const updatedCards = Object.fromEntries(
            Object.entries(state.appCards).map(([key, card]) => [key, { ...card, active: false }]),
          )
          return {
            appCards: updatedCards,
            activeCard: undefined,
            navigationStack: state.navigationStack.slice(0, -1),
            isSwitcherOpen: false,
          }
        }),

      pushNavigationStack: (id: string) =>
        set((state) => {
          const updatedStack = [...state.navigationStack, id]
          return { navigationStack: updatedStack }
        }),

      popNavigationStack: () =>
        set((state) => {
          const updatedStack = state.navigationStack.slice(0, -1)
          return { navigationStack: updatedStack }
        }),
    }),
    { name: "app-stack-store" },
  ),
)

export const hasOpenCard = () => useAppStackStore.getState().activeCard !== undefined

export const getActiveCard = () => useAppStackStore.getState().activeCard
export const hideActiveCard = () => useAppStackStore.getState().hideActiveCard()
export const setActiveCard = (id: string, skipNavigationStack?: boolean) =>
  useAppStackStore.getState().setActiveCard(id, skipNavigationStack)

export const popNavigationStack = () => {
  const state = useAppStackStore.getState()
  const stack = state.navigationStack
  if (stack.length === 0) {
    return undefined
  }
  const popped = stack[stack.length - 1]
  state.popNavigationStack()
  return popped
}

function getUpdatedStack(state: AppStackStore, id?: string) {
  const updatedStack = [...state.navigationStack]
  if (state.activeCard && (!id || id !== state.activeCard.id)) {
    updatedStack.push(state.activeCard.id)
  }
  return updatedStack
}
