import styled, { css } from 'styled-components'
import { StyleProps } from '.'

export const StyledCell = styled.div(({ value }: StyleProps) => {
  return css`
    display: flex;

    place-items: center;
    place-content: center;

    padding: 1em;
    border-radius: 10px;
    width: clamp(30px, 10vw, 70px);
    height: clamp(30px, 10vw, 70px);

    background: rgba(0, 0, 0, 0.2);
    border: solid 2px rgba(0, 0, 0, 0);

    transition: all 0.2s;

    ${!value &&
    css`
      background: rgba(0, 0, 0, 0.1);
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.2);
        border: solid 2px darkgray;
      }

      &:active {
        background: lightgray;
        border: solid 2px lightgray;
      }
    `}
  `
})
