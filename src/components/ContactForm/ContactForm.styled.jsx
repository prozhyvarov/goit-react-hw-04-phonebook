import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 12px;
  font-weight: 500;
  background-color: black;
  border: 3px solid #fba003;
  border-radius: 8px;
`;
export const Input = styled.input`
  margin-top: 10px;
  padding: 6px 10px;
  border-radius: 5px;
  font: inherit;
  cursor: pointer;
`;


export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  color: #fba003;
  font-size: 20px;
`;
export const Button = styled.button`
  padding: 6px 10px;
  font: inherit;
  cursor: pointer;
  border-radius: 8px;
  border: 3px solid #fba003;
  color: #fba003;
  font-size: 20px;
 

  &:hover,
  &:focus {
    color: #ffffff;
    background-color: #fba003;
    cursor: pointer;
  }
`;
