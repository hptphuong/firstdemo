REM Start zookeper first

start /b .\bin\windows\zookeeper-server-stop.bat .\config\zookeeper.properties > zookeeper-server-stop.log 2> zookeeper-server-stop.err &

sleep 5

start /b .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties > zookeeper-server-start.log 2> zookeeper-server-start.err &

sleep 5

start /b .\bin\windows\kafka-server-stop.bat .\config\server.properties > kafka-server-stop.log 2> kafka-server-stop.err &

sleep 5

start /b .\bin\windows\kafka-server-start.bat .\config\server.properties > kafka-server-start.log 2> kafka-server-start.err &