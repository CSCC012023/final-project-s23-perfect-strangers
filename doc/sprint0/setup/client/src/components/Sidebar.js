import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Sidebar.css';

function Sidebar(){
    return(
        <div className="sidebar">
            
            <div className="logo">
                <p>GoGo</p>
            </div>
            <br></br>
            <nav>
                <ul className='nav-list'>
                    {SidebarData.map((page, index) => {
                        return (
                            <li key={index} className={page.cName}>
                                <Link to={page.path}>
                                    <span>{page.title}</span>
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