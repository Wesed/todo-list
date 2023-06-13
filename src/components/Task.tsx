import { useEffect, useState } from 'react';
import { styled } from 'styled-components'
import { Circle, CheckCircle, Trash } from "@phosphor-icons/react"


const Container = styled.div`
  background: var(--gray-500);
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 1rem;
  border-radius: 8px;
  color: var(--gray-100);
  
  label {
    cursor: pointer; 
    display: flex;
    gap: 1rem;
  }

  input {
    position: absolute;
    width: 0;
  }

  p {
    font-size: .875rem;
  }

  button {
    background: transparent;
    border: 1px solid transparent;
    color: var(--gray-300);
    cursor: pointer; 

    &:focus, &:hover {
      color: var(--danger);    
    }
  }
`;

interface TaskType {
  id: number;
  description: string;
  isCompleteValue: boolean;
  onHandleComplete: (idComplete: number) => void;
  onDeleteTask: (id: number) => void;
}

export function Task({id, description, isCompleteValue, onHandleComplete, onDeleteTask}: TaskType) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(()=>{
    setIsComplete(isCompleteValue)
  }, [isCompleteValue]);

  return (
    <Container>
      <label> 
        <input name="checkbox" id="checkbox" type="checkbox" onClick={()=>{onHandleComplete(id)}}/>
        {isComplete ?
          <CheckCircle size={24} 
            color={`var(--purple-dark)`}
            weight="fill"
          />  
          :
          <Circle size={24} color={`var(--blue)`}/>
        }
        <p className={`${isComplete && 'isCompleted'}`}>{description}</p>
      </label>
      <button name="delete-task" title="Deletar tarefa" onClick={()=>{onDeleteTask(id)}}> <Trash size={24}/> </button>
      <span> {id} </span>
    </Container>
  )
}