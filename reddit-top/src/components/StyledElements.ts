import styled from "styled-components";

export const StyledH1 = styled.h1`
  ${({ theme }) => `
    color:${theme.white};
  `}
  text-align: center;
`;
