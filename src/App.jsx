import React, { useState } from 'react';
import './App.css';

export default function PrevisaoTempo() {
  const [cidadeInput, setCidadeInput] = useState('');
  const [clima, setClima] = useState(null);
  const [status, setStatus] = useState('');
  const [classeCss, setClasseCss] = useState('clima-padrao');

  // Traduz os códigos de clima (WMO) do Open-Meteo
  const interpretarWeatherCode = (code) => {
    if (code === 0) return { texto: 'Céu Limpo', classe: 'clima-limpo' };
    if ([1, 2, 3].includes(code)) return { texto: 'Parcialmente Nublado', classe: 'clima-nublado' };
    if ([45, 48].includes(code)) return { texto: 'Com Nevoeiro', classe: 'clima-nublado' };
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { texto: 'Chovendo', classe: 'clima-chuva' };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { texto: 'Nevando', classe: 'clima-neve' };
    if ([95, 96, 99].includes(code)) return { texto: 'Tempestade', classe: 'clima-chuva' };
    return { texto: 'Clima Variado', classe: 'clima-padrao' };
  };

  const buscarCidade = async () => {
    if (!cidadeInput.trim()) return;

    setStatus('Buscando cidade...');
    setClima(null);

    try {
      const urlGeocoding = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cidadeInput)}`;
      const res = await fetch(urlGeocoding);
      const dados = await res.json();

      if (dados.length === 0) {
        setStatus('Cidade não encontrada');
        return;
      }

      const { lat, lon, display_name } = dados[0];
      const nomeCurto = display_name.split(',')[0];

      buscarClima(lat, lon, nomeCurto);
    } catch (erro) {
      setStatus('Erro ao buscar cidade');
      console.error(erro);
    }
  };

  const buscarClima = async (lat, lon, nomeCidade) => {
    setStatus('Carregando dados do clima...');

    try {
      const urlMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
      const res = await fetch(urlMeteo);
      const dados = await res.json();

      const climaAtual = dados.current;
      const informacaoClima = interpretarWeatherCode(climaAtual.weather_code);

      setClima({
        nomeCidade,
        temperatura: Math.round(climaAtual.temperature_2m),
        umidade: climaAtual.relative_humidity_2m,
        vento: climaAtual.wind_speed_10m,
        condicao: informacaoClima.texto,
      });

      setClasseCss(informacaoClima.classe);
      setStatus('');
    } catch (erro) {
      setStatus('Erro ao carregar clima');
      console.error(erro);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarCidade();
    }
  };

  return (
    <div className={`container-principal ${classeCss}`}>
      <div className="card">
        <h1>Tempo Agora</h1>

        <div className="busca">
          <input
            type="text"
            placeholder="Digite uma cidade..."
            value={cidadeInput}
            onChange={(e) => setCidadeInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={buscarCidade}>Buscar</button>
        </div>

        {status && <p className="status">{status}</p>}

        {clima && (
          <div className="resultado">
            <h2>{clima.nomeCidade}</h2>
            <p className="condicao">{clima.condicao}</p>
            <div className="temp-container">
              <span>{clima.temperatura}</span>°C
            </div>
            <div className="detalhes">
              <p>Umidade: <strong>{clima.umidade}%</strong></p>
              <p>Vento: <strong>{clima.vento} km/h</strong></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}