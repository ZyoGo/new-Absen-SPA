import React from 'react';
import styled from 'styled-components';
import smk from '../assets/smk.png';

const Navbar = () => {
  return (
    <Container>
      <WrapperImage>
        <Img src={smk} alt="test" />
      </WrapperImage>
      <H2>Absensi Online</H2>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrapperImage = styled.div`
  width: 35%;
  position: relative;
  margin: auto;
`;

const Img = styled.img`
  position: absolute;
  top: -5rem;
  width: 100%;
`;

const H2 = styled.h2`
  padding-top: 15rem;
  font-size: 1.8rem;
  text-align: center;
  font-family: 'Roboto', sans-serif;
`;
