import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import sidebarStyles from "../styles/sidebar.module.css";

function Sidebar(){
    return(
        <div className={sidebarStyles.sidebar}>
            
            <div className={sidebarStyles.gogoLogo}>
                <p>GoGo</p>
            </div>
            <br></br>
            <nav>
                <ul>
                    {SidebarData.map((page, index) => {
                        return (
                            <li key={index}>
                                <Link to={page.path} style={{textDecoration: "none"}}>
                                    <div className={sidebarStyles.transparentButton}>
                                        {page.title}
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            
        </div>
    )
}

export default Sidebar;