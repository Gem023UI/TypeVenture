import { jsPDF } from "jspdf";

// ── Brand colors (light-mode PDF)
const C = {
  red:      [220, 20,  20],
  purple:   [130, 0,   210],
  blue:     [0,   40,  200],
  green:    [22,  163, 74],
  dark:     [20,  20,  40],
  gray:     [245, 245, 250],
  grayMid:  [220, 220, 230],
  grayText: [100, 100, 120],
  muted:    [140, 140, 160],
  white:    [255, 255, 255],
  black:    [20,  20,  40],
};

// ── Draw gradient header banner
const drawHeader = (doc, title, subtitle) => {
  const W = doc.internal.pageSize.getWidth();

  // White background for whole page
  doc.setFillColor(...C.white);
  doc.rect(0, 0, W, 297, "F");

  // Header banner — deep dark strip
  doc.setFillColor(...C.dark);
  doc.rect(0, 0, W, 38, "F");

  // Tri-color accent bar below banner
  doc.setFillColor(...C.red);
  doc.rect(0, 38, W * 0.33, 3.5, "F");
  doc.setFillColor(...C.purple);
  doc.rect(W * 0.33, 38, W * 0.34, 3.5, "F");
  doc.setFillColor(...C.blue);
  doc.rect(W * 0.67, 38, W * 0.33, 3.5, "F");

  // Title
  doc.setTextColor(...C.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, W / 2, 18, { align: "center" });

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(200, 200, 220);
  doc.text(subtitle, W / 2, 28, { align: "center" });

  doc.setTextColor(...C.black);
  return 52;
};

// ── Draw section label with colored left bar
const drawSectionLabel = (doc, text, y, color = C.purple) => {
  doc.setFillColor(...color);
  doc.rect(14, y, 3.5, 7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...C.black);
  doc.text(text, 21, y + 5.5);
  return y + 13;
};

// ── Draw stat pills row
const drawStatPills = (doc, pills, y) => {
  const W     = doc.internal.pageSize.getWidth();
  const pillW = (W - 28) / pills.length;
  pills.forEach((p, i) => {
    const x = 14 + i * pillW;
    // Light pill background
    doc.setFillColor(...C.gray);
    doc.roundedRect(x, y, pillW - 5, 22, 4, 4, "F");
    // Colored top accent strip
    doc.setFillColor(...(p.color || C.purple));
    doc.roundedRect(x, y, pillW - 5, 4, 2, 2, "F");

    // Value
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...(p.color || C.purple));
    doc.text(String(p.value), x + (pillW - 5) / 2, y + 12, { align: "center" });

    // Label
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...C.grayText);
    doc.text(p.label, x + (pillW - 5) / 2, y + 18, { align: "center" });
  });
  doc.setTextColor(...C.black);
  return y + 28;
};

// ── Draw analysis box
const drawAnalysis = (doc, text, y) => {
  const W     = doc.internal.pageSize.getWidth();
  const lines = doc.splitTextToSize(text, W - 42);
  const boxH  = lines.length * 5 + 12;

  // Light lavender background
  doc.setFillColor(240, 235, 255);
  doc.roundedRect(14, y, W - 28, boxH, 4, 4, "F");

  // Left accent
  doc.setFillColor(...C.purple);
  doc.rect(14, y, 3, boxH, "F");

  // Label
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...C.purple);
  doc.text("ANALYSIS", 21, y + 6);

  // Body text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(60, 40, 100);
  doc.text(lines, 21, y + 11);

  doc.setTextColor(...C.black);
  return y + boxH + 8;
};

// ── Draw divider
const drawDivider = (doc, y) => {
  const W = doc.internal.pageSize.getWidth();
  doc.setDrawColor(...C.grayMid);
  doc.setLineWidth(0.4);
  doc.line(14, y, W - 14, y);
  return y + 7;
};

// ── Draw page footer
const drawFooter = (doc) => {
  const W     = doc.internal.pageSize.getWidth();
  const H     = doc.internal.pageSize.getHeight();
  const pages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);

    // Footer bar
    doc.setFillColor(...C.dark);
    doc.rect(0, H - 11, W, 11, "F");

    // Accent line on top of footer
    doc.setFillColor(...C.purple);
    doc.rect(0, H - 12, W, 1, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(200, 200, 220);
    doc.text("Typeventure Admin Report", 14, H - 4);
    doc.text(`Page ${i} of ${pages}`, W - 14, H - 4, { align: "right" });
    doc.text(new Date().toLocaleDateString(), W / 2, H - 4, { align: "center" });
  }
};

// ── Draw bar chart on offscreen canvas, return base64 PNG
export const makeBarChart = ({
  labels, data,
  color = "rgba(130,0,210,0.85)",
  maxY  = null,
  horizontal = false,
  width  = 900,
  height = 380,
}) => {
  const canvas  = document.createElement("canvas");
  canvas.width  = width;
  canvas.height = height;
  const ctx     = canvas.getContext("2d");

  const maxVal  = maxY !== null ? maxY : Math.max(...data, 1);
  const originX = 70;
  const originY = height - 70;
  const chartH  = originY - 28;
  const availW  = width - originX - 28;

  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Light grid lines & axis labels
  ctx.font      = "13px sans-serif";
  const steps   = 5;

  for (let i = 0; i <= steps; i++) {
    const val = Math.round((maxVal / steps) * i);

    if (!horizontal) {
      const yPos = originY - (val / maxVal) * chartH;
      ctx.strokeStyle = "#e5e5f0";
      ctx.lineWidth   = 1;
      ctx.beginPath(); ctx.moveTo(originX, yPos); ctx.lineTo(width - 20, yPos); ctx.stroke();
      ctx.fillStyle   = "#888899";
      ctx.textAlign   = "right";
      ctx.fillText(val, originX - 8, yPos + 4);
    } else {
      const xPos = originX + (val / maxVal) * availW;
      ctx.strokeStyle = "#e5e5f0";
      ctx.lineWidth   = 1;
      ctx.beginPath(); ctx.moveTo(xPos, 20); ctx.lineTo(xPos, originY); ctx.stroke();
      ctx.fillStyle   = "#888899";
      ctx.textAlign   = "center";
      ctx.fillText(val, xPos, originY + 20);
    }
  }

  // Axes
  ctx.strokeStyle = "#ccccdd";
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.moveTo(originX, 20); ctx.lineTo(originX, originY);
  ctx.lineTo(width - 20, originY);
  ctx.stroke();

  // Parse color to build gradient stop
  const solidColor = color.replace(/rgba?\(([^)]+)\)/, (_, g) => {
    const [r, g2, b] = g.split(",").map(Number);
    return `rgba(${r},${g2},${b},0.18)`;
  });

  if (!horizontal) {
    const barW = Math.max(14, Math.min(60, availW / labels.length - 8));
    labels.forEach((label, i) => {
      const barH = (data[i] / maxVal) * chartH;
      const x    = originX + 10 + i * (availW / labels.length);

      const grad = ctx.createLinearGradient(x, originY - barH, x, originY);
      grad.addColorStop(0, color);
      grad.addColorStop(1, solidColor);
      ctx.fillStyle = grad;

      // Rounded top bar
      ctx.beginPath();
      ctx.roundRect(x, originY - barH, barW, barH, [5, 5, 0, 0]);
      ctx.fill();

      // Value label on top
      ctx.fillStyle  = "#333344";
      ctx.font       = "12px sans-serif";
      ctx.textAlign  = "center";
      ctx.fillText(data[i], x + barW / 2, originY - barH - 7);

      // X-axis label (rotated)
      ctx.save();
      ctx.translate(x + barW / 2, originY + 10);
      ctx.rotate(-Math.PI / 5);
      ctx.fillStyle  = "#888899";
      ctx.font       = "11px sans-serif";
      ctx.textAlign  = "right";
      ctx.fillText(label, 0, 0);
      ctx.restore();
    });
  } else {
    const barH = Math.max(16, Math.min(44, chartH / labels.length - 10));
    labels.forEach((label, i) => {
      const barLen = (data[i] / maxVal) * availW;
      const yPos   = 28 + i * (chartH / labels.length);

      const grad = ctx.createLinearGradient(originX, yPos, originX + barLen, yPos);
      grad.addColorStop(0, color);
      grad.addColorStop(1, solidColor);
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.roundRect(originX, yPos, barLen, barH, [0, 5, 5, 0]);
      ctx.fill();

      // Category label (left)
      ctx.fillStyle  = "#555566";
      ctx.font       = "13px sans-serif";
      ctx.textAlign  = "right";
      ctx.fillText(label, originX - 8, yPos + barH / 2 + 5);

      // Value label (right of bar)
      ctx.fillStyle  = "#333344";
      ctx.textAlign  = "left";
      ctx.fillText(data[i], originX + barLen + 8, yPos + barH / 2 + 5);
    });
  }

  return canvas.toDataURL("image/png");
};

// ── Add chart image to doc with light border card
export const addChart = (doc, imgData, y) => {
  const W      = doc.internal.pageSize.getWidth();
  const chartW = W - 28;
  const chartH = chartW * (380 / 900);
  if (y + chartH + 10 > 272) { doc.addPage(); y = 20; }

  // Card background
  doc.setFillColor(250, 250, 255);
  doc.roundedRect(14, y - 2, chartW, chartH + 4, 4, 4, "F");
  doc.setDrawColor(...[210, 210, 225]);
  doc.setLineWidth(0.4);
  doc.roundedRect(14, y - 2, chartW, chartH + 4, 4, 4, "S");

  doc.addImage(imgData, "PNG", 14, y, chartW, chartH);
  return y + chartH + 8;
};

// ── Page break helper
export const checkBreak = (doc, y, needed = 30) => {
  if (y + needed > 272) { doc.addPage(); return 20; }
  return y;
};

// ── Export all helpers
export { drawHeader, drawSectionLabel, drawStatPills, drawAnalysis, drawDivider, drawFooter, C };