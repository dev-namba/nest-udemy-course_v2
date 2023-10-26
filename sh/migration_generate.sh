
#!/bin/bash

# ユーザーにマイグレーションの名前を尋ねる
echo -n "Enter the name of the migration: "
read migration_name

# ユーザーの入力を使ってマイグレーションを作成するコマンドを実行する
npm run migration:generate --name=$migration_name

# chmod +x /Users/nanbanaoki/nest_app/nestjs-typeorm-example-migrations/sh/migration_generate.sh