import mysql.connector
import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
from bs4 import BeautifulSoup

# Téléchargement  ressources NLTK
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('vader_lexicon')

app = Flask(__name__)
cors = CORS(app)


# Configuration de la connexion à la base de données
hostname = 'localhost'
port = 3306
database = 'portal'
username = 'root'
password = 'root'

# Création de l'objet de connexion
connection = mysql.connector.connect(
    host=hostname,
    port=port,
    database=database,
    user=username,
    password=password
)

# Création de l'objet curseur
cursor = connection.cursor()

@app.route('/analyze-sentiment', methods=['POST'])
@cross_origin()
def analyze_sentiment():
    data = request.get_json()
    cover_letter = data['coverLetter']
    github_link = data['githubLink']

    # Analyse NLP de la lettre de motivation
    words = word_tokenize(cover_letter.lower())
    words = [word for word in words if word not in string.punctuation]
    words = [word for word in words if word not in stopwords.words('english')]
    text = ' '.join(words)

    # Instanciation de l'analyseur de sentiment VADER
    analyzer = SentimentIntensityAnalyzer()
    sentiment_scores = analyzer.polarity_scores(text)

    # Récupération des scores de sentiment
    positive_score = sentiment_scores['pos']
    negative_score = sentiment_scores['neg']
    neutral_score = sentiment_scores['neu']

    # Calcul du sentiment en se basant sur les scores positifs, négatifs et neutres

    sentiment = 'Positive' if positive_score > negative_score and positive_score > neutral_score else 'Negative'    
    
    # Affichage des scores positif, négatif et neutre
    print(f"Positive Score: {positive_score}")
    print(f"Negative Score: {negative_score}")
    print(f"Neutral Score: {neutral_score}")


    # Extraction des dépôts GitHub
    response = requests.get(github_link)
    soup = BeautifulSoup(response.content, 'html.parser')

    repositories = []
    repo_elements = soup.find_all('h3', {'class': 'wb-break-all'})
    for element in repo_elements:
        repository_name = element.get_text().strip()
        repositories.append(repository_name)

    repository_count = len(repositories)



    return jsonify({'sentiment': sentiment, 'repositoryCount': repository_count})
  


if __name__ == '__main__':
    app.run()
