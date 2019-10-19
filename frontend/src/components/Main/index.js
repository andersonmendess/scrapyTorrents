/* eslint-disable no-multi-spaces */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  FlatList,
  ItemImage,
  ItemContainer,
  ItemTituloContainer,
  ItemIMDB,
  ItemTituloText,
  ItemAno,
  Spinner,
} from './styles';

import api from '../../services/api';
import defaultImage from '../../assets/default.jpg';

export default function Main() {
  const {
    page,
    listOfMovies,
    hasMorePages,
    tipo,
    scrollPosition,
  } = useSelector((store) => store);
  const dispatch = useDispatch();

  function handleSetDefaultImage(e) {
    e.target.src = defaultImage;
  }
  async function handleClickItem() {
    await dispatch({
      type: 'NEW_SCROLL_POSITION',
      scrollPosition: window.pageYOffset,
    });
  }

  async function getMoreData() {
    const tipoPart = tipo.length ? `?tipo=${tipo}` : '';

    const {
      data: { docs, pages },
    } = await api.get(`/filmes?page=${page}${tipoPart}`);

    await dispatch({ type: 'INCREMENT_PAGE' });
    await dispatch({ type: 'ADD_DATA', new_data: docs });

    if (page >= pages) {
      await dispatch({ type: 'END_LIST' });
    }
  }

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
    if (tipo.length) {
      dispatch({ type: 'UTIL_PAGES' });
    }
    getMoreData();

    // eslint-disable-next-line
  }, [tipo]);

  return (
    <InfiniteScroll
      style={{ overflow: 'hidden' }}
      dataLength={listOfMovies.length}
      next={getMoreData}
      hasMore={hasMorePages}
      scrollThreshold={0.85}
      loader={<Spinner />}
    >
      <FlatList>
        {listOfMovies.map((item) => (
          <ItemContainer key={item._id}>
            <Link to={`/show/${item._id}`} onClick={handleClickItem}>
              <ItemImage src={item.image_url} onError={handleSetDefaultImage} />
              <ItemTituloContainer className="titulo">
                <ItemTituloText>
                  {item.titulo.length > 32
                    ? `${item.titulo.substring(0, 32)} ...`
                    : item.titulo}
                </ItemTituloText>
              </ItemTituloContainer>
              <ItemIMDB>{item.imdb || 'N.D'}</ItemIMDB>
              <ItemAno>{item.ano_lancamento || '0000'}</ItemAno>
            </Link>
          </ItemContainer>
        ))}
      </FlatList>
    </InfiniteScroll>
  );
}
