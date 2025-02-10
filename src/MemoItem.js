import React from "react";

function MemoItem({ memo, onSelectMemo }) {
  return (
    <li>
      <span onClick={() => onSelectMemo(memo.id)}>{memo.title}</span>
    </li>
  );
}

export default MemoItem;
