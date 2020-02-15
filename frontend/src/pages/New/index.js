import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import api from '../../services/api';

import './styles.css';

export default function New({ history }){
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);


    //Use Memo parece com o UseEffect, toda vez que a variavel dentro do array for alterada, sera remontado o component 
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;     //URL é uma variavel global do HTML
    },[thumbnail]);

    async function handleSubmit(event){
        event.preventDefault();

        //Como nao sera utilizado um JSON na requisicao e sim um Multipart sera usado o FormData
        const data = new FormData(); 
        const user_id = localStorage.getItem('user'); 

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('price', price);
        data.append('techs', techs);

        await api.post('/spots', data, {
            headers: {user_id}
        });

        history.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{backgroundImage:`url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}        //Se caso existir uma thumbnail sera aplicada a classe do css
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />  
                <img src={camera} alt="Select IMG"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input 
                id="company"
                placeholder="Nome da sua Empresa"
                value={company}
                onChange={event => setCompany(event.target.value)} 
            />            
            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input 
                id="techs"
                placeholder="Tecnologias da sua empresa"
                value={techs}
                onChange={event => setTechs(event.target.value)} 
            />
             <label htmlFor="company">Valor da Diária <span>(deixe em branco caso seja gratuito)</span></label>
            <input 
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)} 
            />
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}