import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Login from "./Login"
import Register from "./Register"
import axiosInstance from '../middlewares/axios';
export default function Profile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formVisible, setFormVisible] = useState(false);
    const [Cambio, setCambio] = useState(false);
    const page = useNavigate();
    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await axiosInstance.post('/profile');
                setUser(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            checkToken();
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        delete axiosInstance.defaults.headers.common['Authorization'];
    };
    const toggleFormVisibility = () => {
        setFormVisible(!formVisible);
    };
    if (isLoading) {
        return <div>Cargando...</div>;
    }
    if (user) {
        const handleClick = async () => {
            try {
                if (Cambio) {
                    return;
                }
                setCambio(true);
        
                const useu = {
                    nombre: document.getElementById('Nombre').value,
                    apellido: document.getElementById('Apellido').value,
                    telefono: document.getElementById('Telefono').value,
                    pais: document.getElementById('Pais').value,
                    password: document.getElementById('Password').value,
                    direccion: document.getElementById('Direccion').value
                };
        
                const response = await axiosInstance.put('/user', useu);
                if (response.data.code === 200) {
                    alert(response.data);
                    page('/profile');
                } else {
                    alert('Parece que ha ocurrido un error');
                }
                handleLogout();
            } catch (error) {
                console.error('Ha ocurrido un error:', error);
                alert('Ha ocurrido un error al procesar la solicitud');
                setCambio(false);
            }
        };
        return (
            <div className="container-fluid text-light bg-gradient pt-5">
                <h1 className="text-center text-warning kit">Perfil</h1>
                <div className="container text-center h1 p-5 bg-opacity-50">
                    <div className="row  p-2">
                        <div className="col">
                            <h1 className="text-info">Nombre</h1>
                            <span>{user.nombre}</span>
                        </div>
                        <div className="col">
                            <h1 className="text-info">Apellido</h1>
                            <span>{user.apellido}</span>
                        </div>
                        <div className="col">
                            <h1 className="text-info">Email</h1>
                            <span>{user.email}</span>
                        </div>
                        <div className="row  p-2">
                            <div className="col">
                                <h1 className="text-info">Direccion</h1>
                                <span>{user.direccion}</span>
                            </div>
                            <div className="col">
                                <h1 className="text-info">Pais</h1>
                                <span>{user.pais}</span>
                            </div>
                            <div className="col">
                                <h1 className="text-info">Telefono</h1>
                                <span>{user.telefono}</span>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-danger m-5" onClick={() => handleLogout()}>Cerrar sesion</button>
                    <button className="btn btn-warning m-5" onClick={toggleFormVisibility}>Editar perfil</button>
                </div>
                <div className="container text-center border border-info rounded bg-black">
                    <form id="form" className={formVisible ? "visible" : "hidden"}>
                        <label htmlFor="Nombre">Nombre</label>
                        <input className="form-control form-control-sm" id="Nombre" type="text" placeholder="Nombre" aria-label="Nombre" />
                        <label htmlFor="Apellido">Apellido</label>
                        <input className="form-control form-control-sm" id="Apellido" type="text" placeholder="Apellido" aria-label="Apellido" />
                        <label htmlFor="telefono">telefono</label>
                        <input className="form-control form-control-sm" id="Telefono" type="text" placeholder="telefono" aria-label="telefono" />
                        <label htmlFor="Pais">Pais</label>
                        <input className="form-control form-control-sm" id="Pais" type="text" placeholder="Pais" aria-label="Pais" />
                        <label htmlFor="Password">Password</label>
                        <input className="form-control form-control-sm" id="Password" type="password" placeholder="Password" aria-label="Password" />
                        <label htmlFor="Direccion">Direccion</label>
                        <input className="form-control form-control-sm" id="Direccion" type="text" placeholder="Direccion" aria-label="Direccion" />
                        <button onClick={() => handleClick()} id="cambio" className="btn btn-primary m-3">Guardar</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <div className=" bg-dark">
            <Login />
            <Register />
        </div>
    )
}