# MSCの名前を尋ねる
echo -n "Enter the name of the msc: "
read msc_name

# ユーザーの入力を使ってMSCを作成するコマンドを実行する
nest g module $msc_name --no-spec && nest g controller $msc_name --no-spec && nest g service $msc_name --no-spec

#権限がない場合
# chmod +x　/Users/nanbanaoki/nest_app/nestjs-typeorm-example-migrations/sh/generate_msc.sh