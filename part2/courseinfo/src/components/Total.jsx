
const Total = ({ parts }) => {
  let exercises = [];

  const getExercises = () => {
    parts.forEach(part => exercises.push(part.exercises));
  };

  getExercises();

  const total = exercises.reduce((s, p) => s + p, 0);

  return (
    <>
      <p className='bold-text'>Total of {total} exercises </p>
    </>
  );
};

export default Total;
