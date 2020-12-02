class Item < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :name, :price, presence: true
  validates :price, numericality: {greater_than_or_equal_to: 1, less_than_or_equal_to: 1000000}
end
