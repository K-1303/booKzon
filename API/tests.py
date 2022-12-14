from django.test import TestCase

import gzip
import json
import pandas as pd
import numpy as np
import re
import os

csv_book_mapping = {}

with open("Data\\book_id_map.csv", 'r') as f:
    while True :
        line = f.readline()
        if not line:
            break
        csv_id, book_id = line.strip().split(",")
        csv_book_mapping[csv_id] = book_id

def rec_books (liked_books) :
    overlap_users = set()
    # for i in range 1 to 100
    # for i in range 1 to 0.1Million
# finding users
    with open("Data\goodreads_interactions.csv", 'r') as f:
        i = 10000000
        while (i):
            line = f.readline()

            if not line:
                break

            user_id, csv_id, _, rating, _ = line.split(",")

            if user_id in overlap_users :
                continue

            try :
                rating = int(rating)
            except ValueError :
                 continue

            book_id = csv_book_mapping[csv_id]

            if book_id in liked_books and rating >= 4 :
                overlap_users.add(user_id)
            i = i - 1
        # users found
        

    rec_lines = []

        # what books those users have read
    with open("Data\goodreads_interactions.csv", 'r') as f:
        i = 10000000
        while (i):
            line = f.readline()

            if not line:
                break

            user_id, csv_id, _, rating, _ = line.split(",")

            if user_id in overlap_users :
                book_id = csv_book_mapping[csv_id]
                rec_lines.append([user_id, book_id, rating])
        # what books those users have read -- done
            i = i - 1
        
    #adding to site
    recs = pd.DataFrame(rec_lines, columns=["user_id", "book_id", "rating"])
    recs["book_id"] = recs["book_id"].astype(str)

    books_titles = pd.read_json("books_titles.json")
    books_titles["book_id"] = books_titles["book_id"].astype(str) 
    
    all_recs = recs["book_id"].value_counts()
    all_recs = all_recs.to_frame().reset_index()
    all_recs.columns = ["book_id", "book_count"]
    all_recs = all_recs.merge(books_titles, how="inner", on="book_id")
    all_recs["score"] = all_recs["book_count"] * (all_recs["book_count"] / all_recs["ratings"])
    all_recs.sort_values("score", ascending=False).head(10)
    popular_recs = all_recs[all_recs["book_count"] > 10].sort_values("score", ascending=False)
    print(popular_recs[~popular_recs["book_id"].isin(liked_books)].head(10))
    #added to site
    # for i in range 1 to 0.1Million end
    # for i in range 1 to 100 end
    
my_books = ["213030", "25545994", "18859629", "148020", "15844113", "25030367", "475675", "2214140"]
rec_books(my_books)

