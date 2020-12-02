class UsersController < ApplicationController
  def name
    if user_signed_in?
      nickname = current_user.nickname
    else
      nickname = "ゲスト"
    end
    render json: { nickname: nickname }
  end
end
