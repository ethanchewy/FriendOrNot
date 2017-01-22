#Created by Ethan Chiu 10/25/16
from flask import Flask, render_template, request, jsonify

#For Machine Learning
import numpy as np
#from pprint import pprint
from sklearn import linear_model, datasets
import math
import json

import random
'''
from pylint import lint
from astroid import MANAGER
from pylint.reporters.text import TextReporter
from subprocess import Popen, PIPE, STDOUT
'''
TEMPLATES_AUTO_RELOAD = True
app = Flask(__name__)
app.debug = True 

features = [[0.0, 0.0], [0.0, 0.0], [1.4534883720930232, 8.064516129032258], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 8.064516129032258], [2.9069767441860463, 8.064516129032258], [0.0, 0.0], [1.4534883720930232, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [4.3604651162790695, 0.0], [0.0, 0.0], [1.4534883720930232, 0.0], [4.3604651162790695, 0.0], [0.0, 0.0], [7.267441860465116, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [1.4534883720930232, 0.0], [0.0, 0.0], [0.0, 0.0], [13.08139534883721, 8.064516129032258], [0.0, 0.0], [0.0, 0.0], [8.720930232558139, 8.064516129032258], [0.0, 0.0], [0.0, 0.0], [1.4534883720930232, 0.0], [2.9069767441860463, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [1.4534883720930232, 0.0]]
results = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1]

friends_list = []

@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route('/test_model')
def test_model():
    clf = linear_model.LogisticRegression(C=1e5)

    clf.fit(features, results)

    #print(request.args)
    '''
    friends = request.args.get('friends')
    #friends = json.dumps(request.args.get('friends'))
    post_list_likes = request.args.get('post_list_likes')
    post_list_comments = request.args.get('post_list_comments')
    
    print friends
    print post_list_comments
    print post_list_likes
    '''
    #list_friends = parse_friends(friends)
    '''
    names = []
    j = friends
    for i in range(0, len(j['data'])):
        n = j['data'][i]['name']
        names.append(n)
    list_friends = names[:]
    print(list_friends)

    returner = []
    for i in range (0, len(list_friends)):
        h = clf.decision_function([post_like_ratio(post_list_likes, list_friends[i]),post_comment_ratio(post_list_comments, list_friends[i])])
        returner.append([list_friends[i], sigmoid(h)])

    return jsonify(returner)
    '''
    return jsonify(request.args)
'''        
def parse_friends(friends):
    names = []
    j = friends
    print j
    for i in range(0, len(j['data'])):
        n = j['data'][i]['name']
        names.append(n)
    return names
'''
def post_like_ratio(post_list_likes, name):
    total_likes = 0
    friend_likes = 0
    j = json.loads(post_list_likes)
    for i in range(0, len(j['items'])):
        for k in range(0, len(j['items'][i]['data'])):
            curr_name = j['items'][i]['data'][k]["name"]
            total_likes += 1
            if curr_name == name:
                friend_likes += 1
    #print(total_likes)
    #print(friend_likes)
    return float(friend_likes) / float(total_likes) * 1000

def post_comment_ratio(post_list_comments, name):
    total_comments = 0
    friend_comments = 0
    j = json.loads(post_list_comments)
    for i in range(0, len(j['items'])):
        for k in range(0, len(j['items'][i]['data'])):
            curr_name = j['items'][i]['data'][k]['from']["name"]
            if curr_name != "Ethan Chiu": #todo: this is hardcoded
                total_comments += 1
                if curr_name == name:
                    friend_comments += 1
    #print(total_comments)
    #print(friend_comments)
    return float(friend_comments) / float(total_comments) * 1000

#clf = linear_model.LogisticRegression(C=1e5)

#clf.fit(features,results)
#print(clf.coef_)

#create_array()

def sigmoid(z):
    return 1 / (1 + math.exp(-z))
    
