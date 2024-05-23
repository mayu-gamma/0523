import React, { useState } from 'react';
import '../App.css';

// AddDishFormコンポーネントを定義。onAddDish, onUpdateDish, selectedDishというpropsを受け取る。
const AddDishForm = ({ onAddDish, onUpdateDish, selectedDish }) => {
  // 料理名の状態を管理するためのuseStateフック。初期値は空文字列。
  const [name, setName] = useState('');
  // 材料の状態を管理するためのuseStateフック。初期値は空文字列。
  const [ingredients, setIngredients] = useState('');

  // フォーム送信時に呼び出される関数
  const handleSubmit = (e) => {
    e.preventDefault(); // フォームのデフォルトの送信動作を防止
    if (selectedDish) {
      // 既存の料理を更新する場合
      onUpdateDish(selectedDish.id, { name, ingredients });
    } else {
      // 新しい料理を追加する場合
      onAddDish({ name, ingredients });
    }
    // フォームをリセット
    setName('');
    setIngredients('');
  }

  return (
    // フォーム全体を囲むdiv。IDはadd-dish-container。
    <div id="add-dish-container">
      {/* フォームのタイトル。選択された料理がある場合は「料理を更新」、ない場合は「料理を追加」。 */}
      <h1>{selectedDish ? '料理を更新' : '料理を追加'}</h1>
      {/* フォームの開始タグ。送信時にhandleSubmit関数を呼び出す。 */}
      <form onSubmit={handleSubmit}>
        {/* 料理名の入力フィールド */}
        <input
          type="text"
          placeholder="料理名"
          value={name} // 入力フィールドの値はnameの状態と同期
          onChange={(e) => setName(e.target.value)} // 入力フィールドの値が変更されたときにnameの状態を更新
          required // このフィールドは必須
        />
        {/* 材料の入力フィールド */}
        <input
          type="text"
          placeholder="材料"
          value={ingredients} // 入力フィールドの値はingredientsの状態と同期
          onChange={(e) => setIngredients(e.target.value)} // 入力フィールドの値が変更されたときにingredientsの状態を更新
          required // このフィールドは必須
        />
        {/* 送信ボタン。選択された料理がある場合は「更新」、ない場合は「追加」。 */}
        <button type="submit">{selectedDish ? '更新' : '追加'}</button>
      </form>
    </div>
  );
}

export default AddDishForm; // AddDishFormコンポーネントをエクスポート
