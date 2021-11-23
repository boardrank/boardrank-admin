import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface CardProps {
  className?: string;
}

const Card = ({ className, children }: PropsWithChildren<CardProps>) => {
  return <StyledWrapper className={className}>{children}</StyledWrapper>;
};

const StyledWrapper = styled.div`
  background-color: #fff;
  border-radius: 0.5em;
  box-shadow: 3px 3px 7px #aaa;
  padding: 0;
  overflow: hidden;
`;

export default Card;
