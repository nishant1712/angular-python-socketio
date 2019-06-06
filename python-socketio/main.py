from aiohttp import web
import socketio

sio = socketio.AsyncServer(async_mode='aiohttp', logger=True, engineio_logger=True)

app = web.Application()
sio.attach(app)

json_object = [{"name": "Martin Scorcese",
                "value": [{"name": "Raging Bull", "imdb": "8.9"},
                          {"name": "The Departed", "imdb": "8.5"},
                          {"name": "The Wolf Of Wall Street", "imdb": "8.3"}]
                },
               {"name": "Quentin Tarantino",
                "value": [{"name": "Pulp Fiction", "imdb": "8.9"},
                          {"name": "Inglorious Basterds", "imdb": "8.5"},
                          {"name": "Django Unchained", "imdb": "8.3"}]
                },
               {"name": "Spike Jonez",
                "value": [{"name": "Her", "imdb": "8.9"}]
                },
               {"name": "Christopher Nolan",
                "value": [{"name": "Memento", "imdb": "8.9"},
                          {"name": "The Dark Knight", "imdb": "8.5"},
                          {"name": "Dunkirk", "imdb": "8.3"}]
                },
               ]


@sio.on('join_room', namespace='/director')
def handle_message(sid, room):
    sio.enter_room(sid, room=room, namespace='/director')


@sio.on('getDirectors', namespace='/director')
async def handle_message(sid, director_room):
    print("Got message {} from session {}".format(director_room, sid))
    await sio.emit('getDirectorsResponse', json_object, namespace='/director', room=director_room)


@sio.on('addDirector', namespace='/director')
async def add_director(sid, director_data, director_room):
    print("---------- Request from Session {} -- with record {} -- and room {} ---------- ".format(sid, director_data,
                                                                                                   director_room))
    json_object.append(director_data)
    await sio.emit('getDirectorsResponse', json_object, namespace='/director', room=director_room)


@sio.on('removeDirector', namespace='/director')
async def remove_director(sid, remove_director_index, director_room):
    print("---------- Request from Session {} -- with record {} -- and room {} ---------- ".format(sid,
                                                                                                   remove_director_index,
                                                                                                   director_room))
    del json_object[remove_director_index]
    await sio.emit('getDirectorsResponse', json_object, namespace='/director', room=director_room)


@sio.on('leave_room', namespace='/director')
def handle_message(sid, room):
    sio.leave_room(sid, room=room, namespace='/director')


@sio.on('join_room', namespace='/movie')
def handle_message(sid, room):
    sio.enter_room(sid, room=room, namespace='/movie')


@sio.on("getMovies", namespace='/movie')
async def handle_message(sid, director_index, movie_room):
    print("Got message {} from session {} on room {}".format(director_index, sid, movie_room))
    await sio.emit('getMoviesResponse', json_object[director_index], namespace='/movie', room=movie_room)


@sio.on('addMovie', namespace='/movie')
async def add_director(sid, director_index, movie_data, movie_room):
    print("---------- Request from Session {} -- with record {} -- and room {} ---------- ".format(sid, movie_data,
                                                                                                   movie_room))
    json_object[director_index]["value"].append(movie_data)
    await sio.emit('getMoviesResponse', json_object[director_index], namespace='/movie', room=movie_room)


@sio.on('removeMovie', namespace='/movie')
async def add_director(sid, director_index, remove_movie_index, movie_room):
    print("---------- Request from Session {} -- with record {} -- and room {} ---------- ".format(sid,
                                                                                                   remove_movie_index,
                                                                                                   movie_room))
    del json_object[director_index]["value"][remove_movie_index]
    await sio.emit('getMoviesResponse', json_object[director_index], namespace='/movie', room=movie_room)


@sio.on('leave_room', namespace='/movie')
def handle_message(sid, room):
    sio.leave_room(sid, room=room, namespace='/movie')


# del json_object['parent'][0]['child1'][0]

if __name__ == '__main__':
    web.run_app(app, port=8089)
