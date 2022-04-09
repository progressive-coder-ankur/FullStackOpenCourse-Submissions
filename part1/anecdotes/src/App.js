import { useState } from 'react';

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StaticLine = ({ data }) => {
  return (
    <>
      <p>{data.anecdote}.</p>
      <p> has {data.vote} vote.</p>
    </>
  );
};

const Statistics = ({ text, data }) => {
  return (
    <div>
      <h3>{text}</h3>
      <StaticLine data={data} />
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { anecdote: 'If it hurts, do it more often', vote: 6 },
    {
      anecdote: 'Adding manpower to a late software project makes it later!',
      vote: 8,
    },
    {
      anecdote:
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      vote: 4,
    },
    {
      anecdote:
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      vote: 3,
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
      vote: 5,
    },
  ]);

  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(() => {
    const newAnecdotes = [...anecdotes];
    const sorted = newAnecdotes.sort((a, b) => b.vote - a.vote);
    return sorted[0];
  });
  const getMostVoted = () => {
    const newAnecdotes = [...anecdotes];
    const sorted = newAnecdotes.sort((a, b) => b.vote - a.vote);
    setMostVoted(sorted[0]);
  };

  const getRandomAnecdote = () => {
    const max = anecdotes.length;
    let number = Math.floor(Math.random() * max);
    setSelected(number);
  };

  const Vote = index => {
    const newAnecdotes = [...anecdotes];
    newAnecdotes[index].vote += 1;
    setAnecdotes([...newAnecdotes]);
    getMostVoted();
  };

  return (
    <>
      <div>
        <h3>Anecdote of the day</h3>
        <p>{anecdotes[selected].anecdote}.</p>
        <p> has {anecdotes[selected].vote} vote</p>
        <Button handleClick={() => Vote(selected)} text='Vote' />
        <Button handleClick={() => getRandomAnecdote()} text='next anecdote' />
      </div>
      <Statistics text='Anecdotes with most vote' data={mostVoted} />
    </>
  );
};

export default App;
