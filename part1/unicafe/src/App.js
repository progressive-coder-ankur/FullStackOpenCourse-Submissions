import { useState } from 'react';

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const all = good + neutral + bad;

  return (
    <div>
      <h3>statistics</h3>
      {all > 0 ? (
        <table>
          <thead>
            <tr>
              <td>Feedback</td>
              <td>Value</td>
            </tr>
          </thead>
          <tbody>
            <StatisticLine text={'good'} value={good} />
            <StatisticLine text={'neutral'} value={neutral} />
            <StatisticLine text={'bad'} value={bad} />
            <StatisticLine text={'all'} value={all} />
          </tbody>
          <tfoot>
            <tr>
              <td>
                <StatisticLine text={'average'} value={(good - bad) / all} />
              </td>
              <td>
                <StatisticLine
                  text={'positive'}
                  value={(good / all) * 100 + '%'}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <div>
          <p>No feedback given</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedbackGood = () => {
    setGood(good + 1);
  };
  const handleFeedbackNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleFeedbackBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <section>
        <h1>Unicafe Feedback</h1>

        <div>
          <h3>give feedback</h3>
          <Button
            handleClick={() => handleFeedbackGood()}
            text={'good'}
          ></Button>
          <Button
            handleClick={() => handleFeedbackNeutral()}
            text={'neutral'}
          ></Button>
          <Button handleClick={() => handleFeedbackBad()} text={'bad'}></Button>
        </div>

        <Statistics good={good} neutral={neutral} bad={bad} />
      </section>
    </>
  );
};

export default App;
