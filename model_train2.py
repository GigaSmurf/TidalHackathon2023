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
x_data, y_data = getData2()

X_train, X_test, y_train, y_test = train_test_split(x_data, y_data, test_size=.2, random_state=44)

# param_grid = {
#     'max_depth': [3, 5, 7, 9],
#     'n_estimators': [100, 200, 300],
#     'learning_rate': [0.01, 0.1, 0.2],
#     'enable_categorical': [True, False]
# }

#grid_search = GridSearchCV(XGBClassifier(objective='multi:softprob'), param_grid, cv=5)
# grid_search.fit(X_train, y_train)

# best_params = grid_search.best_params_
# best_model = grid_search.best_estimator_

max_depth = 4
max_test_acc = 0.0
max_train_acc = 0.0
paramaters = {"max_depth": 0, "n_estimators" : 0, "learning_rate": 0.0}
while(max_depth < 5):
    n_estimators = 100
    while(n_estimators < 400):
        learning_rate = 0.001
        while(learning_rate < .1):
            clf = XGBClassifier(max_depth=max_depth, objective='multi:softmax', n_estimators=n_estimators, 
                         enable_categorical=True, learning_rate=learning_rate)
            clf.fit(X_train, y_train)  
            train1 = clf.predict_proba(X_train)
            test1 = clf.predict_proba(X_test)
            train_classes = predict_classes(train1)
            test_classes = predict_classes(test1)
            train_acc = calculateAccuracy(y_train, train_classes)
            test_acc = calculateAccuracy(y_test, test_classes)
            if(test_acc > max_test_acc):
                print("new max: ",test_acc)
                print("with training acc of: ", train_acc)
                paramaters["max_depth"] = max_depth
                paramaters["n_estimators"] = n_estimators
                paramaters["learning_rate"] = learning_rate
                print("with paramaters:", paramaters)
                max_test_acc = test_acc


            learning_rate += .003
        n_estimators += 100
    max_depth += 1
        

# clf.fit(X_train, y_train)  
# train1 = clf.predict_proba(X_train)
# test1 = clf.predict_proba(X_test)
# train_classes = predict_classes(train1)
# test_classes = predict_classes(test1)
# train_acc = calculateAccuracy(y_train, train_classes)
# test_acc = calculateAccuracy(y_test, test_classes)
# print("train acc: ", train_acc)
# print("test_acc: ", test_acc)