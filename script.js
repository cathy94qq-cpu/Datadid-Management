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
      ["盲盒获取途径", "0 条规则"]
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
            <div class="chip-row deploy-channel-row"><span class="chip active">Web</span><span class="chip active">H5</span><span class="chip active">TG 小程序</span><span class="chip">Pi 浏览器</span></div>
          </label>
        </div>
        <div class="switch-line"><span class="switch"></span><div><b>活动延期</b><small>开启后可在活动结束前设置新的截止时间，延期操作自动写入日志。</small></div></div>
      `,
      `
        <div class="activity-card-head"><div><h2>盲盒获取条件（抽奖机会规则）</h2><p>定义用户通过哪些行为获得抽奖机会，可叠加多条规则。</p></div></div>
        <div class="rule-table activity-rule-table">
          <div class="rule-head"><span>触发行为</span><span>获得次数</span><span>单用户上限</span><span>校验方式</span><span>备注</span><span>操作</span></div>
          <div class="activity-rule-empty">暂无盲盒获取条件，请点击「添加规则」手动配置。每条规则仅绑定一个触发行为，可按需添加多条。</div>
        </div>
        <button class="ghost small-action activity-rule-add" type="button">+ 添加规则</button>
      `,
      `
        <div class="activity-card-head"><div><h2>奖池与奖品配置</h2><p>奖品类型、数量、释放节奏与中奖资格；无限类奖品用于保障 100% 中奖。</p></div></div>
        <div class="activity-prize-list">
          <div class="activity-prize-empty">暂无奖品配置，请点击「添加奖品」手动设置金额、数量、释放阶段和中奖资格条件。</div>
        </div>
        <button class="ghost small-action activity-prize-add activity-prize-add-wide" type="button">+ 添加奖品</button>
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
        </div>
      `,
      `
        <div class="activity-card-head"><div><h2>页面与推送</h2><p>登录弹窗、Reward Center 活动详情、首页 Banner 与消息公告。</p></div></div>
        <div class="page-push-shell">
          <div class="page-push-tabs">
            <button class="page-push-tab active" type="button" data-push-tab="popup">登录弹窗</button>
            <button class="page-push-tab" type="button" data-push-tab="detail">活动详情页（Reward Center）</button>
            <button class="page-push-tab" type="button" data-push-tab="banner">Banner 与公告</button>
          </div>

          <div class="page-push-pane active" data-push-pane="popup">
            <div class="push-layout">
              <div>
                <div class="push-section-title">
                  <h3>登录弹窗</h3>
                  <p>结构固定为主视觉、主标题、活动时间、3 张亮点卡片和 CTA；缺一不可，活动延期后时间展示自动同步。</p>
                </div>
                <div class="config-grid push-form-grid">
                  <label>弹窗主题
                    <div class="segmented compact"><button class="active">金盲盒（盲盒季）</button><button>活力绿（AliveCheck）</button></div>
                  </label>
                  <label>主视觉图标
                    <div class="upload-mini">上传盲盒主视觉（建议 3x PNG 透明底）</div>
                  </label>
                  <label>Web 弹出频率<select><option>每次登录弹出</option><option>每日首次登录弹出</option></select></label>
                  <label>H5 / TG / Pi 端弹出频率<select><option>活动期仅弹一次</option><option>每次登录弹出</option></select></label>
                  <label class="full">主标题<input value="MYSTERY BOX SEASON IS LIVE!" /></label>
                  <label class="full">活动时间展示<input value="2026.08.01 - 2026.08.31" /></label>
                  <label>亮点卡片 1（奖池，高亮样式）<input value="$2000 USDT Prize Pool" /></label>
                  <label>亮点说明 1<input value="Win Up to 300 USDT | 100% Winning Rate" /></label>
                  <label>亮点卡片 2（新用户）<input value="Exclusive Newbie Gifts" /></label>
                  <label>亮点说明 2<input value="Register DID and get 1 lottery chance." /></label>
                  <label>亮点卡片 3（邀请）<input value="Refer & Get More Boxes" /></label>
                  <label>亮点说明 3<input value="+1 chance for each successful referral." /></label>
                  <label>CTA 按钮文案<input value="Open Boxes & Split $2,000 →" /></label>
                  <label>点击跳转<select><option>活动详情页（Reward Center）</option><option>盲盒抽奖页</option></select></label>
                </div>
              </div>
              <div>
                <p class="push-preview-label">实时预览（各端登录时）</p>
                <div class="phone-preview box-theme popup-preview">
                  <b>🎁</b><h3>MYSTERY BOX SEASON IS LIVE!</h3><small>⏰ 2026.08.01 - 2026.08.31</small>
                  <div class="phone-card highlight">🎁 $2000 USDT Prize Pool<br /><span>Win Up to 300 USDT | 100% Winning Rate</span></div>
                  <div class="phone-card">👤 Exclusive Newbie Gifts<br /><span>Register DID and get 1 lottery chance.</span></div>
                  <div class="phone-card">👥 Refer & Get More Boxes<br /><span>+1 chance for each successful referral.</span></div>
                  <button>Open Boxes & Split $2,000 →</button>
                </div>
              </div>
            </div>
          </div>

          <div class="page-push-pane" data-push-pane="detail">
            <div class="push-layout">
              <div>
                <div class="push-section-title">
                  <h3>活动详情页（Reward Center）</h3>
                  <p>模块化拼装，页面上所有文案均可编辑；奖项、参与方式、验证的结构自动同步前面步骤，支持中英两套。</p>
                </div>
                <div class="reward-detail-editor">
                  <section class="detail-edit-block">
                    <div class="detail-edit-head"><span class="switch on"></span><div><b>顶部 Banner</b><small>主视觉图 750×520；奖励金额与活动时间由配置叠加，文案可改写。</small></div></div>
                    <div class="upload-mini full-width">上传 Banner 主视觉</div>
                    <div class="detail-edit-grid">
                      <label>主标题文案<input value="Register to Receive a Blind Box, 100% Chance of Winning." /></label>
                      <label>时间 / 徽标文案<input value="Aug 1 – Aug 31, 2026 · Event" /></label>
                    </div>
                  </section>

                  <section class="detail-edit-block">
                    <div class="detail-edit-head"><span class="switch on"></span><div><b>奖项展示</b><span class="auto-tag">数量与金额同步自第 3 步</span><small>卡片名称（First / Lucky Prize 等）与名额描述均可逐条改写。</small></div></div>
                    <div class="detail-edit-grid two">
                      <input value="First Prize" /><input value="1 winner" />
                      <input value="Second Prize" /><input value="2 winners" />
                      <input value="Third Prize" /><input value="3 winners" />
                      <input value="Lucky Prize" /><input value="50 winners" />
                    </div>
                    <label>积分提示条文案<input value="✨ Complete to Earn Points — Redeemable for future MEMO airdrops!" /></label>
                  </section>

                  <section class="detail-edit-block">
                    <div class="detail-edit-head"><span class="switch on"></span><div><b>参与方式（How to Participate）</b><span class="auto-tag">条目同步自第 2 步</span><small>区块标题与每张卡片的标题、正文均可改写。</small></div></div>
                    <label>区块标题<input value="🎯 How to Participate" /></label>
                    <div class="detail-text-pair"><input value="✅ Plugin Installation" /><textarea>Instantly receive 1 Blind Box draw. First 10,000 users via plugin get +200 points.</textarea></div>
                    <div class="detail-text-pair"><input value="✅ New User" /><textarea>Register a MEMO Data DID account → complete DID creation to get 1 drawing chance!</textarea></div>
                    <div class="detail-text-pair"><input value="✅ Invite Friends" /><textarea>Every new user who binds your invitation code = +1 drawing chance.</textarea></div>
                  </section>

                  <section class="detail-edit-block">
                    <div class="detail-edit-head"><span class="switch on"></span><div><b>奖励发放说明（Reward Distribution）</b><small>区块标题与三条说明均可改写。</small></div></div>
                    <label>区块标题<input value="📋 Reward Distribution" /></label>
                    <div class="detail-edit-grid two"><input value="💰 USDT Rewards" /><input value="Distributed within 7 business days after event ends." /><input value="⚡ Point Rewards" /><input value="Credited instantly to your account." /><input value="🛡️ Transparent Process" /><input value="Transaction hash published and verifiable!" /></div>
                  </section>

                  <section class="detail-edit-block">
                    <div class="detail-edit-head"><span class="switch on"></span><div><b>中奖验证（Winner Verification）</b><span class="auto-tag">任务同步自第 4 步</span><small>任务条目同步第 4 步；区块标题可改写。</small></div></div>
                    <input value="🔐 Winner Verification" />
                  </section>

                  <section class="detail-edit-block">
                    <div class="detail-edit-head"><span class="switch on"></span><div><b>注意事项（Notices）</b><small>区块标题与三条注意事项均可改写。</small></div></div>
                    <input value="⚠️ Notices" />
                    <div class="detail-text-pair"><input value="Eligibility" /><textarea>Any cheating, abuse, or violation of fair participation results in disqualification.</textarea></div>
                    <div class="detail-text-pair"><input value="Information Accuracy" /><textarea>You are solely responsible for correct registration details and wallet address.</textarea></div>
                    <div class="detail-text-pair"><input value="Deadlines" /><textarea>Failure to meet deadlines is considered a forfeiture of your rights.</textarea></div>
                  </section>

                  <section class="detail-edit-block">
                    <div class="detail-edit-head"><span class="switch on"></span><div><b>底部吸底 CTA</b></div></div>
                    <input value="$2,000 in Prizes. Enter Now! →" />
                  </section>
                </div>
              </div>
              <div>
                <p class="push-preview-label">详情页预览（可滚动）</p>
                <div class="reward-preview">
                  <div class="reward-hero">
                    <small>← Reward Center</small>
                    <b>Register to Receive a Blind Box, 100% Chance of Winning.</b>
                    <strong>2000 USDT</strong>
                    <span>Aug 1 – Aug 31, 2026 · Event</span>
                  </div>
                  <div class="reward-card"><b>🥇 First Prize</b><span>300 USDT</span><small>1 winner</small></div>
                  <div class="reward-card"><b>🥈 Second Prize</b><span>200 USDT</span><small>2 winners</small></div>
                  <div class="reward-card"><b>🥉 Third Prize</b><span>100 USDT</span><small>3 winners</small></div>
                  <div class="reward-card"><b>🍀 Lucky Prize</b><span>20 USDT</span><small>50 winners</small></div>
                  <div class="reward-note">✨ Complete to Earn Points — Redeemable for future MEMO airdrops!</div>
                  <div class="reward-card reward-stack"><b>🎯 How to Participate</b><small>✅ Plugin Installation</small><small>✅ New User</small><small>✅ Invite Friends</small></div>
                  <button>$2,000 in Prizes. Enter Now! →</button>
                </div>
              </div>
            </div>
          </div>

          <div class="page-push-pane" data-push-pane="banner">
            <div class="push-section-title">
              <h3>Banner 与公告</h3>
              <p>首页 Banner 展示在已勾选投放端的首页，消息中心公告推送至已勾选投放端。</p>
            </div>
            <div class="push-card">
              <h3>首页 Banner</h3>
              <p>展示在各已勾选投放端的首页，点击跳转至活动详情页。</p>
              <div class="upload-zone">上传活动 Banner（Web 1200×240 / H5 750×280，支持中英两套）</div>
              <div class="config-grid">
                <label>Banner 跳转链接<input value="https://datadidapp.memolabs.net/activity" /></label>
                <label>展示排序<input value="1" /></label>
              </div>
            </div>
            <div class="push-card">
              <h3>消息中心公告</h3>
              <p>推送至已勾选投放端的消息中心。</p>
              <label class="full">公告文案<textarea>【活动】DataDID 盲盒狂欢季已开启，注册 / 拉新即可抽取 USDT 与海量积分盲盒，点击查看详情 →</textarea></label>
              <label>公告推送时间<select><option>活动开始时自动推送</option><option>定时推送</option><option>立即推送</option></select></label>
            </div>
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
            <div class="chip-row deploy-channel-row"><span class="chip active">Web</span><span class="chip active">H5</span><span class="chip active">TG 小程序</span><span class="chip">Pi 浏览器</span></div>
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
        <div class="activity-card-head"><div><h2>名次奖励配置</h2><p>名次区间自动连续，第一段从第 1 名起；只需填写每段的「截止名次」，起点与人数系统自动计算，杜绝缺口与重叠。</p></div></div>
        <div class="reward-table rank-tier-table">
          <div class="reward-head"><span>名次区间（起点自动 · 只填截止）</span><span>奖励类型</span><span>单人奖励</span><span>人数</span><span>小计</span><span></span></div>
          ${[
            ["1", "1", "第 1 名", "USDT", "500", "1", "500 USDT"],
            ["2", "2", "第 2 名", "USDT", "200", "1", "200 USDT"],
            ["3", "5", "第 3 - 5 名", "USDT", "100", "3", "300 USDT"],
            ["6", "10", "第 6 - 10 名", "积分", "2000", "5", "10,000 积分"],
            ["11", "100", "第 11 - 100 名", "积分", "500", "90", "45,000 积分"],
            ["101", "200", "第 101 - 200 名", "积分", "100", "100", "10,000 积分"],
            ["201", "300", "第 201 - 300 名", "积分", "100", "100", "10,000 积分"]
          ].map((row) => `
            <div class="reward-row">
              <div class="rank-range-cell"><span>${row[0]} -</span><input value="${row[1]}" /><em>${row[2]}</em></div>
              <select><option ${row[3] === "USDT" ? "selected" : ""}>USDT</option><option ${row[3] === "积分" ? "selected" : ""}>积分</option></select>
              <input value="${row[4]}" />
              <strong>${row[5]}</strong>
              <b class="${row[3] === "积分" ? "points-total" : "usdt-total"}">${row[6]}</b>
              <button class="icon-remove" type="button" aria-label="删除名次段">×</button>
            </div>`).join("")}
        </div>
        <button class="ghost small-action">+ 添加名次段</button>
        <div class="risk-note">规则校验：每段截止名次必须大于本段起点，且大于上一段截止；单段名次区间 = 上一段截止 + 1 至本段截止，人数与小计自动计算。</div>
        <div class="threshold-panel">
          <div class="threshold-title">
            <h3>领奖门槛（Important Requirements）</h3>
            <p>防刷榜机制：结算时校验，不达标按配置处理；各字段结构化独立编辑，改 Top 数或邀请数直接对应数字框，门槛同步展示在完整规则页。</p>
          </div>
          <div class="threshold-table">
            <div class="threshold-head"><span>适用范围</span><span>门槛条件</span><span>阈值</span><span>不达标处理</span><span></span></div>
            <div class="threshold-row">
              <div class="scope-cell">
                <select><option>前 N 名</option><option>名次区间</option></select>
                <div><span>前</span><input value="3" /><span>名（Top 3）</span></div>
              </div>
              <div class="condition-cell"><select><option>邀请真实用户数</option><option>邀请用户数</option><option>活动积分</option></select><span>≥</span></div>
              <input value="100" />
              <select><option>降格至积分奖励段位</option><option>取消领奖资格</option><option>保留名次但不发 USDT</option></select>
              <button class="icon-remove" type="button" aria-label="删除门槛">×</button>
            </div>
            <div class="threshold-row highlighted">
              <div class="scope-cell">
                <select><option>名次区间</option><option>前 N 名</option></select>
                <div><span>第</span><input value="4" /><span>-</span><input value="10" /><span>名（第 4-100 名）</span></div>
              </div>
              <div class="condition-cell"><select><option>邀请用户数</option><option>邀请真实用户数</option><option>活动积分</option></select><span>≥</span></div>
              <input value="10" />
              <select><option>取消领奖资格</option><option>降格至积分奖励段位</option><option>保留名次但不发 USDT</option></select>
              <button class="icon-remove" type="button" aria-label="删除门槛">×</button>
            </div>
          </div>
          <button class="ghost small-action" type="button">+ 添加门槛</button>
          <div class="risk-note">规则校验：多条门槛的名次范围不可重叠；邀请数校验口径与盲盒邀请码一致，「真实用户」判定可叠加设备指纹 / DID 活跃度。</div>
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
        <div class="page-push-shell rank-page-shell">
          <div class="rank-push-grid">
            <div class="page-push-tabs rank-page-tabs">
              <button class="page-push-tab active" type="button" data-push-tab="rank-popup">登录弹窗</button>
              <button class="page-push-tab" type="button" data-push-tab="rank-rules">完整规则页（Full Rules）</button>
              <button class="page-push-tab" type="button" data-push-tab="rank-leaderboard">榜单页（Leaderboard）</button>
              <button class="page-push-tab" type="button" data-push-tab="rank-banner">Banner 与公告</button>
            </div>

            <div>
              <div class="page-push-pane active" data-push-pane="rank-popup">
                <div class="push-layout">
                  <div>
                    <div class="push-section-title">
                      <h3>登录弹窗</h3>
                      <p>结构：主标题、轮次标签、活动时间、Top 3 奖牌、名次段积分、Event Rules / Get Points 卡、CTA 与规则页入口；奖励区同步第 3 步。</p>
                    </div>
                    <div class="config-grid push-form-grid">
                      <label class="full">弹窗主标题<input value="Point of Contribution Ranking" /></label>
                      <label>轮次标签<input value="🏆 Round 2 · Live now" /></label>
                      <label>活动时间展示<input value="⏰ 2026.08.01 - 2026.08.31" /></label>
                      <label class="full">Event Rules 文案<input value="All start equal. More points = higher rank." /></label>
                      <label class="full">Get Points 文案<input value="Create DID | Do tasks | Invite friends | More" /></label>
                      <label>CTA 按钮文案<input value="View Full Leaderboard →" /></label>
                      <label>规则页入口文案<input value="View full activity rules" /></label>
                    </div>
                    <div class="switch-line"><span class="switch on"></span><b>赛季主题皮肤</b><small>按赛季编号更换配色与主视觉，本期绿色系，页面结构不变。</small></div>
                  </div>
                  <div>
                    <p class="push-preview-label">弹窗预览（奖励区同步第 3 步）</p>
                    <div class="phone-preview rank-theme rank-popup-preview">
                      <h3>Point of Contribution Ranking</h3><small>🏆 Round 2 · Live now</small><small>⏰ 2026.08.01 - 2026.08.31</small>
                      <div class="podium"><span>🥈 #2<br />+200<br />24,400</span><b>🥇 #1<br />+500<br />25,400</b><span>🥉 #3<br />+100<br />22,400</span></div>
                      <div class="phone-card">Event Rules<br /><span>All start equal. More points = higher rank.</span></div>
                      <div class="phone-card">Get Points<br /><span>Create DID | Do tasks | Invite friends | More</span></div>
                      <button>View Full Leaderboard →</button>
                      <a class="phone-link">View full activity rules</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="page-push-pane" data-push-pane="rank-rules">
                <div class="push-layout">
                  <div>
                    <div class="push-section-title">
                      <h3>完整规则页（Full Activity Rules）</h3>
                      <p>页面上所有文字均可编辑；奖励结构、参与规则、提升排名、领奖门槛可同步前面步骤，支持中英双套文案。</p>
                    </div>
                    <div class="rank-rules-editor">
                      <section class="detail-edit-block">
                        <div class="detail-edit-head">
                          <span class="switch on"></span>
                          <div><b>顶部横幅</b><small>主视觉奖杯图随赛季与时间同步基本信息，文案可改写。</small></div>
                        </div>
                        <div class="detail-edit-grid two">
                          <label>赛季标题<input value="POC Ranking #R2" /></label>
                          <label>副标题（更新说明）<input value="Leaderboard updates daily" /></label>
                        </div>
                      </section>
                      <section class="detail-edit-block">
                        <div class="detail-edit-head">
                          <span class="switch on"></span>
                          <div><b>Reward Structure（奖励结构）</b><span class="auto-tag">金额与名次同步第 3 步</span><small>区块标题与各名次卡片名称、副标题均可改写。</small></div>
                        </div>
                        <div class="detail-edit-grid">
                          <input value="🎁 Reward Structure" />
                          <span></span>
                          <input value="1st Place" />
                          <input value="Champion Reward" />
                          <input value="2nd Place" />
                          <input value="Runner-up" />
                          <input value="3rd Place" />
                          <input value="Third Place" />
                          <input value="Rank 4-10" />
                          <input value="Rank 11-100" />
                        </div>
                      </section>
                      <section class="detail-edit-block">
                        <div class="detail-edit-head">
                          <span class="switch on"></span>
                          <div><b>Participation Rules（参与规则）</b><small>区块标题与各条标题、正文均可改写。</small></div>
                        </div>
                        <div class="detail-edit-grid two">
                          <input value="👥 Participation Rules" />
                          <span></span>
                          <input value="Eligibility" />
                          <input value="Everyone can join. All begin at the same baseline." />
                          <input value="Reward Distribution" />
                          <input value="Points auto-credited after end; USDT claimed via DM." />
                        </div>
                      </section>
                      <section class="detail-edit-block">
                        <div class="detail-edit-head">
                          <span class="switch on"></span>
                          <div><b>Boosting Your Rank（提升排名）</b><small>区块标题与三条提升方式的文案均可改写。</small></div>
                        </div>
                        <div class="detail-edit-grid">
                          <input class="full" value="📊 Boosting Your Rank" />
                          <input class="full" value="✅ Complete Tasks — check in, engage with content" />
                          <input class="full" value="✅ Invite Friends — bonus points for referrals" />
                          <input class="full" value="✅ Stay Active — higher rank = more points per action" />
                        </div>
                      </section>
                      <section class="detail-edit-block">
                        <div class="detail-edit-head">
                          <span class="switch on"></span>
                          <div><b>Important Requirements（领奖门槛）</b><span class="auto-tag">阈值同步第 3 步</span><small>区块标题与各档说明可改写，门槛数字同步配置。</small></div>
                        </div>
                        <div class="detail-edit-grid">
                          <input class="full" value="⚠️ Important Requirements" />
                          <input class="full" value="Top 3 — must invite ≥100 real users, else downgrade to points tier." />
                          <input class="full" value="Top 100 — must invite ≥10 users, else disqualified from rewards." />
                        </div>
                      </section>
                      <section class="detail-edit-block">
                        <div class="detail-edit-head">
                          <span class="switch on"></span>
                          <div><b>底部 CTA</b><small>完整规则页底部按钮文案。</small></div>
                        </div>
                        <input value="View Leaderboard →" />
                      </section>
                    </div>
                  </div>
                  <div>
                    <p class="push-preview-label">完整规则页预览（可滚动）</p>
                    <div class="rank-rules-preview">
                      <div class="rank-preview-top">← Full Activity Rules</div>
                      <div class="rank-preview-hero"><b>POC Ranking #R2</b><span>From Aug 1 to Aug 31, 2026 · Leaderboard updates daily</span></div>
                      <div class="rank-preview-card reward-lines">
                        <b>🎁 Reward Structure</b>
                        <p><strong>1st Place</strong><small>Champion Reward</small><em>500 USDT</em></p>
                        <p><strong>2nd Place</strong><small>Runner-up</small><em>200 USDT</em></p>
                        <p><strong>3rd Place</strong><small>Third Place</small><em>100 USDT</em></p>
                        <p><strong>Rank 4-10</strong><em class="points">2,000 Points</em></p>
                        <p><strong>Rank 11-100</strong><em class="points">500 Points</em></p>
                      </div>
                      <div class="rank-preview-card"><b>👥 Participation Rules</b><span><strong>Eligibility</strong><br />Everyone can join. All begin at the same baseline.<br /><br /><strong>Reward Distribution</strong><br />Points auto-credited after end; USDT claimed via DM.</span></div>
                      <div class="rank-preview-card"><b>📊 Boosting Your Rank</b><span>✅ Complete Tasks — check in, engage with content<br />✅ Invite Friends — bonus points for referrals<br />✅ Stay Active — higher rank = more points per action</span></div>
                      <div class="rank-warning-card"><b>⚠️ Important Requirements</b><span>Top 3 — must invite ≥100 real users, else downgrade to points tier.<br />Top 100 — must invite ≥10 users, else disqualified from rewards.</span></div>
                      <button>View Leaderboard →</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="page-push-pane" data-push-pane="rank-leaderboard">
                <div class="push-layout">
                  <div>
                    <div class="push-section-title">
                      <h3>榜单页（Leaderboard）</h3>
                      <p>头部奖池概要、Tab 维度、My Rank 置顶、Top 3 领奖台和 Top 100 列表；Tab 维度与更新频率同步第 2 步。</p>
                    </div>
                    <div class="push-section-list">
                      <div class="push-switch-item"><span class="switch on"></span><div><b>头部奖池概要</b><input value="Share 800 USDT + Massive Points" /><input value="Top 100 Get Extra Rewards!" /></div></div>
                      <div class="push-switch-item"><span class="switch on"></span><div><b>榜单 Tab 维度</b><span class="auto-tag">同步自第 2 步</span><small>Event / Points / Referral，取自排行规则的展示维度配置。</small></div></div>
                      <div class="push-switch-item"><span class="switch on"></span><div><b>My Rank 置顶</b><small>当前用户名次固定展示在列表顶部，含名次奖励徽标。</small></div></div>
                      <div class="push-switch-item"><span class="switch on"></span><div><b>Top 3 领奖台</b><span class="auto-tag">同步自第 3 步</span><small>前三名头像、名次徽标、USDT 奖励，中间为冠军高亮样式。</small></div></div>
                      <div class="push-switch-item"><span class="switch on"></span><div><b>Top 100 列表</b><span class="auto-tag">同步自第 3 步</span><small>名次奖励徽标（+2000 / +500）按名次段自动标注；榜单每日更新。</small></div></div>
                    </div>
                  </div>
                  <div>
                    <p class="push-preview-label">榜单页预览（可滚动）</p>
                    <div class="rank-leaderboard-preview">
                      <small>← Leaderboard</small>
                      <div class="rank-board-hero"><b>POC Ranking #R2</b><span>Share 800 USDT + Massive Points · Top 100 Get Extra!</span></div>
                      <div class="rank-board-tabs"><b>Event</b><span>Points</span><span>Referral</span></div>
                      <div class="rank-me">CryptoKing <em>+2000</em><strong>195,000 · #6</strong></div>
                      <div class="rank-board-podium"><span>#2<br />Cathy<br />24,400</span><b>#1<br />Olivia<br />25,400</b><span>#3<br />Lonika<br />22,400</span></div>
                      <div class="rank-list-row">user_004 <em>+2000</em><strong>199,000 · #4</strong></div>
                      <div class="rank-list-row">user_005 <em>+2000</em><strong>196,000 · #5</strong></div>
                      <div class="rank-list-row">user_011 <em>+500</em><strong>163,000 · #11</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="page-push-pane" data-push-pane="rank-banner">
                <div class="rank-banner-pane">
                  <div class="push-card">
                    <h3>首页 Banner</h3>
                    <p>展示在各已勾选投放端的首页，点击跳转至活动详情页。</p>
                    <div class="upload-zone">上传活动 Banner（Web 1200×240 / H5 750×280，支持中英两套）</div>
                    <div class="config-grid">
                      <label>Banner 跳转链接<input value="https://datadidapp.memolabs.net/activity" /></label>
                      <label>展示排序<input value="1" /></label>
                    </div>
                  </div>
                  <div class="push-card">
                    <h3>消息中心公告</h3>
                    <p>推送至已勾选投放端的消息中心。</p>
                    <label class="full">公告文案<textarea>【活动】POC Ranking #R2 已开启，完成任务、邀请好友即可冲榜赢取 USDT 与积分奖励，点击查看详情 →</textarea></label>
                    <label>公告推送时间<select><option>活动开始时自动推送</option><option>定时推送</option><option>立即推送</option></select></label>
                  </div>
                </div>
              </div>
            </div>
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
    .map(([label, value]) => `<div><span>${label}</span><strong class="${label === "盲盒获取途径" ? "activity-rule-count" : ""}">${value}</strong></div>`)
    .join("") + `<p>预算随配置实时汇总，超出部门预算将标红提示</p>`;
  activitySteps.innerHTML = config.steps
    .map((label, index) => `
      <button class="${index === activityState.step ? "active" : ""}" data-activity-step="${index}">
        <span>${index + 1}</span>${label}
      </button>`)
    .join("");
  activityPanel.innerHTML = config.panels[activityState.step];
  if (activityState.type === "box" && activityState.step === 2) {
    const list = activityPanel.querySelector(".activity-prize-list");
    if (list && !list.querySelector(".activity-prize-card")) list.appendChild(createActivityPrizeCard());
    updateActivityPrizeEmpty();
  }
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

const activityRuleOptions = [
  ["创建DID", "校验：用户成功创建 DID"],
  ["邀请新用户", "校验：新用户绑定邀请人的邀请码"],
  ["安装插件并连接钱包", "校验：插件安装完成且钱包连接成功"],
  ["订阅或续订 AliveCheck", "校验：订阅或续订订单成功"],
  ["插件开启挖矿功能", "校验：插件挖矿功能处于开启状态"],
  ["自定义扩展行为", "校验：按事件上报口径校验"]
];

function updateActivityRuleCount() {
  const rows = activityPanel.querySelectorAll(".activity-rule-row");
  const empty = activityPanel.querySelector(".activity-rule-empty");
  const count = rows.length;
  if (empty) empty.classList.toggle("hidden", count > 0);
  const countNode = activitySummary.querySelector(".activity-rule-count");
  if (countNode && activityState.type === "box") countNode.textContent = `${count} 条规则`;
}

function createActivityRuleRow() {
  const options = activityRuleOptions
    .map(([label]) => `<option>${label}</option>`)
    .join("");
  const [firstLabel, firstValidation] = activityRuleOptions[0];
  const row = document.createElement("div");
  row.className = "rule-row activity-rule-row";
  row.innerHTML = `
    <select class="activity-rule-trigger">${options}</select>
    <input value="1" />
    <select><option selected>1</option><option>不封顶</option></select>
    <span class="inline-tag activity-rule-validation">${firstValidation}</span>
    <input value="选填" />
    <button class="ghost mini activity-rule-delete" type="button">删除</button>
  `;
  row.querySelector(".activity-rule-trigger").value = firstLabel;
  return row;
}

function updateActivityPrizeEmpty() {
  const rows = activityPanel.querySelectorAll(".activity-prize-card");
  const empty = activityPanel.querySelector(".activity-prize-empty");
  if (empty) empty.classList.toggle("hidden", rows.length > 0);
  rows.forEach((row, index) => {
    const indexNode = row.querySelector(".activity-prize-index");
    if (indexNode) indexNode.textContent = String(index + 1);
  });
}

function createReleaseStage(day = "1", count = "1") {
  const stage = document.createElement("div");
  stage.className = "release-stage";
  stage.innerHTML = `
    <span>第</span>
    <input value="${day}" inputmode="numeric" />
    <span>天释放</span>
    <input value="${count}" inputmode="numeric" />
    <span>个</span>
    <button class="ghost mini release-stage-delete" type="button">删除</button>
  `;
  return stage;
}

function createActivityPrizeCard() {
  const card = document.createElement("div");
  card.className = "activity-prize-card";
  card.innerHTML = `
    <div class="activity-prize-card-head">
      <strong>奖品 #<span class="activity-prize-index">1</span></strong>
      <div class="activity-prize-actions">
        <span class="activity-prize-state">状态</span>
        <span class="switch on activity-prize-status-toggle" role="button" tabindex="0" aria-label="当前启用，点击下架"></span>
        <button class="ghost mini activity-prize-delete" type="button">删除奖品</button>
      </div>
    </div>
    <div class="activity-prize-content">
      <div class="activity-prize-main">
        <div class="activity-prize-fields">
          <label>奖品金额<input value="20 USDT" /></label>
          <label>类型<select><option>USDT</option><option>积分</option><option>实物</option><option>NFT</option></select></label>
          <label>数量<input value="1" inputmode="numeric" /></label>
        </div>
        <div class="release-config">
          <div class="subsection-head"><b>释放规则</b><button class="ghost mini release-stage-add" type="button">+ 添加释放阶段</button></div>
          <div class="release-stage-list"></div>
        </div>
      </div>
      <aside class="qualification-config">
        <b>中奖资格条件</b>
        <div class="qualification-grid">
          <label>邀请真实用户数 ≥<input value="0" inputmode="numeric" /></label>
          <label>累计在线天数 ≥<input value="0" inputmode="numeric" /></label>
          <label>单用户可中奖次数上限<input value="1" inputmode="numeric" /></label>
        </div>
      </aside>
    </div>
  `;
  card.querySelector(".release-stage-list").appendChild(createReleaseStage());
  card.querySelector(".release-stage-list").appendChild(createReleaseStage());
  return card;
}

function formatRankLabel(start, end) {
  return start === end ? `第 ${start} 名` : `第 ${start} - ${end} 名`;
}

function formatRankTotal(value, type) {
  return `${value.toLocaleString()} ${type}`;
}

function updateRankTierTable(table) {
  if (!table) return;
  let nextStart = 1;
  table.querySelectorAll(".reward-row").forEach((row) => {
    const rangeCell = row.querySelector(".rank-range-cell");
    const endInput = rangeCell?.querySelector("input");
    const rewardInput = row.querySelector(":scope > input");
    const typeSelect = row.querySelector("select");
    const people = row.querySelector("strong");
    const total = row.querySelector("b");
    if (!rangeCell || !endInput || !rewardInput || !typeSelect || !people || !total) return;

    const parsedEnd = Number.parseInt(endInput.value, 10);
    const end = Number.isFinite(parsedEnd) ? Math.max(parsedEnd, nextStart) : nextStart;
    if (endInput.value !== String(end)) endInput.value = String(end);

    const count = end - nextStart + 1;
    const reward = Math.max(Number.parseInt(rewardInput.value, 10) || 0, 0);
    const type = typeSelect.value;
    rangeCell.querySelector("span").textContent = `${nextStart} -`;
    rangeCell.querySelector("em").textContent = formatRankLabel(nextStart, end);
    people.textContent = String(count);
    total.textContent = formatRankTotal(reward * count, type);
    total.classList.toggle("points-total", type === "积分");
    total.classList.toggle("usdt-total", type !== "积分");
    nextStart = end + 1;
  });
}

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
const regularStatusModal = document.querySelector("#regularStatusModal");
const regularStatusTitle = document.querySelector("#regularStatusTitle");
const regularStatusText = document.querySelector("#regularStatusText");
const regularStatusFrom = document.querySelector("#regularStatusFrom");
const regularStatusTo = document.querySelector("#regularStatusTo");
const regularStatusCancel = document.querySelector("#regularStatusCancel");
const regularStatusConfirm = document.querySelector("#regularStatusConfirm");
let pendingRegularSwitch = null;
let pendingInventorySwitch = null;
let pendingActivityPrizeSwitch = null;

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

function refreshAchievementOrder(table) {
  const rows = Array.from(table.querySelectorAll(":scope > div:not(.regular-rule-head)"));
  rows.forEach((row, index) => {
    const orderInput = row.querySelector("input");
    if (orderInput) orderInput.value = String(index + 1);
  });
}

function openRegularStatusConfirm(button) {
  pendingInventorySwitch = null;
  pendingActivityPrizeSwitch = null;
  pendingRegularSwitch = button;
  const row = button.closest(".regular-rule-table > div");
  const ruleName = row?.querySelector("b")?.childNodes?.[0]?.textContent?.trim() || "该规则";
  const willHide = button.classList.contains("on");
  regularStatusTitle.textContent = willHide ? `确认下架「${ruleName}」` : `确认启用「${ruleName}」`;
  regularStatusText.textContent = willHide
    ? "关闭后该规则将从用户端隐藏并立即失效，用户不会再通过该规则获得常规盲盒。"
    : "开启后该规则将在用户端可见并立即生效，用户满足条件后可获得常规盲盒。";
  regularStatusFrom.textContent = willHide ? "当前：用户端可见 / 规则生效" : "当前：用户端隐藏 / 规则失效";
  regularStatusTo.textContent = willHide ? "调整后：用户端隐藏 / 规则失效" : "调整后：用户端可见 / 规则生效";
  regularStatusModal.classList.remove("hidden");
}

function openInventoryStatusConfirm(button) {
  pendingRegularSwitch = null;
  pendingActivityPrizeSwitch = null;
  pendingInventorySwitch = button;
  const row = button.closest(".inventory-table > div");
  const prizeName = row?.querySelector("b")?.childNodes?.[0]?.textContent?.trim() || "该奖品档位";
  const willDisable = button.classList.contains("on");
  regularStatusTitle.textContent = willDisable ? `确认下架「${prizeName}」` : `确认启用「${prizeName}」`;
  regularStatusText.textContent = willDisable
    ? "关闭后该奖品档位将从当前活动盲盒奖池中下架，用户端不再抽中该档位，剩余权重将按规则重新归一。"
    : "开启后该奖品档位将重新进入当前活动盲盒奖池，用户端可按配置权重抽中该档位。";
  regularStatusFrom.textContent = willDisable ? "当前：奖池启用 / 用户可抽中" : "当前：奖池下架 / 用户不可抽中";
  regularStatusTo.textContent = willDisable ? "调整后：奖池下架 / 用户不可抽中" : "调整后：奖池启用 / 用户可抽中";
  regularStatusModal.classList.remove("hidden");
}

function openActivityPrizeStatusConfirm(button) {
  pendingRegularSwitch = null;
  pendingInventorySwitch = null;
  pendingActivityPrizeSwitch = button;
  const card = button.closest(".activity-prize-card");
  const prizeName = card?.querySelector(".activity-prize-card-head strong")?.textContent?.trim() || "该奖品";
  const willDisable = button.classList.contains("on");
  regularStatusTitle.textContent = willDisable ? `确认下架「${prizeName}」` : `确认启用「${prizeName}」`;
  regularStatusText.textContent = willDisable
    ? "关闭后该奖品将从当前活动奖池中下架，用户端不再抽中该奖品，已配置的释放规则与中奖资格条件会保留。"
    : "开启后该奖品将重新进入当前活动奖池，用户端可按配置规则抽中该奖品。";
  regularStatusFrom.textContent = willDisable ? "当前：奖品启用 / 用户可抽中" : "当前：奖品下架 / 用户不可抽中";
  regularStatusTo.textContent = willDisable ? "调整后：奖品下架 / 用户不可抽中" : "调整后：奖品启用 / 用户可抽中";
  regularStatusModal.classList.remove("hidden");
}

function closeRegularStatusConfirm() {
  regularStatusModal.classList.add("hidden");
  pendingRegularSwitch = null;
  pendingInventorySwitch = null;
  pendingActivityPrizeSwitch = null;
}

regularStatusCancel?.addEventListener("click", closeRegularStatusConfirm);
regularStatusModal?.addEventListener("click", (event) => {
  if (event.target === regularStatusModal) closeRegularStatusConfirm();
});
regularStatusConfirm?.addEventListener("click", () => {
  if (pendingRegularSwitch) {
    const isOn = pendingRegularSwitch.classList.toggle("on");
    pendingRegularSwitch.setAttribute(
      "aria-label",
      isOn ? "当前用户端可见，点击下架" : "当前用户端隐藏，点击启用"
    );
    pendingRegularSwitch.closest(".regular-rule-table > div")?.classList.toggle("rule-disabled", !isOn);
  }
  if (pendingInventorySwitch) {
    const isOn = pendingInventorySwitch.classList.toggle("on");
    pendingInventorySwitch.classList.remove("warn");
    pendingInventorySwitch.setAttribute(
      "aria-label",
      isOn ? "当前启用，点击下架" : "当前已下架，点击启用"
    );
  }
  if (pendingActivityPrizeSwitch) {
    const isOn = pendingActivityPrizeSwitch.classList.toggle("on");
    pendingActivityPrizeSwitch.setAttribute(
      "aria-label",
      isOn ? "当前启用，点击下架" : "当前已下架，点击启用"
    );
    pendingActivityPrizeSwitch.closest(".activity-prize-card")?.classList.toggle("prize-disabled", !isOn);
  }
  closeRegularStatusConfirm();
});

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

  const deployChip = event.target.closest(".deploy-channel-row .chip");
  if (deployChip) {
    const row = deployChip.closest(".deploy-channel-row");
    const activeCount = row.querySelectorAll(".chip.active").length;
    if (deployChip.classList.contains("active") && activeCount === 1) return;
    deployChip.classList.toggle("active");
    return;
  }

  const pagePushTab = event.target.closest(".page-push-tab");
  if (pagePushTab) {
    const shell = pagePushTab.closest(".page-push-shell");
    const target = pagePushTab.dataset.pushTab;
    shell?.querySelectorAll(".page-push-tab").forEach((tab) => {
      tab.classList.toggle("active", tab === pagePushTab);
    });
    shell?.querySelectorAll(".page-push-pane").forEach((pane) => {
      pane.classList.toggle("active", pane.dataset.pushPane === target);
    });
    return;
  }

  const activityRuleAdd = event.target.closest(".activity-rule-add");
  if (activityRuleAdd) {
    const table = activityPanel.querySelector(".activity-rule-table");
    table?.appendChild(createActivityRuleRow());
    updateActivityRuleCount();
    return;
  }

  const activityRuleDelete = event.target.closest(".activity-rule-delete");
  if (activityRuleDelete) {
    activityRuleDelete.closest(".activity-rule-row")?.remove();
    updateActivityRuleCount();
    return;
  }

  const activityPrizeAdd = event.target.closest(".activity-prize-add");
  if (activityPrizeAdd) {
    const list = activityPanel.querySelector(".activity-prize-list");
    list?.appendChild(createActivityPrizeCard());
    updateActivityPrizeEmpty();
    return;
  }

  const activityPrizeDelete = event.target.closest(".activity-prize-delete");
  if (activityPrizeDelete) {
    activityPrizeDelete.closest(".activity-prize-card")?.remove();
    updateActivityPrizeEmpty();
    return;
  }

  const activityPrizeStatus = event.target.closest(".activity-prize-status-toggle");
  if (activityPrizeStatus) {
    openActivityPrizeStatusConfirm(activityPrizeStatus);
    return;
  }

  const releaseStageAdd = event.target.closest(".release-stage-add");
  if (releaseStageAdd) {
    releaseStageAdd.closest(".release-config")?.querySelector(".release-stage-list")?.appendChild(createReleaseStage());
    return;
  }

  const releaseStageDelete = event.target.closest(".release-stage-delete");
  if (releaseStageDelete) {
    const list = releaseStageDelete.closest(".release-stage-list");
    if (list?.querySelectorAll(".release-stage").length > 1) {
      releaseStageDelete.closest(".release-stage")?.remove();
    }
    return;
  }

  const rankTierDelete = event.target.closest(".rank-tier-table .icon-remove");
  if (rankTierDelete) {
    const table = rankTierDelete.closest(".rank-tier-table");
    rankTierDelete.closest(".reward-row")?.remove();
    if (table) updateRankTierTable(table);
    return;
  }

  const regularSwitch = event.target.closest(".regular-visibility");
  if (regularSwitch) {
    openRegularStatusConfirm(regularSwitch);
    return;
  }

  const moveUp = event.target.closest(".rule-move-up");
  if (moveUp) {
    const row = moveUp.closest(".regular-rule-table > div");
    const previous = row?.previousElementSibling;
    if (previous && !previous.classList.contains("regular-rule-head")) {
      row.parentElement.insertBefore(row, previous);
      refreshAchievementOrder(row.parentElement);
    }
    return;
  }

  const moveDown = event.target.closest(".rule-move-down");
  if (moveDown) {
    const row = moveDown.closest(".regular-rule-table > div");
    const next = row?.nextElementSibling;
    if (next) {
      row.parentElement.insertBefore(next, row);
      refreshAchievementOrder(row.parentElement);
    }
    return;
  }

  const button = event.target.closest(".inventory-add");
  if (!button) {
    const inventorySwitch = event.target.closest(".inventory-status-toggle");
    if (inventorySwitch) openInventoryStatusConfirm(inventorySwitch);
    return;
  }
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

document.addEventListener("change", (event) => {
  const scheduleSelect = event.target.closest(".schedule-select");
  if (scheduleSelect) {
    const picker = scheduleSelect.closest(".schedule-control")?.querySelector(".schedule-picker");
    picker?.classList.toggle("expanded", scheduleSelect.value === "定时推送");
    return;
  }

  const rankTierField = event.target.closest(".rank-tier-table input, .rank-tier-table select");
  if (rankTierField) {
    updateRankTierTable(rankTierField.closest(".rank-tier-table"));
    return;
  }

  const trigger = event.target.closest(".activity-rule-trigger");
  if (!trigger) return;
  const selected = activityRuleOptions.find(([label]) => label === trigger.value);
  const validation = trigger.closest(".activity-rule-row")?.querySelector(".activity-rule-validation");
  if (validation && selected) validation.textContent = selected[1];
});

document.addEventListener("input", (event) => {
  const rankTierField = event.target.closest(".rank-tier-table input");
  if (!rankTierField) return;
  updateRankTierTable(rankTierField.closest(".rank-tier-table"));
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
