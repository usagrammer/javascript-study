function like_ajax() {
  // こんにちわボタン
  const likeButtons = document.querySelectorAll(".like-button");
  console.log(likeButtons.length);

  // こんにちわボタンが存在しなかったらここで終了（特定のページのみhello.jsを動作させるための処理）
  if (likeButtons.length == 0) return null;

  const clickLikeButton = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const itemId = e.target.getAttribute("data-item-id");
    const likeStatus = e.target.getAttribute("data-like");
    const authToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");
    console.log(itemId);
    console.log(likeStatus);
    console.log(authToken);

    const XHR = new XMLHttpRequest();

    // openでリクエストを初期化する
    // 動かしたいコントローラのアクションに対応するルーティングを指定する
    if (likeStatus == "true") {
      XHR.open("DELETE", `/items/${itemId}/likes`, true);
    } else {
      XHR.open("POST", `/items/${itemId}/likes`, true);
    }

    // レスポンスのタイプを指定
    XHR.responseType = "json";

    // sendでリクエストを送信する
    XHR.send();

    // レスポンスを受け取った時
    XHR.onload = () => {
      if (XHR.status == 200) {
        // ルーティングーコントローラービューの間でエラーが発生しなかった場合
        console.log("success");
        console.table(XHR.response);
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
  };

  likeButtons.forEach(function (likeButton) {
    likeButton.addEventListener("click", (e) => clickLikeButton(e));
  });
}

window.addEventListener("load", like_ajax);
