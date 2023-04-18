import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { spaServiceFactory } from './services/spaService';
import { authServiceFactory } from './services/authService';
import { AuthContext } from './contexts/AuthContext';

import { Header } from "./components/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { Register } from "./components/Register/Register";
import { CreateSpa } from "./components/CreateSpa/CreateSpa";
import { Catalog } from "./components/Catalog/Catalog";
import { SpaDetails } from './components/SpaDetails/SpaDetails';
import { EditSpa } from './components/EditSpa/EditSpa';

function App() {
    const navigate = useNavigate();
    const [spa, setSpa] = useState([]);
    const [auth, setAuth] = useState({});
    const spaService =spaServiceFactory(auth.accessToken);
    const authService = authServiceFactory(auth.accessToken)

    useEffect(() => {
        spaService.getAll()
            .then(result => {
                setSpa(result)
            })
    }, []);

    const onCreateSpaSubmit = async (data) => {
        const newSpa = await spaService.create(data);

        setSpa(state => [...state, newSpa]);

        navigate('/catalog');
    };

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);

            navigate('/catalog');
        } catch (error) {
            console.log('There is a problem');
        }
    };

    const onRegisterSubmit = async (values) => {
        const { confirmPassword, ...registerData } = values;
        if (confirmPassword !== registerData.password) {
            return;
        }

        try {
            const result = await authService.register(registerData);

            setAuth(result);

            navigate('/catalog');
        } catch (error) {
            console.log('There is a problem');
        }
    };

    const onLogout = async () => {
        await authService.logout();

        setAuth({});
    };

    const onSpaEditSubmit = async (values) => {
        const result = await spaService.edit(values._id, values);

        setSpa(state => state.map(x => x._id === values._id ? result : x))

        navigate(`/catalog/${values._id}`);
    }

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={contextValues}>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/createSpa' element={<CreateSpa onCreateSpaSubmit={onCreateSpaSubmit} />} />
                        <Route path='/catalog' element={<Catalog spa={spa} />} />
                        <Route path='/catalog/:spaId' element={<SpaDetails />} />
                        <Route path='/catalog/:spaId/edit' element={<EditSpa onSpaEditSubmit={onSpaEditSubmit} />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </AuthContext.Provider>
    );
}

export default App;
