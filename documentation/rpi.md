# NetStatus - Raspberry Pi setup instructions
Note this is currently for the Raspberry Pi 4 (arm64) only

This project was intended for use with Raspberry Pi 4 + 480x320px 3.5" LCD

![Raspberry PI screenshot](https://raw.githubusercontent.com/Ryandev/NetStatus/master/documentation/rpi.jpg "Raspberry PI screenshot")

### 1. Prerequisites 
Ubuntu 20.04 LTS fresh install on a 16GiB or greater SD card

### 2. Setup System
Login via ssh & run the following

(update)
```
sudo apt-get -y upgrade; sudo apt-get -u update;
```
 
(`docker.io` for Docker, `unattended-upgrades` for auto-updates, `net-tools` for ifconfig, `xorg` for xwindows & `chromium-browser` will be our browser )
```
sudo apt -y install docker.io unattended-upgrades net-tools xorg chromium-browser
```

Install 3.5" screen support for ubuntu (triggers reboot)
reference: http://www.lcdwiki.com/3.5inch_RPi_Display
```
git clone https://github.com/lcdwiki/LCD-show-ubuntu.git
cd LCD-show-ubuntu/
cd ..
chmod 755 LCD-show-ubuntu/
cd LCD-show-ubuntu/
sudo ./LCD35-show 
```

 
### 3. Crontab
With a terminal window open run crontab -e & add the following lines
1. (Setup updates @ 1am)
2. (Setup daily restart @ 5am)
```
0 1 * * * sudo apt-get clean && sudo apt --fix-broken install && sudo unattended-upgrades
0 5 * * * /sbin/shutdown -r +5
```
 
 
##### 4. Setup Gnome ubuntu for unattended use
(Run the following in a terminal window)
```
echo 'Disabling screensaver' &&
gsettings set org.gnome.desktop.screensaver lock-enabled false
 
echo 'Disabling auto-lock' &&
gsettings set org.gnome.desktop.session idle-delay 0
 
echo 'Disable suspend' &&
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type "nothing" &&
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 0
 
echo 'Disabling sleep' &&
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
 
echo 'Installing unclutter to hide cursor' &&
sudo apt install -y unclutter
 
echo 'Installing xdotool to enable triggering fullscreen on browser' &&
sudo apt install xdotool
 
echo 'Clearing gnome background' &&
gsettings set org.gnome.desktop.background picture-uri none &&
gsettings set org.gnome.desktop.background color-shading-type 'solid' &&
gsettings set org.gnome.desktop.background primary-color '#000000'
```
 
### 5. Docker autostart
```
echo 'Setting up Docker to auto start on boot/login' &&
sudo systemctl enable docker
```
 
### 6. Setup browser on startup gnome
```
echo 'Creating browser.sh auto start on boot script';
mkdir ~/scripts
mkdir ~/.config/autostart
echo '
[Desktop Entry]
Type=Application
Name=Browser
Exec=~/scripts/browser.sh
X-GNOME-Autostart-enabled=true
' > ~/.config/autostart/.desktop
```

Save the following to ~/scripts/browser.sh
```
URL="http://localhost"

# Stop the Raspberry Pi’s display power management system from kicking in and blanking out the screen
xset s noblank
xset s off
xset -dpms

# Hide cursor
unclutter -idle 0.5 -root &

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences
/usr/bin/chromium-browser --check-for-update-interval=31536000 --no-first-run  --start-fullscreen --start-maximized --disable-notifications --noerrdialogs --disable-infobars --load-extension=~/.config/chromium/extensions/crashautoreload.crx --window-size=480,320 --force-device-scale-factor=1 --app=$URL | at now + 10s
```
then run `chmod +x ~/scripts/browser.sh`

### 7. Setup browser to auto-restart on crash
```
echo 'Download & install oh-no-you-didnt https://chrome.google.com/webstore/detail/oh-no-you-didnt/acdablfhjbhkjbcifldncdkmlophfgda/related?hl=en' &&
echo 'This will reload on "Aw, Snap!" messages automatically' &&
mkdir -p ~/.config/chromium/extensions &&
curl -H 'Host: clients2.google.com' -H 'sec-fetch-site: none' -H 'sec-fetch-mode: navigate' -H 'sec-fetch-dest: empty' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36' -H 'accept-language: en-US,en;q=0.9' --compressed 'https://clients2.google.com/service/update2/crx?response=redirect&prodversion=45&acceptformat=crx2,crx3&x=id%3Dacdablfhjbhkjbcifldncdkmlophfgda%26uc' -L -o ~/.config/chromium/extensions/crashautoreload.crx
```


### 8. Setup docker to run Netspeed
```
sudo docker run --name netspeed -d --restart=always -p 80:80 ryandev/netspeed
```

Finally Reboot :)