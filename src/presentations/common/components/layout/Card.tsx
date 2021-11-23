import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface CardProps {}

const Card = ({ children }: PropsWithChildren<CardProps>) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

const StyledWrapper = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 3px 3px 7px #aaa;
`;

export default Card;
