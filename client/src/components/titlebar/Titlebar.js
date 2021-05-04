import React from 'react';
import { Navbar} from "reactstrap";
import './Titlebar.css';

export const Titlebar = () => {
    return (
            <Navbar className={"p-0 px-2 pl-4 navbar-custom"}>
                <div className={"title-container link-color-white m-0"}><h6>ATHENA</h6></div>
                <div className={"button-container m-0"}>
                    <button className={"title-button-div btnMin link-color-white"} id={"minBtn"}>
                        <i className="far fa-window-minimize"></i>
                    </button>
                    <button className={"title-button-div btnEx link-color-white"} id={"restoreBtn"}>
                        <i className="fal fa-window-restore"></i>
                    </button>
                    <button className={"title-button-div btnClose link-color-white"} id={"closeBtn"}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </Navbar>
    )
}