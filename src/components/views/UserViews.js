import { Outlet, Route, Routes } from "react-router-dom"
import { GenerateSavedList } from "../MeetUps/GenerateSavedList"
import { MeetUpList } from "../MeetUps/MeetUpList"
import { NewMeetUpForm } from "../MeetUpForm/NewMeetUpForm"
//import { EditMeetUp } from "../MeetUps/EditMeetUpForm"
import { ManageMeetUps } from "../MeetUps/ManageMeetUps"
import "./Views.css"
import { Home } from "../Home/Home"



export const UserViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>
                <Route path="/" element={<Home />} />
                <Route path="/viewallmeetups" element={ <MeetUpList /> } />
                <Route path="/newmeetup" element={ <NewMeetUpForm /> } />
                <Route path="/viewsaved" element={ <GenerateSavedList /> } />
                <Route path="/managemeetups" element={ <ManageMeetUps /> } />
                
                
            </Route>
        </Routes>
    )
}

//