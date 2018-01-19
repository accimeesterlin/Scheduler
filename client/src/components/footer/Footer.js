import React from 'react';
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="center column">
            <div className="column">
                <ul className="center ">
                    <li className="fa fa-twitter fa-lg">
                        <a href="https://github.com/accimeesterlin/Scheduler" rel = "noopener noreferrer" target="_blank">Github</a>
                    </li>
                    <li className="fa fa-github fa-lg">
                        <a href="https://twitter.com/accimeesterlin" rel = "noopener noreferrer" target="_blank">Twitter</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
export default Footer;