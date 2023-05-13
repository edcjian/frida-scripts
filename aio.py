import aiohttp
import asyncio

import asyncio as asyncio

import rr

session = None
sem = asyncio.Semaphore(30)

import hashlib
import datetime


def md5(string):
    md5sum = hashlib.md5()
    md5sum.update(string.encode('utf-8'))
    result = md5sum.hexdigest()
    return result


def genCode(now):
    string = f"{now.minute}{now.day}{now.hour}"
    return md5(string)


def generate():
    now = datetime.datetime.now()
    return genCode(now)


async def fetch(url, **kwargs):
    async with sem:
        async with aiohttp.ClientSession() as session:
            async with session.post(url, **kwargs) as resp:
                return resp


async def mains():
    global session
    session = aiohttp.ClientSession

    def data(i):
        return {
            'user_id': 0,
            'user_token': '3a40c08bb134b169f7e41860b1ed94cf',
            'access_token': generate(),
            'app_plantform': 'android',
            'app_versionname': '',
            'app_versioncode': '',
            'app_channel': '',
            'last_id': 4090 + i
        }

    proxy = 'http://127.0.0.1:12334'
    task = [fetch('https://feapi.feheadline.com/provider/api/v1/get_hot_news', data=data(i), proxy=proxy) for i in
            range(10)]
    res = await asyncio.gather(*task)
    return res


async def product():
    data = {

    }
    res = await fetch('', data=data)
    d = await res.text()
    urls = []
    for i in d:
        urls.append(i)
    await rr.execute('lpush', 'origin_urls', *urls)


async def consumer():
    while True:
        url = await rr.execute('lpop', 'origin_urls')
        if url:
            uni_Key = md5(url)
            if uni_Key in await rr.execute('smembers', 'finish_urls'):
                continue
            await fetch(url)
            await rr.execute('sadd', 'finish_urls', uni_Key)
        else:
            break


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    # task=asyncio.ensure_future(mains())
    task = []
    loop.run_until_complete(task)
    print(task.result())
    loop.close()
