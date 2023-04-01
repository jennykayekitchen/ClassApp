import { Outlet, Route, Routes } from "react-router-dom"
import { GenerateSavedList } from "../MeetUps/GenerateSavedList"
import { MeetUpList } from "../MeetUps/MeetUpList"
import { NewMeetUpForm } from "../MeetUpForm/NewMeetUpForm"
import { ManageMeetUps } from "../MeetUps/ManageMeetUps"
import "./Views.css"
//import { EditMeetUp } from "../MeetUps/EditMeetUpForm"




export const AdminViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    
                    <Outlet />
                </>
            }>

                <Route path="/" element={ <MeetUpList /> } />
                <Route path="/newmeetup" element={ <NewMeetUpForm /> } />
                <Route path="/viewsaved" element={ <GenerateSavedList /> } />
                <Route path="/managemeetups" element={ <ManageMeetUps /> } />
                {/* <Route path="/editmeetup" element={ <EditMeetUp /> } /> */}
                
            </Route>
        </Routes>
    )
}