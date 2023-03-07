//获取相关标签
var _wrapper = document.querySelector("#wrapper");
var _inp = document.querySelector("#inp");
var _btn = document.querySelector("#btn");
var equipInfo = document.querySelector("#equipInfo");
var test = document.querySelector(".chat-text");
var chatContent = document.querySelectorAll(".chat-content");
//i是消息计数器
var i = 0;
//totalMessage是消息上限
const totalMessage = 30;
//chats是消息数组
var chats = [];
// let str = `看我的新装备[item=12345]多兰剑[/item]和【暴击大剑】和[反曲弓] [item=12345]多兰剑[/item]`;
// check(str);
// let testStr = "你好啊的daa【[";
//测试汉字的个数
// console.log(testStr.match(/[\u4E00-\u9FA5]/g).length);

var mockMessageData = function (inp) {
  return {
    imgHead: "./img/head.png",
    imgHeadIframe: "./img/head-background.png",
    name: "火焰之王 拉格纳罗斯",
    message: inp,
    messageIframe: "./img/head-background.png",
  };
};
var mockEquipDetailData = function (item) {
  if (item == "12345") {
    return {
      name: "Magma Plated Chestguard",
      level: "37",
      Armor: "17",
      StrengthOrIntellect: "+4",
      Stamina: "+6",
      Mastery: "+3",
      Durability: "165 / 165",
      Classes: "Death Knight",
      RequiresLevel: "32",
      suitName: "Magma Plated Battlearmor",
      suitNumber: "0/5",
      suits: [
        "Magma Plated Chestguard",
        "Magma Plated Handguards",
        "Magma Plated Faceguard",
        "Magma Plated Legguards",
        "Magma Plated Shoulderguards",
      ],
      price: {
        gold: 6,
        silver: 50,
      },
    };
  }
  if (item == "54321") {
    return {
      name: "Magma Plated Chestguard",
      level: "37",
      Armor: "17",
      StrengthOrIntellect: "+4",
      Stamina: "+6",
      Mastery: "+3",
      Durability: "165 / 165",
      Classes: "Death Knight",
      RequiresLevel: "32",
      price: {
        gold: 6,
        silver: 50,
      },
    };
  }
};

//模拟调用接口获取数据并返回,inp是用户输入框输入数据
var getMessageData = async function (inp) {
  //处理用户发送信息数据（对装备添加样式）
  // inp = check(inp);
  // console.log(inp);
  //模拟获取数据
  let data = mockMessageData(inp);
  console.log(data);
  let tempData = check(data.message);
  console.log(tempData);
  data.message = tempData.str;
  data.messageLength = tempData.len;

  console.log(data);
  return data;
};
var getEquipDetail = async function (item) {
  //如果需要数据处理的话在此处理
  return mockEquipDetailData(item);
};

_btn.onclick = async function () {
  //_inp.value 是输入框的值
  let data = await getMessageData(_inp.value);
  //匹配中文个数
  if (data.messageLength > 55) {
    alert("输入内容过长");
    return;
  }

  console.log(data);
  let name = data?.name;
  let imgHead = data?.imgHead;
  let imgHeadIframe = data?.imgHeadIframe;
  let message = data?.message;
  let messageIframe = data?.messageIframe;
  let str = `
  <div class="chat">
  <div class="chat-name">${name}</div>
  <div class="chat-content">
    <div class="chat-pic">
      <img class="chat-pic-head" src="${imgHead}" alt="" />
      <img
        class="chat-pic-bacg"
        src="${imgHeadIframe}"
        alt=""
      />
    </div>
    <div style="border-image-source: url('${messageIframe}');"class="chat-text">
    ${message}
    </div>
  </div>
</div>
  `;
  console.log(i);

  chats[i] = str;
  if (i < totalMessage) {
    i++;
  }
  if (i > totalMessage - 1) {
    //当已经有30信息的时候删除第一个
    console.log(chats);
    console.log(i);
    chats.shift();
    // i--;
    console.log(chats);
  }

  console.log(chats, i);
  //将数组变为字符串dom结构导入wrapper
  _wrapper.innerHTML = chats.join("");

  //点击发送后清空input
  _inp.value = "";
};

//给整个主页面添加点击事件，如果点击到装备，那么就展示装备信息
_wrapper.onclick = async function (e) {
  //如果点到主页面，而没有点到装备，则隐藏装备详情
  equipInfo.style.display = "none";
  // 如果用户点击的结点有item属性则该结点为装备，此时弹出装备框并把item的值传递出去
  if (e.target.getAttribute("item")) {
    equipInfo.style.display = "block";
    // 传入item调取装备详情数据
    let equipDetail = await getEquipDetail(e.target.getAttribute("item"));
    console.log(equipDetail);
    equipInfo.innerHTML = `
    <table>
        <tbody>
          <tr>
            <td>
              <table style="width: 100%" class="equipInfo-main">
                <tbody>
                  <tr>
                    <td>
                      <!--nstart--><b class="equipInfo-name"
                        >${equipDetail?.name}</b
                      ><!--nend--><!--ndstart--><!--ndend--><span
                        class="equipInfo-level"
                        ><br />Item Level
                        <!--ilvl-->${equipDetail?.level}</span
                      ><!--bo--><br />Binds when picked up<!--ue-->
                      <table width="100%">
                        <tbody>
                          <tr>
                            <td>Chest</td>
                            <th>
                              <!--scstart4:4--><span class="q1">Plate</span
                              ><!--scend-->
                            </th>
                          </tr>
                        </tbody>
                      </table>
                      <span><!--amr-->${
                        equipDetail?.Armor
                      } Armor</span><br /><span
                        ><!--stat74-->${
                          equipDetail?.StrengthOrIntellect
                        } [Strength or Intellect]</span
                      ><br /><span><!--stat7-->${
                        equipDetail?.Stamina
                      } Stamina</span
                      ><!--ebstats--><br /><span class="equipInfo-mastery"
                        ><!--rtg49--><span>${equipDetail?.Mastery} Mastery</span
                        ><small> (0.02% @ L70)</small></span
                      ><br /><br />

                      Durability ${equipDetail?.Durability}
                      <div class="wowhead-tooltip-item-classes">
                        Classes:
                        <span class="equipInfo-classes">${
                          equipDetail?.Classes
                        }</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style="width: 100%" class="equipInfo-others">
                <tbody>
                  <tr>
                    <td>
                      <!--itemEffects:0-->Requires Level
                      <!--rlvl-->${equipDetail?.RequiresLevel}<br /><br />
                      <span class="equipInfo-suit">
                        <span class="q">${equipDetail?.suitName || ""} </span>
                        ${equipDetail?.suitNumber || ""}</span
                      >
                      <div class="q0 indent">
                        <span
                          ><!--si60349:65184--><div
                            >${
                              equipDetail.suits ? equipDetail.suits[0] : ""
                            }</div
                          ></div
                        ><span
                          ><!--si60350:65185--><div
                            >${
                              equipDetail.suits ? equipDetail.suits[1] : ""
                            }</div
                          ></span
                        ><span
                          ><!--si60351:65186--><div
                            >${
                              equipDetail.suits ? equipDetail.suits[2] : ""
                            }</div
                          ></span
                        ><span
                          ><!--si60352:65187--><div
                            >${
                              equipDetail.suits ? equipDetail.suits[3] : ""
                            }</div
                          ></span
                        ><span
                          ><!--si60353:65188--><div
                            >${
                              equipDetail.suits ? equipDetail.suits[4] : ""
                            }</div
                          ></div
                        >
                      </div>
                      <br />

                      <div class="whtt-sellprice">
                        Sell Price: <span class="moneysilver">${
                          equipDetail?.price.gold
                        }</span>
                        <span class="moneycopper">${
                          equipDetail?.price.silver
                        }</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>`;
  }
};
// `
//     <table>
//         <tbody>
//           <tr>
//             <td>
//               <table style="width: 100%" class="equipInfo-main">
//                 <tbody>
//                   <tr>
//                     <td>
//                       <!--nstart--><b class="equipInfo-name"
//                         >${equipDetail.name}</b
//                       ><!--nend--><!--ndstart--><!--ndend--><span
//                         class="equipInfo-level"
//                         ><br />Item Level
//                         <!--ilvl-->${equipDetail.level}</span
//                       ><!--bo--><br />Binds when picked up<!--ue-->
//                       <table width="100%">
//                         <tbody>
//                           <tr>
//                             <td>Chest</td>
//                             <th>
//                               <!--scstart4:4--><span class="q1">Plate</span
//                               ><!--scend-->
//                             </th>
//                           </tr>
//                         </tbody>
//                       </table>
//                       <span><!--amr-->${
//                         equipDetail.Armor
//                       } Armor</span><br /><span
//                         ><!--stat74-->${
//                           equipDetail.StrengthOrIntellect
//                         } [Strength or Intellect]</span
//                       ><br /><span><!--stat7-->${
//                         equipDetail.Stamina
//                       } Stamina</span
//                       ><!--ebstats--><br /><span class="equipInfo-mastery"
//                         ><!--rtg49--><span>${equipDetail.Mastery} Mastery</span
//                         ><small> (0.02% @ L70)</small></span
//                       ><br /><br />

//                       Durability ${equipDetail.Durability}
//                       <div class="wowhead-tooltip-item-classes">
//                         Classes:
//                         <span class="equipInfo-classes">${
//                           equipDetail.Classes
//                         }</span>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <table style="width: 100%" class="equipInfo-others">
//                 <tbody>
//                   <tr>
//                     <td>
//                       <!--itemEffects:0-->Requires Level
//                       <!--rlvl-->${equipDetail.RequiresLevel}<br /><br />
//                       <span class="equipInfo-suit">
//                         <span class="q">${equipDetail.suitName || ""} </span>
//                         ${equipDetail.suitNumber || ""}</span
//                       >
//                       <div class="q0 indent">
//                         <span
//                           ><!--si60349:65184--><div
//                             >${
//                               equipDetail.suits ? equipDetail.suits[0] : ""
//                             }</div
//                           ></div
//                         ><span
//                           ><!--si60350:65185--><div
//                             >${
//                               equipDetail.suits ? equipDetail.suits[1] : ""
//                             }</div
//                           ></span
//                         ><span
//                           ><!--si60351:65186--><div
//                             >${
//                               equipDetail.suits ? equipDetail.suits[2] : ""
//                             }</div
//                           ></span
//                         ><span
//                           ><!--si60352:65187--><div
//                             >${
//                               equipDetail.suits ? equipDetail.suits[3] : ""
//                             }</div
//                           ></span
//                         ><span
//                           ><!--si60353:65188--><div
//                             >${
//                               equipDetail.suits ? equipDetail.suits[4] : ""
//                             }</div
//                           ></div
//                         >
//                       </div>
//                       <br />

//                       <div class="whtt-sellprice">
//                         Sell Price: <span class="moneysilver">${
//                           equipDetail.price.gold
//                         }</span>
//                         <span class="moneycopper">${
//                           equipDetail.price.silver
//                         }</span>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </td>
//             <th style="background-position: top right"></th>
//           </tr>
//           <tr>
//             <th style="background-position: bottom left"></th>
//             <th style="background-position: bottom right"></th>
//           </tr>
//         </tbody>
//       </table>`;
