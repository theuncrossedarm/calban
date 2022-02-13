import React from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function NavButton({ caption, view, setView, icon }) {
    const handleClick = () => {
        setView(view)
    }

    return (
        <button className="navButton" onClick={handleClick}>
            <FontAwesomeIcon className="buttonIcon" icon={icon} />
            {caption}
        </button>
    )
}