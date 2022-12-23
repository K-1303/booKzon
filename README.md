A book recommendation website where you can search your favorite books and based on your search it will recommend you books using K-Nearest Neighbour ML.It uses cookies to store books you search and based on that it will recommend you books.

Tech Stack used: 
1. Django(Backend)
2. React(Frontend)

The datasets were collected in late 2017 from goodreads.com, where we only scraped users' public shelves, i.e. everyone can see it on web without login. User IDs and review IDs are anonymized. 

To download data files follow below links:
- goodreads_books.json.gz - https://drive.google.com/uc?id=1LXpK1... 
- goodreads_interactions.csv - https://drive.google.com/open?id=1zmy...
- book_id_map.csv - https://drive.google.com/uc?id=1CHTAa...

Make a folder of name:'Data' in API folder and put these files into it.

Run these commands in terminal to run the project:
pip install -r requirements.txt to install backend dependencies
cd frontend to access frontend folder
npm install to intall frontend dependencies
npm run build to build static files
