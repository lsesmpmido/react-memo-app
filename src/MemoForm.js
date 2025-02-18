import React, { useState, useEffect } from "react";

function MemoForm({ selectedMemo, onSaveMemo, onDeleteMemo }) {
  const [content, setContent] = useState("");

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
      <h2>{selectedMemo ? "編集" : "追加"}</h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSaveMemo}>{selectedMemo ? "更新" : "作成"}</button>
      {selectedMemo && (
        <button onClick={() => onDeleteMemo(selectedMemo.id)}>削除</button>
      )}
    </div>
  );
}

export default MemoForm;
