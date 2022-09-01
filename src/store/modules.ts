import Component, { ComponentState } from "./Component"
import Global, { GlobalState } from "./Global"
import User, { UserState } from "./User"
import Live, { LiveState } from "./Live"
import HotGame, { HotGameState } from "./HotGame"
import Chat, { ChatState } from "./Chat"

export type TState = ComponentState & GlobalState & UserState & LiveState & HotGameState & ChatState

export const modules = {
    Component,
    Global,
    User,
    Live,
    HotGame,
    Chat
}