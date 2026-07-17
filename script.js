const pageMeta = {
  workspace: ["工作台", "统一查看今日盲盒、活动、中奖核验与发放待办。"],
  regular: ["常规盲盒管理", "维护长期有效的任务规则、常规奖池与敏感操作确认。"],
  activityManage: ["活动管理", "盲盒 / 拉新 / 留存活动的创建、配置与生命周期管理。"],
  activity: ["活动配置", "配置项发布前可随意修改；发布后修改奖励记录类操作需二次确认。"],
  inventory: ["奖品库存管理", "常规盲盒与活动盲盒奖池独立统计，追加库存写入操作日志。"],
  analytics: ["数据看板", "查看活动奖池消耗、USDT 名单、参与用户与排行榜快照。"],
  logs: ["操作日志", "追踪草稿、发布、奖池追加、延期、核验、发放与结算。"],
  notice: ["公告推送", "配置首页 Banner、消息公告、登录弹窗和活动详情页内容。"]
};

const pageTitle = document.querySelector("#pageTitle");
const pageSub = document.querySelector("#pageSub");
const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

function navigateToPage(id) {
  navItems.forEach((nav) => nav.classList.toggle("active", nav.dataset.page === id));
  pages.forEach((page) => page.classList.toggle("active", page.id === id));
  pageTitle.textContent = pageMeta[id][0];
  pageSub.textContent = pageMeta[id][1];
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => navigateToPage(item.dataset.page));
});

const activityConfig = {
  box: {
    summary: [
      ["USDT 预算合计", "2,000"],
      ["积分预算合计", "1,010,000"],
      ["实物 / NFT", "24 件"],
      ["盲盒获取途径", "4 条规则"]
    ],
    steps: ["基本信息", "盲盒获取条件", "奖池与奖品", "中奖验证", "页面与推送"],
    panels: [
      `
        <div class="activity-card-head"><div><h2>基本信息</h2><p>活动的名称、时间与投放范围。</p></div></div>
        <div class="config-grid">
          <label>活动名称（中文）<input value="DataDID 盲盒狂欢季 S2" /></label>
          <label>活动名称（英文，用于海外端展示）<input value="DataDID Mystery Box Carnival S2" /></label>
          <label>开始时间（UTC）<input value="2026/08/01 00:00" /></label>
          <label>结束时间（UTC）<input value="2026/08/31 23:59" /></label>
          <label>活动来源标识<input value="memo official" /></label>
          <label>投放端
            <div class="chip-row"><span class="chip active">Web</span><span class="chip active">H5</span><span class="chip active">TG 小程序</span><span class="chip">Pi 浏览器</span></div>
          </label>
        </div>
        <div class="switch-line"><span class="switch"></span><div><b>活动延期</b><small>开启后可在活动结束前设置新的截止时间，延期操作自动写入日志。</small></div></div>
      `,
      `
        <div class="activity-card-head"><div><h2>盲盒获取条件（抽奖机会规则）</h2><p>定义用户通过哪些行为获得抽奖机会，可叠加多条规则。</p></div></div>
        <div class="rule-table">
          <div class="rule-head"><span>触发行为</span><span>获得次数</span><span>单用户上限</span><span>校验方式</span><span>备注</span><span>状态</span></div>
          ${[
            ["新用户注册并创建 DID", "1", "1", "校验：用户成功创建 DID", "选填", true],
            ["成功邀请 1 位新用户", "1", "不封顶", "校验：新用户绑定邀请人的邀请码", "B 绑定 A 的邀请码，计 A 邀请 1", true],
            ["安装插件并连接钱包", "1", "1", "校验：钱包地址登录 DataDID 插件", "前 10000 名额外 +200 积分", true],
            ["订阅 / 续订 AliveCheck", "1", "每次订阅 1 次", "校验：消耗 1000 积分完成订阅", "选填", false]
          ].map((row) => `
            <div class="rule-row">
              <select><option>${row[0]}</option></select>
              <input value="${row[1]}" />
              <input value="${row[2]}" />
              <span class="inline-tag">${row[3]}</span>
              <input value="${row[4]}" />
              <span class="switch ${row[5] ? "on" : ""}"></span>
            </div>`).join("")}
        </div>
        <button class="ghost small-action">+ 添加规则</button>
      `,
      `
        <div class="activity-card-head"><div><h2>奖池与奖品配置</h2><p>奖品类型、数量、释放节奏与中奖资格；无限类奖品用于保障 100% 中奖。</p></div></div>
        <div class="prize-table">
          <div class="prize-head"><span>奖品</span><span>类型</span><span>总数量</span><span>释放规则</span><span>中奖资格条件</span><span>单用户限中</span></div>
          ${[
            ["500 USDT", "USDT", "1", "定向：指定钱包地址 / ted 钱包地址", "配置给指定 DID 账号", "1"],
            ["300 USDT", "USDT", "1", "第 N 天释放 / 第 25 天", "邀请 ≥100，累计在线 ≥10 天", "1"],
            ["200 USDT", "USDT", "2", "第 N 天释放 / 第 15、20 天各 1", "邀请 ≥50，累计在线 ≥10 天", "1"],
            ["100 USDT", "USDT", "3", "日期区间 / 第 1-7 天", "邀请 ≥20", "1"],
            ["20 USDT", "USDT", "50", "全程随机", "无", "1"]
          ].map((row) => `
            <div class="prize-row">
              <input value="${row[0]}" />
              <span class="gold-pill">${row[1]}</span>
              <input value="${row[2]}" />
              <input value="${row[3]}" />
              <input value="${row[4]}" />
              <input value="${row[5]}" />
            </div>`).join("")}
        </div>
        <div class="risk-note">系统计算：当前权重合计 100%，预计活动第 27 天消耗 82% 奖池，USDT 奖池发布需运营复核并写入操作日志。</div>
      `,
      `
        <div class="activity-card-head"><div><h2>中奖验证流程（USDT / 实物）</h2><p>中奖后用户需在期限内完成任务，逾期未完成可作废并回收奖品。</p></div></div>
        <div class="config-grid">
          <label>验证完成期限<select><option>7 天内</option></select></label>
          <label>逾期处理<select><option>奖品作废并回收至奖池</option></select></label>
        </div>
        <div class="check-list">
          <div class="switch-line"><span class="switch on"></span><b>完成钱包地址绑定</b><span class="auto-tag">自动校验</span></div>
          <div class="switch-line"><span class="switch on"></span><b>完成 DID 创建</b><span class="auto-tag">自动校验</span></div>
          <div class="switch-line"><span class="switch on"></span><b>引用转发官方活动推文并 @MemoLabsOrg</b><span class="manual-tag">人工审核</span></div>
          <div class="switch-line"><span class="switch on"></span><b>发布中奖感言，最少</b><input class="tiny-input" value="50" /><b>字符</b><span class="manual-tag">人工审核</span></div>
          <div class="switch-line"><span class="switch on"></span><b>提供 MEMO DID 账号截图验证</b><span class="manual-tag">人工审核</span></div>
          <div class="switch-line"><span class="switch on"></span><b>USDT 奖励每抽中一次即在社群公布，发放后公布交易哈希</b></div>
        </div>
      `,
      `
        <div class="activity-card-head"><div><h2>页面与推送</h2><p>登录弹窗、Reward Center 活动详情、首页 Banner 与消息公告。</p></div></div>
        <div class="preview-layout">
          <div>
            <div class="config-grid">
              <label>弹窗主题
                <div class="segmented compact"><button class="active">金盲盒</button><button>活力绿</button></div>
              </label>
              <label>Web 弹出频率<select><option>每次登录弹出</option></select></label>
              <label class="full">主标题<input value="MYSTERY BOX SEASON IS LIVE!" /></label>
              <label>亮点卡片 1<input value="$2000 USDT Prize Pool" /></label>
              <label>亮点说明 1<input value="Win Up to 300 USDT | 100% Winning Rate" /></label>
              <label>CTA 按钮文案<input value="Open Boxes & Split $2,000 →" /></label>
              <label>点击跳转<select><option>活动详情页（Reward Center）</option></select></label>
            </div>
            <div class="upload-zone">上传活动 Banner（Web 1200×240 / H5 750×280，支持中英两套）</div>
            <label class="full">公告文案<textarea>【活动】DataDID 盲盒狂欢季已开启，注册 / 拉新即可抽取 USDT 与海量积分盲盒，点击查看详情 →</textarea></label>
          </div>
          <div class="phone-preview box-theme">
            <b>🎁</b><h3>MYSTERY BOX SEASON IS LIVE!</h3><small>2026.08.01 - 2026.08.31</small>
            <div class="phone-card">💰 $2000 USDT Prize Pool<br /><span>Win Up to 300 USDT</span></div>
            <div class="phone-card">👥 Refer & Get More Boxes<br /><span>+1 chance per referral</span></div>
            <button>Open Boxes & Split $2,000 →</button>
          </div>
        </div>
      `
    ]
  },
  rank: {
    summary: [
      ["USDT 预算合计", "800"],
      ["积分预算合计", "59,000"],
      ["实物 / NFT", "-"],
      ["奖励名次段", "5 段"]
    ],
    steps: ["基本信息", "排行规则", "名次奖励与门槛", "奖励发放与认领", "页面与推送"],
    panels: [
      `
        <div class="activity-card-head"><div><h2>基本信息</h2><p>活动的名称、时间与投放范围。</p></div></div>
        <div class="config-grid">
          <label>活动名称（中文）<input value="POC Ranking #R2 积分排行榜" /></label>
          <label>活动名称（英文，用于海外端展示）<input value="POC Ranking #R2" /></label>
          <label>开始时间（UTC）<input value="2026/08/01 00:00" /></label>
          <label>结束时间（UTC）<input value="2026/08/31 23:59" /></label>
          <label>活动来源标识<input value="memo official" /></label>
          <label>投放端
            <div class="chip-row"><span class="chip active">Web</span><span class="chip active">H5</span><span class="chip active">TG 小程序</span><span class="chip">Pi 浏览器</span></div>
          </label>
        </div>
        <div class="switch-line"><span class="switch"></span><div><b>活动延期</b><small>开启后可在活动结束前设置新的截止时间，延期操作自动写入日志。</small></div></div>
      `,
      `
        <div class="activity-card-head"><div><h2>排行规则</h2><p>积分排行榜的赛季、计分口径与榜单展示设置。</p></div></div>
        <div class="config-grid">
          <label>赛季编号<input value="R2" /></label>
          <label>结算周期<select><option>随活动时间（本期结算）</option></select></label>
          <label>参与资格<select><option>任何用户均可参加</option></select></label>
          <label>榜单更新频率<select><option>每日更新（最低要求）</option></select></label>
          <label>并列名次处理<select><option>先达到该分数者排前</option></select></label>
          <label>榜单展示维度
            <div class="chip-row"><span class="chip active">Event（活动积分）</span><span class="chip active">Points（总积分）</span><span class="chip active">Referral（邀请数）</span></div>
          </label>
          <label class="full">积分获取路径文案<input value="Create DID | Do tasks | Invite friends | More" /></label>
        </div>
        <div class="switch-line"><span class="switch on"></span><div><b>仅统计活动期间获得的积分</b><small>所有人从同一起跑线开始；活动开始前的存量积分不计入榜单。</small></div></div>
      `,
      `
        <div class="activity-card-head"><div><h2>名次奖励配置</h2><p>USDT 与积分混合发放；名次段可增删，小计与预算实时汇总。</p></div></div>
        <div class="reward-table">
          <div class="reward-head"><span>名次区间</span><span>奖励类型</span><span>单人奖励</span><span>人数</span><span>小计</span></div>
          ${[
            ["1", "USDT", "500", "1", "500 USDT"],
            ["2", "USDT", "200", "1", "200 USDT"],
            ["3", "USDT", "100", "1", "100 USDT"],
            ["4-10", "积分", "2000", "7", "14,000 积分"],
            ["11-100", "积分", "500", "90", "45,000 积分"]
          ].map((row) => `
            <div class="reward-row">
              <input value="${row[0]}" />
              <select><option>${row[1]}</option></select>
              <input value="${row[2]}" />
              <input value="${row[3]}" />
              <b>${row[4]}</b>
            </div>`).join("")}
        </div>
        <button class="ghost small-action">+ 添加名次段</button>
        <div class="divider"></div>
        <h3>领奖门槛（Important Requirements）</h3>
        <div class="threshold-grid">
          <input value="Top 3" /><input value="活动期间邀请真实用户数 ≥ 100" /><select><option>降格至积分奖励段位</option></select>
          <input value="Top 100" /><input value="活动期间邀请用户数 ≥ 10" /><select><option>取消领奖资格</option></select>
        </div>
      `,
      `
        <div class="activity-card-head"><div><h2>奖励发放与认领</h2><p>积分与 USDT 采用不同发放路径；结算前自动校验领奖门槛。</p></div></div>
        <div class="config-grid">
          <label>积分奖励发放<select><option>活动结束后自动到账</option></select></label>
          <label>USDT 认领方式<select><option>用户私信官方账号提交钱包地址</option></select></label>
          <label>认领期限<select><option>7 天内</option></select></label>
          <label>逾期处理<select><option>视为放弃，奖励回收</option></select></label>
        </div>
        <div class="check-list">
          <div class="switch-line"><span class="switch on"></span><b>结算时自动校验邀请数门槛</b><span class="auto-tag">同步自第 3 步</span></div>
          <div class="switch-line"><span class="switch on"></span><b>活动结束时冻结并公示最终榜单快照</b></div>
        </div>
      `,
      `
        <div class="activity-card-head"><div><h2>排行榜弹窗与页面</h2><p>登录弹窗、完整规则页、榜单页、首页 Banner 与消息中心公告。</p></div></div>
        <div class="preview-layout">
          <div>
            <div class="config-grid">
              <label class="full">弹窗主标题<input value="Point of Contribution Ranking" /></label>
              <label>轮次标签<input value="🏆 Round 2 · Live now" /></label>
              <label>活动时间展示<input value="⏰ 2026.08.01 - 2026.08.31" /></label>
              <label class="full">Event Rules 文案<input value="All start equal. More points = higher rank." /></label>
              <label class="full">Get Points 文案<input value="Create DID | Do tasks | Invite friends | More" /></label>
              <label>CTA 按钮文案<input value="View Full Leaderboard →" /></label>
              <label>规则页入口文案<input value="View full activity rules" /></label>
            </div>
            <div class="switch-line"><span class="switch on"></span><b>完整规则页（Full Activity Rules）</b><span class="auto-tag">同步自第 2 / 3 步</span></div>
            <div class="switch-line"><span class="switch on"></span><b>榜单页（Leaderboard）</b><span class="auto-tag">同步自第 2 步</span></div>
            <div class="upload-zone">上传活动 Banner（Web 1200×240 / H5 750×280，支持中英两套）</div>
            <label class="full">公告文案<textarea>【活动】POC Ranking #R2 已开启，完成任务、邀请好友即可冲榜赢取 USDT 与积分奖励。</textarea></label>
          </div>
          <div class="phone-preview rank-theme">
            <h3>Point of Contribution Ranking</h3><small>🏆 Round 2 · Live now</small>
            <div class="podium"><span>#2<br />+200</span><b>#1<br />+500</b><span>#3<br />+100</span></div>
            <div class="phone-card">Event Rules<br /><span>All start equal. More points = higher rank.</span></div>
            <div class="phone-card">Get Points<br /><span>Create DID | Do tasks | Invite friends</span></div>
            <button>View Full Leaderboard →</button>
          </div>
        </div>
      `
    ]
  }
};

const activityState = { type: "box", step: 0 };
const activityTypes = document.querySelectorAll(".activity-type");
const activitySummary = document.querySelector("#activitySummary");
const activitySteps = document.querySelector("#activitySteps");
const activityPanel = document.querySelector("#activityPanel");
const activityPublish = document.querySelector("#activityPublish");

function renderActivity() {
  const config = activityConfig[activityState.type];
  activityTypes.forEach((button) => {
    button.classList.toggle("active", button.dataset.type === activityState.type);
  });
  activitySummary.innerHTML = config.summary
    .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
    .join("") + `<p>预算随配置实时汇总，超出部门预算将标红提示</p>`;
  activitySteps.innerHTML = config.steps
    .map((label, index) => `
      <button class="${index === activityState.step ? "active" : ""}" data-activity-step="${index}">
        <span>${index + 1}</span>${label}
      </button>`)
    .join("");
  activityPanel.innerHTML = config.panels[activityState.step];
  activityPublish.classList.toggle("hidden", activityState.step !== config.steps.length - 1);
}

activityTypes.forEach((button) => {
  button.addEventListener("click", () => {
    activityState.type = button.dataset.type;
    activityState.step = 0;
    renderActivity();
  });
});

activitySteps?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-activity-step]");
  if (!button) return;
  activityState.step = Number(button.dataset.activityStep);
  renderActivity();
});

renderActivity();

const analyticsActivitySelect = document.querySelector("#analyticsActivitySelect");
const analyticsTypeTabs = document.querySelectorAll("[data-analytics-type]");
const analyticsBoxPane = document.querySelector("#analyticsBoxPane");
const analyticsRankPane = document.querySelector("#analyticsRankPane");

function setAnalyticsType(type) {
  analyticsTypeTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.analyticsType === type));
  analyticsBoxPane?.classList.toggle("active", type === "box");
  analyticsRankPane?.classList.toggle("active", type === "rank");
}

analyticsTypeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const type = tab.dataset.analyticsType;
    setAnalyticsType(type);
    if (analyticsActivitySelect) {
      const matched = [...analyticsActivitySelect.options].find((option) => option.dataset.kind === type);
      if (matched) analyticsActivitySelect.value = matched.value;
    }
  });
});

analyticsActivitySelect?.addEventListener("change", () => {
  const selected = analyticsActivitySelect.selectedOptions[0];
  setAnalyticsType(selected?.dataset.kind || "box");
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".manage-new") || event.target.closest(".manage-edit")) {
    activityState.type = "box";
    activityState.step = 0;
    renderActivity();
    navigateToPage("activity");
    return;
  }

  const dataButton = event.target.closest(".manage-data");
  if (!dataButton) return;
  if (analyticsActivitySelect) {
    const targetName = dataButton.dataset.activityName || "";
    const matched = [...analyticsActivitySelect.options].find((option) => option.textContent.includes(targetName));
    if (matched) analyticsActivitySelect.value = matched.value;
    const type = targetName.includes("Ranking") || targetName.includes("排行榜") ? "rank" : "box";
    setAnalyticsType(type);
  }
  navigateToPage("analytics");
});

const hashModal = document.querySelector("#hashModal");
const hashUser = document.querySelector("#hashUser");
const hashPrize = document.querySelector("#hashPrize");
const hashInput = document.querySelector("#hashInput");
const hashCancel = document.querySelector("#hashCancel");
const hashSubmit = document.querySelector("#hashSubmit");
let activeHashRow = null;

document.addEventListener("click", (event) => {
  const openButton = event.target.closest(".hash-open");
  if (!openButton) return;
  activeHashRow = openButton.closest(".analytics-table > div");
  hashUser.textContent = openButton.dataset.user;
  hashPrize.textContent = openButton.dataset.prize;
  hashInput.value = "";
  hashModal.classList.remove("hidden");
});

function closeHashModal() {
  hashModal.classList.add("hidden");
  activeHashRow = null;
}

hashCancel?.addEventListener("click", closeHashModal);

hashModal?.addEventListener("click", (event) => {
  if (event.target === hashModal) closeHashModal();
});

hashSubmit?.addEventListener("click", () => {
  if (activeHashRow) {
    const status = activeHashRow.querySelector(".pending");
    const action = activeHashRow.querySelector(".hash-open");
    status.className = "done";
    status.textContent = "已发放";
    action.classList.remove("hash-open");
    action.textContent = "查看哈希";
  }
  closeHashModal();
});

const inventoryTabs = document.querySelectorAll("[data-inventory-tab]");
const inventoryRegular = document.querySelector("#inventoryRegular");
const inventoryEvent = document.querySelector("#inventoryEvent");
const weightPanel = document.querySelector("#weightPanel");
const inventoryModal = document.querySelector("#inventoryModal");
const inventoryPrize = document.querySelector("#inventoryPrize");
const inventoryType = document.querySelector("#inventoryType");
const inventoryCurrent = document.querySelector("#inventoryCurrent");
const inventoryDrawn = document.querySelector("#inventoryDrawn");
const inventoryAddCount = document.querySelector("#inventoryAddCount");
const inventoryAfter = document.querySelector("#inventoryAfter");
const inventoryCancel = document.querySelector("#inventoryCancel");
const inventorySubmit = document.querySelector("#inventorySubmit");
let activeInventoryButton = null;
let activeInventoryCurrent = 0;

const regularRuleOpen = document.querySelector("#regularRuleOpen");
const regularRuleModal = document.querySelector("#regularRuleModal");
const regularRuleCancel = document.querySelector("#regularRuleCancel");
const regularRuleSubmit = document.querySelector("#regularRuleSubmit");

regularRuleOpen?.addEventListener("click", () => {
  regularRuleModal.classList.remove("hidden");
});

function closeRegularRuleModal() {
  regularRuleModal.classList.add("hidden");
}

regularRuleCancel?.addEventListener("click", closeRegularRuleModal);
regularRuleSubmit?.addEventListener("click", closeRegularRuleModal);
regularRuleModal?.addEventListener("click", (event) => {
  if (event.target === regularRuleModal) closeRegularRuleModal();
});

document.querySelector(".regular-go-inventory")?.addEventListener("click", () => navigateToPage("inventory"));

inventoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const isRegular = tab.dataset.inventoryTab === "regular";
    inventoryTabs.forEach((item) => item.classList.toggle("active", item === tab));
    inventoryRegular.classList.toggle("active", isRegular);
    inventoryEvent.classList.toggle("active", !isRegular);
    weightPanel.classList.toggle("active", isRegular);
  });
});

function updateInventoryAfter() {
  const addCount = Number(inventoryAddCount.value || 0);
  inventoryAfter.textContent = `${activeInventoryCurrent.toLocaleString()} → ${(activeInventoryCurrent + addCount).toLocaleString()}`;
}

document.addEventListener("click", (event) => {
  const noticeChip = event.target.closest(".notice-channel-row .chip");
  if (noticeChip) {
    noticeChip.classList.toggle("active");
    return;
  }

  const button = event.target.closest(".inventory-add");
  if (!button) return;
  activeInventoryButton = button;
  activeInventoryCurrent = Number(button.dataset.current.replace(/,/g, ""));
  inventoryPrize.textContent = button.dataset.prize;
  inventoryType.textContent = button.dataset.type;
  inventoryCurrent.textContent = button.dataset.current;
  inventoryDrawn.textContent = `${button.dataset.drawn} / ${button.dataset.left}`;
  inventoryAddCount.value = "10";
  updateInventoryAfter();
  inventoryModal.classList.remove("hidden");
});

inventoryAddCount?.addEventListener("input", updateInventoryAfter);

function closeInventoryModal() {
  inventoryModal.classList.add("hidden");
  activeInventoryButton = null;
}

inventoryCancel?.addEventListener("click", closeInventoryModal);

inventoryModal?.addEventListener("click", (event) => {
  if (event.target === inventoryModal) closeInventoryModal();
});

inventorySubmit?.addEventListener("click", () => {
  if (activeInventoryButton) {
    activeInventoryButton.textContent = "已追加";
    activeInventoryButton.disabled = true;
  }
  closeInventoryModal();
});
