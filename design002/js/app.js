
//APIキーの設定とSDKの初期化
var appKey = "c8c2c2c8d06b4c42cf68fbdc6457476a50d459d0b31145ac6e5e002e0122d2e7";
var clientKey = "8849712cd4e2bd7cec95f092a029bff22fcccdd65d2ca851983e6e0dc9ee51dc";
var ncmb = new NCMB(appKey, clientKey);

var category_obj;
var reader = new FileReader();
var i;
var j;
var a;


//カテゴリーテーブルを取得
function category() {
  var categoryData = ncmb.DataStore("CategoryTable");
  categoryData
    .fetchAll()
    .then(function (genre) {
      category_obj = JSON.parse(JSON.stringify(genre));
    })
    .catch(function (error) {
      //全件検索に失敗した場合の処理
      console.log("全件検索に失敗しました：\n" + error);
    });
}

function downloadImage(img) {
  // ファイル名からファイルを取得
  var fileName = img;
  // ダウンロード（データ形式をblobを指定）
  ncmb.File.download(fileName, "blob")
    .then(function (blob) {
      // ファイルリーダーにデータを渡す
      reader.readAsDataURL(blob);
    })
    .catch(function (err) {
      console.error(err);

    })
}


//クーポンテーブルを取得
function checkForm() {
  //カテゴリーテーブル実行
  category();
  var couponData = ncmb.DataStore("CouponTable");
  couponData
    .fetchAll()
    .then(function (results) {
      //全件検索に成功した場合の処理
      console.log("全件検索に成功しました：" + results.length + "件");
      //テーブルにデータをセット
      setData(results);
    })
    .catch(function (error) {
      //全件検索に失敗した場合の処理
      console.log("全件検索に失敗しました：\n" + error);
    });
}

//クーポンのカテゴリーを判定
function divide(menu_id) {
  parseInt(menu_id);
  //全件検索に成功した場合の処理
  for (j = 0; j < category_obj.length; j++) {
    if (menu_id == category_obj[j].ID && category_obj[j].ID == 1) {
      menu = "food";
      break;
    } else if (menu_id == category_obj[j].ID && category_obj[j].ID == 2) {
      menu = "drink";
      break;
    }
  }
  return menu;
}

function searchMenu(){
  
}

function setData(results) {
  for (i = 0; i < results.length; i++) {
    //カテゴリーIDと照合する
    menu = divide(results[i].category_id);
    downloadImage(results[i].photo);
    searchMenu(results[i].menu_id);
    if (menu == "food") {
      var list_food = document.getElementById("list-food");
      list_food.insertAdjacentHTML('afterbegin',
        '<div class="list-content">' +
        '<div class="img">' + '<img id="photo' + i + '">' + '</div>' +
        '<div class="name">' + results[i].name + '</div>' +
        '<div class=price>' + results[i].deadline + '</div>' +
        '<div class="coupon-btn"><span onclick="coupon_detail(' + results[i].ID + ')">クーポン</span></div>' +
        '</div>');
    } else if (menu == "drink") {
      var list_drink = document.getElementById("list-drink");
      list_drink.insertAdjacentHTML('afterbegin',
        '<div class="list-content">' +
        '<div class="img">' + '<img id="photo' + i + '">' + '</div>' +
        '<div class="name">' + results[i].name + '</div>' +
        '<div class=price>' + results[i].deadline + '</div>' +
        '<div class="coupon-btn"><span onclick="coupon_detail(' + results[i].ID + ')">クーポン</span></div>' +
        '</div>');
    }
  }
}
