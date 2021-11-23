import { useLocation } from 'react-router';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import React, { useMemo } from 'react';

interface Path {
  path: string;
  name: string;
}

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const paths = useMemo<Path[]>(() => {
    const paths: Path[] = [];
    const elements = pathname.replace(/^\//, '').split('/');

    if (elements[0] === '') return paths;

    for (let i = 0; i < elements.length; i++) {
      if (elements[i + 1] === 'list') {
        paths.push({
          path: pathname,
          name: elements[i],
        });
        break;
      } else if (elements[i + 1] === 'new' || /\d+/.test(elements[i + 1])) {
        paths.push({
          path: `${elements[i]}/list`,
          name: elements[i],
        });
      } else {
        paths.push({
          path: pathname,
          name: elements[i],
        });
      }
    }

    return paths;
  }, [pathname]);

  return (
    <StyledWrapper>
      <Link to="/">
        <HomeIcon sx={{ fontSize: 18, color: '#ccc' }} />
      </Link>
      {paths.map(({ path, name }) => (
        <React.Fragment key={path}>
          <span className="separator">/</span>
          <Link to={path}>
            <span className={`path-name ${path === pathname ? 'current' : ''}`}>
              {name}
            </span>
          </Link>
        </React.Fragment>
      ))}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  flex: 1;
  height: 20px;
  display: flex;
  align-items: center;

  a,
  a:visit,
  a:link,
  a:active {
    color: #ccc;
    text-decoration: none;
  }

  .separator {
    margin: 0 5px;
    color: #aaa;
  }

  .path-name {
    color: #bbb;

    &.current {
      color: #444;
    }
  }
`;

export default Breadcrumbs;
