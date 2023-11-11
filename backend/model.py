from parsing_csv import getData2
from xgboost import XGBClassifier
# read data
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from parsing_csv import getData2
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV

def calculateAccuracy(original, predicted):
    correct = 0
    i = 0
    while(i < len(original)):
        if(original[i] == predicted[i]):
            correct += 1
        i += 1
    return correct / len(original)
def predict_class(one_hot):
    max_index = 0
    i =0 
    maxi = 0
    while(i < len(one_hot)):
        if(one_hot[i] > maxi):
            max_index = i
            maxi = one_hot[i]
        i += 1
    return max_index
def predict_classes(list_of_one_hot):
    result = []
    for one_hot in list_of_one_hot:
        class_result = predict_class(one_hot)
        result.append(class_result)
    return result
def getModel():
    x_data, y_data = getData2()

    X_train, X_test, y_train, y_test = train_test_split(x_data, y_data, test_size=.2, random_state=44)
    clf = XGBClassifier(max_depth=4, objective='multi:softmax', n_estimators=100, 
                            enable_categorical=True, learning_rate=.001)
    clf.fit(X_train, y_train)
    return clf



