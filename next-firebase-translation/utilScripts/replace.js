const fs = require('fs');
const path = require('path');

// 対象のディレクトリ
const dirPath = "./web/src/types/";

function replaceInDir(dirPath) {
    // ディレクトリ内のファイル・ディレクトリリストを取得
    const files = fs.readdirSync(dirPath);

    // 各ファイル・ディレクトリに対して処理を行う
    files.forEach(file => {
        const filePath = path.join(dirPath, file);

        // ディレクトリであれば再帰的に探索
        if (fs.statSync(filePath).isDirectory()) {
            replaceInDir(filePath);
        } 
        // ファイルであれば、.tsファイルかどうかをチェックして処理
        else if (path.extname(filePath) === '.ts') {
            // ファイルを読み込む
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) throw err;

                // 文字列を置換
                const result = data.replace(/firebase-admin/g, '@firebase');

                // 置換後の文字列をファイルに書き込む
                fs.writeFile(filePath, result, 'utf8', function (err) {
                    if (err) throw err;
                });
            });
        }
    });
}

// 処理を開始
replaceInDir(dirPath);
