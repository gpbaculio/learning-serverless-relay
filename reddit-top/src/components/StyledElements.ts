import styled from "styled-components";

export const StyledH2 = styled.h2`
  ${({ theme }) => `
    color:${theme.white}; 
  `}
  text-align: center;
  width: 100%;
`;
