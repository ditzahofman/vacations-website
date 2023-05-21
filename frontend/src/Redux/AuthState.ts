import { createStore } from "redux";
import UserModel from "../Models/User-model";
import jwtDecode from "jwt-decode";

export class AuthState {
    public token: string
    public user: UserModel = null


}

export enum AuthActionType {
    Register,
    Loggin,
    Logout
}

export interface AuthAction {
    type: AuthActionType
    payload?: string
}

export function AuthReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState }

    switch (action.type) {

        case AuthActionType.Register:
        case AuthActionType.Loggin:
            newState.token = action.payload
            const container: { user: UserModel } = jwtDecode(newState.token)
            newState.user = container.user
            break

        case AuthActionType.Logout:
            newState.token = null
            newState.user = null
            break
    }
    return newState

}

export const authStore = createStore(AuthReducer)