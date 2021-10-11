import styled from 'styled-components'

export const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: clamp(5px, 2vw, 20px);

  transition: all 0.2s;
`
