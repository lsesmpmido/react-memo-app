import React, { useContext } from "react";
import MemoItem from "./MemoItem";
import { SignInContext } from "./Context.js";

function MemoList({ memos, onSelectMemo, onCreateMemo }) {
  const isSignIn = useContext(SignInContext);

  return (
    <div className="frame">
      <h2>一覧</h2>
      {isSignIn && <button onClick={onCreateMemo}>+</button>}
      <ul>
        {memos.map((memo) => (
          <MemoItem key={memo.id} memo={memo} onSelectMemo={onSelectMemo} />
        ))}
      </ul>
    </div>
  );
}

export default MemoList;
