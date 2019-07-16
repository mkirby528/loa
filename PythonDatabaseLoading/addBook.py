import mysql.connector
import requests
import time
import datetime
mydb = mysql.connector.connect(
    host="localhost",
    user="mkirby528",
    passwd="052899",
    database='betterreads-db',
    auth_plugin='mysql_native_password'
)

cursor = mydb.cursor()


ts = time.time()
timestamp = datetime.datetime.fromtimestamp(
    ts).strftime('%Y-%m-%d %H:%M:%S')


request = requests.get(
    'http://openlibrary.org/search.json?title=good+omens').json()['docs']

for i in range(2):
    bookData = request[i]
    bookKey = bookData['key']

    title = bookData['title']
    if 'subtitle' in bookData:
        title += ':' + bookData['subtitle']
    if 'cover_i' in bookData:
        cover_image = bookData['cover_i']
    else:
        cover_image = -1
    if 'publish_year' in bookData:
        publish_year = bookData["first_publish_year"]
    else:
        publish_year = -1
    sql = "INSERT IGNORE INTO `betterreads-db`.`books` (`key`, `title`, `cover_image`, `publish_year`, `createdAt`, `updatedAt`)  VALUES (%s,%s,%s,%s,%s,%s);"

    val = (bookKey, title, cover_image, publish_year, timestamp, timestamp)
    cursor.execute(sql, val)
    mydb.commit()

    if 'author_key' in bookData:
        authors = (bookData['author_key'])
    else:
        authors = []
    for i in authors:
        authorData = requests.get(
            'https://openlibrary.org/authors/'+i+'.json').json()
        name = authorData['name']
        first, last = name.split(" ", 1)
        if 'birth_date' in authorData:
            birth_date = authorData['birth_date']
        else:
            birth_date = ''
        sql = "INSERT IGNORE INTO `betterreads-db`.`authors` (`key`, `full_name`, `first_name`, `last_name`, `birth_date`, `createdAt`, `updatedAt`)  VALUES (%s,%s,%s,%s,%s, %s,%s);"

        val = (i, name, first, last, birth_date, timestamp, timestamp)
        cursor.execute(sql, val)
        mydb.commit()

        sql = "INSERT IGNORE INTO `betterreads-db`.`author_books` (`createdAt`,  `updatedAt`, `bookKey`, `authorKey`)  VALUES (%s,%s,%s,%s);"
        val = (timestamp, timestamp, bookKey, i)
        cursor.execute(sql, val)
        mydb.commit()

    if 'isbn' in bookData:
        isbns = bookData['isbn']
    else:
        isbns = []
    for i in isbns:
        sql = "INSERT IGNORE INTO `betterreads-db`.`isbns` (`isbn`,  `bookKey`, `createdAt`, `updatedAt`)  VALUES (%s,%s,%s,%s);"
        val = (i, bookKey, timestamp, timestamp)
        cursor.execute(sql, val)
        mydb.commit()
