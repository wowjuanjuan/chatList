var check = function (str) {
  //   var regex1 = /\[(.+?)\]/g; // [] 中括号
  //   var regex2 = /\【(.+?)\】/g; // 【】中括号

  //暂时是有[/item]的时候把”]“换成>
  var len = str.length;
  console.log(len);
  var regex = /\[\/item\]/g;
  if (str.match(regex)) {
    // let arr=[]
    //给所有[]的加上\[  \]转义，使得正则表达式可以识别出[]
    // let arr1 = str.match(regex1);
    // console.log(arr1);
    // if (str.match(regex1)) {
    //   for (let index = 0; index < arr1.length; index++) {
    //     console.log("?");
    //     console.log(arr1[index]);
    //     console.log(typeof arr1[index]);
    //     // arr1[index].slice(arr1.length - 2, 0, "\\");
    //     // arr1[index] = "\\" + arr1[index];
    //     arr1[index] =
    //       "\\" +
    //       arr1[index].slice(0, arr1[index].length - 1) +
    //       "\\" +
    //       arr1[index].slice(arr1[index].length - 1);
    //     console.log(index);
    //     console.log(arr1[index]);
    //   }
    // }
    // console.log(arr1, arr1[0]);
    // console.log("\\", ["\\"]);
    // let arr = (arr1 || []).concat(str.match(regex2) || []);
    // console.log(arr);
    // if(!str.match(regex1)){
    //     arr=str.match(regex2)
    // }

    // console.log(arr);
    // for (let index = 0; index < arr.length; index++) {
    //   //   const element = arr[index];
    //   //   console.log("\\" + arr[index] + "\\");
    //   // let regStr="\\"+arr[index]
    //   let reg = new RegExp(arr[index], "g");
    //   //   console.log(reg, arr[index]);
    //   //   console.log(str);
    //   str = str.replace(
    //     // [item=123][/item]
    //     // [item=
    //     //     <span item=
    //     //     [/item] </span>
    //     reg,
    //     `<span class="equips" style="color:red">${arr[index]}</span>`
    //   );
    //   console.log(str);
    // }
    // let reg1 = new RegExp("[item", "g");
    // let reg2 = new RegExp("]", "g");
    // console.log(reg1, reg2);
    // console.log(
    //   str
    //     .replace(/\[item=(*)()/\]/g, "<span style='color:red' item=123")
    //     .replace(/\[\/item\]/g, "</span>")
    //     //将[item]的]变为>
    //     .replace(/\]/g, ">")
    //     //如果用户需要使用括号的话用<>代替[]
    //     .replace(/\[/g, "<")
    //   // .replace(/\/item\]/g, "</span>")
    // );
    // str = str
    //   .replace(/\[item=/g, "<a style='color:red' href='javascript:;' item=")
    //   .replace(/\[\/item\]/g, "</a>")
    //   //将[item]的]变为>
    //   .replace(/\]/g, ">")
    //   //如果用户需要使用括号的话用<>代替[]
    //   .replace(/\[/g, "< ");
    // console.log(str.replace(/\[item=.*?\]/g, "hello"));

    str.match(/\[item=.*?\]/g).forEach((val, index) => {
      console.log(val);
      let newVal =
        "<a href='javascript:;' style='color:red' item=" +
        val.slice(6, val.length - 1) +
        ">";
      console.log(val, newVal);

      //计算每个装备的长度
      len = len - val.length - 7;

      let reg = new RegExp(val, "g");
      //   console.log(reg);
      // console.log(val.substring(0, val.length - 1));
      //为了取得去除]的内容（[item=.*）
      val = val.substring(0, val.length - 1);
      // console.log(val);
      // console.log(new RegExp("\\" + val + "\\]", "g"));
      //替换掉[item=.*]
      str = str
        .replace(new RegExp("\\" + val + "\\]", "g"), newVal)
        .replace("[/item]", "</a>");
    });
    console.log(str);
    // console.log(str);
  }
  //   console.log(str);
  return { str, len };
};

// var check = function (str) {
//   let errorMsg = "";
//   let leftBracketsList = ["(", "（", "[", "【"];
//   let rightBracketsList = [")", "）", "]", "】"];
//   let BracketsDic = {
//     "(": ")",
//     "（": "）",
//     "[": "]",
//     "【": "】",
//   };
//   let leftBracket = null;
//   let leftBracketIndex = null;
//   let index = 1;

//   for (let char of str) {
//     // 是否左括号
//     if (leftBracketsList.includes(char)) {
//       // 是否已有左括号
//       if (leftBracket) {
//         errorMsg = `因括号不可嵌套，第${leftBracketIndex}个字符 ${leftBracket} 在匹配右括号前，不能出现第${index}个字符 ${char} `;
//         break;
//       } else {
//         leftBracket = char;
//         leftBracketIndex = index;
//       }
//     } else {
//       // 是否右括号
//       if (rightBracketsList.includes(char)) {
//         // 是否已有左括号
//         if (leftBracket) {
//           // 是否匹配左括号
//           if (BracketsDic[leftBracket] === char) {
//             leftBracket = null;
//             leftBracketIndex = null;
//           } else {
//             errorMsg = `第${leftBracketIndex}个字符 ${leftBracket} 与第${index}个字符 ${char} 不匹配`;
//             break;
//           }
//         } else {
//           errorMsg = `第${index}个字符 ${char} 前缺少左括号`;
//           break;
//         }
//       }
//     }
//     index++;
//   }

//   if (!errorMsg) {
//     if (leftBracket) {
//       errorMsg = `第${leftBracketIndex}个字符 ${leftBracket} 后缺少右括号`;
//     }
//   }

//   return errorMsg;
// };
