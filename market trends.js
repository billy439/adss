document.addEventListener('DOMContentLoaded', () => {
    const watchlist = document.getElementById('watchlist');
    const stockInfo = document.getElementById('stock-info');
    const searchInput = document.getElementById('search');
    const stockTableBody = document.querySelector('#stock-table tbody');

    let watchlistStocks = [
        { symbol: 'MZ', name: 'Maize(t)', price: 635.54, change: 0.5 },
        { symbol: 'WHT', name: 'Wheat(t)', price: 4805.66, change: -1.2 },
        { symbol: 'GRNUT', name: 'Groundnuts(t)', price: 3401.46, change: 2.1 },
        { symbol: 'SYBNS', name: 'Soybeans(t)', price: 920.35, change: -0.3 }
    ];

    let allStocks = [
        // Your full list of stocks (shortened here for brevity)
        { symbol: 'MZ', name: 'Maize(t)', price: 635.54, change: 0.5 },
        { symbol: 'WHT', name: 'Wheat (t)', price: 4805.66, change: -1.2 },
        { symbol: 'GRNUT', name: 'Groundnuts(t)', price: 3401.46, change: 2.1 },
        { symbol: 'SYBNS', name: 'Soybeans(t)', price: 920.35, change: -0.3 },
        { symbol: 'TBCC', name: 'Tobacco(t)', price: 720.25, change: 0.8 },
        { symbol: 'CTTN', name: 'Cotton(t)', price: 510.89, change: -0.6 },
        { symbol: 'SGCN', name: 'Sugarcane(t)', price: 355.23, change: 1.4 },
        { symbol: 'PTT', name: 'Potatoes(3kg)', price: 8.00, change: 0.2 },
        { symbol: 'SPTT', name: 'Sweet Potatoes(3kg)', price: 7.00, change: 0.2 },
        { symbol: 'PPL', name: 'Apples(12kg)', price: 12.00, change: 1.0 },
        { symbol: 'AVCD', name: 'Avocado(kg)', price: 7.67, change: 0.2 },
        { symbol: 'BTRT', name: 'Beetroot(1kg)', price: 3.50, change: 0.2 },
        { symbol: 'BTTN', name: 'Butternut(10kg)', price: 4.00, change: 0.2 },
        { symbol: 'CBG', name: 'Cabbage(1 head)', price: 2.00, change: 0.5 },
        { symbol: 'CRR', name: 'Carrots(60kg)', price: 15.00, change: 0.2 },
        { symbol: 'CV', name: 'Covo(6.5kg)', price: 3.50, change: 0.2 },
        { symbol: 'CCM', name: 'Cucumber(60kg)', price: 12.00, change: 0.2 },
        { symbol: 'EGG', name: 'Eggs(crate)', price: 4.00, change: 0.2 },
        { symbol: 'CWP', name: 'Cow Peas(20kg)', price: 12.00, change: 0.2 },
        { symbol: 'BRLR', name: 'Broiler(live)', price: 7.00, change: 0.2 },
        { symbol: 'OF', name: 'Off Layer(live)', price: 5.00, change: 0.2 },
        { symbol: 'RP', name: 'Rape(6.5kg)', price: 4.50, change: 0.2 },
        { symbol: 'SGRB', name: 'Sugar beans(20kg)', price: 25.00, change: 0.2 },
        { symbol: 'TMT', name: 'Tomatoes(30kg)', price: 10.00, change: 0.2 },
        { symbol: 'BNN', name: 'Banana(kg)', price: 5.00, change: 0.2 },
        { symbol: 'WTRM', name: 'Watermelon', price: 4.00, change: 0.2 },
        { symbol: 'TSN', name: 'Tsunga(6.5kg)', price: 4.50, change: 0.2 },
        { symbol: 'FNGM', name: 'Finger Millet(20kg)', price: 18.00, change: 0.2 },
        { symbol: 'CTTL', name: 'Cattle', price: 150.00, change: 0.5 },
        { symbol: 'RRC', name: 'Road Runner Chicken', price: 8.00, change: 0.2 },
        { symbol: 'GT', name: 'Goat', price: 30.00, change: 0.2 },
        { symbol: 'PG', name: 'Pig', price: 85.00, change: 0.2 },
        { symbol: 'RBBT', name: 'Rabbits', price: 13.00, change: 0.2 },
        { symbol: 'DCK', name: 'Ducks', price: 10.00, change: 0.2 },
        { symbol: 'SHP', name: 'Sheep', price: 60.00, change: 0.2 },
        { symbol: 'TRKY', name: 'Turkeys', price: 20.00, change: 0.2 },
       
        // ... Add all the rest you had
    ];

    function simulateLiveUpdate() {
        allStocks = allStocks.map(stock => {
            let randomChange = (Math.random() * 2 - 1).toFixed(2); // Random number between -1.00% and 1.00%
            let newPrice = (stock.price * (1 + randomChange / 100)).toFixed(2);
            return {
                ...stock,
                price: parseFloat(newPrice),
                change: parseFloat(randomChange)
            };
        });

        // Update watchlist stocks from updated allStocks
        watchlistStocks = watchlistStocks.map(watchStock => {
            const updated = allStocks.find(s => s.symbol === watchStock.symbol);
            return updated || watchStock;
        });

        updateWatchlist();
        displayStockTable(allStocks);
    }

    function displayStockInfo(stock) {
        const changeClass = stock.change >= 0 ? 'positive' : 'negative';
        stockInfo.innerHTML = `
            <h3>${stock.name} (${stock.symbol})</h3>
            <p>Price: $${stock.price.toFixed(2)}</p>
            <p class="${changeClass}">Change: ${stock.change}%</p>
        `;
    }

    function updateWatchlist() {
        watchlist.innerHTML = '';
        watchlistStocks.forEach(stock => {
            const li = document.createElement('li');
            li.textContent = `${stock.name} (${stock.symbol}) `;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove');
            removeButton.addEventListener('click', () => {
                watchlistStocks = watchlistStocks.filter(item => item.symbol !== stock.symbol);
                updateWatchlist();
                displayStockTable(allStocks);
            });
            li.appendChild(removeButton);

            li.addEventListener('click', () => {
                displayStockInfo(stock);
            });

            watchlist.appendChild(li);
        });
    }

    function displayStockTable(stocks) {
        stockTableBody.innerHTML = '';
        stocks.forEach(stock => {
            const changeClass = stock.change >= 0 ? 'positive' : 'negative';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${stock.name}</td>
                <td>$${stock.price.toFixed(2)}</td>
                <td class="${changeClass}">${stock.change}%</td>
                <td class="actions"></td>
            `;
            const actionsTd = tr.querySelector('.actions');

            if (!watchlistStocks.some(item => item.symbol === stock.symbol)) {
                const addButton = document.createElement('button');
                addButton.textContent = 'Add';
                addButton.classList.add('add');
                addButton.addEventListener('click', () => {
                    watchlistStocks.push(stock);
                    updateWatchlist();
                    displayStockTable(allStocks);
                });
                actionsTd.appendChild(addButton);
            } else {
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.classList.add('remove');
                removeButton.addEventListener('click', () => {
                    watchlistStocks = watchlistStocks.filter(item => item.symbol !== stock.symbol);
                    updateWatchlist();
                    displayStockTable(allStocks);
                });
                actionsTd.appendChild(removeButton);
            }

            tr.addEventListener('click', () => {
                displayStockInfo(stock);
            });

            stockTableBody.appendChild(tr);
        });
    }

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredStocks = allStocks.filter(stock =>
            stock.name.toLowerCase().includes(searchTerm) ||
            stock.symbol.toLowerCase().includes(searchTerm)
        );
        displayStockTable(filteredStocks);
    });

    // Initial display
    displayStockTable(allStocks);
    updateWatchlist();

    // Simulate live market updates every 5 seconds
    setInterval(simulateLiveUpdate, 5000);
});