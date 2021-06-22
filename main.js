const week = ["日","月","火","水","木","金","土"];
// 変更予定が無いので定数(const)
const today = new Date();
// 月末だとズレる可能性があるため、1日固定で取得
// DateオブジェクトのインスタンスメソッドであるgetFullYearはDateオブジェクトが持つ値から年の値を取得する。getMonthも同様
let showDate = new Date(today.getFullYear(), today.getMonth(), 1);

// 初期表示
// onloadは、ページや画像などのリソース類を読み込んでから処理を実行したいときに利用。
// windowは無くても動作する(省略できる)
// windowオブジェクトはjsにあらかじめ用意されているオブジェクト
// JavaScriptであらかじめ用意されている関数やオブジェクトは、みなwindowオブジェクトのプロパティです。
window.onload = function() {
  showProcess(today, calendar);
};

// 前の月表示
// >,<をクリック後にnext(),prev()関数が呼び出される
function prev(){
  showDate.setMonth(showDate.getMonth() -1);
  showProcess(showDate);
}

// 次の月表示
function next(){
  showDate.setMonth(showDate.getMonth() +1);
  showProcess(showDate);
}

//  カレンダー表示
function showProcess(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  // querySelector()は,jsから任意のHTML要素を検出、取得することができるメソッド
  // #headerはcssセレクターこれに年月を表示させる
  document.querySelector('#header').innerHTML = year + "年" + (month + 1) + "月";

  // innerHTMLとはHTML要素の中身を変更するときに使われるプロパティである。
  // HTML要素の中身を自由に変更することで、動的なwebページを作成できる。
  let calendar = createProcess(year,month);
  document.querySelector('#calendar').innerHTML = calendar;
}

// カレンダー作成
function createProcess(year, month) {
  // 曜日
  let calendar = "<table><tr class='dayOfWeek'>";
  for (let i = 0; i < week.length; i++) {
    calendar += "<th>" + week[i] + "</th>";
  }
calendar += "</tr>";


let count = 0;
let startDayOfWeek = new Date(year, month, 1).getDay();
let endDate = new Date(year, month +1, 0).getDate();
let lastMonthEndDate = new Date(year, month, 0).getDate();
// Math.ceilは対象の値の小数点以下を切り上げる.floorは切り捨て
let row = Math.ceil((startDayOfWeek + endDate) / week.length);

// 1行ずつ設定
for (let i = 0; i < row; i++) {
  calendar += "<tr>";
  // 1colum単位で設定
  for (let j = 0; j < week.length; j++) {
    if (i == 0 && j < startDayOfWeek) {
      // 1行めで1日まで先月の日付を設定
      calendar += "<td class='disabled'>" +(lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
    } else if (count >= endDate){
      count++;
      calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
    } else {
      // 当月の日付を曜日に照らし合わせて設定
      count++;
      if(year == today.getFullYear()
        && month == (today.getMonth())
        && count == today.getDate()){
          calendar += "<td class='today'>" + count + "</td>";
        } else {
          calendar += "<td>" + count + "</td>";
        }
    }
  }
  calendar += "</tr>";
}
return calendar;
}