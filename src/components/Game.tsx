import { Component } from "react";

import toast from "react-hot-toast";
import Toast from "./Toast";

import getStack from "../utils/get-stack";
import { options } from "../utils/toast-options";
import betweenDate from "../utils/between-date";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faArrowsUpDownLeftRight, faClock } from "@fortawesome/free-solid-svg-icons";

import "../styles/game.css";

export interface stack {
  level: number;
  position: number;
  status: "stack" | "select";
}

interface S {
  stacks: stack[][];
  gameClear: boolean;
  startedAt: number;
  quantity: number;
  move: number;
  minMove: number;
}

export default class Game extends Component<{}, S> {
  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {
    const quantity = parseInt(localStorage.getItem("quantity") ?? "6");

    this.setState({
      stacks: [ getStack(quantity), [], [] ],
      gameClear: false,
      startedAt: Date.now(),
      quantity,
      move: 0,
      minMove: Math.pow(2, quantity) - 1
    });
  }

  handleRestart() {
    const quantity = parseInt(localStorage.getItem("quantity") ?? "6");

    this.setState({
      stacks: [ getStack(this.state.quantity), [], [] ],
      gameClear: false,
      startedAt: Date.now(),
      quantity,
      move: 0,
      minMove: Math.pow(2, quantity) - 1
    });
  }

  checkWin(): boolean {
    const lastStick = this.state.stacks.at(-1);
    if (lastStick) {
      const stack = lastStick.map(s => ({ level: s.level } as Omit<stack, "position" | "status">));
      const answer = JSON.stringify([{level:1},{level:2},{level:3},{level:4},{level:5},{level:6}].slice(0, this.state.quantity));

      if (answer === JSON.stringify(stack)) {
        return true;
      }
    }

    return false;
  }

  getStackClassName(stack: stack): string {
    return ["stack", `level-${stack.level}`, stack.status === "select" ? "active" : ""].join(" ").trim();
  }

  getMarginMax(inSelect: stack | undefined): number {
    return inSelect ? 5 : 6;
  }

  getMarginTop(stick: stack[]): number {
    return 8 + 2 * (this.getMarginMax(stick.find(d => d.status === "select")) - stick.filter(s => s.status === "stack").length);
  }

  render() {
    return (
      <div
        className="object"
        onClick={() => {
          if (this.state.gameClear) return;
          this.setState({ gameClear: this.checkWin() })
        }}
        >
        {
          this.state?.stacks
          ? <>
            <div
              className="game"
              >
              {
                this.state.stacks.map((stick, idx) => (
                  <ul
                    className="stick"
                    onClick={() => {
                      if (this.state.gameClear) return;

                      const Stick: stack[] | undefined = this.state.stacks.find(s => s.find(st => st.status === "select"));
                      if (!Stick) return;

                      const selectStack = Stick.find(st => st.status === "select");

                      if (selectStack) {
                        const underLevel = stick.at(-1)?.level || 7;
                        if (underLevel < selectStack.level) { // under stack check
                          toast.error((t) => (<Toast content="놓을려고 하는 원반이 아래쪽에 있는 원반보다 커요." toastId={t.id} />), options);
                          return;
                        }

                        const { stacks } = this.state;
                        this.setState({
                          stacks: stacks.map((s, sidx) => {
                            if (sidx === idx) {
                              s.unshift({ level: selectStack.level, position: 0, status: "stack" });
                              s.map(st => st.position += 1);
                            }
                            return s.filter(st => st.status !== "select");
                          }),
                          move: this.state.move + 1
                        }, () => this.setState({ gameClear: this.checkWin() }));
                      }
                    }}
                    key={idx}
                    >
                    {
                      stick.find(s => s.status === "select")
                      ? <li
                        className={this.getStackClassName(stick.find(s => s.status === "select")!)}
                        style={{ marginTop: "0em", opacity: "1" }}
                        />
                      : <></>
                    }
                    {
                      stick.filter(s => s.status === "stack").map((stack, $idx) => (
                        <li
                          className={this.getStackClassName(stack)}
                          style={{
                            marginTop: $idx === 0 ? `${this.getMarginTop(stick)}em` : "0em",
                            opacity: this.state.gameClear ? "1" : ""
                          }}
                          onClick={() => {
                            if (this.state.gameClear) return;

                            if ($idx > 0) { // Not first frisbee
                              toast.error(t => (<Toast content="맨 위에 있는 원반만 건드려주세요." toastId={t.id} />), options);
                              return;
                            }

                            if (stick.some(s => s.status === "select")) { // Already selected
                              toast.error(t => (<Toast content="선택된 원반이 있습니다." toastId={t.id} />), options);
                              return;
                            }

                            if ($idx === 0) { // Select
                              this.setState({
                                stacks: [
                                  ...this.state.stacks.slice(0, idx),
                                  [
                                    ...this.state.stacks[idx].slice(0, $idx),
                                    { level: stack.level, position: stack.position, status: "select" },
                                    ...this.state.stacks[idx].slice($idx + 1)
                                  ],
                                  ...this.state.stacks.slice(idx + 1)
                                ]
                              }, () => this.setState({ gameClear: this.checkWin() }));
                            }
                          }}
                          key={$idx}
                          />
                      ))
                    }
                  </ul>
                ))
              }
            </div>
            <div className="plane" />
            <div className="line" />
            <section className="menu">
              <article
                className="restart"
                onClick={() => this.handleRestart()}
                >
                <FontAwesomeIcon icon={faArrowRotateRight} className="icon" />
                다시하기
              </article>
              <article className="move">
                <FontAwesomeIcon icon={faArrowsUpDownLeftRight} className="icon" />
                {
                  this.state.gameClear
                  ? <>게임 승리! (최소 횟수보다 {this.state.move - this.state.minMove}번 정도 더 옮기셨어요.)</>
                  : <>이동 횟수 : <span className={[this.state.minMove >= this.state.move ? "move-count" : "move-over"].join(" ").trim()}>{this.state.move}</span> / {this.state.minMove}</>
                }
              </article>
              {
                this.state.gameClear
                ? <article>
                  <FontAwesomeIcon icon={faClock} className="icon" />
                  {betweenDate(this.state.startedAt)} 만에 푸셨어요!
                </article>
                : <></>
              }
            </section>
          </>
          : <>
            Loading...
          </>
        }
      </div>
    );
  };
};