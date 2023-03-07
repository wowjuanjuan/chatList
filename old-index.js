//给装备添加点击事件

//获取相关标签
var _wrapper = document.querySelector("#wrapper");
var _inp = document.querySelector("#inp");
var _btn = document.querySelector("#btn");
var equipInfo = document.querySelector("#equipInfo");
var test = document.querySelector(".chat-text");
console.log(check);
//i是消息总数
var i = 0;
//chats是消息数组
var chats = [];
let str = `看我的新装备【暴击大剑】和[反曲弓]`;
check(str);

var mockData = function (inp) {
  if (i < 30) {
    i++;
  }
  return {
    imgHead: "./img/head.png",
    imgHeadIframe: "./img/head-background.png",
    name: "火焰之王 拉格纳罗斯",
    message: inp,
    messageIframe: "./img/head-background.png",
  };
};

//模拟调用接口获取数据并返回,inp是用户输入框输入数据
var getData = async function (inp) {
  //处理用户发送信息数据（对装备添加样式）
  inp = check(inp);
  console.log(inp);

  //模拟获取数据
  let data = mockData(inp);
  return data;
};

_btn.onclick = async function () {
  if (_inp.value.length > 60) {
    alert("请输入字符在60个以内");
  }
  if ((i = 29)) {
    //当已经有30信息的时候删除第一个
    chats.shift();
  }
  //_inp.value 是输入框的值
  let data = await getData(_inp.value);
  console.log(data);
  let name = data.name;
  let imgHead = data.imgHead;
  let imgHeadIframe = data.imgHeadIframe;
  let message = data.message;
  let messageIframe = data.messageIframe;
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
    <div style="border-image-source: url('${messageIframe}');" class="chat-text">
    ${message}
    </div>
  </div>
</div>
  `;
  chats[i] = str;
  //将数组变为字符串dom结构导入wrapper
  _wrapper.innerHTML = chats.join("");
  //点击发送后清空input
  _inp.value = "";

  let equips = document.querySelectorAll(".equips");
  console.log(equips);
  equips.forEach(function (item, index) {
    equips[index].onclick = function () {
      equipInfo.style.display = "block";
      equipInfo.innerHTML = `<table>
      <tbody>
        <tr>
          <td>
            <table style="width: 100%" class="equipInfo-main">
              <tbody>
                <tr>
                  <td>
                    <!--nstart--><b class="equipInfo-name"
                      >Magma Plated Chestguard</b
                    ><!--nend--><!--ndstart--><!--ndend--><span
                      class="equipInfo-level"
                      ><br />Item Level
                      <!--ilvl-->37</span
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
                    <span><!--amr-->17 Armor</span><br /><span
                      ><!--stat74-->+4 [Strength or Intellect]</span
                    ><br /><span><!--stat7-->+6 Stamina</span
                    ><!--ebstats--><br /><span class="equipInfo-mastery"
                      >+<!--rtg49--><span>3 Mastery</span
                      ><small> (0.02% @ L70)</small></span
                    ><br /><br />
    
                    Durability 165 / 165
                    <div class="wowhead-tooltip-item-classes">
                      Classes:
                      <span class="equipInfo-classes">Death Knight</span>
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
                    <!--rlvl-->32<br /><br />
                    <span class="equipInfo-suit">
                      <span class="q">Magma Plated Battlearmor </span>
                      (0/5)</span
                    >
                    <div class="q0 indent">
                      <span
                        ><!--si60349:65184--><span
                          >Magma Plated Chestguard</span
                        ></span
                      ><br /><span
                        ><!--si60350:65185--><span
                          >Magma Plated Handguards</span
                        ></span
                      ><br /><span
                        ><!--si60351:65186--><span
                          >Magma Plated Faceguard</span
                        ></span
                      ><br /><span
                        ><!--si60352:65187--><span
                          >Magma Plated Legguards</span
                        ></span
                      ><br /><span
                        ><!--si60353:65188--><span
                          >Magma Plated Shoulderguards</span
                        ></span
                      >
                    </div>
                    <br />
    
                    <div class="whtt-sellprice">
                      Sell Price: <span class="moneysilver">6</span>
                      <span class="moneycopper">50</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <th style="background-position: top right"></th>
        </tr>
        <tr>
          <th style="background-position: bottom left"></th>
          <th style="background-position: bottom right"></th>
        </tr>
      </tbody>
    </table>`;
      console.log(equips[index]);
    };
  });
};

//这里应该取详细装备，因暂时不清楚如何判断是否为装备，故此测试用；
test.onclick = function () {
  console.log("test");
  equipInfo.style.display = "block";
  //   console.log(equipInfo.style);
  // 在此将数据对象用${}的形式赋值进去
};
window.onclick = function (e) {
  console.log(1);
  console.log(e.target);
  console.log(e.target == _wrapper);
  if (e.target == _wrapper) {
    equipInfo.style.display = "none";
  }
};
