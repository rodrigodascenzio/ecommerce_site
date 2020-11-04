import styled from "styled-components/macro";

export const Title = styled.p`
  font-size: 24px;
  color: #000;
  font-weight: bold;
  margin: 10px 0 0 30px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Group = styled.div`
  max-width: 1140px;
  margin: 20px auto;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 100%;

  @media (min-width: 700px) {
    padding: 50px;
  }

  @media (max-width: 1160px) {
    max-width: 920px;
    padding: 40px;
  }

  @media (max-width: 940px) {
    max-width: 700px;
    padding: 30px;
  }

  @media (max-width: 720px) {
    max-width: 480px;
    padding: 20px;
  }

  @media (max-width: 500px) {
    max-width: 260px;
    padding: 10px;
  }
`;

export const Entities = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
`;

export const SubTitle = styled.p`
  font-size: 12px;
  color: #000;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0;
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  line-height: 1.5em;
  min-height: 3em;
`;

export const Price = styled(SubTitle)`
  color: green;
  margin-top: 10px;
  line-height: normal;
  min-height: auto;
`;

export const Text = styled.p`
  margin-top: 5px;
  font-size: 10px;
  color: #000;
  margin-bottom: 0;
  user-select: none;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  line-height: 1.5em;
  min-height: 3em;
`;

export const Meta = styled.div`
  padding: 10px;
`;

export const Image = styled.img`
  border: 0;
  max-width: 100%;
  height: 200px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border-radius: 5px;
`;

export const Item = styled.div`
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  background: white;
  display: flex;
  width: 200px;
  flex-direction: column;
  margin: 10px;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.04);
  }
`;
