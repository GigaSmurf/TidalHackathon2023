from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
from flask import request, jsonify
import json
import pandas as pd
from model import getModel
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
clf = getModel()
def convert_dict_values_to_int(input_dict):
    # Create a new dictionary to store the converted values
    result_dict = {}

    for key, value in input_dict.items():
        try:
            # Attempt to convert the value to an integer
            int_value = int(value)
            result_dict[key] = int_value
        except (ValueError, TypeError):
            # If conversion fails, keep the original value
            result_dict[key] = value

    return result_dict
@app.route('/api/getResult', methods=['POST'])
def your_post_handler():
    data =request.json  # Get the JSON data from the request
    # Process the data as needed
    print(data)
    data = convert_dict_values_to_int(data)
    dataframe = pd.DataFrame([data])
    
    categorical_cols = ["sex", "Pstatus", "address", "famsize","Mjob", "Fjob","reason", "guardian", "schoolsup", "famsup", "paid", "activities", "nursery", "higher", "internet", "romantic"]
    for cat in categorical_cols:
        dataframe[cat] = dataframe[cat].astype("category")
    train1 = clf.predict_proba(dataframe)
    
    train_classes = predict_classes(train1)
    
    response = {'message': train_classes[0]}
    return jsonify(response), 200  # Return a JSON

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)