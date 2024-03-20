#!/bin/bash
## /* ---- 💫 https://github.com/JaKooLit 💫 ---- */  ##
# Scripts for refreshing waybar, rofi, swaync, pywal colors

SCRIPTSDIR=$HOME/.config/hypr/scripts
UserScripts=$HOME/.config/hypr/UserScripts

# Define file_exists function
file_exists() {
    if [ -e "$1" ]; then
        return 0  # File exists
    else
        return 1  # File does not exist
    fi
}

# Kill already running processes
# _ps=(waybar rofi swaync)
# for _prs in "${_ps[@]}"; do
#   if pidof "${_prs}" >/dev/null; then
#       pkill "${_prs}"
#   fi
# done

# Kill already running processes
#
ags -q


_ps=(rofi)
for _prs in "${_ps[@]}"; do
    if pidof "${_prs}" >/dev/null; then
        pkill "${_prs}"
    fi
done

sleep 0.7
ags &

# sleep 0.3
# Relaunch waybar
# waybar &

# relaunch swaync
# sleep 0.5
# swaync > /dev/null 2>&1 &

# Relaunching rainbow borders if the script exists
sleep 1
if file_exists "${UserScripts}/RainbowBorders.sh"; then
    ${UserScripts}/RainbowBorders.sh &
fi

# for cava-pywal (note, need to manually restart cava once wallpaper changes)
ln -sf "$HOME/.cache/wal/cava-colors" "$HOME/.config/cava/config" || true

/home/tk/miniconda3/envs/for_other_things/bin/python /home/tk/.local/bin/starttree.py

spicetify apply -n

gradience-cli apply -n pywal --gtk both

pywalfox update

exit 0
