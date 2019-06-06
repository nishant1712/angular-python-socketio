FROM python:3.7-slim

RUN apt-get update
RUN apt-get install -y --no-install-recommends build-essential gcc

# layer caching for faster builds
COPY requirements.txt /
RUN pip install -r /requirements.txt

ADD . /python-socketio
WORKDIR /python-socketio

ENTRYPOINT ["python"]

CMD ["main.py"]