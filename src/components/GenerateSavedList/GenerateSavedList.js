import React, { useState, useEffect } from "react";

export const GenerateSavedList = () => {
    //gets the user info
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)
       
      
    return (
        <div>
        <h2>Saved Meet Ups</h2>
            
        </div>
    );
};



