import { Outlet, Route, Routes } from "react-router-dom"
import { GenerateSavedList } from "../MeetUps/GenerateSavedList"
import { MeetUpList } from "../MeetUps/MeetUpList"
import { NewMeetUpForm } from "../MeetUpForm/NewMeetUpForm"
//import { EditMeetUp } from "../MeetUps/EditMeetUpForm"
import { ManageMeetUps } from "../MeetUps/ManageMeetUps"
import "./Views.css"



export const UserViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <div className="head-name">
                        <h1>The Class App</h1>
                    </div>

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

//