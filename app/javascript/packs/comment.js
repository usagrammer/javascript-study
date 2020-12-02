function comment_ajax() {
  // コメントフォーム
  const commentForm = document.getElementById("comment-form");

  // こんにちわボタンが存在しなかったらここで終了（特定のページのみcomment.jsを動作させるための処理）
  if (!commentForm) return null;

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemId = commentForm.getAttribute("data-item-id");
    const XHR = new XMLHttpRequest();

    // openでリクエストを初期化する
    // 動かしたいコントローラのアクションに対応するルーティングを指定する
    XHR.open("POST", `/items/${itemId}/comments`, true);
    const formData = new FormData(commentForm);

    // レスポンスのタイプを指定
    XHR.responseType = "json";

    // sendでリクエストを送信する
    XHR.send(formData);

    // レスポンスを受け取った時
    XHR.onload = () => {
      const commentFormButton = document.querySelector('input[type="submit"]');
      // 送信ボタンが押せなくなるのを無効化
      commentFormButton.removeAttribute("disabled");
      if (XHR.status == 200) {
        // ルーティングーコントローラービューの間でエラーが発生しなかった場合
        const comment = XHR.response.comment;
        const user = XHR.response.user;
        const html = `
                      <div class="comment" style="border: 1px solid black; margin: 1rem 0; padding: 0.5rem; display: inline-block;">
                        <div class="comment-user-nickname">
                          ${user.nickname}さんのコメント
                        </div>
                        <div class="comment-content">
                          ${comment.content}
                        </div>
                        <div class="comment-created_at">
                          ${comment.created_at}
                        </div>
                      </div>
                      <br>
                     `;
        const commentsField = document.getElementById("comments");
        commentsField.insertAdjacentHTML("afterbegin", html);
        // 入力欄をリセット
        commentForm.reset();
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

window.addEventListener("load", comment_ajax);
