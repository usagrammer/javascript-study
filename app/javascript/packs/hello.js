function hello_ajax() {
  // こんにちわボタン
  const helloButton = document.getElementById("hello-button");

  // こんにちわボタンが存在しなかったらここで終了（特定のページのみhello.jsを動作させるための処理）
  if (!helloButton) return null;

  helloButton.addEventListener("click", (e) => {
    const XHR = new XMLHttpRequest();

    // openでリクエストを初期化する
    // 動かしたいコントローラのアクションに対応するルーティングを指定する
    XHR.open("GET", "/users/name", true);

    // レスポンスのタイプを指定
    XHR.responseType = "json";

    // sendでリクエストを送信する
    XHR.send();

    // レスポンスを受け取った時
    XHR.onload = () => {
      if (XHR.status == 200) {
        // ルーティングーコントローラービューの間でエラーが発生しなかった場合
        const nickname = XHR.response.nickname;
        const nicknameField = document.getElementById("hello-user-nickname");
        nicknameField.innerText = nickname + "さん！";
      } else {
        // ルーティングーコントローラービューの間でエラーが発生した場合
        alert(`Error ${XHR.status}: ${XHR.statusText}`); // e.g. 404: Not Found
        return null;
      }
    };

    // リクエストが送信できなかった時
    XHR.onerror = function () {
      alert("Request failed");
    };
  });
}

window.addEventListener("load", hello_ajax);
