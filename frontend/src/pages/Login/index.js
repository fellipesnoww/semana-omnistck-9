import React, {useState} from 'react';
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ history }){
    const [email, setEmail] = useState('');
  
    async function handleSubmit(event){
      event.preventDefault();
      if(email === null || email === ''){
          notify();
      } else{
        const response = await api.post('/sessions', {email});  
      
        const {_id} = response.data;
    
        localStorage.setItem('user', _id);    //Salva o id do usuario localmente no navegador
  
        history.push('/dashboard');
      }
      
    } 
    
    function notify() {
        toast.error('❌ Erro! Você precisa informar um e-mail válido', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            });
    }

    return (
    <>
        <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>

        <form onSubmit={handleSubmit} >      
            <label htmlFor="email">E-MAIL *</label>
            <input 
                id="email" 
                type="email"
                placeholder="Seu melhor e-mail"  
                value={email}
                onChange={event => setEmail(event.target.value)}
            />

            <button className="btn" type="submit">Entrar</button>            
        </form>
        <ToastContainer toastClassName="notify"
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
      );
}