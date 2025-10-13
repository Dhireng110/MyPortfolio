window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('skillChart').getContext('2d');
  const iconOverlay = document.getElementById('iconOverlay');

  const labels = ['ODI', 'FDI', 'OBIEE', 'Clients', 'SQL'];
  const icons = [
    'images/odi.png',
    'images/analytics.png',
    'images/obiee.png',
    'images/client.png',
    'images/sql.png'
  ];

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.map(() => ''), // hide default labels
      datasets: [{
        data: [7, 7, 7, 9, 7],
        backgroundColor: 'rgba(0, 120, 215, 0.7)',
        borderRadius: 5
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          max: 10,
          grid: { display: false }
        },
        y: {
          grid: { display: false },
          ticks: { callback: () => '' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => `Level: ${context.raw}/10`
          }
        }
      },
      layout: {
        padding: {
          top: 10,
          bottom: 10,
          left: 0 // remove extra left padding
        }
      }
    },
    plugins: [{
      id: 'positionIcons',
      afterDraw(chart) {
        iconOverlay.innerHTML = ''; // clear previous icons
        const yAxis = chart.scales.y;
        const chartArea = chart.chartArea;

        labels.forEach((label, i) => {
          const y = yAxis.getPixelForTick(i);

          const iconDiv = document.createElement('div');
          iconDiv.className = 'icon-label';
          iconDiv.style.position = 'absolute';
          iconDiv.style.top = `${y - 21}px`; // center vertically
          iconDiv.style.left = `${chartArea.left - 55}px`; // align with chart edge

          iconDiv.innerHTML = `
            <img src="${icons[i]}" alt="${label}">
            <span>${label}</span>
          `;

          iconOverlay.appendChild(iconDiv);
        });
      }
    }]
  });
});