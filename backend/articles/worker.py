import os

import redis
from rq import Connection, Worker


def main() -> None:
    redis_url = os.environ.get("XYENCE_JOBS_REDIS_URL", "redis://redis:6379/0")
    conn = redis.Redis.from_url(redis_url)
    with Connection(conn):
        worker = Worker(["default"])
        worker.work()


if __name__ == "__main__":
    main()
