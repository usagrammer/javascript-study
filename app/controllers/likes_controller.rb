class LikesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_item
  before_action :set_like

  def create
    unless @like  ## まだイイねしていない場合だけ追加する
      current_user.like_items << @item
    end
    redirect_to root_path
  end

  def destroy
    if @like  ## イイね済みの場合だけ解除する
      @like.destroy
    end
    redirect_to root_path
  end

  private

    def set_item
      @item = Item.find(params[:item_id])
    end

    def set_like
      ## @likeがnilならまだイイねしていない状態、@likeがnilでないならイイねの中間テーブルが取れる
      @like = @item.likes.find_by(user_id: current_user.id)
    end

end
