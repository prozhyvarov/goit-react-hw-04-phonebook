import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  padding: 12px;
  border-radius: 8px;
  background-color: black;
  border: 3px solid #fba003;
  list-style: none;
`;

export const Item = styled.li`
  background-color: #ffffff;
  border: 3px solid #fba003;
  padding: 6px;
  border-radius: 8px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
`;

export const Button = styled.button`
  padding: 2px 8px;
  font: inherit;
  cursor: pointer;
  border-radius: 8px 8px;
  border: 3px solid #fba003;
  color: #fba003;
  background-color: #e8e8e8;
  &:hover,
  &:focus {
    color: #fff;
    background-color: #fba003;
    cursor: pointer;
  }
`;
