import styled from "@emotion/styled"

export const StyledVersion = styled.div`
  position: fixed;
  bottom: .5rem;
  right: .5rem;
  font-style: italic;
  font-size: smaller;
  color: #ffffff;
  opacity: .5;
  &:hover {
    opacity: 1;
    transform: scale(1.2) translate(-.2rem, -.2rem);
  }
`
