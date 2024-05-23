import React, { useState, useEffect } from 'react';
import Roulette from './Roulette';

const RouletteModal = ({ onClose }) => {
  // ルーレットモーダルコンポーネントの定義
  return (
    <div className="modal"> {/* モーダルコンテナ */}
      <div className="modal-content roulette-modal"> {/* モーダルコンテンツ */}
        <span className="close" onClick={onClose}>&times;</span> {/* 閉じるボタン */}
        <h2>ルーレット</h2> {/* タイトル */}
        {/* Rouletteコンポーネントをここに表示 */}
        <Roulette />
      </div>
    </div>
  );
};

export default RouletteModal;
