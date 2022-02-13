import React from 'react';
import AltView from './AltView';
import Kanban from './Kanban';
import NavButton from './NavButton';
import './styles.css'
import { faTableColumns, faChartLine } from '@fortawesome/free-solid-svg-icons';

export default function NavBar({ setView }) {

    return (    
        <div className="navBar">
            <div className="logo"></div>
            <div className="title">Plannr.</div>
            <NavButton caption="" view={<AltView />} setView={setView} icon={faChartLine} />
            <NavButton caption="" view={<Kanban />} setView={setView} icon={faTableColumns} />
        </div>
    )
}


