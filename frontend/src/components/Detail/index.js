/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import Menu from '../Menu';

import {
  Container,
  FilmCard,
  FilmPoster,
  FilmDetails,
  FilmDetailsContent,
  FilmTitulo,
  FilmTrailer,
  FilmDetailItem,
  FilmDetailItemElement,
  MagnetHeader,
  MagnetBody,
  MagnetTitle,
  MagnetButton,
  MagnetCard,
} from './styles';

import defaultImage from '../../assets/default.jpg';

export default function Detail({ match }) {
  const [filme, setFilme] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getData() {
      const { data } = await api.get(`/filmes/${match.params.id}`);
      console.log(data);
      setFilme(data);
    }
    getData();
    // eslint-disable-next-line
  }, []);

  function handleSetDefaultImage(e) {
    e.target.src = defaultImage;
  }

  return (
    <>
      <Menu />
      <Container>
        <FilmCard>
          <FilmDetails>
            <FilmPoster src={filme.image_url} onError={handleSetDefaultImage} />
            <FilmDetailsContent>
              <FilmTitulo>{filme.titulo}</FilmTitulo>
              <FilmDetailItem>
                <b>Ano:</b>
                {filme.ano_lancamento}
              </FilmDetailItem>
              <FilmDetailItem>
                <b>Duração:</b>
                {filme.duracao}
              </FilmDetailItem>
              <FilmDetailItem>
                <b>Audio:</b>
                {filme.qualidade_audio}
              </FilmDetailItem>
              <FilmDetailItem>
                <b>Video:</b>
                {filme.qualidade_video}
              </FilmDetailItem>
              <FilmDetailItem>
                <b>Imdb:</b>
                {parseFloat(filme.imdb).toFixed(1)}
              </FilmDetailItem>
              <FilmDetailItem>
                <b>Formato:</b>
                {filme.formato
                  && filme.formato.map((item) => (
                    <FilmDetailItemElement
                      className="filme-formato-item"
                      key={item}
                    >
                      {item}
                    </FilmDetailItemElement>
                  ))}
              </FilmDetailItem>
              <FilmDetailItem>
                <b>Idioma:</b>
                {filme.idioma
                  && filme.idioma.map((item) => (
                    <FilmDetailItemElement
                      className="filme-idioma-item"
                      key={item}
                    >
                      {item}
                    </FilmDetailItemElement>
                  ))}
              </FilmDetailItem>
              <FilmDetailItem>
                <b>Generos:</b>
                {filme.genero
                  && filme.genero.map((item) => (
                    <FilmDetailItemElement
                      className="filme-genero-item"
                      key={item}
                    >
                      {item}
                    </FilmDetailItemElement>
                  ))}
              </FilmDetailItem>
              <FilmDetailItem>
                <b>Tamanho:</b>
                {filme.tamanho
                  && filme.tamanho.map((item) => (
                    <FilmDetailItemElement
                      className="filme-tamanho-item"
                      key={item}
                    >
                      {item}
                    </FilmDetailItemElement>
                  ))}
              </FilmDetailItem>
              <FilmDetailItem>
                <b>Sinopse:</b>

                {filme.sinopse}
              </FilmDetailItem>
            </FilmDetailsContent>
          </FilmDetails>
          <FilmTrailer src={filme.trailer} title={filme.titulo} />
        </FilmCard>
        <MagnetHeader>Downloads</MagnetHeader>
        <MagnetBody>
          {filme.magnet_links
            && filme.magnet_links.map((link) => (
              <MagnetCard key={link.hash}>
                <MagnetTitle>{link.nome}</MagnetTitle>
                <MagnetButton href={link.link}>Download</MagnetButton>
              </MagnetCard>
            ))}
        </MagnetBody>
      </Container>
    </>
  );
}
