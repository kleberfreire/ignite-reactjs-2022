import styled, {css} from "styled-components";

export type TButtonVariant = "primary" | "secondary" | "danger" | "success" | "neutral"

interface IButtonContainer {
  variant: TButtonVariant;
}

const buttonVariant: any = {
  primary: 'purple' ,
  secondary: 'orange'  ,
  danger: "red" ,
  success: "green" ,
}

export const ButtonContainer = styled.button<IButtonContainer>`
  width: 100px;
  height: 40px;

  ${props => {
  return css`
    background-color: ${buttonVariant[props.variant]}
  `;
}}
`