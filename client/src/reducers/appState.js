export default function appState(state="login", action) {
    switch(action.type) {
        case 'APP_STATE':
            return action.payload
        default:
            return state
    }
}