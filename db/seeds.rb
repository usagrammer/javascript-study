# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(nickname: 'やまだ', email: 'hoge@fuga.com' , password: '123456')
user =  User.find_by(email: 'hoge@fuga.com')
Item.where(name: 'イヤホン', price: 2000, user: user).first_or_create
Item.where(name: 'テレビ', price: 50000, user: user).first_or_create
Item.where(name: '充電器', price: 1000, user: user).first_or_create