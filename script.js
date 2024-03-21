document.getElementById('busForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const reviews = {
    lion: "awesome, good, amazing company",
    tiger: "terrible, bad, not-recommended company",
    leopard: "normal, general, unusual company"
  };

  const busname = document.getElementById('busname').value;
  const resultDiv = document.getElementById('result');
  const apiKey = 'lDaCOYIjEzq9zV54QbjOVUoNJ0cU8NIsIKwM43hV8Oc';
  
  if (busname in reviews) {
      let review = reviews[busname];
      fetch('https://apis.paralleldots.com/v4/sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `text=${review}&api_key=${apiKey}&lang_code=en`
    })
    .then(response => response.json())
    .then(data => {
        let sentiment = data.sentiment;
        let content = `
          <h3>Review: ${review}</h3>
          <h3>Sentiment Analysis Results:</h3>
          <p><strong>Negative:</strong> ${sentiment.negative}</p>
          <p><strong>Neutral:</strong> ${sentiment.neutral}</p>
          <p><strong>Positive:</strong> ${sentiment.positive}</p>
        `;
        resultDiv.innerHTML = content;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  } else {
    let content = `
      <h3>Sentiment Analysis Results:</h3>
      <p><strong>No review available for this business name</p>
    `;
    resultDiv.innerHTML = content;
  }
});
