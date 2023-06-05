import { useState } from 'react';
import { FiSearch} from 'react-icons/fi';

import logo from './logo-expanded.png'
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if(input === ''){
      alert('Preencha algum CEP')

      return;
    } 

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('')

    }catch{
      alert('Erro ao buscar')
      setInput('')
    }
  }

  return (
    <main className="container">
      <section className='containerLogo'>
        <img src={logo} className="logo"/>
      </section>

      <section className="containerCard">
        <input 
          type="text" 
          placeholder="Digite seu CEP" 
          value={input}
          onChange = {(event) => setInput(event.target.value)}
        />

        <button className="btnSearch" onClick={handleSearch}>
          <FiSearch size={18} color='#fff'/>
        </button>
      </section>

      {Object.keys(cep).length > 0 && (
        <section className='containerData'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.localidade} - {cep.uf}</span>
          <span>{cep.bairro}</span>
          <span>Código de área: {cep.ddd}</span>
        </section>
      )}
    </main>
  );
}

export default App;
