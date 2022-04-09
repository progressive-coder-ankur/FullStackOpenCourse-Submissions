import { useState } from 'react';

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { anecdote: 'If it hurts, do it more often', vote: 0 },
    {
      anecdote: 'Adding manpower to a late software project makes it later!',
      vote: 0,
    },
    {
      anecdote:
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      vote: 0,
    },
    {
      anecdote:
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      vote: 0,
    },
    { anecdote: 'Premature optimization is the root of all evil.', vote: 0 },
    {
      anecdote:
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      vote: 0,
    },
    {
      anecdote:
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
      vote: 0,
    },
  ]);

  const [selected, setSelected] = useState(0);

  const createRandomNumber = max => {
    let number = Math.floor(Math.random() * max);
    setSelected(number);
  };

  const getRandomAnecdote = () => {
    createRandomNumber(anecdotes.length);
  };

  const Vote = () => {};

  return (
    <>
      <div>
        <p>{anecdotes[selected].anecdote}.</p>
        <p> has {anecdotes[selected].vote}</p>
        <Button handleClick={() => Vote()} text='Vote' />
        <Button handleClick={() => getRandomAnecdote()} text='next anecdote' />
      </div>
    </>
  );
};

export default App;
