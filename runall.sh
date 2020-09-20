echo 'Stopping:=============================================='
./stop.sh
echo 'Stopping:=============================================='


WORKING_DIR="/home/$USER/hypersign"
LOG_DIR=$WORKING_DIR/log

mkdir -p $LOG_DIR


echo 'Restarting:=============================================='
npm run setup
nohup npm run start > $LOG_DIR/core.log &

cd ../explorer 
nohup npm run serve  > $LOG_DIR/explorer.log &
cd -

cd ../studio/server
npm run setup
nohup npm run start > $LOG_DIR/studio_server.log &
cd -

cd ../studio/client
nohup npm run serve > $LOG_DIR/studio_client.log &
echo 'Restarting:==============================================Done!'

exit
