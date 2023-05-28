import { createStore } from "redux";
import FollowerModel from "../Models/Follower-model";
import VacationdModel from "../Models/Vacation-model";

export class VacationsState {

    public vacations: VacationdModel[]
    // public followers: FollowerModel[]
}

export enum vacationActionType {
    FetchVacations,
    AddVacation,
    DeleteVacation,
    UpdateVacation,
    AddFollower,
    DeleteFollower,

}

export interface VacationAction {
    type: vacationActionType
    paylod: any
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationAction): VacationsState {

    const newState = { ...currentState }

    switch (action.type) {

        case vacationActionType.FetchVacations:
            newState.vacations = action.paylod
            break

        case vacationActionType.AddVacation:
            newState.vacations.push(action.paylod)
            newState.vacations.sort((vacation1, vacation2) => new Date(vacation1.startDate).getTime() - new Date(vacation2.startDate).getTime())
            break

        case vacationActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.paylod)
            if (indexToDelete > 0)
                newState.vacations.splice(indexToDelete, 1)
            break

        case vacationActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.paylod)
            if (indexToUpdate > 0)
                newState.vacations[indexToUpdate] = action.paylod
            newState.vacations.sort((vacation1, vacation2) => new Date(vacation1.startDate).getTime() - new Date(vacation2.startDate).getTime())
            break

        case vacationActionType.AddFollower:
            const indexToAddFolowers = newState.vacations.findIndex(v => v.vacationId === action.paylod)
            if (indexToAddFolowers > 0) {
                newState.vacations[indexToAddFolowers].isFollowing = 1
                newState.vacations[indexToAddFolowers].followerCount++
            }
            break

        case vacationActionType.DeleteFollower:
            const indexToDeleteFolowers = newState.vacations.findIndex(v => v.vacationId === action.paylod)
            if (indexToDeleteFolowers > 0)
               newState.vacations[indexToDeleteFolowers].isFollowing = 0
            newState.vacations[indexToDeleteFolowers].followerCount--
            break
    }

    return newState
}

export const vacationsStore = createStore(vacationsReducer)