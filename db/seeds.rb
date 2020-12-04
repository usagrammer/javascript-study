User.create(nickname: 'やまだ', email: 'hoge@fuga.com' , password: '123456')
user =  User.find_by(email: 'hoge@fuga.com')
Item.where(name: 'イヤホン', price: 2000, user: user).first_or_create
Item.where(name: 'テレビ', price: 50000, user: user).first_or_create
Item.where(name: '充電器', price: 1000, user: user).first_or_create 