import { NewTransactionButton, HeaderContainer, HeaderContent } from "./styles";
import logoImg from "../../assets/logo.svg";

export function Header () {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="logo do dt-money" />
        <NewTransactionButton>
          Nova transação
        </NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}