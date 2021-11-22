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
  isActive?: boolean;
}

const SideBarItem = ({
  to,
  Icon,
  isActive = false,
  children,
}: PropsWithChildren<SideBarItemProps>) => {
  return (
    <Link to={to}>
      <SideBarItemWrapper className={isActive ? 'active' : ''}>
        <p>
          {Icon ? (
            <Icon sx={{ fontSize: 16 }} />
          ) : (
            <span>{children?.toString()[0].toUpperCase()}</span>
          )}
          {children}
        </p>
      </SideBarItemWrapper>
    </Link>
  );
};

const SideBarItemWrapper = styled.li`
  display: flex;
  margin: 2px 8px;
  padding: 10px 10px 8px;
  color: #ddd;
  font-size: 0.8em;
  font-weight: 500;
  transition: background-color 0.3s;
  border-radius: 0.375rem;

  &:hover {
    background-color: hsla(0, 0%, 78%, 0.2);
    cursor: pointer;
  }

  &.active {
    background-color: hsla(0, 0%, 78%, 0.5);
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
    }

    span {
      margin-top: -2px;
      padding-top: 1px;
      display: flex;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background-color: #ddd;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      font-size: 0.8em;
      line-height: 0.8em;
      color: #191919;
      font-weight: 900;
    }
  }
`;

export default SideBarItem;
