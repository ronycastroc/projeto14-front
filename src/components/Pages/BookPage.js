import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductWithID } from "../../service/alexandriaService.js";
import styled from "styled-components";
import Header from "../Header.js";
import Footer from "../Footer.js";

export default function BookPage() {
  const params = useParams();
  const [bookData, setbookData] = useState({});

  function addBookToCart() {
    const cartItens = JSON.parse(localStorage.getItem("CART"));
    if (cartItens !== null) {
      const newCart = [...cartItens, bookData];
      localStorage.setItem("CART", JSON.stringify(newCart));
    } else {
      localStorage.setItem("CART", JSON.stringify([bookData]));
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductWithID(params.bookId)
      .then((res) => {
        console.log(res.data);
        setbookData(res.data);
      })
      .catch((err) => {
        console.error(err.message);
        alert("Erro ao buscar o livro na API com este ID");
      });
  }, [params.bookId]);

  return (
    <Wrapper>
      <Header />
      <Container>
        <BookCover>
          <img src={bookData.cover} alt="BookCover" />
        </BookCover>
        <BookInfo>
          <h1>{bookData.title}</h1>
          <p>{bookData.author}</p>
          <h2>{bookData.price}</h2>
          <ButtonsContainer>
            <button onClick={addBookToCart}>Adicionar ao carrinho</button>
            <div>i</div>
          </ButtonsContainer>
        </BookInfo>
      </Container>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 1000px;
  height: 500px;
  background-color: #a22c29;
  margin-top: 150px;
  margin-bottom: 150px;
  box-shadow: 0px 2px 47px 5px rgba(0, 0, 0, 0.1);
`;

const BookCover = styled.div`
  width: 300px;
  height: 400px;
  margin-left: 60px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const BookInfo = styled.div`
  width: 400px;
  height: 400px;
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 80px;
  h1 {
    font-weight: 700;
    font-size: 35px;
    color: #d6d5c9;
    line-height: 0;
  }
  p {
    font-weight: 400;
    font-size: 17px;
    color: #d6d5c9;
    line-height: 60px;
  }
  h2 {
    font-weight: 700;
    font-size: 25px;
    color: #d6d5c9;
    line-height: 60px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  button {
    margin-right: 25px;
    width: 150px;
    height: 45px;
    border: none;
    background-color: #d6d5c9;
    color: #0a100d;
    border-radius: 20px;
    cursor: pointer;
    background-image: linear-gradient(45deg, #902923 50%, transparent 50%);
    background-position: 100%;
    transition: background 300ms ease-in-out;
    background-size: 400%;

    &:hover {
      background-position: left;
      color: #d6d5c9;
    }
  }

  div {
    border: 1px solid #b9baa3;
    width: 40px;
    color: #b9baa3;
    height: 40px;
    border-radius: 50%;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(45deg, #d6d5c9 50%, transparent 50%);
    background-position: 100%;
    transition: background 300ms ease-in-out;
    background-size: 400%;
    &:hover {
      background-position: left;
      color: #a22c29;
    }
  }
`;
