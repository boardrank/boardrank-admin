import { Link } from 'react-router-dom';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { PropsWithChildren } from 'react';
import { SvgIconTypeMap } from '@mui/material';
import { To } from 'react-router';
import styled from 'styled-components';

interface SideBarItemProps {
  to: To;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
}

const SideBarItem = ({
  to,
  Icon,
  children,
}: PropsWithChildren<SideBarItemProps>) => {
  return (
    <SideBarItemWrapper>
      <Link to={to}>
        <p>
          {Icon && <Icon sx={{ fontSize: 16 }} />}
          {children}
        </p>
      </Link>
    </SideBarItemWrapper>
  );
};

const SideBarItemWrapper = styled.li`
  margin: 2px 8px;
  padding: 10px 10px 8px;
  color: #ddd;
  font-size: 0.8em;
  font-weight: 700;
  transition: background-color 0.3s;
  border-radius: 0.375rem;

  &:hover {
    background-color: hsla(0, 0%, 78%, 0.2);
    cursor: pointer;
  }

  a:link,
  a:visited {
    color: white;
    text-decoration: none;
  }

  p {
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
      margin-top: -0.5px;
    }
  }
`;

export default SideBarItem;
