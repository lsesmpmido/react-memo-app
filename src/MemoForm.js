import React, { useState, useEffect, useContext } from "react";
import { SignInContext } from "./Context.js";

function MemoForm({ selectedMemo, onSaveMemo, onDeleteMemo }) {
  const [content, setContent] = useState("");
  const isSignIn = useContext(SignInContext);

  useEffect(() => {
    if (selectedMemo) {
      setContent(selectedMemo.title + "\n" + selectedMemo.content);
    } else {
      setContent("");
    }
  }, [selectedMemo]);

  function handleSaveMemo() {
    const [title, ...mainContent] = content.split("\n");
    onSaveMemo(title, mainContent);
  }

  return (
    <div className="frame">
      {isSignIn && <h2>{selectedMemo ? "編集" : "追加"}</h2>}
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      {isSignIn && (
        <button onClick={handleSaveMemo}>
          {selectedMemo ? "更新" : "作成"}
        </button>
      )}
      {selectedMemo && isSignIn && (
        <button onClick={() => onDeleteMemo(selectedMemo.id)}>削除</button>
      )}
    </div>
  );
}

export default MemoForm;
