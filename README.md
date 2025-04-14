build
```bash
docker build . -t ctnelson1997/cs571-s25-hw10-api
docker push ctnelson1997/cs571-s25-hw10-api
```

run
```bash
docker pull ctnelson1997/cs571-s25-hw10-api
docker run --name=cs571_s25_hw10_api -d --restart=always -p 58110:58110 -v /cs571/s25/hw10:/cs571 ctnelson1997/cs571-s25-hw10-api
```
