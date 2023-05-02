TARGET=armv7-unknown-linux-gnueabihf # Pi 2/3/4

# build binary
cross build --target $TARGET

# upload binary
sshpass -p 'raspberry' scp -r ./target/$TARGET/debug/novasm apl@raspberrypi3:/home/apl/bin

# execute binary
# sshpass -p 'raspberry' ssh apl@raspberrypi3 './bin/novasm'
