const GameTable = ({ children }: any) => {
  return (
    <div className="h-screen w-screen p-24 bg-green-700 relative grid gap-4 grid-cols-3 grid-rows-3 text-gray-200">
      <div className="bg-black">
        <h1 className="text-5xl mb-4">Uno Game</h1>
      </div>
      {children}
    </div>
  );
};
export default GameTable;
