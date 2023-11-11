from xgboost import XGBClassifier
# read data
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from parsing_csv import getData
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
x_data, y_data = getData()
X_train, X_test, y_train, y_test = train_test_split(x_data, y_data, test_size=.2, random_state=44)
clf = XGBClassifier(max_depth=4, objective='multi:softprob', n_estimators=400, 
                        num_classes=8)

clf.fit(X_train, y_train)  
train1 = clf.predict_proba(X_train)
test1 = clf.predict_proba(X_test)
train_classes = predict_classes(train1)
test_classes = predict_classes(test1)
train_acc = calculateAccuracy(y_train, train_classes)
test_acc = calculateAccuracy(y_test, test_classes)
print("train acc: ", train_acc)
print("test_acc: ", test_acc)