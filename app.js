const ACCESS_CODE = 'teamview2026!';
const ACCESS_KEY = 'dashboardStaticUnlocked';
const VIEW_MODE_KEY = 'dashboardViewMode';
const DASHBOARD_DATA_ENDPOINT = window.__DASHBOARD_DATA_ENDPOINT__ || '';
const DASHBOARD_DATA_TOKEN = window.__DASHBOARD_DATA_TOKEN__ || '';

let dashboardData = window.__DASHBOARD_DATA__ || {};

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
const chartTooltip = document.getElementById('chartTooltip');

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

function showTooltip(event, payload) {
  chartTooltip.hidden = false;
  chartTooltip.innerHTML = `
    <span class="chart-tooltip-label">${payload.label}</span>
    <span class="chart-tooltip-value">${payload.value}</span>
  `;
  chartTooltip.style.left = `${event.clientX}px`;
  chartTooltip.style.top = `${event.clientY}px`;
}

function moveTooltip(event) {
  chartTooltip.style.left = `${event.clientX}px`;
  chartTooltip.style.top = `${event.clientY}px`;
}

function hideTooltip() {
  chartTooltip.hidden = true;
}

function bindTooltip(target, dot, payload, guideLine, guideX, guideTop, guideBottom) {
  target.addEventListener('mouseenter', (event) => {
    dot.classList.add('is-active');
    dot.setAttribute('r', '6');
    if (guideLine) {
      guideLine.setAttribute('x1', guideX);
      guideLine.setAttribute('x2', guideX);
      guideLine.setAttribute('y1', guideTop);
      guideLine.setAttribute('y2', guideBottom);
      guideLine.classList.add('is-visible');
    }
    showTooltip(event, payload);
  });
  target.addEventListener('mousemove', (event) => {
    if (guideLine) {
      guideLine.setAttribute('x1', guideX);
      guideLine.setAttribute('x2', guideX);
    }
    moveTooltip(event);
  });
  target.addEventListener('mouseleave', () => {
    dot.classList.remove('is-active');
    dot.setAttribute('r', '4');
    if (guideLine) guideLine.classList.remove('is-visible');
    hideTooltip();
  });
}

function attachInteractiveCardEffects(selector) {
  document.querySelectorAll(selector).forEach((card) => {
    if (card.dataset.interactiveBound === '1') return;
    card.dataset.interactiveBound = '1';

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const rotateY = ((offsetX / rect.width) - 0.5) * 8;
      const rotateX = (0.5 - (offsetY / rect.height)) * 8;
      card.style.setProperty('--card-rotate-x', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--card-rotate-y', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--glow-x', `${((offsetX / rect.width) * 100).toFixed(2)}%`);
      card.style.setProperty('--glow-y', `${((offsetY / rect.height) * 100).toFixed(2)}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--card-rotate-x', '0deg');
      card.style.setProperty('--card-rotate-y', '0deg');
      card.style.setProperty('--glow-x', '50%');
      card.style.setProperty('--glow-y', '50%');
    });
  });
}

function drawLineChart(svgId, labels, values, stroke, formatter = formatNumber) {
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

  const guideLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  guideLine.setAttribute('class', 'chart-guide-line');
  svg.appendChild(guideLine);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  path.setAttribute('points', points.join(' '));
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', stroke);
  path.setAttribute('stroke-width', '4');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('class', 'chart-line-animated');
  svg.appendChild(path);
  const lineLength = path.getTotalLength();
  path.style.setProperty('--dash-length', lineLength);
  path.style.strokeDasharray = `${lineLength}`;
  path.style.strokeDashoffset = `${lineLength}`;

  points.forEach((point, index) => {
    const [x, y] = point.split(',');
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y);
    dot.setAttribute('r', '4');
    dot.setAttribute('fill', stroke);
    dot.setAttribute('class', 'chart-point');
    dot.style.animationDelay = `${index * 90}ms`;
    svg.appendChild(dot);

    const hit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    hit.setAttribute('cx', x);
    hit.setAttribute('cy', y);
    hit.setAttribute('r', '12');
    hit.setAttribute('fill', 'transparent');
    hit.setAttribute('class', 'chart-point-hit');
    bindTooltip(hit, dot, {
      label: labels[index] || `${index + 1}번째 구간`,
      value: formatter(values[index]),
    }, guideLine, x, padding, height - padding);
    svg.appendChild(hit);
  });
}

function drawDualLineChart(svgId, labels, seriesA, seriesB, strokeA, strokeB) {
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

  const guideLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  guideLine.setAttribute('class', 'chart-guide-line');
  svg.appendChild(guideLine);

  [
    { values: seriesA, stroke: strokeA, seriesLabel: '클릭수' },
    { values: seriesB, stroke: strokeB, seriesLabel: '전환수' },
  ].forEach(({ values, stroke }) => {
    const points = makePoints(values);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    path.setAttribute('points', points.join(' '));
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', '4');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('class', 'chart-line-animated');
    svg.appendChild(path);
    const lineLength = path.getTotalLength();
    path.style.setProperty('--dash-length', lineLength);
    path.style.strokeDasharray = `${lineLength}`;
    path.style.strokeDashoffset = `${lineLength}`;

    points.forEach((point, index) => {
      const [x, y] = point.split(',');
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', x);
      dot.setAttribute('cy', y);
      dot.setAttribute('r', '4');
      dot.setAttribute('fill', stroke);
      dot.setAttribute('class', 'chart-point');
      dot.style.animationDelay = `${index * 80}ms`;
      svg.appendChild(dot);

      const hit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      hit.setAttribute('cx', x);
      hit.setAttribute('cy', y);
      hit.setAttribute('r', '12');
      hit.setAttribute('fill', 'transparent');
      hit.setAttribute('class', 'chart-point-hit');
      bindTooltip(hit, dot, {
        label: `${labels[index] || `${index + 1}번째 구간`} · ${stroke === strokeA ? '클릭수' : '전환수'}`,
        value: formatNumber(values[index]),
      }, guideLine, x, padding, height - padding);
      svg.appendChild(hit);
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

  attachInteractiveCardEffects('.kpi-card');
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

  attachInteractiveCardEffects('.insight-card');
}

function renderAnomalies(items) {
  anomalyList.innerHTML = items.map((item) => `
    <article class="anomaly-item ${item.severity}">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join('');

  attachInteractiveCardEffects('.anomaly-item');
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
  const dateLabels = dailyRows.map((row) => row.date);
  const metrics = deriveMetrics(dailyRows);
  const previousRows = advertiser.daily.filter((row) => row.date < start);
  const previousMetrics = previousRows.length ? deriveMetrics([previousRows[previousRows.length - 1]]) : deriveMetrics([]);

  lastUpdated.textContent = advertiser.lastUpdated;
  dataCoverage.textContent = advertiser.currentCoverage;
  currentCoverage.textContent = advertiser.currentCoverage;
  selectedRangeLabel.textContent = `${advertiser.name} | ${start} ~ ${end}`;

  renderKPIs(metrics, previousMetrics);

  drawLineChart('costChart', dateLabels, dailyRows.map((row) => row.cost), '#0d7c66', formatCurrency);
  drawLineChart('revenueChart', dateLabels, dailyRows.map((row) => row.conversionValue), '#db6c4a', formatCurrency);
  drawLineChart('roasChart', dateLabels, dailyRows.map((row) => row.cost ? (row.conversionValue / row.cost) * 100 : 0), '#184a8a', percent);
  drawLineChart('aovChart', dateLabels, dailyRows.map((row) => row.conversions ? row.conversionValue / row.conversions : 0), '#8b4fd8', formatCurrency);

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
    drawDualLineChart(chartId, rows.map((row) => row.date), rows.map((row) => row.clicks), rows.map((row) => row.conversions), '#0d7c66', '#db6c4a');
    const totalClicks = rows.reduce((sum, row) => sum + row.clicks, 0);
    const totalConversions = rows.reduce((sum, row) => sum + row.conversions, 0);
    document.getElementById(valueId).textContent = `클릭 ${formatNumber(totalClicks)} / 전환 ${formatNumber(totalConversions)}`;
  });

  renderInsights(advertiser.insights);
  renderAnomalies(advertiser.anomalies);
  renderCampaignTable(advertiser.campaigns, start, end);
  attachInteractiveCardEffects('.chart-card');
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

async function loadDashboardData() {
  if (!DASHBOARD_DATA_ENDPOINT) return;

  const url = new URL(DASHBOARD_DATA_ENDPOINT, window.location.href);
  if (DASHBOARD_DATA_TOKEN) {
    url.searchParams.set('token', DASHBOARD_DATA_TOKEN);
  }

  const response = await fetch(url.toString(), { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`dashboard data fetch failed: ${response.status}`);
  }

  const payload = await response.json();
  if (!payload || typeof payload !== 'object' || payload.error) {
    throw new Error(payload && payload.error ? payload.error : 'invalid dashboard payload');
  }

  dashboardData = payload;
}

function initDashboard() {
  if (!dashboardData || !Object.keys(dashboardData).length) {
    throw new Error('dashboard data is empty');
  }
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

async function boot() {
  initAuth();
  initViewModes();
  await loadDashboardData();
  initDashboard();
}

boot().catch((error) => {
  console.error(error);
  alert('대시보드 데이터를 불러오지 못했습니다. config.js 또는 dashboard-data.js 설정을 확인해 주세요.');
});
