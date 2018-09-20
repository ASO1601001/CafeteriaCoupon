
//APIキーの設定とSDKの初期化
var appKey = "c8c2c2c8d06b4c42cf68fbdc6457476a50d459d0b31145ac6e5e002e0122d2e7";
var clientKey = "8849712cd4e2bd7cec95f092a029bff22fcccdd65d2ca851983e6e0dc9ee51dcs";
var ncmb = new NCMB(appKey, clientKey);

//------- [Demo2]保存したデータを全件検索し取得する-------//
function checkForm() {
  $("#formTable").empty();

  //インスタンスの生成
  var saveData = ncmb.DataStore("CouponTable");

  //データを降順で取得する
  saveData.order("createDate", true)
    .fetchAll()
    .then(function (results) {
      //全件検索に成功した場合の処理
      console.log("全件検索に成功しました：" + results.length + "件");
      //テーブルにデータをセット
      setData(results);
    })
    .catch(function (error) {
      //全件検索に失敗した場合の処理
      alert("全件検索に失敗しました：\n" + error);
      console.log("全件検索に失敗しました：\n" + error);
    });
}