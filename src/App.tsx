
import './global.css'
import { styled } from 'styled-components'
import {ReactComponent as Logo } from './assets/logo.svg'
import { PlusCircle, ClipboardText  } from "@phosphor-icons/react"
import { useEffect, useState } from 'react';
import { Task } from './components/Task';
import uuid from 'react-uuid'

const Header = styled.header`
  background: var(--gray-700);
  height: 12.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 126px;
    height: 48px;
  }
`;

const Container = styled.div`
  width: 736px;
  margin: 0 auto;
`;

const NewTask = styled.div` 
  margin-top: -4%;
  display: flex;
  gap: 1rem;

  input {
    width: 100%;
    background: var(--gray-500);
    border: 1px solid var(--gray-700);
    outline: none;
    border-radius: 8px;
    padding: .8rem;
    color: var(--gray-100);
    font-size: 1rem;

    &:focus, &:hover {
      border: 1px solid var(--purple-dark);
    }
  }

  button {
    font-size: .875rem;
    font-weight: bold;
    background: var(--blue-dark);
    cursor: pointer;
    padding: .8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    border-radius: 8px;
    border: 1px solid transparent;
    outline: none;
    color: var(--gray-100);

    &:focus, &:hover {
      background: var(--blue);;
    }
  }
`;

const TaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  flex-wrap: wrap;
`;

const TitleTask = styled.div`
  font-weight: bold;
  font-size: .875rem;
  display: flex;
  gap: .5rem;
  align-items: center;

  span {
    background: var(--gray-400);
    padding: .1rem .5rem;
    border-radius: 999px;
    color: var(--gray-200);
    font-size: .75rem;
  }
`;

const AllTasks = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmptyTasks = styled.div`
  border-radius: 8px;
  border-top: 1px solid var(--gray-400);
  color: var(--gray-300);
  text-align: center;
  height: 15.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--gray-300);

  svg {
    margin-bottom: 1rem;
  }

  h3 {
    font-weight: bold;
    color: var(--gray-300);
  }
`;

function App() {
  const [tasks, setTasks] = useState([
    {
      // id: uuid(),
      id: 1,
      description: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
      isCompleteValue: false
    },
    {
      // id: uuid(),
      id: 2,
      description: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
      isCompleteValue: false
    },
    {
      // id: uuid(),
      id: 3,
      description: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
      isCompleteValue: false
    },
    {
      // id: uuid(),
      id: 4,
      description: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
      isCompleteValue: true
    },
    {
      // id: uuid(),
      id: 5,
      description: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
      isCompleteValue: true
    },
  ]);
  const [countComplete, setCountComplete] = useState([0, 0])

  useEffect(() => {
    // qd completar, preciso alterar isso no setTasks
    // console.log(tasks[0].id === 1 ? 'oi' : 'tchau');
    const completed = tasks.filter(task => task.isCompleteValue === true)
    // console.log('aaa', completed);
    setCountComplete([0, tasks.length]);

  }, [tasks]);

  const handleComplete = (idComplete: number) => {

    const taskIndex = tasks.findIndex((task) => {
      return task.id == idComplete;
    });

    const newArray = tasks;
    newArray[taskIndex].isCompleteValue = !newArray[taskIndex].isCompleteValue;

    setTasks(newArray);
  }

  const handleDelete = (id: number) => {
    const newArray = tasks.filter(task => task.id !== id)
    console.log(newArray);
    setTasks(newArray);
  }


  return (
    <>
      <Header>
        <Logo />
      </Header>
      <Container>
        <NewTask>
          <input type="text" placeholder="Adicione uma nova tarefa" />
          <button>
            Criar
            <PlusCircle size={32} />
          </button>
        </NewTask>

        <TaskContainer>
          <TitleTask className="blue">
            Tarefas criadas
            <span>0</span>
          </TitleTask>

          <TitleTask className="purple">
            Concluídas
            <span>
              {countComplete[1] == 0
                ? 0
                : `${countComplete[0]} de ${countComplete[1]}`}
            </span>
          </TitleTask>

          {tasks.length > 0 ? (
            <AllTasks>
              {tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    description={task.description}
                    isCompleteValue={task.isCompleteValue}
                    onHandleComplete={handleComplete}
                    onDeleteTask={handleDelete}
                  />
                );
              })}
            </AllTasks>
          ) : (
            /* verficar, ta dando quebra */
            <EmptyTasks>
              <ClipboardText size={56} />
              <h3>Você ainda não tem tarefas cadastradas</h3>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </EmptyTasks>
          )}
        </TaskContainer>
      </Container>
    </>
  );
}

export default App
