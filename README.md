# kuroRy.github.io

黒子 綾 (Kuroko Ryo) の Résumé サイト。

- 公開URL: https://kurory.github.io/

## スタック

- 静的 HTML / CSS / JS（ビルド不要）
- GitHub Pages + GitHub Actions による自動デプロイ

## 構成

| Path | 役割 |
| --- | --- |
| `index.html` | トップページ（Résumé 本体） |
| `shared.css` | 共通スタイル（Apple 風のデザインシステム・3パレット・3タイポグラフィ） |
| `shared.js` | Tweaks コントローラ（表示切替の永続化） |
| `.github/workflows/deploy.yml` | Pages デプロイワークフロー |
| `.nojekyll` | Jekyll 処理をスキップ |

## セットアップ（初回のみ）

1. GitHub で `kuroRy/kuroRy.github.io` リポジトリを作成（Public）
2. ローカルで初期化・push:

   ```sh
   git init
   git remote add origin git@github.com:kuroRy/kuroRy.github.io.git
   git add .
   git commit -m "initial commit"
   git branch -M main
   git push -u origin main
   ```

3. GitHub の **Settings → Pages** を開き、**Source を "GitHub Actions"** に変更
4. 初回 push で Actions が走り、数分で `https://kurory.github.io/` に公開される

## 更新フロー

`main` に push するたびに自動デプロイ。手動実行は **Actions タブ → "Deploy to GitHub Pages" → Run workflow** から。

## ローカルプレビュー

```sh
python3 -m http.server 8000
# http://localhost:8000/ を開く
```
