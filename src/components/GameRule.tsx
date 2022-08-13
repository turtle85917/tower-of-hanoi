import { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrophy } from "@fortawesome/free-solid-svg-icons";

import "../styles/g-rule.component.css";

export default class GameRule extends Component {
  render() {
    return (
      <article className="game-rule">
        <div className="title">
          <span className="game-name">하노이 탑</span>
          의 게임 승리 조건과 규칙은 ▶를 눌러 확인 가능해요.
        </div>
        <details className="game-sub-rule">
          <summary className="title">
            <FontAwesomeIcon icon={faTrophy} className="icon" />
            게임 승리 조건
          </summary>
          <div className="description">
            처음 상태에서는 한 막대에 큰 원반이 맨 아래로 해서, 위로 갈수록 작아지는 원반들이 쌓아져 있습니다.
            <br />
            게임에서 이길려면, 마지막 막대에 처음 상태에 꽂혀 있던 상태와 똑같은 상태로 옮기시면 됩니다.
            <br />
            <img alt="clear-rule" src="/assets/clear-desc.png" width={320} />
          </div>
        </details>
        <details className="game-sub-rule" open>
          <summary className="title">
            <FontAwesomeIcon icon={faCircleInfo} className="icon" />
            게임 규칙
          </summary>
          <div className="description">
            1. 옮기려는 원반이 옮기려고 하는 막대 맨 위에 꽂혀 있는 원반보다 작으면 안 됩니다.
            <br />
            2. 한번에 하나만 이동 가능합니다.
            <br />
            3. 최소 이동횟수 안으로만 이동해주세요.
            <br />
            4. 가장 위의 원판만 이동할 수 있습니다.
          </div>
        </details>
      </article>
    );
  };
};