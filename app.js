const ACCESS_CODE = 'teamview2026!';
const ACCESS_KEY = 'dashboardStaticUnlocked';
const VIEW_MODE_KEY = 'dashboardViewMode';

const dashboardData = {
  millis: {
    name: '밀리밀리',
    lastUpdated: '2026-03-03 09:00',
    currentCoverage: '2026-03-01 ~ 2026-03-02',
    daily: [
      { date: '2026-03-01', cost: 214159, impressions: 47979, clicks: 333, conversions: 146, conversionValue: 1839370 },
      { date: '2026-03-02', cost: 219208, impressions: 61271, clicks: 378, conversions: 151, conversionValue: 1904240 },
    ],
    mediaDaily: {
      powerlink: [
        { date: '2026-03-01', clicks: 0, conversions: 0 },
        { date: '2026-03-02', clicks: 0, conversions: 0 },
      ],
      shopping: [
        { date: '2026-03-01', clicks: 162, conversions: 52 },
        { date: '2026-03-02', clicks: 106, conversions: 8 },
      ],
      brandsearch: [
        { date: '2026-03-01', clicks: 171, conversions: 94 },
        { date: '2026-03-02', clicks: 195, conversions: 91 },
      ],
    },
    campaigns: [
      { date: '2026-03-02', campaign: '#S01_미스트_MO', cost: 65450, clicks: 41, conversions: 2, conversionValue: 44820 },
      { date: '2026-03-02', campaign: '##자사몰_500달톤_MO', cost: 56738, clicks: 41, conversions: 7, conversionValue: 69700 },
      { date: '2026-03-02', campaign: '#S04_바디워시_MO', cost: 25300, clicks: 12, conversions: 2, conversionValue: 54810 },
      { date: '2026-03-02', campaign: '##밀리밀리자사몰_MO', cost: 12804, clicks: 9, conversions: 5, conversionValue: 139600 },
      { date: '2026-03-02', campaign: '###전체상품그룹(수정금지)', cost: 16390, clicks: 28, conversions: 2, conversionValue: 59910 },
    ],
    insights: {
      summary: '전일 대비 광고비와 전환매출이 모두 증가했고, 전체 ROAS는 868.7%로 유지되었습니다.',
      channels: '쇼핑검색 내 미스트 캠페인 비중이 크며, 자사몰 캠페인이 효율 방어 역할을 하고 있습니다.',
      efficiency: '상위 비용 캠페인 중 일부는 효율 편차가 커서 ROAS 기준 재점검이 필요합니다.',
      aov: 'AOV는 12,611원으로 전일 대비 소폭 상승하여 매출 질은 유지되는 흐름입니다.',
      actions: '미스트 캠페인 효율 점검, 자사몰 우수 캠페인 유지, 전환 없는 저비용 캠페인 감액 검토가 필요합니다.',
    },
    anomalies: [
      { severity: 'high', title: '#S01_미스트_MO 효율 저하', text: '광고비 65,450원 사용 대비 ROAS가 68.5%에 머물러 점검 우선순위가 높습니다.' },
      { severity: 'medium', title: '쇼핑검색 AOV 감시 필요', text: '쇼핑검색 유입 확대는 있었지만 전환 효율 저하 신호가 있어 AOV와 CVR을 함께 봐야 합니다.' },
    ],
  },
  ilhwa: {
    name: '일화음료',
    lastUpdated: '2026-03-03 09:00',
    currentCoverage: '2026-03-01 ~ 2026-03-02',
    daily: [
      { date: '2026-03-01', cost: 406274, impressions: 1041693, clicks: 613, conversions: 222, conversionValue: 4883770 },
      { date: '2026-03-02', cost: 452012, impressions: 1068546, clicks: 665, conversions: 215, conversionValue: 4811790 },
    ],
    mediaDaily: {
      powerlink: [
        { date: '2026-03-01', clicks: 54, conversions: 13 },
        { date: '2026-03-02', clicks: 60, conversions: 16 },
      ],
      shopping: [
        { date: '2026-03-01', clicks: 0, conversions: 0 },
        { date: '2026-03-02', clicks: 0, conversions: 0 },
      ],
      brandsearch: [
        { date: '2026-03-01', clicks: 0, conversions: 0 },
        { date: '2026-03-02', clicks: 0, conversions: 0 },
      ],
    },
    campaigns: [
      { date: '2026-03-02', campaign: '##벌크전체상품(수정금지)', cost: 178266, clicks: 357, conversions: 89, conversionValue: 1941000 },
      { date: '2026-03-02', campaign: '01. 초정탄산수', cost: 100485, clicks: 89, conversions: 48, conversionValue: 1039370 },
      { date: '2026-03-02', campaign: '02. 맥콜', cost: 48906, clicks: 53, conversions: 21, conversionValue: 578100 },
      { date: '2026-03-02', campaign: '00. 도착보장', cost: 32076, clicks: 47, conversions: 22, conversionValue: 423440 },
      { date: '2026-03-02', campaign: '04. 천연사이다', cost: 25795, clicks: 35, conversions: 8, conversionValue: 142200 },
    ],
    insights: {
      summary: '클릭은 증가했지만 전환수와 전환매출은 소폭 감소해 효율은 다소 둔화된 흐름입니다.',
      channels: '벌크전체상품과 초정탄산수 캠페인이 전체 매출을 견인하고 있습니다.',
      efficiency: '전체 ROAS는 1,064.5%로 양호하지만 일부 상품군 효율은 전일 대비 약해졌습니다.',
      aov: 'AOV는 22,380원으로 비교적 안정적이며, 객단가 하락 신호는 크지 않습니다.',
      actions: '벌크/초정탄산수는 유지, 천연사이다와 저효율 상품군은 입찰 및 소재 점검이 필요합니다.',
    },
    anomalies: [
      { severity: 'medium', title: '04. 천연사이다 효율 둔화', text: '광고비 대비 전환매출 효율이 다른 주력 캠페인 대비 낮아 우선 점검 대상입니다.' },
      { severity: 'low', title: '클릭 증가 대비 전환 감소', text: '전일 대비 유입은 늘었지만 전환 효율은 하락해 랜딩·상품 조합 점검이 필요합니다.' },
    ],
  },
};

const periodOptions = [
  { value: 'yesterday', label: '전일' },
  { value: 'last_3_days', label: '최근 3일' },
  { value: 'last_7_days', label: '최근 7일' },
  { value: 'this_month', label: '이번 달' },
  { value: 'last_month', label: '지난 달' },
  { value: 'this_quarter', label: '이번 분기' },
  { value: 'last_quarter', label: '지난 분기' },
  { value: 'custom', label: '직접 선택' },
];

const advertiserSelect = document.getElementById('advertiserSelect');
const periodSelect = document.getElementById('periodSelect');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const applyFilters = document.getElementById('applyFilters');
const kpiGrid = document.getElementById('kpiGrid');
const selectedRangeLabel = document.getElementById('selectedRangeLabel');
const insightCards = document.getElementById('insightCards');
const anomalyList = document.getElementById('anomalyList');
const campaignTableBody = document.getElementById('campaignTableBody');
const lastUpdated = document.getElementById('lastUpdated');
const dataCoverage = document.getElementById('dataCoverage');
const currentCoverage = document.getElementById('currentCoverage');
const viewModeButtons = Array.from(document.querySelectorAll('[data-view-mode]'));
const authGate = document.getElementById('authGate');
const accessCodeInput = document.getElementById('accessCode');
const unlockDashboardButton = document.getElementById('unlockDashboard');
const authError = document.getElementById('authError');
const lockButton = document.getElementById('lockButton');

let currentAdvertiser = 'millis';

function formatNumber(value) {
  return new Intl.NumberFormat('ko-KR').format(Math.round(value || 0));
}

function formatCurrency(value) {
  return `${formatNumber(value)}원`;
}

function percent(value) {
  return `${Number(value || 0).toFixed(1)}%`;
}

function toDate(dateString) {
  return new Date(`${dateString}T00:00:00`);
}

function formatDateInput(date) {
  return date.toISOString().slice(0, 10);
}

function computeDiff(current, previous) {
  const delta = current - previous;
  const direction = delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
  const icon = delta > 0 ? '🔵⬆️' : delta < 0 ? '🔴⬇️' : '➖';
  return { delta, direction, icon };
}

function formatDiff(delta, label) {
  if (!delta) return '변동 없음';
  const absolute = Math.abs(delta);
  if (['ROAS', 'CTR', 'CVR'].includes(label)) return `${absolute.toFixed(1)}%p`;
  if (['광고비', '전환매출', 'AOV', 'CPC', 'CPA'].includes(label)) return formatCurrency(absolute);
  if (label === '전환수') return `${formatNumber(absolute)}건`;
  return formatNumber(absolute);
}

function deriveMetrics(rows) {
  const totals = rows.reduce(
    (acc, row) => {
      acc.cost += row.cost;
      acc.impressions += row.impressions;
      acc.clicks += row.clicks;
      acc.conversions += row.conversions;
      acc.conversionValue += row.conversionValue;
      return acc;
    },
    { cost: 0, impressions: 0, clicks: 0, conversions: 0, conversionValue: 0 }
  );
  return {
    ...totals,
    ctr: totals.impressions ? (totals.clicks / totals.impressions) * 100 : 0,
    cpc: totals.clicks ? totals.cost / totals.clicks : 0,
    cvr: totals.clicks ? (totals.conversions / totals.clicks) * 100 : 0,
    cpa: totals.conversions ? totals.cost / totals.conversions : 0,
    roas: totals.cost ? (totals.conversionValue / totals.cost) * 100 : 0,
    aov: totals.conversions ? totals.conversionValue / totals.conversions : 0,
  };
}

function getPresetRange(dailyRows, period) {
  const sortedDates = dailyRows.map((row) => toDate(row.date)).sort((a, b) => a - b);
  const lastDate = sortedDates[sortedDates.length - 1];
  const start = new Date(lastDate);
  const end = new Date(lastDate);

  if (period === 'yesterday') return { start: formatDateInput(start), end: formatDateInput(end) };
  if (period === 'last_3_days') {
    start.setDate(end.getDate() - 2);
    return { start: formatDateInput(start), end: formatDateInput(end) };
  }
  if (period === 'last_7_days') {
    start.setDate(end.getDate() - 6);
    return { start: formatDateInput(start), end: formatDateInput(end) };
  }
  if (period === 'this_month') {
    start.setDate(1);
    return { start: formatDateInput(start), end: formatDateInput(end) };
  }
  if (period === 'last_month') {
    start.setMonth(start.getMonth() - 1, 1);
    end.setDate(0);
    return { start: formatDateInput(start), end: formatDateInput(end) };
  }

  const quarterStart = Math.floor(end.getMonth() / 3) * 3;
  if (period === 'this_quarter') {
    start.setMonth(quarterStart, 1);
    return { start: formatDateInput(start), end: formatDateInput(end) };
  }
  if (period === 'last_quarter') {
    start.setMonth(quarterStart - 3, 1);
    end.setMonth(quarterStart, 0);
    return { start: formatDateInput(start), end: formatDateInput(end) };
  }
  return { start: formatDateInput(start), end: formatDateInput(end) };
}

function filterRows(rows, start, end) {
  return rows.filter((row) => row.date >= start && row.date <= end);
}

function drawLineChart(svgId, values, stroke) {
  const svg = document.getElementById(svgId);
  const width = 320;
  const height = 140;
  const padding = 18;
  svg.innerHTML = '';
  if (!values.length) return;

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = values.length > 1 ? (width - padding * 2) / (values.length - 1) : 0;
  const points = values.map((value, index) => {
    const x = padding + step * index;
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const base = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  base.setAttribute('d', `M ${padding} ${height - padding} H ${width - padding}`);
  base.setAttribute('stroke', 'rgba(16,35,28,0.12)');
  base.setAttribute('fill', 'none');
  svg.appendChild(base);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  path.setAttribute('points', points.join(' '));
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', stroke);
  path.setAttribute('stroke-width', '4');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(path);

  points.forEach((point) => {
    const [x, y] = point.split(',');
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y);
    dot.setAttribute('r', '4');
    dot.setAttribute('fill', stroke);
    svg.appendChild(dot);
  });
}

function drawDualLineChart(svgId, seriesA, seriesB, strokeA, strokeB) {
  const svg = document.getElementById(svgId);
  const width = 320;
  const height = 140;
  const padding = 18;
  svg.innerHTML = '';
  const merged = [...seriesA, ...seriesB];
  if (!merged.length) return;

  const max = Math.max(...merged, 1);
  const min = Math.min(...merged, 0);
  const range = max - min || 1;
  const length = Math.max(seriesA.length, seriesB.length);
  const step = length > 1 ? (width - padding * 2) / (length - 1) : 0;

  const makePoints = (values) => values.map((value, index) => {
    const x = padding + step * index;
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const base = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  base.setAttribute('d', `M ${padding} ${height - padding} H ${width - padding}`);
  base.setAttribute('stroke', 'rgba(16,35,28,0.12)');
  base.setAttribute('fill', 'none');
  svg.appendChild(base);

  [
    { values: seriesA, stroke: strokeA },
    { values: seriesB, stroke: strokeB },
  ].forEach(({ values, stroke }) => {
    const points = makePoints(values);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    path.setAttribute('points', points.join(' '));
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', '4');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);

    points.forEach((point) => {
      const [x, y] = point.split(',');
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', x);
      dot.setAttribute('cy', y);
      dot.setAttribute('r', '4');
      dot.setAttribute('fill', stroke);
      svg.appendChild(dot);
    });
  });
}

function applyViewMode(mode) {
  document.body.classList.remove('force-mobile', 'force-desktop');
  if (mode === 'mobile') document.body.classList.add('force-mobile');
  if (mode === 'desktop') document.body.classList.add('force-desktop');
  viewModeButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.viewMode === mode);
  });
  localStorage.setItem(VIEW_MODE_KEY, mode);
}

function lockDashboard() {
  localStorage.removeItem(ACCESS_KEY);
  document.body.classList.add('auth-locked');
  authGate.hidden = false;
}

function unlockDashboard() {
  localStorage.setItem(ACCESS_KEY, '1');
  document.body.classList.remove('auth-locked');
  authGate.hidden = true;
  authError.hidden = true;
}

function renderKPIs(metrics, previousMetrics) {
  const kpis = [
    ['광고비', metrics.cost, previousMetrics.cost],
    ['전환매출', metrics.conversionValue, previousMetrics.conversionValue],
    ['ROAS', metrics.roas, previousMetrics.roas],
    ['전환수', metrics.conversions, previousMetrics.conversions],
    ['AOV', metrics.aov, previousMetrics.aov],
    ['노출수', metrics.impressions, previousMetrics.impressions],
    ['클릭수', metrics.clicks, previousMetrics.clicks],
    ['CTR', metrics.ctr, previousMetrics.ctr],
    ['CPC', metrics.cpc, previousMetrics.cpc],
    ['CPA', metrics.cpa, previousMetrics.cpa],
    ['CVR', metrics.cvr, previousMetrics.cvr],
  ];

  kpiGrid.innerHTML = '';
  kpis.forEach(([label, current, previous]) => {
    const diff = computeDiff(current, previous);
    const article = document.createElement('article');
    article.className = 'kpi-card';
    article.innerHTML = `
      <span class="kpi-label">${label}</span>
      <strong class="kpi-value">${['광고비', '전환매출', 'AOV', 'CPC', 'CPA'].includes(label)
        ? formatCurrency(current)
        : ['ROAS', 'CTR', 'CVR'].includes(label)
        ? percent(current)
        : label === '전환수'
        ? `${formatNumber(current)}건`
        : formatNumber(current)}</strong>
      <span class="kpi-diff ${diff.direction}">${diff.icon} ${formatDiff(diff.delta, label)}</span>
    `;
    kpiGrid.appendChild(article);
  });
}

function renderInsights(data) {
  const blocks = [
    ['이번 주 핵심 요약', data.summary],
    ['채널별 성과', data.channels],
    ['수익성 및 효율', data.efficiency],
    ['AOV 변화', data.aov],
    ['추천 액션', data.actions],
  ];
  insightCards.innerHTML = blocks.map(([title, body]) => `
    <article class="insight-card">
      <h3>${title}</h3>
      <p>${body}</p>
    </article>
  `).join('');
}

function renderAnomalies(items) {
  anomalyList.innerHTML = items.map((item) => `
    <article class="anomaly-item ${item.severity}">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join('');
}

function renderCampaignTable(campaigns, start, end) {
  const filtered = campaigns.filter((campaign) => campaign.date >= start && campaign.date <= end)
    .map((campaign) => {
      const roas = campaign.cost ? (campaign.conversionValue / campaign.cost) * 100 : 0;
      const cpa = campaign.conversions ? campaign.cost / campaign.conversions : 0;
      const aov = campaign.conversions ? campaign.conversionValue / campaign.conversions : 0;
      return { ...campaign, roas, cpa, aov };
    })
    .sort((a, b) => b.cost - a.cost);

  campaignTableBody.innerHTML = filtered.map((campaign) => `
    <tr>
      <td>${campaign.campaign}</td>
      <td>${formatCurrency(campaign.cost)}</td>
      <td>${formatNumber(campaign.clicks)}</td>
      <td>${formatNumber(campaign.conversions)}건</td>
      <td>${formatCurrency(campaign.conversionValue)}</td>
      <td>${percent(campaign.roas)}</td>
      <td>${formatCurrency(campaign.cpa)}</td>
      <td>${formatCurrency(campaign.aov)}</td>
    </tr>
  `).join('');
}

function renderDashboard() {
  const advertiser = dashboardData[currentAdvertiser];
  const start = startDate.value;
  const end = endDate.value;
  const dailyRows = filterRows(advertiser.daily, start, end);
  const metrics = deriveMetrics(dailyRows);
  const previousRows = advertiser.daily.filter((row) => row.date < start);
  const previousMetrics = previousRows.length ? deriveMetrics([previousRows[previousRows.length - 1]]) : deriveMetrics([]);

  lastUpdated.textContent = advertiser.lastUpdated;
  dataCoverage.textContent = advertiser.currentCoverage;
  currentCoverage.textContent = advertiser.currentCoverage;
  selectedRangeLabel.textContent = `${advertiser.name} | ${start} ~ ${end}`;

  renderKPIs(metrics, previousMetrics);

  drawLineChart('costChart', dailyRows.map((row) => row.cost), '#0d7c66');
  drawLineChart('revenueChart', dailyRows.map((row) => row.conversionValue), '#db6c4a');
  drawLineChart('roasChart', dailyRows.map((row) => row.cost ? (row.conversionValue / row.cost) * 100 : 0), '#184a8a');
  drawLineChart('aovChart', dailyRows.map((row) => row.conversions ? row.conversionValue / row.conversions : 0), '#8b4fd8');

  document.getElementById('costTrendValue').textContent = formatCurrency(metrics.cost);
  document.getElementById('revenueTrendValue').textContent = formatCurrency(metrics.conversionValue);
  document.getElementById('roasTrendValue').textContent = percent(metrics.roas);
  document.getElementById('aovTrendValue').textContent = formatCurrency(metrics.aov);

  const mediaMap = [
    ['powerlink', 'powerlinkChart', 'powerlinkTrendValue'],
    ['shopping', 'shoppingChart', 'shoppingTrendValue'],
    ['brandsearch', 'brandChart', 'brandTrendValue'],
  ];

  mediaMap.forEach(([key, chartId, valueId]) => {
    const rows = filterRows(advertiser.mediaDaily[key], start, end);
    drawDualLineChart(chartId, rows.map((row) => row.clicks), rows.map((row) => row.conversions), '#0d7c66', '#db6c4a');
    const totalClicks = rows.reduce((sum, row) => sum + row.clicks, 0);
    const totalConversions = rows.reduce((sum, row) => sum + row.conversions, 0);
    document.getElementById(valueId).textContent = `클릭 ${formatNumber(totalClicks)} / 전환 ${formatNumber(totalConversions)}`;
  });

  renderInsights(advertiser.insights);
  renderAnomalies(advertiser.anomalies);
  renderCampaignTable(advertiser.campaigns, start, end);
}

function hydrateFilters() {
  advertiserSelect.innerHTML = Object.entries(dashboardData)
    .map(([key, value]) => `<option value="${key}">${value.name}</option>`)
    .join('');
  periodSelect.innerHTML = periodOptions
    .map((option) => `<option value="${option.value}">${option.label}</option>`)
    .join('');
  advertiserSelect.value = currentAdvertiser;
  periodSelect.value = 'last_7_days';
  const range = getPresetRange(dashboardData[currentAdvertiser].daily, 'last_7_days');
  startDate.value = range.start;
  endDate.value = range.end;
}

function updateRangeFromPreset() {
  const range = getPresetRange(dashboardData[currentAdvertiser].daily, periodSelect.value);
  startDate.value = range.start;
  endDate.value = range.end;
}

function initAuth() {
  if (localStorage.getItem(ACCESS_KEY) === '1') {
    unlockDashboard();
  } else {
    lockDashboard();
  }

  unlockDashboardButton.addEventListener('click', () => {
    if (accessCodeInput.value === ACCESS_CODE) {
      unlockDashboard();
      return;
    }
    authError.hidden = false;
  });

  accessCodeInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') unlockDashboardButton.click();
  });

  lockButton.addEventListener('click', lockDashboard);
}

function initViewModes() {
  const saved = localStorage.getItem(VIEW_MODE_KEY) || 'auto';
  applyViewMode(saved);
  viewModeButtons.forEach((button) => {
    button.addEventListener('click', () => applyViewMode(button.dataset.viewMode));
  });
}

function initDashboard() {
  hydrateFilters();
  updateRangeFromPreset();
  renderDashboard();

  advertiserSelect.addEventListener('change', () => {
    currentAdvertiser = advertiserSelect.value;
    updateRangeFromPreset();
    renderDashboard();
  });

  periodSelect.addEventListener('change', () => {
    if (periodSelect.value !== 'custom') updateRangeFromPreset();
    renderDashboard();
  });

  applyFilters.addEventListener('click', renderDashboard);
}

initAuth();
initViewModes();
initDashboard();
