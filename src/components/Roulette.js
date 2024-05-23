import React, { useState, useEffect } from 'react';

const Roulette = () => {
  // ルーレットの選択肢を定義
  const options = ['カレー', 'パスタ', '寿司', 'ピザ', '焼肉', 'ラーメン','オムライス','からあげ','エビチリ','卵サンド','チャーハン','エビマヨ','ビーフン','天津飯','フィッシュアンドチップス'];

  // ルーレットの回転状態を管理する state
  const [rotating, setRotating] = useState(false);

  // ルーレットで選択された料理
  const [selectedDish, setSelectedDish] = useState('');

  // ルーレットの回転速度
  const rotationSpeed = 100; // 100ミリ秒ごとに回転

  // ルーレットを回す関数
  const startRotation = () => {
    setRotating(true);
  };

  // ルーレットを停止する関数
  const stopRotation = () => {
    setRotating(false);
  };

  // ルーレットの選択肢をランダムに選択する関数
const selectRandomDish = () => {
  const randomIndex = Math.floor(Math.random() * options.length); // 選択肢の中からランダムなインデックスを生成
  setSelectedDish(options[randomIndex]); // ランダムに選ばれた選択肢をステートに設定
};

// ルーレットの回転状態を監視し、回転状態が変化したら選択肢を更新する
useEffect(() => {
  let intervalId; // インターバルIDを保持する変数
  if (rotating) {
    // ルーレットが回転中の場合
    intervalId = setInterval(() => {
      selectRandomDish(); // 一定間隔ごとにランダムな選択肢を選ぶ
    }, rotationSpeed);
  } else {
    // ルーレットが停止した場合
    clearInterval(intervalId); // インターバルをクリア
  }

  // コンポーネントがアンマウントされたときにインターバルをクリーンアップ
  return () => clearInterval(intervalId);
}, [rotating]); // rotatingが変更されるたびにこのエフェクトが実行される


  // ルーレットコンポーネントの定義
  return (
    <div id="roulette-container"> {/* ルーレットコンテナ */}
      <div id="roulette-display"> {/* ルーレット表示部 */}
        {rotating ? ( // 回転中の表示
          <p>{selectedDish}</p>
        ) : (
          <p>{selectedDish || '今日の献立は～？'}</p> // 選択された料理の表示
        )}
      </div>
      <div id="roulette-buttons"> {/* ルーレットボタン部 */}
        <button onClick={startRotation} disabled={rotating}> {/* 回転開始ボタン */}
          まわす
        </button>
        <button onClick={stopRotation} disabled={!rotating}> {/* 回転停止ボタン */}
          ストップ
        </button>
      </div>
    </div>
  );
};

export default Roulette;
