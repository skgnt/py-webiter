var support_extention={"py":"python","html":"html","csv":"csv","json":"json","xml":"xml","txt":"txt"}
var model;
function monacoSetup() {




  model = monaco.editor.create(document.getElementById("editor"), {
    language: 'python',
    value: 'print("Hello, world")\n',
    automaticLayout: true,
    theme: settings["theme"],
  });

  model.onDidChangeModelContent(function (e) {
    //titleに*を追加
    document.title = "* py-webiter";
});
  
  monaco.languages.registerCompletionItemProvider("python", {
    triggerCharacters: ["."],
    provideCompletionItems: function (model, position) {
      // カーソル位置の前にあるテキストを取得する
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // テキストの中から、ドット（.）で区切られた最後の単語を取得する
      const wordsBeforeDot = textUntilPosition.split(".");
      const before_name = wordsBeforeDot[wordsBeforeDot.length - 2];
      const now_name = wordsBeforeDot[wordsBeforeDot.length - 1];

      if (now_name.length > 0 || before_name.length > 0) {
        let suggestions = [];
        // 最後の単語が "." で終わっている場合、ドットの前にある単語がオブジェクトの名前
        if (before_name !== undefined) {
          // オブジェクトの名前から、メソッドの一覧を取得する
          switch (before_name) {
            case "os":
              suggestions = [
                {
                  label: "path.exists",
                  kind: monaco.languages.CompletionItemKind.Function,
                  insertText: "path.exists",
                },
                {
                  label: "listdir",
                  kind: monaco.languages.CompletionItemKind.Function,
                  insertText: "listdir",
                }
                // 他にもメソッドがある場合はここに追加する
              ];
              break;

            // 他にもオブジェクトがある場合はここに追加する

            default:
              break;
          }
        }

        // 最後の単語が "." で終わっていない場合、関数名を補完する
        else {
          suggestions = [
            { label: "abs", kind: monaco.languages.CompletionItemKind.Function, insertText: "abs", documentation: "数値の絶対値を返す" },
            { label: "all", kind: monaco.languages.CompletionItemKind.Function, insertText: "all", documentation: "イテラブルの要素が全て真であればTrue、偽が一つでもあればFalseを返す" },
            { label: "any", kind: monaco.languages.CompletionItemKind.Function, insertText: "any", documentation: "イテラブルの要素が一つでも真であればTrue、全て偽であればFalseを返す" },
            { label: "ascii", kind: monaco.languages.CompletionItemKind.Function, insertText: "ascii", documentation: "オブジェクトをASCIIエスケープシーケンスで表現した文字列を返す" },
            { label: "bin", kind: monaco.languages.CompletionItemKind.Function, insertText: "bin", documentation: "整数を2進数で表した文字列を返す" },
            { label: "bool", kind: monaco.languages.CompletionItemKind.Function, insertText: "bool", documentation: "オブジェクトが真か偽かを判定する" },
            { label: "breakpoint", kind: monaco.languages.CompletionItemKind.Function, insertText: "breakpoint", documentation: "Python 3.7で導入された、デバッガーを起動するための特殊な関数" },
            { label: "bytearray", kind: monaco.languages.CompletionItemKind.Constructor, insertText: "bytearray", documentation: "指定されたバイト列を表すバイト配列オブジェクトを返す" },
            { label: "bytes", kind: monaco.languages.CompletionItemKind.Constructor, insertText: "bytes", documentation: "指定されたバイト列を表すイミュータブルなバイトオブジェクトを返す" },
            { label: "callable", kind: monaco.languages.CompletionItemKind.Function, insertText: "callable", documentation: "オブジェクトが呼び出し可能かどうかを判定する" },
            { label: "chr", kind: monaco.languages.CompletionItemKind.Function, insertText: "chr", documentation: "Unicodeコードポイントに対応する文字列を返す" },
            { label: "classmethod", kind: monaco.languages.CompletionItemKind.Function, insertText: "classmethod", documentation: "クラスメソッドを返すデスクリプタを作成する" },
            { label: "compile", kind: monaco.languages.CompletionItemKind.Function, insertText: "compile", documentation: "ソースコードをコンパイルしてコードオブジェクトを作成する" },
            { label: "complex", kind: monaco.languages.CompletionItemKind.Function, insertText: "complex", documentation: "複素数を作成する" },
            { label: "delattr", kind: monaco.languages.CompletionItemKind.Function, insertText: "delattr", documentation: "オブジェクトの属性を削除する" },
            { label: "dict", kind: monaco.languages.CompletionItemKind.Class, insertText: "dict", documentation: "キーと値のペアのコレクションを表す" },
            { label: "dir", kind: monaco.languages.CompletionItemKind.Function, insertText: "dir", documentation: "オブジェクトが持つ属性とメソッドのリストを返す" },
            { label: "divmod", kind: monaco.languages.CompletionItemKind.Function, insertText: "divmod", documentation: "商と余りのタプルを返す" },
            { label: "enumerate", kind: monaco.languages.CompletionItemKind.Function, insertText: "enumerate", documentation: "インデックスと要素のタプルを返す" },
            { label: "eval", kind: monaco.languages.CompletionItemKind.Function, insertText: "eval", documentation: "文字列を評価して結果を返す" },
            { label: "exec", kind: monaco.languages.CompletionItemKind.Function, insertText: "exec", documentation: "文字列を実行する" },
            { label: "filter", kind: monaco.languages.CompletionItemKind.Function, insertText: "filter", documentation: "指定された関数が True を返す要素からなるイテレータを返す" },
            { label: "float", kind: monaco.languages.CompletionItemKind.Function, insertText: "float", documentation: "浮動小数点数を作成する" },
            { label: "format", kind: monaco.languages.CompletionItemKind.Function, insertText: "format", documentation: "文字列をフォーマットする" },
            { label: "frozenset", kind: monaco.languages.CompletionItemKind.Class, insertText: "frozenset", documentation: "変更できないセットを表す" },
            { label: "getattr", kind: monaco.languages.CompletionItemKind.Function, insertText: "getattr", documentation: "オブジェクトの属性値を返す" },
            { label: "globals", kind: monaco.languages.CompletionItemKind.Function, insertText: "globals", documentation: "グローバル変数を含む辞書を返します" },
            { label: "hasattr", kind: monaco.languages.CompletionItemKind.Function, insertText: "hasattr", documentation: "オブジェクトが指定された属性を持っているかどうかを判定します" },
            { label: "hash", kind: monaco.languages.CompletionItemKind.Function, insertText: "hash", documentation: "オブジェクトのハッシュ値を返します" },
            { label: "help", kind: monaco.languages.CompletionItemKind.Function, insertText: "help", documentation: "オブジェクトのヘルプを表示します" },
            { label: "hex", kind: monaco.languages.CompletionItemKind.Function, insertText: "hex", documentation: "整数を16進数の文字列に変換します" },
            { label: "id", kind: monaco.languages.CompletionItemKind.Function, insertText: "id", documentation: "オブジェクトのIDを返します" },
            { label: "input", kind: monaco.languages.CompletionItemKind.Function, insertText: "input", documentation: "ユーザーからの入力を受け取ります" },
            { label: "int", kind: monaco.languages.CompletionItemKind.Function, insertText: "int", documentation: "文字列または浮動小数点数を整数に変換します" },
            { label: "isinstance", kind: monaco.languages.CompletionItemKind.Function, insertText: "isinstance", documentation: "オブジェクトが指定されたクラスのインスタンスであるかどうかを判定します" },
            { label: "issubclass", kind: monaco.languages.CompletionItemKind.Function, insertText: "issubclass", documentation: "クラスが指定されたクラスの派生クラスであるかどうかを判定します" },
            { label: "iter", kind: monaco.languages.CompletionItemKind.Function, insertText: "iter", documentation: "反復可能オブジェクトのイテレータを返す" },
            { label: "len", kind: monaco.languages.CompletionItemKind.Function, insertText: "len", documentation: "オブジェクトの長さを返す" },
            { label: "list", kind: monaco.languages.CompletionItemKind.Class, insertText: "list", documentation: "リストを生成する" },
            { label: "locals", kind: monaco.languages.CompletionItemKind.Function, insertText: "locals", documentation: "現在のスコープのローカル変数を取得する" },
            { label: "map", kind: monaco.languages.CompletionItemKind.Function, insertText: "map", documentation: "イテラブルな複数の引数に対して、関数を適用するイテレータを返す" },
            { label: "max", kind: monaco.languages.CompletionItemKind.Function, insertText: "max", documentation: "最大値を返す" },
            { label: "memoryview", kind: monaco.languages.CompletionItemKind.Class, insertText: "memoryview", documentation: "メモリ上のバッファを参照するためのビューを提供する" },
            { label: "min", kind: monaco.languages.CompletionItemKind.Function, insertText: "min", documentation: "最小値を返す" },
            { label: "next", kind: monaco.languages.CompletionItemKind.Function, insertText: "next", documentation: "イテレータの次の要素を返す" },
            { label: "object", kind: monaco.languages.CompletionItemKind.Class, insertText: "object", documentation: "オブジェクトのベースクラス" },
            { label: "oct", kind: monaco.languages.CompletionItemKind.Function, insertText: "oct", documentation: "10進数を8進数の文字列に変換する" },
            { label: "open", kind: monaco.languages.CompletionItemKind.Function, insertText: "open", documentation: "ファイルを開く" },
            { label: "ord", kind: monaco.languages.CompletionItemKind.Function, insertText: "ord", documentation: "Unicode文字の整数表現を返す" },
            { label: "pow", kind: monaco.languages.CompletionItemKind.Function, insertText: "pow", documentation: "xのy乗を返す" },
            { label: "print", kind: monaco.languages.CompletionItemKind.Function, insertText: "print", documentation: "標準出力にテキストを出力する" },
            { label: "property", kind: monaco.languages.CompletionItemKind.Class, insertText: "property", documentation: "属性アクセスを制御するディスクリプタを生成する" },
            { label: "range", kind: monaco.languages.CompletionItemKind.Function, insertText: "range", documentation: "指定された範囲の整数のシーケンスを作成する" },
            { label: "repr", kind: monaco.languages.CompletionItemKind.Function, insertText: "repr", documentation: "オブジェクトの文字列表現を返す" },
            { label: "reversed", kind: monaco.languages.CompletionItemKind.Function, insertText: "reversed", documentation: "シーケンスを逆順に反復する反復子を返す" },
            { label: "round", kind: monaco.languages.CompletionItemKind.Function, insertText: "round", documentation: "数値を指定の精度に四捨五入する" },
            { label: "set", kind: monaco.languages.CompletionItemKind.Class, insertText: "set", documentation: "一意な要素からなる集合を生成する" },
            { label: "setattr", kind: monaco.languages.CompletionItemKind.Function, insertText: "setattr", documentation: "オブジェクトの属性を設定する" },
            { label: "slice", kind: monaco.languages.CompletionItemKind.Class, insertText: "slice", documentation: "スライスを表すオブジェクトを生成する" },
            { label: "sorted", kind: monaco.languages.CompletionItemKind.Function, insertText: "sorted", documentation: "シーケンスをソートしてリストとして返す" },
            { label: "staticmethod", kind: monaco.languages.CompletionItemKind.Function, insertText: "staticmethod", documentation: "スタティックメソッドを定義する" },
            { label: "str", kind: monaco.languages.CompletionItemKind.Class, insertText: "str", documentation: "文字列を生成する" },
            { label: "sum", kind: monaco.languages.CompletionItemKind.Function, insertText: "sum", documentation: "シーケンスの要素の和を返す" },
            { label: "super", kind: monaco.languages.CompletionItemKind.Class, insertText: "super", documentation: "親クラスのメソッドを呼び出す" },
            { label: "tuple", kind: monaco.languages.CompletionItemKind.Class, insertText: "tuple", documentation: "イミュータブルなシーケンスを生成する" },
            { label: "type", kind: monaco.languages.CompletionItemKind.Function, insertText: "type", documentation: "オブジェクトの型を返す" },
            { label: "vars", kind: monaco.languages.CompletionItemKind.Function, insertText: "vars", documentation: "オブジェクトの属性を辞書として返す" },
            //ここから予約語
            { label: "zip", kind: monaco.languages.CompletionItemKind.Function, insertText: "zip", documentation: "複数のイテラブルを組み合わせて、タプルのイテレータを返す" },
            { label: 'and', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'and', detail: '論理演算子「かつ」' },
            { label: 'as', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'as', detail: 'エイリアス定義' },
            { label: 'assert', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'assert', detail: 'アサーション(検証)エラー発生時の処理' },
            { label: 'async', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'async', detail: '非同期処理を宣言' },
            { label: 'await', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'await', detail: '非同期処理が終了するまで待機' },
            { label: 'break', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'break', detail: 'ループから抜ける' },
            { label: 'class', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'class', detail: 'クラスの定義' },
            { label: 'continue', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'continue', detail: '次のループに進む' },
            { label: 'def', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'def', detail: '関数の定義' },
            { label: 'del', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'del', detail: '変数または属性を削除' },
            { label: 'elif', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'elif', detail: '「もしも」の条件分岐' },
            { label: 'else', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'else', detail: '「もしも」以外の条件分岐' },
            { label: 'except', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'except', detail: '例外の処理' },
            { label: 'False', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'False', detail: '偽値' },
            { label: 'finally', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'finally', detail: '例外の有無にかかわらず必ず実行される処理' },
            { label: 'for', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'for', detail: 'ループ処理' },
            { label: "from", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "from ", detail: "他のモジュールから関数や変数をインポートします。" },
            { label: "global", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "global ", detail: "グローバル変数を宣言します。" },
            { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if ", detail: "条件文で、指定された条件がTrueの場合にブロック内の処理を実行します。" },
            { label: "import", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "import ", detail: "他のモジュールから関数や変数をインポートします。" },
            { label: "in", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "in ", detail: "指定された要素が、指定されたシーケンス内に存在するかを判定します。" },
            { label: "is", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "is ", detail: "2つのオブジェクトが同じオブジェクトであるかどうかを判定します。" },
            { label: "lambda", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "lambda ", detail: "簡単な関数を定義します。" },
            { label: "None", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "None", detail: "Noneを表します。" },
            { label: "nonlocal", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "nonlocal ", detail: "ローカルスコープでない変数を指定します。" },
            { label: "not", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "not ", detail: "指定された条件がFalseである場合にTrueを返します。" },
            { label: "or", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "or ", detail: "指定された条件式のうち、どれか一つでもTrueである場合にTrueを返します。" },
            { label: "pass", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "pass", detail: "何もしません。" },
            { label: "raise", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "raise ", detail: "例外を発生させます。" },
            { label: "return", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "return ", detail: "関数から値を返します。" },
            { label: "True", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "True", detail: "Trueを表します。" },
            { label: "try", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "try:", detail: "例外処理を行う" },
            { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while ", detail: "条件がTrueである限り繰り返す" },
            { label: "with", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "with ", detail: "コンテキストマネージャを利用する" },
            { label: "yield", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "yield ", detail: "ジェネレータ関数内で値を返す" },
          ];

          const existingCode = model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: model.getLineCount(),
            endColumn: position.column,
          });
          let variables = existingCode.match(/[a-zA-Z_]+[a-zA-Z0-9_]*/g);
          variables = variables.filter((match, index, array) => {
            return array.indexOf(match) === index;
          });
          if (variables) {
            variables.forEach((variable) => {
              suggestions.push({
                label: variable,
                kind: monaco.languages.CompletionItemKind.Text,
                insertText: variable,
                range: null,
              });
            });
          }
        }

        // 補完アイテムの配列を返す
        return {
          suggestions: suggestions,
        };
      }
    },
  });
}

function changeLanguage(language) { 
  //languageがsupport_extentionに含まれているか確認
  //support_extentionのkeyを取得
  let keys = Object.keys(support_extention);

  //keyの中にlanguageが含まれているか確認
  if(keys.includes(language)){
    language = support_extention[language];
  }
  else{
    //コンソールにエラー送出
    console.error("Not supported language");

  }
  
  monaco.editor.setModelLanguage(model.getModel(), language);
}

function getEditorText() {
  return model.getValue();
}

function setEditorText(text) {
  model.setValue(text);
}

function changeTheme(theme) {
  monaco.editor.setTheme(theme);
}


