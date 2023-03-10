import { UserViews } from "./UserViews"

export const ApplicationViews = () => {

    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)

    if (ClassAppUserObject.admin) {
        return "Under Construction"
    }
    else {
        return <UserViews />
    }
}

