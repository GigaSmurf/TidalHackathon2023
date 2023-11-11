import csv
import numpy as np

def getData():
    x_data = []
    y_data = []
    with open('StudentsPerformance_with_headers.csv', 'r') as csvfile:
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
        
