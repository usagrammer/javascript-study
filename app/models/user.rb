class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :items
  has_many :comments, dependent: :destroy
  has_many :likes
  ## current_user.like_itemsでイイねした商品が取得できるようになる
  has_many :like_items, through: :likes, source: "item"

  validates :nickname, presence: true
end
