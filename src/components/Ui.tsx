interface UiProps {
  currentTurn: string;
}

const Ui = ({ currentTurn }: UiProps) => {
  return (
    <div className="row-start-2 col-start-3 border flex items-center justify-center">
      <h2>Current Turn: {currentTurn}</h2>
    </div>
  );
};
export default Ui;
