import os
from flask import Flask, render_template
import pymongo
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient(os.environ['MONGOHQ_URL'])
mongo_db = client.get_default_database()

# print os.environ['PYTHONPATH']
print os.environ.get('MONGOHQ_URL')
# db = pymongo.Connection('
@app.route('/')
def hello():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()

