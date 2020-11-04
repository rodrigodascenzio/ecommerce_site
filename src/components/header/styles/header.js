import styled from "styled-components/macro";
import { Link as ReachRouterLink } from "react-router-dom";
import { FaReceipt, FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  background: url(${({ src }) => (src ? "" : "")});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Container = styled.div`
  display: flex;
  padding: 18px 56px;
  /* height: 64px; */
  justify-content: space-between;
  align-items: center;
  background: radial-gradient(circle, rgba(92, 39, 251, 1) 0%, rgba(112, 71, 247, 1) 100%);
  box-shadow: 0px 1px 9px 0px rgba(214, 210, 214, 1);
  a {
    display: flex;
  }

  @media (max-width: 1000px) {
    padding: 18px 30px;
  }
`;

export const Link = styled.p`
  z-index: 999;
  text-decoration: none;
  margin-right: 30px;
  font-weight: ${({ active }) => (active === "true" ? "700" : "normal")};
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  background-color: #44444459;
  border-radius: 5px;
  color: white;
  outline: none;
  z-index: 999;
  border: 1px solid white;
  transition: width 0.5s;
  height: 30px;
  font-size: 14px;
  margin-left: ${({ active }) => (active === true ? "10px" : "0")};
  padding: ${({ active }) => (active === true ? "0 10px" : "0")};
  opacity: ${({ active }) => (active === true ? "1" : "0")};
  width: ${({ active }) => (active === true ? "200px" : "0px")};
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  z-index: 999;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const SearchIcon = styled(FaSearch)`
  border: 0;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin: 0 8px;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  align-items: center;
`;

export const PersonIcon = styled(BsFillPersonFill)`
  border: 0;
  color: gray;
  padding: 5px;
  border-radius: 50%;
  margin: 0 8px;
  z-index: 10;
  cursor: pointer;
  background: white;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    color: white;
  }

  align-items: center;
  ${({ nav }) => (nav ? `background: rgba(0, 0, 0, 0.2);color: white` : "")}
`;

export const ButtonLink = styled(ReachRouterLink)`
  display: block;
  background-color: #e50914;
  width: 84px;
  height: fit-content;
  color: white;
  z-index: 2;
  border: 0;
  font-size: 15px;
  border-radius: 3px;
  padding: 8px 17px;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;

  &:hover {
    background: #f40612;
  }
`;

export const Picture = styled.button`
  background: url(${({ src }) => src});
  background-size: contain;
  border: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  &:hover {
    opacity: 0.7;
  }
  cursor: pointer;
`;

export const CartIcon = styled(AiOutlineShoppingCart)`
  border: 0;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin: 0 8px;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  align-items: center;
  ${({ nav }) => (nav ? "background-color: rgba(0, 0, 0, 0.2)" : "")}
`;

export const OrderIcon = styled(FaReceipt)`
  border: 0;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin: 0 8px;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  align-items: center;
  ${({ nav }) => (nav ? "background-color: rgba(0, 0, 0, 0.2)" : "")}
`;

export const Dropdown = styled.div`
  display: none;
  position: absolute;
  background-color: white;
  box-shadow: 0px 1px 9px 0px rgba(214, 210, 214, 1);
  border-radius: 5px;
  padding: 20px;
  width: 100px;
  top: 32px;
  right: 0px;
  z-index: 2;

  ${Group}:last-of-type ${Link} {
    cursor: pointer;
  }

  ${Group} {
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0;
    }

    ${Link}, ${Picture} {
      cursor: default;
    }
  }

  button {
    margin-right: 10px;
  }

  p {
    font-size: 12px;
    margin-bottom: 0;
    margin-top: 0;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  position: relative;

  button {
    cursor: pointer;
  }
`;

export const FeatureBlur = styled.div`
  display: flex;
  margin: -100px 0 0 0;
  padding: 175px 0 250px 0;
  flex-direction: column;
  width: 100%;
  background: linear-gradient(to right, #000 30%, transparent 100%);
  justify-content: space-between;

  @media (max-width: 1100px) {
    padding: 130px 0 100px 0;
    background: linear-gradient(to right, #000 40%, transparent 100%);
  }

  @media (max-width: 1000px) {
    margin: -100px 0 0 0;
    padding: 115px 0 50px 0;
    background: linear-gradient(to right, #000 30%, transparent 100%);
  }
`;

export const Feature = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  padding: 0 56px 0 56px;
  justify-content: space-between;

  a {
    display: flex;
  }

  @media (max-width: 1100px) {
    width: 40%;
    padding: 0 56px 0 56px;
  }

  @media (max-width: 1000px) {
    width: 50%;
    padding: 0 30px 0 30px;
  }
`;

export const FeatureCallOut = styled.h2`
  color: white;
  font-size: 50px;
  line-height: normal;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
  margin: 0;
  @media (max-width: 1100px) {
    font-size: 25px;
  }
`;

export const Text = styled.p`
  color: white;
  font-size: 22px;
  line-height: normal;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  -webkit-box-orient: vertical;
  @media (max-width: 1100px) {
    font-size: 16px;
  }
`;

export const Logo = styled.img`
  max-height: 50px;
  max-width: 50px;
  width: 50px;
  height: 50px;
  z-index: 999;
  border-radius: 50%;

  @media (min-width: 1000px) {
    max-height: 90px;
    max-width: 90px;
    height: 90px;
    width: 90px;
  }
`;

export const PlayButton = styled.button`
  box-shadow: 0 0.6vw 1vw -0.4vw rgba(0, 0, 0, 0.35);
  background-color: #e6e6e6;
  color: #000;
  border-width: 0;
  padding: 10px 20px;
  border-radius: 5px;
  max-width: 130px;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #ff1e1e;
    color: white;
  }
`;
