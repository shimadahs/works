//
// 実行方法：　コマンドプロンプトに以下のコマンドを入力
//
//                               node task2.js
//
///////////////////////////////////////////////////////////////
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(":memory:");
db.serialize(function () {

	// reportsテーブル作成
	db.run("CREATE TABLE reports(id INTEGER PRIMARY KEY, item_name VARCHER(255), weeknum integer, price integer)");
	db.run("INSERT INTO  reports VALUES  (1, 'Mandheling', 1, 36333)  ,(2, 'Guatemala', 1, 52030)  ,(3, 'Brazil', 1, 52182)  ,(4, 'Kenya', 1, 89655)  ,(5, 'Mandheling', 2, 36333)  ,(6, 'Guatemala', 2, 84293)  ,(7, 'Brazil', 2, 26551)  ,(8, 'Kenya', 2, 88429)  ,(9, 'Mandheling', 3,84776)  ,(10, 'Guatemala', 3, 40253)  ,(11, 'Brazil', 3, 67126)  ,(12, 'Kenya', 3, 95173)  ,(13, 'Mandheling', 4, 95251)  ,(14, 'Guatemala', 4, 50824)  ,(15, 'Brazil', 4, 80713)  ,(16, 'Kenya', 4, 11806)");

	// 作業テーブルに先週を示すカラムを追加
	db.run("CREATE TABLE work1(id INTEGER PRIMARY KEY, item_name VARCHER(255), lastweeknum integer, lastprice integer)");
	db.run("INSERT INTO work1 SELECT id, item_name, weeknum+1, price FROM reports");

	// 先週の売上データを追加
	db.run("CREATE TABLE work2(id INTEGER PRIMARY KEY, item_name VARCHER(255), weeknum integer, lastprice integer, price integer)");
	db.run("INSERT INTO work2 SELECT reports.id, reports.item_name, reports.weeknum, ifnull(work1.lastprice,0) , reports.price FROM reports LEFT OUTER JOIN work1 ON reports.item_name = work1.item_name AND reports.weeknum = work1.lastweeknum ORDER BY reports.item_name, reports.weeknum");

	// 売上状況(mark)を追加して出力
	db.all("SELECT item_name, weeknum, lastprice, price, CASE WHEN price > lastprice THEN '/' WHEN price < lastprice THEN '\\'  ELSE '-' END AS mark FROM work2 ORDER BY item_name, weeknum", (error, rows) =>{
		rows.forEach(row => console.log(row.item_name, row.weeknum, row.lastprice, row.price, row.mark));
	})
});
db.close();
