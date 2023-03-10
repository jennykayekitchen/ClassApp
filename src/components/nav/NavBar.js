
import { UserNav } from "./UserNav"
import { AdminNav } from "./AdminNav"
import "./NavBar.css"

export const NavBar = () => {
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)

    if (honeyUserObject.admin) {
        return <AdminNav />
    }
    else {
        return <UserNav />
    }
}

