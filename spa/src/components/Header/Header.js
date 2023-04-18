import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return (
        <header>
            <h1><Link className="home" to="/">Spa</Link></h1>
            <nav>
                <Link to="/catalog">All Spa</Link>
                {isAuthenticated && (
                    <div id="user">
                        <span>{userEmail}</span>
                        <Link to="/createSpa">Create spa</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                )}

                {!isAuthenticated && (
                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};