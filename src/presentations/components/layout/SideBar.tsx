import styled from 'styled-components';

const SideBar = () => {
  return (
    <StyledWrapper>
      <p>User</p>
      <p>Board Game</p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.aside`
  margin: 15px;
  width: 235px;
  background-image: linear-gradient(195deg, #42424a, #191919);
  border-radius: 15px;
  box-shadow: 3px 3px 7px #aaa;
`;

export default SideBar;
