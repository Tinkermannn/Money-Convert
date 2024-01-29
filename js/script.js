const bitcoinApiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=idr%2Cjpy%2Cusd';
const otherCurrencyApiUrl = 'https://v6.exchangerate-api.com/v6/7f215e28ee54c6e53cc6fa2c/latest/USD';

function convert() {
    const input1 = parseFloat(document.getElementById('input1').value);
    const nilaiawal = document.getElementById('nilaiawal').value;
    const nilaiakhir = document.getElementById('nilaiakhir').value;

    if (isNaN(input1)) {
        alert('Masukkan jumlah yang valid.');
        return;
    }

    let exchangeRate;

    if (nilaiawal === 'BTC' && nilaiakhir === 'BTC') {
        const convertedAmount = input1;
        document.getElementById('result').innerHTML = `${input1} ${nilaiawal} = ${convertedAmount.toFixed(2)} ${nilaiakhir}`;
    } else if (nilaiawal === 'BTC' || nilaiakhir === 'BTC') {
        fetch(bitcoinApiUrl)
            .then(response => response.json())
            .then(data => {
                if (nilaiawal === 'BTC') {
                    exchangeRate = data.bitcoin[nilaiakhir.toLowerCase()];
                } else {
                    exchangeRate = 1 / data.bitcoin[nilaiawal.toLowerCase()];
                }

                if (exchangeRate) {
                    const convertedAmount = input1 * exchangeRate;
                    document.getElementById('result').innerHTML = `${input1} ${nilaiawal} = ${convertedAmount.toFixed(2)} ${nilaiakhir}`;
                } else {
                    alert('Error fetching Bitcoin exchange rate. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error fetching Bitcoin exchange rate. Please try again later.');
            });
    } else {
        fetch(otherCurrencyApiUrl)
            .then(response => response.json())
            .then(data => {
                exchangeRate = data.conversion_rates[nilaiakhir] / data.conversion_rates[nilaiawal];

                if (exchangeRate) {
                    const convertedAmount = input1 * exchangeRate;
                    document.getElementById('result').innerHTML = `${input1} ${nilaiawal} = ${convertedAmount.toFixed(2)} ${nilaiakhir}`;
                } else {
                    alert('Error fetching exchange rate. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error fetching exchange rate. Please try again later.');
            });
    }
}

document.getElementById('convertButton').addEventListener('click', convert);

var typing = new Typed ("#text-gerak", {
    strings: ["Money Convertor"],
    typeSpeed: 100,
    backSpeed: 0,
    loop: false,
    backDelay: 0,
    showCursor: false,
});
