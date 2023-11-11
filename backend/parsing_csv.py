import csv
import numpy as np
import pandas
def getData1():
    x_data = []
    y_data = []
    with open('../student/StudentsPerformance_with_headers.csv', 'r') as csvfile:
        # Create a CSV reader object
        csvreader = csv.reader(csvfile)
        
        # Iterate through each row in the CSV file
        begin = True
        for row in csvreader:
            if(begin):
                begin = False
                continue
            # Access individual fields in each row using indexing
            del row[0]
            del row[30]
            del row[27]
            row = [int(element) for element in row]
            outcome = row[len(row) - 1]
            del row[len(row) -1]
            x_data.append(row)
            y_data.append(outcome)
    return x_data, y_data
        # Do something with the data, e.g., print it
        
def getData2():
    
    y_data = []
    dataframe = pandas.read_csv('../student/student-por.csv', delimiter=';')
    dataframe = dataframe.drop("school", axis = 1)
    dataframe = dataframe.drop("G1", axis=1)

    dataframe = dataframe.drop("G2", axis=1)
    y_data = dataframe["G3"].to_list()
    i =0 
    while(i < len(y_data)):
        value = y_data[i]
        if(value < 5):
            y_data[i] = 0
        elif(value < 10):
            y_data[i] = 1
        elif(value < 15):
            y_data[i] = 2
        else:
            y_data[i] = 3    
        i += 1    
    dataframe = dataframe.drop("G3", axis=1)
    categorical_cols = ["sex", "Pstatus", "address", "famsize","Mjob", "Fjob","reason", "guardian", "schoolsup", "famsup", "paid", "activities", "nursery", "higher", "internet", "romantic"]
    for cat in categorical_cols:
        dataframe[cat] = dataframe[cat].astype("category")
    
    #print(dataframe["sex"].unique())
    return dataframe, y_data