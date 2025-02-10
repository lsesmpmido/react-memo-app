import React from "react";
import MemoItem from "./MemoItem";

function MemoList({ memos, onSelectMemo, onCreateMemo }) {
  return (
    <div className="frame">
      <h2>一覧</h2>
      <button onClick={onCreateMemo}>+</button> {}
      <ul>
        {memos.map((memo) => (
          <MemoItem key={memo.id} memo={memo} onSelectMemo={onSelectMemo} />
        ))}
      </ul>
    </div>
  );
}

export default MemoList;
