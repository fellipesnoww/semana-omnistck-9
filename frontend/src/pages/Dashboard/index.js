import React, {useEffect, useState, useMemo} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import socketio from 'socket.io-client';
import './styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard(){
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');

    //useMemo parecido com o useEffect, feito para so refazer a conexa com o socket quando o usuario mudar
    const socket = useMemo(() => socketio("http://localhost:3333", {
        query: {user_id}
    }), [user_id]);   //Faz a conexao co o socket passando o id do user logado


    useEffect(() => {
        //Toda vez que receber alguma mensage do websocket, realiza a acao

        // socket.on('hello', data => {
        //     console.log(data);
        // });

        //socket.emit('omni', 'Stack');

        socket.on('booking_request', data => {            
            setRequests([...requests, data]);  //Copia todos os dados que ja tem na request e adiciona a nova no final
        });
    }, [requests, socket])

    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data);
        }
        loadSpots();
    },[]); //Cada variavel dentro do array alterada a funcao useEffect é executada


    function notify(approvedBooking) {
        if(approvedBooking){
            toast.success('❣ Sucesso! Requisição APROVADA!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            });
        } else{
            toast.success('❣ Sucesso! Requisição REPROVADA!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                });
        }
        
    }

    async function handleAccept(id){
        const spot_user_id = localStorage.getItem('user');        
        await api.post(`/bookings/${id}/approvals`, {}, {headers: {spot_user_id}});
        
        notify(true);

        //Seta novamente as requests que possuem ids diferente da aprovada
        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id){
        const spot_user_id = localStorage.getItem('user');
        await api.post(`/bookings/${id}/rejections`,{}, {headers: {spot_user_id}});

        notify(false);

        //Seta novamente as requests que possuem ids diferente da reprovada
        setRequests(requests.filter(request => request._id !== id));
    }

    return (
        <>
        <ul className="notifications">
            {requests.map(request => (
                <li key={request._id}>
                    <p>
                        <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data <strong>{request.date}</strong>
                    </p>
                    <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                    <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                </li>
            ))}
        </ul>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{backgroundImage: `url(${spot.thumbnail_url})`}}></header>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia`: 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar Novo Spot</button>
            </Link>
            <ToastContainer className="notify"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
            />       
        </>
    )
}