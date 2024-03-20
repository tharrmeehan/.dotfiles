#!/bin/bash
## /* ---- 💫 https://github.com/JaKooLit 💫 ---- */  ##
# Script for Monitor backlights (if supported) using brightnessctl

notification_timeout=1000

# Get brightness
get_backlight() {
	echo $(brightnessctl -m -d asus_screenpad | cut -d, -f4)
}

# Change brightness
change_backlight() {
	brightnessctl -d asus_screenpad set "$1" && notify_user
}

# Execute accordingly
case "$1" in
	"--get")
		get_backlight
		;;
	"--inc")
		change_backlight "+10%"
		;;
	"--dec")
		change_backlight "10%-"
		;;
	*)
		get_backlight
		;;
esac
