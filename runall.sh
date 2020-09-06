echo 'Stopping:=============================================='
./stop.sh
echo 'Stopping:=============================================='


LOG='/tmp/logs'
mkdir $LOG

echo 'Restarting:=============================================='
nohup npm run dev > $LOG/registry.log &

cd ../explorer 
nohup npm run serve  > $LOG/explorer.log &
cd -
cd ../studio/server
nohup npm run dev > $LOG/studio_server.log &
cd -
cd ../studio/client
nohup npm run serve > $LOG/studio_client.log &
echo 'Restarting:==============================================Done!'

exit
