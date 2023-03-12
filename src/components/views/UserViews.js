import { Outlet, Route, Routes } from "react-router-dom"
import { GenerateSavedList } from "../GenerateSavedList/GenerateSavedList"
import { MeetUpList } from "../MeetUps/MeetUpList"
import { NewMeetUpForm } from "../MeetUpForm/NewMeetUpForm"



export const UserViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>The Class App</h1>

                    <Outlet />
                </>
            }>

                <Route path="" element={ <MeetUpList /> } />
                <Route path="" element={ <NewMeetUpForm /> } />
                <Route path="" element={ <GenerateSavedList /> } />
                
            </Route>
        </Routes>
    )
}

//