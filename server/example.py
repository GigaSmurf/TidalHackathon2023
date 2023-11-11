from xgboost import XGBClassifier
# read data
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

#flask server
from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/hello')
def hello_world():
    return 'Hello, World!'



def calculateAccuracy(original, predicted):
    correct = 0
    i = 0
    while(i < len(original)):
        if(original[i] == predicted[i]):
            correct += 1
        i += 1
    return correct / len(original)
data = load_iris()
X_train, X_test, y_train, y_test = train_test_split(data['data'], data['target'], test_size=.2)
# create model instance
bst = XGBClassifier(n_estimators=2, max_depth=2, learning_rate=1, objective='binary:logistic')
# fit model
bst.fit(X_train, y_train)
# make predictions
preds = bst.predict(X_test)
acc = calculateAccuracy(y_test, preds)
print(acc)

if __name__ == "__main__":
    app.run(debug=True)