# OAuthSample
AWSを使ってOAuthを調査・学習するためのリポジトリです。

## OAuthとは何か

OAuth（オーオース）は、インターネット上で安全に認証と権限を委譲するための標準的な仕組みです。

以下は、OAuthの基本的な仕組みとその流れについての簡単な解説です。

## 目次
1. [OAuthの概要](#OAuthの概要)
2. [OAuthが解決する課題](#OAuthが解決する課題)
3. [OAuthの主な用語](#OAuthの主な用語)
4. [OAuthの基本的な流れ](#OAuthの基本的な流れ)
5. [OAuthのメリットとデメリット](#OAuthのメリットとデメリット)

---

### 1. OAuthの概要
OAuthは、ユーザーが**自分のアカウント情報を他のサービスと共有せずに、安全にアクセス権を与える**ための認証フレームワークです。たとえば、Twitterアカウントを使用して他のウェブサービスにログインする際に、パスワードを直接入力することなく認証を行うことができます。

### 2. OAuthが解決する課題
インターネット上でサービス間の連携を実現する際、以下の課題が生じることが多いです。

- **安全な認証の確保**：ユーザーのパスワードを他のサービスと共有しない。
- **アクセス制御**：アクセス権限を一部の操作だけに限定できる。
- **アクセスの取り消し**：ユーザーが許可した権限を簡単に取り消すことができる。

OAuthは、これらの課題に対する解決策として広く利用されています。

### 3. OAuthの主な用語

| 用語              | 説明                                                                                         |
|------------------|----------------------------------------------------------------------------------------------|
| **リソースオーナー**  | アクセス権を持つユーザー。自分のデータに対するアクセス権限をサービスに与える人。                   |
| **クライアント**     | リソースオーナーのデータにアクセスしたいアプリケーションやサービス（例：写真編集アプリ）。              |
| **リソースサーバー**  | ユーザーのデータが保管されているサーバー。アクセス制御を行う。                                   |
| **認可サーバー**     | クライアントに対してアクセス権（トークン）を発行するサーバー。リソースサーバーとは分離されていることが多い。 |

### 4. OAuthの基本的な流れ

OAuthには、以下の基本的な認可フローがあります。ここでは、「認可コードフロー」を例に解説します。

1. **クライアントの要求**  
   ユーザーがクライアント（例：外部アプリ）にログインしようとすると、クライアントは認可サーバーにアクセス要求を送ります。

2. **ユーザー認証と認可**  
   認可サーバーはユーザーにログイン画面を表示し、クライアントにアクセス権限を与えるかどうかを確認します。ユーザーが認可を与えると、「認可コード」が発行されます。

3. **認可コードの交換**  
   クライアントは、発行された認可コードを使って認可サーバーからアクセストークンを取得します。このアクセストークンがデータへのアクセスに必要な権限証明です。

4. **リソースアクセス**  
   クライアントはリソースサーバーにアクセストークンを提示し、許可されたデータにアクセスします。

### 5. OAuthのメリットとデメリット

#### メリット
- **パスワード不要**：ユーザーのパスワードを他のサービスに共有する必要がないため、安全性が高まります。
- **権限の制御**：アクセス範囲を限定することができ、ユーザーのデータ保護に役立ちます。
- **アクセスの取り消し**：簡単にアクセス権限を取り消すことができるため、柔軟なアクセス管理が可能です。

#### デメリット
- **設定が複雑**：実装には多くの手順があり、セキュリティ上の配慮が必要です。
- **リスク**：アクセストークンが漏洩すると、第三者に不正アクセスされる可能性があるため、トークン管理が重要です。

---

OAuthは、ユーザーのデータを安全に共有できるように設計されており、広く普及している認証と権限付与の標準です。

## PKCE（Proof Key for Code Exchange）とインプリシットグラント

### 1. PKCE（Proof Key for Code Exchange）

PKCEは、**OAuth 2.0の認可コードフロー**をより安全にするために追加された仕組みで、主に**モバイルアプリやシングルページアプリケーション**（SPA）など、クライアントのシークレットを安全に保持できないアプリ向けに設計されています。PKCEを使うことで、認可コードの盗聴によるなりすまし攻撃を防ぎ、認証フローのセキュリティを強化します。

#### PKCEの基本的な仕組み
PKCEには「コードチャレンジ」と「コードベリファイア」という2つの要素が関わります。

1. **クライアントがコードチャレンジを作成**  
   クライアント（アプリ）はまず、ランダムに生成した文字列を「コードベリファイア」として用意し、これをハッシュ化して「コードチャレンジ」を作成します。
  
2. **認可サーバーにコードチャレンジを送信**  
   クライアントが認可サーバーに認証をリクエストする際に、「コードチャレンジ」を一緒に送信します。

3. **認可コードとコードベリファイアの確認**  
   認可サーバーは認可コードを発行し、クライアントがアクセストークンをリクエストする際に、最初に生成したコードベリファイアを使って認証を行います。これによって、認可コードが盗まれた場合でも、攻撃者がコードベリファイアを持っていなければアクセストークンを取得できないようにします。

#### PKCEの利点
- **セキュリティ強化**：認可コードが盗聴された場合でも、攻撃者はアクセストークンを取得できないため安全性が高まります。
- **クライアントシークレット不要**：PKCEはクライアントシークレットを必要としないため、モバイルやSPAなどのセキュリティ面で課題があるクライアントにも適用できます。

---

### 2. インプリシットグラント（Implicit Grant）

インプリシットグラントは、主に**SPAなどのブラウザベースのクライアント**向けに作られた認証フローで、クライアントが**直接アクセストークンを取得**するための簡易的な方法です。

#### インプリシットグラントの基本的な仕組み
1. **クライアントがアクセストークンをリクエスト**  
   ユーザーがクライアントにログインしようとすると、クライアントは認可サーバーにリクエストを送ります。

2. **認可サーバーがアクセストークンを発行**  
   認可サーバーは認可コードを発行せず、直接アクセストークンをクライアントに返します。

#### インプリシットグラントの利点と注意点

##### 利点
- **認証フローがシンプル**：認可コードを取得するステップがないため、通常の認可コードフローよりも短くシンプルです。

##### 注意点
- **セキュリティ上の懸念**：アクセストークンがURLフラグメント（URLの「#」以降の部分）に含まれるため、トークンが漏洩しやすく、セキュリティ上のリスクが伴います。
- **推奨されないケース**：OAuth 2.0のセキュリティ向上に伴い、現在はインプリシットグラントは非推奨とされ、代わりにPKCEを使用した認可コードフローが推奨されています。

---

PKCEとインプリシットグラントは、どちらもクライアントがアクセストークンを取得するための手段ですが、セキュリティの観点からPKCEの方が推奨されています。

## AWSでサンプルを構築する場合

API Gateway + Lambda + Cognito で構築する。

## Cognitoでサインした時に得られるデータ

- IDトークン
- アクセストークン
- 有効期限
- トークンタイプ

これらが得られる。

## ハンズオン用のURL

- 認可リクエスト  
    https://<ドメイン名>.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?client_id=<クライアントID>&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:8080
- トークンリクエスト  	
    curl -d "client_id=<クライアントID>" -d "client_secret=<クライアントシークレット>" -d "redirect_uri=http://localhost:8080" -d "grant_type=authorization_code" -d "code=<認可コード>" https://<ドメイン名>.auth.ap-northeast-1.amazoncognito.com/oauth2/token
- リソースアクセス  
    curl -H "Authorization: <アクセストークン>" <リソースサーバーURL>

## ハンズオンの記録

認可リクエスト

```bash
https://oauth-domain-mashharuki.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?client_id=48ir8k44dep3f0hbsfuuto3ldb&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:8080
```

すると認可コード付きで以下のURLにリダイレクトする。

```bash
http://localhost:8080/?code=3b472ab1-7685-40b4-b877-6724e7412a3f
```

トークンリクエスト

```bash
curl -d "client_id=48ir8k44dep3f0hbsfuuto3ldb" -d "client_secret=" -d "redirect_uri=http://localhost:8080" -d "grant_type=authorization_code" -d "code=3b472ab1-7685-40b4-b877-6724e7412a3f" https://oauth-domain-mashharuki.auth.ap-northeast-1.amazoncognito.com/oauth2/token
```

そうすると

- IDトークン
- アクセストークン
- 有効期限
- トークンタイプ

が得られる。


リソースアクセス

```bash
curl -H "Authorization: eyJraWQiOiJ2V1hZT0FKc2tjc0VFSzhvY0dMdXNxaTRtVU5vRHJzcGQ4THEybDVoRktvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzY0NmEwOC1iMDYxLTcwMzMtYjQ4Ni1kOTliNTk4ZDZjZDciLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNzMwMDA5ODE3LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTFfdnZCQ1ViTjFMIiwiZXhwIjoxNzMwMDEzNDE3LCJpYXQiOjE3MzAwMDk4MTcsInZlcnNpb24iOjIsImp0aSI6IjVhYmM3NGU2LTZhZTQtNDc5NC1iYTk5LWNkODNkZDE0ODZjNCIsImNsaWVudF9pZCI6IjQ4aXI4azQ0ZGVwM2YwaGJzZnV1dG8zbGRiIiwidXNlcm5hbWUiOiJtYXNoaGFydWtpIn0.JGEQrkgAldKXiCA-fKSCM74isDvCmraPYndpTRFQxFvo_RSadPqsUzXHZmVmVnhJxktLRFOguWygqXqXXIojAoJ834pQQDE1OGwN7wLjI4ugiDBeVGNEb-_zRE_Y327DlfS5erJ5NT4Fj-2B1Go0yl0GZPYDn9ggSOg7Ygkv8LJ3il608PDAaPLtYXGACMgCCX0OkY0hBGjqp8OrgXwdqZ5o-Vc6YlITCFuU3TM7cqx0L3yR0l6_HQ_Ms0QoZ8J3Pt0BOj4_Maz-pFGmDpwxrBOakI4cG6XFkxOXshy6JsARx8Iq3kStXFlpuHUFtl9my5-4jch2cKqe1mGkWo89OA" -XGET "https://h1l298lwfb.execute-api.ap-northeast-1.amazonaws.com/oauth-stage/oauth-resource"
```

以下の結果が返ってくればOK!

```json
{
    "statusCode":200,
    "body":"\"AWSで学ぶ！OAuth入門講座へようこそ！\""
}
```

PKCEありだとそれぞれ以下のようなURLとなる。

- 認可リクエスト    

    ```bash
    https://<ドメイン名>.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?client_id=<クライアントID>&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:8080&code_challenge_method=S256&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
    ```
- トークンリクエスト
    
    ```bash
    curl -d "client_id=<クライアントID>" -d "client_secret=<クライアントシークレット>" -d "redirect_uri=http://localhost:8080" -d "grant_type=authorization_code" -d "code=<認可コード>" -d "code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk" https://<ドメイン名>.auth.ap-northeast-1.amazoncognito.com/oauth2/token
    ```

インプリシットグラントの場合だといきなりアクセストークンを取得できる

- 認可リクエスト	

    ```bash
    https://<ドメイン名>.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?client_id=<クライアントID>&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:8080
    ```

