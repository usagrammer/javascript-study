class Item < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :likes
  ## item.liked_usersでイイねしてくれたユーザーが取得できるようになる
  has_many :liked_users, through: :likes, source: "user"

  validates :name, :price, presence: true
  validates :price, numericality: {greater_than_or_equal_to: 1, less_than_or_equal_to: 1000000}
end
