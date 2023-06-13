import React, { useState } from "react";
import "../css/Notification.css"
import Header from "./Header";
export default function AdmEvent() {
    return (
        <div className="Nfull">
            <Header  />
            <div className="Nmain">
                <div className="Nmiddle">
                    <div className="head">
                        <div>NOTIFICATION</div>
                    </div>
                    <div className="content">
                        <div className="Slab">
                            <div className="phot"></div>
                            <div className="descp"></div>
                        </div>
                        <div className="Slab">

                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}