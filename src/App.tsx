import Game from "./components/Game";
import GameRule from "./components/GameRule";
import Quantity from "./components/Quantity";

function App() {
  const quantity = parseInt(localStorage.getItem("quantity") ?? "6");
  localStorage.setItem("quantity", Math.min(6, Math.max(2, quantity)).toString());

  return (
    <>
      <div className="mobile">
        <div className="sorry">죄송합니다.</div>
        모바일에서는 플레이 할 수 없어요.
      </div>
      <Game />
      <div className="line" />
      <Quantity />
      <div className="line" />
      <GameRule />
    </>
  );
};

export default App;